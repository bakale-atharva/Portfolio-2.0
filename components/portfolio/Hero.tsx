import { HeroContent, Profile } from "@/lib/content";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  ArrowDownRight,
  Sparkles,
  MapPin,
  Terminal,
} from "lucide-react";

interface HeroProps {
  profile: Profile;
  hero: HeroContent;
}

export function Hero({ profile, hero }: HeroProps) {
  const { panel } = hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-hairline bg-canvas">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(243,240,232,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,240,232,0.08)_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Bio.

              These use the CSS load reveal (act 1), not <Reveal>: the hero is
              above the fold, so a view-timeline would already have run to
              completion before anyone could see it. `--line-delay` staggers
              the lines; the whole thing is CSS, so it plays before hydration. */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="hero-line" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
              <h1 className="headline-morph text-5xl sm:text-7xl lg:text-8xl font-bold font-display text-ink leading-[0.95] tracking-tighter uppercase">
                {hero.headlineLead}{" "}
                <span className="font-accent italic font-normal normal-case text-accent tracking-normal">
                  {hero.headlineAccent}
                </span>{" "}
                {hero.headlineTrail}
              </h1>
            </div>

            <div className="hero-line" style={{ "--line-delay": "220ms" } as React.CSSProperties}>
              <p className="text-lg sm:text-xl text-muted font-display max-w-2xl leading-relaxed">
                {profile.tagline}
              </p>
              <p className="text-base sm:text-lg text-muted/80 font-display mt-3 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Meta status info & CTAs */}
            <div className="hero-line" style={{ "--line-delay": "340ms" } as React.CSSProperties}>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted py-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ink" />
                  <span>{profile.location}</span>
                </div>
                <span className="text-muted/40">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{profile.availability}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Magnetic>
                  <a
                    href={hero.primaryCta.href}
                    className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-ink/90 font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition active:scale-95 touch-target shadow-sm"
                  >
                    <span>{hero.primaryCta.label}</span>
                    <ArrowDownRight className="w-4 h-4 text-accent" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={hero.secondaryCta.href}
                    className="inline-flex items-center gap-2 border border-hairline bg-surface/70 hover:bg-surface text-ink font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition touch-target"
                  >
                    <span>{hero.secondaryCta.label}</span>
                    <Sparkles className="w-4 h-4 text-ink" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Technical Composition Panel */}
          <div className="lg:col-span-5">
            <div
              className="hero-line"
              style={{ "--line-delay": "280ms" } as React.CSSProperties}
            >
              <div className="relative border border-hairline bg-surface text-ink rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                {/* Visual Header / Window bar */}
                <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6 font-mono text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent/80 inline-block" />
                  </div>
                  <span className="text-accent font-mono text-[10px] tracking-widest uppercase">
                    {panel.signal}
                  </span>
                </div>

                {/* Main panel content */}
                <div className="space-y-6">
                  <div className="border border-hairline rounded-lg p-4 bg-canvas/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted">
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-accent" />
                        <span>{panel.roleLabel}</span>
                      </span>
                      <span className="text-accent font-bold">
                        {panel.roleStatus}
                      </span>
                    </div>
                    <p className="font-mono text-sm font-semibold text-ink">
                      {profile.role}
                    </p>
                  </div>

                  {/* Intersecting grid graphic element */}
                  <div className="relative border border-dashed border-hairline p-6 rounded-lg bg-canvas/40 space-y-3 font-mono text-xs">
                    {panel.stats.map((stat) => (
                      <div key={stat.label} className="space-y-3">
                        <div className="flex justify-between items-center text-muted">
                          <span>{stat.label}</span>
                          <span className="text-ink font-semibold">
                            {stat.value}
                          </span>
                        </div>
                        <div className="w-full bg-hairline h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-accent h-full rounded-full"
                            style={{ width: `${stat.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech status indicators */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    {panel.badges.map((badge) => (
                      <div
                        key={badge.label}
                        className="border border-hairline p-3 rounded-lg bg-canvas/40"
                      >
                        <div className="text-muted text-[10px] uppercase">
                          {badge.label}
                        </div>
                        <div
                          className={`font-bold mt-0.5 ${
                            badge.emphasis ? "text-accent" : "text-ink"
                          }`}
                        >
                          {badge.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle corner badge */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/20 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
