# Landing page audit: adsthatconvert.co homepage

**Looked at:** `app/page.jsx` and its section components, rendered from the local dev build (branch `redesign/editorial-system`) at 1280×800 and 390×844, plus measured values from the browser (box sizes, font sizes, contrast).
**Benchmarks:** skipped. The Landingfolio MCP isn't connected, so this is a rules-only audit.
**Category:** solo-operator paid ads agency for B2B SaaS. One job: book a 15-min call.

**Sections, in order:** header (floating nav pill), hero, testimonial (4 video cards), feature/results (3 stat cards), logo-cloud, feature (Slack illustration + "person on the call"), how-it-works (4 steps), feature (who this works for, 3 cards), feature (why founders hire me, 5 rows), testimonial (marquee wall), faq, call-to-action, footer.

No Critical findings. The first screen says what it is and who it's for, the primary CTA is visible at both widths, and there is no horizontal scroll at 390px.

## Critical

None.

## Major

### 1. Slack illustration cards collide on mobile
**Where:** "The person on the call" section › `components/sections/illustrations/SlackChangeHistoryIllustration.jsx:60` and `:90`
**Violates:** "Don't scale down screenshots" (images.md); "Overlapping images: give each an invisible border so they don't clash" (depth.md)
**Why it matters:** At 390px both cards shrink to the same 294px width and the same left edge, so the Slack card sits directly on top of the change-history card instead of offset from it. Because the Slack card is `bg-white/95`, the "Change history" title and its first two rows show through as ghost text behind the chat messages. It reads as a rendering bug in the one illustration that carries your main differentiator.
**Fix:** Make the Slack card opaque (`bg-white`), and below `sm` either show only one card or stack them without overlap in a taller frame (the frame is a fixed `h-[450px]`). On desktop the offset layout works and can stay.

### 2. Three card rows become very long single-column stacks on mobile
**Where:** Video testimonials (`components/VideoCardGrid.jsx:5`, `grid-cols-1` until `lg`), "Check the fit, then build" (`FitThenBuild.jsx:154`), "Who this works for" (`WhoIsThisFor.jsx:162`)
**Violates:** "Rows of 3+ peer cards don't turn into a very long single-column stack; consider a swipe row or a 2-column grid" (landing-page.md)
**Why it matters:** The page is 15,460px tall at 390px, about 18 screens. The four video cards alone are 2,279px, the four steps 2,109px, the three fit cards 1,597px. A visitor has to scroll through roughly 2.7 screens of video cards before reaching the first number (the results section), and the final CTA is a long way down.
**Fix:** Turn the video cards into a horizontal swipe row with scroll-snap on mobile (one card plus a peek of the next). For the four steps, drop the 208px illustration well on mobile or use a swipe row. The text-testimonial wall already does this and is only 508px tall on mobile.

### 3. Hero visual is an abstract code window, not the product
**Where:** Hero › right column › `components/sections/Hero.jsx:183` (`HeroCodeAnimation`, the `growth.ts` / `optimize({...})` window)
**Violates:** "A product visual (UI, output, or demo) appears in or right after the first screen. Abstract illustrations don't prove the product exists." (landing-page.md)
**Why it matters:** The headline promises two concrete things: one person runs the account, and reporting is in MRR. The visual next to it shows neither. It is pseudo-code for a service that isn't code. The page already has visuals that show exactly those two promises further down: the Slack channel plus change history, and the "Weekly report, New MRR $1,980" card. The best proof is sitting three and five sections below the fold.
**Fix:** Replace the code window with a mockup of the deliverable: the weekly MRR report card, or the Slack + change-history composition from `SeniorHands`. Then give `SeniorHands` a different visual so it isn't repeated.

### 4. The H1 is the smallest headline on the page
**Where:** Hero H1 (`text-h1`, 44px) vs section H2s (`text-h2`, 48px), final CTA (`text-cta-h2`, 52px) and result metrics (`text-6xl`, 60px in `ResultsProof.jsx:35`). Tokens at `app/globals.css:20-22`.
**Violates:** "The headline is the largest text on the page and nothing competes with it" (landing-page.md)
**Why it matters:** Scrolling from the hero into "Founders and marketers, on the record", the type gets bigger, so the hero reads as the quieter moment. The emphasis order on the page is currently stats, then CTA, then section titles, then the main promise.
**Fix:** Invert the top of the scale: H1 around 52 to 56px desktop, H2 down to 40 to 44px, CTA heading equal to or just under the H1. The H1 is 16 words, so check it still wraps in three to four lines in the 610px column. This is a documented choice in `DESIGN.md` and `AGENTS.md`, so both need updating in the same change. If you keep it, this is the one finding to consciously overrule.

## Minor

### 5. Quote attribution breaks on mobile, and company logos outweigh the person
**Where:** `components/ui/QuoteAttribution.jsx:61` and `:67`, used under Results, "The person on the call" and "Check the fit"
**Violates:** "Logo rows are muted and consistently sized so no single logo shouts" (landing-page.md); ambiguous spacing (spacing.md)
**Why it matters:** At 390px the logo wraps to its own line but the vertical divider stays behind, so a stray 36px rule floats to the right of the name with nothing beside it. At both widths the logo renders at 46px tall, taller than the avatar (44px) and far heavier than the 16px name. The solid yellow Fillout wordmark is the loudest thing in its section.
**Fix:** Hide the divider below `sm` in compact mode too (it is only hidden in the non-compact variant today). Cap logos at about `h-6` to `h-7` with per-logo optical tuning, as `ClientLogoMarquee` already does.

### 6. Muted text fails contrast at label size
**Where:** Result card labels, "B2B AI SaaS · built from scratch" (`ResultsProof.jsx:34`, 14px `text-muted` on white); FAQ numbers (`FaqAccordion.jsx:76`)
**Violates:** "WCAG contrast targets: 4.5:1 for normal text" (color.md); "2 to 3 text colors max" (hierarchy.md)
**Why it matters:** `--color-muted` (#8a877f) measures 3.59:1 on white and 3.16:1 on the page colour. The result labels are the only context for each number (what kind of company it was), and they are the hardest text on the card to read. `--color-fine` (#6b6963) measures 5.49:1 on white and already exists.
**Fix:** Use `text-fine` for those labels and the FAQ numbers. Keep `text-muted` for the large two-tone headings ("and why they stay", the logo-row aside), where 3:1 is enough. That also takes body-level text down to three colours: ink, body, fine.

### 7. Final CTA card: empty right half, and no proof at the last decision point
**Where:** `components/ui/CallToActionCard.jsx:21-25` (content capped at `max-w-[600px]` inside a 1056px card)
**Violates:** "Proof sits near the decision points" (landing-page.md); bland empty areas (polish.md)
**Why it matters:** On desktop the right 40% of the card is blank apart from a faint corner glow. The hero CTA has the client avatar stack directly under it. The final CTA, where the visitor actually decides, has only a line of fine print.
**Fix:** Put proof in the empty side: the avatar stack with a one-line count, or a single short quote with a face. No new background treatment needed.

### 8. Mobile hero: mixed alignment and undersized targets
**Where:** `components/sections/Hero.jsx:106` (`text-center sm:text-left`), `:166` (primary CTA); nav menu button; "Read the case study" links (`ResultsProof.jsx:41`)
**Violates:** "Default: left-align" (typography.md); "Tap targets ≥ 44px tall, and the primary CTA is full-width or close to it" (landing-page.md)
**Why it matters:** At 390px the H1 and lede are centred, the three bullets under them are left-aligned, and the CTA is centred again, so the left edge jumps twice in one screen. The primary button is 214px wide in a 310px column. The hamburger measures 36×36px and the case-study links are about 25px tall with no padding.
**Fix:** Left-align the whole mobile hero (it matches every section below it), make the primary CTA `w-full` below `sm`, give the menu button a 44px hit area, and add vertical padding to the case-study links.

### 9. Page text shows through the scrolled nav pill
**Where:** `components/layout/Navbar.jsx:164` (`bg-white/80 backdrop-blur-md`)
**Violates:** "Don't use white-with-reduced-opacity; it bleeds over images and patterns" (hierarchy.md)
**Why it matters:** On mobile the pill spans nearly the full width, and body copy and headings stay legible as smeared text behind the logo while scrolling (clearest over 32px headings and the logo marquee).
**Fix:** Raise the fill to about `bg-white/92` or strengthen the blur. Keep the shadow.

## What's working
- **Proof is everywhere it should be.** Named video testimonials with faces and companies are the second section, and each explanatory section closes on a quote. Few agency pages do this as consistently.
- **One primary action, one style.** "Book a 15-min call" is the same ink pill in the nav, hero, mid-page, FAQ sidebar and final CTA, and every secondary action is a quiet underline link.
- **A real system.** One container, a fixed type scale, a three-step warm shadow scale, one radius family, and pastel colour confined to illustrations. Section padding matches the table in `DESIGN.md` §5.1.

## Outside this audit's scope
- The testimonial wall heading says "Don't take **our** word for it" while the rest of the page is first person singular. That is one for a copy pass.

## Next step
Want me to apply fixes 1, 5, 6, 8 and 9 (small, contained, no design-system changes), and mock up options for 3 and 4 before touching `DESIGN.md`?
