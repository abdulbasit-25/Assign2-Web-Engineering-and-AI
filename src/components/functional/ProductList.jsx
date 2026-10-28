import ProductCard from "./ProductCard.jsx";

function ProductList({
  products,
  categories,
  search,
  categoryFilter,
  statusFilter,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onEdit,
  onDelete,
  onClearFilters,
}) {
  return (
    <>
      <div className="filter-bar">
        <label className="search-field">
          Search products
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name"
          />
        </label>
        <label>
          Category
          <select value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label>
          Stock status
          <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="In stock">In stock</option>
            <option value="Low stock">Low stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </label>
        <button className="button button-secondary clear-button" type="button" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
      <div className="table-scroll">
        <table className="product-table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try changing the search or filters, or add a new product.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
