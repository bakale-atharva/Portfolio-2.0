import { SignIn } from "@clerk/nextjs";

export function SignInScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-canvas text-ink px-6 py-16">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink">
          HELLO, ATHARVA BAKALE.
        </p>
        <p className="text-2xl sm:text-3xl font-black font-display uppercase tracking-[-0.02em] text-ink">
          Ready to work on this stuff?
          <span className="inline-block w-3 h-6 ml-2 bg-accent border-2 border-ink animate-pulse align-middle" />
        </p>
      </div>
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            // Style objects rather than utility classes: Clerk's own styles
            // out-rank a class for box-shadow.
            card: { boxShadow: "none", border: "2px solid var(--ink)" },
            headerTitle: "font-display font-black uppercase",
            headerSubtitle: "text-muted",
          },
        }}
      />
    </div>
  );
}
