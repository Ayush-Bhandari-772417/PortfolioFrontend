// frontend2\src\components\analytics\trackers\GoogleAnalytics.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Script from 'next/script'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  const pagePath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

  if (!gaId) return null

  useEffect(() => {
    if (!gaId || typeof window === 'undefined' || !window.gtag) return

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    
    // Use requestIdleCallback for non-blocking updates
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        window.gtag('config', gaId, {
          page_path: url,
        })
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        window.gtag('config', gaId, {
          page_path: url,
        })
      }, 0)
    }
  }, [pathname, searchParams, gaId])

  // Render scripts only after the component is mounted and GA id exists.
  return (
    <>
      <Script
        id="ga-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        key="ga-init"
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)};
            gtag('js', new Date());
            gtag('config', '${gaId}', {page_path: '${pagePath}'});
          `,
        }}
      />
    </>
  )
}