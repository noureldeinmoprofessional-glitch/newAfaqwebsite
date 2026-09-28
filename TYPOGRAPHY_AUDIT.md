# Typography Audit — AFAQ Systems Website

**Date:** 2026-09-28
**Scope:** Full codebase (`src/`), audit + proposal only — no code changed.
**Stack:** Next.js 15 (App Router) · Tailwind CSS v4 (CSS-first `@theme`) · next-intl (EN/AR, RTL) · self-hosted fonts.

---

## 1. Executive summary (for the client)

**The short version: your instinct is half right.**

The site *does* have a proper type system defined in one place — there is a
named scale (display, h1, h2, h3, body, eyebrow, stat, etc.) with sizes,
line-heights and letter-spacing all declared as design tokens. So the
foundation is not random.

**The problem is that the system isn't being followed consistently.** Roughly
a third of the text on the site ignores the official scale and hard-codes its
own sizes, and — more importantly — the *same kind of element is given
different sizes on different pages with no rule behind it.* That is what makes
the hierarchy "feel random":

- A **section heading** is rendered at **three different sizes** across the
  site (and even on a *single* page — the About page). One section title is
  32–52px, the next is 40–72px, another is 48–104px, all marked up
  identically as `<h2>`.
- A **card title** (`<h3>`) is rendered at **five different sizes** ranging
  from 17px to 72px. In two places a card title is actually *bigger* than the
  section heading above it — the hierarchy is upside-down.
- **Big statistic numbers** ("500+", "±2mm") are built **five different ways**
  with five different sizes.
- Small uppercase labels/tags use **four near-identical sizes** (10, 11, 12,
  13px) that the eye can't tell apart but that add clutter to the code.

In total the site renders **~19 distinct text sizes from ~24 different
size definitions**. A healthy site needs **6–9**. The sizes also don't follow
a consistent mathematical ratio, and on mobile one "large" body style is
actually *smaller* than normal body text (a genuine bug).

**Why it matters:** inconsistent hierarchy makes pages feel unpolished and
makes it harder for visitors to scan content and know what's important. It
also slows down every future design change, because there's no single lever
to pull.

**The fix:** adopt one modular type scale (proposed below: a 1.333 "Perfect
Fourth" scale on a 16px base — which, conveniently, already matches the large
end of what the site does today), collapse the ~24 definitions down to **10
named tokens**, and route every component through them. Estimated effort:
**~130–160 line changes across ~35 files**, no visual redesign required — this
is disciplining what's already there, not starting over.

---

## 2. Setup — where typography lives

| Concern | Location | Notes |
|---|---|---|
| Type scale / tokens | `src/app/globals.css` (`@theme` block, lines 43–72) | Tailwind v4 CSS-first config. Defines `--text-eyebrow/body/body-lg/h3/h2/h1/display/stat` with paired line-height/tracking/weight. **This is the source of truth — and it's a good one.** |
| Base element styles | `src/app/globals.css` `@layer base` (92–150) | `body` = `--text-body` / 1.65; `h1–h6` = `--font-display` / 600; RTL overrides for Arabic. |
| Fonts loaded | `src/fonts/index.ts` | **Poppins** (Latin, 400/500/600/700) + **IBM Plex Sans Arabic** (400/600). Self-hosted, no CDN. |
| Font tokens | `globals.css` 38–41 | `--font-display`, `--font-body` **both = Poppins** (identical); `--font-arabic` = IBM Plex Arabic. |
| Heading component | `src/components/primitives/Heading.tsx` | Maps `size` prop → `text-display/h1/h2/h3`. Decouples semantic tag from visual size. |
| Eyebrow / label | `src/components/primitives/Eyebrow.tsx` | Wraps `text-eyebrow`. |
| Stat number | `src/components/primitives/StatBlock.tsx`, `src/components/motion/CountUpStat.tsx` | Wrap `text-stat` / `text-display`. |
| Everything else | ~50 section/component `.tsx` files | Mixed: many consume tokens, many hard-code sizes. |

**Fonts actually in use:** Poppins (all Latin text — headings *and* body) and
IBM Plex Sans Arabic (all Arabic text). There is **no typographic contrast
between heading font and body font** — `--font-display` and `--font-body` are
literally the same family.

**Dead assets / stale docs (finding):**
- `src/fonts/space-grotesk-latin-wght.woff2` and `src/fonts/inter-latin-wght.woff2`
  exist in the repo but are **never loaded** by `fonts/index.ts`.
- Component doc-comments in `Heading.tsx`, `Eyebrow.tsx`, `StatBlock.tsx` and
  `globals.css` (lines 168–176) still describe the type as **"Space Grotesk"**.
  The code ships Poppins. **The comments lie about the font** — a maintenance
  trap.

---

## 3. Inventory — every text-size source

Values normalized to px at a 16px root. Clamp values shown as
`mobile-min → desktop-max`. "Uses" counts `text-*` class occurrences in
`src/**/*.tsx` + `.css`.

### 3a. Official tokens (`globals.css @theme`)

| Token / class | Raw value | px @16 | line-height | weight | tracking | Uses | Role |
|---|---|---|---|---|---|---|---|
| `text-display` | `clamp(3rem,7vw,6.5rem)` | 48 → 104 | 0.95 | 600¹ | −0.03em | 11 | Hero titles (`<h1>`); some section `<h2>` |
| `text-stat` | `clamp(3rem,6vw,5.5rem)` | 48 → 88 | 1.0 | 700¹ | −0.03em | 6 | Big metric numbers |
| `text-h1` | `clamp(2.5rem,5.5vw,4.5rem)` | 40 → 72 | 1.02 | 600¹ | −0.02em | 10 | **Mixed** — some `<h1>`, some section `<h2>`, some card `<h3>` |
| `text-h2` | `clamp(2rem,4vw,3.25rem)` | 32 → 52 | 1.1 | 600¹ | −0.02em | 15 | Section headings (`<h2>`) |
| `text-h3` | `clamp(1.35rem,2vw,1.75rem)` | 21.6 → 28 | 1.25 | 600¹ | — | 24 | Card/subsection titles (`<h3>`) |
| `text-body-lg` | `clamp(1.05rem,1.4vw,1.25rem)` | 16.8 → 20 | 1.6 | 400 | — | 43 | Lead paragraphs, subtitles |
| `text-body` | `1.0625rem` | 17 | 1.65 | 400 | — | 55 | Default body text |
| `text-eyebrow` | `0.8125rem` | 13 | 1.4 | 600 | 0.14em | 61 | Uppercase section labels |

¹ Weight comes from the base layer / component classes (`font-semibold`, `font-bold`), not the token.

### 3b. Tailwind default sizes used (bypass tokens)

| Class | px @16 | Uses | Files / roles |
|---|---|---|---|
| `text-sm` | 14 | 9 | IntegratedAdvantage, ProjectsShowcase, OurStory, LogoMarks, ServicesProcess, Hero (×2), SiteHeader — meta text, small body, nav |
| `text-base` | 16 | 4 | VideoHero (CTA), Hero (CTA), LogoMarks, Button `lg` |
| `text-xl` | 20 | 1 | TrustedBy (logo wordmark, mobile) |
| `text-2xl` | 24 | 1 | TrustedBy (logo wordmark, `md:`) |

### 3c. Arbitrary fixed values `text-[…]` (bypass tokens)

| Value | px @16 | Uses | Role | Duplicate of |
|---|---|---|---|---|
| `text-[0.625rem]` | 10 | 1 | CaseStudyCard badge | — (smallest on site) |
| `text-[0.6875rem]` | 11 | 9 | Overlines/labels: MediaFrame, InnerHero (scroll), CaseStudyCard, ProjectsExplorer, ProjectsHero, AboutHero, ContactInfo, SiteFooter, Hero | near-dup of eyebrow(13)/12 |
| `text-[0.75rem]` | 12 | 5 | Pills/tags: ProjectsExplorer (×2), ServiceDetail (×2), ContactForm | near-dup of 11/13 |
| `text-[0.8125rem]` | 13 | 9 | Labels/meta: CaseStudyDetail (×2), ProjectsExplorer (×2), ServiceDisciplines, CaseStudyGrid, ContactForm, SiteFooter (×2) | **exact dup of `text-eyebrow`** |
| `text-[0.875rem]` | 14 | 6 | Small body/meta: CaseStudyGrid, ProjectsExplorer, ServiceDetail (×2), BlogList, Button `sm` | **exact dup of `text-sm`** |
| `text-[0.9375rem]` | 15 | 5 | Nav links + labels: SiteHeader (×2), ServiceDetail (×2), Button `md` | orphan size (nothing else is 15) |
| `text-[1.75rem]` | 28 | 1 | SiteHeader mobile-menu item | **exact dup of `text-h3` max** |

### 3d. Arbitrary clamp values `text-[clamp(…)]` (bypass tokens)

| Value | px @16 | Uses | Role |
|---|---|---|---|
| `text-[clamp(1.25rem,2vw,1.6rem)]` | 20 → 25.6 | 1 | CaseStudyDetail overview / lead paragraph |
| `text-[clamp(1.5rem,3vw,2.25rem)]` | 24 → 36 | 1 | ServiceDetail case-study metric number |
| `text-[clamp(1.9rem,3.5vw,2.75rem)]` | 30.4 → 44 | 1 | ServiceDetail stat number |
| `text-[clamp(2.25rem,4vw,3.25rem)]` | 36 → 52 | 1 | CaseStudies (home) stat number |
| `text-[clamp(2.5rem,5vw,3.75rem)]` | 40 → 60 | 1 | CaseStudyMetrics stat number |

**Totals:** 8 tokens + 4 Tailwind defaults + 7 arbitrary fixed + 5 arbitrary
clamp = **24 distinct font-size definitions**, resolving to **~19 distinct
rendered sizes** (10, 11, 12, 13, 14, 15, 16, 17, 20, 24, 25.6, 28, 36, 44,
52, 60, 72, 88, 104 px at their desktop/resting values).

---

## 4. Diagnosis

### 4.1 How many sizes — verdict: far too many
**~19 rendered sizes / 24 definitions vs. a healthy 6–9.** The system was
designed with 8 tokens (good) but real-world usage more than doubled that with
16 off-scale one-offs.

### 4.2 Near-duplicate sizes that should collapse to one
- **13px:** `text-eyebrow` **and** `text-[0.8125rem]` (×9) — identical value,
  one tokenized, one not.
- **14px:** `text-sm` (×9) **and** `text-[0.875rem]` (×6) — identical, two spellings.
- **28px:** `text-h3` (max) **and** `text-[1.75rem]` (SiteHeader) — identical.
- **20px:** `text-body-lg` (max), `text-xl` (TrustedBy), and `clamp(1.25rem,…)` min — three routes to ~20px.
- **Small-label cluster 10 / 11 / 12 / 13px:** four sizes doing the *one* job
  of "small uppercase label/tag/overline." The eye cannot distinguish these;
  they are noise.
- **52px:** `text-h2` (max) collides with the `clamp(2.25rem,4vw,3.25rem)` stat max — a heading size and a stat size land on the same number by coincidence, not design.

### 4.3 Same role, different size across pages (the core complaint — confirmed)

**Section headings** — every section title is marked up `<Heading as="h2">`,
but the visual `size` prop is chosen inconsistently:

| `size` prop → token | px @16 | Where |
|---|---|---|
| `size="h2"` → `text-h2` | 32 → 52 | Services, Industries, Numbers, Blog, About, CaseStudies, ProjectsShowcase, AboutNumbers, EngineeringExcellence, TrustPillars, Innovation, ServicesProcess, ServiceDisciplines, ServiceDetail, ServiceFaqs, RelatedArticles (16×) |
| `size="h1"` → `text-h1` | 40 → 72 | InnerCta, IntegratedAdvantage, ProjectsCta, Technologies, Partners, OurStory, Vision2030, Philosophy, OurValues (9×) |
| `size="display"` → `text-display` | 48 → 104 | AboutCta, CtaBanner (2×) |

**Proof on a single page — About** (`src/app/[locale]/about/page.tsx`):
`OurStory`, `OurValues`, `Vision2030`, `Partners`, `Technologies` render their
`<h2>` at **h1 size (40–72px)** while `EngineeringExcellence`, `TrustPillars`,
`Innovation`, `AboutNumbers` render *their* `<h2>` at **h2 size (32–52px)**,
and `AboutCta` at **display size (48–104px)** — same semantic level, same page,
three sizes, no rule. This is exactly the "32px on one page, 40px on another"
symptom the client described.

**Page titles (`<h1>`)** are also inconsistent between pages:

| Style | px @16 | Pages |
|---|---|---|
| `text-display` | 48 → 104 | Home (Hero/VideoHero-desktop), About, Projects, Case Studies, + all `InnerHero` pages (Contact, Blog list, …) |
| `text-h1` | 40 → 72 | ServiceHero, ArticleView (blog post), VideoHero (mobile) |

So the hero on a service page or blog post is a full tier smaller than the hero
on every other page.

### 4.4 Inversions (hierarchy upside-down) — confirmed
- **`src/components/sections/Services.tsx:50`** — card title `<h3>` uses
  `text-h1` (40–72px), while the section's own heading (`Services.tsx:29`,
  `<Heading as="h2" size="h2">`) is `text-h2` (32–52px). **Card title is bigger
  than the section title.**
- **`src/components/sections/IntegratedAdvantage.tsx:139`** — card `<h3>` uses
  `text-h1`; the section heading (line 70) is *also* `text-h1`. **No visual
  hierarchy between section and card — they're equal.**
- **`src/components/sections/blog-page/BlogList.tsx:71`** — a list item's
  featured-card title is `<h2>` at `text-h1` (72px), rivalling the page hero
  (`text-display`, 104px) and dwarfing every real section `<h2>` elsewhere.

### 4.5 Semantic HTML issues
- **Two parallel heading systems.** 27 files use the `<Heading>` primitive;
  many others hand-roll raw `<h1>/<h2>/<h3>` with bespoke class strings
  (Hero, VideoHero, all `*Hero` files, all card titles, ServiceDetail's five
  `<h3>`s, etc.). No single place governs headings.
- **Skipped heading level.** Contact page
  (`src/app/[locale]/contact/page.tsx`): `InnerHero` renders `<h1>`, then
  `ContactForm.tsx:50/68` and `ContactInfo.tsx:22` jump straight to `<h3>` —
  **`<h2>` is skipped.**
- **Size chosen for looks, not meaning.** `<h3>` is rendered at **five** sizes
  — `text-h3` (28px, About/cards), `text-h2` (52px, ContactForm success),
  `text-h1` (72px, Services/IntegratedAdvantage), `text-body-lg` (20px,
  ServiceDetail:64), `text-body` (17px, ServiceDetail:189). The tag no longer
  signals level; it's picked for appearance.
- **`<h4>`–`<h6>` never used.** The document tree only goes `h1 → h2 → h3`, so
  `<h3>` is overloaded to cover every sub-level, which drives 4.4/4.5 above.
- **Token names don't match usage.** The `text-h1` token is applied to `<h2>`
  and `<h3>` elements far more often than to `<h1>`; real `<h1>`s mostly use
  `text-display`. The naming actively misleads.
- *No* div/span-as-heading abuse found, and *no* duplicate `<h1>` on a page
  (each page has exactly one) — those two are clean.

### 4.6 Mathematical ratio — verdict: arbitrary, not modular
Consecutive token steps (desktop/max px): 13 → 17 → 20 → 28 → 52 → 72 → 104.
Ratios between them:

| Step | Ratio |
|---|---|
| 13 → 17 | 1.31 |
| 17 → 20 | 1.18 |
| 20 → 28 | 1.40 |
| 28 → 52 | **1.86** |
| 52 → 72 | 1.38 |
| 72 → 104 | 1.44 |

Ratios swing from **1.18 to 1.86**. A modular scale holds one ratio (±). This
is not a modular scale — it's a hand-tuned set with a large unexplained jump
between h3 (28) and h2 (52).

### 4.7 Mobile / responsive behavior
- **Good:** most headings scale smoothly via `clamp()` — no broken jumps, and
  the `max-w-[15ch/16ch]` caps on heroes prevent line-length overflow.
- **Bug — mobile inversion:** `text-body-lg` minimum is **16.8px**, but
  `text-body` is a fixed **17px**. On phones the "large body" style is
  *smaller* than normal body. It should always be ≥ body.
- **Inconsistent responsive method:** almost everything scales via `clamp`, but
  two spots hand-roll breakpoint steps instead —
  `VideoHero.tsx:189` (`text-h1 … lg:text-display`, also swapping line-height
  and tracking at `lg:`) and `TrustedBy.tsx:48` (`text-xl md:text-2xl`). Two
  different scaling philosophies in one codebase.
- **Arabic:** body line-height jumps to 1.9 globally for RTL (`globals.css:113–116`)
  — very loose; headings share the *same* `clamp()` sizes as Latin despite IBM
  Plex Arabic having different metrics. Worth a design review, flagged in §6.

### 4.8 Hardcoded values bypassing tokens
**40** arbitrary `text-[…]` occurrences (§3c/§3d) + **15** Tailwind-default
occurrences (§3b) = **55 hard-coded size declarations** that route around the
`@theme` tokens, across ~30 files. Plus tracking is hard-coded 80+ times
(`tracking-[0.12em]` ×30, `[0.14em]` ×23, `[-0.03em]` ×11, `[0.1em]` ×5,
`[0.2em]` ×4, `[0.16em]` ×3, …) — the "same" uppercase label uses
**0.12 / 0.14 / 0.16 / 0.2em** in different places.

### 4.9 Line-height & weight inconsistency within one role
- **`<h1>` line-heights:** `0.95` (Hero/InnerHero/AboutHero/ProjectsHero),
  `0.98` (CaseStudyHero, VideoHero `lg`), `1.02`/`1.03` (VideoHero mobile,
  ServiceHero, ArticleView) — three values for one role.
- **`<h3>` line-heights:** `leading-tight`, `leading-[1.05]`, `leading-[1.02]`,
  token `1.25`, plus the `text-body`/`text-body-lg` h3s inheriting `1.6`/`1.65`.
- **Label weight:** eyebrow token is 600, but arbitrary `text-[0.6875rem]`
  labels carry **no weight** (inherit 400); CaseStudyCard's `0.625rem` badge is
  600. Same visual role, different weight.

---

## 5. Proposed type scale

### 5.1 Base & ratio
- **Base:** 16px root; **body text 17px** kept deliberately (1.0625rem reads
  well for dense bilingual copy — see §6 for the 16-vs-17 decision point).
- **Ratio:** **1.333 — Perfect Fourth.**

**Why 1.333:** It fits what the site already *wants* at the large end. A 1.333
scale from 16px yields 16 → 21 → 28 → 38 → 50 → 67 → 90 → 120, which lands
almost exactly on the current intentional sizes (28 = today's h3, ~50 = h2,
~67–90 = h1/display). It gives the bold, high-contrast hero presence an
engineering brand wants, without inventing new sizes. A gentler 1.25 (Major
Third) tops out too small (~76px) to support the 104px hero the design clearly
wants; the Perfect Fourth keeps that drama while making every step regular.

### 5.2 Proposed tokens (10 total)

Fluid via `clamp(mobile, vw, desktop)`. Weights assume Poppins.

| Token | Mobile | Desktop | Line-height | Weight | Tracking | Role |
|---|---|---|---|---|---|---|
| `display` | 40px | 96px | 1.0 | 700 | −0.03em | Marketing hero titles (`<h1>` on Hero/InnerHero) |
| `h1` | 34px | 64px | 1.05 | 600 | −0.02em | Page title `<h1>` where no hero drama needed (service/article) |
| `h2` | 28px | 44px | 1.1 | 600 | −0.02em | Section headings (`<h2>`) — **one size, everywhere** |
| `h3` | 22px | 30px | 1.2 | 600 | −0.01em | Subsection / primary card title (`<h3>`) |
| `h4` | 19px | 22px | 1.3 | 600 | 0 | Small card title / strong label (optional; lets `<h3>` stop overloading) |
| `body-lg` | 18px | 21px | 1.55 | 400 | 0 | Lead paragraphs, hero subtitles, overviews |
| `body` | 16px | 17px | 1.65 | 400 | 0 | Default body |
| `small` | 14px | 14px | 1.5 | 500 | 0 | Captions, meta, form help, secondary nav |
| `eyebrow` | 12px | 13px | 1.4 | 600 | 0.12em | All uppercase labels, tags, pills, overlines — **one size + one tracking** |
| `stat` | 40px | 72px | 1.0 | 700 | −0.03em | All big metric numbers — **one token** |

This collapses ~19 rendered sizes → **10 tokens** (9 text + 1 stat), inside the
healthy 6–9 band for prose roles plus two purpose-built display/stat tokens.

**Guaranteed no mobile inversion:** `body-lg` min (18) > `body` max (17) at all
widths — fixes §4.7.

**Suggested `globals.css @theme` shape** (illustrative, not applied):
```css
--text-eyebrow:  0.8125rem;                       /* 13 */
--text-eyebrow--line-height: 1.4;
--text-eyebrow--letter-spacing: 0.12em;
--text-eyebrow--font-weight: 600;
--text-small:    0.875rem;                         /* 14 */
--text-body:     1.0625rem;                        /* 17 */
--text-body-lg:  clamp(1.125rem, 1.2vw, 1.3125rem);/* 18 → 21 */
--text-h4:       clamp(1.1875rem, 1.2vw, 1.375rem);/* 19 → 22 */
--text-h3:       clamp(1.375rem, 1.8vw, 1.875rem); /* 22 → 30 */
--text-h2:       clamp(1.75rem, 3.2vw, 2.75rem);   /* 28 → 44 */
--text-h1:       clamp(2.125rem, 4.5vw, 4rem);     /* 34 → 64 */
--text-display:  clamp(2.5rem, 6.5vw, 6rem);       /* 40 → 96 */
--text-stat:     clamp(2.5rem, 5vw, 4.5rem);       /* 40 → 72 */
```

### 5.3 Migration map (current → proposed)

| Current source | px | → New token | Files affected |
|---|---|---|---|
| `text-eyebrow` | 13 | `eyebrow` (rename kept) | Eyebrow.tsx + all consumers |
| `text-[0.8125rem]` | 13 | `eyebrow` (or `small`) | CaseStudyDetail ×2, ProjectsExplorer ×2, ServiceDisciplines, CaseStudyGrid, ContactForm, SiteFooter ×2 |
| `text-[0.75rem]` | 12 | `eyebrow` | ProjectsExplorer ×2, ServiceDetail ×2, ContactForm |
| `text-[0.6875rem]` | 11 | `eyebrow` | MediaFrame, InnerHero, CaseStudyCard, ProjectsExplorer, ProjectsHero, AboutHero, ContactInfo, SiteFooter, Hero |
| `text-[0.625rem]` | 10 | `eyebrow` | CaseStudyCard |
| `text-sm` | 14 | `small` | IntegratedAdvantage ×2, ProjectsShowcase, OurStory, LogoMarks, ServicesProcess, Hero ×2, SiteHeader |
| `text-[0.875rem]` | 14 | `small` | CaseStudyGrid, ProjectsExplorer, ServiceDetail ×2, BlogList, Button `sm` |
| `text-[0.9375rem]` | 15 | `small` (or `body`) — **decision** | SiteHeader ×2 (nav), ServiceDetail ×2, Button `md` |
| `text-base` | 16 | `body` | VideoHero, Hero, LogoMarks, Button `lg` |
| `text-body` | 17 | `body` (kept) | 55 consumers — no change |
| `text-body-lg` | 20 | `body-lg` | 43 consumers — value tightened |
| `text-[clamp(1.25rem,2vw,1.6rem)]` | 20–25.6 | `body-lg` (or `h4`) — **decision** | CaseStudyDetail:107 (lead) |
| `text-xl` / `text-2xl` | 20 / 24 | `h4` (or `h3`) — **decision** | TrustedBy:48 (logo wordmark) |
| `text-[1.75rem]` | 28 | `h3` | SiteHeader:280 (mobile menu) |
| `text-h3` | 28 | `h3` | About, CaseStudyCard, BlogList, RelatedArticles, ServicesProcess, ProjectsExplorer ×2, ServiceDetail, CaseStudyDetail, etc. |
| `text-h2` | 32–52 | `h2` | 16 section headings + ContactForm:50 |
| `text-h1` (on section `<h2>`) | 40–72 | `h2` | InnerCta, IntegratedAdvantage, ProjectsCta, Technologies, Partners, OurStory, Vision2030, Philosophy, OurValues |
| `text-h1` (on card `<h3>`/`<h2>`) | 40–72 | `h3` (**fixes inversion**) | Services:50, IntegratedAdvantage:139, BlogList:71 |
| `text-h1` (on real `<h1>`) | 40–72 | `h1` | ServiceHero:38, ArticleView:56, VideoHero:189 |
| `text-display` (hero `<h1>`) | 48–104 | `display` | Hero, InnerHero, AboutHero, ProjectsHero, CaseStudyHero, VideoHero `lg` |
| `text-display` (section `<h2>`) | 48–104 | `display` or `h1` — **decision** | AboutCta, CtaBanner |
| `text-body-lg` / `text-body` (on `<h3>`) | 20 / 17 | `h4` (**fixes semantics**) | ServiceDetail:64, ServiceDetail:189 |
| `text-stat` | 48–88 | `stat` | StatBlock, CountUpStat |
| `clamp(2.5rem,5vw,3.75rem)` | 40–60 | `stat` | CaseStudyMetrics:61 |
| `clamp(2.25rem,4vw,3.25rem)` | 36–52 | `stat` | CaseStudies:90 |
| `clamp(1.9rem,3.5vw,2.75rem)` | 30–44 | `stat` | ServiceDetail:219 |
| `clamp(1.5rem,3vw,2.25rem)` | 24–36 | `stat` | ServiceDetail:339 |
| all `tracking-[…]` on labels | 0.1–0.2em | `eyebrow` token tracking (0.12em) | ~45 label sites |

Also fold **`StatBlock`, `CountUpStat`, CaseStudies, CaseStudyMetrics,
ServiceDetail (×2), Numbers** onto one `stat` token + component so the 5
implementations become 1.

---

## 6. Places needing a human decision

1. **Body base: 17px vs 16px.** Body is currently 17px. Keeping it preserves
   reading comfort for long bilingual copy; moving to 16px makes the modular
   math perfectly clean. Recommend **keep 17** (proposal assumes this).
2. **Nav link size (15px, `text-[0.9375rem]`).** Snap to `small` (14) or
   `body` (16/17)? Recommend **`small` (14)** for a tighter header.
3. **CtaBanner / AboutCta section headings at `display` (104px).** Intentional
   full-bleed drama, or should section CTAs cap at `h1`? Recommend **`h1`** so
   only true page heroes use `display` — but this is a brand-voice call.
4. **Hero tier per page.** Should service-detail / blog-article heroes match
   the big `display` heroes (currently they're a tier smaller at `text-h1`)?
   Recommend **align all heroes to `display`, or codify "content pages use
   `h1`"** — pick one rule.
5. **Lead-paragraph token.** CaseStudyDetail's overview (20–25.6px) — treat as
   `body-lg` or introduce a distinct `lead`? Recommend **`body-lg`** to avoid
   another token.
6. **TrustedBy logo wordmarks (20/24px).** These are stylized logo text, not
   prose — confirm they should join the scale (`h4`) or stay a bespoke
   brand-lockup exception.
7. **Whether to keep `h4`.** Adding it lets `<h3>` stop covering 5 levels; if
   the team prefers a flatter 9-token set, `h4` merges into `h3`/`body-lg`.
8. **Arabic scale.** Latin and Arabic currently share identical `clamp` sizes
   and IBM Plex Arabic runs at line-height 1.9. A native-Arabic design review
   should confirm heading sizes/line-heights work for the RTL typeface, or
   whether Arabic needs its own multipliers.
9. **Delete dead fonts + fix comments.** Remove
   `space-grotesk-latin-wght.woff2` / `inter-latin-wght.woff2` and correct the
   "Space Grotesk" doc-comments — confirm no reintroduction of a
   display/body font split is planned (if it is, *that's* the moment to load
   Space Grotesk properly instead).

---

## 7. Effort estimate

| Work item | Files | ~Lines |
|---|---|---|
| Rewrite `@theme` token block | `globals.css` | ~40 |
| Normalize arbitrary `text-[…]` → tokens | ~24 | ~40 |
| Replace Tailwind-default sizes → tokens | ~9 | ~15 |
| Normalize `<Heading size=…>` props (section h2s) | ~11 | ~11 |
| Fix `<h3>` inversions & body-styled h3s → proper tokens | ~5 | ~8 |
| Consolidate 5 stat implementations → 1 `stat` token/component | ~6 | ~20 |
| Normalize label `tracking-[…]` → token | ~15 | ~20 |
| Add missing `<h2>` on Contact (fix skipped level) | 1–2 | ~4 |
| Delete dead fonts + fix stale comments | 4 | ~6 |
| **Total** | **~35 files** | **~130–160 lines** |

No visual redesign required — this is consolidation onto the existing (good)
token foundation. Recommended order: (1) rewrite tokens, (2) migrate
arbitrary/default sizes, (3) normalize heading `size` props + fix inversions,
(4) consolidate stats, (5) cleanup fonts/comments. Each step is independently
shippable and visually reviewable.

---

*Audit only — no source files were modified.*
