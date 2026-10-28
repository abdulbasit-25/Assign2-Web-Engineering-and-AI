import { getStockStatus } from "../../utils/inventory.js";

function ProductCard({ product, onEdit, onDelete }) {
  const status = getStockStatus(product.quantity);
  const statusClass = status.toLowerCase().replaceAll(" ", "-");

  return (
    <tr>
      <td className="product-name">{product.name}</td>
      <td>{product.category}</td>
      <td>Rs {Number(product.price).toFixed(2)}</td>
      <td>{product.quantity}</td>
      <td>
        <span className={`status-badge status-${statusClass}`}>{status}</span>
      </td>
      <td className="actions-cell">
        <button
          className="text-button"
          type="button"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="text-button delete-button"
          type="button"
          onClick={() => onDelete(product)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductCard;
