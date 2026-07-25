import React from 'react';
import { Profile } from '@/content/portfolio';
import { Reveal } from '@/components/motion/Reveal';
import { Download, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  const strengths = [
    {
      title: 'Full-Stack Technical Depth',
      desc: 'Architecting end-to-end web applications with Next.js, React, Node.js, and TypeScript.',
    },
    {
      title: 'Systematized UI & Design Tokens',
      desc: 'Bridging high-fidelity designs and robust, accessible component engines.',
    },
    {
      title: 'Performance & Accessibility First',
      desc: 'Optimized lighthouse metrics, bundle size control, and WCAG 2.1 AA compliance.',
    },
    {
      title: 'Editorial Visual Precision',
      desc: 'Crafting expressive typography, smooth micro-interactions, and kinetic animations.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-hairline bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-slate">
                {"// 04 ABOUT & SIGNAL"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-ink uppercase tracking-tight mt-2">
                Engineering Assessment
              </h2>
            </div>
            <p className="font-mono text-xs text-slate mt-4 md:mt-0 max-w-xs">
              Recruiter & collaborator overview on working philosophy and core technical strengths.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal yOffset={30}>
              <div className="border border-hairline bg-white/70 p-8 rounded-2xl space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-hairline bg-paper">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span className="text-ink font-semibold">{profile.role}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink uppercase tracking-tight leading-snug">
                  Bridging technical precision and editorial aesthetics.
                </h3>

                <p className="text-slate font-display leading-relaxed text-base">
                  {profile.bio}
                </p>

                <div className="border-t border-hairline pt-6 font-mono text-xs text-slate space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-ink" />
                    <span className="font-semibold text-ink">Philosophy:</span>
                    <span>Zero unnecessary bloat, type-safe API boundaries, pixel-perfect layout.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Strengths Grid */}
            <Reveal yOffset={30} delay={0.1}>
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate font-semibold">
                  {"// CORE ENGINEERING STRENGTHS"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {strengths.map((item) => (
                    <div
                      key={item.title}
                      className="border border-hairline bg-white/50 p-5 rounded-xl space-y-2 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-2 font-display font-bold text-sm text-ink uppercase">
                        <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate font-display leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Status Card & Resume CTA */}
          <div className="lg:col-span-5">
            <Reveal yOffset={40} delay={0.2}>
              <div className="border border-hairline bg-ink text-paper p-8 rounded-2xl space-y-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    SIGNAL STATUS
                  </span>
                  <ShieldCheck className="w-5 h-5 text-lime" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime/30 bg-lime/10 text-lime font-mono text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                    <span>{profile.availability}</span>
                  </div>

                  <p className="text-sm font-display text-white/80 leading-relaxed">
                    Open for select full-stack contract work, design system consultations, and senior technical leadership roles.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-lime text-ink hover:bg-lime/90 font-mono text-xs font-bold uppercase py-4 px-6 rounded-full transition-all active:scale-95 touch-target shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Résumé (PDF)</span>
                  </a>

                  <p className="text-[11px] font-mono text-center text-white/50">
                    Updated for 2026 // Includes project references
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
