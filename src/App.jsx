import { useCallback, useEffect, useMemo, useState } from "react";
import AuditLogger from "./components/class/AuditLogger.jsx";
import CardWrapper from "./components/functional/CardWrapper.jsx";
import ProductForm from "./components/functional/ProductForm.jsx";
import ProductList from "./components/functional/ProductList.jsx";
import Footer from "./components/Footer.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { readStorage, writeStorage } from "./utils/storage.js";
import { getStockStatus, LOW_STOCK_THRESHOLD } from "./utils/inventory.js";
import "./App.css";

const INVENTORY_KEY = "inventory-dashboard-products";

const sampleProducts = [
  {
    id: "sample-1",
    name: "Pack of A4 Paper",
    category: "Stationery",
    price: 650,
    quantity: 18,
  },
  {
    id: "sample-2",
    name: "Water Bottle",
    category: "Daily Use",
    price: 450,
    quantity: 4,
  },
  {
    id: "sample-3",
    name: "Desk Organizer",
    category: "Office Supplies",
    price: 850,
    quantity: 0,
  },
  {
    id: "sample-4",
    name: "Cotton Tote Bag",
    category: "Bags",
    price: 500,
    quantity: 12,
  },
  {
    id: "sample-5",
    name: "Sticky Notes",
    category: "Stationery",
    price: 180,
    quantity: 5,
  },
];

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = readStorage(INVENTORY_KEY, null);
    return Array.isArray(savedProducts) ? savedProducts : sampleProducts;
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [auditLogs, setAuditLogs] = useState(() => {
    const savedLogs = readStorage("inventory-dashboard-audit-log", []);
    return Array.isArray(savedLogs) ? savedLogs : [];
  });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    writeStorage(INVENTORY_KEY, products);
  }, [products]);

  const metrics = useMemo(
    () => ({
      totalProducts: products.length,
      totalUnits: products.reduce(
        (total, product) => total + Number(product.quantity),
        0,
      ),
      lowStock: products.filter(
        (product) => getStockStatus(product.quantity) === "Low stock",
      ).length,
      outOfStock: products.filter(
        (product) => getStockStatus(product.quantity) === "Out of stock",
      ).length,
    }),
    [products],
  );

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" ||
        getStockStatus(product.quantity) === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const recordAuditEvent = useCallback((type, product) => {
    const event = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      productName: product.name,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((currentLogs) => [event, ...currentLogs].slice(0, 50));
  }, []);

  const handleSaveProduct = useCallback(
    (productData) => {
      if (editingProduct) {
        const updatedProduct = { ...productData, id: editingProduct.id };
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProduct.id ? updatedProduct : product,
          ),
        );
        recordAuditEvent("Updated", updatedProduct);
      } else {
        const newProduct = {
          ...productData,
          id: `${Date.now()}-${Math.random()}`,
        };
        setProducts((currentProducts) => [...currentProducts, newProduct]);
        recordAuditEvent("Added", newProduct);
      }

      setEditingProduct(null);
      setIsFormOpen(false);
    },
    [editingProduct, recordAuditEvent],
  );

  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  }, []);

  const handleDeleteProduct = useCallback(
    (product) => {
      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id),
      );
      recordAuditEvent("Deleted", product);
    },
    [recordAuditEvent],
  );

  const handleCancelForm = useCallback(() => {
    setEditingProduct(null);
    setIsFormOpen(false);
  }, []);

  const openNewProductForm = useCallback(() => {
    setEditingProduct(null);
    setIsFormOpen(true);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  }, []);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inventory management</p>
          <h1>Stock dashboard</h1>
          <p className="page-description">
            Manage products, monitor stock, and review recent changes.
          </p>
        </div>
        <button
          className="button button-secondary theme-toggle"
          type="button"
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </header>

      <section className="metrics-grid" aria-label="Inventory summary">
        <CardWrapper className="metric-card">
          <span className="metric-label">Total products</span>
          <strong className="metric-value">{metrics.totalProducts}</strong>
        </CardWrapper>
        <CardWrapper className="metric-card">
          <span className="metric-label">Total stock units</span>
          <strong className="metric-value">{metrics.totalUnits}</strong>
        </CardWrapper>
        <CardWrapper className="metric-card">
          <span className="metric-label">
            Low stock (≤ {LOW_STOCK_THRESHOLD})
          </span>
          <strong className="metric-value">{metrics.lowStock}</strong>
        </CardWrapper>
        <CardWrapper className="metric-card">
          <span className="metric-label">Out of stock</span>
          <strong className="metric-value">{metrics.outOfStock}</strong>
        </CardWrapper>
      </section>

      <section className="inventory-section">
        <div className="section-heading">
          <div>
            <h2>Products</h2>
            <p>
              {filteredProducts.length} of {products.length} products shown
            </p>
          </div>
          <button
            className="button button-primary"
            type="button"
            onClick={openNewProductForm}
          >
            Add product
          </button>
        </div>

        {isFormOpen && (
          <ProductForm
            key={editingProduct?.id ?? "new-product"}
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}

        <ProductList
          products={filteredProducts}
          categories={categories}
          search={search}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onClearFilters={clearFilters}
        />
      </section>

      <AuditLogger logs={auditLogs} />

      <Footer />
    </main>
  );
}

export default App;
