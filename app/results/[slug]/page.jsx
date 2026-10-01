import { notFound } from "next/navigation";
import CaseStudyArticle from "@/components/case-studies/CaseStudyArticle";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

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
      path: `/results/${slug}`,
      noIndex: true,
    });
  }

  return generateMeta({
    title: caseStudy.seoTitle || `${caseStudy.title} | Ads That Convert`,
    description: caseStudy.seoDescription || caseStudy.excerpt,
    path: `/results/${caseStudy.slug}`,
    image: caseStudy.detailHeroImage || caseStudy.heroImage,
  });
}

export default async function ResultDetailPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyArticle caseStudy={caseStudy} backHref="/results" />;
}
