# AFAQ Systems Co. — Corporate Website

Production website for AFAQ Systems Co., a Riyadh-based integrated engineering firm.
Built to the brand direction "Apple meets Aramco" — minimal, technical, engineered.

## Stack

- **Next.js 15** (App Router, TypeScript, `src/`)
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/app/globals.css`)
- **GSAP 3.15** + ScrollTrigger, ScrollSmoother, SplitText, Flip
  (all free under GSAP's standard no-charge license)
- **next-intl** — English + Arabic with true RTL
- Self-hosted fonts via `next/font/local` (Space Grotesk, Inter, IBM Plex Sans Arabic)
- pnpm · Node 20+

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000  (use --port to override)
```

`/` redirects to `/en`. Arabic lives at `/ar` and renders `dir="rtl"`.

```bash
pnpm build        # production build (prerenders /en and /ar as SSG)
pnpm start        # serve the production build
pnpm lint         # eslint (flat config)
```

## Project layout

```
src/
  app/[locale]/          Localized routes (layout sets <html lang dir>)
  app/globals.css        Tailwind v4 @theme design tokens
  i18n/                  routing · request · navigation · direction helpers
  fonts/                 Self-hosted woff2 + next/font/local definitions
  lib/gsap/              index (registration) · easings · animations · useGsapContext
  lib/utils.ts           cn()
  components/primitives/ Container · Section · Button · Eyebrow · Heading · StatBlock
  messages/              en.json · ar.json (zero hardcoded strings in components)
  middleware.ts          next-intl locale routing
```

## Internationalization rules

- All copy lives in `src/messages/{en,ar}.json`. No hardcoded strings in components.
- Use logical properties (`ps-*`/`pe-*`, `text-start`/`text-end`) — never `pl-*`/`left-*`.
- Western Arabic digits (17+, 500+, ±2mm) are kept in both locales — engineering data.
- Latin technical terms (GNSS, LiDAR, NTCIP…) stay Latin inside Arabic, wrapped `dir="ltr"`.

## Motion rules

- Register GSAP only via `src/lib/gsap/index.ts`. Import easings from `easings.ts` only.
- Every animation runs inside `useGsapContext` (scoped `gsap.context()`, auto-reverted).
- Horizontal motion multiplies by `getDirectionMultiplier(locale)` (1 LTR / -1 RTL).
- Decorative motion is wrapped in `gsap.matchMedia()`; `prefers-reduced-motion: reduce`
  sets final states directly — no timelines, pins, or counters.

## Build phases

- **Phase 0 — Foundation** ✅ scaffold, i18n, tokens, fonts, GSAP lib, primitives.
- Phase 1 — Shell (header, footer, ScrollSmoother, page transitions).
- Phase 2 — Home (twelve sections).
- Phase 3 — Inner pages.
- Phase 4 — Polish (SEO, a11y, RTL audit, Lighthouse).
