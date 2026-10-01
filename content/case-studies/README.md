# Case Study Content

Add new case studies as `.mdx` files in this folder.

## Required frontmatter

- `title`
- `slug`
- `excerpt`
- `category`
- `authorName`
- `publishedAt` (ISO date)
- `heroImage` (path inside `/public`)
- `heroImageAlt`

## Optional frontmatter

- `summaryMetric`
- `tags`
- `resultsTable` (`columns` + `rows`)
- `authorImage`
- `seoTitle`
- `seoDescription`
- `draft` (boolean)
- `proofImage` + `proofImageAlt` — a real Google Ads screenshot shown in the "Straight from the Google Ads account" section

`heroImage` is only used as the social/OG image. The card and hero artwork is a JSX cover keyed by `slug` in `components/case-studies/CaseStudyCover.jsx` — add a variant there for every new case study (see `DESIGN.md` §7.11).

Markdown images: URL-encode spaces (`%20`) and use the title for the window label, e.g. `![alt](/case%20study%20images/x.png "Monthly report")`.

## Body structure

Use the provided MDX component:

```mdx
<CaseStudySection title="Context">
...
</CaseStudySection>
```

Use additional sections the same way (`Strategy`, `Outcome`, etc.).
