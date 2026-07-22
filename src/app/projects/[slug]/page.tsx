// frontend2\src\app\projects\[slug]\page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects, getBootstrap, getDisplayLimit } from '@/lib/data';
import {ProjectDetailClient} from '@/components/client/DynamicSections';
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';
import { buildMetadata } from '@/lib/seo/metadata';
import { projectDetailJsonLd } from '@/lib/seo/jsonld';
import { websiteJsonLd } from '@/lib/seo/website';
import { breadcrumbsJsonLd } from '@/lib/seo/breadcrumbs';

export const revalidate = 86400;

export async function generateStaticParams() {
  const projects = await getProjects({ page_size: 1000 });
  return (projects || []).map((project: any) => ({ slug: project.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> { 
  const bootstrap = await getBootstrap();
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    normalizeSettingsFromBootstrap(bootstrap)
  ]);
  
  if (!project) return { title: 'Project Not Found' };

  return buildMetadata({
    settings: settings,
    page: "project_detail",
    title: `${project.title} | ${settings.settings.site_name || 'Portfolio'}`,
    description: project.excerpt || project.abstract,
    path: `/projects/${project.slug}`,
    image: project.featured_image_url || settings.settings.default_og_image || '/logo.png',
    publishedTime: project.started_date,
    modifiedTime: project.updated_at,
    keywords: [...project.keywords, ...project.tags, ...project.technologies],
  });
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const bootstrap = await getBootstrap();
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    normalizeSettingsFromBootstrap(bootstrap)
  ]);

  if (!project) notFound();

  // Get related projects limit from settings
  const relatedLimit = getDisplayLimit(settings, 'detail', 'projects', 5);
  
  // Get related projects (different slug, prefer same type or featured)
  const allProjects = await getProjects();
  const relatedProjects = allProjects
.filter((p: any) => p.slug !== slug)
.sort((a: any, b: any) => {
      // Prioritize same project type
      if (a.project_type === project.project_type && b.project_type !== project.project_type) return -1;
      if (b.project_type === project.project_type && a.project_type !== project.project_type) return 1;
      // Then featured projects
      if (a.featured && !b.featured) return -1;
      if (b.featured && !a.featured) return 1;
      // Then by date
      return new Date(b.started_date).getTime() - new Date(a.started_date).getTime();
    })
    .slice(0, relatedLimit);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              projectDetailJsonLd(project),
              websiteJsonLd(),
              breadcrumbsJsonLd([
                { name: "Projects", path: "/projects" },
                { name: project.title, path: `/projects/${project.slug}` },
              ]),
            ].filter(Boolean),
          }),
        }}
      />

      <ProjectDetailClient 
        project={project} 
        settings={settings}
        relatedProjects={relatedProjects}
      />
    </>
  );
}