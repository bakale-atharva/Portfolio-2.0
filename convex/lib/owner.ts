import type { MutationCtx } from "../_generated/server";

/**
 * Owner allowlist, as a comma-separated `OWNER_EMAILS` env var. Set it on the
 * Convex deployment (`npx convex env set`) for `assertOwner`, and in
 * `.env.local` / Vercel for the `/dashboard` gate — Convex functions do not
 * read the Next.js env files.
 */
export function parseOwnerEmails(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

/** Case-insensitive membership test against the allowlist. */
export function isOwnerEmail(
  email: string | undefined | null,
  raw: string | undefined,
): boolean {
  if (!email) return false;
  const owners = parseOwnerEmails(raw);
  if (owners.length === 0) return false;
  return owners.includes(email.trim().toLowerCase());
}

/**
 * The one real security boundary in this app. `/dashboard`'s three-state
 * gate is UX — it decides what a signed-in stranger sees, not what they can
 * do. Without this check, anyone signed in to any Clerk account could call
 * a portfolio mutation directly from the browser console.
 *
 * Throws unless the caller's Clerk session email is in `OWNER_EMAILS`.
 */
export async function assertOwner(ctx: MutationCtx): Promise<void> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated.");
  }

  const raw = process.env.OWNER_EMAILS;
  if (!raw) {
    throw new Error("OWNER_EMAILS is not configured on this deployment.");
  }

  // Reject an identity Clerk has explicitly marked unverified, so a stranger
  // who signs up claiming an owner address can't write before confirming it.
  // A missing claim is tolerated rather than treated as a failure: Clerk does
  // not always include `email_verified`, and failing closed there would lock
  // the owner out of their own dashboard.
  if (identity.emailVerified === false) {
    throw new Error("Email address is not verified.");
  }

  if (!isOwnerEmail(identity.email, raw)) {
    throw new Error("Not authorized.");
  }
}
