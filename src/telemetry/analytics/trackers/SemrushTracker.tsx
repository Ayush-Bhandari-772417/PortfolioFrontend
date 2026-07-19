// frontend2\src\telemetry\analytics\trackers\SemrushTracker.tsx
'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config';

/**
 * Semrush Sensor Widget Tracker
 * Embeds the Semrush Sensor widget that shows current Google SERP volatility score.
 * This is Semrush's primary frontend embeddable widget.
 * 
 * To use: Set NEXT_PUBLIC_SEMRUSH_SENSOR_ID in your .env.local
 * Get your widget ID from: https://www.semrush.com/sensor/
 */
export default function SemrushTracker() {
  const sensorId = ANALYTICS_CONFIG.semrushId;

  if (!sensorId) return null;

  return (
    <>
      {/* Semrush Sensor Widget Script */}
      <Script
        key="semrush-script"
        id="semrush-sensor"
        src="https://www.semrush.com/sensor/widget.js"
        strategy="lazyOnload"
        data-id={sensorId}
      />
    </>
  );
}

/**
 * Semrush Domain Overview Widget
 * Fetches and displays key SEO metrics for your domain using Semrush API.
 * Requires SEMRUSH_API_KEY backend proxy or direct API access.
 * 
 * This is a separate component you can place in your footer or SEO dashboard page.
 */
export function SemrushDomainWidget({ domain }: { domain: string }) {
  return (
    <div className="semrush-domain-widget">
      <a
        href={`https://www.semrush.com/analytics/overview/?q=${encodeURIComponent(domain)}&searchType=domain`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff642d] to-[#ff8f6b] text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Analyze with Semrush
      </a>
    </div>
  );
}