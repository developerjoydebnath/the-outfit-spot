import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  seeMoreHref,
  seeMoreLabel = "See More",
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 mb-6",
        centered && "flex-col items-center text-center",
        className
      )}
    >
      <div className={cn(centered ? "text-center" : "")}>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {seeMoreHref && !centered && (
        <Link
          href={seeMoreHref}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          {seeMoreLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
      {seeMoreHref && centered && (
        <Link
          href={seeMoreHref}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {seeMoreLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
