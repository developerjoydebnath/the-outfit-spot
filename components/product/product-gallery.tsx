"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const allImages = images.length > 0 ? images : ["/images/jersey.webp"];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden bg-muted border border-border group">
        <Image
          src={allImages[activeIndex]}
          alt={`${productName} — image ${activeIndex + 1}`}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          unoptimized
          priority
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/jersey.webp";
          }}
        />
        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-4 w-4 text-foreground" aria-hidden />
        </div>
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="listbox" aria-label="Product images">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-150",
                i === activeIndex
                  ? "border-primary shadow-md"
                  : "border-border hover:border-primary/50"
              )}
              role="option"
              aria-selected={i === activeIndex}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/jersey.webp";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
