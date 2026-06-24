'use client';

import { hasAnalyticsConsent } from '@/telemetry/core/consent';

export default function MozTracker() {
  if (!hasAnalyticsConsent()) return null;
  // The pixel script is injected server‑side via VerificationScripts.
  return null;
}