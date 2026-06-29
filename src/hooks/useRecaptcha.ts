// frontend2\src\hooks\useRecaptcha.ts
'use client';

import { useState, useCallback, useRef } from 'react';

interface RecaptchaStatus {
  loaded: boolean;
  error: boolean;
}

export function useRecaptcha(action: string = 'submit') {
  const [recaptcha, setRecaptcha] = useState<RecaptchaStatus>({
    loaded: false,
    error: false,
  });
  const tokenRef = useRef<string | null>(null);

  // Called by the next/script onLoad callback (passed in from the component)
  const onScriptLoad = useCallback(() => {
    setRecaptcha({ loaded: true, error: false });
  }, []);

  const onScriptError = useCallback(() => {
    setRecaptcha({ loaded: false, error: true });
  }, []);

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!recaptcha.loaded || !siteKey) return null;

    try {
      const token = await (window as any).grecaptcha.execute(siteKey, { action });
      tokenRef.current = token;
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      setRecaptcha({ loaded: false, error: true });
      return null;
    }
  }, [recaptcha.loaded, action]);  // ← siteKey read inline, not via ref

  const resetToken = useCallback(() => {
    tokenRef.current = null;
  }, []);

  return {
    loaded: recaptcha.loaded,
    error: recaptcha.error,
    onScriptLoad,     // ← pass to next/script's onLoad
    onScriptError,    // ← pass to next/script's onError
    execute: executeRecaptcha,
    resetToken,
    getToken: () => tokenRef.current,
  };
}