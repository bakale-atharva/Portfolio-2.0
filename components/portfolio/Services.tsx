import { Service } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/portfolio/Container";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Check, ArrowRight } from "lucide-react";

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-28 border-b-2 border-ink bg-canvas">
      <Container>
        <SectionHeader
          label="// 02 SERVICES & OFFERS"
          title="Specialized Capabilities"
          blurb="Tailored engineering and architecture services for teams demanding precision and speed."
        />

        {/* Three parts on one sheet: ruled columns that share their borders,
            not three floating cards. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-2 border-ink divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink bg-surface">
          {services.map((service, index) => (
            <Reveal key={service.id} yOffset={30} delay={index * 0.1}>
              <div className="h-full flex flex-col justify-between text-ink p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b-2 border-ink pb-5 mb-6">
                    <span className="step-badge">{Number(service.id) || service.id}</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink border border-ink px-2 py-1">
                      STUDIO OFFER
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-display text-ink mb-4 uppercase tracking-[-0.02em] leading-none">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8 border-t border-rule pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-bold mb-4">
                      {"// KEY DELIVERABLES"}
                    </h4>
                    <ul className="space-y-3">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink">
                          <span className="w-5 h-5 border-2 border-ink bg-accent flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-on-accent" strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-ink">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-ink bg-canvas hover:bg-accent hover:text-on-accent text-ink font-mono text-xs font-bold uppercase h-12 px-4 transition-colors touch-target"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
