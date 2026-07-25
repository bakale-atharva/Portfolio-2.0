'use client';

import React from 'react';
import { Service } from '@/content/portfolio';
import { Reveal } from '@/components/motion/Reveal';
import { Check, ArrowRight } from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-28 border-b border-hairline bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-slate">
                {"// 02 SERVICES & OFFERS"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-ink uppercase tracking-tight mt-2">
                Specialized Capabilities
              </h2>
            </div>
            <p className="font-mono text-xs text-slate mt-4 md:mt-0 max-w-xs">
              Tailored engineering and architecture services for teams demanding precision and speed.
            </p>
          </div>
        </Reveal>

        {/* 3 Dark Ink Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={service.id} yOffset={30} delay={index * 0.1}>
              <div className="h-full flex flex-col justify-between border border-hairline bg-ink text-paper p-8 rounded-2xl relative group overflow-hidden shadow-xl hover:border-lime/50 transition-all duration-300">
                <div>
                  {/* Card Number */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <span className="font-mono text-4xl font-bold text-lime">
                      {service.id}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
                      STUDIO OFFER
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold font-display text-paper mb-4 uppercase">
                    {service.title}
                  </h3>
                  <p className="text-sm font-display text-white/70 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-lime font-semibold block mb-4">
                      {"// KEY DELIVERABLES"}
                    </span>
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-xs font-mono text-white/80">
                        <span className="w-4 h-4 rounded-full bg-lime/20 flex items-center justify-center text-lime shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-white/10">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-lime hover:text-ink text-paper font-mono text-xs font-semibold uppercase py-3.5 px-4 rounded-full transition-all touch-target"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
