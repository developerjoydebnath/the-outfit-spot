"use client";

import { useState } from "react";
import { X, Megaphone } from "lucide-react";
import type { AnnouncementConfig } from "@/types/site-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  config: AnnouncementConfig;
}

export function AnnouncementBar({ config }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!config.enabled || dismissed) return null;

  return (
    <div className="relative bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <Megaphone className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {config.link ? (
          <Link href={config.link} className="hover:underline underline-offset-2">
            {config.text}
          </Link>
        ) : (
          <span>{config.text}</span>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2",
          "flex h-6 w-6 items-center justify-center rounded-full",
          "hover:bg-primary-foreground/20 transition-colors"
        )}
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
