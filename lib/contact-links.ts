import type { Product, ContactInfo } from "@/types/site-data";

interface ProductSelections {
  size?: string;
  color?: string;
  edition?: string;
  quantity?: number;
}

/** Build the enquiry message text for WhatsApp / Messenger. */
export function buildEnquiryMessage(
  product: Product,
  selections: ProductSelections,
  productUrl: string
): string {
  const lines: string[] = [
    "Hello, I want to buy this product.",
    "",
    `Product: ${product.name}`,
    `Product Code: ${product.sku}`,
    `Category: ${product.categorySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")}`,
  ];

  if (selections.edition) {
    lines.push(`Edition: ${selections.edition}`);
  }
  if (selections.size) {
    lines.push(`Size: ${selections.size.toUpperCase()}`);
  }
  if (selections.color) {
    const colorObj = product.colors.find((c) => c.value === selections.color);
    lines.push(`Color: ${colorObj?.name ?? selections.color}`);
  }

  lines.push(`Price: ৳${product.price.toLocaleString()}`);
  lines.push(`Product Link: ${productUrl}`);
  lines.push("");
  lines.push("Please confirm availability and delivery details.");

  return lines.join("\n");
}

/** Generate the WhatsApp click-to-chat URL with pre-filled message. */
export function buildWhatsAppUrl(
  contact: ContactInfo,
  product: Product,
  selections: ProductSelections,
  productUrl: string
): string {
  const message = buildEnquiryMessage(product, selections, productUrl);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${contact.whatsappNumber}?text=${encoded}`;
}

/** Return the Messenger URL for the seller. */
export function buildMessengerUrl(contact: ContactInfo): string {
  return contact.messengerUrl || `https://m.me/${contact.messengerUsername}`;
}
