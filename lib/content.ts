/**
 * App-facing content types.
 *
 * These are inferred from the Convex validators in `convex/validators.ts`, so
 * the database schema and the component props share one definition. This is a
 * type-only re-export — it compiles away entirely and pulls no Convex runtime
 * code into the client bundle.
 *
 * Components should import content types from here, not from `convex/`.
 */
export type {
  AboutContent,
  CtaLink,
  HeroContent,
  HeroPanelBadge,
  HeroPanelStat,
  Metric,
  PortfolioContent,
  Profile,
  Project,
  ProjectLayout,
  SeoMetadata,
  Service,
  SkillGroup,
  SocialLink,
  Strength,
} from "@/convex/validators";
