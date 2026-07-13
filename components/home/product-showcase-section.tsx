import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/types/site-data";
import { cn } from "@/lib/utils";

interface ProductShowcaseSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  seeMoreHref?: string;
  currencySymbol?: string;
  columns?: 2 | 3 | 4;
  className?: string;
  accentColor?: "default" | "primary";
}

export function ProductShowcaseSection({
  title,
  subtitle,
  products,
  seeMoreHref,
  currencySymbol = "৳",
  columns = 4,
  className,
  accentColor = "default",
}: ProductShowcaseSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("py-8 md:py-12", className)} aria-labelledby={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div
              className={cn(
                "h-1 w-12 rounded-full mb-2",
                accentColor === "primary" ? "bg-primary" : "bg-primary"
              )}
              aria-hidden
            />
            <h2
              id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-xl font-bold text-foreground sm:text-2xl tracking-tight"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {seeMoreHref && (
            <Link
              href={seeMoreHref}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 border border-primary/30 px-3 py-1.5 rounded-md hover:bg-primary/5"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <ProductGrid
          products={products.slice(0, columns === 4 ? 8 : columns * 2)}
          columns={columns}
          currencySymbol={currencySymbol}
        />
      </Container>
    </section>
  );
}
