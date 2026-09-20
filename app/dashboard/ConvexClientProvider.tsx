"use client";

import type { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Client boundary scoped to `/dashboard` only — the public page never loads
 * Clerk or the Convex React client, so `/` ships zero auth JS.
 *
 * Clerk's appearance reads the site's CSS tokens rather than copies of them,
 * so the sign-in card follows the paper/night theme and any future palette
 * change with no second list of colors to keep in sync.
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          // Ink, not yellow: Clerk also uses the primary colour for links, and
          // the accent is a fill in this system, never text.
          colorPrimary: "var(--ink)",
          colorPrimaryForeground: "var(--canvas)",
          colorBackground: "var(--surface)",
          colorForeground: "var(--ink)",
          colorMutedForeground: "var(--muted)",
          colorMuted: "var(--canvas)",
          colorInput: "var(--canvas)",
          colorInputForeground: "var(--ink)",
          colorBorder: "var(--hairline)",
          colorRing: "var(--ink)",
          colorDanger: "var(--danger)",
          borderRadius: "0",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
