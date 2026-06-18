// frontend2\src\components\portfolioSections\ServicesSection.tsx
'use client';

import DynamicIcon from '@/utils/getIconComponent';
import { Service } from '@/types';

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesClientProps) {
  return (
    <section id="services" className="py-28 bg-gradient-to-br from-[#F4FBFF] via-white to-[#E6F6FE] border-t border-[#00A6FB]/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#006494]">Services</span>
          </h2>
          <p className="text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Professional services I offer
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white/85 backdrop-blur-md rounded-2xl p-12 shadow-xl shadow-[#006494]/10 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border border-[#00A6FB]/20 relative overflow-hidden"
              style={{ 
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: `${index * 100}ms`,
                opacity: 0
              }}
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A6FB]/5 to-[#006494]/5 rounded-2xl group-hover:scale-110 transition-transform duration-500"></div>
              
              {/* Icon */}
              <div className="relative z-10 mb-10 text-7xl group-hover:scale-110 transition-transform duration-500 mx-auto">
                <DynamicIcon name={service.icon} className="text-[#006494] drop-shadow-lg group-hover:text-[#00A6FB]" />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-4xl font-black text-slate-900 mb-8 group-hover:text-[#006494] transition-colors duration-500 text-center leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-xl text-slate-700 leading-relaxed text-center mb-12 max-w-md mx-auto backdrop-blur-sm">
                {service.description}
              </p>

              {/* Decorative line */}
              <div className="relative z-10 w-24 h-1 bg-gradient-to-r from-[#00A6FB] to-[#006494] rounded-full mx-auto group-hover:w-48 transition-all duration-500 shadow-lg"></div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00A6FB]/20 to-[#006494]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
