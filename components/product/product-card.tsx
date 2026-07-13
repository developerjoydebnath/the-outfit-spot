"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatPrice, discountPercent } from "@/lib/format";
import type { Product } from "@/types/site-data";
import { MessageCircle, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  currencySymbol?: string;
  className?: string;
}

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-500 text-white" },
  featured: { label: "Featured", className: "bg-primary text-primary-foreground" },
  bestSeller: { label: "Best Seller", className: "bg-amber-500 text-white" },
  sale: { label: "Sale", className: "bg-red-500 text-white" },
};

export function ProductCard({ product, currencySymbol = "৳", className }: ProductCardProps) {
  const discount = product.compareAtPrice
    ? discountPercent(product.price, product.compareAtPrice)
    : 0;

  const primaryBadge = product.badges[0];
  const badge = primaryBadge ? BADGE_CONFIG[primaryBadge] : null;

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-card border border-border rounded-lg overflow-hidden card-hover shadow-sm",
        className
      )}
    >
      {/* Product image */}
      <Link
        href={`/products/${product.slug}/`}
        className="block relative overflow-hidden bg-muted/30"
        tabIndex={-1}
        aria-hidden
      >
        <div className="aspect-[4/5] relative">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/jersey.webp";
            }}
          />
          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-full",
                badge.className
              )}
            >
              {badge.label}
            </span>
          )}
          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-2 right-2 text-[11px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {/* Unavailable overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground bg-background/80 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Category label */}
        <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
          {product.club}
        </p>

        {/* Product name */}
        <Link
          href={`/products/${product.slug}/`}
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
        >
          {product.name}
        </Link>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.value}
                title={color.name}
                className={cn(
                  "h-4 w-4 rounded-full border border-border shadow-sm shrink-0",
                  !color.available && "opacity-40"
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Sizes */}
        <div className="flex items-center gap-1 flex-wrap" aria-label="Available sizes">
          {product.sizes
            .filter((s) => s.available)
            .slice(0, 5)
            .map((s) => (
              <span
                key={s.value}
                className="text-[10px] font-medium px-1.5 py-0.5 border border-border rounded text-muted-foreground uppercase"
              >
                {s.label}
              </span>
            ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-primary">
            {formatPrice(product.price, currencySymbol)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice, currencySymbol)}
            </span>
          )}
        </div>

        {/* CTA button */}
        <Link
          href={`/products/${product.slug}/`}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
          )}
        >
          <ShoppingCart className="h-3.5 w-3.5" aria-hidden />
          Buy Now
        </Link>
      </div>
    </article>
  );
}
