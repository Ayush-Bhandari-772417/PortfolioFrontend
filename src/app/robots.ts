// frontend2/src/app/robots.ts

import { MetadataRoute } from "next";
import { getBootstrap } from "@/lib/data";
import { normalizeSettingsFromBootstrap } from "@/lib/normalizeSettings";

const DEFAULT_BASE_URL = "https://www.bhandariayush.com.np";

/**
 * Robots.txt only supports prefix matching.
 *
 * Therefore, only page types whose crawl behaviour can be expressed
 * safely are mapped here.
 *
 * Supported:
 *   ✓ project_detail
 *   ✓ creation_detail
 *
 * Intentionally NOT supported (Policy A):
 *   ✗ home
 *   ✗ projects
 *   ✗ creations
 *   ✗ creations_type
 *
 * Those page types should use meta robots (index/follow)
 * instead of robots.txt.
 */
const DISALLOW_PATHS: Record<string, string[]> = {
  /**
   * Matches:
   *   /projects/my-project
   *
   * Does NOT match:
   *   /projects
   */
  project_detail: ["/projects/"],

  /**
   * Matches:
   *   /creations/blog/post
   *   /creations/story/post
   *   /creations/article/post
   *   /creations/poem/post
   *
   * Does NOT match:
   *   /creations/blog
   *   /creations/story
   *   /creations/article
   *   /creations/poem
   */
  creation_detail: [
    "/creations/blog/",
    "/creations/story/",
    "/creations/article/",
    "/creations/poem/",
  ],
};

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL;

  const disallow = new Set<string>();

  /**
   * Always keep admin private.
   */
  disallow.add("/admin/");

  try {
    const bootstrap = await getBootstrap();
    const settings = normalizeSettingsFromBootstrap(bootstrap);

    /**
     * Global kill switch.
     *
     * If disabled, block crawling of the entire site.
     */
    if (settings.settings.allow_indexing === false) {
      return {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      };
    }

    /**
     * Apply crawl rules only for page types that can
     * be represented correctly by robots.txt.
     */
    for (const [page, seo] of Object.entries(settings.seo)) {
      if (seo.crawl !== false) continue;

      const paths = DISALLOW_PATHS[page];

      /**
       * Policy A:
       *
       * Ignore page types that cannot be expressed
       * accurately by robots.txt.
       */
      if (!paths) continue;

      // Process robots_override for noindex directives
      let shouldDisallowDueToOverride = false;
      if (seo.robots_override) {
        const directives = seo.robots_override
          .split(',')
          .map(d => d.trim().toLowerCase())
          .filter(d => d.length > 0);

        // Check for directives that indicate content should not be indexed
        const noIndexIndicators = directives.some(d =>
          ['noindex', 'none'].includes(d)
        );

        if (noIndexIndicators) {
          shouldDisallowDueToOverride = true;
        }
      }

      // Add paths to disallow if either crawl is false OR robots_override indicates noindex
      if (seo.crawl !== false || shouldDisallowDueToOverride) {
        paths.forEach((path) => disallow.add(path));
      }
    }
  } catch (error) {
    console.error(
      "robots.ts: failed to build dynamic robots.txt",
      error
    );
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...disallow],
    },

    sitemap: `${baseUrl}/sitemap.xml`,

    host: new URL(baseUrl).host,
  };
}