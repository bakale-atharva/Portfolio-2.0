/**
 * Single source of truth for the portfolio content shape.
 *
 * These validators define both the database tables (see `schema.ts`) and the
 * public shape returned by `portfolio.getPublishedContent`. The app-facing
 * TypeScript types are inferred from them and re-exported by `lib/content.ts`,
 * so the schema and the component props can never drift apart.
 *
 * This module deliberately imports only from `convex/values` — no
 * `convex/server` — so it is safe to reference from anywhere in the app.
 */
import { type Infer, v } from "convex/values";

/**
 * `standard` renders the split image/detail card, alternating sides by
 * position. `showcase` renders the full-width tall variant.
 */
export const projectLayoutValidator = v.union(
  v.literal("standard"),
  v.literal("showcase"),
);

// --- Field groups -----------------------------------------------------------
// Declared as plain objects so a table definition can spread extra columns
// (order, published, storage ids) onto the public shape.

export const profileFields = {
  name: v.string(),
  monogram: v.string(),
  role: v.string(),
  tagline: v.string(),
  bio: v.string(),
  availability: v.string(),
  location: v.string(),
  email: v.string(),
  resumeUrl: v.string(),
};

export const ctaLinkValidator = v.object({
  label: v.string(),
  href: v.string(),
});

export const heroFields = {
  headlineLead: v.string(),
  headlineAccent: v.string(),
  headlineTrail: v.string(),
  primaryCta: ctaLinkValidator,
  secondaryCta: ctaLinkValidator,
  panel: v.object({
    signal: v.string(),
    roleLabel: v.string(),
    roleStatus: v.string(),
    stats: v.array(
      v.object({
        label: v.string(),
        value: v.string(),
        /** Progress bar fill, 0-100. */
        progress: v.number(),
      }),
    ),
    badges: v.array(
      v.object({
        label: v.string(),
        value: v.string(),
        /** Render the value in the accent colour rather than the default ink. */
        emphasis: v.boolean(),
      }),
    ),
  }),
};

export const aboutFields = {
  sectionLabel: v.string(),
  heading: v.string(),
  intro: v.string(),
  cardHeading: v.string(),
  philosophyLabel: v.string(),
  philosophy: v.string(),
  strengthsLabel: v.string(),
  strengths: v.array(
    v.object({
      title: v.string(),
      description: v.string(),
    }),
  ),
  statusLabel: v.string(),
  availabilityNote: v.string(),
  resumeCtaLabel: v.string(),
  resumeNote: v.string(),
};

export const seoFields = {
  title: v.string(),
  description: v.string(),
  canonicalUrl: v.string(),
  ogImage: v.string(),
};

export const metricFields = {
  value: v.string(),
  label: v.string(),
  description: v.string(),
};

export const projectFields = {
  slug: v.string(),
  title: v.string(),
  summary: v.string(),
  role: v.string(),
  year: v.string(),
  technologies: v.array(v.string()),
  /**
   * Public URL for the artwork. Either a path under `public/` or, once the
   * dashboard uploads land in Phase 3, a resolved Convex storage URL.
   */
  image: v.string(),
  liveUrl: v.string(),
  githubUrl: v.union(v.string(), v.null()),
  layout: projectLayoutValidator,
};

export const serviceFields = {
  id: v.string(),
  title: v.string(),
  description: v.string(),
  deliverables: v.array(v.string()),
  ctaText: v.string(),
};

export const skillGroupFields = {
  category: v.string(),
  skills: v.array(v.string()),
};

export const socialLinkFields = {
  name: v.string(),
  url: v.string(),
};

// --- Public object validators ----------------------------------------------

export const profileValidator = v.object(profileFields);
export const heroValidator = v.object(heroFields);
export const aboutValidator = v.object(aboutFields);
export const seoValidator = v.object(seoFields);
export const metricValidator = v.object(metricFields);
export const projectValidator = v.object(projectFields);
export const serviceValidator = v.object(serviceFields);
export const skillGroupValidator = v.object(skillGroupFields);
export const socialLinkValidator = v.object(socialLinkFields);

/** The complete payload rendered by the public page. */
export const portfolioContentValidator = v.object({
  profile: profileValidator,
  hero: heroValidator,
  about: aboutValidator,
  metrics: v.array(metricValidator),
  projects: v.array(projectValidator),
  services: v.array(serviceValidator),
  skillGroups: v.array(skillGroupValidator),
  socialLinks: v.array(socialLinkValidator),
  seo: seoValidator,
});

// --- Inferred types ---------------------------------------------------------

export type Profile = Infer<typeof profileValidator>;
export type CtaLink = Infer<typeof ctaLinkValidator>;
export type HeroContent = Infer<typeof heroValidator>;
export type HeroPanelStat = HeroContent["panel"]["stats"][number];
export type HeroPanelBadge = HeroContent["panel"]["badges"][number];
export type AboutContent = Infer<typeof aboutValidator>;
export type Strength = AboutContent["strengths"][number];
export type Metric = Infer<typeof metricValidator>;
export type Project = Infer<typeof projectValidator>;
export type ProjectLayout = Infer<typeof projectLayoutValidator>;
export type Service = Infer<typeof serviceValidator>;
export type SkillGroup = Infer<typeof skillGroupValidator>;
export type SocialLink = Infer<typeof socialLinkValidator>;
export type SeoMetadata = Infer<typeof seoValidator>;
export type PortfolioContent = Infer<typeof portfolioContentValidator>;
