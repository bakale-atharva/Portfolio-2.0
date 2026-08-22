import { SignOutButton } from "@clerk/nextjs";

/**
 * Placeholder for the owner-only editor. Section-by-section forms, uploads
 * and reordering land in Phase 3 — this shell only proves the gate works.
 */
export function EditorShell() {
  return (
    <div className="min-h-screen bg-canvas text-ink px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted">
          <span>{"// dashboard"}</span>
          <SignOutButton>
            <button className="border border-hairline px-3 py-1.5 rounded-full hover:bg-surface transition-colors touch-target">
              Sign out
            </button>
          </SignOutButton>
        </div>
        <h1 className="text-3xl font-display font-bold">Editor</h1>
        <p className="text-muted">
          Signed in as the owner. Section editors land in Phase 3.
        </p>
      </div>
    </div>
  );
}
