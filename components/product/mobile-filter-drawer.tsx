"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ProductFilters } from "@/components/product/product-filters";
import type { FilterOptions, ProductFilters as ProductFiltersType } from "@/types/site-data";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  options: FilterOptions;
  filters: ProductFiltersType;
  onChange: (filters: ProductFiltersType) => void;
  onReset: () => void;
  activeCount: number;
}

export function MobileFilterDrawer({
  open,
  onClose,
  options,
  filters,
  onChange,
  onReset,
  activeCount,
}: MobileFilterDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Filter Products</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <ProductFilters
            options={options}
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            activeCount={activeCount}
          />
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-primary text-primary-foreground font-bold py-3 text-sm hover:bg-primary/90 transition-colors"
          >
            Show Results
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
