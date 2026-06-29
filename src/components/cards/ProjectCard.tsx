// frontend2\src\components\cards\ProjectCard.tsx
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured }: ProjectCardProps) {
  return (
    <div 
      className="group bg-white/85 backdrop-blur-md rounded-2xl shadow-xl shadow-[#006494]/10 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 overflow-hidden border border-[#00A6FB]/20"
      style={{ 
        animation: 'fadeInUp 0.8s ease-out forwards',
        animationDelay: `${index * 120}ms`,
        opacity: 0
      }}
    >
      {/* Image */}
      <Link href={`/projects/${project.slug}`} className="block relative h-72 overflow-hidden rounded-t-2xl">
        {project.featured_image ? (
          <Image
            src={project.featured_image}
            alt={project.featured_image_alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 435px"
            className="object-cover transition-all duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00A6FB] to-[#006494] flex items-center justify-center">
            <div className="text-6xl opacity-80">{project.title.charAt(0).toUpperCase()}</div>
          </div>
        )}
        {featured && (
          <div className="absolute top-6 right-6 px-5 py-2 bg-[#00A6FB] text-white rounded-2xl text-sm font-black flex items-center gap-2 shadow-2xl animate-pulse">
            <Star className="w-5 h-5 fill-current" />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      </Link>

      {/* Content */}
      <div className="p-10">
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
            project.status === 'completed' ? 'bg-[#00A6FB]/10 text-[#006494]' :
            project.status === 'ongoing' ? 'bg-[#0582CA]/10 text-[#006494]' : 'bg-[#003554]/10 text-[#003554]'
          }`}>
            {project.status}
          </span>
          <span className="px-4 py-2 rounded-xl text-sm font-bold bg-[#00A6FB]/10 text-[#006494]">
            {project.project_type}
          </span>
        </div>

        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-[#006494] transition-all duration-500 leading-tight line-clamp-2 hover:underline decoration-[#00A6FB]">
            {project.title}
          </h3>
        </Link>

        <p className="text-xl text-slate-700 mb-8 line-clamp-3 leading-relaxed backdrop-blur-sm">
          {project.excerpt}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-[#00A6FB]/10 text-[#006494] rounded-2xl text-lg font-semibold shadow-md hover:bg-[#00A6FB]/15 transition-all">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-2xl text-lg font-semibold shadow-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 px-8 py-5 bg-gradient-to-r from-[#00A6FB] to-[#006494] text-white font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-[#006494]/20 hover:-translate-y-2 transition-all duration-500 shadow-xl text-center backdrop-blur-md hover:backdrop-blur-none group"
          >
            View Details
            <ArrowRight className="inline ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border-3 border-[#00A6FB]/25 rounded-2xl hover:border-[#00A6FB] hover:text-[#006494] hover:shadow-xl hover:rotate-12 transition-all duration-500 shadow-lg"
              title="Live Demo"
            >
              <ExternalLink className="w-7 h-7" />
            </a>
          )}
          {project.repository_link && (
            <a
              href={project.repository_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border-3 border-slate-200 rounded-2xl hover:border-[#00A6FB] hover:text-[#006494] hover:shadow-xl transition-all duration-500 shadow-lg"
              title="Source Code"
            >
              <Github className="w-7 h-7" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}