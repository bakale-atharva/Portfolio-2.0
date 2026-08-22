import type { ReactNode } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";

/**
 * The dashboard is dark-only regardless of the visitor's site theme — the
 * Clerk widget is themed to one fixed palette, so letting the surrounding
 * canvas follow light mode would strand a dark card on a paper background.
 * Re-declaring `data-theme` here re-points the tokens for this subtree.
 */
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div data-theme="dark" className="min-h-screen bg-canvas text-ink">
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </div>
  );
}
