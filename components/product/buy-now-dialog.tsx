"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SizeSelector, ColorSelector } from "@/components/product/option-selector";
import { buildWhatsAppUrl, buildMessengerUrl } from "@/lib/contact-links";
import { formatPrice } from "@/lib/format";
import { getContactInfo, getSiteSettings } from "@/lib/data";
import type { Product } from "@/types/site-data";
import { MessageCircle, ExternalLink } from "lucide-react";

const contact = getContactInfo();
const site = getSiteSettings();

interface BuyNowDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyNowDialog({ product, open, onOpenChange }: BuyNowDialogProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.find((s) => s.available)?.value ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.find((c) => c.available)?.value ?? null
  );

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product.slug}/`
      : `/products/${product.slug}/`;

  const whatsappUrl = buildWhatsAppUrl(contact, product, { size: selectedSize ?? undefined, color: selectedColor ?? undefined }, productUrl);
  const messengerUrl = buildMessengerUrl(contact);

  const canOrder = selectedSize !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Quick Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Product summary */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground line-clamp-2">{product.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{product.sku}</p>
              <p className="text-base font-bold text-primary mt-1">
                {formatPrice(product.price, site.currencySymbol)}
              </p>
            </div>
          </div>

          {/* Size selection */}
          <SizeSelector
            sizes={product.sizes}
            selected={selectedSize}
            onChange={setSelectedSize}
          />

          {/* Color selection */}
          {product.colors.length > 0 && (
            <ColorSelector
              colors={product.colors}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          )}

          {!canOrder && (
            <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-md">
              Please select a size to continue.
            </p>
          )}

          {/* Order buttons */}
          <div className="flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-lg bg-green-500 text-white font-bold px-4 py-3 text-sm transition-colors ${canOrder ? "hover:bg-green-600" : "opacity-50 pointer-events-none"}`}
              onClick={() => canOrder && onOpenChange(false)}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Order via WhatsApp
            </a>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-bold px-4 py-3 text-sm hover:bg-blue-700 transition-colors"
              onClick={() => onOpenChange(false)}
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Message on Messenger
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
