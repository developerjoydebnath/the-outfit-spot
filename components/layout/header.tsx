"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Heart, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchSheet } from "@/components/layout/search-sheet";
import { Container } from "@/components/shared/container";
import type { SiteSettings, ContactInfo, Category } from "@/types/site-data";

const NAV_ITEMS = [
  { label: "World Cup 26", href: "/products/?edition=fan&league=International" },
  { label: "Club Jerseys", href: "/products/?category=club-jerseys" },
  { label: "Fan Edition", href: "/products/?category=fan-edition-jerseys" },
  { label: "Trousers & Shorts", href: "/products/?category=trousers" },
  { label: "New Arrivals", href: "/products/?sort=newest" },
  { label: "Featured", href: "/products/?featured=true" },
];

interface HeaderProps {
  site: SiteSettings;
  contact: ContactInfo;
  categories: Category[];
}

export function Header({ site, contact, categories }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header */}
      <div className="bg-background border-b border-border shadow-sm">
        <Container className="flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label={`${site.name} — Home`}
          >
            {/* Logo image */}
            <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
              <Image
                src={site.logo}
                alt={site.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-sm md:text-base leading-tight text-foreground">
                {site.name}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {site.tagline}
              </p>
            </div>
          </Link>

          {/* Brand tagline (desktop center) */}
          <div className="hidden lg:block text-center flex-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Buy Your Dream Jersey — Where Deals &amp; Dreams Come True
            </p>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              id="header-search-btn"
              className="h-9 w-9"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/contact" aria-label="Contact us">
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products" aria-label="Browse products">
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order via WhatsApp"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </a>
            <div className="ml-1 hidden md:block">
              <ThemeToggle />
            </div>
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Container>
      </div>

      {/* Category navigation bar (desktop) */}
      <nav
        className="hidden md:block bg-primary text-primary-foreground"
        aria-label="Product categories"
      >
        <Container>
          <ul className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href.split("?")[0]);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                      "hover:bg-white/15",
                      isActive && "bg-white/20 font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg">
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-border">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <SearchSheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
        currencySymbol="৳"
      />
    </header>
  );
}
