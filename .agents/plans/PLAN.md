# Editorial Circuit Portfolio — Implementation Plan

## Goal

Build a polished, responsive, one-page Next.js portfolio that supports both hiring and client work. All editable content lives in `content/portfolio.ts`; no component embeds personal or project copy.

## Architecture and constraints

- Use root-level `app/`, `components/`, `content/`, `public/`, `tests/`, and `e2e/` folders. Do not create `src/`.
- Update the TypeScript alias to map `@/*` to `./*`.
- Use Next.js App Router, TypeScript, Tailwind CSS, Motion for React, Lucide React, Vitest, Testing Library, and Playwright.
- Do not add shadcn/ui, a CMS, a database, or a contact-form backend.
- Use warm paper, near-black, neutral gray, and acid lime. Local SVG/gradient project artwork must be replaceable.
- Keep navigation on one page with anchors; project links point externally.
- Respect reduced-motion preferences, semantic landmarks, visible keyboard focus, 44px touch targets, and a 320px+ overflow-free layout.

## Subagent operating model

Each phase is sequential. Dispatch one implementation subagent for the phase, then a separate review subagent. Resolve Critical and Important review findings with a focused fix subagent before the next phase. Do not run code-writing subagents concurrently in the shared checkout.

| Phase | Implementation subagent | Review subagent | Deliverable |
| --- | --- | --- | --- |
| 1 | Foundation agent | Tooling reviewer | Runnable Next.js baseline |
| 2 | Content-system agent | Data/API reviewer | Typed editable portfolio content |
| 3 | UI-composition agent | Accessibility/UI reviewer | Static one-page portfolio |
| 4 | Interaction agent | Responsive-motion reviewer | Motion and device behavior |
| 5 | Discoverability agent | SEO/assets reviewer | Metadata and local assets |
| 6 | Quality agent | Final branch reviewer | Verification evidence |

Use the least expensive capable model for phases 1–5 and the strongest available model for final branch review.

## Phase 1 — Foundation and test baseline

1. Complete `.gitignore`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, and `tests/setup.ts`.
2. Correct root-level TypeScript aliases and include paths.
3. Add minimal `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`.
4. Install dependencies with pnpm and generate `pnpm-lock.yaml`.
5. Write a failing `tests/app-shell.test.tsx`, then implement the minimum semantic app shell to pass it.
6. Verify `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

## Phase 2 — Typed content system

1. Add `content/portfolio.ts` and export `PortfolioContent`, `Profile`, `Metric`, `Project`, `SkillGroup`, `Service`, and `SocialLink`.
2. Provide editable placeholder profile data, metrics, four projects, grouped skills, three services, social/contact links, and SEO metadata.
3. Keep optional repository URLs nullable; require each project’s slug, title, summary, role, year, technologies, image, and live URL.
4. Write data-contract tests for mandatory data and omitted optional repository links.

## Phase 3 — Static editorial composition

1. Create `components/portfolio/` components for header, hero, metrics, projects, project cards, skills, services, about, contact, and footer.
2. Compose them in `app/page.tsx` using `#work`, `#skills`, `#services`, `#about`, and `#contact` targets.
3. Build the sticky header, oversized hero, availability indicator, dual CTAs, alternating projects, grouped skills, service cards, about section, and social/contact footer.
4. Add visual tokens, responsive grids, typography, and focus styles in `app/globals.css`.
5. Test rendered navigation, projects and external links, skills, services, résumé link, and mailto contact link.

## Phase 4 — Interaction, accessibility, and responsive behavior

1. Create focused client components under `components/motion/` for reveal animation and a skills ticker; keep all other components server-rendered.
2. Add smooth anchors, restrained hover states, and reduced-motion fallbacks.
3. Confirm keyboard access and minimum target sizing.
4. Add Playwright tests in `e2e/portfolio.spec.ts` for anchor navigation, focus order, reduced motion, and no horizontal overflow at 375px, 768px, and 1440px.

## Phase 5 — Assets and discoverability

1. Add replaceable SVG project visuals in `public/projects/`.
2. Add `app/icon.svg`, `app/opengraph-image.tsx`, `app/sitemap.ts`, and `app/robots.ts`.
3. Source title, description, canonical URL, and Open Graph metadata from `content/portfolio.ts`.
4. Test sitemap URLs, robots policy, metadata, and local asset references.

## Phase 6 — Final quality gate

1. Run fresh `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`.
2. Run production browser checks at mobile, tablet, and desktop widths.
3. Run Lighthouse and target performance >=90 with accessibility, best practices, and SEO >=95.
4. Perform a whole-branch review, fix all Critical and Important findings, and re-run affected checks.
