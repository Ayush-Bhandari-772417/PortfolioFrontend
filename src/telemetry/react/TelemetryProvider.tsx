// frontend2\src\telemetry\react\TelemetryProvider.tsx
'use client';

import VendorLoader from '@/telemetry/vendors/VendorLoader';
import CookieConsentBanner from '@/telemetry/analytics/trackers/CookieConsent';

export default function TelemetryProvider() {
  return (
    <>
      <VendorLoader />
      <CookieConsentBanner />
    </>
  );
}