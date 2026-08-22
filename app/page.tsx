import { getPortfolioContent } from "@/lib/portfolio";
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
      <Header profile={profile} />
      <main id="top" className="grow">
        <Hero profile={profile} hero={hero} />
        <ProofRail metrics={metrics} />
        <Projects projects={projects} />
        <Services services={services} />
        <Skills skillGroups={skillGroups} />
        <About profile={profile} about={about} />
        <Contact profile={profile} socialLinks={socialLinks} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
