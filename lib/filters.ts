import type { Product, ProductFilters, SortKey } from "@/types/site-data";

/** Apply all active filters to a product list (client-side, browser only). */
export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let result = [...products];

  // Text search — name, SKU, club, categorySlug, league
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.club.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        p.league.toLowerCase().includes(q) ||
        p.season.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.categories.length > 0) {
    result = result.filter((p) =>
      filters.categories.includes(p.categorySlug)
    );
  }

  // Club
  if (filters.clubs.length > 0) {
    result = result.filter((p) => filters.clubs.includes(p.club));
  }

  // Edition
  if (filters.editions.length > 0) {
    result = result.filter((p) => filters.editions.includes(p.edition));
  }

  // Size — product must have at least one matching available size
  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      p.sizes.some(
        (s) => filters.sizes.includes(s.value) && s.available
      )
    );
  }

  // Color — product must have at least one matching available color
  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.colors.some(
        (c) => filters.colors.includes(c.value) && c.available
      )
    );
  }

  // Price range
  if (filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice > 0) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  // Availability
  if (filters.available) {
    result = result.filter((p) => p.available);
  }

  // Featured
  if (filters.featured) {
    result = result.filter((p) => p.featured);
  }

  // New arrival
  if (filters.newArrival) {
    result = result.filter((p) => p.newArrival);
  }

  return result;
}

/** Sort a product list by the given key. */
export function sortProducts(products: Product[], sortKey: SortKey): Product[] {
  const sorted = [...products];

  switch (sortKey) {
    case "featured":
      sorted.sort((a, b) => {
        // Featured first, then bestSeller, then displayOrder
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.bestSeller !== b.bestSeller) return a.bestSeller ? -1 : 1;
        return a.displayOrder - b.displayOrder;
      });
      break;

    case "newest":
      sorted.sort((a, b) => {
        if (a.newArrival !== b.newArrival) return a.newArrival ? -1 : 1;
        return a.displayOrder - b.displayOrder;
      });
      break;

    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      break;
  }

  return sorted;
}

/** Build a default empty filter state. */
export function defaultFilters(): ProductFilters {
  return {
    query: "",
    categories: [],
    clubs: [],
    editions: [],
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 0,
    available: false,
    featured: false,
    newArrival: false,
  };
}

/** Parse URL search params into a filter state. */
export function filtersFromSearchParams(
  params: URLSearchParams,
  maxPriceDefault: number
): ProductFilters {
  const get = (key: string) => params.get(key) || "";
  const getArr = (key: string) => {
    const val = params.get(key);
    if (!val) return [];
    return val.split(",").filter(Boolean);
  };

  return {
    query: get("q"),
    categories: getArr("category"),
    clubs: getArr("club"),
    editions: getArr("edition"),
    sizes: getArr("size"),
    colors: getArr("color"),
    minPrice: Number(get("minPrice")) || 0,
    maxPrice: Number(get("maxPrice")) || maxPriceDefault,
    available: params.get("available") === "true",
    featured: params.get("featured") === "true",
    newArrival: params.get("newArrival") === "true",
  };
}

/** Serialize filters into URL search params. */
export function filtersToSearchParams(filters: ProductFilters, sort: SortKey): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) params.set("q", filters.query);
  if (filters.categories.length > 0) params.set("category", filters.categories.join(","));
  if (filters.clubs.length > 0) params.set("club", filters.clubs.join(","));
  if (filters.editions.length > 0) params.set("edition", filters.editions.join(","));
  if (filters.sizes.length > 0) params.set("size", filters.sizes.join(","));
  if (filters.colors.length > 0) params.set("color", filters.colors.join(","));
  if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice > 0) params.set("maxPrice", String(filters.maxPrice));
  if (filters.available) params.set("available", "true");
  if (filters.featured) params.set("featured", "true");
  if (filters.newArrival) params.set("newArrival", "true");
  if (sort && sort !== "featured") params.set("sort", sort);

  return params;
}

/** Check if any filter is active (aside from default state). */
export function hasActiveFilters(filters: ProductFilters, maxPrice: number): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.categories.length > 0 ||
    filters.clubs.length > 0 ||
    filters.editions.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.minPrice > 0 ||
    (filters.maxPrice > 0 && filters.maxPrice < maxPrice) ||
    filters.available ||
    filters.featured ||
    filters.newArrival
  );
}
