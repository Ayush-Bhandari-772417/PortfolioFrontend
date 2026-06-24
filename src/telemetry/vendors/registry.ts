// frontend2\src\telemetry\vendors\registry.ts
export type VendorName =
  | 'ga'
  | 'gtm'
  | 'hotjar'
  | 'clarity'
  | 'ahrefs'
  | 'moz'
  | 'majestic'
  | 'semrush'
  | 'recaptcha'
  | 'scrollDepth'
  | 'engagementTime'
  | 'webVitals';

export interface VendorConfig {
  name: VendorName;
  enabled: boolean;
  load: () => Promise<any>;
}

import { ANALYTICS_CONFIG } from '@/telemetry/analytics/config';

export const vendorRegistry: VendorConfig[] = [
  {
    name: 'ga',
    enabled: !!ANALYTICS_CONFIG.ga,
    load: () => import('@/telemetry/analytics/trackers/GoogleAnalytics'),
  },
  {
    name: 'gtm',
    enabled: !!ANALYTICS_CONFIG.gtmId,
    load: () => import('@/telemetry/analytics/trackers/GTM'),
  },
  {
    name: 'hotjar',
    enabled: !!ANALYTICS_CONFIG.hotjarId,
    load: () => import('@/telemetry/analytics/trackers/HotjarTracker'),
  },
  {
    name: 'clarity',
    enabled: !!ANALYTICS_CONFIG.clarityId,
    load: () => import('@/telemetry/analytics/trackers/Clarity'),
  },
  {
    name: 'ahrefs',
    enabled: !!ANALYTICS_CONFIG.ahrefsId,
    load: () => import('@/telemetry/analytics/trackers/AhrefsTracker'),
  },
  {
    name: 'moz',
    enabled: !!ANALYTICS_CONFIG.mozId,
    load: () => import('@/telemetry/analytics/trackers/MozTracker'),
  },
  {
    name: 'majestic',
    enabled: !!ANALYTICS_CONFIG.majesticId,
    load: () => import('@/telemetry/analytics/trackers/MajesticTracker'),
  },
  {
    name: 'semrush',
    enabled: !!ANALYTICS_CONFIG.semrushId,
    load: () => import('@/telemetry/analytics/trackers/SemrushTracker'),
  },
  {
    name: 'recaptcha',
    enabled: !!ANALYTICS_CONFIG.recaptchaKey,
    load: () => import('@/telemetry/analytics/trackers/RecaptchaScript'),
  },
  // behavioral analytics
  {
    name: 'scrollDepth',
    enabled: true,
    load: () => import('@/telemetry/analytics/trackers/ScrollDepth'),
  },
  {
    name: 'engagementTime',
    enabled: true,
    load: () => import('@/telemetry/analytics/trackers/EngagementTime'),
  },
  {
    name: 'webVitals',
    enabled: true,
    load: () => import('@/telemetry/analytics/trackers/WebVitals'),
  },
];