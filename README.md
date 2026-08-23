# Portfolio 2.0

A personal portfolio site built with Next.js and a Convex backend, with Clerk-gated dashboard editing so content can be updated without touching code.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19** + **TypeScript**
- **[Convex](https://convex.dev)** — reactive backend/database for portfolio content
- **[Clerk](https://clerk.com)** — authentication for the editing dashboard
- **[Tailwind CSS 4](https://tailwindcss.com)**
- **[Motion](https://motion.dev)** — animation
- **pnpm** workspaces

## Project structure

```
app/                  Next.js App Router pages, layout, SEO (sitemap, robots, OG image)
components/portfolio/ Section components (Hero, About, Services, Skills, Projects, Contact, Footer, Header, ThemeToggle...)
components/motion/    Animation primitives (Reveal, SkillsTicker)
content/portfolio.ts  Typed content contracts (Profile, Project, HeroContent, etc.)
convex/               Convex schema, validators, and backend functions
proxy.ts              Clerk middleware
```

Content types are defined once in [`content/portfolio.ts`](content/portfolio.ts) and shared by Convex validators and the UI components, so the backend schema and component props can't drift apart.

## Getting started

### Prerequisites

- Node.js and [pnpm](https://pnpm.io)
- A [Convex](https://dashboard.convex.dev) account (free tier is fine)
- A [Clerk](https://dashboard.clerk.com) application

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

- `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL` are populated automatically the first time you run `npx convex dev` against a deployment.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` come from your Clerk application's API Keys page.

### 3. Configure Clerk auth for the dashboard

`/dashboard` is gated by an email allowlist. Convex functions do not read `.env.local`, so the
allowlist has to be set in both places:

```bash
# .env.local — for the /dashboard server-side gate
OWNER_EMAILS=you@example.com,you+alt@example.com

# the Convex deployment — for assertOwner() in convex/lib/owner.ts
npx convex env set OWNER_EMAILS "you@example.com,you+alt@example.com"
npx convex env set CLERK_FRONTEND_API_URL https://<your-fapi-url>
```

Two steps in the **Clerk Dashboard** have no CLI equivalent. Skipping either breaks the dashboard
with a Convex error rather than an obvious misconfiguration message:

1. **Configure → Integrations → Convex**: activate it. This maps the `aud: "convex"` claim that
   `convex/auth.config.ts` matches on. Without it the browser sends no token at all and every
   dashboard query fails with `Not authenticated.`
2. **Sessions → Customize session token**: add the email claim.

   ```json
   { "email": "{{user.primary_email_address}}" }
   ```

   `assertOwner` checks `identity.email` against `OWNER_EMAILS`. This claim is *not* mapped by
   default, and without it `identity.email` is `undefined`, so even an allowlisted account is
   rejected with `Not authorized.`

Repeat both on the production Clerk instance before deploying.

### 4. Run the app

Convex and Next.js run as separate processes during development:

```bash
pnpm backend    # npx convex dev — syncs convex/ functions and schema
pnpm frontend   # next dev — starts the Next.js dev server
```

Run both in separate terminals, then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm frontend`  | Start the Next.js dev server         |
| `pnpm backend`   | Start Convex in dev/watch mode       |
| `pnpm build`     | Production build                     |
| `pnpm start`     | Start the production server          |
| `pnpm lint`      | Run ESLint                           |
| `pnpm typecheck` | Run TypeScript in no-emit check mode |

## Working with Convex

This project uses Convex as its backend. Before editing anything under `convex/`, read `convex/_generated/ai/guidelines.md` for the project's Convex conventions. Convex agent skills for common tasks can be installed with:

```bash
npx convex ai-files install
```
