// frontend2\src\lib\seo\metadata.ts
import { Metadata } from "next";
import { AllSettings } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';

type Props = {
  settings: AllSettings;
  page: string;
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  settings,
  page,
  title,
  description,
  path,
  image,
  keywords = [],
  publishedTime,
  modifiedTime,
  locale = "en_US",
  type = "website",
}: Props): Metadata {
  const robots = settings.seo[page];
  const siteName = settings.settings.site_name || 'Ayush Bhandari';
  const author = settings.settings.author_name || 'Ayush Bhandari';
  const defaultTitle = title || `${siteName} | Portfolio`;
  const defaultDescription = description || settings.settings.home_page_description || 'Portfolio & creations of Ayush Bhandari';

  return {
    title: defaultTitle,
    description: defaultDescription,
    keywords,
    authors: [{ name: author }],
    robots: {
      index: robots?.index ?? true,
      follow: robots?.follow ?? true,
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      type,
      url: `${baseUrl}${path}`,
      title: defaultTitle,
      description: defaultDescription,
      siteName,
      locale,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: defaultTitle }]
        : undefined,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: image ? [image] : undefined,
      creator: settings.settings.twitter_handle || undefined,
    },
    other: {
      'og:locale': settings.settings.site_language || 'en_US',
      'article:author': settings.settings.author_name || 'Ayush Bhandari',
    },
  };
}