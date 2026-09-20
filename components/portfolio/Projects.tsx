import { Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { Container } from "@/components/portfolio/Container";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="work" className="py-20 md:py-28 border-b-2 border-ink bg-canvas">
      <Container>
        <SectionHeader
          label="// 01 SELECTED WORK"
          title="Featured Projects"
          blurb="Selected production applications, design systems, and creative technology builds."
        />

        {/*
          Sticky-stacking (act 3). Each card pins under the sticky header and
          the next one scrolls up to cover it, while the covered card recedes
          — scale + opacity, both composited, both driven by a CSS view
          timeline with no JS.

          The two-element split is load-bearing: `.stack-item` stays in normal
          flow and owns the `view-timeline-name`, because a pinned element's
          own view() progress stalls while it is stuck to the top. The sticky
          child then reads that ancestor timeline. See globals.css.
        */}
        <div>
          {projects.map((project, index) => (
            <div key={project.slug} className="stack-item">
              <div
                className="stack-sticky sticky top-20 md:top-24 pb-8 md:pb-12"
                style={{ zIndex: index + 1 }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
