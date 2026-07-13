"use client";

import { useState } from "react";
import { SizeSelector, ColorSelector } from "@/components/product/option-selector";
import { BuyNowDialog } from "@/components/product/buy-now-dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, discountPercent } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/contact-links";
import { getContactInfo, getSiteSettings } from "@/lib/data";
import type { Product } from "@/types/site-data";
import { MessageCircle, ExternalLink, ShoppingCart, Star, Truck, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const contact = getContactInfo();
const site = getSiteSettings();

interface ProductOptionsProps {
  product: Product;
}

export function ProductOptions({ product }: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.find((s) => s.available)?.value ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.find((c) => c.available)?.value ?? null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const discount = product.compareAtPrice
    ? discountPercent(product.price, product.compareAtPrice)
    : 0;

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product.slug}/`
      : `/products/${product.slug}/`;

  const whatsappUrl = buildWhatsAppUrl(
    contact,
    product,
    { size: selectedSize ?? undefined, color: selectedColor ?? undefined },
    productUrl
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <Badge
            key={badge}
            className={
              badge === "sale"
                ? "bg-red-500 text-white"
                : badge === "bestSeller"
                ? "bg-amber-500 text-white"
                : badge === "new"
                ? "bg-blue-500 text-white"
                : "bg-primary text-primary-foreground"
            }
          >
            {badge === "bestSeller"
              ? "Best Seller"
              : badge.charAt(0).toUpperCase() + badge.slice(1)}
          </Badge>
        ))}
        {!product.available && (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      {/* Product name */}
      <h1 className="text-2xl font-extrabold text-foreground leading-tight tracking-tight sm:text-3xl">
        {product.name}
      </h1>

      {/* Reviews placeholder */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex text-amber-400" aria-label="4 out of 5 stars">
          {[1, 2, 3, 4].map((n) => <Star key={n} className="h-3.5 w-3.5 fill-current" />)}
          <Star className="h-3.5 w-3.5" />
        </div>
        <span>No reviews yet</span>
        <span>·</span>
        <span>SKU: {product.sku}</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-primary">
          {formatPrice(product.price, site.currencySymbol)}
        </span>
        {product.compareAtPrice && (
          <span className="text-base text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice, site.currencySymbol)}
          </span>
        )}
        {discount > 0 && (
          <span className="text-sm font-bold text-red-500">-{discount}%</span>
        )}
      </div>

      <Separator />

      {/* Short description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Size selector */}
      <SizeSelector
        sizes={product.sizes}
        selected={selectedSize}
        onChange={setSelectedSize}
      />

      {/* Color selector */}
      {product.colors.length > 1 && (
        <ColorSelector
          colors={product.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
        />
      )}

      <Separator />

      {/* CTA buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-lg bg-green-500 text-white font-bold py-3 px-6 text-base hover:bg-green-600 active:scale-95 transition-all shadow-lg"
          id="product-whatsapp-order"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Order via WhatsApp
        </a>
        <a
          href={contact.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-lg bg-blue-600 text-white font-bold py-3 px-6 text-base hover:bg-blue-700 active:scale-95 transition-all"
          id="product-messenger-order"
        >
          <ExternalLink className="h-5 w-5" aria-hidden />
          Order on Messenger
        </a>
      </div>

      {/* Delivery info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <Truck className="h-4 w-4 text-primary shrink-0" aria-hidden />
          <span>Nationwide delivery 1–5 days</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <RefreshCw className="h-4 w-4 text-primary shrink-0" aria-hidden />
          <span>7-day size exchange</span>
        </div>
      </div>

      {/* Accordions */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="desc">
          <AccordionTrigger className="text-sm font-semibold">Description</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="specs">
          <AccordionTrigger className="text-sm font-semibold">Specifications</AccordionTrigger>
          <AccordionContent>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="contents">
                  <dt className="font-medium text-foreground">{spec.label}</dt>
                  <dd className="text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger className="text-sm font-semibold">Care Instructions</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {product.careInstructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="delivery">
          <AccordionTrigger className="text-sm font-semibold">Shipping & Returns</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-2">
            <p>{product.deliveryNote ?? "Usually ships within 1–2 business days."}</p>
            <p>Delivery charge: ৳60 inside Dhaka, ৳120 outside Dhaka.</p>
            <p>Size exchange accepted within 7 days. Item must be unused and in original condition.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <BuyNowDialog product={product} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
