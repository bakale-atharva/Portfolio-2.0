export interface Profile {
  name: string;
  monogram: string;
  role: string;
  tagline: string;
  bio: string;
  availability: string;
  location: string;
  email: string;
  resumeUrl: string;
}

export interface Metric {
  value: string;
  label: string;
  description: string;
}

/**
 * `standard` renders the split image/detail card, alternating sides by
 * position. `showcase` renders the full-width tall variant. The card reads
 * this instead of hardcoding behaviour for specific indices.
 */
export type ProjectLayout = "standard" | "showcase";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string | null;
  layout?: ProjectLayout;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroPanelStat {
  label: string;
  value: string;
  /** Progress bar fill, 0-100. */
  progress: number;
}

export interface HeroPanelBadge {
  label: string;
  value: string;
  /** Render the value in the accent colour rather than the default ink. */
  emphasis: boolean;
}

export interface HeroContent {
  headlineLead: string;
  headlineAccent: string;
  headlineTrail: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  panel: {
    signal: string;
    roleLabel: string;
    roleStatus: string;
    stats: HeroPanelStat[];
    badges: HeroPanelBadge[];
  };
}

export interface Strength {
  title: string;
  description: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  intro: string;
  cardHeading: string;
  philosophyLabel: string;
  philosophy: string;
  strengthsLabel: string;
  strengths: Strength[];
  statusLabel: string;
  availabilityNote: string;
  resumeCtaLabel: string;
  resumeNote: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  ctaText: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
}

export interface PortfolioContent {
  profile: Profile;
  hero: HeroContent;
  about: AboutContent;
  metrics: Metric[];
  projects: Project[];
  services: Service[];
  skillGroups: SkillGroup[];
  socialLinks: SocialLink[];
  seo: SeoMetadata;
}

export const portfolioContent: PortfolioContent = {
  profile: {
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
  },

  hero: {
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
  },

  about: {
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
  },

  metrics: [
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
  ],

  projects: [
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
      layout: "standard",
    },
  ],

  services: [
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
  ],

  skillGroups: [
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
        "Jest",
        "Playwright",
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
  ],

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/bakale-atharva",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/atharvabakale",
    },
    {
      name: "Twitter/X",
      url: "https://x.com/atharva_dev",
    },
    {
      name: "Email",
      url: "mailto:atharvabakale13@gmail.com",
    },
  ],

  seo: {
    title: "Atharva Bakale — Lead Creative Technologist & Full-Stack Architect",
    description:
      "Portfolio of Atharva Bakale, creative technologist specializing in Next.js, React performance, design systems, and modern web architecture.",
    canonicalUrl: "https://atharva.dev",
    ogImage: "/og-image.png",
  },
};
