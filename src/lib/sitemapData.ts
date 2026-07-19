import { cache } from 'react';
import {
  getBootstrap,
  getProjects,
  getCreations,
} from '@/lib/data';
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';

import { Project, Creation } from '@/types';

/** Mapping of static page keys to their paths and display information. */
const staticPageConfigs: Record<string, { path: string; label: string; description?: string }> = {
  home: { path: '/', label: 'Home', description: 'Portfolio homepage' },
  projects: { path: '/projects', label: 'Projects', description: 'All development projects' },
  creations: { path: '/creations', label: 'Creations', description: 'Blog posts, poems, stories, articles' },
  html_sitemap: { path: '/sitemap-html', label: 'HTML Sitemap', description: 'Human-readable sitemap' },
  // Add more static pages here as needed. They will only be included if present in settings.sitemap.
};

/** Mapping of creation types to their display information for type pages. */
const creationTypeConfigs: Record<'blog' | 'poem' | 'story' | 'article', { label: string; description?: string }> = {
  blog: { label: 'Blogs', description: 'Read my latest blog posts' },
  poem: { label: 'Poems', description: 'Explore my collection of poems' },
  story: { label: 'Stories', description: 'Dive into my short stories' },
  article: { label: 'Articles', description: 'Read my informative articles' },
};

/**
 * Builds the complete sitemap data structure that serves as the single source of truth
 * for both XML and HTML sitemaps.
 *
 * This function fetches all necessary data (bootstrap, projects, creations) and processes
 * it according to the sitemap settings to produce a structured dataset that can be
 * easily consumed by sitemap generators.
 */
export const buildSitemapData = cache(async () => {
  // Fetch and normalize settings
  const bootstrap = await getBootstrap();
  const settings = normalizeSettingsFromBootstrap(bootstrap);

  // Initialize arrays for each type of page
  const staticPages: Array<{
    path: string;
    label: string;
    description?: string;
    priority?: number;
    changeFrequency?: string;
    lastModified?: string | Date;
  }> = [];

  const projectPages: Array<{
    slug: string;
    label: string;
    description?: string;
    priority: number;
    changeFrequency: string;
    lastModified: string | Date;
  }> = [];

  const creationTypePages: Array<{
    type: 'blog' | 'poem' | 'story' | 'article';
    label: string;
    description?: string;
    priority: number;
    changeFrequency: string;
  }> = [];

  const creationDetailPages: Array<{
    type: 'blog' | 'poem' | 'story' | 'article';
    slug: string;
    label: string;
    description?: string;
    priority: number;
    changeFrequency: string;
    lastModified: string | Date;
  }> = [];

  // Keep track of which static page keys we have processed from settings.sitemap.
  const processedKeys = new Set<string>();

  /**
   * Process static pages from settings.sitemap.
   * Only includes pages that have a corresponding entry in staticPageConfigs.
   */
  for (const [pageKey, setting] of Object.entries(settings.sitemap)) {
    if (!setting.include) continue;

    const config = staticPageConfigs[pageKey];
    if (!config) continue;

    processedKeys.add(pageKey);

    staticPages.push({
      path: config.path,
      label: config.label,
      description: config.description,
      priority: setting.priority,
      changeFrequency: setting.changefreq,
      // Static pages don't have a natural lastModified from content.
      // We could use a fixed value or leave undefined. Leaving undefined.
    });
  }

  /**
   * Special handling for the HTML sitemap page: if it's not present in settings.sitemap,
   * we still include it with default settings to preserve current behavior.
   */
  const htmlSitemapKey = 'html_sitemap';
  if (staticPageConfigs[htmlSitemapKey] && !processedKeys.has(htmlSitemapKey)) {
    const config = staticPageConfigs[htmlSitemapKey];
    staticPages.push({
      path: config.path,
      label: config.label,
      description: config.description,
      priority: 0.2, // default priority for HTML sitemap
      changeFrequency: 'monthly', // default change frequency
    });
  }

  /**
   * Process project detail pages.
   */
  const projectDetailSetting = settings.sitemap.project_detail;
  if (projectDetailSetting?.include) {
    const projects = await getProjects();
    for (const project of projects) {
      // Use the project's title as label and excerpt as description.
      projectPages.push({
        slug: project.slug,
        label: project.title,
        description: project.excerpt,
        priority: projectDetailSetting.priority,
        changeFrequency: projectDetailSetting.changefreq,
        lastModified:
          project.updated_at ??
          project.completed_date ??
          undefined,
      });
    }
  }

  /**
   * Process creation type pages (e.g., /creations/blog).
   */
  const creationTypeSetting = settings.sitemap.creations_type;
  if (creationTypeSetting?.include) {
    for (const type of ['blog', 'poem', 'story', 'article'] as const) {
      const config = creationTypeConfigs[type];
      if (!config) continue;

      creationTypePages.push({
        type,
        label: config.label,
        description: config.description,
        priority: creationTypeSetting.priority,
        changeFrequency: creationTypeSetting.changefreq,
      });
    }
  }

  /**
   * Process creation detail pages (e.g., /creations/blog/my-post).
   */
  const creationDetailSetting = settings.sitemap.creation_detail;
  if (creationDetailSetting?.include) {
    const creations = await getCreations();
    for (const creation of creations) {
      // Only process public creations (assuming the API already filters? but we check again)
      if (!creation.is_public) continue;

      const config = creationTypeConfigs[creation.type as 'blog' | 'poem' | 'story' | 'article'];
      if (!config) continue;

      creationDetailPages.push({
        type: creation.type as 'blog' | 'poem' | 'story' | 'article',
        slug: creation.slug,
        label: creation.title,
        description: creation.excerpt,
        priority: creationDetailSetting.priority,
        changeFrequency: creationDetailSetting.changefreq,
        lastModified:
          creation.updated_date ??
          creation.published_date ??
          undefined,
      });
    }
  }

  return {
    staticPages,
    projectPages,
    creationTypePages,
    creationDetailPages,
  };
});