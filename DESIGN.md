# Design Brief — adsthatconvert.co

> **Status: locked (30 Sept 2026).** This brief is taken from the homepage as built on
> `redesign/editorial-system` (`app/page.jsx` and the components it renders). It is the
> source of truth for how every page on the site looks and reads.
>
> **Read this before building a new page, restyling an old page, or changing any component on the
> homepage.** If a change you want isn't covered here, or goes against it, update this file in the
> same change and say why. Don't let the code and this brief drift apart.
>
> On visual design, this file takes precedence over `AGENTS.md`. `AGENTS.md` still covers
> engineering conventions (routing, sitemap, HubSpot forms, file layout).

---

## 1. The idea in one paragraph

An editorial, founder-led page on warm paper. Big serif headlines (Source Serif 4) sit over plain,
confident sans copy (Google Sans). The chrome is almost monochrome: warm off-black ink, warm greys
and hairline borders. Colour appears only inside illustrations and product mockups, as soft pastel
washes. Every claim is followed quickly by proof: a stat, a named client quote, a logo or a case
study. It should feel like a well-set magazine page written by one senior operator, not a
template-y agency site. If something looks "SaaS-landing-page default" (gradient buttons, glowing
cards, emoji icons, centered-everything), it's wrong.

**Five principles**

1. **Paper, ink, hairlines.** Warm neutral canvas, white cards, 1px warm borders, soft layered shadows.
2. **Serif headlines, sans everything else.** The contrast between the two fonts is the brand, so the serif is kept rare.
3. **Colour is atmosphere, never function.** Pastels live inside illustration frames and mockups. Buttons, links, icons and text stay ink.
4. **Proof follows every claim.** Sections end in a quote, a stat, or a link to evidence.
5. **One person talking.** First person ("I"), specific numbers, honest disqualifiers.

---

## 2. Page anatomy

Every page follows the homepage skeleton:

```jsx
<>
  <GridFrame bleedTop>
    <PageHero />            {/* stage card — see §7.1 */}
  </GridFrame>

  <GridDivider />

  <GridFrame>
    <SomeSection />
  </GridFrame>

  <GridDivider />

  {/* …repeat GridFrame + GridDivider for each section… */}

  <GridFrame>
    <CTABanner />           {/* always the last section */}
  </GridFrame>
</>
```

- **Canvas:** the root layout wraps everything in `bg-page` (`#f2f0ef`, warm paper). Sections have
  **no background of their own**. They sit on the paper, and white cards lift off it.
- **Grid frame:** `GridFrame` draws two 1px vertical lines at the 1120px container edges
  (`50% ± 560px`, `xl` and up only). `GridDivider` draws a full-width horizontal hairline with a small
  filled lightning-bolt marker (lucide `Zap`) where it crosses each vertical. **Every section is wrapped in a `GridFrame`, and adjacent
  sections are separated by a `GridDivider`.** The first frame uses `bleedTop` so the lines run up
  behind the nav. Don't change the 560px anchor in only one of the two components.
- **Container:** `mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8`. Full-bleed pieces (marquees)
  still clip to the 1120px container and fade their edges with a mask (§9).
- **Order of a typical page:** hero → proof (video/results) → explanation sections alternating with
  proof → objection handling (fit / FAQ) → final CTA. Put proof near the top.
- **Nav and footer** come from the layout. Never re-implement them per page.

---

## 3. Colour

All values are tokens in `app/globals.css`. **Never hardcode these hex values in components. Use the
utility (`text-ink`, `bg-page`, `border-border`) or the CSS var.**

### 3.1 Neutrals (all UI chrome)

| Token | Hex | Utility | Use |
|---|---|---|---|
| `--color-ink` | `#1a1a18` | `text-ink` / `bg-ink` | Headings, primary text, primary buttons, icons, underlines |
| `--color-body` | `#3d3b36` | `text-body` | Body and supporting copy |
| `--color-fine` | `#6b6963` | `text-fine` | Fine print, trust lines, attribution role/company |
| `--color-muted` | `#8a877f` | `text-muted` | Labels, meta, step numbers, the muted half of a two-tone H2. Caption size only, never body paragraphs (except as the deliberate second line of a display headline) |
| `--color-border` | `#e2e0da` | `border-border` | Every hairline: cards, dividers, rows |
| `--color-surface` | `#f3f2ef` | `bg-surface` | Recessed wells *inside* cards (illustration/video wells), FAQ toggle and hover, FAQ sidebar callout, mockup window bars |
| `--color-page` | `#f2f0ef` | `bg-page` | The page canvas (set once in `layout.jsx`), status pill fill |
| — | `#fff` | `bg-white` | Every card and stage card |

Grid lines use `bg-border/60`. The grid lightning-bolt markers use `text-muted/70` (filled).

### 3.2 Pastel family (decoration only)

`--pastel-lavender #b9a3ee`, `--pastel-periwinkle #9fb2f2`, `--pastel-ice #b3def0`,
`--pastel-blush #f1b2d6` (lead hues), `--pastel-mint #b6e4d3` (small mockup accents only),
`--pastel-butter #fbe6b4` (a tiny highlight inside a gradient, never a field).

- These are deliberately **not** `@theme` colours. Reference them as `var(--pastel-*)` in inline
  gradients, or as `bg-(--pastel-mint)` / `stroke-(--pastel-lavender)` / `fill-(--pastel-periwinkle)`.
- Allowed places: illustration frames (e.g. the Slack/change-history frame's layered radial wash),
  the "hero" bar or endpoint inside a `*Mini` mockup (one pastel element among neutral ones),
  placeholder avatars, the final CTA's `.cta-glow`, and the tools' copy-confirmation confetti (ink plus
  `var(--pastel-*)`).
- Pastel surfaces usually carry `.grain` (§10) so they read as printed, not digital.
- Never on buttons, links, text, icons, borders, section backgrounds or cards.

### 3.3 Allowed non-palette colour

- Real brand logos and icons (Google Ads, Slack, LinkedIn, Google Meet, client logos). Shown in full colour, never monochromed.
- Semantic status: live/available dots (`bg-green-500` in the hero availability line, currently hidden via `SHOW_AVAILABILITY` in `Hero.jsx`; `#22a55b` in mockups) and positive deltas (`#15994f`).
- Faithful third-party UI inside mockups (Google ad link blue `#1a0dab`).
- Mockup neutrals for bars and tracks: `#e4e2dd`, `#e8e6e1`, `#d8d5ce`, `#b8b4ae`, `#55524e`. Only inside mockups.

### 3.4 Never

Section gradients, gradient text, gradient/coloured buttons, coloured card backgrounds, cool greys
(`zinc-*`, `slate-*`), navy (`#122338`, `#0c2237`, `#00162a`), or colour filters on photos.

---

## 4. Typography

### 4.1 Families

| Role | Font | How |
|---|---|---|
| Display serif | Source Serif 4 (variable, `opsz`) | `.font-display` — weight 400, line-height 1.1, tracking −0.02em |
| Everything else | Google Sans (400–700), Figtree fallback | Default on `body` and `h1–h6` |
| Code in mockups | `font-mono` | Event names, code window |

**The serif is used only for:** the hero H1, section H2s, the final CTA heading, headline stats
(`ResultCard` metric), and the marquee's statement heading. H3s, card titles, quotes, body, nav,
buttons, labels and all mockup UI stay sans. Never bold the serif. The one exception is the hero H1,
which uses `font-display font-medium!`.

### 4.2 Scale in use

| Element | Classes |
|---|---|
| Hero / page H1 | `font-display font-medium! text-h1 text-ink` (44px → 36px mobile) |
| Section H2 | `font-display text-h2 text-ink text-balance` (48px → 32px mobile) |
| Final CTA H2 | `font-display text-cta-h2 text-ink` (52px → 36px mobile) |
| Statement H2 (small) | `font-display text-2xl leading-[1.3]! text-ink` (logo marquee) |
| Headline stat | `font-display text-6xl tabular-nums text-ink` |
| Card H3 | `text-xl font-bold text-ink` (20px). Editorial-row H3: `text-xl sm:text-2xl` |
| Section intro / lede | `text-lg leading-[1.5] text-body text-pretty` (18px) |
| Card and list copy | `text-copy leading-[1.5] text-body` (17px) |
| Quote (compact) | `text-lg font-medium leading-[1.5] text-ink` |
| Quote (wall card) | `text-lg font-medium leading-[1.5] text-ink text-wrap-pretty` |
| Name in attribution | `text-base font-bold tracking-[-0.03em] text-ink` (`text-sm` in wall cards / `text-lg` in video cards) |
| Role / company | `text-sm leading-[1.5] text-fine` |
| Card label / meta | `text-sm font-medium leading-[1.5] text-muted` |
| Step number | `text-sm font-medium text-body tabular-nums` rendered as `01`, `02`… |
| Fine print | `text-sm text-fine` |
| Mockup UI | `text-xs`–`text-sm`, with `text-[0.8125rem] font-bold` for mockup titles. Floor is 12px |

- `text-h1`/`text-h2`/`text-cta-h2` shrink on mobile automatically (`globals.css` media block).
  Don't add per-component mobile overrides and don't use `clamp()`.
- The global `h1–h6` rule is unlayered, so `leading-*`/`tracking-*` utilities on headings do nothing
  unless forced with `!`. Don't add them.
- Use `text-balance` on H2s and `text-pretty` on ledes and quotes.
- Minimums: body 16px, captions 14px, mockups 12px, interactive elements 16px.

### 4.3 Headline techniques

- **Two-tone H2.** The second clause goes in `text-muted`, either on its own line
  (`<span className="block text-muted">and why they stay</span>`) or inline as an aside
  (`<span className="text-muted">(I don't have any lock-in contracts…)</span>`). Use it at most once
  or twice per page.
- **Inline brand icon in copy.** `<GoogleAdsIcon>` / `<SlackIcon>` at `h-[1em] w-[1em]` inline before
  the word, wrapped in `whitespace-nowrap` with the word.
- Headlines state an outcome or a position in plain language ("Check the fit, then build", "Reported
  in trials, pipeline and MRR"). Sentence case, no trailing period, no exclamation marks.

---

## 5. Spacing and rhythm

### 5.1 Section padding (vertical)

The homepage runs a tighter rhythm than the older `AGENTS.md` scale. The GridDividers do the work
of separating sections. Use these:

| Section type | Padding |
|---|---|
| Hero (stage card wrapper) | `py-8 sm:py-10` |
| **Default section opening with an H2 intro** | `pt-16 pb-12 sm:pt-20` |
| Split / illustration-led section | `py-12` |
| Logo marquee | `py-12 sm:py-16` |
| Video grid | `py-16` |
| FAQ (sidebar layout, near page end) | `pt-16 pb-16 sm:pb-20` |
| Final CTA wrapper | `pt-10 pb-16` |
| Footer | `pt-16 pb-10 sm:pt-22` (layout-owned) |

Padding only, never margin, on sections. No arbitrary `py-[Npx]`.

### 5.2 Inside a section

| Gap | Value |
|---|---|
| H2 → intro paragraph | `mt-4` (`mt-5` in split sections) |
| Intro block → cards/grid/list | `mt-10 sm:mt-14` (or `mb-10 sm:mb-14` on the intro) |
| Intro → CTA button (in intro) | `mt-8` |
| Card grid gap | `gap-5` / `gap-5.5` |
| Content → closing quote | `mt-6 border-t border-border pt-5` (or `mt-9 … pt-7` after a footnote) |
| Content → footnote | `mt-7` (`mt-6` for a closing disqualifier line) |
| Icon list items | `gap-4`, icon-to-text `gap-3.5` |

Intro blocks are constrained to `max-w-[680px]` (`max-w-[640px]` is fine). Ledes to
`max-w-[30em]`–`max-w-[32em]`, quotes to `max-w-[34em]`, card copy to `max-w-[36em]`.

---

## 6. Shape, border and elevation

### 6.1 Radii

| Radius | Where |
|---|---|
| `rounded-full` | Buttons, nav pill, status pill, avatars, FAQ toggle |
| `rounded-[28px]` | Stage cards: hero and final CTA |
| `rounded-3xl` (24px) | Feature cards, stat cards, video cards, illustration frames |
| `rounded-[18px]` | Recessed media well inside a feature card (24px − 8px inset, so the curves nest) |
| `rounded-2xl` (16px) | Flat cards (FAQ items, testimonial wall cards), dropdowns, sidebar callout, floating mockup panels |
| `rounded-[14px]` | `*Mini` mockup cards |
| `rounded-xl` | Code window, small UI inside mockups |

### 6.2 Elevation: four levels, all warm-tinted (`rgba(26,26,24,…)`)

| Level | Shadow | Use |
|---|---|---|
| 0 — Flat | none, `border border-border` | FAQ item (closed), testimonial wall card |
| 1 — Mockup | `shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]` | `*Mini` cards (no border) |
| 2 — Card | `shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]` + `border border-border` | Feature, stat and video cards, FAQ item (open) |
| 3 — Stage | `shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)]` + `border border-border` | Hero card, final CTA card |
| Nav | `shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]`, no border | Scrolled nav pill, Tools dropdown (with border) |

Never use Tailwind's default `shadow-md`/`shadow-lg` (they're cool grey) or coloured glows.

---

## 7. Components and patterns

Reuse these components. Build a new one only when nothing below fits, and then build it to these specs.

### 7.1 Stage card (hero)

`components/sections/Hero.jsx`. A white `rounded-[28px]` Level-3 card inside the container
(`xl:px-4` so the grid lines stay visible). Inside, from top to bottom:

1. **Status line** (optional, homepage): plain text, no pill or border. `text-sm text-fine` with a small static green dot (`h-1.5 w-1.5`, no ping), the status in `font-medium text-ink`, then "· updated <Mon D>". Internal pages still use the `PageHero` pill.
2. **H1**: `font-display font-medium! text-h1`, with the `.reveal-word` stagger (homepage only, or a page's single hero).
3. **Lede**: `text-copy sm:text-lg text-body max-w-[30em]`.
4. **Icon value list** (optional): lucide icon `h-6 w-6 strokeWidth={1.75}` in ink + `text-copy text-body`.
5. **CTA row**: primary pill + secondary underline link, `gap-6`.
6. **Social proof**: `ClientTestimonialAvatarStack`.

Desktop is two columns (`lg:grid-cols-[minmax(0,1fr)_460px]`) with a product visual on the right
(code window, mockup). Mobile is one column, centred, and the visual is hidden.

**Internal pages** (results, tools, services, call confirmation) use the same stage card
through **`components/sections/PageHero.jsx`**: optional `pill`, `title` (string titles get the word
reveal), `description`, `secondaryLink`, and an optional `aside` for the right-hand visual (hidden
below `lg`). `/results` is the reference implementation, with `ResultsLedger` as the aside. This
replaces the old `PageHeadline` pattern, which survives only on the `/test/hubspot-form` page. Don't revive it.

**Documented exception: `/testimonials` and `/pricing` have no hero.** Each opens straight on its
content in a `bleedTop` frame (the video testimonial grid, the plan cards), because the page explains
itself. The H1 is kept as an `sr-only` heading for screen readers and SEO. `/pricing` opens with the
hero's `pt-8 sm:pt-10` so the plans sit where the stage card would.

### 7.2 Section intro

```jsx
<div className="max-w-[680px]">
  <h2 id="…-title" className="font-display text-h2 text-ink text-balance">…</h2>
  <p className="mt-4 text-lg leading-[1.5] text-body text-pretty">…</p>
</div>
<div className="mt-10 sm:mt-14">…content…</div>
```

Left-aligned by default. Centred intros are only for short standalone sections (non-sidebar FAQ).
Every section has `aria-labelledby` pointing at its H2 `id`.

### 7.3 Feature card with illustration well

Used in `FitThenBuild`, `WhoIsThisFor` and `VideoCard`.

```jsx
<li className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]">
  <div className="h-52 overflow-hidden rounded-[18px] bg-surface p-3.5" aria-hidden="true">
    {/* *Mini mockup, image or video */}
  </div>
  <div className="flex-1 px-4 pt-5.5 pb-6">
    <h3 className="text-xl font-bold text-ink">…</h3>
    <p className="mt-2 text-copy leading-[1.5] text-body">…</p>
  </div>
</li>
```

The 8px inset "frame" around the recessed well is the signature card shape. Keep well heights
equal across a row. Grids: `sm:grid-cols-2 lg:grid-cols-4` (steps), `md:grid-cols-3` (points),
`lg:grid-cols-4` (videos). Steps are an `<ol>` with an `01` number inside the H3.

### 7.4 Stat card

`ResultCard` in `ResultsProof.jsx`: `rounded-3xl` Level-2, `px-6 pt-6 pb-6 sm:px-7 sm:pt-7`. Content
in order: muted label → serif `text-6xl` metric with `<CountUp>` → `text-lg font-medium` stat line
→ `border-t` divider → `text-copy` description → arrow link. Grid:
`grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5`.

### 7.5 `*Mini` mockups

Small fake product UI (gauge, event log, search ad, weekly report, conversion path, MRR chart).

- Base: `rounded-[14px] bg-white leading-[1.4]` + Level-1 shadow. Sits in a `bg-surface` well.
- Title `text-[0.8125rem] font-bold text-ink`, meta `text-xs text-muted`, rows split by `border-t border-surface`.
- Mostly neutral: bars in `#e4e2dd`, with **one** highlighted element in a pastel gradient + `.grain`.
- Status uses the semantic green dot. The whole thing is `aria-hidden` or `role="img"` with a real `aria-label`.
- Content must be realistic and specific to SaaS Google Ads (`trial_started`, `$1,980 New MRR`, "Worth testing"), never lorem ipsum.

### 7.6 Illustration frame

`SlackChangeHistoryIllustration`: `grain relative h-[450px] overflow-hidden rounded-3xl`, with a
layered pastel radial-gradient wash and white floating panels (`rounded-2xl`, Level 1–2 shadow) on
top. It's used in a split section (`lg:grid-cols-2 items-center gap-10`, illustration first). It's
the only place a large pastel field is allowed, and each page should have at most one or two.

### 7.7 Editorial list

`WhyFoundersStay`: a 12-column grid, heading `lg:col-span-5`, copy `lg:col-span-7`, `lg:gap-x-10`.
Rows are `border-b border-border py-7 sm:py-8` under a `border-t` on the `<ul>`. The intro uses the
same column lines. Use it for reasons, principles, inclusions or comparisons where a card grid would
be too heavy.

### 7.8 Proof components

- **`QuoteAttribution compact`**: the section closer. Quote, then avatar (44px), name, role and company, a 1px vertical divider, and the company logo. Put it after a `border-t border-border` at the end of explanatory sections. **Most explanatory sections should end with one** so every claim has proof next to it.
- **`VideoCard` grid**: 4-up Level-2 cards, video well with a white play button bottom-left.
- **`TestimonialSlider`**: two opposing marquee rows of flat `rounded-2xl` cards (widths 260/310/360 by quote length), with a "See all testimonials" underline link centred below.
- **`TextTestimonialsGrid`** (full testimonial wall, `/testimonials`): a "letters page", not cards. Up to three CSS columns split by a 1px `border` column rule, each entry under a `border-t` hairline with no box, shadow or stars. The quote is `text-lg text-body` with curly quotes and a hanging opening mark (`-indent-[0.45em]`), and its verbatim `highlight` is set `font-medium text-ink` so readers can skim the strongest lines. Attribution as in the slider cards.
- **`ClientLogoMarquee`**: a small serif statement on the left and two opposing logo rows on the right. Takes an optional `title` (JSX, two-tone allowed) in place of the default "12 months" statement. Logo heights are tuned per logo so they share an optical size.
- **`ClientTestimonialAvatarStack`**: overlapping 44px avatars with a rotating ink quote bubble.
- **Footnote**: `text-sm text-fine`, e.g. "Clients stay unnamed under NDA…".

### 7.9 FAQ

`FaqAccordion numbered sidebar`: a sticky left column (H2 + a `bg-surface rounded-2xl p-6` callout
with a CTA) and a right-hand list of flat `rounded-2xl` items. An open item gets the Level-2
shadow, and the toggle turns from `bg-surface` to `bg-ink`. The first item is open by default.

### 7.10 Final CTA

`CTABanner` → `CallToActionCard`. It's the last section of every marketing page and should not be
restyled per page (only the copy changes). Details: a `rounded-[28px]` Level-3 card, `TiltCard max={4}`,
an aria-hidden `grain cta-glow` layer, a serif `text-cta-h2` heading, a `text-lg` lede, and a primary
button with the `shadow-[0_6px_18px_rgba(26,26,24,0.18)]` exception plus trust text beside it.

### 7.11 Pricing plans (`/pricing`)

Plan content lives in `lib/pricing.js` (shared with the WebMCP tools). `PricingPlanCard` is a
`rounded-3xl` white card split into two columns by a hairline (stacked with a `border-t` on mobile):

- **Management card** (`plans`, Level 3): Growth and Scale side by side, each with a sans
  `text-xl font-bold` name → serif `text-5xl` price (`/mo` in `text-fine`) → `text-copy` spend tier,
  with no button per tier. Because the tiers share one service and one next step, the features are
  listed **once** under a `border-t` ("Every management plan includes", two-column `Check` list),
  followed by **one** primary button and the "Free 15-min strategy call · No commitment" trust line.
  Never repeat identical feature lists or identical CTAs per tier.
- **Audit card** (`plan`, Level 2): the one-off purchase, set apart below the retainers with a muted
  eyebrow ("Not ready for management? Start with an audit"), its tier column (with a full-width outline-pill
  "Purchase Audit" button) on the left and its own features on the right, vertically centred.

Prices drop the currency prefix (`$2,000`, not `USD$2,000`); the footnote says "All prices in USD"
alongside the ad-spend and notice terms (`text-sm text-fine`, centred). No "most popular" badges or
coloured highlights. The section ends with a `QuoteAttribution compact` closer. Onboarding steps use
the editorial list (§7.7) with `01`-style numbers inside the H3, vertically centred against the copy.

### 7.12 Case studies (`/results`, `/results/[slug]`)

The reference pages for listing and long-form content.

- **Case study card** (`CaseStudyListCard`): a §7.3 feature card whose `aspect-16/10` well holds a
  `CaseStudyCover`. The whole card is clickable through a stretched `after:` link on the title, and the
  arrow link underneath is a visual `span` that reacts to `group-hover`.
- **Covers** (`CaseStudyCover slug size="card" | "hero"`): JSX artwork, never raster images. Each one
  is a pastel wash with `.grain` plus floating white mockup panels that tell that study's headline
  number. **A new case study needs a new cover variant keyed by its slug.** Each cover gets a
  different hue lead so the set reads as a curated series. Keep clients anonymous.
- **Detail hero** (`CaseStudyHero`): the stage card with a back link, category label, serif H1, the
  excerpt as the lede, and the author (avatar, name, date and read time). Below them, the cover sits
  in a `rounded-[20px]` well inset 8px from the card edge (28 − 8, so the curves nest).
- **Article body** (`CaseStudySection`): editorial rows (§7.7). The heading sits in the left five
  columns, is sticky on desktop, and is numbered `01`, `02`… with a CSS counter. Copy sits in the
  right seven columns at 18px (`.case-study-content`). This is a documented exception: these row
  headings are `h2` but use the sans `text-xl sm:text-2xl font-bold` row style, not the serif
  section H2. All-caps MDX titles are sentence-cased automatically.
- **Screenshots** (`CaseStudyScreenshot`): real Google Ads or report screenshots sit in the
  code-window chrome (three dots, and a centred `text-xs text-muted` label). In MDX, a markdown image's
  title becomes the label: `![alt](/path%20encoded.png "Monthly report")`. URL-encode spaces in
  paths, or the image won't parse.
- **Proof section**: `proofImage`/`proofImageAlt` frontmatter adds a "Straight from the Google Ads
  account" section after the body. The page ends with "More results" (three cards) and then `CTABanner`.

### 7.13 Tools (`/tools/[slug]`)

Every tool page uses `components/tools/ToolPageTemplate.jsx`: `PageHero` (title and registry
description, `showCta={false}` so the tool stays the focus), the tool inside one white Level-2 card
(`rounded-3xl p-5 sm:p-8`), `FaqAccordion numbered sidebar`, then `CTABanner`. The tool UI lives in
`components/tools/<tool>/` and renders inside that card, so it has no outer background of its own.

- **Layout:** input and output columns split by a hairline (`lg:border-r` / `border-t` when stacked),
  like the pricing card. Results may sit in a recessed `bg-surface rounded-2xl` well. No grey cards.
- **Fields:** label `text-sm font-medium text-ink`; input/select/textarea `rounded-xl border
  border-border bg-white text-base`, `placeholder:text-muted`, ink border plus `ring-2 ring-ink/60` on
  focus; selects use a lucide `ChevronDown` in place of the native arrow. Disabled fields go `bg-surface
  text-fine`.
- **Toggles:** option sets (match types, combinations, include) are pill chips: selected `bg-ink
  text-white` with a check icon, unselected white with a `border` ring. The native checkbox stays
  inside the label as `sr-only`. A single per-row checkbox may stay native with the ink accent.
- **Actions:** the tool's main action is the ink pill (Generate, Calculate, or Copy where copying is
  the main action); secondary actions are the outline pill (§8). Icon buttons are ink, `hover:bg-surface`.
- **Output:** generated code or keywords sit in the code-window chrome (§7.12 screenshots /
  `HeroCodeAnimation`), `font-mono`. A copyable single value is a white `rounded-xl` bordered button.
- **Inline code** in tool copy, registry descriptions and FAQ answers is written with backticks in
  data and rendered as `rounded-md bg-surface px-1.5 font-mono text-[0.9em] text-ink`.
- **Errors:** neutral, not red: `text-ink font-medium` with a lucide `CircleAlert` and `role="alert"`.
- **Results:** a status dot (green `#22a55b` only for a positive outcome, otherwise ink or muted)
  and one serif headline stat (`font-display tabular-nums`); supporting numbers are sans `text-xl
  font-bold tabular-nums`.

### 7.14 Service pages (`/services/[slug]`)

Every channel page (Google Ads, then Microsoft, ChatGPT and Meta) uses
`components/services/ServicePageTemplate.jsx`. All copy lives in `lib/services.js`, and the channel
mockups live in `components/services/<slug>/`, registered in `serviceVisuals.js`. A new channel
needs a registry entry and its mockups, with no layout work.

Order: `PageHero` (H1, lede, "See client results", and a real account view as the aside) → logo marquee
→ proof → leaks (editorial list, §7.7) → first 90 days (four §7.3 step cards with a muted timing label
above the numbered H3) → campaign types (a hairline ledger with no boxes: an ink top rule, then rows of H3 and copy across 4/8 columns, stacked on mobile; a uniform label/title/copy card grid reads as a template) → fit (one
Level-2 card split by a hairline: "A good fit" with `Check`, "Not yet" with `Minus`) → pricing →
testimonial slider → FAQ → `CTABanner` (no "other channels" block; the nav's Services menu links the pages).
The leaks, process and campaign sections each end with a `QuoteAttribution compact` closer.

- **Hero visual is real data, not an invented mockup.** Rebuild a real (anonymised) account view as
  faithful platform UI inside `AppWindow` (the §7.12 screenshot chrome), straight on the white stage
  card with no pastel frame, and caption it with a link to the source. Until a channel has numbers to
  show, the hero shows the *setup* in that platform's UI (Meta Events Manager, the Microsoft import, a
  ChatGPT sponsored card) with no performance figures at all. Floating cards on a gradient with
  made-up round numbers read as AI-generated.
- **Step cards** carry `*Mini` mockups only where a channel has them (Google Ads). Without them the
  card drops its well and stays text-only. Don't add invented-number mockups to fill the space.
- **Proof has three modes.** `case-studies` reuses `ResultsProof`. `method` (ChatGPT, Meta and
  Microsoft for now) shows the same Google Ads results, with copy that says plainly they're from Google
  Ads and that the measurement carries over. `snapshots` replaces it once a channel has real numbers:
  the same `ResultCard` stat cards with no link, plus a footnote saying how much of that channel I run.
  Never present Google Ads results as another channel's.
- **Pricing** reads `lib/pricing.js`, because every channel is priced the same. It's one Level-2 card
  split by a hairline: Growth and Scale on the left (stacked below `sm`), the shared feature list and
  one primary button on the right, and a fine-print line naming who bills the ad spend.
- **Indexing:** `indexable: false` renders "noindex, follow" and leaves the page out of the sitemap.
  `/services/google-ads` is noindexed so it never competes with the homepage for "saas google ads agency".

### 7.15 Call confirmation (`/call-confirmation`)

The page Fillout redirects to after someone books. The visitor has already done the one thing every
other page asks for, so **this page has no "Book a 15-min call" button anywhere** (documented
exception to §8's repeated primary action):

- **Hero:** `PageHero` with `showCta={false}`, a "Call booked · 15 min on Google Meet" pill with the
  semantic green dot, and an H1 personalised from Fillout's `name` URL parameter (first name only,
  validated, plain fallback). A "Need a different time? Email me" line sits where the CTA row would.
  The aside is `CallAgendaWindow`: the call's four-part agenda in `AppWindow` chrome, with the fit-check
  segment as the one pastel element and no performance numbers.
- **Sections:** "Before we meet" (editorial list §7.7, numbered prep steps), "What you'll leave with"
  (the service-page fit card split into "What you'll get" / "What it isn't", then a disqualifier line),
  each closed by a `QuoteAttribution compact`; then the video testimonial grid.
- **FAQ:** `FaqAccordion numbered sidebar` with `sidebar.action` replacing the booking button with an
  arrow link to email for rescheduling.
- **Final card:** `CallToActionCard` with its `action` prop: same card, glow and tilt, but the button
  is an ink pill "Read the case studies" (to `/results`) instead of `ScheduleCallButton`.
- **Indexing:** `noindex, follow` and not in the sitemap. `CallConfirmationPostHogCapture` must stay on
  the page (it fires the `discovery_call_confirmed` and GA `book_call` conversions).

---

## 8. Buttons, links and icons

| Element | Spec |
|---|---|
| **Primary** | `ScheduleCallButton`. Pill, `bg-ink text-white font-semibold text-base`, Google Meet icon + label, `hover:bg-[#2d2d2a]`. Sizes: `nav`, `desktop` (default), `mobile` (full-width in menu). Label: **"Book a 15-min call"** |
| **Outline pill** | `ScheduleCallButton variant="secondary"` or a `Link` with the same classes: `bg-white text-ink ring-1 ring-ink ring-inset hover:bg-surface`, same size as the primary. Only for a second, different action that needs a full button beside or below a primary (the Purchase Audit button) |
| **Secondary (beside primary)** | `border-b border-ink px-1 py-3.75 text-base font-semibold text-ink`, lining up with the pill. E.g. "See client results" |
| **Arrow link (in cards)** | `inline-flex items-center gap-1 border-b border-ink text-base font-semibold text-ink hover:border-body hover:text-body` + `<ArrowRight className="h-4 w-4" strokeWidth={2} />` |
| **Inline text link** | `font-semibold text-ink underline decoration-ink underline-offset-2` |
| **Nav/footer links** | `text-base`, `text-ink`/`text-body`, hover shifts one step (`hover:text-body` / `hover:text-ink`), `transition-colors` |

- One primary action per page, repeated: hero, an optional mid-page repeat, the FAQ sidebar and the final CTA. Don't invent competing primary CTAs.
- No `rounded-2xl` buttons, no gradient or coloured buttons, no grey (`zinc`) secondary buttons on new work.
- **Icons:** `lucide-react` only, in ink, `strokeWidth={1.75}` for list icons (`h-5.5`/`h-6`), `2` for small UI (arrows). Icons sit beside text and never go in coloured circles or tiles.

---

## 9. Motion

Motion is subtle, eased and optional. **Every animation respects `prefers-reduced-motion`.**

| Motion | Where | Spec |
|---|---|---|
| Word reveal | Hero H1 only | `.reveal-word`, 700ms, 40ms stagger, blur + rise |
| Count-up | Headline stats | `<CountUp>`, 1400ms easeOutExpo, on scroll into view, SSR shows the final value |
| Marquee | Logos (48s), testimonials (70s) | Two rows in opposite directions, edges masked with `linear-gradient(90deg, transparent, #000 8–10%, #000 90–92%, transparent)` |
| Tilt | Final CTA only | `TiltCard max={4}`, mouse/pen only |
| Accordion | FAQ | `grid-rows-[0fr→1fr]`, 300ms ease-out |
| Nav | On scroll | transparent → `bg-white/80 backdrop-blur-md` + nav shadow, 300ms |
| Hover | Links, buttons | Colour shifts only, `transition-colors` |

Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`. No bounce, no parallax, no scroll-jacking, and no
hover-lift on cards. The tilt and the reveal are the only two "moments" on a page.

---

## 10. Texture

`.grain` adds a fine SVG-noise overlay (`mix-blend-mode: overlay`, 50%). Put it on pastel surfaces
(illustration frames, highlighted mockup bars, the CTA glow) so colour reads as printed. Never on
white cards or text.

---

## 11. Imagery

- **Photos** (avatars, headshots) are shown as-is, round, `object-cover`, with no filters.
- **Client logos** keep full colour, heights are tuned per logo for optical balance, and they come from `clientLogosData.js`.
- **Press logos** are decorative (`aria-hidden`) when the publication is already named in the copy.
- **No stock photography, 3D blobs, emoji or AI-art illustrations.** Visuals are product mockups built in JSX (§7.5–7.6) or real screenshots and video.
- The logo is always `components/ui/Logo.jsx` (wordmark text + three-circle mark), never an image.

---

## 12. Voice and copy

The design depends on the copy style as much as the layout. New pages must sound like the homepage.

- **First person singular.** "I plan, build and manage your Google Ads myself." It's a real person, not "we" and not "our team".
- **Outcomes in business metrics.** Trials, demos, pipeline, new MRR, payback months. Clicks and CTR are "inputs" that "stay in the appendix".
- **Specific numbers.** "$2,219 new MRR in the first 30 days", "8+ years", "85+ verticals", "from $2,000". Not "tons of results".
- **Honest disqualifiers.** "If they look like a poor fit for paid search, I'll say so before we start." / "I'm probably not the right hire yet." These are part of the brand.
- **Short declaratives.** Mostly one idea per sentence, no hype words ("revolutionary", "supercharge", "unlock"), no exclamation marks outside quoted testimonials, and never an em dash (use a full stop, comma or parentheses instead).
- **Headings:** sentence case, statements rather than questions (FAQ aside), under about 10 words.
- **Quotes** are verbatim from real clients, with name, role and company. Excerpts must be exact substrings of the full quote.
- **CTA copy:** "Book a 15-min call". Trust line: "Free 15-min strategy call · No commitment".

---

## 13. Accessibility

- Semantic structure: one `h1` per page, `section[aria-labelledby]`, lists as `ul`/`ol`, quotes as `figure`/`blockquote`/`figcaption`, cards as `article`/`li`.
- Decorative layers (`GridFrame` lines, grain, glow, mockups) are `aria-hidden`. Meaningful illustrations use `role="img"` + `aria-label`.
- Marquee duplicates are `aria-hidden` with empty `alt`.
- Focus rings: `focus-visible:ring-2 ring-ink/60 ring-offset-2`.
- Text contrast: ink/body/fine on white or paper all pass AA. `muted` is for short labels only.

---

## 14. Known debt — do not copy

These exist in the codebase but **are not** the system. Fix them when you touch them:

- `FloatingOptInWidget`: navy accent bar, zinc text, inline font sizes, sub-12px trust text, cool-grey gradient card. Needs restyling to §3/§6.
- `ClientTestimonialAvatarStack` CTA link uses navy `#0c2237` and its trust text uses `text-zinc-700`.
- Navbar mobile/tool hovers use `hover:bg-zinc-100` (should be `hover:bg-surface`), and the hamburger is a text glyph rather than a lucide icon.
- Pre-redesign components (e.g. `VideoTestimonialCard`, `Card`, `Button`, the old non-homepage `illustrations/*`) live in `_archive/` at the repo root (`PageHeadline` stays in `components/ui/` only for the test page). Never import from `_archive/`; use `VideoCard` and the patterns above instead.

---

## 15. Checklist for any new page or section

- [ ] Wrapped in `GridFrame`, separated by `GridDivider`, on the `bg-page` canvas with no section background
- [ ] 1120px container with standard horizontal padding
- [ ] Section padding from §5.1, intro → content `mt-10 sm:mt-14`
- [ ] Serif only on H1 / H2 / CTA / headline stats. H3s are sans `text-xl font-bold`
- [ ] Only neutral tokens in chrome. Pastels only inside illustration wells or mockups
- [ ] Cards use a radius and elevation level from §6, with warm shadows only
- [ ] Primary CTA is `ScheduleCallButton` "Book a 15-min call". Secondary CTAs are underline links
- [ ] Explanatory sections end with proof (quote, stat or case-study link)
- [ ] Copy is first person, metric-led, with no hype
- [ ] Ends with `CTABanner`
- [ ] Reduced-motion respected, `aria-labelledby` on sections, decorative layers `aria-hidden`
- [ ] Mobile checked at 375px: single column, no horizontal scroll, text minimums met
- [ ] Sitemap updated if a route was added (see `AGENTS.md`)
- [ ] If you deviated from this brief, you updated this brief
