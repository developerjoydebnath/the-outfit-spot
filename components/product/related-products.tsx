import { getRelatedProducts } from "@/lib/data";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/shared/container";
import type { Product } from "@/types/site-data";

interface RelatedProductsProps {
  product: Product;
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="py-10 md:py-14" aria-labelledby="related-heading">
      <Container>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-primary mb-2" aria-hidden />
          <h2 id="related-heading" className="text-xl font-bold text-foreground tracking-tight">
            You May Also Like
          </h2>
        </div>
        <ProductGrid products={related} columns={4} currencySymbol="৳" />
      </Container>
    </section>
  );
}
