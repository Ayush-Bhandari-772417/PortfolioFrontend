'use client';

import { hasAnalyticsConsent } from '@/telemetry/core/consent';
import { ANALYTICS_CONFIG } from '../config';

/**
 * Semrush Sensor Widget
 * The script is now injected server‑side via VerificationScripts.
 * This component exists only to respect consent and to re‑export
 * the domain widget component.
 */
export default function SemrushTracker() {
  if (!hasAnalyticsConsent()) return null;
  return null;
}

/**
 * Semrush Domain Overview Widget
 * Fetches and displays key SEO metrics for your domain using Semrush API.
 * Requires SEMRUSH_API_KEY backend proxy or direct API access.
 */
export function SemrushDomainWidget({ domain }: { domain: string }) {
  const sensorId = ANALYTICS_CONFIG.semrushId;
  if (!sensorId) return null;

  return (
    <>
      {/* Semrush Sensor Widget Script */}
      <Script
        id="semrush-sensor"
        src="https://www.semrush.com/sensor/widget.js"
        strategy="lazyOnload"
        data-id={sensorId}
      />
    </>
  );
}