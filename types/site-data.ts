// TypeScript types for the Jersey Store site data model

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  currency: string;
  currencySymbol: string;
  logo: string;
  favicon: string;
  defaultProductImage: string;
}

export interface ContactInfo {
  phone: string;
  whatsappNumber: string;
  messengerUsername: string;
  messengerUrl: string;
  email: string;
  address: string;
  businessHours: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  text: string;
  link?: string;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface HeroSection {
  eyebrow: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  displayOrder: number;
}

export interface ProductColor {
  name: string;
  value: string;
  hex: string;
  available: boolean;
}

export interface ProductSize {
  label: string;
  value: string;
  available: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductSeo {
  title: string;
  description: string;
  keywords: string[];
}

export type ProductBadge = "new" | "featured" | "bestSeller" | "sale";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categorySlug: string;
  productType: string;
  club: string;
  teamType: "club" | "national" | "generic";
  league: string;
  season: string;
  edition: string;
  sleeveType: string;
  gender: string;
  price: number;
  compareAtPrice?: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  thumbnail: string;
  badges: ProductBadge[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  available: boolean;
  displayOrder: number;
  specifications: ProductSpec[];
  careInstructions: string[];
  deliveryNote?: string;
  seo: ProductSeo;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: CtaButton;
  active: boolean;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  description: string;
  sections: FooterSection[];
  copyrightText: string;
}

export interface SeoConfig {
  defaultTitle: string;
  defaultDescription: string;
  siteUrl: string;
  defaultImage: string;
}

export interface DeliveryInfo {
  areas: string[];
  estimatedDays: string;
  chargeNote: string;
  returnPolicy: string;
  paymentMethods: string[];
}

export interface AboutInfo {
  title: string;
  description: string;
  mission: string;
}

export interface SiteData {
  site: SiteSettings;
  contact: ContactInfo;
  socialLinks: SocialLinks;
  announcement: AnnouncementConfig;
  hero: HeroSection;
  categories: Category[];
  products: Product[];
  promotions: Promotion[];
  benefits: Benefit[];
  footer: FooterConfig;
  seo: SeoConfig;
  delivery: DeliveryInfo;
  about: AboutInfo;
}

// Filter state type used in the products page
export interface ProductFilters {
  query: string;
  categories: string[];
  clubs: string[];
  editions: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  available: boolean;
  featured: boolean;
  newArrival: boolean;
}

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export interface FilterOptions {
  categories: Array<{ value: string; label: string }>;
  clubs: string[];
  editions: string[];
  sizes: string[];
  colors: Array<{ value: string; label: string; hex: string }>;
  priceRange: { min: number; max: number };
}
