'use client';

import { hasAnalyticsConsent } from '@/telemetry/core/consent';

export default function HotjarTracker() {
  if (!hasAnalyticsConsent()) return null;
  // Initialization handled by the snippet in VerificationScripts.
  return null;
}