// frontend2\src\app\layout.tsx
import dynamic from 'next/dynamic';
import Navbar from "@/components/commonSections/Navbar";
import '@/styles/globals.css';
import Script from "next/script";
import { Metadata } from 'next';
import { getBootstrap, getDisplayLimit } from '@/lib/data';
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';
import TelemetryProvider from '@/telemetry/react/TelemetryProvider';
import VerificationScripts from '@/components/VerificationScripts';
// Analytics and trackers are loaded after first paint via TelemetryProvider

const Footer = dynamic(
  () => import('@/components/commonSections/Footer'),
  {
    loading: () => (
      <footer className="bg-slate-950/80 text-slate-100 border-t border-slate-900">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="h-24 rounded-3xl bg-slate-900/60 animate-pulse" />
        </div>
      </footer>
    ),
  }
);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ayush Bhandari | Portfolio",
    template: "%s | Ayush Bhandari",
  },
  description: "Portfolio & creations of Ayush Bhandari",
  icons: {
    icon: '/minilogo.png',
    apple: '/minilogo.png',
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'Ayush Bhandari',
    title: 'Ayush Bhandari | Portfolio',
    description: 'Portfolio & creations of Ayush Bhandari',
    images: [
      { url: '/minilogo.png', width: 1200, height: 630, alt: 'Ayush Portfolio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Bhandari | Portfolio',
    description: 'Portfolio & creations of Ayush Bhandari',
    images: ['/minilogo.png'],
    creator: '@AyushBhandari',
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const bootstrap = await getBootstrap();
  const settings = normalizeSettingsFromBootstrap(bootstrap);
  const { social_media, } = bootstrap;

  const gscid = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content={gscid} />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        {/* Preconnect to key third-party origins to save connection time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Inter with display=swap to avoid FOIT and reduce CLS */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* Verification scripts (e.g., Google Analytics) */}
        <VerificationScripts />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-navy-950 via-ocean-950 to-slate-900 text-slate-100 antialiased">
        <TelemetryProvider />
        <Navbar settings={settings} />
        <main className="min-h-screen flex flex-col" role="main">{children}</main>
        <Footer social_media={social_media.slice(0, getDisplayLimit(settings, 'home', 'social_media', 6))} settings={settings} />
      </body>
    </html>
  );
}