"use server";

import { revalidatePath } from "next/cache";

/**
 * Called after every dashboard save. `/` is a Server Component reading
 * through `fetchQuery` (forced dynamic — see lib/portfolio.ts), so a hard
 * reload always shows the latest data regardless. This exists for the
 * client-side navigation case: it busts Next's router cache so a soft nav
 * back to `/` doesn't show a stale snapshot from before the edit.
 */
export async function revalidatePortfolio() {
  revalidatePath("/", "layout");
}
