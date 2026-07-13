import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { ProductShowcaseSection } from "@/components/home/product-showcase-section";
import { PromotionBanner } from "@/components/home/promotion-banner";
import { BenefitsSection } from "@/components/home/benefits-section";
import { ContactCtaSection } from "@/components/home/contact-cta-section";
import {
  getHeroSection,
  getAllCategories,
  getFeaturedProducts,
  getNewArrivalProducts,
  getBestSellerProducts,
  getProductsByCategory,
  getPromotions,
  getBenefits,
  getContactInfo,
} from "@/lib/data";

export default function HomePage() {
  const hero = getHeroSection();
  const categories = getAllCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivalProducts(8);
  const bestSellers = getBestSellerProducts(8);
  const clubJerseys = getProductsByCategory("club-jerseys").slice(0, 8);
  const fanEdition = getProductsByCategory("fan-edition-jerseys").slice(0, 8);
  const trousers = getProductsByCategory("trousers").slice(0, 8);
  const promotions = getPromotions();
  const benefits = getBenefits();
  const contact = getContactInfo();

  return (
    <>
      <HeroSection hero={hero} />
      <CategorySection categories={categories} />

      {newArrivals.length > 0 && (
        <ProductShowcaseSection
          title="New Arrivals"
          subtitle="Latest jerseys just added to our collection"
          products={newArrivals}
          seeMoreHref="/products/?sort=newest"
          columns={4}
        />
      )}

      {bestSellers.length > 0 && (
        <ProductShowcaseSection
          title="Best Sellers"
          subtitle="Our most popular jerseys loved by fans across Bangladesh"
          products={bestSellers}
          seeMoreHref="/products/?bestSeller=true"
          columns={4}
          className="bg-muted/20"
        />
      )}

      <PromotionBanner promotions={promotions} />

      {clubJerseys.length > 0 && (
        <ProductShowcaseSection
          title="Club Jerseys"
          subtitle="Official fan edition jerseys from the world's top clubs"
          products={clubJerseys}
          seeMoreHref="/products/?category=club-jerseys"
          columns={4}
        />
      )}

      {fanEdition.length > 0 && (
        <ProductShowcaseSection
          title="Fan Edition Jerseys"
          subtitle="National team jerseys from around the world — World Cup 2026"
          products={fanEdition}
          seeMoreHref="/products/?category=fan-edition-jerseys"
          columns={4}
          className="bg-muted/20"
        />
      )}

      {trousers.length > 0 && (
        <ProductShowcaseSection
          title="Trousers & Shorts"
          subtitle="Training trousers, shorts, and joggers for active wear"
          products={trousers}
          seeMoreHref="/products/?category=trousers"
          columns={4}
        />
      )}

      <BenefitsSection benefits={benefits} />
      <ContactCtaSection contact={contact} />
    </>
  );
}
