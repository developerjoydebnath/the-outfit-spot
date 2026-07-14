"use client";

import { useEffect, useRef } from 'react';

export function AnalyticsTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    
    hasTracked.current = true;
    
    // Fire and forget
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'visit' }),
    }).catch(console.error);
  }, []);

  return null; // Invisible component
}
