// frontend2\src\components\commonSections\NavbarClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HireModal } from '@/components/client/DynamicSections';
import { useRef } from 'react';

export default function NavbarClient({ navLinks, logoUrl }: { navLinks: { href: string, label: string }[], logoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(scrollY > 20);
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? 'bg-[#051923]/95 shadow-xl border-b border-[#00A6FB]/25' 
          : 'bg-[#003554]/90 shadow-xl border-b border-[#00A6FB]/20'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src={logoUrl}
                alt="Logo"
                width={250}
                height={50}
                className="w-auto h-[70px] object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-2xl"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#E6F6FE] hover:text-white font-bold transition-all duration-300 relative group cursor-pointer hover:scale-105"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A6FB] to-[#0582CA] group-hover:w-full transition-all duration-500 ease-out"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <div
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 rounded-2xl bg-white text-[#003554] font-bold hover:bg-[#E6F6FE] hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg border border-white/50"
            >
              Hire Me
            </div>
          </div>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-[#006494]/50 transition-all duration-200 backdrop-blur-sm"
          >
            {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#051923]/95 backdrop-blur-xl border-t border-[#00A6FB]/20 shadow-2xl">
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#E6F6FE] hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-[#006494]/50 hover:scale-105"
                >
                  {link.label}
                </Link>
              ))}
              <div
                onClick={() => { setIsOpen(false); setModalOpen(true); }}
                className="px-8 py-4 rounded-2xl bg-white text-[#003554] font-bold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 shadow-lg"
              >
                Hire Me
              </div>
            </div>
          </div>
        )}

        <HireModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </nav>
  );
}