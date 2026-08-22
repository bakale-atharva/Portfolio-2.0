import type { MutationCtx } from "../_generated/server";

/**
 * The one real security boundary in this app. `/dashboard`'s three-state
 * gate is UX — it decides what a signed-in stranger sees, not what they can
 * do. Without this check, anyone signed in to any Clerk account could call
 * a portfolio mutation directly from the browser console.
 *
 * Throws unless the caller's Clerk session email matches `OWNER_EMAIL`.
 */
export async function assertOwner(ctx: MutationCtx): Promise<void> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated.");
  }

  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL is not configured on this deployment.");
  }

  if (identity.email !== ownerEmail) {
    throw new Error("Not authorized.");
  }
}
