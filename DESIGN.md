# Design Brief — adsthatconvert.co

> **Status: locked (30 Sept 2026).** This brief is taken from the homepage as built on
> `redesign/editorial-system` (`app/page.jsx` and the components it renders). It is the
> source of truth for how every page on the site looks and reads.
>
> **Read this before building a new page, restyling an old page, or changing any component on the
> homepage.** If a change you want isn't covered here, or goes against it, update this file in the
> same change and say why. Don't let the code and this brief drift apart.
>
> **Revised 12 Oct 2026** after a landing page audit: the H1 is now the largest headline (§4.2),
> small labels moved from `muted` to `fine` for contrast (§3.1), heroes are left-aligned on mobile
> (§7.1), and card rows no longer stack into long columns on mobile (§7.3, §7.8).
>
> **Superseded (25 Oct 2026): the whole site now uses the conversion-led system in §16.** It
> started on the homepage (23 Oct), then the service pages (24 Oct), `/pricing` and finally every
> other page (25 Oct). **Build every new page and component from §16.** §1–§15 are kept as a
> record of the editorial system; the components they describe now live in `_archive/`. The only
> page still on it is the internal `/test/hubspot-form`.
>
> On visual design, this file takes precedence over `AGENTS.md`. `AGENTS.md` still covers
> engineering conventions (routing, sitemap, HubSpot forms, file layout).

---

## 1. The idea in one paragraph

An editorial, founder-led page on warm paper. Big serif headlines (Instrument Serif) sit over plain,
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
  thin "+" marker (15px across, 1.5px arms, with a 5px paper gap to the lines) where it crosses each vertical. **Every section is wrapped in a `GridFrame`, and adjacent
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
| `--color-fine` | `#6b6963` | `text-fine` | Fine print, trust lines, attribution role/company, card labels, eyebrows, FAQ numbers |
| `--color-muted` | `#8a877f` | `text-muted` | The muted half of a two-tone H2, meta text inside mockups and window bars, placeholders and disabled states. It measures 3.6:1 on white and 3.2:1 on paper, so it fails AA below 24px: never use it for real labels or body copy (use `text-fine`) |
| `--color-border` | `#e2e0da` | `border-border` | Every hairline: cards, dividers, rows |
| `--color-surface` | `#f3f2ef` | `bg-surface` | Recessed wells *inside* cards (illustration/video wells), FAQ toggle and hover, FAQ sidebar callout, mockup window bars |
| `--color-page` | `#f2f0ef` | `bg-page` | The page canvas (set once in `layout.jsx`), status pill fill |
| — | `#fff` | `bg-white` | Every card and stage card |

Grid lines use `bg-border/60`. The grid "+" markers use `text-muted/40`, a step darker than the lines.

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

Adopted site-wide in Oct 2026 after a homepage trial (it replaced Source Serif 4; Geist was trialled
for body text and dropped in favour of Google Sans).

| Role | Font | How |
|---|---|---|
| Display serif | Instrument Serif, 400 normal + italic only | `--font-display-serif` via `.font-display`: weight 400, line-height 1.06, tracking −0.01em |
| Everything else | Google Sans (400–700), Figtree fallback | Default on `body` and `h1–h6` |
| Code in mockups and tools | Geist Mono | `--font-geist-mono` on `.font-mono` |

**The serif is used only for:** the hero H1, section H2s, the final CTA heading, headline stats
(`ResultCard` metric, case study stats and cover metrics), and the marquee's statement heading. H3s,
card titles, quotes, body, nav, buttons, labels, tables and all mockup UI stay sans.

- **Never bold the serif.** It only has one weight, so `font-medium!`/`font-bold` would be faked by the
  browser. No heading uses `font-medium!` any more.
- Never below 20px.
- **Italic accent:** at most one `<em>` per headline. The final CTA ("customers") gets one;
  the hero H1 and ordinary section H2s don't. The accent stays `text-ink`, because there's no
  accent colour in §3.

### 4.2 Scale in use

| Element | Classes |
|---|---|
| Hero / page H1 | `font-display text-h1 text-ink` (36px → 48px `sm` → 72px `lg`) |
| Homepage H1 on phones | Documented exception: `max-sm:text-[2.5rem]` (40px instead of 36px) in `Hero.jsx` only |
| Section H2 | `font-display text-h2 text-ink text-balance` (36px → 48px `sm`) |
| Final CTA H2 | `font-display text-cta-h2 text-ink` (36px → 48px `sm`) |
| Statement H2 (small) | `font-display text-2xl leading-[1.3]! text-ink` (logo marquee) |
| Headline stat | `font-display text-4xl tabular-nums text-ink sm:text-5xl` (48px → 36px mobile) |
| Card H3 | `text-xl font-bold text-ink` (20px). Editorial-row H3: `text-xl sm:text-2xl` |
| Section intro / lede | `text-lg leading-[1.5] text-body text-pretty` (18px) |
| Card and list copy | `text-copy leading-[1.5] text-body` (17px) |
| Quote (compact) | `text-lg font-medium leading-[1.5] text-ink` |
| Quote (wall card) | `text-lg font-medium leading-[1.5] text-ink text-wrap-pretty` |
| Name in attribution | `text-base font-bold tracking-[-0.03em] text-ink` (`text-sm` in wall cards / `text-lg` in video cards) |
| Role / company | `text-sm leading-[1.5] text-fine` |
| Card label / meta | `text-sm font-medium leading-[1.5] text-fine` |
| Step number | `text-sm font-medium text-body tabular-nums` rendered as `01`, `02`… |
| Fine print | `text-sm text-fine` |
| Mockup UI | `text-xs`–`text-sm`, with `text-[0.8125rem] font-bold` for mockup titles. Floor is 12px |

- **The H1 is the largest text on a page.** Section H2s, the final CTA heading and headline stats
  all sit below it, so the main promise is never the quietest headline. Don't raise one of them
  past `text-h1`.
- `text-h1`/`text-h2`/`text-cta-h2` resize automatically (`globals.css` media blocks).
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
   **Latest case study line** (homepage, `LATEST_CASE_STUDY` in `Hero.jsx`, same slot): from `sm` up a transparent outline pill (`rounded-full border border-border`, no fill, `py-1.5 pr-4 pl-3.5`) holding the client logo, hairline divider and "**New case study:** <text> →" in `text-sm text-fine`, linking to the study. On phones it is plain centred text with no pill. Below `sm` the logo is hidden and the line reads "**New Case Study:** <shortText>" (centred, may wrap to two balanced lines) and the divider is hidden.
2. **H1**: `font-display text-h1`, with the `.reveal-word` stagger (homepage only, or a page's single hero).
3. **Lede**: `text-copy sm:text-lg text-body max-w-[30em]`.
4. **Icon value list** (optional): lucide icon `h-6 w-6 strokeWidth={1.75}` in ink + `text-copy text-body`.
5. **CTA row**: primary pill + secondary underline link, `gap-6`. Below `sm` the pill is full-width (`w-full sm:w-auto`) with the link under it. On the homepage a one-line reassurance sits under it in `text-sm text-fine` ("15 minutes with me, not a sales rep. You'll leave with a go or no-go on paid search.").
6. **Social proof**: `ClientTestimonialAvatarStack`.

**The homepage hero is a single centred column** (`mx-auto max-w-[920px] text-center`, wide enough for the H1 and its inline headshot to sit on two lines) with no
right-hand visual (the old animated code window, `HeroCodeAnimation`, is archived): H1, lede, CTA row and avatar stack are centred, and the icon list is a centred
block with left-aligned rows. `PageHero` with an `aside` is still two columns
(`lg:grid-cols-[minmax(0,1fr)_460px]`) with a product visual on the right. On mobile `PageHero` is one column, **left-aligned** like every section below
it, and the visual is hidden.

**Internal pages** (results, tools, services, call confirmation) use the same stage card
through **`components/sections/PageHero.jsx`**: optional `pill`, `title` (string titles get the word
reveal), `description`, `secondaryLink`, and an optional `aside` for the right-hand visual (hidden
below `lg`). `/results` is the reference implementation, with `ResultsLedger` as the aside. This
replaces the old `PageHeadline` pattern, which survives only on the `/test/hubspot-form` page. Don't revive it.

**Documented exception: `/testimonials` has no hero.** It opens straight on its content in a
`bleedTop` frame (the video testimonial grid), because the page explains itself. The H1 is kept as
an `sr-only` heading for screen readers and SEO. (`/pricing` moved to the §16 system on 25 Oct 2026,
§16.9.)

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
equal across a row. **Below `sm`, `FitThenBuild` and `WhoIsThisFor` hide the well** (`hidden sm:block`,
card `sm:pt-2`) and stay text-only, so three or four cards don't stack into several screens. Grids: `sm:grid-cols-2 lg:grid-cols-4` (steps), `md:grid-cols-3` (points),
`lg:grid-cols-4` (videos). Steps are an `<ol>` with an `01` number inside the H3.

### 7.4 Stat card

`ResultCard` in `ResultsProof.jsx`: `rounded-3xl` Level-2, `px-6 pt-6 pb-6 sm:px-7 sm:pt-7`. Content
in order: muted label → serif `text-6xl` metric with `<CountUp>` → `text-lg font-medium` stat line
→ `border-t` divider → `text-copy` description → arrow link. The label is `text-fine` (a `logoSrc` prop can add a client
logo, but the homepage cards don't use it). Homepage grid: four cards,
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`, and each card is a `row-span-5 grid-rows-subgrid`
(`subgrid` prop) so labels, numbers and dividers line up when one card's copy wraps. Service pages keep
the auto-fit grid: `grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5`.

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
top. Below `sm` the panels stack in normal flow (`flex flex-col gap-4 p-5`) because they can't
offset in a narrow frame, and the panels are opaque so nothing shows through. It's used in a split section (`lg:grid-cols-2 items-center gap-10`, illustration first). It's
the only place a large pastel field is allowed, and each page should have at most one or two.

### 7.7 Editorial list

`WhyFoundersStay`: a 12-column grid, heading `lg:col-span-5`, copy `lg:col-span-7`, `lg:gap-x-10`.
Rows are `border-b border-border py-7 sm:py-8` under a `border-t` on the `<ul>`. The intro uses the
same column lines. Use it for reasons, principles, inclusions or comparisons where a card grid would
be too heavy.

### 7.8 Proof components

- **`QuoteAttribution compact`**: the section closer. Quote, then avatar (44px), name, role and company, a 1px vertical divider (`sm` and up only), and the company logo. Logo heights come from the `logoHeightBySrc` map in the component (`h-7` to `h-10`, default `h-8`) so no logo outweighs the person's name: add an entry when you use a new logo. Put it after a `border-t border-border` at the end of explanatory sections. **Most explanatory sections should end with one** so every claim has proof next to it.
- **`VideoCard` grid**: 4-up Level-2 cards, video well with a white play button bottom-left. Below `lg` it's a scroll-snap swipe row (one card plus a peek of the next), not a stack.
- **`TestimonialSlider`**: two opposing marquee rows of flat `rounded-2xl` cards (widths 260/310/360 by quote length), with a "See all testimonials" underline link centred below.
- **`TextTestimonialsGrid`** (full testimonial wall, `/testimonials`): a "letters page", not cards. Up to three CSS columns split by a 1px `border` column rule, each entry under a `border-t` hairline with no box, shadow or stars. The quote is `text-lg text-body` with curly quotes and a hanging opening mark (`-indent-[0.45em]`), and its verbatim `highlight` is set `font-medium text-ink` so readers can skim the strongest lines. Attribution as in the slider cards.
- **`ClientLogoMarquee`**: a small serif statement on the left and two opposing logo rows on the right. Takes an optional `title` (JSX, two-tone allowed) in place of the default "12 months" statement. Logo heights are tuned per logo so they share an optical size.
- **`ClientTestimonialAvatarStack`**: overlapping 44px avatars with a rotating ink quote bubble.
- **Footnote**: `text-sm text-fine`, e.g. "Clients stay unnamed under NDA…".
- The homepage doesn't use `TestimonialSlider` (Oct 2026): its quotes repeated the hero avatar stack. It's still used on `/results` and service pages.

### 7.9 FAQ

`FaqAccordion numbered sidebar`: a sticky left column (H2 + a `bg-surface rounded-2xl p-6` callout
with a CTA) and a right-hand list of flat `rounded-2xl` items. An open item gets the Level-2
shadow, and the toggle turns from `bg-surface` to `bg-ink`. The first item is open by default.

### 7.10 Final CTA

`CTABanner` → `CallToActionCard`. It's the last section of every marketing page and should not be
restyled per page (only the copy changes). Details: a `rounded-[28px]` Level-3 card, `TiltCard max={4}`,
an aria-hidden `grain cta-glow` layer, a serif `text-cta-h2` heading, a `text-lg` lede, and a primary
button with the `shadow-[0_6px_18px_rgba(26,26,24,0.18)]` exception plus trust text beside it.
Beside the copy on desktop (behind a `border-l`), and under it on mobile (behind a `border-t`), sits
one short client quote with a face, so the last decision on the page has proof next to it. It
defaults to a `textTestimonials` entry; pass `proof={null}` to drop it.

### 7.11 Pricing plans (`/pricing`)

Moved to the §16 system on 25 Oct 2026 (§16.9). The old `PricingPlanCard` and
`components/pricing/Plan*` are in `_archive/`.

### 7.12 Case studies (`/results`, `/results/[slug]`)

The reference pages for listing and long-form content.

- **Case study card** (`CaseStudyListCard`): a §7.3 feature card whose `aspect-16/10` well holds a
  `CaseStudyCover`. The whole card is clickable through a stretched `after:` link on the title, and the
  arrow link underneath is a visual `span` that reacts to `group-hover`.
- **Covers** (`CaseStudyCover slug size="card" | "hero"`): JSX artwork, never raster images. Each one
  is a pastel wash with `.grain` plus floating white mockup panels that tell that study's headline
  number. **A new case study needs a new cover variant keyed by its slug.** Each cover gets a
  different hue lead so the set reads as a curated series (lavender, ice, blush, mint are now all used;
  a fifth study repeats a lead hue with a different secondary). Keep clients anonymous unless they
  have approved being named (Rezi has). A named study sets `proofCaption`, since the default caption
  says the client is unnamed under NDA, and sets `clientName` + `clientLogo`: the real-colour logo
  sits before the category in the hero (`h-7`, hairline divider) and before the meta line on the
  card (`h-4.5`).
- **Detail hero** (`CaseStudyHero`): the stage card with a back link, category label, serif H1, the
  excerpt as the lede, and the author (avatar, name, date and read time). Below them, the cover sits
  in a `rounded-[20px]` well inset 8px from the card edge (28 − 8, so the curves nest).
- **Stat strip** (`CaseStudyStats`, optional `stats` frontmatter): the headline numbers as one Level-2
  `rounded-3xl` card split into cells (label `text-fine`, serif value, `text-fine` detail), two columns
  on mobile and one row from `lg`. Sits at the top of the article body.
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
  `AppWindow`), `font-mono`. A copyable single value is a white `rounded-xl` bordered button.
- **Inline code** in tool copy, registry descriptions and FAQ answers is written with backticks in
  data and rendered as `rounded-md bg-surface px-1.5 font-mono text-[0.9em] text-ink`.
- **Errors:** neutral, not red: `text-ink font-medium` with a lucide `CircleAlert` and `role="alert"`.
- **Results:** a status dot (green `#22a55b` only for a positive outcome, otherwise ink or muted)
  and one serif headline stat (`font-display tabular-nums`); supporting numbers are sans `text-xl
  font-bold tabular-nums`.

### 7.14 Service pages (`/services/[slug]`)

Moved to the homepage system on 24 Oct 2026. See **§16.8**. The earlier `PageHero`/`ResultsProof`
version is in `_archive/components/services/`.

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
| **Arrow link (in cards)** | `inline-flex items-center gap-1 border-b border-ink text-base font-semibold text-ink hover:border-body hover:text-body` + `<ArrowRight className="h-4 w-4" strokeWidth={2} />`. Add `relative after:absolute after:-inset-x-2 after:-inset-y-2.5` so the tap target reaches 44px without moving the underline |
| **Inline text link** | `font-semibold text-ink underline decoration-ink underline-offset-2` |
| **Nav/footer links** | `text-base`, `text-ink`/`text-body`, hover shifts one step (`hover:text-body` / `hover:text-ink`), `transition-colors` |

- One primary action per page, repeated: hero, an optional mid-page repeat, the FAQ sidebar and the final CTA. Don't invent competing primary CTAs.
- **Mobile booking bar** (`components/ui/MobileBookingBar.jsx`, homepage): below `lg` the nav has no booking button, so a floating `ScheduleCallButton size="mobile"` sits `fixed inset-x-4 bottom-4` (centred, auto width from `sm`) with the nav shadow. It fades in once the hero is off screen and hides whenever an element marked `data-booking-cta-zone` (hero, final CTA section, footer) is visible, so two booking buttons never show at once. Mark any new section that carries its own primary button the same way if the bar would double up with it.
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
| Nav | On scroll | transparent → `bg-white/92 backdrop-blur-md` + nav shadow, 300ms. Kept near-opaque so page text doesn't read through the pill |
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

- **First person singular.** "I plan, build and manage your Google Ads." It's a real person, not "we" and not "our team".
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
- Text contrast: ink/body/fine on white or paper all pass AA. `muted` does not, so it's limited to display-size headline text and mockup meta (§3.1).
- Tap targets are at least 44px. Where the visual is smaller (nav menu button, arrow links), extend the hit area with an `after:` pseudo-element.

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

---

## 16. Homepage conversion system (23 Oct 2026)

The homepage (`/`) was rebuilt from the Paper file "Ads That Convert Site". The artboards that
match the live site are "Homepage – Live (Desktop)" (1440px) and "Homepage – Live (Mobile)"
(390px), plus "Nav dropdowns – Promptwatch direction". "Homepage – Previous (…)" are the earlier
versions, kept for reference. It deliberately replaces §1–§15 **on the homepage, the
`/services/*` pages** (rolled out on 24 Oct 2026, §16.8) **and `/pricing`** (25 Oct 2026, §16.9). Since 25 Oct 2026 it
covers every page (§16.10–§16.14).

### 16.1 Where it lives

- `app/page.jsx` composes `components/home/*`. Metadata and JSON-LD are unchanged.
- `app/layout.jsx` renders `HomeNavbar` and `HomeFooter` on every page (the old `Navbar`, `Footer`
  and `ChromeSwitch` are in `_archive/`). On `/call-confirmation` the nav's booking button becomes a
  "Read the case studies" link, because the visitor has just booked.
- Google Sans is loaded (and preloaded) with `next/font` in `app/layout.jsx` as
  `--font-google-sans`; `body`, `h1`–`h6` and `font-hp` resolve to it. Geist is loaded once in
  `components/home/GeistFont.jsx`, rendered by the layout, which writes `--font-geist-sans` onto
  `:root` for `font-hp-display`. Geist Mono is `--font-geist-mono` from the layout. Figtree and
  Instrument Serif are still declared (not preloaded) for the internal `/test` pages only.
- Inner pages open with `components/home/HomePageHero.jsx` (centred hero: optional pill, H1 with
  the dashed accent, lede, optional booking row and avatar stack), except case studies and
  `/call-confirmation`, which use split heroes.
- Shared pieces are in `components/home/primitives.jsx`: `Section`, `AccentHeading`,
  `SectionHead`, `BookButton`, `QuoteRow`, `focusRing`, `accentClass`, `hpBookingBarButton`.
- Homepage sections that service pages reuse take props whose defaults are the homepage copy
  (`HomeResults`, `HomeTestimonials`, `HomeFaq`, `HomeFinalCta`), and `HomeProcess`,
  `HomeWhoFor`, `HomeHero` and `HomeWhyFounders` export their mockups and data. Changing a default
  changes the homepage.

### 16.2 Colour (`@theme` tokens in `globals.css`)

| Token | Hex | Use |
|---|---|---|
| `hp-ink` | `#0E0F11` | Headings, primary text, buttons |
| `hp-body` | `#4B5059` | Intros and ledes |
| `hp-text` | `#3D4148` | Hero value props |
| `hp-soft` | `#5B616B` | Card and step body copy |
| `hp-fine` | `#6B7280` | Roles, attribution, mono labels |
| `hp-muted` | `#6F747D` | The grey half of two-tone headings, footer labels, mockup meta. Paper has `#8A8F98`; darkened to pass AA (4.5:1 on white and `#FAFAFA`) |
| `hp-line` | `#EAEBED` | Every section and grid hairline |
| `hp-line-soft` | `#EEEFF1` | Hairlines inside cards |
| `hp-band` / `hp-wash` | `#FAFAFB` / `#FAFAFA` | Quote bands, mid-page CTA band, FAQ ask card, footer surround |
| `hp-tray` | `#F4F4F5` | Mockup trays, dropdown hover |
| `hp-accent` | `#155EEF` | Accent half of every headline, step numbers, headline stat |
| `hp-icon` | `#2457E6` | Lucide icons in the "person on the call" list |
| `hp-up` | `#15803D` | Positive deltas in mockups (Paper `#16A34A`, darkened for AA) |

The page is white. Mockups may use their own literal hex (chart blues `#C7D6FC`/`#6E95F5`/`#1640B8`,
tag colours, Google link blue, HubSpot/Stripe brand fills), as with the §7.5 exception.

### 16.3 Type

- Headlines are Geist (`font-hp-display`): every H1, section H2 (`AccentHeading`, final CTA,
  case-study section heads, "More results/tools"), and headline stats and prices. Everything else
  (H3 card titles, body, UI, buttons, nav, footer, mockups) is Google Sans (`font-hp`, also the
  `body` and `h1`–`h6` default) since 28 Oct 2026. Code, labels and event names are Geist Mono
  (`font-hp-mono`). No serif.
- H1: 36/42 → 48/56 (`sm`) → 64/72 (`lg`), weight 500, tracking -0.035em. Contains a tilted
  Google Ads tile and ends with the accent phrase.
- Section H2 (`AccentHeading`): 30/36 → 40/46 at `lg`, weight 500, tracking -0.03em, always two
  lines: an ink lead line and an ink accent line marked with a **hand-drawn highlighter stroke**
  (24 Oct 2026, `.hp-marker` in `home.css`). The stroke is `#155EEF` at 34% with fainter streaks,
  drawn as an SVG background (`components/home/markerStrokes.js`) and repeated per wrapped line
  with `box-decoration-break: clone`. Each heading on a page passes a different `marker` index
  (0–7), so no two strokes repeat. Don't reuse one index twice on a page, and don't fall back
  to a uniform rectangle.
- The **hero H1 and final CTA heading keep the blue accent text with the dashed underline**
  (`accentClass`, `#155EEF` at 50%, offset 6–7px). They're the page's two hero-weight moments;
  every section H2 between them uses the highlighter. Final CTA H2: 38/44 → 52/60 → 68/74,
  underline 3px at `lg`.
- H3s: 22/28 (26/32 for process steps at `lg`, 21/27 for reasons), weight 500, two-tone (ink +
  `hp-muted`).
- Body: 16/25 for intros, 17/25 for testimonial quotes, 15–16px elsewhere.
- Because the global `h1`–`h6` rule in `globals.css` is unlayered, homepage headings put their
  type styles on inner `span`s (block-level), not on the heading element.
- Deliberate departures from the AGENTS.md minimums, as designed: mono labels at 11–12px, fine
  print and legends at 13px, some links at 14–15px. Mockup text follows the §4 mockup floor (12px).

### 16.4 Layout

- Each section is a full-width band with a bottom hairline (`border-hp-line`) and a 1120px
  column. The column's side hairlines show only when the viewport is wider than the column
  (`min-[1121px]:border-x`), which forms the page grid. Inside, cells are split by hairlines, not
  gaps or cards.
- Horizontal padding: 20px (phones) → 32px (`sm`) → 48px (`lg`). Section heads: `pt-12 pb-7` →
  `lg:pt-24 lg:pb-14`, H2 left and a 400px intro right-aligned to its baseline (`SectionHead`).
- The desktop layout switches in at `lg` (1024px). Step 3's keyword card shows from `xl` only, so
  it isn't clipped on narrow desktops.

### 16.5 Components

- **Buttons:** every "Book a 15-min call" is `BookButton`, which wraps `ScheduleCallButton` with
  `variant="bare"` (same Fillout popup, PostHog `schedule_call_clicked` event and Google Meet logo).
  Ink fill, `rounded-[10px]` (nav `rounded-lg`, full-width mobile `rounded-xl`), Geist 500. The
  final CTA button adds a soft blue glow shadow. Secondary links are underlined text.
- **Logo** (25 Oct 2026, explored on the Paper page "Logo exploration"): the existing three-dot
  mark, with the last dot (the conversion) in `hp-accent` and the viewBox cropped to the shape so
  it matches the wordmark's height. Favicons and the email/schema PNGs come from
  `scripts/generate-logo-assets.mjs` (AGENTS.md, Logo Standard).
- **Nav:** white bar with a bottom hairline, sticky. Dropdowns (Services with brand icons, Tools)
  open on hover and keyboard focus: white, `rounded-2xl`, `#E4E6EA` border, 8px padding, rows
  `rounded-xl` with `hp-tray` hover. Dropdown triggers carry `SketchChevron` (an inline,
  hand-drawn chevron in `HomeNavbar.jsx`, `hp-muted`, flips and darkens to `hp-ink` on open):
  a documented exception to lucide-only icons, used for the nav dropdowns only. Mobile: 38px
  outlined menu button opening a full-screen overlay (25 Oct 2026) built like a §16 page: a top bar
  matching the nav, full-bleed hairlines, `Eyebrow` labels ("01 · Services", "02 · Explore"), the
  four services as a 2×2 hairline grid with brand icons in small outlined tiles, Results /
  Testimonials / Pricing as rows with a one-line note and an arrow, and "Free tools" as an
  accordion (same chevron) whose rows sit on `hp-band` with mono numbers. A booking panel is
  pinned to the bottom on `.hp-cta-dots`: Mitch's headshot, "Talk to me, not a sales rep", and the
  full-width `BookButton` with the final CTA's blue glow. Blocks fade up in turn on open (none
  with reduced motion); Escape closes it.
- **Hero:** case-study pill, H1, lede, three value props with small tilted tiles, CTA + "See
  client results", microcopy, client avatar stack (`HomeAvatarStack`): hover, focus or tap shows
  the client's quote in an ink tooltip below the avatar.
- **Video testimonials:** four columns split by hairlines from `lg`; below that a snap-scrolling
  swipe row of bordered cards (`rounded-[18px]`) with position dots. Mux animated.webp previews,
  player loaded on play. No `.video-grade` filter on the homepage.
- **Quote bands** (`QuoteRow`): `hp-band` strip under a section, avatar + quote + name, role and
  client logo.
- **Process, fit and reasons** cells each pair a short two-tone H3 with a decorative,
  `aria-hidden` mockup. Mockup numbers are illustrative.
- **FAQ:** accordion over `lib/faqs.js` (same data as the FAQ schema), first item open, numbered
  on desktop, "Couldn't find an answer?" card.
- **Final CTA:** light dot grid (`.hp-cta-dots`) that fades out behind the copy, with a faint blue
  glow from the bottom edge.
- **Footer:** white column on a `hp-wash` surround; brand + press logos, Company / Tools /
  Contact, social icons and copyright.

### 16.5a Surfaces and section labels (24 Oct 2026)

Added after review because the page felt too white and sparse. Explored in Paper and now part
of the "Homepage – Live" artboards. Styles live in `components/home/home.css`.

- **Hatched margins** (`.hp-hatch`, on by default in `Section` and on the nav): from 1121px the
  margins outside the 1120px column carry a faint 135° hatch on `#FBFBFC`; the column stays white.
  The final CTA (`hatch={false}`) and footer keep their `hp-wash` surround.
- **Section labels** (`Eyebrow`, via `eyebrow` on `AccentHeading`/`SectionHead`): a 7px blue
  square, a Geist Mono 12px uppercase label ("02 · RESULTS") and a 48px hairline, 20px above the
  H2. Numbered 01–07 down the page; decorative, so `aria-hidden`. Section heads tightened to
  `lg:pt-18 lg:pb-12`.
- **Hero dot grid** (`.hp-hero-dots`): the final CTA's dot grid, fading out behind the headline,
  with a faint blue glow from the top. The page opens and closes the same way.
- **Dark results band** (`.hp-ink-band`): the four result stats on ink with a blue glow in the
  top-left. The one dark moment on the page; keep it to one. Labels `#8F96A3`, descriptions
  `#A3A9B3`, numbers white (each turns `#7EA3FA` while its card is hovered or focused), dividers `#24262B` (all pass AA on ink).
- **Illustration panels** (`.hp-well`): a `#F7F8FA` dotted panel with a top hairline behind the
  "Who this works for" illustrations, bottom-aligned across the row on desktop and full-bleed in
  the cell on phones.
- **H1 photo chip:** Mitch's headshot in a tile before "person", matching the Google Ads tile but
  tilted the other way (-5°). The first hero value prop uses a custom person-with-check icon in the
  chart-tile blues instead of a photo, so the photo appears once above the fold.

### 16.6 Accessibility notes

- One `h1`. Sections are `section[aria-labelledby]`. Mockups are `aria-hidden`; real logos and
  photos have alt text. Visible focus is a 2px `hp-accent` outline (`focusRing`).
- The floating `MobileBookingBar` hides while any `data-booking-cta-zone` (hero, mid-page band,
  FAQ ask card, final CTA, footer) is on screen.
- Every text colour passes 4.5:1, mockups included (Lighthouse accessibility 100). Don't go back to
  Paper's lighter `#8A8F98`/`#16A34A`. To fade a mockup row, lay a white veil over it
  (`absolute inset-0 bg-white/45`) rather than lowering its `opacity`.
- Overlapping avatars overlap by 10px at most, so each keeps a 24px tap target.

### 16.7 Motion

- Illustrations animate in once as they scroll into view (`components/home/Reveal.jsx` plus the
  `rv*` classes in `components/home/reveal.css`): cards and rows fade up 10px, chips pop from 94%, chart bars grow
  from the baseline, lines and the gauge draw in (`pathLength="1"`), retention dots fill column by
  column. Stagger with `--rv-i` (index) and `--rv-step` (gap, default 80ms). Keep it this quiet:
  no bounces, nothing longer than about 1.5s end to end.
- Content is server-rendered visible. `Reveal` only hides an illustration after hydration, and only
  if it's still below the fold, so nothing flashes and nothing is lost without JS.
- Reduced motion: `Reveal` does nothing, so everything is static.
- Bespoke one-offs use `components/home/Play.jsx` + `play.css` (same rules: server renders the
  finished state, only below-the-fold elements animate, reduced motion stays static). The "Why
  founders hire me" illustrations (`WhyFoundersChips.jsx`, 192px slots) are small product
  scenes: a weekly report where MRR counts up and clicks sit "in the appendix", the Google Ads
  access panel with you as owner, a `checkout.js` snippet that writes itself line by line then
  shows "Conversion received", a month-to-month plan whose "12 months" minimum is struck to
  "None", a stack of the real press pieces landing in turn, and a "Speak to a client first"
  list of three generic roles with placeholder icons. Reference elements ("Speak to a client
  first", the "Talk to a current client" chip) never name, picture or link a specific client.

### 16.8 Service pages (24 Oct 2026)

`/services/[slug]` (Google Ads, ChatGPT Ads, Meta Ads, Microsoft Ads, LinkedIn Ads) is built from the Paper page
"Service pages" (one 1440px and one 390px artboard per channel). `ServicePageTemplate` composes it;
copy lives in `lib/services.js`, mockups in `components/services/illustrations/<channel>.jsx`,
registered by slug in `components/services/serviceVisuals.js`.

- **Order:** hero → client logos (`HomeLogos`) → results band (Google Ads only) → budget leaks →
  first 90 days → campaigns → fit → pricing → video testimonials (`HomeTestimonials`) → FAQ
  (`HomeFaq`) → final CTA (`HomeFinalCta`), plus the floating `MobileBookingBar`. Section labels
  are numbered in page order and each H2's `marker` is its position, so no stroke repeats.
- **Hero** (`ServiceHero`): the homepage hero without the case-study pill. The H1 opens with the
  channel's real brand icon in the tilted tile; the accent phrase (`hero.titleAccent`) keeps the
  dashed underline. Same value props, CTA, avatar stack, and "a go or no-go on {`hero.verdict`}".
- **Proof:** only Google Ads has case studies, so only its page has the dark results band
  (`HomeResults` with its own heading). The other channels go straight to budget leaks. Never show
  Google Ads results on another channel's page.
- **Budget leaks** (`ServiceLeaks`): five reasons in a 3×2 hairline grid. Each has its own small
  mockup in a 156px slot (`LeakSlot`, bottom-aligned so the H3s line up), drawn in that platform's
  UI and specific to the reason (e.g. Google's conversion-action goals, Meta's event picker,
  Microsoft's import schedule). The sixth cell is a `.hp-well` with an audit card. Don't fall back
  to generic text chips.
- **First 90 days** (`ServiceProcess`): the homepage process grid with the channel's step names
  and muted subtitles. Step 2's events sync to the channel; step 3 pairs the channel's ad (search
  ad, ChatGPT sponsored card, Meta or LinkedIn feed ad) with a `StructureCard`.
- **Campaigns** (`ServiceCampaigns`): a numbered list beside a `.hp-well` of mockups (list first
  on phones).
- **Fit** (`ServiceFit`): "A good fit" and "Not yet" columns beside the $20k MRR line, then the
  footnote band.
- **Pricing** (`ServicePricing`): reads `lib/pricing.js` (same on every channel). Growth and Scale
  side by side with ad-spend bars, the shared features and buttons, then a band naming who bills
  the ad spend and the "Talk to a current client" chip.
- Quote bands use `QuoteRow`; a client logo shows only where one is mapped in `ServiceSections`,
  otherwise the company is named in text. Each client is quoted once per page.

### 16.9 Pricing page (25 Oct 2026)

`/pricing` is built from the Paper page "Pricing page" ("Pricing (Desktop)" 1440px and
"Pricing (Mobile)" 390px). `app/pricing/page.jsx` composes it; the sections are in
`components/pricing/PricingSections.jsx`; plans, notes, FAQ and onboarding steps come from
`lib/pricing.js` (shared with the WebMCP tools).

- **Order:** hero → plans → client logos (`HomeLogos`) → 01 onboarding → 02 FAQ (`HomeFaq` with
  the pricing questions and its own FAQPage JSON-LD) → final CTA (`HomeFinalCta`), plus the floating
  `MobileBookingBar`.
- **Hero** (`PricingHero`): no button or avatar stack, so the plans show on the first screen. H1
  "Straightforward pricing, never a % of your ad spend." (accent keeps the dashed underline and
  doesn't wrap), lede, then four channel chips (brand icon in a tilted tile) linking to each
  `/services/*` page. Pricing is the same on every channel; say so wherever plans are shown.
- **Plans** (`PricingPlans`): one hairline grid. Desktop row 1 is three equal tiers: Growth, Scale,
  Account Audit, each with a mono label, a `MONTHLY`/`ONE-TIME` tag and a 64px price. Row 2: under
  Growth + Scale, one ad-spend bar whose $25K mark sits on the column divider, the shared features
  (two columns) and `BookButton`; under the audit, its deliverables and an outlined "Purchase Audit"
  link to Stripe (`lib/pricing.js`). On phones Growth and Scale stay side by side, then the spend
  bar, features and button, then the audit as its own block. Then the fine-print row with the
  "Talk to a current client" chip, and Olly's quote (`QuoteRow`).
- **Onboarding** (`PricingOnboarding`): four steps (`onboardingSteps`), each with a `.hp-well` and a
  fixed-height (160px) white mockup card: header + four rows with status tags (red fix, blue info,
  green ok). All four cards share one layout so their tops line up; keep it that way. Mockups are
  `aria-hidden`, illustrative and animate in with `Reveal`. Dave's quote closes the section.

### 16.10 Results page (25 Oct 2026)

`/results` is built from the Paper page "Results pages". `app/results/page.jsx` composes it;
sections are in `components/case-studies/ResultsSections.jsx`.

- **Order:** `HomePageHero` (booking row, "Read the case studies" link, avatars) → the dark results
  band (`HomeResults` with `lead={null}` and `quote={null}`) → 01 case studies → client logos →
  02 "What I report, and what I don't" (five metrics tagged `REPORTED`/`APPENDIX`, booking card)
  → final CTA.
- **Case studies:** Rezi featured (cover card + three stats), then the rest in a hairline grid.
  On phones each non-featured study shows a number tile (`CaseStudyTile`) instead of its cover.
- **Covers** (`components/case-studies/CaseStudyVisual.jsx`): one white report card per study,
  drawn from its own figures (Rezi's monthly upgrades, the $2,219 sign-up → paid → MRR flow, the
  82 → 175 sign-ups bars, the $3,664 non-brand line). They replace the old serif cover graphics and
  screenshots as covers; the real screenshots stay inside each case study as proof. A new case
  study needs its own card registered by slug; keep figures in sync with its MDX. Each study has
  up to three variants: `cover` (featured slot and grid), `cell` (the 200px grid slot; only Rezi
  needs its own, since its cover is a tall chart) and `hero` (§16.11). Grid wells clip their
  content, so a too-tall card can't spill over the heading above.

### 16.11 Case study pages (25 Oct 2026)

`/results/[slug]` renders `components/case-studies/CaseStudyArticle.jsx` from the MDX in
`content/case-studies`.

- **Hero:** back link, client logo and category, H1 split at its last comma (or before the last
  "for", "from" or "with") so it ends in the dashed accent, excerpt, Mitch's byline; from `lg`, a
  hero report card on the right (`CaseStudyVisual variant="hero"`). Hero cards are built for that
  panel: they stretch to its full height, grow their chart to fill it, sit flush with the bottom
  edge, and add two or three hairline rows of the study's other figures. Don't scale up a grid
  cover to fill the panel.
- **Stats band:** the dark band with the study's `stats` frontmatter, only when it has any.
- **Body:** a sticky sidebar from `lg` ("On this page", built from the `CaseStudySection` titles,
  plus a booking card) beside the MDX. `CaseStudySection` numbers each section (mono) with a sans
  H2; copy is styled by `.hp-prose` (home.css), where a bulleted list becomes hairline rows and a
  bold lead-in becomes the row title. Images render in `CaseStudyScreenshot` window frames.
  Inline links in the copy are `hp-ink`, medium weight, underlined (offset 4px).
- **Unlisted studies:** `unlisted: true` in the frontmatter keeps a study out of /results,
  "More results" and the WebMCP list, while the page stays indexable and in the sitemap.
- **Then:** "From the account" proof screenshot (when `proofImage` is set), "More results" (the
  same grid as /results), final CTA, `MobileBookingBar`.

### 16.12 Testimonials page (25 Oct 2026)

`/testimonials` (Paper page "Testimonials page"): `HomePageHero` ("Don't take my word for it.
Hear it from my clients.") with the avatar stack → 01 on video (`HomeTestimonials` with an
`intro`) → 02 in writing (`components/testimonials/WrittenTestimonials.jsx`: Jacob's highlight as
a featured pull-quote, the other eleven in three masonry columns; on phones six show, then "Show 5
more reviews") → client logos → final CTA. Every quote is verbatim from `testimonialsData.js`.

### 16.13 Tool pages (25 Oct 2026)

`/tools/[slug]` renders `components/tools/ToolPageTemplate.jsx`: `HomePageHero` with a "Free tool ·
No sign-up" pill and "{Tool}, {heroAccent}" (`heroAccent` lives in `lib/tools/toolRegistry.js`) →
the tool in its own section (`font-hp`) → a tracking pitch band with `BookButton` → links to the
other tools → FAQ (`HomeFaq`, "Common questions, answered.") → final CTA. The tool UIs in
`components/tools/<tool>/` use the `hp-*` tokens.

### 16.14 Call confirmation (25 Oct 2026)

`/call-confirmation` (Paper page "Call confirmation page") never asks the visitor to book: no
`BookButton`, no `MobileBookingBar`, and the nav shows "Read the case studies".

- **Order:** split hero (green "Call booked" pill, "Thanks {name}, your call is booked.", agenda
  card) → 01 before we meet (three steps with mockup cards, Sunny's quote) → 02 the call (what
  you'll get / what it isn't, Matt's quote card) → 03 client videos (`HomeTestimonials`,
  `showCta={false}`) → 04 FAQ with a reschedule card (`HomeFaq` `ask`) → "See you on the call."
  (`HomeFinalCta` with an `action` linking to /results).


### 16.15 404 page (25 Oct 2026)

`app/not-found.jsx` (Next.js adds noindex itself): `HomePageHero` ("This click didn't convert.")
whose pill slot holds `MissingUrl`, a small address bar showing the path the visitor asked for
with a red spellcheck squiggle under it (no status-dot pill). Under the buttons ("Back to the
homepage" + "See client results") sits `NotFoundIllustration`: the logo's three dots as a funnel
with the landing page missing (a dashed "404" ring), so the blue conversion dot has rolled off
onto the floor, above a Clicks 1 / Conversions 0 / Cost to you $0.00 row. Labels are HTML over
the SVG so they stay at 12px+ on phones. On load the dot rolls down its trail (about 1.5s, no
bounce, `not-found.css`); the server renders the finished scene and reduced motion keeps it
static. Then 01 "Where to next" (four hairline link cells) and `HomeFinalCta` ("While you're
here, let's fix your funnel.").

### 16.16 Guide pages (28 Oct 2026)

`/guides/saas-paid-search-cac-ltv` is the first long-form guide (there is no `/guides` index or
blog). `app/guides/<slug>/page.jsx` holds metadata and the FAQPage JSON-LD;
`components/guides/SaasCacLtvGuide.jsx` composes the page; FAQ copy is in
`lib/guides/saasCacLtv.js` so the schema and the visible FAQ match.

- **Order:** `HomePageHero` (a "Guide · Updated {date}" pill with a blue dot, booking row) →
  01 the short answer (H2 and a plain-language summary on the left, the core metrics as hairline
  `dl` rows on the right, like the /results "What I report" section) → the guide body → 02 FAQ
  (`HomeFaq`) → `HomeFinalCta`, plus `MobileBookingBar`.
- **Body:** reuses the case study body (§16.11): sticky "On this page" sidebar with a booking card
  from `lg`, numbered `CaseStudySection`s and `.hp-prose`. Two additions, both local to the guide:
  formulas sit on their own line as a Geist Mono 14px block on `hp-band` with an `hp-line` border,
  and the worked example is a hairline table whose caption reads "Illustrative example · not a
  client result". Formula and note blocks are `div`s, because the unlayered `.hp-prose > p` rule
  would override their utilities.
- **Proof rules:** real figures only from `content/case-studies`, each linked to its study.
  Hypothetical numbers must be round and labelled illustrative in the copy. Unconfirmed claims
  sit in a dashed-border note with a `[CONFIRM: …]` or `[CLIENT RESULT: …]` placeholder until
  they're replaced.
- Inline links in guide copy are ink, medium weight, underlined (`decoration-hp-line`, darkening
  on hover).

### 16.17 Market pages (28 Oct 2026)

`/b2b-saas-google-ads-agency-usa` answers "best Google Ads / PPC agency for B2B SaaS in the US"
questions. Its angle is B2B software and tech (sales-led and PLG, pipeline, CRM, offline
conversions), which keeps it off the homepage's broader "saas google ads agency" keyword.
`app/b2b-saas-google-ads-agency-usa/page.jsx` holds metadata and JSON-LD (Service with a B2B
audience and `areaServed` United States, BreadcrumbList, FAQPage); copy is in `lib/locations.js`;
the two new sections are in `components/locations/LocationSections.jsx`.

- **Order:** `HomePageHero` (a `MarketPill`: blue dot + "B2B SaaS and tech · Sales-led and PLG",
  booking row, avatars) → client logos → 01 short answer (`LocationAnswer`: H2, a two-paragraph
  plain summary and a `BookButton` on the left, six fact rows as a hairline `dl` on the right, as
  in §16.16) → 02 results (`HomeResults` with its own heading) → 03 services (`ServiceCampaigns`
  with B2B items and the Google Ads mockups) → 04 how I work (`ServiceProcess`) → 05 US teams
  (`LocationCoverage`: six cells in a 3×2 hairline grid, each a lucide icon in a small outlined
  tile, H3 and body, then the footnote band from `ServiceFit`) → 06 pricing (`ServicePricing`) →
  07 clients (`HomeTestimonials`) → 08 FAQ (`HomeFaq`) → final CTA. Eight H2s use markers 0–7,
  so a market page can't add a ninth section without dropping one.
- **Facts only:** prices are USD (`lib/pricing.js`); the US B2B client is the one named in the
  background of `content/case-studies/2x-b2b-pipeline.mdx`. Don't claim a US office, team or
  other US clients. Anything unconfirmed (US call hours, other markets, CRMs, other US clients)
  is a visible `[CONFIRM: …]` placeholder until replaced. Keep placeholders out of the FAQ,
  because it feeds the FAQPage schema.
- Linked from the footer's Company column ("Google Ads for US B2B SaaS").
