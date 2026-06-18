'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  homeLabel?: string;
}

export default function Breadcrumbs({ items, homeLabel = 'Home' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split('/').filter(Boolean);
    const generated: BreadcrumbItem[] = [];
    let currentPath = '';

  segments.forEach((segment) => {
      currentPath += `/${segment}`;
      // Convert slug to readable label
      const label = segment
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      generated.push({
        label,
        href: currentPath,
      });
    });

    return generated;
  })();

  if (breadcrumbItems.length === 0 && pathname === '/') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
        {/* Home link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">{homeLabel}</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {index === breadcrumbItems.length - 1 ? (
              // Last item - current page (not a link)
              <span
                className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-[300px]"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              // Intermediate item - link
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors truncate max-w-[150px] sm:max-w-[200px]"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

