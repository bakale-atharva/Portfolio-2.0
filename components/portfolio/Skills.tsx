import { SkillGroup } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SkillsTicker } from "@/components/motion/SkillsTicker";
import { Container } from "@/components/portfolio/Container";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Code2, Layout, Server, Cpu } from "lucide-react";

interface SkillsProps {
  skillGroups: SkillGroup[];
}

const ICON_CLASS = "w-5 h-5 text-ink";

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "frontend":
      return <Code2 className={ICON_CLASS} />;
    case "product":
      return <Layout className={ICON_CLASS} />;
    case "backend & edge":
      return <Server className={ICON_CLASS} />;
    case "workflow":
      return <Cpu className={ICON_CLASS} />;
    default:
      return <Code2 className={ICON_CLASS} />;
  }
}

export function Skills({ skillGroups }: SkillsProps) {
  // Collect all skills for the kinetic ticker marquee
  const allSkills = Array.from(
    new Set(skillGroups.flatMap((group) => group.skills)),
  );

  return (
    <section id="skills" className="pt-20 md:pt-28 border-b-2 border-ink bg-canvas">
      <Container className="mb-20 md:mb-28">
        <SectionHeader
          label="// 03 TECHNICAL CAPABILITIES"
          title="Stack & Disciplines"
          blurb="Full-spectrum technical execution from front-end design systems to edge backend logic."
        />

        {/* Parts list: one ruled grid, each discipline a bordered cell. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-ink divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-ink bg-surface">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} yOffset={30} delay={index * 0.1}>
              <div className="h-full p-6">
                <div className="flex items-center gap-3 border-b-2 border-ink pb-4 mb-4">
                  <div className="w-10 h-10 border-2 border-ink bg-accent flex items-center justify-center shrink-0">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase text-muted block">
                      DISCIPLINE {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-black text-ink uppercase text-lg leading-tight">
                      {group.category}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-ink flex items-center gap-2.5"
                    >
                      <span className="w-2 h-2 bg-ink shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Kinetic ticker band: the page's one full-yellow moment, a rhythm
          break between the parts list and the About sheet. */}
      <Reveal yOffset={20}>
        <SkillsTicker skills={allSkills} className="border-t-2 border-ink" />
      </Reveal>
    </section>
  );
}
