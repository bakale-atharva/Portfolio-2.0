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

export interface PortfolioContent {
  profile: Profile;
  metrics: Metric[];
  projects: Project[];
  services: Service[];
  skillGroups: SkillGroup[];
  socialLinks: SocialLink[];
}

export const portfolioContent: PortfolioContent = {
  profile: {
    name: "Atharva Bakale",
    monogram: "AB",
    role: "Lead Creative Technologist & Full-Stack Architect",
    tagline: "I build expressive digital experiences & high-performance design systems.",
    bio: "Bridging technical precision and editorial aesthetics. Specializing in Next.js, React performance, design systems, and modern web applications.",
    availability: "Available for Q3/Q4 Projects & Roles",
    location: "Mumbai, IN / Remote Worldwide",
    email: "contact@atharva.dev",
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
      slug: "editorial-circuit",
      title: "Editorial Circuit Studio",
      summary: "High-contrast digital architecture studio template with kinetic typography and micro-interactions.",
      role: "Lead Architect & Designer",
      year: "2026",
      technologies: ["Next.js 16", "Tailwind CSS v4", "Motion", "TypeScript"],
      image: "/projects/project-1.svg",
      liveUrl: "https://editorial-circuit.demo",
      githubUrl: "https://github.com/bakale-atharva/Portfolio-2.0",
    },
    {
      slug: "hypergrid-design-system",
      title: "Hypergrid UI System",
      summary: "Multi-brand design token pipeline and zero-runtime component engine for high-scale applications.",
      role: "Design System Engineer",
      year: "2025",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
      image: "/projects/project-2.svg",
      liveUrl: "https://hypergrid.demo",
      githubUrl: null,
    },
    {
      slug: "pulse-telemetry",
      title: "Pulse Financial Dashboard",
      summary: "Real-time market analytics platform with low-latency WebSockets and interactive canvas visualization.",
      role: "Full-Stack Engineer",
      year: "2025",
      technologies: ["Next.js", "WebSockets", "Canvas API", "Tailwind CSS"],
      image: "/projects/project-3.svg",
      liveUrl: "https://pulsetelemetry.demo",
      githubUrl: "https://github.com/bakale-atharva/pulse-telemetry",
    },
    {
      slug: "vortex-canvas",
      title: "Vortex Shader Visualizer",
      summary: "Interactive 3D shader visualizer powered by WebGL and custom fragment shaders.",
      role: "Creative Technologist",
      year: "2024",
      technologies: ["WebGL", "Three.js", "TypeScript", "GLSL"],
      image: "/projects/project-4.svg",
      liveUrl: "https://vortex-canvas.demo",
      githubUrl: null,
    },
  ],

  services: [
    {
      id: "01",
      title: "Product Interfaces",
      description: "End-to-end frontend architecture built for performance, accessibility, and high conversion.",
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
      description: "Scalable web platforms with modern server architecture, robust API design, and clean data flow.",
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
      description: "Systematized UI component libraries and design tokens bridging Figma and production code.",
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
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS v4", "Motion (Framer)", "HTML5 / Semantic UI"],
    },
    {
      category: "Product",
      skills: ["Design Systems", "UI/UX Architecture", "Wireframing", "Typography", "Micro-interactions"],
    },
    {
      category: "Backend & Edge",
      skills: ["Node.js", "REST / GraphQL", "Edge Functions", "WebSockets", "Jest", "Playwright"],
    },
    {
      category: "Workflow",
      skills: ["Git", "CI/CD Pipelines", "pnpm", "ESLint / Prettier", "Performance Auditing"],
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
};
