import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  aboutFields,
  heroFields,
  metricFields,
  profileFields,
  projectFields,
  seoFields,
  serviceFields,
  skillGroupFields,
  socialLinkFields,
} from "./validators";

/**
 * The content model is normalized rather than one blob document, so list
 * sections can be added to, removed from, and reordered independently by the
 * dashboard without rewriting unrelated content.
 *
 * `profile`, `hero`, `about` and `seo` are singletons — exactly one row each,
 * read with `.first()`.
 *
 * List tables carry an explicit `order` column and are read through the
 * `by_order` index so display order is data, never insertion order.
 *
 * `*StorageId` columns are unused until the Phase 3 dashboard uploads land.
 * When set they take precedence over the sibling URL string, which lets the
 * seeded `public/` paths keep working until a real upload replaces them.
 */
export default defineSchema({
  profile: defineTable({
    ...profileFields,
    resumeStorageId: v.optional(v.id("_storage")),
  }),

  hero: defineTable(heroFields),

  about: defineTable(aboutFields),

  seo: defineTable(seoFields),

  metrics: defineTable({
    ...metricFields,
    order: v.number(),
  }).index("by_order", ["order"]),

  projects: defineTable({
    ...projectFields,
    order: v.number(),
    /** Unpublished projects stay editable in the dashboard but never render. */
    published: v.boolean(),
    imageStorageId: v.optional(v.id("_storage")),
  })
    .index("by_order", ["order"])
    .index("by_published_and_order", ["published", "order"])
    .index("by_slug", ["slug"]),

  services: defineTable({
    ...serviceFields,
    order: v.number(),
  }).index("by_order", ["order"]),

  skillGroups: defineTable({
    ...skillGroupFields,
    order: v.number(),
  }).index("by_order", ["order"]),

  socialLinks: defineTable({
    ...socialLinkFields,
    order: v.number(),
  }).index("by_order", ["order"]),
});
