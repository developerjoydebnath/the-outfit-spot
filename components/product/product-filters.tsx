"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { FilterOptions, ProductFilters } from "@/types/site-data";
import { X, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  options: FilterOptions;
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
  activeCount: number;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProductFilters({
  options,
  filters,
  onChange,
  onReset,
  activeCount,
}: ProductFiltersProps) {
  const toggleArr = (key: keyof ProductFilters, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="space-y-5">
      {/* Filter header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-foreground">Filter By</h2>
          {activeCount > 0 && (
            <Badge className="h-5 min-w-5 px-1.5 text-[10px] bg-primary text-primary-foreground">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-6 px-2 text-xs text-muted-foreground gap-1"
          >
            <FilterX className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      {options.categories.length > 0 && (
        <FilterGroup title="Filter By Categories">
          <div className="space-y-2">
            {options.categories.map((cat) => {
              const checked = filters.categories.includes(cat.value);
              return (
                <div key={cat.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat.value}`}
                    checked={checked}
                    onCheckedChange={() => toggleArr("categories", cat.value)}
                    className={cn(checked && "bg-primary border-primary")}
                  />
                  <Label
                    htmlFor={`cat-${cat.value}`}
                    className="text-xs text-foreground cursor-pointer font-medium select-none"
                  >
                    {cat.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </FilterGroup>
      )}

      <Separator />

      {/* Sizes */}
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {options.sizes.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleArr("sizes", size)}
                aria-pressed={active}
                className={cn(
                  "h-8 min-w-[2rem] px-2 rounded-md text-xs font-semibold border transition-all",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/60"
                )}
              >
                {size.toUpperCase()}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <Separator />

      {/* Colors */}
      {options.colors.length > 0 && (
        <FilterGroup title="Color">
          <div className="flex flex-wrap gap-2">
            {options.colors.map((color) => {
              const active = filters.colors.includes(color.value);
              return (
                <button
                  key={color.value}
                  onClick={() => toggleArr("colors", color.value)}
                  title={color.label}
                  aria-pressed={active}
                  aria-label={color.label}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-all",
                    active
                      ? "border-foreground scale-110 shadow-md"
                      : "border-border hover:scale-105 hover:border-foreground/50"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
          </div>
        </FilterGroup>
      )}

      <Separator />

      {/* Price range */}
      <FilterGroup title="Price Range">
        <div className="px-1">
          <Slider
            min={options.priceRange.min}
            max={options.priceRange.max}
            step={50}
            value={[
              filters.minPrice || options.priceRange.min,
              filters.maxPrice || options.priceRange.max,
            ]}
            onValueChange={([min, max]) =>
              onChange({
                ...filters,
                minPrice: min === options.priceRange.min ? 0 : min,
                maxPrice: max === options.priceRange.max ? 0 : max,
              })
            }
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>৳{filters.minPrice || options.priceRange.min}</span>
            <span>৳{filters.maxPrice || options.priceRange.max}</span>
          </div>
        </div>
      </FilterGroup>

      <Separator />

      {/* Quick filters */}
      <FilterGroup title="Quick Filters">
        <div className="space-y-2">
          {[
            { key: "newArrival", label: "New Arrivals" },
            { key: "featured", label: "Featured" },
            { key: "available", label: "In Stock Only" },
          ].map(({ key, label }) => {
            const checked = filters[key as keyof ProductFilters] as boolean;
            return (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={`quick-${key}`}
                  checked={checked}
                  onCheckedChange={(v) =>
                    onChange({ ...filters, [key]: !!v })
                  }
                  className={cn(checked && "bg-primary border-primary")}
                />
                <Label
                  htmlFor={`quick-${key}`}
                  className="text-xs text-foreground cursor-pointer font-medium select-none"
                >
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );
}
