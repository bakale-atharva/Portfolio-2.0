import React from 'react';
import { SkillGroup } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { SkillsTicker } from '@/components/motion/SkillsTicker';
import { Code2, Layout, Server, Cpu } from 'lucide-react';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export function Skills({ skillGroups }: SkillsProps) {
  // Collect all skills for the kinetic ticker marquee
  const allSkills = Array.from(
    new Set(skillGroups.flatMap((group) => group.skills))
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code2 className="w-5 h-5 text-accent" />;
      case 'product':
        return <Layout className="w-5 h-5 text-accent" />;
      case 'backend & edge':
        return <Server className="w-5 h-5 text-accent" />;
      case 'workflow':
        return <Cpu className="w-5 h-5 text-accent" />;
      default:
        return <Code2 className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">
                {"// 03 TECHNICAL CAPABILITIES"}
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold font-display text-ink uppercase tracking-tighter mt-2">
                Stack & Disciplines
              </h2>
            </div>
            <p className="font-mono text-xs text-muted mt-4 md:mt-0 max-w-xs">
              Full-spectrum technical execution from front-end design systems to edge backend logic.
            </p>
          </div>
        </Reveal>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} yOffset={30} delay={index * 0.1}>
              <div className="h-full border border-hairline bg-surface/70 hover:bg-surface hover:border-accent/40 p-6 rounded-2xl transition-all duration-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 border-b border-hairline pb-4 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-canvas border border-hairline flex items-center justify-center">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-muted block">
                        DISCIPLINE {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display font-bold text-ink uppercase text-base">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="font-mono text-xs text-muted flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent border border-ink/20" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Kinetic Infinite Ticker Band — a deliberate inverted contrast band,
          not a "panel"; it's meant to read as a rhythm break in both
          themes, so it stays on the ink-inversion trick the surface cards
          above just moved away from. */}
      <Reveal yOffset={20}>
        <SkillsTicker skills={allSkills} />
      </Reveal>
    </section>
  );
}
