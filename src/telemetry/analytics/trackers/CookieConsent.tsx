// frontend2\src\telemetry\analytics\trackers\CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ANALYTICS_CONFIG } from '../config';

const CONSENT_KEY = 'portfolio_cookie_consent';

export type ConsentLevel = 'none' | 'essential' | 'all';

interface ConsentState {
  level: ConsentLevel;
  timestamp: string;
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredConsent(level: ConsentLevel) {
  const state: ConsentState = { level, timestamp: new Date().toISOString() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
}

export function getConsentLevel(): ConsentLevel {
  return getStoredConsent()?.level || 'none';
}

export function hasAnalyticsConsent(): boolean {
  return getConsentLevel() === 'all';
}

export function hasMarketingConsent(): boolean {
  return getConsentLevel() === 'all';
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    setStoredConsent('all');
    setVisible(false);
    window.location.reload();
  };

  const essentialOnly = () => {
    setStoredConsent('essential');
    setVisible(false);
  };

  const decline = () => {
    setStoredConsent('none');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-900 mb-2">We value your privacy</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                We use cookies to enhance your experience, analyze traffic, and personalize content.
              </p>
              <div className="text-xs text-slate-500 mb-4">
                Read our <Link href={ANALYTICS_CONFIG.privacyPolicyUrl} className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all text-center"
              >
                Accept All
              </button>
              <button
                onClick={essentialOnly}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors text-center"
              >
                Essential Only
              </button>
              <button
                onClick={decline}
                className="px-5 py-2 text-slate-500 text-xs hover:text-slate-700 transition-colors text-center"
              >
                Decline All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}