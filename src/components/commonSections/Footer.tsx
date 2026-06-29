// frontend2\src\components\commonSections\Footer.tsx
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { AllSettings, SocialMedia } from '@/types';
import {SubscribeForm} from '@/components/client/DynamicSections';
import { SocialMediaClient } from '@/components/client/DynamicSections';

export default async function Footer({ social_media, settings }: { social_media: SocialMedia[], settings: AllSettings }) {
  const currentYear = new Date().getFullYear();
  const socialMedias = social_media;
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { href: '/', label: 'Home' },
        { href: '/#about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/creations', label: 'Creations' },
      ],
    },
    {
      title: 'Creations',
      links: [
        { href: '/creations/blog', label: 'Blog Posts' },
        { href: '/creations/poem', label: 'Poems' },
        { href: '/creations/story', label: 'Stories' },
        { href: '/creations/article', label: 'Articles' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { href: '/#contact', label: 'Contact' },
        ...(settings.settings.email ? [{ href: `mailto:${settings.settings.email}`, label: 'Email', external: true }] : []),
      ].filter(link => link.href),
    },
  ];

  return (
    <footer className="bg-[#051923] text-[#E6F6FE] border-t border-[#003554]">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto mb-20 text-center bg-[#003554]/55 backdrop-blur-md rounded-2xl p-12 border border-[#00A6FB]/20 shadow-2xl shadow-black/20">
          <h3 className="text-4xl lg:text-5xl font-black mb-8 bg-gradient-to-r from-[#00A6FB] to-[#E6F6FE] bg-clip-text text-transparent">
            Subscribe to Newsletter
          </h3>
          <p className="text-[#E6F6FE]/80 mb-10 text-xl leading-relaxed">
            Get the latest updates and insights delivered to your inbox
          </p>
          <div className="w-full max-w-md mx-auto"><SubscribeForm /></div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <h3 className="text-4xl font-black bg-gradient-to-r from-[#00A6FB] to-[#E6F6FE] bg-clip-text text-transparent">
              {settings.settings.site_name || 'Portfolio'}
            </h3>
            <p className="text-[#E6F6FE]/75 leading-relaxed text-lg">
              {settings.settings.tagline || 'Building digital experiences'}
            </p>
            <SocialMediaClient socialMedias={socialMedias} />
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={section.title} className="space-y-6 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <h4 className="text-2xl font-bold text-[#E6F6FE] hover:text-white transition-colors duration-300 cursor-default">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E6F6FE]/70 hover:text-white hover:translate-x-2 transition-all duration-300 block group font-medium"
                      >
                        {link.label}
                        <span className="inline-block w-0 group-hover:w-4 transition-all ml-2">-&gt;</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[#E6F6FE]/70 hover:text-white hover:translate-x-2 transition-all duration-300 block group font-medium"
                      >
                        {link.label}
                        <span className="inline-block w-0 group-hover:w-4 transition-all ml-2">-&gt;</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#003554]/70 pt-16 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <p className="text-[#E6F6FE]/60 text-lg font-semibold">
              &copy; {currentYear} {settings.settings.site_name || 'Portfolio'}. All rights reserved.
            </p>
            
            <p className="text-[#E6F6FE]/60 text-lg flex items-center gap-3 font-semibold">
              Made with <Heart className="w-6 h-6 text-[#00A6FB] fill-current animate-pulse" /> by {settings.settings.author_name || 'Ayush Bhandari'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}