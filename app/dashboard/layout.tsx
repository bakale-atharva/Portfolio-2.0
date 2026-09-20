import type { ReactNode } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";

/**
 * The dashboard follows the site theme (paper by default, night on request).
 * Clerk's appearance reads the same CSS tokens as the rest of the app, so the
 * sign-in card re-themes with the surrounding canvas instead of needing a
 * fixed dark palette.
 */
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </div>
  );
}
