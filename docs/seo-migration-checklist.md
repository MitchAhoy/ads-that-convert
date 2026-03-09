# Homepage SEO Migration Checklist (Webflow -> Next.js)

This checklist is for preserving organic performance during migration of `https://www.adsthatconvert.co/`.

## 1) Must-Match On-Page Signals

- [ ] Keep homepage URL as `https://www.adsthatconvert.co/` (no path change).
- [x] Keep homepage `<title>` exactly: `SaaS Google Ads Agency | Ads That Convert`.
- [x] Keep homepage meta description aligned with existing copy.
- [x] Keep a single H1 aligned with current ranking intent.
- [x] Keep core FAQ content that supports long-tail queries.
- [x] Keep internal links to core commercial pages (`/results`, `/pricing`, tools pages as they are rebuilt).

## 2) Canonical, Robots, and Indexation Controls

- [x] Self-referencing canonical on homepage via App Router metadata.
- [x] Site-level `robots.txt` route published.
- [x] XML sitemap route published and references `www` host.
- [ ] Ensure parameterized homepage variants (for example `?headline=...`) are not indexed as separate pages in Search Console if they appear in reports.

## 3) Structured Data Parity

- [x] `ProfessionalService` schema present on homepage.
- [x] `FAQPage` schema present and tied to visible FAQ content.
- [ ] Re-validate rich results after launch in Google Rich Results Test.
- [ ] Keep ratings/review counts in schema synchronized with visible proof.

## 4) Redirect Mapping (Critical During Cutover)

- [ ] Export all Webflow URLs currently indexed (from GSC + sitemap + crawls).
- [ ] Build a strict 1:1 301 redirect map for every changed URL.
- [ ] Validate no redirect chains and no 302 fallbacks.
- [ ] Validate old top-linked URLs from backlinks resolve to final destinations.

## 5) Technical Validation Before Launch

- [ ] Crawl staging and production for:
  - [ ] Canonical correctness
  - [ ] Indexable status (200 + not blocked)
  - [ ] Broken internal links
  - [ ] Missing meta titles/descriptions
  - [ ] Orphan pages
- [ ] Confirm Core Web Vitals are not significantly worse than current production.
- [ ] Confirm all critical content is server-rendered/visible without JS interaction.

## 6) Launch-Day Steps

- [ ] Deploy redirects and new site at the same time.
- [ ] Submit sitemap in Google Search Console.
- [ ] Request re-indexing of homepage + top commercial pages.
- [ ] Check server logs/GSC for crawl spikes and 404s.

## 7) Post-Launch Monitoring (First 2-4 Weeks)

- [ ] Track ranking deltas for primary queries (daily/weekly).
- [ ] Track impressions/clicks in GSC by page and query.
- [ ] Fix new 404s and soft-404s within 24-48 hours.
- [ ] Review canonical selection in GSC (Google-selected vs user-declared).
- [ ] Confirm homepage remains the canonical target for branded and core non-brand terms.

## Current Code Touchpoints

- Metadata + canonical helper: `lib/seo.js`
- Homepage metadata + JSON-LD: `app/page.jsx`
- Global metadata entry: `app/layout.jsx`
- Sitemap route: `app/sitemap.js`
- Robots route: `app/robots.js`
