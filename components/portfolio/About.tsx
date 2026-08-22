import React from 'react';
import { AboutContent, Profile } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { Download, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface AboutProps {
  profile: Profile;
  about: AboutContent;
}

export function About({ profile, about }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">
                {about.sectionLabel}
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold font-display text-ink uppercase tracking-tighter mt-2">
                {about.heading}
              </h2>
            </div>
            <p className="font-mono text-xs text-muted mt-4 md:mt-0 max-w-xs">
              {about.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal yOffset={30}>
              <div className="border border-hairline bg-surface/70 p-8 rounded-2xl space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-hairline bg-canvas">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-ink font-semibold">{profile.role}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink uppercase tracking-tight leading-snug">
                  {about.cardHeading}
                </h3>

                <p className="text-muted font-display leading-relaxed text-base">
                  {profile.bio}
                </p>

                <div className="border-t border-hairline pt-6 font-mono text-xs text-muted space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-ink" />
                    <span className="font-semibold text-ink">{about.philosophyLabel}</span>
                    <span>{about.philosophy}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Strengths Grid */}
            <Reveal yOffset={30} delay={0.1}>
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                  {about.strengthsLabel}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {about.strengths.map((item) => (
                    <div
                      key={item.title}
                      className="border border-hairline bg-surface/50 p-5 rounded-xl space-y-2 hover:bg-surface transition-colors"
                    >
                      <div className="flex items-center gap-2 font-display font-bold text-sm text-ink uppercase">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-muted font-display leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Status Card & Resume CTA — an elevated surface
              panel, not the old always-black card: canvas is already dark
              by default now, so bg-surface reads as raised without needing
              the ink-inversion trick. */}
          <div className="lg:col-span-5">
            <Reveal yOffset={40} delay={0.2}>
              <div className="border border-hairline bg-surface text-ink p-8 rounded-2xl space-y-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-hairline pb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {about.statusLabel}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span>{profile.availability}</span>
                  </div>

                  <p className="text-sm font-display text-muted leading-relaxed">
                    {about.availabilityNote}
                  </p>
                </div>

                <div className="pt-6 border-t border-hairline space-y-4">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-accent text-on-accent hover:bg-accent/90 font-mono text-xs font-bold uppercase py-4 px-6 rounded-full transition-all active:scale-95 touch-target shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>{about.resumeCtaLabel}</span>
                  </a>

                  <p className="text-[11px] font-mono text-center text-muted">
                    {about.resumeNote}
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
