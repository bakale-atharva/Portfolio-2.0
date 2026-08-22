import { cache } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { PortfolioContent, SeoMetadata } from "@/lib/content";

/**
 * Server-side access to the portfolio content.
 *
 * Wrapped in React's `cache()` so the page, `generateMetadata`, the sitemap and
 * the OG image share a single Convex round trip per request instead of four.
 *
 * `fetchQuery` sets `cache: "no-store"` internally, which makes Next.js treat
 * every route that calls it as fully dynamic (server-rendered per request) —
 * there is no supported way to combine it with `revalidate`/ISR. Freshness
 * instead comes from Convex's own query caching plus `revalidatePath()` after
 * dashboard saves (Phase 3).
 *
 * A failed fetch resolves to `null` rather than throwing, so a Convex outage
 * or an unseeded database renders a setup notice instead of a 500.
 */

const FALLBACK_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://atharva.dev";

/** Used only before the database is seeded, or if Convex is unreachable. */
export const FALLBACK_SEO: SeoMetadata = {
  title: "Portfolio",
  description: "Personal portfolio.",
  canonicalUrl: FALLBACK_SITE_URL,
  ogImage: "/og-image.png",
};

export const getPortfolioContent = cache(
  async (): Promise<PortfolioContent | null> => {
    try {
      return await fetchQuery(api.portfolio.getPublishedContent, {});
    } catch (error) {
      console.error(
        "[portfolio] Could not read content from Convex. " +
          "Is NEXT_PUBLIC_CONVEX_URL set and the deployment running?",
        error,
      );
      return null;
    }
  },
);

export const getSeo = cache(async (): Promise<SeoMetadata> => {
  const content = await getPortfolioContent();
  return content?.seo ?? FALLBACK_SEO;
});
