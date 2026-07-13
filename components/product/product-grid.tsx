import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/site-data";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  currencySymbol?: string;
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  currencySymbol = "৳",
  className,
}: ProductGridProps) {
  const gridClass = {
    2: "grid-cols-2 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-3 sm:gap-4", gridClass, className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currencySymbol={currencySymbol}
        />
      ))}
    </div>
  );
}
