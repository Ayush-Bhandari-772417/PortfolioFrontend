'use client';
import { ANALYTICS_CONFIG } from '@/telemetry/analytics/config';

export function getEnabledTools() {
  return {
    ga: !!ANALYTICS_CONFIG.ga,
    gtm: !!ANALYTICS_CONFIG.gtmId,
    hotjar: !!ANALYTICS_CONFIG.hotjarId,
    clarity: !!ANALYTICS_CONFIG.clarityId,
    semrush: !!ANALYTICS_CONFIG.semrushId,
    ahrefs: !!ANALYTICS_CONFIG.ahrefsId,
    moz: !!ANALYTICS_CONFIG.mozId,
    majestic: !!ANALYTICS_CONFIG.majesticId,
    recaptcha: !!ANALYTICS_CONFIG.recaptchaKey
  };
}
