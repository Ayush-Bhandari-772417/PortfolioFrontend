import Link from 'next/link';
import { Metadata } from 'next';
import { buildSitemapData } from '@/lib/sitemapData';

export const metadata: Metadata = {
  title: 'HTML Sitemap',
  description: 'Complete sitemap of all pages on this portfolio website.',
  robots: { index: true, follow: true },
};

interface SitemapSection {
  title: string;
  links: { label: string; href: string; description?: string }[];
}

export default async function SitemapHtmlPage() {
  const {
    staticPages,
    creationTypePages,
  } = await buildSitemapData();

  // Helper to find a static page by path
  const findStaticPageByPath = (path: string) => {
    return staticPages.find(page => page.path === path);
  };

  const getStaticPageLink = (
    path: string,
    fallback: { label: string; href: string; description: string }
  ) => {
    const page = findStaticPageByPath(path);
    return page
      ? { label: page.label, href: page.path, description: page.description }
      : fallback;
  };

  // Build the sitemap data for the HTML sitemap
  const sitemapData: SitemapSection[] = [
    {
      title: 'Main Pages',
      links: [
        getStaticPageLink('/', {
          label: 'Home',
          href: '/',
          description: 'Portfolio homepage',
        }),
        getStaticPageLink('/projects', {
          label: 'Projects',
          href: '/projects',
          description: 'All development projects',
        }),
        getStaticPageLink('/creations', {
          label: 'Creations',
          href: '/creations',
          description: 'Blog posts, poems, stories, articles',
        }),
        getStaticPageLink('/privacy-policy', {
          label: 'Privacy Policy',
          href: '/privacy-policy',
          description: 'Privacy policy for the website',
        }),
        // Note: Hire Me page is not available in the current routing, so we skip it.
      ],
    },
    {
      title: 'Projects',
      links: [
        {
          label: 'All Projects',
          href: '/projects',
          description: 'All development projects',
        },
        // We don't have categorical project pages (e.g., Web Applications, Mobile Apps) in the data.
        // If you want to add them, you would need to extend the backend and the sitemap settings.
      ],
    },
    {
      title: 'Creations',
      links: [
        {
          label: 'All Creations',
          href: '/creations',
          description: 'All blog posts, poems, stories, articles',
        },
        ...creationTypePages.map((typePage) => ({
          label: typePage.label,
          href: `/creations/${typePage.type}`,
          description: typePage.description,
        })),
      ],
    },
    {
      title: 'SEO & Insights',
      links: [
        { label: 'XML Sitemap', href: '/sitemap.xml', description: 'Machine-readable sitemap' },
        { label: 'Robots.txt', href: '/robots.txt', description: 'Crawler instructions' },
        { label: 'HTML Sitemap', href: '/sitemap-html', description: 'Human-readable sitemap (this page)' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            HTML Sitemap
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A complete list of all pages on this website for easy navigation.
            Search engines and users can both use this page to discover content.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-500 shadow-sm border border-slate-200">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Sitemap Sections */}
        <div className="space-y-8">
          {sitemapData.map((section) => (
            <section
              key={section.title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                {section.title}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group block p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-transparent hover:border-blue-200 transition-all"
                    >
                      <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </span>
                      {link.description && (
                        <p className="text-sm text-slate-500 mt-1">
                          {link.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Can't find what you're looking for?{' '}
            <Link href="/hire" className="text-blue-600 hover:underline font-medium">
              Contact me
            </Link>
            {' '}and I'll help you navigate.
          </p>
        </div>
      </div>
    </div>
  );
}