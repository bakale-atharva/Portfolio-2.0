import { HeroContent, Profile } from "@/lib/content";
import { Magnetic } from "@/components/motion/Magnetic";
import { Container } from "@/components/portfolio/Container";
import { ExplodedStack } from "@/components/portfolio/ExplodedStack";
import { ArrowDownRight, ArrowRight, MapPin } from "lucide-react";

interface HeroProps {
  profile: Profile;
  hero: HeroContent;
}

function lineDelay(ms: number) {
  return { "--line-delay": `${ms}ms` } as React.CSSProperties;
}

export function Hero({ profile, hero }: HeroProps) {
  const { panel } = hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b-2 border-ink bg-canvas">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Headline & Bio.

              These use the CSS load reveal (act 1), not <Reveal>: the hero is
              above the fold, so a view-timeline would already have run to
              completion before anyone could see it. `--line-delay` staggers
              the lines; the whole thing is CSS, so it plays before hydration. */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="hero-line" style={lineDelay(80)}>
              <h1 className="headline-morph text-5xl sm:text-6xl xl:text-7xl font-black font-display text-ink leading-[0.92] tracking-[-0.03em] uppercase">
                {hero.headlineLead}{" "}
                <span className="mark-block">{hero.headlineAccent}</span>{" "}
                {hero.headlineTrail}
              </h1>
            </div>

            <div className="hero-line" style={lineDelay(220)}>
              <p className="text-xl sm:text-2xl font-bold text-ink max-w-2xl leading-snug">
                {profile.tagline}
              </p>
              <p className="text-base sm:text-lg text-muted mt-4 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Meta status info & CTAs */}
            <div className="hero-line" style={lineDelay(340)}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink" />
                  <span>{profile.availability}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Magnetic>
                  <a
                    href={hero.primaryCta.href}
                    className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-accent hover:text-on-accent border-2 border-ink font-mono text-xs font-bold uppercase px-6 h-14 transition-colors active:translate-y-px touch-target"
                  >
                    <span>{hero.primaryCta.label}</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={hero.secondaryCta.href}
                    className="inline-flex items-center gap-2 border-2 border-ink bg-transparent hover:bg-accent hover:text-on-accent text-ink font-mono text-xs font-bold uppercase px-6 h-14 transition-colors active:translate-y-px touch-target"
                  >
                    <span>{hero.secondaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column: the exploded view, with the stored hero panel
              content set as a ruled parts table beneath it. */}
          <div className="lg:col-span-5">
            <div className="hero-line" style={lineDelay(280)}>
              <ExplodedStack className="w-full max-w-md mx-auto h-auto" />

              <div className="border-2 border-ink bg-surface mt-4">
                <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider">
                  <span className="text-ink font-bold">{panel.signal}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 font-mono text-xs">
                  <span className="text-muted">{panel.roleLabel}</span>
                  <span className="text-ink font-bold text-right">
                    {profile.role}
                  </span>
                  <span className="bg-accent text-on-accent border-2 border-ink px-2 py-0.5 font-bold">
                    {panel.roleStatus}
                  </span>
                </div>

                {panel.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-b border-rule px-4 py-3 font-mono text-xs space-y-2"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-muted">{stat.label}</span>
                      <span className="text-ink font-bold">{stat.value}</span>
                    </div>
                    <div
                      className="w-full h-2.5 border-2 border-ink"
                      role="presentation"
                    >
                      <div
                        className="bg-accent h-full border-r-2 border-ink"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 divide-x divide-rule font-mono text-xs">
                  {panel.badges.map((badge) => (
                    <div key={badge.label} className="px-4 py-3">
                      <div className="text-muted text-[11px] uppercase">
                        {badge.label}
                      </div>
                      <div
                        className={`font-bold mt-0.5 ${
                          badge.emphasis
                            ? "text-on-accent bg-accent inline-block px-1.5"
                            : "text-ink"
                        }`}
                      >
                        {badge.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
