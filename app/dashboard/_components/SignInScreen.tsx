import { SignIn } from "@clerk/nextjs";

export function SignInScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-canvas text-ink px-6 py-16">
      <div className="text-center space-y-2 font-mono">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          HELLO, ATHARVA BAKALE.
        </p>
        <p className="text-lg text-ink">
          Ready to work on this stuff?
          <span className="inline-block w-2 h-4 ml-1 bg-accent animate-pulse align-middle" />
        </p>
      </div>
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            card: "shadow-none border border-hairline bg-surface",
            headerTitle: "font-mono",
            headerSubtitle: "font-mono text-muted",
          },
        }}
      />
    </div>
  );
}
