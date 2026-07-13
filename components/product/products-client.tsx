"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { MobileFilterDrawer } from "@/components/product/mobile-filter-drawer";
import { ProductSort } from "@/components/product/product-sort";
import { EmptyState } from "@/components/shared/empty-state";
import { Container } from "@/components/shared/container";
import {
  filterProducts,
  sortProducts,
  defaultFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  hasActiveFilters,
} from "@/lib/filters";
import { getAllProducts, getAvailableFilterOptions, getAllCategories } from "@/lib/data";
import type { ProductFilters as FiltersType, SortKey } from "@/types/site-data";

const ALL_PRODUCTS = getAllProducts();
const FILTER_OPTIONS = getAvailableFilterOptions(ALL_PRODUCTS);
const MAX_PRICE = FILTER_OPTIONS.priceRange.max;

export function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Initialize from URL params
  const [filters, setFilters] = useState<FiltersType>(() =>
    filtersFromSearchParams(new URLSearchParams(searchParams.toString()), MAX_PRICE)
  );
  const [sortKey, setSortKey] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) ?? "featured"
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("q") ?? ""
  );

  // Sync URL → state when params change externally (nav link clicks)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setFilters(filtersFromSearchParams(params, MAX_PRICE));
    setSortKey((params.get("sort") as SortKey) ?? "featured");
    setSearchInput(params.get("q") ?? "");
  }, [searchParams]);

  // Push filter state to URL
  const pushUrl = useCallback(
    (nextFilters: FiltersType, nextSort: SortKey) => {
      const params = filtersToSearchParams(nextFilters, nextSort);
      const query = params.toString();
      router.replace(query ? `/products/?${query}` : "/products/", { scroll: false });
    },
    [router]
  );

  const handleFilterChange = useCallback(
    (nextFilters: FiltersType) => {
      setFilters(nextFilters);
      pushUrl(nextFilters, sortKey);
    },
    [sortKey, pushUrl]
  );

  const handleSortChange = useCallback(
    (nextSort: SortKey) => {
      setSortKey(nextSort);
      pushUrl(filters, nextSort);
    },
    [filters, pushUrl]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { ...filters, query: searchInput };
    handleFilterChange(next);
  };

  const handleReset = useCallback(() => {
    const def = defaultFilters();
    setFilters(def);
    setSortKey("featured");
    setSearchInput("");
    router.replace("/products/", { scroll: false });
  }, [router]);

  // Apply filters + sort
  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(ALL_PRODUCTS, filters), sortKey),
    [filters, sortKey]
  );

  const activeCount = useMemo(
    () =>
      hasActiveFilters(filters, MAX_PRICE)
        ? Object.entries(filters).reduce((acc, [k, v]) => {
            if (k === "query" && (v as string).trim()) return acc + 1;
            if (Array.isArray(v) && (v as string[]).length > 0) return acc + 1;
            if (typeof v === "boolean" && v) return acc + 1;
            if (k === "minPrice" && v > 0) return acc + 1;
            if (k === "maxPrice" && v > 0 && v < MAX_PRICE) return acc + 1;
            return acc;
          }, 0)
        : 0,
    [filters]
  );

  // Active filter chips for display
  const activeChips = useMemo(() => {
    const chips: { label: string; key: string; value?: string }[] = [];
    if (filters.query) chips.push({ label: `"${filters.query}"`, key: "query" });
    filters.categories.forEach((c) =>
      chips.push({ label: c.replace(/-/g, " "), key: "categories", value: c })
    );
    filters.sizes.forEach((s) =>
      chips.push({ label: s.toUpperCase(), key: "sizes", value: s })
    );
    filters.colors.forEach((c) =>
      chips.push({ label: c.replace(/-/g, " "), key: "colors", value: c })
    );
    if (filters.newArrival) chips.push({ label: "New Arrivals", key: "newArrival" });
    if (filters.featured) chips.push({ label: "Featured", key: "featured" });
    if (filters.available) chips.push({ label: "In Stock", key: "available" });
    return chips;
  }, [filters]);

  const removeChip = (chip: { key: string; value?: string }) => {
    let next = { ...filters };
    if (chip.key === "query") next = { ...next, query: "" };
    else if (chip.key === "newArrival") next = { ...next, newArrival: false };
    else if (chip.key === "featured") next = { ...next, featured: false };
    else if (chip.key === "available") next = { ...next, available: false };
    else if (chip.value) {
      const arr = next[chip.key as keyof FiltersType] as string[];
      (next as Record<string, unknown>)[chip.key] = arr.filter((v) => v !== chip.value);
    }
    handleFilterChange(next);
  };

  return (
    <div className="py-6 md:py-8">
      <Container>
        {/* Page header */}
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li aria-hidden>/</li>
              <li className="text-foreground font-medium">All Products</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            {filters.categories.length === 1
              ? filters.categories[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
              : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              placeholder="Search jerseys, clubs, countries..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
              aria-label="Search products"
            />
          </div>
          {searchInput && (
            <Button type="button" variant="ghost" size="icon" onClick={() => { setSearchInput(""); handleFilterChange({ ...filters, query: "" }); }}>
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button type="submit" variant="outline" size="sm">Search</Button>
        </form>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden gap-2"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                {activeCount}
              </Badge>
            )}
          </Button>
          <div className="flex-1 md:hidden" />
          <ProductSort value={sortKey} onChange={handleSortChange} />
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value ?? "true"}`}
                onClick={() => removeChip(chip)}
                className="flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main layout: sidebar + grid */}
        <div className="flex gap-6 md:gap-8">
          {/* Sidebar (desktop) */}
          <aside
            className="hidden md:block w-52 lg:w-56 shrink-0"
            aria-label="Product filters"
          >
            <div className="sticky top-[8.5rem] rounded-xl border border-border bg-card p-4 shadow-sm">
              <ProductFilters
                options={FILTER_OPTIONS}
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                activeCount={activeCount}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or searching for something else."
                actionLabel="Clear all filters"
                onAction={handleReset}
              />
            ) : (
              <ProductGrid
                products={filteredProducts}
                columns={3}
                currencySymbol="৳"
              />
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        options={FILTER_OPTIONS}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        activeCount={activeCount}
      />
    </div>
  );
}
