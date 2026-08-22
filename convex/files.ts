import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { assertOwner } from "./lib/owner";

/**
 * Step 1 of the three-step upload flow: mint a short-lived URL the browser
 * POSTs the file to directly. Step 2 (the POST) happens client-side. Step 3
 * is the caller passing the returned `Id<"_storage">` to a mutation like
 * `setProjectImageStorageId` — this function only ever hands out the URL.
 */
export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await assertOwner(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
