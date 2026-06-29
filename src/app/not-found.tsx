// frontend2\src\app\not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search, ArrowLeft, Mail, FileQuestion } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist. Check the sitemap or contact me.',
  robots: { index: false, follow: true },
};

// Common broken link destinations remap
const suggestedPages = [
  { label: 'Home', href: '/', icon: Home, description: 'Return to homepage' },
  { label: 'Projects', href: '/projects', icon: Search, description: 'Browse my projects' },
  { label: 'Creations', href: '/creations', icon: FileQuestion, description: 'Read blogs and poems' },
  { label: 'Contact', href: '/hire', icon: Mail, description: 'Get in touch' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top Pattern */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="p-8 sm:p-12 text-center">
            {/* 404 Graphic */}
            <div className="relative inline-block mb-6">
              <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none">
                404
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Page Not Found
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, here are some helpful links to get you back on track.
            </p>

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all mb-10"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>

            {/* Suggested Pages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {suggestedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                >
                  <div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                    <page.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {page.label}
                    </span>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {page.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sitemap Link */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Want to see all pages? Check the{' '}
                <Link href="/sitemap-html" className="text-blue-600 hover:underline font-medium">
                  HTML Sitemap
                </Link>
                {' '}or{' '}
                <Link
                  href="/"
                  className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Go Back
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* SEO: Recommended Search */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            HTTP Status: 404 Not Found | If you believe this is an error,{' '}
            <Link href="/hire" className="underline hover:text-slate-600">
              please report it
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}