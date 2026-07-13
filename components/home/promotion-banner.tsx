import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { Promotion } from "@/types/site-data";

interface PromotionBannerProps {
  promotions: Promotion[];
}

export function PromotionBanner({ promotions }: PromotionBannerProps) {
  const active = promotions.filter((p) => p.active);
  if (active.length === 0) return null;
  const promo = active[0];

  return (
    <section className="py-8 md:py-12" aria-labelledby="promo-heading">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-rose-800 shadow-xl">
          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 50%, white 0%, transparent 50%)",
            }}
            aria-hidden
          />
          <div className="absolute top-0 right-0 w-48 h-48 text-white/5 text-[12rem] font-black leading-none select-none" aria-hidden>
            ⚽
          </div>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-white text-center md:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-4">
                🌟 Exclusive
              </span>
              <h2 id="promo-heading" className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">
                {promo.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-md mb-6">
                {promo.description}
              </p>
              <Link
                href={promo.cta.href}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-red-700 font-bold px-6 py-3 hover:bg-red-50 transition-colors shadow-lg text-sm"
              >
                {promo.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 text-center text-white shrink-0">
              <div>
                <p className="text-3xl font-extrabold">60+</p>
                <p className="text-xs text-white/70 mt-0.5">Jerseys</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">3</p>
                <p className="text-xs text-white/70 mt-0.5">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">64</p>
                <p className="text-xs text-white/70 mt-0.5">Districts</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
