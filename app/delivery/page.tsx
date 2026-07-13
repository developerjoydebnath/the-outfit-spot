import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { getDeliveryInfo } from "@/lib/data";
import { Truck, CreditCard, RefreshCw, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery & Returns",
  description:
    "Delivery information for The Outfit Spot — estimated times, charges, return policy, and payment methods.",
};

export default function DeliveryPage() {
  const delivery = getDeliveryInfo();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-gradient py-12 text-white text-center">
        <Container>
          <h1 className="text-3xl font-extrabold mb-2">Delivery & Returns</h1>
          <p className="text-white/80 text-sm max-w-sm mx-auto">
            Fast delivery across all 64 districts in Bangladesh.
          </p>
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Delivery areas */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="text-lg font-bold">Delivery Areas & Timelines</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{delivery.estimatedDays}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {delivery.areas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted/40 text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden />
                  {area}
                </div>
              ))}
            </div>
          </section>

          {/* Charges */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="text-lg font-bold">Delivery Charges</h2>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card text-sm text-muted-foreground leading-relaxed">
              {delivery.chargeNote}
            </div>
          </section>

          {/* Return policy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="text-lg font-bold">Return & Exchange Policy</h2>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card text-sm text-muted-foreground leading-relaxed">
              {delivery.returnPolicy}
            </div>
          </section>

          {/* Payment methods */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="text-lg font-bold">Payment Methods</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {delivery.paymentMethods.map((method) => (
                <span
                  key={method}
                  className="px-4 py-2 rounded-lg border border-border bg-muted/30 text-sm font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
