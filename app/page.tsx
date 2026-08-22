import { portfolioContent } from "@/content/portfolio";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProofRail } from "@/components/portfolio/ProofRail";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export default function Home() {
  const {
    profile,
    hero,
    about,
    metrics,
    projects,
    services,
    skillGroups,
    socialLinks,
  } = portfolioContent;

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
