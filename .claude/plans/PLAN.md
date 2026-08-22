# Portfolio 2.0 — Convex + Clerk replatform and redesign

## Context

The repo today is a static, single-page Next.js 16 portfolio ("Editorial Circuit"). All content is hardcoded in [content/portfolio.ts](content/portfolio.ts), there is no backend, no auth, and no deploy config. Editing the site means editing TypeScript and pushing.

The goal is a production portfolio you can actually run:

1. **Content moves to Convex.** The public page reads it; you edit it through a private, Clerk-gated `/dashboard`.
2. **The look gets rebuilt** with a real design system and a serious — but cheap — motion layer.
3. **All test infrastructure is deleted.** Playwright, Jest, testing-library, the whole `tests/` and `e2e/` tree.

Scope for now is the **single scrolling page plus the dashboard**. No case-study pages, no blog, no contact form — you said you want the backbone first, then you'll fix your projects and add them one at a time. The dashboard is what makes that possible without touching code.

Git: this lands as `feat:` commits on the current branch. Existing phase history is not preserved or reconciled.

### Problems found during exploration that this plan fixes

| Issue | Location |
|---|---|
| **Tailwind v4 tokens are named wrong.** `--color-bg-paper` generates `bg-bg-paper`, not `bg-paper`. Every color in the app is actually resolved by 10 hand-written CSS classes, so *every opacity modifier is dead CSS* — `bg-ink/90`, `hover:border-lime/50`, `text-lime/90`, `bg-lime/10` all emit nothing. | [app/globals.css:4-12](app/globals.css) vs `:44-75` |
| 20 of 22 deps are pinned to the literal string `"latest"` — any reinstall floats the entire stack | [package.json](package.json) |
| Jest suite is **currently red** — `content.test.ts` still asserts 4 projects, there is 1 | tests/content.test.ts:59,68,82-85 |
| Google Fonts `@import` is render-blocking; `next/font` unused | [app/globals.css:1](app/globals.css) |
| `public/resume.pdf` and `public/og-image.png` are referenced but **do not exist** | content/portfolio.ts:77,224 |
| Project card layout is index-hardcoded for exactly 4 projects | [components/portfolio/ProjectCard.tsx:19](components/portfolio/ProjectCard.tsx) |
| Copy embedded in components, violating the project's own rule | Hero.tsx:109-148, About.tsx:11-28 |
| `socialLinks` email is `contact@atharva.dev`, profile email is `atharvabakale13@gmail.com` | content/portfolio.ts:215 |
| Ticker hover-pause silently does nothing (`animationPlayState` is not a motion value) | components/motion/SkillsTicker.tsx:52 |

---

## Design direction: **Nocturne Editorial**

You said "surprise me." Here it is — an inversion rather than a replacement, so your identity survives.

**The current paper/ink/lime palette becomes the *light* theme. The default becomes dark**: a warm near-black gallery canvas where `#F3F0E8` flips from background to text and acid lime goes from a timid accent to something that genuinely glows. Same editorial rigor — numbered sections, mono labels, hairline grids — but with cinematic depth and pacing. Sections read as *acts*, not a scroll of blocks.

### Tokens

```
                 dark (default)              light
canvas           #0B0B0A  warm near-black    #F3F0E8  paper
surface          #141412                     #FAF8F2
ink   (text)     #F3F0E8                     #11110F
muted            #8A887F                     #66655F
accent           #C7FF3D  acid lime          #C7FF3D
hairline         rgba(243,240,232,0.14)      rgba(17,17,15,0.18)
```

### Type

- **Archivo Variable** (display + body) — has a `wdth` axis, which lets headline type physically stretch on scroll. Loud, geometric, more character than Space Grotesk.
- **JetBrains Mono** — labels, metadata, section numbers. Kept.
- **Instrument Serif Italic** — exactly one accent word in the hero. ~15KB, high payoff.

All via `next/font/google`, self-hosted and subset. The render-blocking `@import` goes.

### Motion — the acts

Every effect below is **transform/opacity only**, GPU-composited, and gated on `prefers-reduced-motion`.

| # | Effect | Technique | Cost |
|---|---|---|---|
| 1 | Hero line-mask reveal on load | CSS `clip-path` + stagger, **no JS** | free |
| 2 | Headline width-morph on scroll (`wdth` 100→75) | CSS `animation-timeline: scroll()` | off main thread |
| 3 | Sticky-stacking project cards | `position: sticky` + scroll-driven scale/opacity | ~free |
| 4 | Line-by-line text reveal per section | `animation-timeline: view()`, Motion `whileInView` fallback | off main thread where supported |
| 5 | Film-grain overlay | one fixed 128px noise tile, 3% opacity, `pointer-events:none` | ~1KB |
| 6 | Smooth scroll + scroll-progress hairline | Lenis (~3KB), **desktop pointer only** | 1 rAF |
| 7 | Custom cursor that swells on interactives | `pointer: fine` only, transform-only | 1 rAF |
| 8 | Magnetic CTAs | transform on pointer-move, `will-change` scoped | negligible |
| 9 | Marquee ticker | pure CSS `animation` (replaces the broken Motion one) | off main thread |
| 10 | Project image clip-path wipe on enter | view-timeline | off main thread |

**Rejected on purpose:** GSAP (weight + license), three.js/WebGL (mobile battery), any blur/box-shadow/filter animation on large surfaces, fake preloader screens.

**Progressive enhancement:** CSS scroll-driven animations ship where supported (`@supports (animation-timeline: view())` — Chrome, Edge, Safari 26+); Firefox falls back to Motion's `whileInView`. Reduced-motion gets the full static layout with no transforms.

**Budget:** JS < 120KB gzip on `/`, LCP < 1.8s, CLS < 0.02, INP < 200ms, Lighthouse ≥ 95 across the board. Mobile is the primary target, not an afterthought — Lenis and the custom cursor never initialize on touch devices.

---

## The `/dashboard` gate

Three states, one route, all server-decided. HTTP 200 in every case — the easter egg is intentional, not an error.

**Signed out** → bespoke sign-in screen on dark canvas. Mono type, blinking lime cursor:
> `HELLO, ATHARVA BAKALE.`
> `Ready to work on this stuff?`

with Clerk's `<SignIn />` styled through `appearance` variables mapped to our tokens — so it doesn't look like a bolted-on widget.

**Signed in, but not you** → the easter egg. Glitching mono text:
> `Hmm. Looks like you found something interesting.`
> `There's nothing for you here. Probably.`

A lime link back to `/`, and a sign-out button.

**Signed in as you** → the editor.

### Security — three layers, and the third is the real one

1. `proxy.ts` runs **bare `clerkMiddleware()`** plus a `config.matcher` export. It establishes the auth context and nothing more — no route matching, no protection. (Two naming traps here: **Next.js 16 renames `middleware.ts` → `proxy.ts`**, and **`createRouteMatcher` is deprecated** — Clerk now wants protection on the resource, not in middleware.)
2. The `/dashboard` server component calls `await auth()`, compares your Clerk primary email against the `OWNER_EMAILS` allowlist, and picks one of the three screens. This *is* the resource-based model Clerk migrated to. Note we deliberately do **not** use `auth.protect()` here — it redirects signed-out users and 404s unauthorized ones, which would destroy both the custom sign-in screen and the easter egg. We branch on `auth()` manually instead.
3. **Every Convex mutation calls `assertOwner(ctx)`**, which checks `ctx.auth.getUserIdentity()` against Convex's own `OWNER_EMAILS` env var (a comma-separated allowlist, so more than one account can own the dashboard).

Layers 1–2 are UX. Layer 3 is security: without it, any signed-in stranger could call your mutations directly from the browser console. Non-negotiable.

---

## Architecture

```
app/
  layout.tsx                    fonts, theme script, grain overlay
  page.tsx                      RSC — fetchQuery(published content), ISR
  dashboard/
    layout.tsx                  "use client" — ClerkProvider + ConvexProviderWithClerk
    page.tsx                    RSC — three-state gate
    _components/                editor forms, reorder, uploads
  actions.ts                    revalidatePortfolio() server action
proxy.ts                        bare clerkMiddleware() + config.matcher
                                (NOT middleware.ts — Next 16)
convex/
  schema.ts                     profile, metrics, projects, services,
                                skillGroups, socialLinks, seo, siteSettings
  auth.config.ts                CLERK_FRONTEND_API_URL, applicationID "convex"
  portfolio.ts                  queries (public) + mutations (owner-gated)
  files.ts                      generateUploadUrl, resolve storage URLs
  lib/owner.ts                  assertOwner(ctx)
  seed.ts                       initial data lifted from content/portfolio.ts
components/
  site/                         renamed from portfolio/
  motion/
  dashboard/
lib/convex-server.ts            getAuthToken + typed fetchQuery helpers
```

**Data flow.** `/` is a Server Component using `fetchQuery` from `convex/nextjs` with `revalidate = 300`. Saving in the dashboard fires a server action calling `revalidatePath('/', 'layout')`, so edits appear immediately. The dashboard itself uses `useQuery`/`useMutation` for live reactive editing.

This keeps the public page effectively static — no Convex client JS, no websocket, no realtime cost on the hot path — while the editor gets the full reactive experience. It also means **if Convex goes down, the last good HTML still serves**.

**Images** upload to Convex file storage via `generateUploadUrl` → POST → store `Id<"_storage">`; queries resolve to URLs with `ctx.storage.getUrl`. Requires `images.remotePatterns` for `*.convex.cloud` in [next.config.ts](next.config.ts).

**Content model** is normalized (not one blob) so projects can be added, removed, and reordered independently. Projects carry `order` and `published` so you can stage one before it goes live. No broader draft/publish workflow — that's over-engineering for a portfolio.

Types come from `convex/_generated/dataModel`; the hand-written interfaces in `content/portfolio.ts` are deleted, and its data payload moves to `convex/seed.ts`.

---

## Phases

Each phase is one `feat:` commit and leaves the app in a working, runnable state.

### Phase 0 — Purge and repair the foundation

No visual change. Everything below depends on this being correct.

- **Delete all testing**: `tests/`, `e2e/`, `jest.config.ts`, `playwright.config.ts`, `playwright-report/`, `test-results/`, `.swc/`; drop `@playwright/test`, `jest`, `jest-environment-jsdom`, `jsdom`, `@testing-library/*`, `@types/jest`; remove `test`/`test:watch`/`test:e2e` scripts; `tsconfig.json` `types` → `["node"]`; clean the ESLint ignores.
- **Pin every dependency** to its resolved lockfile version — `"latest"` × 20 is a production hazard.
- **Fix the Tailwind v4 token system** in [app/globals.css](app/globals.css): correct names (`--color-canvas`, `--color-ink`, `--color-accent`, …) using the `@theme inline { --color-x: var(--x) }` idiom so `:root` / `[data-theme="dark"]` can swap values at runtime *and* opacity modifiers work. Delete the 10 hand-written shim classes.
- **Wire dark/light**: token sets on `:root` and `[data-theme="dark"]`, honoring `prefers-color-scheme`, with an inline no-flash script in `layout.tsx`.
- **`next/font/google`** for Archivo + JetBrains Mono; remove the `@import`.
- Move Hero and About hardcoded copy into content; make `ProjectCard` layout data-driven instead of index-hardcoded; fix the ticker; delete orphaned `public/projects/project-*.svg`; reconcile the social/profile email mismatch.

**Verify:** `pnpm typecheck && pnpm lint && pnpm build`, then `pnpm dev` — page renders identically, `bg-ink/90` now actually emits CSS, theme toggle works with no flash on reload.

### Phase 1 — Convex backend

- `pnpm add convex`, `npx convex dev` (creates the deployment, writes `CONVEX_DEPLOYMENT` + `NEXT_PUBLIC_CONVEX_URL` to `.env.local`).
- `convex/schema.ts` for all eight collections; `convex/portfolio.ts` with a public `getPublishedContent` query and per-collection mutations (unguarded for now); `convex/seed.ts` + a one-shot seed mutation carrying today's data.
- Rewrite [app/page.tsx](app/page.tsx) as an async RSC using `fetchQuery`, `export const revalidate = 300`. Delete `content/portfolio.ts`.
- Update `layout.tsx` metadata, `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` to read from Convex.

**Verify:** run seed, confirm the page renders from the database; edit a value in the Convex dashboard and confirm it appears after revalidation.

### Phase 2 — Clerk and the gate

- `pnpm add @clerk/nextjs`; `clerk init --framework next -y` writes dev keys to `.env.local` with no account needed.
- In the Clerk Dashboard, **activate the Convex integration** and copy the revealed **Frontend API URL** (dev: `https://verb-noun-00.clerk.accounts.dev`, prod: `https://clerk.<your-domain>.com`). *No JWT template* — the integration uses Clerk's default session token now.
- `convex/auth.config.ts`:
  ```ts
  import type { AuthConfig } from 'convex/server'
  export default {
    providers: [{ domain: process.env.CLERK_FRONTEND_API_URL!, applicationID: 'convex' }],
  } satisfies AuthConfig
  ```
  Set it on the **Convex** side, not in `.env.local` — Convex functions don't read local env files:
  ```
  npx convex env set CLERK_FRONTEND_API_URL https://<your-fapi-url>
  ```
- `proxy.ts` — bare `clerkMiddleware()` and a `config.matcher` export. **No `createRouteMatcher`, no `auth.protect()`**; matcher skips Next internals and static files, always runs for `/(api|trpc)(.*)` and `/__clerk/(.*)`.
- `app/dashboard/layout.tsx` — `ClerkProvider` **inside `<body>`** wrapping `ConvexProviderWithClerk` (client boundary is scoped to `/dashboard` only, so `/` ships zero auth JS).
- Build the three gate screens, branching on `await auth()` in the page. Add `OWNER_EMAILS` (comma-separated) to `.env.local` **and** to Convex (`npx convex env set OWNER_EMAILS …`).
- Add `assertOwner(ctx)` and apply it to **every** mutation.

**Verify:** signed out → sign-in screen; signed in as a throwaway account → easter egg; signed in as you → editor shell. Then, signed in as the throwaway, call a mutation from the console and confirm it throws.

### Phase 3 — Dashboard editor

- Section-by-section forms: profile, metrics, projects, services, skill groups, social links, SEO, availability toggle.
- Add/delete/reorder for list collections (drag or up/down — keyboard-accessible either way).
- Image upload for project artwork and résumé PDF upload into Convex storage, fixing the broken `/resume.pdf` and `/og-image.png` references.
- Optimistic saves via `useMutation`, then `revalidatePortfolio()`.
- Utilitarian UI on the same tokens — dense, fast, not precious. This is a tool.

**Verify:** add a second project through the UI with an uploaded image; confirm it appears on `/` immediately; reorder it; unpublish it and confirm it disappears from the public page but stays in the editor.

### Phase 4 — The redesign

Rebuild the site components on the Nocturne Editorial system: new type scale, dark-first surfaces, reworked hero, sticky-stacking work section, restructured services/skills/about/contact. Mobile-first at every step.

**Verify:** walk 375 / 768 / 1440 in the browser; no horizontal overflow; light and dark both correct.

### Phase 5 — Motion layer

Implement acts 1–10 above. Lenis and cursor behind pointer/motion capability checks. `content-visibility: auto` on below-fold sections.

**Verify:** DevTools Performance recording — confirm scroll stays at 60fps and scroll-driven animations show as composited; toggle OS reduced-motion and confirm full content with zero transforms; test on a real phone.

### Phase 6 — Production

**This is the first phase that needs a real domain.** Buy it at the start of this
phase, not before — everything up to here runs on the Convex/Vercel preview URLs.

- **Domain cutover**, in this order:
  1. Buy the domain and point DNS at Vercel.
  2. Edit the `seo.canonicalUrl` row through the dashboard — no code change and
     no redeploy; `metadata`, `sitemap.ts`, `robots.ts` and the OG image all read
     from it. **This is the one that actually matters.**
  3. Set `NEXT_PUBLIC_SITE_URL` to the real origin in Vercel too. It only feeds
     `FALLBACK_SEO`, so it just stops an unseeded/degraded render from emitting
     a canonical URL pointing at a domain you don't own.
  4. Add the domain to the **production Clerk instance**, whose Frontend API URL
     becomes `https://clerk.<your-domain>.com` — then update
     `CLERK_FRONTEND_API_URL` on the production Convex deployment to match, or
     auth breaks.
- `npx convex deploy` to production; production Clerk instance; all env vars into Vercel.
- Perf pass against the budget; Lighthouse on the deployed URL.
- Accessibility sweep: keyboard path through the whole page and the dashboard, focus rings, 44px targets, landmarks, contrast in both themes.
- Confirm the real canonical URL, OG image, `robots.ts` and `sitemap.ts` all resolve against the live domain.
- `README.md` documenting env vars and the `convex dev` + `next dev` two-process workflow.
- Rewrite `.agents/plans/Design.md` — it currently forbids a CMS, a dashboard, and dark mode, all of which we're building.

**Verify:** deployed site scores ≥ 95 on all four Lighthouse categories; sign in on the production dashboard, make an edit, confirm it goes live.

---

## Documentation sourcing

Every phase pulls current docs through **Context7** before writing code — no API surface from memory. Resolved library IDs:

| Library | Context7 ID |
|---|---|
| Convex | `/llmstxt/convex_dev_llms-full_txt` |
| Clerk | `/clerk/clerk-docs` (broadest: `/websites/clerk`) |
| Next.js | `/vercel/next.js` |

Already verified against live docs during planning:

- **`middleware.ts` → `proxy.ts` is real in Next.js 16**, with renamed types (`NextMiddleware` → `NextProxy`, `MiddlewareConfig` → `ProxyConfig`) and config keys (`skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`). There's a codemod: `npx @next/codemod@canary middleware-to-proxy .` — though we're writing the file fresh, so it's just confirmation of the convention.
- `revalidatePath('/', 'layout')` is the correct call from a Server Action to purge the client cache and invalidate everything beneath the root layout.
- Convex file storage is the three-step `generateUploadUrl` → `POST` → store `Id<"_storage">` flow, resolved for display with `ctx.storage.getUrl`.
- `ConvexProviderWithClerk` must be wrapped by a configured `ClerkProvider` and passed Clerk's `useAuth` hook, and must live in a Client Component — hence the `/dashboard`-scoped client boundary.
- `ClerkProvider` goes **inside `<body>`** in current Clerk SDKs (it could wrap `<html>` only in Core 2).

### Deprecations to avoid (verified — these are the traps)

| Don't use | Use instead | Why |
|---|---|---|
| `CLERK_JWT_ISSUER_DOMAIN` | `CLERK_FRONTEND_API_URL` | Renamed. Clerk's own `convex-configure-auth` partial now uses the Frontend API URL. Convex's docs still show the old name — they're behind. |
| A `convex` JWT template | Clerk Dashboard → **activate Convex integration** | `getToken()` with no `template` returns the default session token, which the Convex integration now uses. The template step is obsolete. |
| `createRouteMatcher(...)` in middleware | `await auth()` / `auth.protect()` **in the resource** | Deprecated; logs a one-time dev warning and is removed in the next major of `@clerk/nextjs`. See Clerk's `migrate-from-create-route-matcher` guide. |
| `middleware.ts` | `proxy.ts` | Next.js 16 convention rename. |

Everything else about `clerkMiddleware()` — including the `config.matcher` export — stays exactly as it was.

## Things you'll need to do yourself

- In the **Clerk Dashboard**, activate the **Convex integration** and copy the **Frontend API URL** (~30 seconds; the CLI can't do this one). This replaces the old "create a JWT template named `convex`" step, which no longer exists.
- **Buy the production domain — but not until Phase 6.** Nothing in Phases 1–5 depends on owning it: the canonical URL is just a string in the `seo` row, swappable from the dashboard once Phase 3 lands, with no code change or redeploy. Until then the seeded placeholder stands. (Note `NEXT_PUBLIC_SITE_URL` does *not* override it — that only feeds `FALLBACK_SEO` in `lib/portfolio.ts`, used when the database is unseeded or Convex is unreachable.) See Phase 6 for the cutover steps.
- Supply the **résumé PDF** (uploadable through the dashboard once Phase 3 lands).

## Assumptions

- Deploying to Vercel; Convex hosts the backend and file storage.
- `OWNER_EMAILS` is `atharvabakale13@gmail.com,bakaleatharva13@gmail.com`.
- pnpm stays the package manager; no `src/` directory (existing convention).
- Contact stays `mailto:` + copy-to-clipboard for now. A Convex-backed form is a clean follow-on once the backbone exists.