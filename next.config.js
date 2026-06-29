// frontend2\next.config.js
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,          // ← ADD THIS (replaces babel-plugin-react-compiler)
  experimental: {
    turbopackClientSideNestedAsyncChunking: true,  // keep — still used by next dev
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    const baseHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    ];

    if (process.env.NODE_ENV !== 'production') {
      return [{ source: '/:path*', headers: baseHeaders }];
    }

    return [
      {
        source: '/:path*',
        headers: [
          ...baseHeaders,
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://www.clarity.ms https://scripts.clarity.ms https://static.hotjar.com https://www.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com data:",
              "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://www.clarity.ms https://scripts.clarity.ms https://static.hotjar.com https://www.google.com https://www.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://portfolio-backend-wpp5.onrender.com https://www.googletagmanager.com https://*.clarity.ms https://static.hotjar.com https://www.hotjar.com https://www.google.com",
              "frame-src 'self' https://www.google.com https://www.gstatic.com https://recaptcha.google.com https://www.youtube.com https://www.googletagmanager.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

let withBundleAnalyzer = (cfg) => cfg;

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzerPlugin = require('@next/bundle-analyzer')({
    enabled: true,
    openAnalyzer: false,
  });
  withBundleAnalyzer = withBundleAnalyzerPlugin;
}

module.exports = withBundleAnalyzer({
  ...nextConfig,
});