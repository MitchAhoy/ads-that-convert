# Project instructions

## Design brief — read first

**Before any work that touches page design, layout, styling or copy (new pages, restyles, or changes to homepage components), read [`DESIGN.md`](DESIGN.md) and follow it.** It is the locked design system, taken from the homepage (Sept 2026). Where it conflicts with the design sections of this file (colour, spacing, backgrounds, cards, headlines), `DESIGN.md` wins. Any design change that deviates from it must update `DESIGN.md` in the same change.

## What this project is

- This is a Next.js app using App Router and Tailwind.
- The site is adsthatconvert.co, a marketing site for a SaaS paid-ads agency (Google Ads first, plus ChatGPT, Meta and Microsoft Ads service pages).
- The site was redesigned (Sept–Oct 2026) around a warm off-black/paper editorial system. Every page now follows it (see Note on scope). This is the baseline for all new/updated work, not a temporary skin.
- Use Tailwind utility classes with minimal custom CSS.

## Coding conventions

- Prefer semantic HTML
- Create reusable components for hero, CTA, cards
- Keep mobile first responsive
- Add form handling via API routes
- Use `.jsx` for React components
- Use a consistent site container width across all pages/sections:
  - Standard wrapper: `mx-auto w-full max-w-[1120px]`
  - Standard horizontal padding: `px-4 sm:px-6 lg:px-8`
  - Avoid one-off max-width values unless there is a documented design exception
- When a component stops being used, move it to `_archive/` at the repo root rather than leaving it in `components/`. `_archive/` holds unused pre-redesign components for reference only: never import from it.

## Colour

Core palette (defined as CSS custom properties / Tailwind v4 `@theme` tokens in `globals.css` — never hardcode these hex values directly in components):

- `--color-ink` `#1a1a18` — primary text, headings, primary button background
- `--color-body` `#3d3b36` — secondary body copy
- `--color-muted` `#8a877f` — tertiary/muted text (labels, meta) — restrict to caption/label-sized text, not body-sized paragraphs. Testimonial/quote attribution lines (role, company) use `text-fine` instead for legibility.
- `--color-fine` `#6b6963` — fine print (trust text, legal, captions)
- `--color-border` `#e2e0da` — all hairline borders
- `--color-surface` `#f3f2ef` — soft contrast surface, reserved use only (see Background Usage Rules)
- `--color-page` `#f2f0ef` — the warm paper canvas, set once in `app/layout.jsx` (`bg-page`). Sections have no background of their own; cards are white (see Background Usage Rules)

Do not introduce new UI chrome colours outside this palette. Buttons, links, icons, borders and text stay ink/neutral — colour is atmospheric, never functional decoration.

### Pastel family

Every decorative colour on the site comes from one pastel family, defined as `--pastel-*` custom properties in `globals.css` (deliberately *not* exposed as `@theme` colours, so they can't leak into UI chrome):

- `--pastel-lavender`, `--pastel-periwinkle`, `--pastel-ice`, `--pastel-blush` — the lead hues
- `--pastel-mint` — small mockup accents only (e.g. the search-ad site icon)
- `--pastel-butter` — a tiny warm highlight inside a gradient, never a field of its own

All share roughly the same lightness/saturation. Illustration frames, `*Mini` mockup accents (chart bars, gauge arcs, placeholder avatars) reference these vars (`var(--pastel-blush)` in inline gradients, `bg-(--pastel-mint)` / `stroke-(--pastel-lavender)` as utilities) rather than raw hex. Don't add a hue outside the family (no orange, saturated teal, lime, etc.).

Allowed exceptions, because the colour carries meaning or is authentic third-party content:
- Client/partner logos and brand icons (Google Ads, Slack, LinkedIn) keep their real colours — don't monochrome them.
- Semantic status: the green "live/available/up" dots and deltas in mockups.
- Faithful third-party UI in mockups, e.g. the Google search-ad link blue.

The pre-redesign illustration frames (`OneThing`, `Results`, `RinseRepeat`), which used older saturated hex values, are no longer used and have been moved to `_archive/`. Don't revive them; build new frames on the pastel tokens.

### No section gradients

The hero, the (since removed) homepage pricing band and the final CTA card (`CallToActionCard`) previously carried a right-edge "brand gradient" bloom. It was removed (Sept 2026) along with its `--gradient-brand*` tokens and `.bg-brand-gradient`/`.brand-fade` classes. Section and CTA backgrounds are neutral: the final CTA card matches the hero card exactly: `rounded-[28px] border border-border bg-white shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)]`. Pastel colour now appears only inside illustration frames and `*Mini` mockups, plus one documented exception: the final CTA card carries `.cta-glow` (globals.css) on an `aria-hidden` `grain cta-glow absolute inset-0` layer — a faint warm tint and a small lavender/blush/ice glow in the bottom-right corner at 50% opacity, meant as "5% more character" for the page's last moment. Keep it that quiet. Don't reintroduce gradients on other sections, cards, buttons or text.

Note: a gradient using `color-mix()` with `var()` stops was dropped from the compiled CSS with no error (dev build, Sept 2026) — control strength with layer `opacity` instead.

Photos (avatars, headshots, client photos) are shown as-is — no `saturate-*`, `hue-rotate-*` or other colour filters. Documented exception: video testimonial previews in `VideoCard` use the `.video-grade` filter (globals.css) so the live Mux footage matches the pre-graded, muted client avatars in `/public/client pfp`.

## Spacing & Section Rhythm

All sections must use consistent vertical padding using Tailwind's standard spacing scale. Do not invent new spacing values or use arbitrary `py-[Npx]`.

**The padding table lives in `DESIGN.md` §5.1** (e.g. default H2-led section `pt-16 pb-12 sm:pt-20`, hero `py-8 sm:py-10`). It is tighter than the older `py-16 sm:py-20` scale this file used to list, because every section sits in a `GridFrame` and adjacent sections are separated by a `GridDivider` (DESIGN.md §2).

**Rules:**
- Never mix arbitrary padding values like `pt-[90px]` in section wrappers
- Never add top/bottom margin to sections - use padding only
- Inner content spacing (between heading, body, CTA) is separate and not governed by this rule
- Section intro → content: the section H2 is followed by its intro paragraph at `mt-4`, and the intro block (H2 + intro, plus any CTA) is separated from the card grid / slider / list that follows by `mt-10 sm:mt-14` (or `mb-10 sm:mb-14` on the intro block). This extra air is what lets the section H2 dominate the cards beneath it — use it rather than enlarging `text-h2` (which would overtake `text-cta-h2`) or shrinking card H3s below the 20px H3 minimum.
- Container convention is unchanged from Coding Conventions above — do not alter the `max-w-[1120px]` wrapper

## Typography & Font Size Standards

### Font family

- Primary: `'Google Sans', 'Figtree', sans-serif`, loaded via `next/font/google` in `app/layout.jsx` (`Google_Sans` weights 400/500/600/700, `Figtree` as fallback/light-weight use — Google Sans is only available at 400–700 on Google Fonts, so don't reference 300/800 weights for it).
- Exposed as CSS vars `--font-google-sans` and `--font-figtree`; `body` and headings resolve through `font-family: var(--font-google-sans), var(--font-figtree), sans-serif`.
- Display serif: `Source Serif 4` (variable, `opsz` axis), loaded via `next/font/google` in `app/layout.jsx` as `--font-display-serif`. Chosen (Oct 2026) over Newsreader, which read as bookish/cheap; Source Serif's display optical size is the closest free match to Tiempos Headline-style editorial serifs. Applied only through the `.font-display` class in `globals.css`, and only to headline-level text: the hero H1, section H2s (`text-h2`), the final CTA heading (`text-cta-h2`), and large headline stats (e.g. case-study metrics). Everything else — H3/card titles, body, quotes, nav, buttons, labels and all illustration/mockup UI — stays Google Sans. That sans/serif contrast is the point; don't spread the serif further.

### Base Scale

```css
/* globals.css */
:root {
  --font-size-xs: 0.75rem; /* 12px — absolute minimum, use sparingly */
  --font-size-sm: 0.875rem; /* 14px — captions, labels, helper text */
  --font-size-base: 1rem; /* 16px — body text minimum */
  --font-size-copy: 1.0625rem; /* 17px — card/supporting body copy (`text-copy`) */
  --font-size-md: 1.125rem; /* 18px — preferred body size */
  --font-size-lg: 1.25rem; /* 20px — large body / small heading */
  --font-size-xl: 1.5rem; /* 24px — H3 mobile */
  --font-size-2xl: 2rem; /* 32px — H2 mobile / H3 desktop */
  --font-size-3xl: 2.25rem; /* 36px */
  --font-size-4xl: 3rem; /* 48px — standard H2 size */
  --font-size-5xl: 4rem; /* 64px */
  --font-size-h1: 2.75rem; /* 44px — hero H1 only */
  --font-size-h2: 3rem; /* 48px — section H2 (`text-h2`) */
  --font-size-cta-h2: 3.25rem; /* 52px — final CTA heading only */

  --line-height-body: 1.6;
  --line-height-heading: 1.15;
  --line-height-ui: 1.4;
}
```

### Wire the scale into real Tailwind utilities (Tailwind v4 `@theme`)

Do not express headings as ad hoc `text-[clamp(...)]` arbitrary values. Instead, `--text-h1`, `--text-h2`, and `--text-cta-h2` are defined as `@theme` tokens (each paired with a `--text-*--line-height`), so `text-h1`, `text-h2`, `text-cta-h2` are real Tailwind utility classes:
- `text-h1` — hero heading only (44px)
- `text-h2` — standard section heading (48px), used by nearly every section
- `text-cta-h2` — final CTA heading only (52px)

`--text-copy` (17px, line-height 1.55) is also an `@theme` token, so `text-copy` is a real utility. Use it for supporting body copy in cards (case-study, step, fit, reason and video-testimonial cards), FAQ answers, and short bullet lists — anywhere 16px reads too small next to the serif headings but 18px (`text-lg`) would crowd a narrow card. Explanatory paragraphs under section headings use `text-lg` (18px). Don't use `text-[17px]`.

Mobile sizing for these three is handled once, in `globals.css`: `@theme` is `inline`, so the utilities read `--font-size-h1`/`--font-size-h2`/`--font-size-cta-h2`, and a `@media (width < 40rem)` block shrinks them to 36px / 32px / 36px. Don't add per-component mobile overrides to `text-h1`/`text-h2`/`text-cta-h2`, and don't use `clamp()`. Other headings still use the normal Tailwind-responsive way (smaller default class + `sm:`/`lg:` override).

### Weights & tracking

- Sans headings (H3 and below): `font-bold` (700), `tracking-[-0.02em]` — standardize on this single tracking value for all headings, rather than varying it by size. The global `h1`–`h6` rule in `globals.css` is unlayered and sets weight, `line-height: 1.15` and tracking, so Tailwind `leading-*`/`tracking-*` utilities on headings have no effect — don't add them.
- Display headings (`.font-display`): Source Serif 4 at regular weight (400), `line-height: 1.1`, `tracking -0.02em`. Don't bold the serif. Documented exception: the hero H1 uses medium (500) via `font-medium!` (the `!` is needed because `.font-display` is unlayered).
- Body: `font-normal` (400) at 16–18px; secondary/meta text may use `font-medium` (500).

### Responsive Rules (enforce in every component)

- **Body text:** never below `16px` (`1rem`). Prefer `18px` for long-form content.
- **Captions / labels:** never below `14px` (`0.875rem`). Never below `12px` under any circumstance.
- **Headings must scale down on mobile** — use the `text-h1`/`text-h2`/`text-cta-h2` utilities with responsive overrides, not `clamp()`.
- **Line height:** always `1.5–1.6` for body, `1.1–1.3` for headings. Never set `line-height: 1` on multi-line text.
- **Illustration/mockup exception:** text inside decorative illustrations (the dashboard/Slack/search-ad mockups in `components/sections/illustrations/` and inline `*Mini` components) mimics real product UI and is `aria-hidden` or inside a `role="img"`, so the 16px body and 14px caption minimums don't apply there. The hard floor still does: nothing below `text-xs` (12px), and prefer `rem`/utilities over `px`. If a mockup doesn't fit at 12px, give it more room rather than shrinking the text.

### Component Rules

- Never hardcode `font-size` values in component styles — always use the scale/utilities above.
- Never use `px` units for font sizes in components — use `rem`/utilities only.
- All `<p>`, `<span>`, `<li>` elements must resolve to at least `16px` in computed styles.
- All interactive elements (buttons, links, inputs) must be at least `16px` to prevent iOS auto-zoom.
- Do not use `font-size` below `12px` even for decorative text — use opacity or weight instead to de-emphasize.

### Minimum Size Reference Card

| Element | Min Size | Preferred |
|----------------------|----------|------------|
| Body / paragraph | 16px | 18px (17px `text-copy` in cards) |
| Caption / helper | 14px | 14–15px |
| Label / badge | 12px | 13–14px |
| Button text | 16px | 16px |
| Input text | 16px* | 16px |
| H3 | 20px | 22–24px |
| H2 | 24px | 48px desktop / 32px mobile (`text-h2`) |
| H1 | 32px | 44px desktop / 36px mobile (`text-h1`) |
| Illustration/mockup text | 12px | 12–14px |

*16px on inputs prevents iOS Safari from auto-zooming the page on focus.

## Build tasks

- Write pages in /app
- Use /components for shared UI
- Use modules for layout and navigation
- Whenever a page is added, removed, or a dynamic route gains/loses slugs, the sitemap must be updated in the same change.
- Never ship a routing change without verifying sitemap coverage for that route.
- When adding a new HubSpot-backed form, create the matching form in HubSpot first, make sure all submitted CRM properties exist on that HubSpot form definition, and store that form's unique GUID in a specific env var before wiring the site form to the submission API.

## Background Usage Rules

- The page canvas is `bg-page` (`#f2f0ef`, warm paper), applied once in `app/layout.jsx`. Sections have no background of their own: they sit on the paper and white cards lift off it.
- The soft surface colour `#f3f2ef` (`bg-surface`) is for hover states and special contrast callouts only. Do not use it as a default "card" or section background.
- Cards (testimonial cards, video cards, FAQ items, floating illustration cards, stage cards) use `bg-white` with a `border border-border` for definition, not shadow-only grey surfaces.
- The floating nav pill is the one exception that uses shadow-only elevation (no visible border), see Shape Standards below.
- Sections are separated by `GridDivider` hairlines, not background colour changes (DESIGN.md §2).

## Icon Standards

- Use `lucide-react` as the default and only icon library for UI icons across the entire site.
- Do not use standalone SVG files from `/public` for UI icons (exceptions: brand/client logos or illustration assets).
- Prefer importing icons directly in components and styling with Tailwind classes for consistent sizing and stroke.
- Keep icon sizing consistent by default (`h-5 w-5` or `h-6 w-6`) unless a documented design exception is approved.

## Button Consistency

- Primary CTA buttons (e.g. `ScheduleCallButton`) are pill-shaped: `rounded-full`, `bg-ink text-white`, `font-semibold`, `text-base` (16px — the interactive-element minimum; no 15px variants, including the nav size), roughly `px-6 py-3.5` padding, `inline-flex items-center gap-2.5` for icon+label.
- Secondary text-link CTAs next to a primary button (e.g. "See client results", "See pricing") are `text-base font-semibold text-ink` with `border-b border-ink` and `px-1 py-3.75`, so they line up with the pill.
- Do not use `rounded-2xl` for primary CTAs — that radius is reserved for cards/containers, not buttons.
- Hover state: darken the ink background (e.g. `hover:bg-[#2d2d2a]`) rather than a grey hover.
- The final-CTA-card button additionally carries `shadow-[0_6px_18px_rgba(26,26,24,0.18)]` — a documented exception for that one instance, not the default button shadow.

## Shape Standards

- Cards: `border border-border`, `bg-white`. Feature, stat and video cards are `rounded-3xl`; flat cards (FAQ items, testimonial wall cards) are `rounded-2xl`. Full radius and elevation tables: DESIGN.md §6.
- Nav: floating pill, `rounded-full`, transparent at the top of the page and `bg-white/80` with `shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]` once scrolled, no border, `max-w-270` (1080px), centered.
- Final CTA card: `rounded-[28px]` (documented exception — larger radius, hero-weight).

## Logo Standard

- The wordmark is real text, not an image: "adsthatconvert" — `font-bold`, `text-lg`–`text-xl`, `tracking-[-0.03em]`, colour `text-ink`.
- Always paired with the inline monoline mark (three-circle SVG, viewBox `0 0 100 100`) via the shared `components/ui/Logo.jsx` component — not a `/public` image.
- The old navy `#00162a` image wordmark has been replaced everywhere, including transactional emails. Emails use a PNG of the new mark + wordmark (email clients don't render SVG), and `lib/email/brand.js` uses the editorial palette. Don't reintroduce the navy logo or a zinc/DM Sans email palette.

## Internal Page Hero

- Every top-level page except the homepage uses the shared `components/sections/PageHero.jsx` stage card for its H1 (DESIGN.md §7.1). This includes `/results`, `/tools/*`, `/services/[slug]` and `/call-confirmation`. `/results` is the reference implementation.
- `PageHero` is the homepage hero card (`rounded-[28px]`, Level-3 stage shadow, `py-8 sm:py-10` wrapper) with: an optional `pill`; a `title` in `font-display font-medium! text-h1` (string titles get the `.reveal-word` stagger); a `description` lede (`text-copy sm:text-lg text-body max-w-[30em]`); a CTA row with `ScheduleCallButton` ("Book a 15-min call") plus an optional `secondaryLink` underline link (`showCta={false}` hides it); and an optional `aside` visual in a right-hand 460px column, hidden below `lg`.
- Documented exception: `/testimonials` and `/pricing` have no hero and open straight on their content, with an `sr-only` H1 (DESIGN.md §7.1).
- Do not introduce page-specific headline styles. The old `PageHeadline` component is legacy and only used by `/test/hubspot-form`; never use it on a real page.

## Note on scope

The editorial redesign is complete across the whole site: the homepage, shared chrome, `/pricing`, `/results` and `/results/[slug]`, `/testimonials`, `/tools/*`, `/services/[slug]` and `/call-confirmation` all follow `DESIGN.md`. Any page or component that doesn't is a bug to fix (DESIGN.md §14 lists known debt), not a reference.

## Routes

- **Case studies:** `/results` and `/results/[slug]` are the canonical case study pages. The old `/case-studies` route is removed, and `next.config.mjs` permanently redirects `/case-studies` and `/case-studies/:slug` to them. `components/case-studies/*` is still the shared component folder that `/results` uses. Link to `/results`, never `/case-studies`.
- **Service pages:** `/services/[slug]` renders `components/services/ServicePageTemplate.jsx` from data in `lib/services.js` (DESIGN.md §7.14). Each service has an `indexable` flag: `false` renders "noindex, follow" and leaves the page out of the sitemap (`getIndexableServiceSlugs()`). `google-ads` is noindexed because the homepage owns the "saas google ads agency" keyword. All channels share the same pricing.
