"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductColor, ProductSize } from "@/types/site-data";

// ─── Size Selector ─────────────────────────────────────────────────────────

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: string | null;
  onChange: (value: string) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-foreground mb-2.5">
        Size{selected && <span className="font-normal text-muted-foreground ml-2">— {selected.toUpperCase()}</span>}
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
        {sizes.map((size) => (
          <button
            key={size.value}
            type="button"
            disabled={!size.available}
            onClick={() => onChange(size.value)}
            aria-pressed={selected === size.value}
            aria-label={`Size ${size.label}${!size.available ? " (out of stock)" : ""}`}
            className={cn(
              "relative h-9 min-w-[2.5rem] px-3 rounded-md text-sm font-semibold border transition-all duration-150 select-none",
              selected === size.value
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                : "bg-background text-foreground border-border hover:border-primary/60",
              !size.available && "opacity-40 cursor-not-allowed line-through"
            )}
          >
            {size.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// ─── Color Selector ────────────────────────────────────────────────────────

interface ColorSelectorProps {
  colors: ProductColor[];
  selected: string | null;
  onChange: (value: string) => void;
}

export function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-foreground mb-2.5">
        Color{selected && (
          <span className="font-normal text-muted-foreground ml-2">
            — {colors.find((c) => c.value === selected)?.name ?? selected}
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Select color">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            disabled={!color.available}
            onClick={() => onChange(color.value)}
            aria-pressed={selected === color.value}
            aria-label={`${color.name}${!color.available ? " (unavailable)" : ""}`}
            title={color.name}
            className={cn(
              "h-8 w-8 rounded-full border-2 transition-all duration-150 shadow-sm",
              selected === color.value
                ? "border-foreground scale-110 shadow-md"
                : "border-border hover:border-foreground/50 hover:scale-105",
              !color.available && "opacity-40 cursor-not-allowed"
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </fieldset>
  );
}
