"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Phone, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SearchSheet } from "@/components/layout/search-sheet";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products/", icon: Grid3X3 },
  { label: "Search", href: "#search", icon: Search, isSearch: true },
  { label: "Order", href: "#whatsapp", icon: ShoppingBag, isWhatsApp: true },
  { label: "Contact", href: "/contact/", icon: Phone },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-lg pb-safe"
        aria-label="Mobile bottom navigation"
      >
        <ul className="flex items-center justify-around">
          {NAV_ITEMS.map(({ label, href, icon: Icon, isSearch, isWhatsApp }) => {
            if (isSearch) {
              return (
                <li key={label}>
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    className="flex flex-col items-center gap-0.5 px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="text-[10px] font-medium">{label}</span>
                  </button>
                </li>
              );
            }

            if (isWhatsApp) {
              return (
                <li key={label}>
                  <a
                    href={`https://wa.me/8801712345678`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Order via WhatsApp"
                    className="flex flex-col items-center gap-0.5 px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="text-[10px] font-medium">{label}</span>
                  </a>
                </li>
              );
            }

            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname?.startsWith(href.replace(/\/$/, ""));

            return (
              <li key={label}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive && "fill-primary/20"
                    )}
                    aria-hidden
                  />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} currencySymbol="৳" />
    </>
  );
}
