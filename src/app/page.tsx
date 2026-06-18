// frontend2\src\app\page.tsx
import {
  Home,
  Skills,
  Services,
  Contact
} from '@/components/client/DynamicSections';
import About from '@/components/portfolioSections/About';
import QualificationsSection from '@/components/portfolioSections/QualificationsSection';
import Experience from '@/components/portfolioSections/ExperienceSection';
import FeaturedProjectsSection from '@/components/portfolioSections/FeaturedProjectsSection';
import CreationsPreviewSection from '@/components/portfolioSections/CreationsPreviewSection';
import { getBootstrap, getDisplayLimit } from "@/lib/data";
import { normalizeSettingsFromBootstrap } from '@/lib/normalizeSettings';
import type { Metadata } from 'next';
import { buildMetadata } from "@/lib/seo/metadata";
import { homePageJsonLd } from "@/lib/seo/jsonld";
import { websiteJsonLd } from '@/lib/seo/website';
import { breadcrumbsJsonLd } from '@/lib/seo/breadcrumbs';
import { speakableJsonLd } from '@/lib/seo/speakable';

export const revalidate = 86400;

const _lintTitle = 'home'; 
void _lintTitle;

export async function generateMetadata(): Promise<Metadata> {
  const bootstrap = await getBootstrap();
  const settings = normalizeSettingsFromBootstrap(bootstrap);
  const profile = bootstrap.profile;

  return buildMetadata({
    settings: settings,
    page: "homepage",
    title: settings.settings.home_page_title,
    description: settings.settings.home_page_description,
    path: "/",
    image: profile?.profile_image_url,
    publishedTime: profile?.created_at,
    modifiedTime: profile?.updated_at,
    keywords: profile?.keywords,
  });
}

export default async function HomePage() {
  const bootstrap = await getBootstrap();
  const {
    profile,
    services,
    skills,
    experience,
    qualifications,
  } = bootstrap;

  // 🔥 normalize settings here
  const settings = normalizeSettingsFromBootstrap(bootstrap);

  const showSkills = settings.settings.home_show_skills !== false;
  const showQualifications = settings.settings.home_show_qualifications !== false;
  const showExperience = settings.settings.home_show_experience !== false;
  const showServices = settings.settings.home_show_services !== false;
  const showProjects = settings.settings.home_show_projects !== false;
  const showCreations = settings.settings.home_show_creations !== false;
  const showContact = settings.settings.home_show_contact !== false;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            homePageJsonLd(profile, settings),
            websiteJsonLd(),
            breadcrumbsJsonLd([]),
            speakableJsonLd(),
          ]),
        }}
      />

      <main className="min-h-screen">
        <Home profile={profile} settings={settings} />
        <About profile={profile} settings={settings} />
        {showSkills && <Skills skills={skills.slice(0, getDisplayLimit(settings, 'home', 'skills', 7))} />}
        {showQualifications && <QualificationsSection qualifications={qualifications.slice(0, getDisplayLimit(settings, 'home', 'qualifications', 10))} />}
        {showExperience && <Experience experiences={experience.slice(0, getDisplayLimit(settings, 'home', 'experiences', 3))} />}
        {showServices && <Services services={services.slice(0, getDisplayLimit(settings, 'home', 'services', 6))} />}
        {showProjects && <FeaturedProjectsSection settings={settings} />}
        {showCreations && <CreationsPreviewSection settings={settings} />}
        {showContact && <Contact settings={settings} />}
      </main>
    </>
  );
}