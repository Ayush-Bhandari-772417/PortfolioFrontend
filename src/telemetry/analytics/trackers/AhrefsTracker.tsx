// frontend2\src\telemetry\analytics\trackers\AhrefsTracker.tsx
'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config';

/**
 * Ahrefs Tracker
 * - Injects Ahrefs Webmaster Tools verification + Site Audit widget
 * - Also provides a Domain Rating widget component for displaying scores
 * 
 * Env: NEXT_PUBLIC_AHREFS_ID = Ahrefs verification token / site ID
 */
export default function AhrefsTracker() {
  const ahrefsId = ANALYTICS_CONFIG.ahrefsId;

  if (!ahrefsId) return null;

  return (
    <>
      {/* Ahrefs Site Verification Meta */}
      <meta key="ahrefs-meta" name="ahrefs-site-verification" content={ahrefsId} />

      {/* Ahrefs Analytics / Webmaster Tools Script */}
      <Script
        id="ahrefs-analytics"
        src="https://analytics.ahrefs.com/analytics.js"
        strategy="lazyOnload"
        data-key={ahrefsId}
      />
    </>
  );
}

/**
 * Ahrefs Domain Rating Badge
 * Displays a styled badge linking to Ahrefs site explorer
 */
export function AhrefsDomainBadge({ domain }: { domain: string }) {
  const ahrefsId = ANALYTICS_CONFIG.ahrefsId;
  if (!ahrefsId) return null;

  return (
    <div className="ahrefs-badge inline-flex items-center gap-2">
      <a
        href={`https://ahrefs.com/site-explorer/overview/v2/subdomains?target=${encodeURIComponent(domain)}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#054f31] text-white rounded-md text-xs font-semibold hover:bg-[#0a7a4d] transition-colors shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
        </svg>
        Check on Ahrefs
      </a>
    </div>
  );
}

/**
 * Ahrefs Backlink Counter Badge
 */
export function AhrefsBacklinkBadge({ domain }: { domain: string }) {
  return (
    <a
      href={`https://ahrefs.com/backlink-checker?input=${encodeURIComponent(domain)}&mode=subdomains`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#054f31] to-[#0a7a4d] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
      View Backlinks on Ahrefs
    </a>
  );
}