import { AboutContent, Profile } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/portfolio/Container";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Download, Check, ShieldCheck, Zap } from "lucide-react";

interface AboutProps {
  profile: Profile;
  about: AboutContent;
}

export function About({ profile, about }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 border-b-2 border-ink bg-canvas">
      <Container>
        <SectionHeader
          label={about.sectionLabel}
          title={about.heading}
          blurb={about.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal yOffset={30}>
              <div className="border-2 border-ink bg-surface p-6 sm:p-8 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 border-2 border-ink bg-accent text-on-accent">
                  <span className="font-bold">{profile.role}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black font-display text-ink uppercase tracking-[-0.02em] leading-[1.02]">
                  {about.cardHeading}
                </h3>

                <p className="text-muted leading-relaxed text-base max-w-[68ch]">
                  {profile.bio}
                </p>

                <div className="border-t-2 border-ink pt-5 text-sm text-ink flex items-start gap-3">
                  <Zap className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold">{about.philosophyLabel}</span>{" "}
                    <span className="text-muted">{about.philosophy}</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Strengths */}
            <Reveal yOffset={30} delay={0.1}>
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
                  {about.strengthsLabel}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 border-2 border-ink divide-y-2 sm:divide-y-0 divide-ink bg-surface">
                  {about.strengths.map((item, i) => (
                    <li
                      key={item.title}
                      className={`p-5 space-y-2 ${
                        i % 2 === 1 ? "sm:border-l-2 sm:border-ink" : ""
                      } ${i >= 2 ? "sm:border-t-2 sm:border-ink" : ""}`}
                    >
                      <div className="flex items-start gap-2.5 font-display font-black text-base text-ink uppercase leading-tight">
                        <span className="w-5 h-5 border-2 border-ink bg-accent flex items-center justify-center shrink-0 mt-px">
                          <Check className="w-3 h-3 text-on-accent" strokeWidth={3} />
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right Column: status sheet & resume CTA. */}
          <div className="lg:col-span-5">
            <Reveal yOffset={40} delay={0.2}>
              <div className="border-2 border-ink bg-surface text-ink">
                <div className="flex items-center justify-between border-b-2 border-ink px-6 sm:px-8 py-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink font-bold">
                    {about.statusLabel}
                  </span>
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-ink bg-accent text-on-accent font-mono text-xs font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                      <span>{profile.availability}</span>
                    </div>

                    <p className="text-base text-muted leading-relaxed">
                      {about.availabilityNote}
                    </p>
                  </div>

                  <div className="pt-6 border-t-2 border-ink space-y-4">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 bg-ink text-canvas hover:bg-accent hover:text-on-accent border-2 border-ink font-mono text-xs font-bold uppercase h-14 px-6 transition-colors active:translate-y-px touch-target"
                    >
                      <Download className="w-4 h-4" />
                      <span>{about.resumeCtaLabel}</span>
                    </a>

                    <p className="text-xs font-mono text-center text-muted">
                      {about.resumeNote}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
