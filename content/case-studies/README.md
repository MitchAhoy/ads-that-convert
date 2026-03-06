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

## Body structure

Use the provided MDX component:

```mdx
<CaseStudySection title="Context">
...
</CaseStudySection>
```

Use additional sections the same way (`Strategy`, `Outcome`, etc.).
