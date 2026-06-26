// 'use client';

// import Script from 'next/script';
// import { getConsent } from '@/telemetry/core/consent';
// import { ANALYTICS_CONFIG } from '@/telemetry/analytics/config';

// export default function VerificationScripts() {
//   const {
//     ga,
//     gtmId,
//     hotjarId,
//     clarityId,
//     semrushId,
//     ahrefsId,
//     mozId,
//     majesticId,
//     recaptchaKey,
//   } = ANALYTICS_CONFIG;

//   const consent = getConsent();
//   const canLoad = (vendor: string) =>
//     consent === 'all' || (consent === 'essential' && vendor === 'webVitals');

//   return (
//     <>
//       {/* Google Analytics */}
//       {ga && canLoad('ga') && (
//         <>
//           <Script
//             key="ga-script"
//             src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
//             strategy="lazyOnload"
//           />
//           <Script
//             key="ga-init"
//             strategy="lazyOnload"
//             id="ga-init"
//           >
//             {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('${ga}', {});
//             `}
//           </Script>
//         </>
//       )}

//       {/* Google Tag Manager */}
//       {gtmId && canLoad('gtm') && (
//         <>
//           <Script
//             key="gtm-script"
//             strategy="lazyOnload"
//             dangerouslySetInnerHTML={{
//               __html: `
//                 (function(w,d,s,l,i){
//                   w[l]=w[l]||[];
//                   w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
//                   var f=d.getElementsByTagName(s)[0],
//                   j=d.createElement(s),
//                   dl=l!='dataLayer'?'&l='+l:'';
//                   j.async=true;
//                   j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
//                   f.parentNode.insertBefore(j,f);
//                 })(window,document,'script','dataLayer','${gtmId}');
//               `,
//             }}
//           />
//           <noscript key="gtm-noscript">
//             <iframe
//               src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
//               height="0"
//               width="0"
//               style={{ display: 'none', visibility: 'hidden' }}
//             />
//           </noscript>
//         </>
//       )}

//       {/* Hotjar */}
//       {hotjarId && canLoad('hotjar') && (
//         <Script
//           key="hotjar-script"
//           strategy="lazyOnload"
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function(h,o,t,j,a,r){
//                 h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
//                 h._hjSettings={hjid:${hotjarId},hjsv:6};
//                 a=o.getElementsByTagName('head')[0];
//                 r=o.createElement('script');r.async=1;
//                 r.src='https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6';
//                 a.appendChild(r);
//               })(window,document);
//             `,
//           }}
//         />
//       )}

//       {/* Clarity */}
//       {clarityId && canLoad('clarity') && (
//         <>
//           <Script
//             key="clarity-script"
//             strategy="lazyOnload"
//             dangerouslySetInnerHTML={{
//               __html: `
//                 (function(c,l,a,r,i,t,y){
//                   c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//                   t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
//                   s=l.getElementsByTagName(r)[0];s.parentNode.insertBefore(t,s);
//                 })(window,document,'clarity','script','${clarityId}');
//               `,
//             }}
//           />
//           {/* Consent for clarity */}
//           <Script
//             key="clarity-consent"
//             strategy="lazyOnload"
//           >
//             {`window.clarity('consent', true);`}
//           </Script>
//         </>
//       )}

//       {/* SEMrush Sensor Widget */}
//       {semrushId && canLoad('semrush') && (
//         <Script
//           key="semrush-script"
//           src="https://www.semrush.com/sensor/widget.js"
//           strategy="lazyOnload"
//           data-id={semrushId}
//         />
//       )}

//       {/* Ahrefs */}
//       {ahrefsId && canLoad('ahrefs') && (
//         <>
//           {/* Ahrefs site verification meta */}
//           <meta key="ahrefs-meta" name="ahrefs-site-verification" content={ahrefsId} />
//           {/* Ahrefs analytics script */}
//           <Script
//             key="ahrefs-script"
//             src="https://analytics.ahrefs.com/analytics.js"
//             strategy="lazyOnload"
//             data-key={ahrefsId}
//           />
//         </>
//       )}

//       {/* Moz */}
//       {mozId && canLoad('moz') && (
//         <Script
//           key="moz-script"
//           strategy="lazyOnload"
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function() {
//                 var mozDomain = ${JSON.stringify('www.moz.com')};
//                 var mozId = ${JSON.stringify(mozId)};

//                 // Avoid double‑loading
//                 if (window.__mozTrackerLoaded) return;
//                 window.__mozTrackerLoaded = true;

//                 var img = new Image();
//                 img.src = 'https://' + mozDomain + '/_mozon/' + mozId;
//               })();
//             `,
//           }}
//         />
//       )}

//       {/* Majestic */}
//       {majesticId && canLoad('majestic') && (
//         <>
//           {/* Majestic site verification meta */}
//           <meta key="majestic-meta" name="majestic-site-verification" content={majesticId} />
//           {/* Majestic analytics script */}
//           <Script
//             key="majestic-script"
//             src="https://majestic.com/static/js/analytics.js"
//             strategy="lazyOnload"
//             data-key={majesticId}
//           />
//         </>
//       )}

//       {/* reCAPTCHA */}
//       {recaptchaKey && (
//         <Script
//           src={`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`}
//           strategy="lazyOnload"
//         />
//       )}
//     </>
//   );
// }

'use client';

import Script from 'next/script';
import { getConsent } from '@/telemetry/core/consent';
import { ANALYTICS_CONFIG } from '@/telemetry/analytics/config';

export default function VerificationScripts() {
  const {
    ga,
    gtmId,
    hotjarId,
    clarityId,
    semrushId,
    ahrefsId,
    mozId,
    majesticId,
    recaptchaKey,
  } = ANALYTICS_CONFIG;

  const consent = getConsent();
  const canLoad = (vendor: string) =>
    consent === 'all' || (consent === 'essential' && vendor === 'webVitals');

  return (
    <>
      {/* Google Analytics */}
      {ga && canLoad('ga') && (
        <>
          <Script
            key="ga-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="lazyOnload"
          />
          <Script
            key="ga-init"
            id="ga-init"                          // ← required for inline scripts
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{            // ← not children
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga}');          
              `,                                  // ← 'config' not the GA ID
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {gtmId && canLoad('gtm') && (
        <>
          <Script
            key="gtm-script"
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          <noscript key="gtm-noscript">
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Hotjar */}
      {hotjarId && canLoad('hotjar') && (
        <Script
          key="hotjar-script"
          id="hotjar-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src='https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6';
                a.appendChild(r);
              })(window,document);
            `,
          }}
        />
      )}

      {/* Clarity */}
      {clarityId && canLoad('clarity') && (
        <>
          <Script
            key="clarity-script"
            id="clarity-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
                  s=l.getElementsByTagName(r)[0];s.parentNode.insertBefore(t,s);
                })(window,document,'clarity','script','${clarityId}');
              `,
            }}
          />
          <Script
            key="clarity-consent"
            id="clarity-consent"                  // ← was missing
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{            // ← not children
              __html: `window.clarity('consent', true);`,
            }}
          />
        </>
      )}

      {/* SEMrush Sensor Widget */}
      {semrushId && canLoad('semrush') && (
        <Script
          key="semrush-script"
          src="https://www.semrush.com/sensor/widget.js"
          strategy="lazyOnload"
          data-id={semrushId}
        />
      )}

      {/* Ahrefs */}
      {ahrefsId && canLoad('ahrefs') && (
        <>
          <meta key="ahrefs-meta" name="ahrefs-site-verification" content={ahrefsId} />
          <Script
            key="ahrefs-script"
            src="https://analytics.ahrefs.com/analytics.js"
            strategy="lazyOnload"
            data-key={ahrefsId}
          />
        </>
      )}

      {/* Moz */}
      {mozId && canLoad('moz') && (
        <Script
          key="moz-script"
          id="moz-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.__mozTrackerLoaded) return;
                window.__mozTrackerLoaded = true;
                var img = new Image();
                img.src = 'https://www.moz.com/_mozon/${mozId}';
              })();
            `,
          }}
        />
      )}

      {/* Majestic */}
      {majesticId && canLoad('majestic') && (
        <>
          <meta key="majestic-meta" name="majestic-site-verification" content={majesticId} />
          <Script
            key="majestic-script"
            src="https://majestic.com/static/js/analytics.js"
            strategy="lazyOnload"
            data-key={majesticId}
          />
        </>
      )}

      {/* reCAPTCHA */}
      {recaptchaKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`}
          strategy="afterInteractive"             // ← not lazyOnload
        />
      )}
    </>
  );
}