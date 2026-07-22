// frontend2\src\components\commonSections\Navbar.tsx
import { AllSettings } from '@/types';
import { NavbarClient } from '@/components/client/DynamicSections';

export default function Navbar({ settings }: { settings: AllSettings }) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/creations', label: 'Creations' },
    { href: '/#contact', label: 'Contact' },
  ];

  // Ensure logoUrl is a string (some Setting types may be objects)
  const logoUrl = String(settings.settings.named_logo_url ?? '/logo.png');

  return (
    <NavbarClient
      navLinks={navLinks}
      logoUrl={logoUrl}
    />
  );
}