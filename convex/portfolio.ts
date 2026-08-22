import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { assertOwner } from "./lib/owner";
import {
  aboutFields,
  heroFields,
  metricFields,
  portfolioContentValidator,
  profileFields,
  projectFields,
  seoFields,
  serviceFields,
  skillGroupFields,
  socialLinkFields,
  type Metric,
  type Project,
  type Service,
  type SkillGroup,
  type SocialLink,
} from "./validators";

/**
 * Hard cap on any one section. These tables are bounded by editorial intent
 * (a handful of rows each), so this is insurance against a runaway read
 * rather than real pagination.
 */
const MAX_SECTION_ITEMS = 200;

/**
 * Convex return validators reject unknown fields, and stored documents carry
 * `_id`, `_creationTime` and `order` that the public shape does not. These
 * mappers pick the public fields explicitly rather than spreading the doc.
 */
function toMetric(doc: Doc<"metrics">): Metric {
  return {
    value: doc.value,
    label: doc.label,
    description: doc.description,
  };
}

function toService(doc: Doc<"services">): Service {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    deliverables: doc.deliverables,
    ctaText: doc.ctaText,
  };
}

function toSkillGroup(doc: Doc<"skillGroups">): SkillGroup {
  return {
    category: doc.category,
    skills: doc.skills,
  };
}

function toSocialLink(doc: Doc<"socialLinks">): SocialLink {
  return {
    name: doc.name,
    url: doc.url,
  };
}

/**
 * An uploaded file wins over the seeded `public/` path, but a storage id whose
 * file has been deleted falls back rather than rendering a broken image.
 */
async function resolveStorageUrl(
  ctx: QueryCtx,
  storageId: Doc<"projects">["imageStorageId"],
  fallback: string,
): Promise<string> {
  if (!storageId) return fallback;
  return (await ctx.storage.getUrl(storageId)) ?? fallback;
}

async function toProject(
  ctx: QueryCtx,
  doc: Doc<"projects">,
): Promise<Project> {
  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    role: doc.role,
    year: doc.year,
    technologies: doc.technologies,
    image: await resolveStorageUrl(ctx, doc.imageStorageId, doc.image),
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    layout: doc.layout,
  };
}

/**
 * The entire payload for the public page, in one round trip.
 *
 * Returns `null` when the database has not been seeded yet, so the page can
 * render a setup notice instead of throwing during a build.
 */
export const getPublishedContent = query({
  args: {},
  returns: v.union(portfolioContentValidator, v.null()),
  handler: async (ctx) => {
    const [profileDoc, heroDoc, aboutDoc, seoDoc] = await Promise.all([
      ctx.db.query("profile").first(),
      ctx.db.query("hero").first(),
      ctx.db.query("about").first(),
      ctx.db.query("seo").first(),
    ]);

    if (!profileDoc || !heroDoc || !aboutDoc || !seoDoc) {
      return null;
    }

    const [metricDocs, projectDocs, serviceDocs, skillGroupDocs, socialDocs] =
      await Promise.all([
        ctx.db.query("metrics").withIndex("by_order").take(MAX_SECTION_ITEMS),
        ctx.db
          .query("projects")
          .withIndex("by_published_and_order", (q) => q.eq("published", true))
          .take(MAX_SECTION_ITEMS),
        ctx.db.query("services").withIndex("by_order").take(MAX_SECTION_ITEMS),
        ctx.db
          .query("skillGroups")
          .withIndex("by_order")
          .take(MAX_SECTION_ITEMS),
        ctx.db
          .query("socialLinks")
          .withIndex("by_order")
          .take(MAX_SECTION_ITEMS),
      ]);

    return {
      profile: {
        name: profileDoc.name,
        monogram: profileDoc.monogram,
        role: profileDoc.role,
        tagline: profileDoc.tagline,
        bio: profileDoc.bio,
        availability: profileDoc.availability,
        location: profileDoc.location,
        email: profileDoc.email,
        resumeUrl: await resolveStorageUrl(
          ctx,
          profileDoc.resumeStorageId,
          profileDoc.resumeUrl,
        ),
      },
      hero: {
        headlineLead: heroDoc.headlineLead,
        headlineAccent: heroDoc.headlineAccent,
        headlineTrail: heroDoc.headlineTrail,
        primaryCta: heroDoc.primaryCta,
        secondaryCta: heroDoc.secondaryCta,
        panel: heroDoc.panel,
      },
      about: {
        sectionLabel: aboutDoc.sectionLabel,
        heading: aboutDoc.heading,
        intro: aboutDoc.intro,
        cardHeading: aboutDoc.cardHeading,
        philosophyLabel: aboutDoc.philosophyLabel,
        philosophy: aboutDoc.philosophy,
        strengthsLabel: aboutDoc.strengthsLabel,
        strengths: aboutDoc.strengths,
        statusLabel: aboutDoc.statusLabel,
        availabilityNote: aboutDoc.availabilityNote,
        resumeCtaLabel: aboutDoc.resumeCtaLabel,
        resumeNote: aboutDoc.resumeNote,
      },
      metrics: metricDocs.map(toMetric),
      projects: await Promise.all(projectDocs.map((doc) => toProject(ctx, doc))),
      services: serviceDocs.map(toService),
      skillGroups: skillGroupDocs.map(toSkillGroup),
      socialLinks: socialDocs.map(toSocialLink),
      seo: {
        title: seoDoc.title,
        description: seoDoc.description,
        canonicalUrl: seoDoc.canonicalUrl,
        ogImage: seoDoc.ogImage,
      },
    };
  },
});

/**
 * Every mutation below opens with `assertOwner(ctx)`. The `/dashboard` gate
 * (proxy.ts + the server component's three-state branch) is UX, not security
 * — this is the actual boundary: it throws unless the caller's Clerk session
 * email is in the `OWNER_EMAILS` allowlist, so a signed-in stranger who finds these
 * function names in the client bundle still can't call them.
 */

// --- Singletons --------------------------------------------------------------
// `profile`, `hero`, `about` and `seo` have exactly one row. Each upsert patches
// that row if it exists (seeded) or inserts it (first save from an empty db).

export const upsertProfile = mutation({
  args: profileFields,
  returns: v.id("profile"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const existing = await ctx.db.query("profile").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("profile", args);
  },
});

export const setProfileResumeStorageId = mutation({
  args: { storageId: v.union(v.id("_storage"), v.null()) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const existing = await ctx.db.query("profile").first();
    if (!existing) throw new Error("Profile has not been seeded yet.");
    await ctx.db.patch(existing._id, {
      resumeStorageId: args.storageId ?? undefined,
    });
    return null;
  },
});

export const upsertHero = mutation({
  args: heroFields,
  returns: v.id("hero"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const existing = await ctx.db.query("hero").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("hero", args);
  },
});

export const upsertAbout = mutation({
  args: aboutFields,
  returns: v.id("about"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const existing = await ctx.db.query("about").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("about", args);
  },
});

export const upsertSeo = mutation({
  args: seoFields,
  returns: v.id("seo"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const existing = await ctx.db.query("seo").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("seo", args);
  },
});

// --- Ordered list collections -------------------------------------------------
// metrics, services, skillGroups and socialLinks share the same shape of
// lifecycle: create appends to the end, update patches by id, remove deletes,
// reorder rewrites the `order` column from a caller-supplied id sequence.

type OrderedTable = "metrics" | "projects" | "services" | "skillGroups" | "socialLinks";

async function nextOrder(ctx: MutationCtx, table: OrderedTable): Promise<number> {
  const [last] = await ctx.db.query(table).withIndex("by_order").order("desc").take(1);
  return last ? last.order + 1 : 0;
}

export const createMetric = mutation({
  args: metricFields,
  returns: v.id("metrics"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const order = await nextOrder(ctx, "metrics");
    return await ctx.db.insert("metrics", { ...args, order });
  },
});

export const updateMetric = mutation({
  args: { id: v.id("metrics"), ...metricFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return null;
  },
});

export const removeMetric = mutation({
  args: { id: v.id("metrics") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderMetrics = mutation({
  args: { orderedIds: v.array(v.id("metrics")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await Promise.all(
      args.orderedIds.map((id, order) => ctx.db.patch(id, { order })),
    );
    return null;
  },
});

export const createProject = mutation({
  args: projectFields,
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const order = await nextOrder(ctx, "projects");
    // New projects start unpublished so they can be staged before going live.
    return await ctx.db.insert("projects", { ...args, order, published: false });
  },
});

export const updateProject = mutation({
  args: { id: v.id("projects"), ...projectFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return null;
  },
});

export const setProjectPublished = mutation({
  args: { id: v.id("projects"), published: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.patch(args.id, { published: args.published });
    return null;
  },
});

export const setProjectImageStorageId = mutation({
  args: { id: v.id("projects"), storageId: v.union(v.id("_storage"), v.null()) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.patch(args.id, { imageStorageId: args.storageId ?? undefined });
    return null;
  },
});

export const removeProject = mutation({
  args: { id: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderProjects = mutation({
  args: { orderedIds: v.array(v.id("projects")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await Promise.all(
      args.orderedIds.map((id, order) => ctx.db.patch(id, { order })),
    );
    return null;
  },
});

export const createService = mutation({
  args: serviceFields,
  returns: v.id("services"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const order = await nextOrder(ctx, "services");
    return await ctx.db.insert("services", { ...args, order });
  },
});

export const updateService = mutation({
  args: { docId: v.id("services"), ...serviceFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const { docId, ...fields } = args;
    await ctx.db.patch(docId, fields);
    return null;
  },
});

export const removeService = mutation({
  args: { docId: v.id("services") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.delete(args.docId);
    return null;
  },
});

export const reorderServices = mutation({
  args: { orderedIds: v.array(v.id("services")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await Promise.all(
      args.orderedIds.map((id, order) => ctx.db.patch(id, { order })),
    );
    return null;
  },
});

export const createSkillGroup = mutation({
  args: skillGroupFields,
  returns: v.id("skillGroups"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const order = await nextOrder(ctx, "skillGroups");
    return await ctx.db.insert("skillGroups", { ...args, order });
  },
});

export const updateSkillGroup = mutation({
  args: { id: v.id("skillGroups"), ...skillGroupFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return null;
  },
});

export const removeSkillGroup = mutation({
  args: { id: v.id("skillGroups") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderSkillGroups = mutation({
  args: { orderedIds: v.array(v.id("skillGroups")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await Promise.all(
      args.orderedIds.map((id, order) => ctx.db.patch(id, { order })),
    );
    return null;
  },
});

export const createSocialLink = mutation({
  args: socialLinkFields,
  returns: v.id("socialLinks"),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const order = await nextOrder(ctx, "socialLinks");
    return await ctx.db.insert("socialLinks", { ...args, order });
  },
});

export const updateSocialLink = mutation({
  args: { id: v.id("socialLinks"), ...socialLinkFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return null;
  },
});

export const removeSocialLink = mutation({
  args: { id: v.id("socialLinks") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const reorderSocialLinks = mutation({
  args: { orderedIds: v.array(v.id("socialLinks")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    await assertOwner(ctx);
    await Promise.all(
      args.orderedIds.map((id, order) => ctx.db.patch(id, { order })),
    );
    return null;
  },
});
