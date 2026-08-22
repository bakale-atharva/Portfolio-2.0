import { auth, currentUser } from "@clerk/nextjs/server";
import { isOwnerEmail } from "@/convex/lib/owner";
import { SignInScreen } from "./_components/SignInScreen";
import { EasterEgg } from "./_components/EasterEgg";
import { EditorShell } from "./_components/EditorShell";

/**
 * Three states, one route, all server-decided — every case returns HTTP 200
 * so the easter egg reads as intentional, not a broken permissions check.
 *
 * This branch is UX only. The real security boundary is `assertOwner(ctx)`
 * on every Convex mutation (convex/lib/owner.ts) — deliberately not
 * `auth.protect()` here, which would redirect signed-out visitors and 404
 * unauthorized ones, destroying both the custom sign-in screen and the
 * easter egg below.
 */
export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <SignInScreen />;
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // Same allowlist helper the Convex mutations use, so the screen you see and
  // the writes you're actually permitted can never disagree.
  if (!isOwnerEmail(email, process.env.OWNER_EMAILS)) {
    return <EasterEgg />;
  }

  return <EditorShell />;
}
