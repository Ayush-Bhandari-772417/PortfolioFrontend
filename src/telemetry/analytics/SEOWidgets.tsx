'use client';

/**
 * SEO Widget Badges — Ahrefs, Moz, Majestic
 * Pure presentational components for linking to SEO tool dashboards.
 * Import these directly wherever you want to display SEO badges.
 */

/** Ahrefs Domain Rating Badge */
export function AhrefsDomainBadge({ domain }: { domain: string }) {
  return (
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
  );
}

/** Ahrefs Backlink Counter Badge */
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

/** Moz Domain Authority Badge */
export function MozDomainBadge({ domain }: { domain: string }) {
  return (
    <a
      href={`https://moz.com/domain-analysis?subdomain=${encodeURIComponent(domain)}`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4a7c59] text-white rounded-md text-xs font-semibold hover:bg-[#3d6649] transition-colors shadow-sm"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
      Check DA on Moz
    </a>
  );
}

/** Moz Link Explorer Widget Link */
export function MozLinkExplorer({ domain }: { domain: string }) {
  return (
    <a
      href={`https://moz.com/link-explorer?subdomain=${encodeURIComponent(domain)}`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4a7c59] to-[#6b9e7c] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
      Explore Links on Moz
    </a>
  );
}

/** Majestic Trust Flow Badge */
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

/** Majestic Backlink Explorer Link */
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
