// frontend2\src\telemetry\core\consent.ts
export type ConsentLevel = 'none' | 'essential' | 'all';

const KEY = 'portfolio_cookie_consent';

export function getConsent(): ConsentLevel {
  if (typeof window === 'undefined') return 'none';
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw).level : 'none';
  } catch {
    return 'none';
  }
}

export function hasAnalyticsConsent() {
  return getConsent() === 'all';
}

export function hasMarketingConsent() {
  return getConsent() === 'all';
}

export function canLoadVendor(vendor: string): boolean {
  const c = getConsent();

  if (c === 'none') return false;
  if (c === 'essential') {
    return ['webVitals'].includes(vendor);
  }

  return true; // all
}