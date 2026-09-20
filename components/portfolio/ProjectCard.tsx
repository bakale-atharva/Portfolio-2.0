import Image from "next/image";
import { Project } from "@/lib/content";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardNumber = String(index + 1).padStart(2, "0");

  // Layout comes from the project data, not from a hardcoded position, so any
  // number of projects renders correctly. Standard cards alternate which side
  // the image sits on; showcase cards go full width.
  const isShowcase = (project.layout ?? "standard") === "showcase";
  const isReverse = !isShowcase && index % 2 === 1;

  return (
    // Solid bg-surface: this card sits inside the sticky-stacking layout in
    // Projects.tsx, where the next card scrolls up to visually cover this
    // one — translucency would let it bleed through and break the illusion.
    <article className="group relative border-2 border-ink bg-surface overflow-hidden">
      <div
        className={`grid grid-cols-1 ${
          isShowcase ? "grid-cols-1" : "lg:grid-cols-12"
        } items-stretch`}
      >
        {/* Plate: every project image sits on one fixed-height plate so one
            project or ten share the same scale and baseline. */}
        <div
          className={`relative bg-canvas p-6 md:p-8 flex items-center justify-center overflow-hidden border-b-2 lg:border-b-0 border-ink ${
            isShowcase
              ? "h-80 sm:h-96 w-full"
              : `lg:col-span-7 ${
                  isReverse ? "lg:order-2 lg:border-l-2" : "lg:border-r-2"
                }`
          }`}
        >
          {/* `img-wipe` is act 10: a clip-path reveal driven by a view
              timeline as the card enters. Sits on the frame rather than the
              <Image> so the hover scale-up underneath is unaffected. */}
          <div className="img-wipe relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden border-2 border-ink bg-surface">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            {/* Part tag on the plate */}
            <div className="absolute top-0 left-0 z-10 font-mono text-xs font-bold text-on-accent bg-accent px-3 py-1.5 border-b-2 border-r-2 border-ink">
              PROJECT // {cardNumber}
            </div>
          </div>
        </div>

        {/* Details */}
        <div
          className={`p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 ${
            isShowcase ? "w-full" : "lg:col-span-5"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted border-b border-rule pb-3">
              <span className="inline-flex items-center gap-2 font-bold text-ink uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink" />
                {project.role}
              </span>
              <span>{project.year}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black font-display text-ink uppercase tracking-[-0.02em] leading-none">
              {project.title}
            </h3>

            <p className="text-muted text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-rule">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-ink text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-accent hover:text-on-accent border-2 border-ink font-mono text-xs font-bold uppercase px-5 h-12 transition-colors touch-target"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-ink text-ink hover:bg-accent hover:text-on-accent font-mono text-xs font-bold uppercase px-4 h-12 transition-colors touch-target"
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
