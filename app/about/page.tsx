import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { getAboutInfo, getSiteSettings } from "@/lib/data";
import { Shield, Star, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Outfit Spot — Bangladesh's trusted football jersey store. Our story, mission, and values.",
};

export default function AboutPage() {
  const about = getAboutInfo();
  const site = getSiteSettings();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-gradient py-16 text-white text-center">
        <Container>
          <h1 className="text-3xl font-extrabold mb-3">{about.title}</h1>
          <p className="text-white/80 max-w-xl mx-auto text-base">{site.tagline}</p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-xl font-bold mb-3">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">{about.description}</p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">{about.mission}</p>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-xl font-bold mb-5">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: Shield, title: "Authentic Quality", desc: "Every jersey is inspected before dispatch. Fan edition quality built to last." },
                { icon: Truck, title: "Nationwide Delivery", desc: "We deliver to all 64 districts. Fast and reliable shipping across Bangladesh." },
                { icon: Star, title: "Best Prices", desc: "Premium fan edition jerseys at prices that respect your budget." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-border bg-muted/30 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
