import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { DataModel } from "./_generated/dataModel";

/**
 * One-shot seed carrying the content that used to live in
 * `content/portfolio.ts`.
 *
 * Deliberately an `internalMutation`: it wipes and rewrites every content
 * table, so it must not be reachable from a browser. Run it from the CLI:
 *
 *   npx convex run seed:seedPortfolio
 *
 * It is idempotent — every run clears existing rows first, so re-running
 * resets the database to this baseline rather than duplicating it.
 */

const MAX_ROWS = 1000;

type ContentTable = Extract<
  keyof DataModel,
  | "profile"
  | "hero"
  | "about"
  | "seo"
  | "metrics"
  | "projects"
  | "services"
  | "skillGroups"
  | "socialLinks"
>;

const CONTENT_TABLES: ContentTable[] = [
  "profile",
  "hero",
  "about",
  "seo",
  "metrics",
  "projects",
  "services",
  "skillGroups",
  "socialLinks",
];

async function clearTable(ctx: MutationCtx, table: ContentTable) {
  const rows = await ctx.db.query(table).take(MAX_ROWS);
  await Promise.all(rows.map((row) => ctx.db.delete(row._id)));
}

export const seedPortfolio = internalMutation({
  args: {},
  returns: v.object({
    metrics: v.number(),
    projects: v.number(),
    services: v.number(),
    skillGroups: v.number(),
    socialLinks: v.number(),
  }),
  handler: async (ctx) => {
    for (const table of CONTENT_TABLES) {
      await clearTable(ctx, table);
    }

    await ctx.db.insert("profile", {
      name: "Atharva Bakale",
      monogram: "AB",
      role: "Lead Creative Technologist & Full-Stack Architect",
      tagline:
        "I build expressive digital experiences - from websites to digital products.",
      bio: "Full-stack developer passionate for building AI solutions tackling real world problems and adding value to the individuals and organizations I work with.",
      availability: "Available",
      location: "Pune, In",
      email: "atharvabakale13@gmail.com",
      resumeUrl: "/resume.pdf",
    });

    await ctx.db.insert("hero", {
      headlineLead: "I build",
      headlineAccent: "expressive",
      headlineTrail: "digital experiences.",
      primaryCta: { label: "View work", href: "#work" },
      secondaryCta: { label: "Start a project", href: "#contact" },
      panel: {
        signal: "LIVE STUDIO SIGNAL // v2.0",
        roleLabel: "ROLE",
        roleStatus: "ACTIVE",
        stats: [
          { label: "FRAMEWORK", value: "NEXT.JS 16 + REACT", progress: 80 },
          { label: "DESIGN SYSTEM", value: "EDITORIAL CIRCUIT", progress: 100 },
        ],
        badges: [
          { label: "STATUS", value: "OPEN FOR Q3/Q4", emphasis: true },
          { label: "LATENCY", value: "< 10ms TARGET", emphasis: false },
        ],
      },
    });

    await ctx.db.insert("about", {
      sectionLabel: "// 04 ABOUT & SIGNAL",
      heading: "Engineering Assessment",
      intro:
        "Recruiter & collaborator overview on working philosophy and core technical strengths.",
      cardHeading: "Bridging technical precision and editorial aesthetics.",
      philosophyLabel: "Philosophy:",
      philosophy:
        "Zero unnecessary bloat, type-safe API boundaries, pixel-perfect layout.",
      strengthsLabel: "// CORE ENGINEERING STRENGTHS",
      strengths: [
        {
          title: "Full-Stack Technical Depth",
          description:
            "Architecting end-to-end web applications with Next.js, React, Node.js, and TypeScript.",
        },
        {
          title: "Systematized UI & Design Tokens",
          description:
            "Bridging high-fidelity designs and robust, accessible component engines.",
        },
        {
          title: "Performance & Accessibility First",
          description:
            "Optimized lighthouse metrics, bundle size control, and WCAG 2.1 AA compliance.",
        },
        {
          title: "Editorial Visual Precision",
          description:
            "Crafting expressive typography, smooth micro-interactions, and kinetic animations.",
        },
      ],
      statusLabel: "SIGNAL STATUS",
      availabilityNote:
        "Open for select full-stack contract work, design system consultations, and senior technical leadership roles.",
      resumeCtaLabel: "Download Résumé (PDF)",
      resumeNote: "Updated for 2026 // Includes project references",
    });

    await ctx.db.insert("seo", {
      title:
        "Atharva Bakale — Lead Creative Technologist & Full-Stack Architect",
      description:
        "Portfolio of Atharva Bakale, creative technologist specializing in Next.js, React performance, design systems, and modern web architecture.",
      canonicalUrl: "https://atharva.dev",
      ogImage: "/og-image.png",
    });

    const metrics = [
      {
        value: "24+",
        label: "Projects Shipped",
        description: "Production web apps and systems",
      },
      {
        value: "100%",
        label: "System Focus",
        description: "Design systems & typed APIs",
      },
      {
        value: "< 24h",
        label: "Response Time",
        description: "Direct studio communication",
      },
    ];
    for (const [order, metric] of metrics.entries()) {
      await ctx.db.insert("metrics", { ...metric, order });
    }

    const projects = [
      {
        slug: "ai-storyteller",
        title: "AI Storyteller",
        summary:
          "An AI-powered web application that generates and narrates stories, built with Next.js and GPTScript.",
        role: "Full-Stack Developer",
        year: "2024",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GPTScript"],
        image: "/projects/ai-storyteller.jpg",
        liveUrl: "https://ai-storyteller-silk.vercel.app/",
        githubUrl: "https://github.com/bakale-atharva/ai-storyteller",
        layout: "standard" as const,
      },
    ];
    for (const [order, project] of projects.entries()) {
      await ctx.db.insert("projects", { ...project, order, published: true });
    }

    const services = [
      {
        id: "01",
        title: "Product Interfaces",
        description:
          "End-to-end frontend architecture built for performance, accessibility, and high conversion.",
        deliverables: [
          "React / Next.js Applications",
          "Fluid Motion & Animations",
          "WCAG 2.1 AA Compliance",
          "Performance Optimization",
        ],
        ctaText: "Request Interface Audit",
      },
      {
        id: "02",
        title: "Full-Stack Web Builds",
        description:
          "Scalable web platforms with modern server architecture, robust API design, and clean data flow.",
        deliverables: [
          "Full-Stack App Architecture",
          "API Integration & Edge Logic",
          "Database & State Management",
          "CI/CD & Automated Testing",
        ],
        ctaText: "Discuss Build Scope",
      },
      {
        id: "03",
        title: "Design Systems",
        description:
          "Systematized UI component libraries and design tokens bridging Figma and production code.",
        deliverables: [
          "Design Token Architecture",
          "Accessible Component Libraries",
          "Documentation & Tooling",
          "Token Automation Pipelines",
        ],
        ctaText: "Build Your System",
      },
    ];
    for (const [order, service] of services.entries()) {
      await ctx.db.insert("services", { ...service, order });
    }

    const skillGroups = [
      {
        category: "Frontend",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS v4",
          "Motion (Framer)",
          "HTML5 / Semantic UI",
        ],
      },
      {
        category: "Product",
        skills: [
          "Design Systems",
          "UI/UX Architecture",
          "Wireframing",
          "Typography",
          "Micro-interactions",
        ],
      },
      {
        category: "Backend & Edge",
        skills: [
          "Node.js",
          "REST / GraphQL",
          "Edge Functions",
          "WebSockets",
          "Convex",
          "Clerk",
        ],
      },
      {
        category: "Workflow",
        skills: [
          "Git",
          "CI/CD Pipelines",
          "pnpm",
          "ESLint / Prettier",
          "Performance Auditing",
        ],
      },
    ];
    for (const [order, group] of skillGroups.entries()) {
      await ctx.db.insert("skillGroups", { ...group, order });
    }

    const socialLinks = [
      { name: "GitHub", url: "https://github.com/bakale-atharva" },
      { name: "LinkedIn", url: "https://linkedin.com/in/atharvabakale" },
      { name: "Twitter/X", url: "https://x.com/atharva_dev" },
      { name: "Email", url: "mailto:atharvabakale13@gmail.com" },
    ];
    for (const [order, link] of socialLinks.entries()) {
      await ctx.db.insert("socialLinks", { ...link, order });
    }

    return {
      metrics: metrics.length,
      projects: projects.length,
      services: services.length,
      skillGroups: skillGroups.length,
      socialLinks: socialLinks.length,
    };
  },
});
