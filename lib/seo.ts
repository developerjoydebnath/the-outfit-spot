import type { Metadata } from "next";
import type { Product } from "@/types/site-data";
import { getSeoConfig, getSiteSettings } from "@/lib/data";

/** Generate Next.js Metadata for a product detail page. */
export function generateProductMetadata(product: Product): Metadata {
  const seo = getSeoConfig();
  const site = getSiteSettings();

  const title = product.seo.title || `${product.name} | ${site.name}`;
  const description =
    product.seo.description ||
    product.shortDescription ||
    seo.defaultDescription;
  const url = `${seo.siteUrl}/products/${product.slug}/`;
  const image = product.thumbnail || seo.defaultImage;

  return {
    title,
    description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: image.startsWith("/")
            ? `${seo.siteUrl}${image}`
            : image,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Generate JSON-LD Product structured data. */
export function generateProductJsonLd(product: Product): object {
  const seo = getSeoConfig();
  const site = getSiteSettings();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((img) =>
      img.startsWith("/") ? `${seo.siteUrl}${img}` : img
    ),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${seo.siteUrl}/products/${product.slug}/`,
      seller: {
        "@type": "Organization",
        name: site.name,
      },
    },
  };
}

/** Generate JSON-LD BreadcrumbList structured data. */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): object {
  const seo = getSeoConfig();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("/")
        ? `${seo.siteUrl}${item.url}`
        : item.url,
    })),
  };
}
