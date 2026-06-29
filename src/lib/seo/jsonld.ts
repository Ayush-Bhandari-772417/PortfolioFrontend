// frontend2\src\lib\seo\jsonld.ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

// Returns Person only — WebSite removed (websiteJsonLd handles it separately)
export function homePageJsonLd(profile: any, settings: any) {
  return {
    "@type": "Person",
    name: profile?.name,
    description: profile?.short_intro,
    image: profile?.profile_image_url,
    url: baseUrl,
    sameAs: [
      settings.github_url,
      settings.linkedin_url,
      settings.twitter_url,
    ].filter(Boolean),
    knowsAbout: profile?.keywords || [],
  };
}

// speakable embedded inside Article/BlogPosting — not a sibling
export function creationDetailJsonLd(creation: any) {
  return {
    "@type": creation.type === "blog" ? "BlogPosting" : "Article",
    headline: creation.title,
    description: creation.description,
    image: creation.image,
    inLanguage: creation.language === "ne" ? "ne-NP" : "en-US",
    datePublished: creation.datePublished || creation.writtenDate,
    dateModified: creation.dateModified,
    keywords: creation.keywords?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${creation.path}`,
    },
    author: { "@type": "Person", name: creation.author },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".summary", ".intro"],
    },
  };
}

// speakable embedded inside CreativeWork
export function projectDetailJsonLd(project: any) {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.abstract,
    image: project.featured_image_url,
    dateCreated: project.started_date,
    dateModified: project.updated_at,
    keywords: [
      ...project.keywords,
      ...project.tags,
      ...project.technologies,
    ].join(", "),
    author: {
      "@type": "Person",
      name: "Ayush Bhandari",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".summary", ".intro"],
    },
  };
}

// speakable embedded inside CollectionPage
export function projectListJsonLd() {
  return {
    "@type": "CollectionPage",
    name: "Projects Portfolio",
    description: "Collection of web development projects and applications",
    url: `${baseUrl}/projects`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".summary", ".intro"],
    },
  };
}

// speakable embedded inside CollectionPage
export function creationTypeJsonLd(data: any, type: string) {
  return {
    "@type": "CollectionPage",
    name: data.label,
    description: `Collection of ${data.label.toLowerCase()}`,
    url: `${baseUrl}/creations/${type}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".summary", ".intro"],
    },
  };
}

// speakable embedded inside CollectionPage
export function creationListJsonLd() {
  return {
    "@type": "CollectionPage",
    name: "Creative Writings",
    description: "Collection of blog posts, poems, stories, and articles",
    url: `${baseUrl}/creations`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".summary", ".intro"],
    },
  };
}