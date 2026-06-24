// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

// /**
//  * HOME PAGE
//  * Used in: app/page.tsx
//  */
// export function homePageJsonLd(profile: any, settings: any) {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": "Person",
//       name: profile?.name,
//       description: profile?.short_intro,
//       image: profile?.profile_image_url,
//       url: baseUrl,
//       sameAs: [
//         settings.github_url,
//         settings.linkedin_url,
//         settings.twitter_url,
//       ].filter(Boolean),
//       knowsAbout: profile?.keywords || [],
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "WebSite",
//       name: settings.settings.site_name || "Portfolio",
//       url: baseUrl,
//       potentialAction: {
//         "@type": "SearchAction",
//         target: `${baseUrl}/creations?search={search_term_string}`,
//         "query-input": "required name=search_term_string",
//       },
//     },
//   ];
// }

// /**
//  * CREATION DETAIL
//  * Used in: creations/[type]/[slug]/page.tsx
//  */
// export function creationDetailJsonLd(creation: any) {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": creation.type === "blog" ? "BlogPosting" : "Article",
//       headline: creation.title,
//       description: creation.description,
//       image: creation.image,
//       inLanguage: creation.language === "ne" ? "ne-NP" : "en-US",
//       datePublished: creation.datePublished || creation.writtenDate,
//       dateModified: creation.dateModified,
//       keywords: creation.keywords?.join(", "),
//       mainEntityOfPage: {
//         "@type": "WebPage",
//         "@id": `${baseUrl}${creation.path}`,
//       },
//       author: { "@type": "Person", name: creation.author },
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "SpeakableSpecification",
//       cssSelector: [".summary", ".intro"],
//     },
//   ];
// }

// /**
//  * PROJECT DETAIL
//  * Used in: projects/[slug]/page.tsx
//  */
// export function projectDetailJsonLd(project: any) {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": "CreativeWork",
//       name: project.title,
//       description: project.abstract,
//       image: project.featured_image_url,
//       dateCreated: project.started_date,
//       dateModified: project.updated_at,
//       keywords: [
//         ...project.keywords,
//         ...project.tags,
//         ...project.technologies,
//       ].join(", "),
//       author: {
//         "@type": "Person",
//         name: "Ayush Bhandari",
//       },
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "SpeakableSpecification",
//       cssSelector: [".summary", ".intro"],
//     },
//   ];
// }

// /**
//  * PROJECT LIST
//  * Used in: projects/page.tsx
//  */
// export function projectListJsonLd() {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": "CollectionPage",
//       name: "Projects Portfolio",
//       description: "Collection of web development projects and applications",
//       url: `${baseUrl}/projects`,
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "SpeakableSpecification",
//       cssSelector: [".summary", ".intro"],
//     },
//   ];
// }

// /**
//  * CREATION TYPE LIST
//  * Used in: creations/[type]/page.tsx
//  */
// export function creationTypeJsonLd(data: any, type: string) {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": "CollectionPage",
//       name: data.label,
//       description: `Collection of ${data.label.toLowerCase()}`,
//       url: `${baseUrl}/creations/${type}`,
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "SpeakableSpecification",
//       cssSelector: [".summary", ".intro"],
//     },
//   ];
// }

// /**
//  * CREATION LIST
//  * Used in: creations/page.tsx
//  */
// export function creationListJsonLd() {
//   return [
//     {
//       "@context": "https://schema.org",
//       "@type": "CollectionPage",
//       name: "Creative Writings",
//       description: "Collection of blog posts, poems, stories, and articles",
//       url: `${baseUrl}/creations`,
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "SpeakableSpecification",
//       cssSelector: [".summary", ".intro"],
//     },
//   ];
// }

// // ==================== ADVANCED SCHEMAS ====================

// /**
//  * ORGANIZATION SCHEMA
//  * Used in: layout.tsx or specific pages
//  */
// export function organizationJsonLd(settings: any) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: settings?.site_name || "Ayush Bhandari Portfolio",
//     url: baseUrl,
//     logo: `${baseUrl}/logo.png`,
//     sameAs: [
//       settings?.github_url,
//       settings?.linkedin_url,
//       settings?.twitter_url,
//     ].filter(Boolean),
//     contactPoint: {
//       "@type": "ContactPoint",
//       contactType: "Freelance Inquiries",
//       email: settings?.contact_email,
//       availableLanguage: ["English", "Nepali"],
//     },
//   };
// }

// /**
//  * HOWTO SCHEMA
//  * Used in: tutorial or step-by-step content pages
//  */
// export function howToJsonLd(data: {
//   title: string;
//   description: string;
//   steps: { name: string; text: string; image?: string; url?: string }[];
//   totalTime?: string;
//   image?: string;
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "HowTo",
//     name: data.title,
//     description: data.description,
//     image: data.image,
//     totalTime: data.totalTime,
//     step: data.steps.map((step, index) => ({
//       "@type": "HowToStep",
//       position: index + 1,
//       name: step.name,
//       text: step.text,
//       image: step.image,
//       url: step.url,
//     })),
//   };
// }

// /**
//  * COURSE SCHEMA
//  * Used in: portfolio projects that teach something
//  */
// export function courseJsonLd(data: {
//   title: string;
//   description: string;
//   provider: string;
//   url: string;
//   image?: string;
//   hasCourseInstance?: any[];
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Course",
//     name: data.title,
//     description: data.description,
//     provider: {
//       "@type": "Organization",
//       name: data.provider,
//       sameAs: baseUrl,
//     },
//     url: `${baseUrl}${data.url}`,
//     image: data.image,
//     hasCourseInstance: data.hasCourseInstance,
//   };
// }

// /**
//  * EVENT SCHEMA
//  * Used in: hackathons, webinars, launches
//  */
// export function eventJsonLd(data: {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate?: string;
//   location?: string;
//   url: string;
//   image?: string;
//   organizer?: string;
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Event",
//     name: data.title,
//     description: data.description,
//     startDate: data.startDate,
//     endDate: data.endDate,
//     eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
//     eventStatus: "https://schema.org/EventScheduled",
//     location: data.location
//       ? {
//           "@type": "Place",
//           name: data.location,
//           address: {
//             "@type": "PostalAddress",
//             addressLocality: data.location,
//             addressCountry: "NP",
//           },
//         }
//       : {
//           "@type": "VirtualLocation",
//           url: `${baseUrl}${data.url}`,
//         },
//     image: data.image,
//     organizer: {
//       "@type": "Organization",
//       name: data.organizer || "Ayush Bhandari",
//       url: baseUrl,
//     },
//     url: `${baseUrl}${data.url}`,
//   };
// }

// /**
//  * JOB POSTING SCHEMA
//  * Used in: hiring pages
//  */
// export function jobPostingJsonLd(data: {
//   title: string;
//   description: string;
//   url: string;
//   datePosted: string;
//   validThrough?: string;
//   employmentType?: string;
//   organization?: string;
//   location?: string;
//   salary?: { min: number; max: number; currency: string; unit: string };
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "JobPosting",
//     title: data.title,
//     description: data.description,
//     datePosted: data.datePosted,
//     validThrough: data.validThrough,
//     hiringOrganization: {
//       "@type": "Organization",
//       name: data.organization || "Ayush Bhandari",
//       sameAs: baseUrl,
//     },
//     jobLocation: {
//       "@type": "Place",
//       address: {
//         "@type": "PostalAddress",
//         addressCountry: "NP",
//         addressLocality: data.location || "Remote",
//       },
//     },
//     employmentType: data.employmentType || "CONTRACTOR",
//     baseSalary: data.salary
//       ? {
//           "@type": "MonetaryAmount",
//           currency: data.salary.currency,
//           value: {
//             "@type": "QuantitativeValue",
//             minValue: data.salary.min,
//             maxValue: data.salary.max,
//             unitText: data.salary.unit,
//           },
//         }
//       : undefined,
//     url: `${baseUrl}${data.url}`,
//   };
// }

// /**
//  * PRODUCT SCHEMA
//  * Used in: showcasing tools, templates, etc.
//  */
// export function productJsonLd(data: {
//   title: string;
//   description: string;
//   url: string;
//   image?: string;
//   price?: number;
//   currency?: string;
//   availability?: string;
//   brand?: string;
//   rating?: { ratingValue: number; reviewCount: number };
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: data.title,
//     description: data.description,
//     image: data.image,
//     brand: {
//       "@type": "Brand",
//       name: data.brand || "Ayush Bhandari",
//     },
//     offers: data.price
//       ? {
//           "@type": "Offer",
//           url: `${baseUrl}${data.url}`,
//           priceCurrency: data.currency || "USD",
//           price: data.price,
//           availability: data.availability || "https://schema.org/InStock",
//           priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         }
//       : undefined,
//     aggregateRating: data.rating
//       ? {
//           "@type": "AggregateRating",
//           ratingValue: data.rating.ratingValue,
//           reviewCount: data.rating.reviewCount,
//         }
//       : undefined,
//     url: `${baseUrl}${data.url}`,
//   };
// }

// /**
//  * REVIEW SCHEMA
//  * Used in: testimonials, client feedback
//  */
// export function reviewJsonLd(data: {
//   title: string;
//   reviewBody: string;
//   author: string;
//   itemReviewed: string;
//   rating: number;
//   datePublished: string;
// }) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Review",
//     name: data.title,
//     reviewBody: data.reviewBody,
//     author: {
//       "@type": "Person",
//       name: data.author,
//     },
//     itemReviewed: {
//       "@type": "CreativeWork",
//       name: data.itemReviewed,
//     },
//     reviewRating: {
//       "@type": "Rating",
//       ratingValue: data.rating,
//       bestRating: 5,
//     },
//     datePublished: data.datePublished,
//   };
// }

// /**
//  * FAQ PAGE SCHEMA
//  * Used in: FAQ sections
//  */
// export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     mainEntity: faqs.map((faq) => ({
//       "@type": "Question",
//       name: faq.question,
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: faq.answer,
//       },
//     })),
//   };
// }

// /**
//  * BREADCRUMB LIST SCHEMA
//  * Already in breadcrumbs.ts but included here for completeness
//  */
// export function breadcrumbListJsonLd(items: { name: string; path: string }[]) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: items.map((item, index) => ({
//       "@type": "ListItem",
//       position: index + 1,
//       name: item.name,
//       item: `${baseUrl}${item.path}`,
//     })),
//   };
// }

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