"use client";

import type { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Client boundary scoped to `/dashboard` only — the public page never loads
 * Clerk or the Convex React client, so `/` ships zero auth JS.
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#C7FF3D",
          colorPrimaryForeground: "#11110F",
          colorBackground: "#0B0B0A",
          colorForeground: "#F3F0E8",
          colorMutedForeground: "#8A887F",
          colorMuted: "#141412",
          colorInput: "#141412",
          colorInputForeground: "#F3F0E8",
          colorBorder: "rgba(243, 240, 232, 0.14)",
          colorRing: "#C7FF3D",
          borderRadius: "0.5rem",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
