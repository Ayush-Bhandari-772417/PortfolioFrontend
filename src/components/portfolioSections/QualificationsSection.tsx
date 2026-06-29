// frontend2\src\components\portfolioSections\QualificationsSection.tsx
import { Award, GraduationCap, Calendar } from 'lucide-react';
import { Qualification } from '@/types';

interface QualificationsProps {
  qualifications: Qualification[];
}

export default function QualificationsSection({ qualifications }: QualificationsProps) {
  return (
    <section id="qualifications" className="py-28 bg-gradient-to-br from-[#F4FBFF] via-white to-[#E6F6FE] border-t border-[#00A6FB]/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#006494]">Qualifications</span>
          </h2>
          <p className="text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Academic achievements and certifications
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(0,166,251,0.18),_transparent_45%)]" />
          <div className="hidden md:block absolute left-1/2 top-16 h-[calc(100%-4rem)] -translate-x-1/2 w-1 rounded-full bg-gradient-to-b from-[#00A6FB] via-[#0582CA]/40 to-transparent opacity-70" />

          <div className="space-y-16">
            {qualifications.map((qualification, index) => (
              <div
                key={qualification.id}
                className="relative grid gap-6 md:grid-cols-[1fr_48px_1fr] items-start"
                style={{
                  animation: 'fadeInUp 0.75s ease-out forwards',
                  animationDelay: `${index * 140}ms`,
                  opacity: 0,
                }}
              >
                <div className={`${index % 2 === 0 ? 'md:col-start-1 md:text-right md:pr-8' : 'md:col-start-3 md:text-left md:pl-8'}`}>
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00A6FB] to-[#006494] text-white shadow-[0_20px_60px_-35px_rgba(0,100,148,0.8)] mb-6 mx-auto md:mx-0 transition-transform duration-500 group-hover:scale-105">
                    {qualification.passed_year === 0 ? (
                      <GraduationCap className="w-7 h-7" />
                    ) : (
                      <Award className="w-7 h-7" />
                    )}
                    <span className="absolute -inset-1 rounded-full opacity-40 bg-gradient-to-r from-[#00A6FB] to-[#003554] blur-xl" />
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-[#00A6FB]/15 bg-white/90 backdrop-blur-xl shadow-2xl shadow-[#006494]/10 p-8 hover:-translate-y-1 transition-transform duration-500">
                    <div className="absolute -right-8 top-6 hidden md:block h-20 w-20 rounded-full bg-sky-100/80 blur-3xl" />
                    <span className="inline-flex items-center rounded-full bg-[#00A6FB]/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] font-semibold text-[#006494] shadow-sm mb-4">
                      {qualification.passed_year === null ? 'Ongoing' : 'Completed'}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                      {qualification.board_name}
                    </h3>
                    <p className="text-lg text-slate-600 font-semibold mb-4">
                      {qualification.school_name}
                    </p>
                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00A6FB] to-[#003554] blur-x rounded-full text-sm font-bold mb-4`}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {qualification.enrolled_year} - {qualification.passed_year || 'Present'}
                      </span>
                    </div>
                    <p className="text-base text-slate-700 leading-relaxed">
                      {qualification.description}
                    </p>
                  </div>
                </div>

                <div className="relative md:col-start-2 flex justify-center">
                  <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-slate-200/80" />
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-white border-4 border-[#00A6FB] shadow-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}