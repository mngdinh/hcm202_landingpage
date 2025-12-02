import React, { forwardRef } from 'react';
import { CONTENT_SECTIONS } from '../data/constants';
import { RevealOnScroll } from './RevealOnScroll';

export const MainContent = forwardRef<HTMLElement>((props, ref) => {
  return (
    <main
      ref={ref}
      className="py-20 bg-[#F3E8DC] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-[#8B0000] uppercase tracking-wider mb-3">
              4 Nội Dung Cốt Lõi
            </h2>
            <div className="w-24 h-1 bg-[#D9A441] mx-auto rounded"></div>
          </div>
        </RevealOnScroll>

        <div className="space-y-32">
          {CONTENT_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            const isEven = index % 2 === 0;

            return (
              <RevealOnScroll key={section.id}>
                <div
                  className={`flex flex-col md:flex-row gap-12 items-center ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon Side */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group perspective-1000">
                      <div className="absolute inset-0 bg-[#8B0000]/2 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                      <div className="relative bg-[#FFF7E6] p-10 rounded-2xl shadow-xl border border-[#D9A441]/40 dark:border-[#8B0000]/40 transition-all duration-300 transform group-hover:-translate-y-2">
                        <Icon
                          className="w-24 h-24 text-[#8B0000] transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-[#D9A441] font-bold px-4 py-2 rounded-lg shadow-md text-sm transform transition-transform group-hover:scale-110 duration-300">
                        Mục {section.id}
                      </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="w-full md:w-1/2 md:px-2">
                    <h3 className="text-3xl font-bold text-[#3E2B28] mb-3 transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-[#8B0000] font-medium mb-6 italic text-lg transition-colors duration-300">
                      {section.subtitle}
                    </p>

                    <ul className="space-y-5">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-4 group">
                          <div className="mt-2 min-w-[8px] h-[8px] rounded-full bg-[#8B0000] group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-[#3E2B28] leading-relaxed text-lg transition-colors duration-300">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 inline-block bg-[#FFF7E6] px-6 py-4 rounded-xl border-l-4 border-[#8B0000] shadow-sm transition-colors duration-300">
                      <span className="font-semibold text-[#8B0000] ">
                        Từ khóa:{' '}
                      </span>
                      <span className="text-[#3E2B28]">
                        {section.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </main>
  );
});
