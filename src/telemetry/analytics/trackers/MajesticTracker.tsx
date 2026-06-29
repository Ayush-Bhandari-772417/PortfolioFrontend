// frontend2\src\telemetry\analytics\trackers\MajesticTracker.tsx
'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config';

/**
 * Majestic Tracker
 * - Injects Majestic backlink checker / site verification
 * - Provides Trust Flow & Citation Flow widget components
 * 
 * Env: NEXT_PUBLIC_MAJESTIC_ID = Majestic API key / site verification
 */
export default function MajesticTracker() {
  const majesticId = ANALYTICS_CONFIG.majesticId;

  if (!majesticId) return null;

  return (
    <>
      {/* Majestic verification meta */}
      <meta key="majestic-meta" name="majestic-site-verification" content={majesticId} />

      {/* Majestic backlink checker script */}
      <Script
        id="majestic-analytics"
        src="https://majestic.com/static/js/analytics.js"
        strategy="lazyOnload"
        data-key={majesticId}
      />
    </>
  );
}

/**
 * Majestic Trust Flow Badge
 * Links to Majestic site explorer showing Trust Flow & Citation Flow
 */
export function MajesticTrustFlowBadge({ domain }: { domain: string }) {
  return (
    <a
      href={`https://majestic.com/reports/site-explorer?folder=&q=${encodeURIComponent(domain)}&IndexDataSource=F`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff6600] text-white rounded-md text-xs font-semibold hover:bg-[#e65c00] transition-colors shadow-sm"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      Check Trust Flow
    </a>
  );
}

/**
 * Majestic Backlink Explorer Link
 */
export function MajesticBacklinkExplorer({ domain }: { domain: string }) {
  return (
    <a
      href={`https://majestic.com/reports/backlinks?folder=&q=${encodeURIComponent(domain)}&IndexDataSource=F`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
      View Backlinks on Majestic
    </a>
  );
}