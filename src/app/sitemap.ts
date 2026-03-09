// frontend2\src\app\sitemap.ts
import { MetadataRoute } from 'next';
import { getBootstrap, getProjects, getCreations } from '@/lib/data';
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const safeDate = (value?: string | null) => {
  const date = new Date(value || "");
  return isNaN(date.getTime()) ? new Date() : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bootstrap = await getBootstrap();
  const settings = normalizeSettingsFromBootstrap(bootstrap);
  const sitemapSettings = settings.sitemap;

  // Helper to check if page should be included
  const shouldInclude = (pageName: string) => {
    return sitemapSettings[pageName]?.include !== false;
  };

  // Helper to get sitemap config
  const getConfig = (pageName: string) => ({
    changeFrequency: (sitemapSettings[pageName]?.changefreq || 'monthly') as any,
    priority: sitemapSettings[pageName]?.priority || 0.5,
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [];

  if (shouldInclude('home')) {
    staticPages.push({
      url: baseUrl,
      lastModified: new Date(),
      ...getConfig('home'),
    });
  }

  if (shouldInclude('projects')) {
    staticPages.push({
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      ...getConfig('projects'),
    });
  }

  if (shouldInclude('creations')) {
    staticPages.push({
      url: `${baseUrl}/creations`,
      lastModified: new Date(),
      ...getConfig('creations'),
    });
  }

  // Projects
  const projects = await getProjects();
  const projectPages: MetadataRoute.Sitemap = projects
    .filter(project => shouldInclude('project-detail'))
    .map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: safeDate(project.updated_at),
      changeFrequency: 'monthly' as any,
      priority: project.featured ? 0.9 : 0.7,
    }));

  // Creations - Group by translation_key to avoid duplicate indexing
  const [blogs, poems, stories, articles] = await Promise.all([
    getCreations({ type: 'blog' }),
    getCreations({ type: 'poem' }),
    getCreations({ type: 'story' }),
    getCreations({ type: 'article' }),
  ]);

  const allCreations = [...blogs, ...poems, ...stories, ...articles];

  // Group creations by translation_key and only include primary language version
  const creationsByTranslationKey = new Map();
  
  allCreations.forEach(creation => {
    const key = creation.translation_key;
    const existing = creationsByTranslationKey.get(key);
    
    // Prefer English version, or first encountered
    if (!existing || (creation.language === 'en' && existing.language !== 'en')) {
      creationsByTranslationKey.set(key, creation);
    }
  });

  // Use unique creations for sitemap
  const uniqueCreations = Array.from(creationsByTranslationKey.values());

  const creationPages: MetadataRoute.Sitemap = uniqueCreations
    .filter(creation => {
      const pageType = `${creation.type}-detail`;
      return shouldInclude(pageType);
    })
    .map(creation => ({
      url: `${baseUrl}/creations/${creation.type}/${creation.slug}`,
      lastModified: safeDate(creation.updated_at),
      ...getConfig(`${creation.type}-detail`),
    }));

  // Creation type pages
  const creationTypePages: MetadataRoute.Sitemap = [];
  
  const typeData = [
    { type: 'blog', hasItems: blogs.length > 0 },
    { type: 'poem', hasItems: poems.length > 0 },
    { type: 'story', hasItems: stories.length > 0 },
    { type: 'article', hasItems: articles.length > 0 },
  ];

  typeData.forEach(({ type, hasItems }) => {
    const pageType = `${type}-list`;
    if (hasItems && shouldInclude(pageType)) {
      creationTypePages.push({
        url: `${baseUrl}/creations/${type}`,
        lastModified: new Date(),
        ...getConfig(pageType),
      });
    }
  });

  return [...staticPages, ...projectPages, ...creationTypePages, ...creationPages];
}