import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export function EasterEgg() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-canvas text-ink px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {"// access denied"}
      </p>
      <h1 className="text-2xl sm:text-3xl font-display font-bold max-w-lg">
        Hmm. Looks like you found something interesting.
      </h1>
      <p className="text-muted max-w-md">
        There&apos;s nothing for you here. Probably.
      </p>
      <div className="flex items-center gap-4 pt-4 font-mono text-xs uppercase tracking-wider">
        <Link
          href="/"
          className="text-accent underline underline-offset-4 touch-target"
        >
          Back to the surface
        </Link>
        <SignOutButton>
          <button className="border border-hairline px-4 py-2 rounded-full hover:bg-surface transition-colors touch-target">
            Sign out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
