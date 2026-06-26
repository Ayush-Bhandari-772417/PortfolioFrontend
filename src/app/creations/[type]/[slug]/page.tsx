// frontend2\src\app\creations\[type]\[slug]\page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCreationBySlug, getCreations, getBootstrap, getDisplayLimit } from '@/lib/data';
import { Creation } from '@/types';
import {CreationDetailClient} from '@/components/client/DynamicSections';
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';
import { buildMetadata } from "@/lib/seo/metadata";
import { creationDetailJsonLd } from '@/lib/seo/jsonld';
import { websiteJsonLd } from '@/lib/seo/website';
import { breadcrumbsJsonLd } from '@/lib/seo/breadcrumbs';

export const revalidate = 86400;

export async function generateStaticParams() {
  const allParams: Array<{ type: string; slug: string }> = [];

  await Promise.all(
    validTypes.map(async (type) => {
      const creations = await getCreations({ type, page_size: 1000 });
      (creations || []).forEach((creation: any) => {
        if (creation?.slug) {
          allParams.push({ type, slug: creation.slug });
        }
      });
    })
  );

  return allParams;
}

const validTypes = ['blog', 'poem', 'story', 'article'] as const;
type CreationType = typeof validTypes[number];

// Helper to get related creations across types
async function getRelatedCreations(
  currentCreation: Creation,
  currentType: CreationType,
  limit: number
): Promise<Creation[]> {
  const related: Creation[] = [];
  
  // 1. Try to get same type, same language
  const sameType = await getCreations({ type: currentType });
  const sameTypeFiltered = sameType
    .slice(0, limit)
    .filter((c: Creation) => c.slug !== currentCreation.slug && c.language === currentCreation.language);
  related.push(...sameTypeFiltered.slice(0, limit));
  
  // 2. If we don't have enough, get from other types with same language
  if (related.length < limit) {
    const needed = limit - related.length;
    const otherTypes = validTypes.filter(t => t !== currentType);
    
    for (const otherType of otherTypes) {
      if (related.length >= limit) break;
      
      const otherCreations = await getCreations({ type: otherType, limit: needed * 2 });
      const filtered = otherCreations.filter(
        (c: Creation) =>
          c.language === currentCreation.language && !related.some((r: Creation) => r.id === c.id)
      );
      
      related.push(...filtered.slice(0, needed - related.length));
    }
  }
  
  return related.slice(0, limit);
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ type: string; slug: string }> 
}): Promise<Metadata> {
  const bootstrap = await getBootstrap();
  const { type, slug } = await params;
  const [creation, settings] = await Promise.all([
    getCreationBySlug(slug, type),
    normalizeSettingsFromBootstrap(bootstrap)
  ]);

  return buildMetadata({
    settings: settings,
    page: "creation-detail-page",
    title: `${creation?.title} | ${settings.settings.site_name || 'Portfolio'}`,
    description: creation?.excerpt || settings.settings.site_description || '',
    path: `/creations/${creation?.type}/${creation?.slug}`,
    image: creation?.featured_image_url || settings.settings.default_og_image || '/logo.png',
    locale: creation?.language === 'ne' ? 'ne_NP' : 'en_US',
    publishedTime: creation?.published_date || creation?.written_date,
    modifiedTime: creation?.updated_date,
    keywords: creation?.keywords,
  });
}

export default async function CreationDetailPage({ 
  params 
}: { 
  params: Promise<{ type: string; slug: string }> 
}) {
  const { type, slug } = await params;
  
  if (!validTypes.includes(type as CreationType)) {
    notFound();
  }

  const bootstrap = await getBootstrap();
  const [creation, settings] = await Promise.all([
    getCreationBySlug(slug, type),
    normalizeSettingsFromBootstrap(bootstrap)
  ]);
  
  if (!creation) notFound();

  const categoryName = bootstrap.categories?.find((cat: any) => cat.id == creation.category)?.name || null;

  // Get display limit from settings
  const relatedLimit = getDisplayLimit(settings, 'detail', type, 5);
  
  // Get related creations (same type first, then other types if needed)
  const relatedCreations = await getRelatedCreations(
    creation,
    type as CreationType,
    relatedLimit
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              creationDetailJsonLd(creation),
              websiteJsonLd(),
              breadcrumbsJsonLd([
                { name: "Creations", path: "/creations" },
                { name: creation.type, path: `/creations/${creation.type}` },
                { name: creation.title, path: creation.path },
              ]),
            ].filter(Boolean),
          }),
        }}
      />

      <CreationDetailClient 
        creation={creation} 
        relatedCreations={relatedCreations}
        settings={settings}
        categoryName={categoryName}
      />
    </>
  );
}