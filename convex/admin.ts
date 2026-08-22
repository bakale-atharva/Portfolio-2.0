import { v } from "convex/values";
import { query } from "./_generated/server";
import schema from "./schema";
import { assertOwner } from "./lib/owner";

/**
 * Owner-only reads for the dashboard. Separate from portfolio.ts's public
 * surface on purpose: these return raw documents (with `_id` and `order`,
 * needed for edit/reorder/delete) and, for projects, unpublished drafts —
 * neither belongs on a query anonymous visitors can call.
 */

const MAX_SECTION_ITEMS = 200;

export const getProfileDoc = query({
  args: {},
  returns: v.union(schema.doc("profile"), v.null()),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("profile").first();
  },
});

export const getHeroDoc = query({
  args: {},
  returns: v.union(schema.doc("hero"), v.null()),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("hero").first();
  },
});

export const getAboutDoc = query({
  args: {},
  returns: v.union(schema.doc("about"), v.null()),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("about").first();
  },
});

export const getSeoDoc = query({
  args: {},
  returns: v.union(schema.doc("seo"), v.null()),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("seo").first();
  },
});

export const listMetricsAdmin = query({
  args: {},
  returns: v.array(schema.doc("metrics")),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("metrics").withIndex("by_order").take(MAX_SECTION_ITEMS);
  },
});

export const listProjectsAdmin = query({
  args: {},
  returns: v.array(schema.doc("projects")),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("projects").withIndex("by_order").take(MAX_SECTION_ITEMS);
  },
});

export const listServicesAdmin = query({
  args: {},
  returns: v.array(schema.doc("services")),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db.query("services").withIndex("by_order").take(MAX_SECTION_ITEMS);
  },
});

export const listSkillGroupsAdmin = query({
  args: {},
  returns: v.array(schema.doc("skillGroups")),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db
      .query("skillGroups")
      .withIndex("by_order")
      .take(MAX_SECTION_ITEMS);
  },
});

export const listSocialLinksAdmin = query({
  args: {},
  returns: v.array(schema.doc("socialLinks")),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.db
      .query("socialLinks")
      .withIndex("by_order")
      .take(MAX_SECTION_ITEMS);
  },
});
