import type { SiteData, Product, Category, FilterOptions } from "@/types/site-data";
import rawData from "@/data/site-data.json";

const data = rawData as SiteData;

// ─── Site Settings ──────────────────────────────────────────────────────────
export function getSiteSettings() {
  return data.site;
}

export function getContactInfo() {
  return data.contact;
}

export function getSocialLinks() {
  return data.socialLinks;
}

export function getAnnouncementConfig() {
  return data.announcement;
}

export function getHeroSection() {
  return data.hero;
}

export function getPromotions() {
  return data.promotions;
}

export function getBenefits() {
  return data.benefits;
}

export function getFooterConfig() {
  return data.footer;
}

export function getSeoConfig() {
  return data.seo;
}

export function getDeliveryInfo() {
  return data.delivery;
}

export function getAboutInfo() {
  return data.about;
}

// ─── Categories ─────────────────────────────────────────────────────────────
export function getAllCategories(): Category[] {
  return [...data.categories].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((cat) => cat.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return getAllCategories().filter((cat) => cat.featured);
}

// ─── Products ───────────────────────────────────────────────────────────────
export function getAllProducts(): Product[] {
  return [...data.products].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const products = getAllProducts().filter((p) => p.featured && p.available);
  return limit ? products.slice(0, limit) : products;
}

export function getNewArrivalProducts(limit?: number): Product[] {
  const products = getAllProducts().filter((p) => p.newArrival && p.available);
  return limit ? products.slice(0, limit) : products;
}

export function getBestSellerProducts(limit?: number): Product[] {
  const products = getAllProducts().filter((p) => p.bestSeller && p.available);
  return limit ? products.slice(0, limit) : products;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        p.available &&
        (p.categorySlug === product.categorySlug ||
          p.club === product.club)
    )
    .slice(0, limit);
}

// ─── Filter Options ─────────────────────────────────────────────────────────
export function getAvailableFilterOptions(products: Product[]): FilterOptions {
  const categoryMap = new Map<string, string>();
  const clubs = new Set<string>();
  const editions = new Set<string>();
  const sizes = new Set<string>();
  const colorMap = new Map<string, { label: string; hex: string }>();
  let minPrice = Infinity;
  let maxPrice = 0;

  const categories = getAllCategories();

  for (const product of products) {
    // Category
    const cat = categories.find((c) => c.slug === product.categorySlug);
    if (cat) categoryMap.set(cat.slug, cat.name);

    // Club (exclude generics)
    if (product.club && product.club !== "Generic") {
      clubs.add(product.club);
    }

    // Edition
    if (product.edition) editions.add(product.edition);

    // Sizes
    for (const size of product.sizes) {
      if (size.available) sizes.add(size.value);
    }

    // Colors
    for (const color of product.colors) {
      if (color.available) {
        colorMap.set(color.value, { label: color.name, hex: color.hex });
      }
    }

    // Price range
    if (product.price < minPrice) minPrice = product.price;
    if (product.price > maxPrice) maxPrice = product.price;
  }

  return {
    categories: Array.from(categoryMap.entries()).map(([value, label]) => ({
      value,
      label,
    })),
    clubs: Array.from(clubs).sort(),
    editions: Array.from(editions).sort(),
    sizes: ["s", "m", "l", "xl", "xxl"].filter((s) => sizes.has(s)),
    colors: Array.from(colorMap.entries()).map(([value, { label, hex }]) => ({
      value,
      label,
      hex,
    })),
    priceRange: {
      min: minPrice === Infinity ? 0 : minPrice,
      max: maxPrice,
    },
  };
}
