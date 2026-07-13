/** Format a numeric price with the currency symbol. */
export function formatPrice(
  amount: number,
  symbol: string = "৳"
): string {
  return `${symbol}${amount.toLocaleString("en-BD")}`;
}

/** Calculate discount percentage between price and compareAtPrice. */
export function discountPercent(
  price: number,
  compareAtPrice: number
): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/** Convert a string to a URL-friendly slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Capitalize the first letter of every word in a slug or string. */
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Get a display label for a size value. */
export function sizeLabel(value: string): string {
  return value.toUpperCase();
}

/** Truncate text to a given number of characters. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
