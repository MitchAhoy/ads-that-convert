import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const LAST_CASE_STUDY_SLUG = "50k-ecommerce-google-ads";

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "authorName",
  "publishedAt",
  "heroImage",
  "heroImageAlt",
];

function parsePublishedAt(value, fileName) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid \"publishedAt\" in ${fileName}. Expected ISO date.`);
  }

  return date;
}

function validateFrontmatter(frontmatter, fileName) {
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      throw new Error(`Missing required frontmatter field \"${field}\" in ${fileName}.`);
    }
  }

  if (typeof frontmatter.slug !== "string") {
    throw new Error(`Invalid \"slug\" in ${fileName}. Expected string.`);
  }

  if (frontmatter.resultsTable) {
    const { columns, rows } = frontmatter.resultsTable;

    if (!Array.isArray(columns) || !Array.isArray(rows)) {
      throw new Error(`Invalid \"resultsTable\" in ${fileName}. Expected { columns: [], rows: [] }.`);
    }
  }
}

function buildCaseStudyMeta(frontmatter, fileName) {
  validateFrontmatter(frontmatter, fileName);
  const publishedDate = parsePublishedAt(frontmatter.publishedAt, fileName);

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    excerpt: frontmatter.excerpt,
    category: frontmatter.category,
    authorName: frontmatter.authorName,
    publishedAt: frontmatter.publishedAt,
    heroImage: frontmatter.heroImage,
    heroImageAlt: frontmatter.heroImageAlt,
    listImage: frontmatter.listImage || frontmatter.heroImage,
    detailHeroImage: frontmatter.detailHeroImage || frontmatter.heroImage,
    summaryMetric: frontmatter.summaryMetric || null,
    readTime: frontmatter.readTime || null,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    resultsTable: frontmatter.resultsTable || null,
    authorImage: frontmatter.authorImage || null,
    seoTitle: frontmatter.seoTitle || null,
    seoDescription: frontmatter.seoDescription || null,
    draft: Boolean(frontmatter.draft),
    publishedDate,
  };
}

async function getCaseStudyFileNames() {
  const entries = await fs.readdir(CASE_STUDIES_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

async function parseCaseStudyFile(fileName) {
  const fullPath = path.join(CASE_STUDIES_DIR, fileName);
  const source = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(source);
  const meta = buildCaseStudyMeta(data, fileName);

  return {
    ...meta,
    content,
  };
}

export async function getCaseStudies({ includeDrafts = false } = {}) {
  const fileNames = await getCaseStudyFileNames();
  const studies = await Promise.all(fileNames.map((fileName) => parseCaseStudyFile(fileName)));

  return studies
    .filter((study) => includeDrafts || !study.draft)
    .sort((a, b) => {
      if (a.slug === LAST_CASE_STUDY_SLUG && b.slug !== LAST_CASE_STUDY_SLUG) return 1;
      if (b.slug === LAST_CASE_STUDY_SLUG && a.slug !== LAST_CASE_STUDY_SLUG) return -1;
      return b.publishedDate.getTime() - a.publishedDate.getTime();
    })
    .map(({ content, publishedDate, ...study }) => study);
}

export async function getCaseStudyBySlug(slug, { includeDrafts = false } = {}) {
  const fileNames = await getCaseStudyFileNames();

  for (const fileName of fileNames) {
    const caseStudy = await parseCaseStudyFile(fileName);

    if (caseStudy.slug !== slug) {
      continue;
    }

    if (!includeDrafts && caseStudy.draft) {
      return null;
    }

    return caseStudy;
  }

  return null;
}

export async function getCaseStudySlugs() {
  const studies = await getCaseStudies();

  return studies.map((study) => study.slug);
}
