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
      url: "mailto:contact@atharva.dev",
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
