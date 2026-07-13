"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";

const allProducts = getAllProducts();

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currencySymbol?: string;
}

export function SearchSheet({
  open,
  onOpenChange,
  currencySymbol = "৳",
}: SearchSheetProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.trim().length > 1
    ? allProducts
        .filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.club.toLowerCase().includes(q) ||
            p.categorySlug.toLowerCase().includes(q) ||
            p.league.toLowerCase().includes(q)
          );
        })
        .slice(0, 8)
    : [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/products/?q=${encodeURIComponent(query.trim())}`);
        onOpenChange(false);
        setQuery("");
      }
    },
    [query, router, onOpenChange]
  );

  const handleClose = () => {
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-auto max-h-[80vh] overflow-y-auto p-0">
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="sr-only">Product Search</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
              <Input
                autoFocus
                type="search"
                placeholder="Search jerseys, clubs, countries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                aria-label="Search products"
              />
            </div>
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button type="submit" disabled={!query.trim()}>
              Search
            </Button>
          </form>

          {results.length > 0 && (
            <ul className="divide-y divide-border rounded-lg border" role="listbox" aria-label="Search results">
              {results.map((product) => (
                <li key={product.id} role="option" aria-selected={false}>
                  <Link
                    href={`/products/${product.slug}/`}
                    onClick={handleClose}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/jersey.webp";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{product.club}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary shrink-0">
                      {formatPrice(product.price, currencySymbol)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length > 1 && results.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No products found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
