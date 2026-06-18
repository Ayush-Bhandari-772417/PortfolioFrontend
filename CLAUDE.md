# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Runs the Next.js development server at http://localhost:3000
- **Build for production**: `npm run build` - Creates optimized production build
- **Start production server**: `npm run start` - Starts the built application
- **Lint code**: `npm run lint` - Runs ESLint on the codebase
- **Run type checking**: `npx tsc --noEmit` - TypeScript type checking

## Project Structure

- **`src/app`** - Next.js 13+ app router pages and layouts
  - `layout.tsx` - Root layout with TelemetryProvider, Navbar, and Footer
  - `page.tsx` - Home page
  - `projects/` - Project listings and individual project pages
  - `creations/` - Blog posts, poems, stories, and articles
  - `api/revalidate/route.ts` - Endpoint for revalidating cached data
  - `sitemap.ts`, `robots.ts` - SEO files
  - `manifest.ts` - Web app manifest
  - `og/` - Open Graph image generation route

- **`src/components`** - Reusable UI components
  - `commonSections/` - Navbar, Footer, PageHeader
  - `portfolioSections/` - Hero, About, Skills, Experience, Services, Qualifications sections
  - `cards/` - ProjectCard, CreationCard and their recommendation variants
  - `client/` - DynamicSections including HireModal
  - `ContentProcessor.tsx` - Processes rich content from API
  - `TelemetryProvider.tsx` - Wraps app with analytics providers

- **`src/lib`** - Utility functions and data fetching
  - `data.ts` - API fetching functions with caching and revalidation
  - `normalizeSettings.ts` - Processes bootstrap data from API
  - `analytics.ts` - Telemetry utilities
  - `seo/` - SEO-related utilities (metadata, jsonld, breadcrumbs, etc.)

- **`src/telemetry`** - Analytics and tracking systems
  - `core/` - Telemetry kernel and bus
  - `react/` - React context provider
  - `analytics/` - Trackers (Google Analytics, Hotjar, Clarity, etc.) and config
  - `vendors/` - Vendor loading and registry

- **`src/types`** - TypeScript type definitions
  - `index.ts` - Main types export (AllSettings, Profile, Project, Creation, etc.)
  - `katex-auto-render.d.ts` - KaTeX types

- **`src/styles`** - Global styles
  - `globals.css` - Tailwind CSS base styles

## Key Features

1. **Data Fetching**: Uses React Query via `getBootstrap()`, `getProjects()`, `getCreations()` functions in `src/lib/data.ts` with automatic revalidation (24 hours)
2. **Telemetry**: Comprehensive analytics system that loads after first paint via `TelemetryProvider`
3. **SEO**: Automatic sitemap generation, robots.txt, Open Graph images, metadata generation
4. **Dynamic Content**: Projects and creations fetched from backend API with slug-based routing
5. **Client-Side Interactions**: Hire modal, smooth scrolling, interactive elements
6. **Performance**: Image optimization with Next.js Image, lazy loading, font optimization

## Common Tasks

- **Adding a new section**: Create component in `src/components/portfolioSections/` and import in layout or page
- **Adding a new page**: Create file in `src/app/` following app router conventions
- **Modifying styling**: Edit Tailwind classes in components or add custom CSS in `src/styles/globals.css`
- **Updating API endpoints**: Modify functions in `src/lib/data.ts`
- **Adding analytics**: Create tracker in `src/telemetry/analytics/trackers/` and register in `src/telemetry/analytics/config.ts`
- **Running lint fixes**: `npx eslint . --fix`
- **Checking for type errors**: `npx tsc --noEmit`

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_BASE_URL` - Site base URL (for absolute URLs in metadata)
- `NEXT_PUBLIC_GSC_VERIFICATION` - Google Search Console verification code

## Architecture Notes

- Uses Next.js 13+ App Router with server components by default
- Client components marked with `"use client"` directive (e.g., Hero.tsx, DynamicSections)
- Data fetching happens in server components via cached functions in `src/lib/data.ts`
- State management primarily through React Query (via `getBootstrap()` and related functions)
- Styling with Tailwind CSS v4
- Telemetry loads asynchronously to avoid impacting initial load performance