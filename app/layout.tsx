import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import {
  getAnnouncementConfig,
  getSiteSettings,
  getContactInfo,
  getSocialLinks,
  getAllCategories,
  getFooterConfig,
} from "@/lib/data";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "The Outfit Spot — Wear Your Passion",
    template: "%s | The Outfit Spot",
  },
  description:
    "Shop authentic club jerseys, fan edition jerseys, and sports trousers. Fast delivery across Bangladesh.",
  keywords: ["jersey", "football jersey", "sports wear", "Bangladesh", "club jersey", "fan jersey"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theoutfitspot.com",
    siteName: "The Outfit Spot",
    title: "The Outfit Spot — Wear Your Passion",
    description:
      "Shop authentic club jerseys, fan edition jerseys, and sports trousers. Fast delivery across Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Outfit Spot — Wear Your Passion",
    description:
      "Shop authentic club jerseys, fan edition jerseys, and sports trousers. Fast delivery across Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcement = getAnnouncementConfig();
  const site = getSiteSettings();
  const contact = getContactInfo();
  const social = getSocialLinks();
  const categories = getAllCategories();
  const footer = getFooterConfig();

  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, "h-full antialiased")}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AnalyticsTracker />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <Suspense fallback={null}>
              <Header site={site} contact={contact} categories={categories} />
            </Suspense>
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer site={site} contact={contact} social={social} footer={footer} />
            <MobileNavigation />
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
