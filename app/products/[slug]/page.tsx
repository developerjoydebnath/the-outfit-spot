import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/lib/data";
import { generateProductMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductOptions } from "@/components/product/product-options";
import { RelatedProducts } from "@/components/product/related-products";
import { Container } from "@/components/shared/container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Generate static params for all 60 products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Generate metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return generateProductMetadata(product);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: product.categorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), url: `/products/?category=${product.categorySlug}` },
    { name: product.name, url: `/products/${product.slug}/` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-muted/40 border-b border-border">
          <Container className="py-2.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1 flex-wrap text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3" />
                </li>
                <li>
                  <Link
                    href={`/products/?category=${product.categorySlug}`}
                    className="hover:text-primary transition-colors capitalize"
                  >
                    {product.categorySlug.replace(/-/g, " ")}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3" />
                </li>
                <li className="text-foreground font-medium truncate max-w-[200px]">
                  {product.name}
                </li>
              </ol>
            </nav>
          </Container>
        </div>

        {/* Product layout */}
        <Container className="py-8 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Gallery */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Options panel (client) */}
            <div>
              <ProductOptions product={product} />
            </div>
          </div>
        </Container>

        {/* Related products */}
        <div className="border-t border-border">
          <RelatedProducts product={product} />
        </div>
      </div>
    </>
  );
}
