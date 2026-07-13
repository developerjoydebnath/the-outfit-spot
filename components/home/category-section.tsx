"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import type { Category } from "@/types/site-data";

interface CategorySectionProps {
  categories: Category[];
}


export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-8 md:py-12 bg-muted/30" aria-labelledby="categories-heading">
      <Container>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-primary mb-2" aria-hidden />
          <h2 id="categories-heading" className="text-xl font-bold text-foreground sm:text-2xl tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Browse our complete jersey collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/products/?category=${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] flex items-end shadow-md hover:shadow-xl transition-shadow duration-300"
                aria-label={`Browse ${category.name}`}
              >
                {/* Category image */}
                <div className="absolute inset-0" aria-hidden>
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/jersey.webp";
                    }}
                  />
                </div>

                {/* Background overlay for text readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-colors"
                  aria-hidden
                />

                {/* Content */}
                <div className="relative p-5 text-white w-full">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-1">
                    {category.featured ? "🔥 Popular" : "Browse"}
                  </p>
                  <h3 className="text-lg font-bold leading-tight group-hover:underline underline-offset-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-3 inline-flex items-center text-xs font-semibold text-white/90 border border-white/30 rounded-full px-3 py-1 bg-white/10 group-hover:bg-white/20 transition-colors">
                    Shop Now →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
