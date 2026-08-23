import { getPortfolioContent } from "@/lib/portfolio";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProofRail } from "@/components/portfolio/ProofRail";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export default async function Home() {
  const content = await getPortfolioContent();

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-canvas text-ink px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {"// setup"}
        </p>
        <h1 className="text-2xl font-display font-bold">
          Portfolio content not seeded yet
        </h1>
        <p className="text-muted max-w-md">
          Run{" "}
          <code className="font-mono text-sm">
            npx convex run seed:seedPortfolio
          </code>{" "}
          to load the initial content.
        </p>
      </div>
    );
  }

  const {
    profile,
    hero,
    about,
    metrics,
    projects,
    services,
    skillGroups,
    socialLinks,
  } = content;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/*
        The motion layer is mounted here, on the public page, rather than in
        the root layout — /dashboard shares that layout and has no business
        paying for a custom cursor or a scroll hijacker. Both of these render
        nothing (or nothing visible) on touch and under reduced motion, and
        both load their heavy dependency dynamically.
      */}
      <SmoothScroll />
      <CustomCursor />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Header profile={profile} />
      <main id="top" className="grow">
        <Hero profile={profile} hero={hero} />
        <ProofRail metrics={metrics} />
        {/*
          `cv-auto` skips layout/paint for these while off-screen. Not applied
          to <Projects>: it owns position:sticky children and a view timeline,
          and skipping their layout breaks the stacking effect outright.
        */}
        <Projects projects={projects} />
        <Services services={services} />
        <div className="cv-auto">
          <Skills skillGroups={skillGroups} />
        </div>
        <div className="cv-auto">
          <About profile={profile} about={about} />
        </div>
        <div className="cv-auto">
          <Contact profile={profile} socialLinks={socialLinks} />
        </div>
      </main>
      <Footer profile={profile} />
    </div>
  );
}
