import { useEffect, useRef, useState } from "react";

const emptyForm = { name: "", category: "", price: "", quantity: "" };

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState(() =>
    product
      ? {
          name: product.name,
          category: product.category,
          price: String(product.price),
          quantity: String(product.quantity),
        }
      : emptyForm,
  );
  const [error, setError] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = formData.name.trim();
    const category = formData.category.trim();
    const price = Number(formData.price);
    const quantity = Number(formData.quantity);

    if (
      !name ||
      !category ||
      formData.price === "" ||
      formData.quantity === ""
    ) {
      setError("Complete all fields before saving.");
      return;
    }
    if (
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      setError("Enter a valid non-negative price and whole-number quantity.");
      return;
    }

    setError("");
    onSave({ name, category, price, quantity });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h3>{product ? "Edit product" : "Add a product"}</h3>
        <p>Enter the product details below.</p>
      </div>
      <div className="form-fields">
        <label>
          Product name
          <input
            ref={nameInputRef}
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="80"
            autoComplete="off"
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            maxLength="50"
            autoComplete="off"
          />
        </label>
        <label>
          Price (Rs)
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity
          <input
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {product ? "Save changes" : "Add product"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
