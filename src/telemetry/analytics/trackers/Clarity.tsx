'use client';

import { hasAnalyticsConsent } from '@/telemetry/core/consent';

export default function ClarityTracker() {
  if (!hasAnalyticsConsent()) return null;
  // Initialization and consent handled by snippets in VerificationScripts.
  return null;
}