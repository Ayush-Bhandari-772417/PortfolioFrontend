import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, Sparkles, PauseCircle } from 'lucide-react';

interface ProjectRecommendationCardProps {
  project: Project;
}

const statusConfig = {
  completed: { color: 'bg-[#00A6FB]/10 text-[#006494]', text: 'Completed', icon: CheckCircle },
  ongoing: { color: 'bg-[#0582CA]/10 text-[#006494]', text: 'In Progress', icon: Clock },
  planned: { color: 'bg-[#003554]/10 text-[#003554]', text: 'Planned', icon: Sparkles },
  paused: { color: 'bg-[#051923]/10 text-[#051923]', text: 'Paused', icon: PauseCircle },
} as const;

export default function ProjectRecommendationCard({ project }: ProjectRecommendationCardProps) {
  const StatusIcon = statusConfig[project.status]?.icon ?? Clock;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="p-4 rounded-xl hover:bg-[#00A6FB]/5 transition-all border border-slate-100 hover:border-[#00A6FB]/30 hover:shadow-lg hover:shadow-[#006494]/10 transform hover:-translate-y-0.5 hover:scale-[1.02] duration-300 overflow-hidden bg-gradient-to-br from-white to-[#E6F6FE]/50">
        <div className="flex gap-3">
          {project.featured_image_url && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/50 group-hover:ring-[#00A6FB]/40">
              <Image
                src={project.featured_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 80px, 100px"
                className="object-cover group-hover:scale-110 transition-transform duration-400 saturate-100 group-hover:saturate-120 brightness-100 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          <div className="flex-1 min-w-0 py-1">
            <h4 className="font-bold text-slate-900 group-hover:text-[#006494] transition-all line-clamp-2 text-sm leading-tight mb-1.5 pr-2">
              {project.title}
            </h4>
            <p className="text-xs text-slate-500 group-hover:text-slate-600 line-clamp-2 leading-relaxed mb-2 pr-2">
              {project.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm border border-slate-200/50 ${statusConfig[project.status]?.color ?? 'bg-slate-100 text-slate-700'} transform group-hover:scale-105 group-hover:shadow-md transition-all`}>
                <StatusIcon className="w-3 h-3 flex-shrink-0" />
                {statusConfig[project.status]?.text ?? project.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
