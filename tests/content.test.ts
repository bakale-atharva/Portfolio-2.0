import {
  portfolioContent,
  type PortfolioContent,
  type Profile,
  type Metric,
  type Project,
  type SkillGroup,
  type Service,
  type SocialLink,
  type SeoMetadata,
} from "../content/portfolio";

describe("Portfolio Content Data Contract", () => {
  it("should export all required interfaces and valid root portfolio object", () => {
    const content: PortfolioContent = portfolioContent;
    const profile: Profile = content.profile;
    const metrics: Metric[] = content.metrics;
    const projects: Project[] = content.projects;
    const services: Service[] = content.services;
    const skillGroups: SkillGroup[] = content.skillGroups;
    const socialLinks: SocialLink[] = content.socialLinks;
    const seo: SeoMetadata = content.seo;

    expect(profile).toBeDefined();
    expect(metrics).toBeDefined();
    expect(projects).toBeDefined();
    expect(services).toBeDefined();
    expect(skillGroups).toBeDefined();
    expect(socialLinks).toBeDefined();
    expect(seo).toBeDefined();
  });

  it("should contain complete and valid profile information", () => {
    const { profile } = portfolioContent;
    expect(profile).toBeDefined();
    expect(profile.name).toBe("Atharva Bakale");
    expect(profile.monogram).toBe("AB");
    expect(profile.role).toBe("Lead Creative Technologist & Full-Stack Architect");
    expect(profile.tagline).toBe(portfolioContent.profile.tagline);
    expect(profile.bio).toBe(portfolioContent.profile.bio);
    expect(profile.availability).toBe(portfolioContent.profile.availability);
    expect(profile.location).toBe(portfolioContent.profile.location);
    expect(profile.email).toBe(portfolioContent.profile.email);
    expect(profile.resumeUrl).toBe("/resume.pdf");
  });

  it("should contain exactly 3 metrics with valid structure", () => {
    const { metrics } = portfolioContent;
    expect(metrics).toHaveLength(3);
    metrics.forEach((metric) => {
      expect(metric.value).toBeTruthy();
      expect(metric.label).toBeTruthy();
      expect(metric.description).toBeTruthy();
    });
  });

  it("should contain 4 projects matching mandatory fields and nullable githubUrl schema", () => {
    const { projects } = portfolioContent;
    expect(projects).toHaveLength(4);

    projects.forEach((project) => {
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.role).toBeTruthy();
      expect(project.year).toBeTruthy();
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.image).toMatch(/^\/projects\/project-\d\.svg$/);
      expect(project.liveUrl).toMatch(/^https:\/\//);

      // Verify nullable githubUrl schema
      if (project.githubUrl !== null) {
        expect(typeof project.githubUrl).toBe("string");
        expect(project.githubUrl).toMatch(/^https:\/\//);
      } else {
        expect(project.githubUrl).toBeNull();
      }
    });

    // Specifically test nullable githubUrl cases
    expect(projects[0].githubUrl).not.toBeNull();
    expect(projects[1].githubUrl).toBeNull();
    expect(projects[2].githubUrl).not.toBeNull();
    expect(projects[3].githubUrl).toBeNull();
  });

  it("should contain exactly 3 services with deliverables and CTA text", () => {
    const { services } = portfolioContent;
    expect(services).toHaveLength(3);

    services.forEach((service) => {
      expect(service.id).toMatch(/^\d{2}$/);
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(Array.isArray(service.deliverables)).toBe(true);
      expect(service.deliverables.length).toBeGreaterThan(0);
      expect(service.ctaText).toBeTruthy();
    });
  });

  it("should contain 4 skill groups covering major disciplines", () => {
    const { skillGroups } = portfolioContent;
    expect(skillGroups).toHaveLength(4);

    const categories = skillGroups.map((g) => g.category);
    expect(categories).toEqual(["Frontend", "Product", "Backend & Edge", "Workflow"]);

    skillGroups.forEach((group) => {
      expect(group.category).toBeTruthy();
      expect(Array.isArray(group.skills)).toBe(true);
      expect(group.skills.length).toBeGreaterThan(0);
    });
  });

  it("should contain social links including GitHub, LinkedIn, Twitter/X, and Email", () => {
    const { socialLinks } = portfolioContent;
    expect(socialLinks.length).toBeGreaterThanOrEqual(4);

    const linkNames = socialLinks.map((s) => s.name);
    expect(linkNames).toContain("GitHub");
    expect(linkNames).toContain("LinkedIn");
    expect(linkNames).toContain("Twitter/X");
    expect(linkNames).toContain("Email");

    socialLinks.forEach((link) => {
      expect(link.name).toBeTruthy();
      expect(link.url).toBeTruthy();
    });
  });

  it("should contain complete and valid SEO metadata", () => {
    const { seo } = portfolioContent;
    expect(seo).toBeDefined();
    expect(seo.title).toBe("Atharva Bakale — Lead Creative Technologist & Full-Stack Architect");
    expect(seo.description).toBe(
      "Portfolio of Atharva Bakale, creative technologist specializing in Next.js, React performance, design systems, and modern web architecture."
    );
    expect(seo.canonicalUrl).toBe("https://atharva.dev");
    expect(seo.ogImage).toBe("/og-image.png");
  });
});
