export const LOW_STOCK_THRESHOLD = 5;

export function getStockStatus(quantity) {
  if (Number(quantity) === 0) return "Out of stock";
  if (Number(quantity) <= LOW_STOCK_THRESHOLD) return "Low stock";
  return "In stock";
}
