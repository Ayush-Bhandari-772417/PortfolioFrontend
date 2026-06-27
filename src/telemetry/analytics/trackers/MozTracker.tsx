'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config';

export default function MozTracker() {
  const mozDomain = 'www.moz.com';
  const mozId = ANALYTICS_CONFIG.mozId;

  if (!mozDomain || !mozId) return null;

  // Minimal Moz analytics snippet.
  // If you previously had a more complex version, re-add it here.
  return (
    <>
      <Script
        key="moz-script"
        id="moz-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var mozDomain = ${JSON.stringify(mozDomain)};
              var mozId = ${JSON.stringify(mozId)};

              // Safety: avoid double-loading
              if (window.__mozTrackerLoaded) return;
              window.__mozTrackerLoaded = true;

              var img = new Image();
              img.src = 'https://' + mozDomain + '/_mozon/' + mozId;
            })();
          `,
        }}
      />
    </>
  );
}
