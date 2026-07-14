export function trackClick(type: 'whatsapp' | 'messenger') {
  // Fire and forget
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type }),
  }).catch(console.error);
}
