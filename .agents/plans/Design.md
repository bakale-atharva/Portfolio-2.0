# Editorial Circuit — Design Specification

## Design intent

Create a single-page portfolio for a creative developer that feels like an independent digital studio: direct, structured, and expressive. The Dribbble reference informs the confidence of an image-led introduction and a clear availability CTA, but this design uses an original visual system, layout, content hierarchy, imagery, and copy.

## Art direction

The visual system is **Editorial Circuit**: editorial typography meets a technical studio dashboard.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F3F0E8` | Default page surface |
| Ink | `#11110F` | Primary type and dark panels |
| Acid lime | `#C7FF3D` | Availability, active states, key CTAs |
| Slate | `#66655F` | Supporting text and annotations |
| Hairline | `rgba(17, 17, 15, 0.18)` | Grid and divider lines |

- Use a bold geometric grotesk for display headings and a compact monospace face for labels, metadata, and technical annotations.
- Favor oversized, tightly tracked type, fine borders, numbered labels, grid lines, outlined symbols, and modular poster-like panels.
- Use acid lime sparingly as a signal, never as a large background field.
- Project artwork is local, replaceable SVG or gradient-based art; no copied photography or assets from the reference.

## Layout

### 1. Sticky header

A compact paper header remains visible during scrolling. It contains a personal monogram, in-page links for Work, Skills, Services, and About, a small availability indicator, and a high-contrast **Let’s work** CTA linking to Contact.

### 2. Hero — Studio signal

The left side uses an oversized, stacked positioning statement such as “I build expressive digital experiences.” The right side contains an original technical composition: intersecting grid panels, a lime signal badge, abstract browser-window fragments, and rotating project index labels. Beneath the statement are availability/location metadata and two actions: **View work** and **Start a project**.

### 3. Proof rail

A thin full-width divider band follows the hero. It presents three editable proof points—projects shipped, core focus, and typical response time—using numeric display type and mono labels.

### 4. Selected work

Four projects appear as alternating editorial cards. Each card contains local artwork, a project number, year, role, short outcome-focused summary, technology chips, and external live/source links. Card proportions alternate between wide landscape, tall portrait, and split layouts while retaining a predictable reading order.

### 5. Services

Three numbered dark panels explain the offers:

1. Product interfaces
2. Full-stack web builds
3. Design systems

Each includes a concise description, expected deliverables, and a contact CTA. The section is a service menu, not a generic features grid.

### 6. Skills matrix

Skills are grouped by discipline—Frontend, Product, Backend, and Workflow—in a dense grid with clear labels. A lightweight ticker can repeat key technologies only when motion is allowed; the static grid remains the primary source of information.

### 7. About / hiring signal

This section gives recruiters and collaborators a quick assessment: role, working style, selected strengths, current availability, and a résumé link. It remains concise so the portfolio stays project-led.

### 8. Contact close

End the page with a large email CTA, social links, and a small footer. An acid-lime availability signal closes the experience and reiterates whether new work is being accepted.

## Interaction and accessibility

- Smooth in-page navigation and subtle section-entry reveals create pacing without becoming a showreel.
- Project cards lift slightly on pointer hover; interactive states use ink/lime contrast rather than color alone.
- `prefers-reduced-motion` disables the ticker and transform-based reveals while retaining full content and navigation.
- All links and controls are keyboard reachable, have visible focus rings, and meet a 44px minimum touch target.
- Semantic `header`, `main`, `section`, `nav`, and `footer` landmarks support screen-reader navigation.

## Responsive behavior

- **Desktop (>= 1024px):** asymmetric editorial grid, split hero, varied project-card spans.
- **Tablet (640px–1023px):** two-column work cards and simplified hero artwork.
- **Mobile (< 640px):** single-column flow, compact header, stacked CTAs, and no horizontal scrolling.

## Content and implementation boundaries

All editable personal data, project metadata, skills, services, links, and image paths live in `content/portfolio.ts`. Components may render the data but must not contain personal or project copy.

Use root-level `app/`, `components/`, `content/`, `public/`, `tests/`, and `e2e/` directories. Do not create a `src/` directory. The design is intentionally limited to a light theme, a single scrollable page, and external project links; it excludes a CMS, blog, dashboard, dark mode, and backend contact form.
