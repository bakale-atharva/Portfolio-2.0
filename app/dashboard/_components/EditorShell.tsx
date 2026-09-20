"use client";

import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { AboutSection } from "./sections/AboutSection";
import { HeroSection } from "./sections/HeroSection";
import { MetricsSection } from "./sections/MetricsSection";
import { ProfileSection } from "./sections/ProfileSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SeoSection } from "./sections/SeoSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SkillGroupsSection } from "./sections/SkillGroupsSection";
import { SocialLinksSection } from "./sections/SocialLinksSection";
import { Button } from "./ui";

const TABS = [
  { key: "profile", label: "Profile", Component: ProfileSection },
  { key: "hero", label: "Hero", Component: HeroSection },
  { key: "about", label: "About", Component: AboutSection },
  { key: "metrics", label: "Metrics", Component: MetricsSection },
  { key: "projects", label: "Projects", Component: ProjectsSection },
  { key: "services", label: "Services", Component: ServicesSection },
  { key: "skills", label: "Skills", Component: SkillGroupsSection },
  { key: "social", label: "Social", Component: SocialLinksSection },
  { key: "seo", label: "SEO", Component: SeoSection },
] as const;

export function EditorShell() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("profile");
  const ActiveComponent = TABS.find((t) => t.key === active)?.Component ?? ProfileSection;

  return (
    <div className="min-h-screen bg-canvas text-ink px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-ink border-b-2 border-ink pb-4">
          <span>{"// dashboard"}</span>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 underline-offset-4 hover:bg-accent hover:text-on-accent px-1 touch-target"
            >
              View live site
            </a>
            <SignOutButton>
              <button className="border-2 border-ink px-3 py-1.5 hover:bg-accent hover:text-on-accent transition-colors touch-target">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>

        <h1 className="text-5xl font-black font-display uppercase tracking-[-0.03em] leading-none">
          Editor
        </h1>

        <nav className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant={active === tab.key ? "primary" : "default"}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </nav>

        <ActiveComponent />
      </div>
    </div>
  );
}
