"use client";

import { trackClick } from '@/lib/analytics-client';
import React from 'react';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  trackType: 'whatsapp' | 'messenger';
}

export function TrackedLink({ trackType, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackClick(trackType);
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );
}
