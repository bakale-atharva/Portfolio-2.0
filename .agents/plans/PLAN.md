# One-Page Editorial Portfolio

## Summary

Build a polished, responsive portfolio from the empty repository using Next.js App Router, TypeScript, and Tailwind CSS. The original visual direction—“Editorial Circuit”—will combine warm paper tones, oversized typography, structured black panels, modular imagery, and an acid-lime accent without copying the supplied references.

The page will support both employment and client acquisition through two primary actions: “View projects” and “Work with me.”

## Implementation Changes

- Establish the application with Next.js, TypeScript, Tailwind CSS, pnpm, ESLint, and the App Router.
- Do not install shadcn/ui; this portfolio needs custom editorial components rather than application-style UI primitives.
- Use `next/font`, `next/image`, Lucide icons, and Motion for React. Keep components server-rendered unless animation or interaction requires a client component.
- Create one typed content source at `src/content/portfolio.ts` containing:
  - Profile, availability, biography, résumé and contact links
  - Navigation and social links
  - Projects with image, summary, role, year, technologies, live URL, and repository URL
  - Categorized skills
  - Services with descriptions and deliverables
  - Metrics and SEO metadata
- Components will consume the exported `PortfolioContent` object; replacing copy or images must not require component edits.

## Page Experience

- Sticky compact navigation with anchor links and a prominent contact action.
- Hero section with oversized positioning statement, availability indicator, two CTAs, and a graphic editorial composition that works before personal imagery is supplied.
- Credibility strip for editable metrics or status information.
- Selected-project section using large alternating cards, local optimized images, project metadata, technology tags, and live/source links.
- Skills section organized into meaningful groups rather than an undifferentiated logo cloud.
- Services section with three editable offer cards and a client-focused CTA.
- Concise about section that supports recruiter evaluation and links to a résumé.
- Contact/footer section with email and social links; no backend contact form in the first version.
- Smooth anchor navigation, restrained entrance motion, project-card hover states, and a subtle skills ticker. All motion must stop or simplify under `prefers-reduced-motion`.
- Desktop layouts use asymmetric editorial grids; tablet and mobile collapse into a clear linear reading order without horizontal scrolling.
- Use semantic landmarks, visible keyboard focus, accessible link labels, adequate contrast, and touch targets of at least 44px.

## Quality and Verification

- Add Vitest and Testing Library coverage for content-driven rendering, navigation targets, project links, skills, services, and missing optional links.
- Add Playwright checks at mobile, tablet, and desktop widths for page flow, anchor navigation, keyboard access, responsive layout, and absence of horizontal overflow.
- Run type checking, linting, unit tests, production build, and end-to-end tests before completion.
- Verify reduced-motion behavior and keyboard-only navigation.
- Validate metadata, canonical URL, Open Graph image, favicon, sitemap, and robots configuration.
- Target Lighthouse scores of at least 90 for performance and 95 for accessibility, best practices, and SEO on the production build.

## Assumptions and Defaults

- Content will be edited directly in one TypeScript data file; no CMS or database.
- Projects link externally rather than opening separate case-study pages, preserving the one-page requirement.
- Initial content and media will be polished placeholders that clearly indicate what to replace.
- The default palette is warm off-white, near-black, neutral gray, and acid lime; typography pairs a bold grotesk display face with a restrained editorial serif accent.
- The site defaults to a light editorial theme; dark mode, blog, analytics, contact-form backend, authentication, and admin editing are outside the first version.
- Deployment will be compatible with Vercel and other standard Next.js hosts.
