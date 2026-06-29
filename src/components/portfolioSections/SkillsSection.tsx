// frontend2\src\components\portfolioSections\SkillsSection.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DynamicIcon from '@/utils/getIconComponent';
import { Skill } from '@/types';

interface SkillsClientProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsClientProps> = ({ skills }) => {
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  const toggleSkill = (id: number) => {
    setExpandedSkill(expandedSkill === id ? null : id);
  };

  return (
    <section id="skills" className="py-28 bg-gradient-to-br from-[#F4FBFF] via-white to-[#E6F6FE] border-t border-[#00A6FB]/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#006494]">Skills</span>
          </h2>
          <p className="text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Technologies and tools I work with daily
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {skills.map((skill, index) => {
            const hasSubSkills = skill.subskills && skill.subskills.length > 0;
            const isExpanded = expandedSkill === skill.id;


            return (
              <div
                key={skill.id}
                className="text-slate-900 bg-white/85 backdrop-blur-md rounded-2xl shadow-xl shadow-[#006494]/10 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-[#00A6FB]/20 group h-fit"
                style={{ 
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 75}ms`,
                  opacity: 0
                }}
              >
                {/* Skill Header */}
                <div
                  className={`flex items-center justify-between p-10 rounded-t-2xl ${hasSubSkills ? 'cursor-pointer hover:bg-[#00A6FB]/5' : ''} transition-all`}
                  onClick={() => hasSubSkills && toggleSkill(skill.id)}
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300 p-4 bg-gradient-to-br from-[#00A6FB]/15 to-[#006494]/10 rounded-2xl shadow-lg">
                      <DynamicIcon name={skill.icon} className="text-[#006494]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-3xl font-black text-slate-900 group-hover:text-[#006494] transition-colors mb-2">
                        {skill.name}
                      </h3>
                      {hasSubSkills && (
                        <p className="text-lg text-slate-600 font-semibold">
                          {skill.subskills.length} {skill.subskills.length === 1 ? 'technology' : 'technologies'}
                        </p>
                      )}
                    </div>
                  </div>
                  {hasSubSkills && (
                    <div className="text-[#0582CA] p-4 rounded-2xl group-hover:bg-[#00A6FB]/15 transition-all">
                      {isExpanded ? (
                        <ChevronUp className="text-3xl" />
                      ) : (
                        <ChevronDown className="text-3xl" />
                      )}
                    </div>
                  )}
                </div>

                {/* SubSkills */}
                {hasSubSkills && isExpanded && (
                  <div className="px-10 pb-10 pt-6 bg-[#00A6FB]/5 border-t border-[#00A6FB]/20 rounded-b-2xl">
                    <div className="space-y-4">
                      {skill.subskills.map((subSkill, subIndex) => (
                        <div
                          key={subSkill.id}
                          style={{
                            animation: 'fadeInUp 0.6s ease-out forwards',
                            animationDelay: `${subIndex * 50}ms`,
                            opacity: 0
                          }}
                          className="flex items-center justify-between p-6 bg-white rounded-2xl border border-[#00A6FB]/20 shadow-md hover:border-[#00A6FB] hover:shadow-xl hover:shadow-[#006494]/10 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-5 flex-1 min-w-0">
                            <div className="text-3xl p-3 bg-[#00A6FB]/10 rounded-2xl">
                              <DynamicIcon name={subSkill.icon} className="text-[#006494]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-xl text-slate-900 block">
                                {subSkill.name}
                              </span>
                              <span className="inline-block mt-2 px-4 py-2 bg-[#00A6FB]/10 text-[#006494] font-semibold rounded-full">
                                {subSkill.level}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                className={`text-2xl ${i < subSkill.rating ? 'text-[#00A6FB] animate-pulse' : 'text-slate-300'}`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;