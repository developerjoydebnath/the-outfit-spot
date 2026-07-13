import { Container } from "@/components/shared/container";
import { Shield, Truck, MessageCircle, RefreshCw, Star, Package } from "lucide-react";
import type { Benefit } from "@/types/site-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Truck, MessageCircle, RefreshCw, Star, Package,
};

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-10 md:py-14 bg-muted/30" aria-labelledby="benefits-heading">
      <Container>
        <div className="text-center mb-8">
          <div className="h-1 w-12 rounded-full bg-primary mb-3 mx-auto" aria-hidden />
          <h2 id="benefits-heading" className="text-xl font-bold text-foreground sm:text-2xl tracking-tight">
            Why Shop With Us?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            The Outfit Spot — Bangladesh&apos;s trusted football jersey store.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {benefits.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon] ?? Shield;
            return (
              <div
                key={benefit.id}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="text-xs font-semibold text-foreground leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
