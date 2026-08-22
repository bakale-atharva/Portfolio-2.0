import React from 'react';
import { Project } from '@/lib/content';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '@/components/motion/Reveal';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="work" className="py-20 md:py-28 border-b border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">
                {"// 01 SELECTED WORK"}
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold font-display text-ink uppercase tracking-tighter mt-2">
                Featured Projects
              </h2>
            </div>
            <p className="font-mono text-xs text-muted mt-4 md:mt-0 max-w-xs">
              Selected production applications, design systems, and creative technology builds.
            </p>
          </div>
        </Reveal>

        {/*
          Structural sticky-stacking: each card pins under the sticky header
          as you scroll, and the next card scrolls up to cover it — pure CSS
          `position: sticky`, no JS. The scroll-driven scale/opacity fade on
          the card being covered is Phase 5's job (act #3 in the motion
          layer); this is the layout it plugs into.
        */}
        <div>
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="sticky top-20 md:top-24 pb-8 md:pb-12"
              style={{ zIndex: index + 1 }}
            >
              <Reveal yOffset={30}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
