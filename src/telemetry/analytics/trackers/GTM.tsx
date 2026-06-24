'use client';

import { hasAnalyticsConsent } from '@/telemetry/core/consent';

export default function GTMTracker() {
  // Script and noscript are injected server‑side via VerificationScripts.
  // This component only exists to respect consent; it renders nothing.
  if (!hasAnalyticsConsent()) return null;
  return null;
}