'use client';

import dynamic from 'next/dynamic';

const SectionSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <section className="py-20 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="h-8 w-48 rounded-full bg-slate-200 animate-pulse mb-10" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-64 rounded-3xl bg-slate-200/80 animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

export const Home = dynamic(
  () => import('../portfolioSections/Hero'),
  { loading: () => <SectionSkeleton rows={1} /> }
);

export const Skills = dynamic(
  () => import('../portfolioSections/SkillsSection'),
  { loading: () => <SectionSkeleton rows={6} /> }
);

export const Services = dynamic(
  () => import('../portfolioSections/ServicesSection'),
  { loading: () => <SectionSkeleton rows={3} /> }
);

export const Contact = dynamic(
  () => import('../portfolioSections/ContactSection'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const SocialMediaClient = dynamic(
  () => import('@/components/SocialMediaClient'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const HireModal = dynamic(
  () => import('@/components/HireModal'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const ExperienceCard = dynamic(
  () => import('@/components/cards/ExperienceCard'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const NavbarClient = dynamic(
  () => import('@/components/commonSections/NavbarClient'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const ContentProcessor = dynamic(
  () => import('@/components/ContentProcessor'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const CreationDetailClient = dynamic(
  () => import('@/components/CreationDetailClient'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const ProjectDetailClient = dynamic(
  () => import('@/components/ProjectDetailClient'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const SubscribeForm = dynamic(
  () => import('@/components/SubscribeForm'),
  { loading: () => <SectionSkeleton rows={2} /> }
);

export const TableOfContents = dynamic(
  () => import('@/components/TableOfContents'),
  { loading: () => <SectionSkeleton rows={2} /> }
);