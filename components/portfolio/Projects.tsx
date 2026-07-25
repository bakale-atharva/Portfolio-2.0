import React from 'react';
import { Project } from '@/content/portfolio';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '@/components/motion/Reveal';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="work" className="py-20 md:py-28 border-b border-hairline bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal yOffset={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-hairline">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-slate">
                {"// 01 SELECTED WORK"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-ink uppercase tracking-tight mt-2">
                Featured Projects
              </h2>
            </div>
            <p className="font-mono text-xs text-slate mt-4 md:mt-0 max-w-xs">
              Selected production applications, design systems, and creative technology builds.
            </p>
          </div>
        </Reveal>

        {/* Projects List */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <Reveal key={project.slug} yOffset={30} delay={index * 0.1}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
