import { MetadataRoute } from "next";
import { buildSitemapData } from "@/lib/sitemapData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    staticPages,
    projectPages,
    creationTypePages,
    creationDetailPages,
  } = await buildSitemapData();

  const urls: MetadataRoute.SitemapItem[] = [];

  /**
   * Helper to add a URL to the sitemap, avoiding duplicates.
   */
  const added = new Set<string>();
  const addUrl = (
    path: string,
    options?: {
      priority?: number;
      changeFrequency?: MetadataRoute.SitemapItem["changeFrequency"];
      lastModified?: Date | string;
    }
  ) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.bhandariayush.com.np"}${path}`;
    if (added.has(url)) return;
    added.add(url);
    urls.push({ url, ...options });
  };

  // Add static pages
  for (const page of staticPages) {
    addUrl(page.path, {
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      lastModified: page.lastModified,
    });
  }

  // Add project detail pages
  for (const project of projectPages) {
    addUrl(`/projects/${project.slug}`, {
      priority: project.priority,
      changeFrequency: project.changeFrequency,
      lastModified: project.lastModified,
    });
  }

  // Add creation type pages
  for (const typePage of creationTypePages) {
    addUrl(`/creations/${typePage.type}`, {
      priority: typePage.priority,
      changeFrequency: typePage.changeFrequency,
    });
  }

  // Add creation detail pages
  for (const creation of creationDetailPages) {
    addUrl(`/creations/${creation.type}/${creation.slug}`, {
      priority: creation.priority,
      changeFrequency: creation.changeFrequency,
      lastModified: creation.lastModified,
    });
  }

  return urls;
}