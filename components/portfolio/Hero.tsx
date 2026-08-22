import { HeroContent, Profile } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
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
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(17,17,15,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,15,0.08)_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <Reveal yOffset={30} delay={0.1}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-ink leading-[1.02] tracking-tight uppercase">
                {hero.headlineLead}{" "}
                <span className="underline decoration-accent decoration-4 underline-offset-4">
                  {hero.headlineAccent}
                </span>{" "}
                {hero.headlineTrail}
              </h1>
            </Reveal>

            <Reveal yOffset={20} delay={0.2}>
              <p className="text-lg sm:text-xl text-muted font-display max-w-2xl leading-relaxed">
                {profile.tagline}
              </p>
              <p className="text-base sm:text-lg text-muted/80 font-display mt-3 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </Reveal>

            {/* Meta status info & CTAs */}
            <Reveal yOffset={20} delay={0.3}>
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
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-ink/90 font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition-all active:scale-95 touch-target shadow-sm"
                >
                  <span>{hero.primaryCta.label}</span>
                  <ArrowDownRight className="w-4 h-4 text-accent" />
                </a>

                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-hairline bg-surface/70 hover:bg-surface text-ink font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition-all touch-target"
                >
                  <span>{hero.secondaryCta.label}</span>
                  <Sparkles className="w-4 h-4 text-ink" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Technical Composition Panel */}
          <div className="lg:col-span-5">
            <Reveal yOffset={40} delay={0.25}>
              <div className="relative border border-hairline bg-ink text-canvas rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                {/* Visual Header / Window bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent/80 inline-block" />
                  </div>
                  <span className="text-accent/90 font-mono text-[10px] tracking-widest uppercase">
                    {panel.signal}
                  </span>
                </div>

                {/* Main panel content */}
                <div className="space-y-6">
                  <div className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-white/60">
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-accent" />
                        <span>{panel.roleLabel}</span>
                      </span>
                      <span className="text-accent font-bold">
                        {panel.roleStatus}
                      </span>
                    </div>
                    <p className="font-mono text-sm font-semibold text-canvas">
                      {profile.role}
                    </p>
                  </div>

                  {/* Intersecting grid graphic element */}
                  <div className="relative border border-dashed border-white/20 p-6 rounded-lg bg-black/40 space-y-3 font-mono text-xs">
                    {panel.stats.map((stat) => (
                      <div key={stat.label} className="space-y-3">
                        <div className="flex justify-between items-center text-white/60">
                          <span>{stat.label}</span>
                          <span className="text-canvas font-semibold">
                            {stat.value}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
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
                        className="border border-white/10 p-3 rounded-lg bg-white/5"
                      >
                        <div className="text-white/40 text-[10px] uppercase">
                          {badge.label}
                        </div>
                        <div
                          className={`font-bold mt-0.5 ${
                            badge.emphasis ? "text-accent" : "text-canvas"
                          }`}
                        >
                          {badge.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle corner badge */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/20 transition-all" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
