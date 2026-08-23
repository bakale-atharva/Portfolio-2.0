import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/content';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardNumber = String(index + 1).padStart(2, '0');

  // Layout comes from the project data, not from a hardcoded position, so any
  // number of projects renders correctly. Standard cards alternate which side
  // the image sits on; showcase cards go full width.
  const isShowcase = (project.layout ?? 'standard') === 'showcase';
  const isReverse = !isShowcase && index % 2 === 1;

  return (
    // Solid bg-surface, not bg-surface/70: this card sits inside the
    // sticky-stacking layout in Projects.tsx, where the next card scrolls
    // up to visually cover this one — translucency would let it bleed
    // through and break the stacking illusion.
    <article className="group relative border border-hairline bg-surface transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md">
      <div
        className={`grid grid-cols-1 ${
          isShowcase
            ? 'grid-cols-1'
            : 'lg:grid-cols-12'
        } items-stretch`}
      >
        {/* Image Container */}
        <div
          className={`relative bg-canvas/60 p-6 md:p-8 flex items-center justify-center overflow-hidden border-b lg:border-b-0 border-hairline ${
            isShowcase
              ? 'h-80 sm:h-96 w-full border-b border-hairline'
              : `lg:col-span-7 ${
                  isReverse ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                }`
          }`}
        >
          {/* `img-wipe` is act 10: a clip-path reveal driven by a view
              timeline as the card enters. Sits on the frame rather than the
              <Image> so the hover scale-up underneath is unaffected. */}
          <div className="img-wipe relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-inner border border-hairline/60 bg-ink/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            {/* Accent number overlay on image */}
            <div className="absolute top-3 left-3 z-10 font-mono text-xs font-bold text-ink bg-canvas px-3.5 py-1.5 rounded-full border border-hairline shadow-md">
              PROJECT // {cardNumber}
            </div>
          </div>
        </div>

        {/* Details Container */}
        <div
          className={`p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 ${
            isShowcase ? 'w-full' : 'lg:col-span-5'
          }`}
        >
          <div className="space-y-4">
            {/* Top metadata */}
            <div className="flex items-center justify-between text-xs font-mono text-muted border-b border-hairline/60 pb-3">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink uppercase">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {project.role}
              </span>
              <span>{project.year}</span>
            </div>

            {/* Title & Summary */}
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink group-hover:text-ink transition-colors">
              {project.title}
            </h3>

            <p className="text-muted font-display text-sm leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Tech stack chips & Action Links */}
          <div className="space-y-6 pt-4 border-t border-hairline/60">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-md bg-canvas border border-hairline text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-ink/90 font-mono text-xs font-semibold uppercase px-5 py-3 rounded-full transition-all touch-target"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-hairline bg-canvas hover:bg-surface text-ink font-mono text-xs font-semibold uppercase px-4 py-3 rounded-full transition-all touch-target"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
