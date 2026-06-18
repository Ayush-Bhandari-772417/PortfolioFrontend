const isProduction = process.env.NODE_ENV === 'production';

export const ANALYTICS_CONFIG = {
  ga: isProduction ? process.env.NEXT_PUBLIC_GA_ID || '' : '',
  gtmId: isProduction ? process.env.NEXT_PUBLIC_GTM_ID || '' : '',
  hotjarId: isProduction ? process.env.NEXT_PUBLIC_HOTJAR_ID || '' : '' ,
  clarityId: isProduction ? process.env.NEXT_PUBLIC_CLARITY_ID || '' : '',
  semrushId: isProduction ? process.env.NEXT_PUBLIC_SEMRUSH_ID || '' : '',
  ahrefsId: isProduction ? process.env.NEXT_PUBLIC_AHREFS_ID || '' : '',
  mozId: isProduction ? process.env.NEXT_PUBLIC_MOZ_ID || '' : '',
  majesticId: isProduction ? process.env.NEXT_PUBLIC_MAJESTIC_ID || '' : '',
  recaptchaKey: isProduction ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '' : '',
  privacyPolicyUrl: '/privacy-policy',
} as const;
