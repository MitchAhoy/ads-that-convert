import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import CaseStudyResultsTable from "@/components/case-studies/CaseStudyResultsTable";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CTABanner from "@/components/sections/CTABanner";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

const mdxComponents = {
  CaseStudySection,
};

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return generateMeta({
      title: "Case Study Not Found | Ads That Convert",
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  return generateMeta({
    title: caseStudy.seoTitle || `${caseStudy.title} | Ads That Convert`,
    description: caseStudy.seoDescription || caseStudy.excerpt,
    path: `/case-studies/${caseStudy.slug}`,
    image: caseStudy.heroImage,
  });
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { content } = await compileMDX({
    source: caseStudy.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <>
      <CaseStudyHero
        category={caseStudy.category}
        title={caseStudy.title}
        authorName={caseStudy.authorName}
        heroImage={caseStudy.heroImage}
        heroImageAlt={caseStudy.heroImageAlt}
        summaryMetric={caseStudy.summaryMetric}
      />

      <div>{content}</div>

      <CaseStudyResultsTable table={caseStudy.resultsTable} />
      <CTABanner />
    </>
  );
}
