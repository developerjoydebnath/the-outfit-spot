import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import type { HeroSection as HeroSectionData } from "@/types/site-data";

interface HeroSectionProps {
  hero: HeroSectionData;
  currencySymbol?: string;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative w-full" aria-labelledby="hero-heading">
      {/* Accessibility Heading */}
      <h1 id="hero-heading" className="sr-only">
        {hero.title}
      </h1>
      
      {/* Hero Image */}
      <div className="w-full">
        <Image
          src={hero.desktopImage}
          alt="The Outfit Spot Collection"
          width={1920}
          height={800}
          className="w-full h-auto block"
          unoptimized
          priority
        />
      </div>
    </section>
  );
}
