import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export function EasterEgg() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-canvas text-ink px-6 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-on-accent bg-accent border-2 border-ink px-3 py-1">
        {"// access denied"}
      </p>
      <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-[-0.03em] leading-[0.95] max-w-2xl">
        Hmm. Looks like you found something interesting.
      </h1>
      <p className="text-muted text-lg max-w-md">
        There&apos;s nothing for you here. Probably.
      </p>
      <div className="flex items-center gap-4 pt-4 font-mono text-xs font-bold uppercase tracking-wider">
        <Link
          href="/"
          className="inline-flex items-center px-4 h-11 bg-ink text-canvas border-2 border-ink hover:bg-accent hover:text-on-accent transition-colors touch-target"
        >
          Back to the surface
        </Link>
        <SignOutButton>
          <button className="border-2 border-ink px-4 h-11 hover:bg-accent hover:text-on-accent transition-colors touch-target">
            Sign out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
