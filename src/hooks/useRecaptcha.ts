'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface RecaptchaStatus {
  loaded: boolean;
  error: boolean;
}

/**
 * Custom hook for lazy-loading reCAPTCHA only when user interacts with form elements
 * Returns the reCAPTCHA token when ready
 */
export function useRecaptcha(action: string = 'submit') {
  const [recaptcha, setRecaptcha] = useState<RecaptchaStatus>({ loaded: false, error: false });
  const siteKeyRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  // Initialize site key from environment
  useEffect(() => {
    siteKeyRef.current = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null;
  }, []);

  // Load reCAPTCHA script when needed
  const loadRecaptcha = useCallback(() => {
    if (recaptcha.loaded || recaptcha.error || !siteKeyRef.current) {
      return;
    }

    // Check if already loaded globally
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      setRecaptcha({ loaded: true, error: false });
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKeyRef.current}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setRecaptcha({ loaded: true, error: false });
    };

    script.onerror = () => {
      setRecaptcha({ loaded: false, error: true });
      console.error('Failed to load reCAPTCHA');
    };

    document.body.appendChild(script);
  }, [recaptcha.loaded, recaptcha.error, siteKeyRef.current]);

  // Execute reCAPTCHA and return token
  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    if (!recaptcha.loaded || !siteKeyRef.current) {
      return null;
    }

    try {
      // @ts-ignore - grecaptcha is loaded by the script
      const token = await window.grecaptcha.execute(siteKeyRef.current, { action });
      tokenRef.current = token;
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      setRecaptcha({ loaded: false, error: true });
      return null;
    }
  }, [recaptcha.loaded, siteKeyRef.current, action]);

  // Reset token after use
  const resetToken = useCallback(() => {
    tokenRef.current = null;
  }, []);

  return {
    loaded: recaptcha.loaded,
    error: recaptcha.error,
    load: loadRecaptcha,
    execute: executeRecaptcha,
    resetToken,
    getToken: () => tokenRef.current
  };
}