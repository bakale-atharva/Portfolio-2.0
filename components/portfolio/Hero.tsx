import { Profile } from "@/content/portfolio";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowDownRight,
  Sparkles,
  MapPin,
  Terminal,
} from "lucide-react";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-hairline bg-paper">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(17,17,15,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,15,0.08)_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <Reveal yOffset={30} delay={0.1}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-ink leading-[1.02] tracking-tight uppercase">
                I build{" "}
                <span className="underline decoration-lime decoration-4 underline-offset-4">
                  expressive
                </span>{" "}
                digital experiences.
              </h1>
            </Reveal>

            <Reveal yOffset={20} delay={0.2}>
              <p className="text-lg sm:text-xl text-slate font-display max-w-2xl leading-relaxed">
                {profile.tagline}
              </p>
              <p className="text-base sm:text-lg text-slate/80 font-display mt-3 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </Reveal>

            {/* Meta status info & CTAs */}
            <Reveal yOffset={20} delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate py-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ink" />
                  <span>{profile.location}</span>
                </div>
                <span className="text-slate/40">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span>{profile.availability}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-ink/90 font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition-all active:scale-95 touch-target shadow-sm"
                >
                  <span>View work</span>
                  <ArrowDownRight className="w-4 h-4 text-lime" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-hairline bg-white/70 hover:bg-white text-ink font-mono text-xs font-semibold uppercase px-6 py-4 rounded-full transition-all touch-target"
                >
                  <span>Start a project</span>
                  <Sparkles className="w-4 h-4 text-ink" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Technical Composition Panel */}
          <div className="lg:col-span-5">
            <Reveal yOffset={40} delay={0.25}>
              <div className="relative border border-hairline bg-ink text-paper rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                {/* Visual Header / Window bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-lime/80 inline-block" />
                  </div>
                  <span className="text-lime/90 font-mono text-[10px] tracking-widest uppercase">
                    LIVE STUDIO SIGNAL // v2.0
                  </span>
                </div>

                {/* Main panel content */}
                <div className="space-y-6">
                  <div className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-white/60">
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-lime" />
                        <span>ROLE</span>
                      </span>
                      <span className="text-lime font-bold">ACTIVE</span>
                    </div>
                    <p className="font-mono text-sm font-semibold text-paper">
                      {profile.role}
                    </p>
                  </div>

                  {/* Intersecting grid graphic element */}
                  <div className="relative border border-dashed border-white/20 p-6 rounded-lg bg-black/40 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-white/60">
                      <span>FRAMEWORK</span>
                      <span className="text-paper font-semibold">
                        NEXT.JS 16 + REACT
                      </span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-lime h-full w-4/5 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center text-white/60 pt-2">
                      <span>DESIGN SYSTEM</span>
                      <span className="text-paper font-semibold">
                        EDITORIAL CIRCUIT
                      </span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-lime h-full w-full rounded-full" />
                    </div>
                  </div>

                  {/* Tech status indicators */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="border border-white/10 p-3 rounded-lg bg-white/5">
                      <div className="text-white/40 text-[10px] uppercase">
                        STATUS
                      </div>
                      <div className="text-lime font-bold mt-0.5">
                        OPEN FOR Q3/Q4
                      </div>
                    </div>
                    <div className="border border-white/10 p-3 rounded-lg bg-white/5">
                      <div className="text-white/40 text-[10px] uppercase">
                        LATENCY
                      </div>
                      <div className="text-paper font-bold mt-0.5">
                        &lt; 10ms TARGET
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle corner badge */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-lime/10 rounded-full blur-2xl pointer-events-none group-hover:bg-lime/20 transition-all" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
