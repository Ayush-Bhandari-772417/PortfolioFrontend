// frontend2\src\telemetry\analytics\trackers\Clarity.tsx
'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config';
import { useEffect } from 'react';

export default function ClarityTracker() {
  const clarityId = ANALYTICS_CONFIG.clarityId;

  // Fallback init (only in browser)
  useEffect(() => {
    if (!clarityId) return;
    if (typeof window === 'undefined') return;

    // Initialize queue function
    (function initClarity() {
      const w = window as any;
      w.clarity = w.clarity || function (...args: any[]) {
        (w.clarity.q = w.clarity.q || []).push(args);
      };

      const d = document;
      const s = d.createElement('script');
      s.async = true;
      s.src = `https://www.clarity.ms/tag/${clarityId}`;
      (d.head || d.body).appendChild(s);
    })();
  }, [clarityId]);

  if (!clarityId) return null;

  return (
    <>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var w = window;
              w.clarity = w.clarity || function(){ (w.clarity.q = w.clarity.q || []).push(Array.prototype.slice.call(arguments)); };

              var d = document;
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://www.clarity.ms/tag/${clarityId}';
              (d.head || d.body).appendChild(s);
            })();
          `,
        }}
      />

      <Script
        key="clarity-consent"
        id="clarity-consent"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.clarity('consent', true);`,
        }}
      />
    </>
  );
}