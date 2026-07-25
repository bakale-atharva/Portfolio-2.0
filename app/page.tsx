export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="p-6 border-b border-neutral-200">
        <h1 className="text-xl font-bold tracking-tight">Editorial Circuit</h1>
      </header>

      <main className="flex-grow p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-mono bg-[var(--accent-lime)] text-[var(--text-primary)] rounded-full">
            Phase 1 Baseline
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight">Portfolio Engine</h2>
          <p className="text-[var(--text-muted)] max-w-md mx-auto">
            Runnable Next.js baseline with Tailwind CSS v4, Vitest unit testing, and Playwright e2e setup.
          </p>
        </div>
      </main>

      <footer className="p-6 border-t border-neutral-200 text-sm text-[var(--text-muted)] text-center">
        &copy; {new Date().getFullYear()} Editorial Circuit. All rights reserved.
      </footer>
    </div>
  );
}
