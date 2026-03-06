import CaseStudyListCard from "@/components/case-studies/CaseStudyListCard";
import PageHeadline from "@/components/ui/PageHeadline";
import { getCaseStudies } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

export function generateMetadata() {
  return generateMeta({
    title: "Case Studies | Ads That Convert",
    description: "Detailed Google Ads case studies showing strategy, execution, and measurable SaaS growth outcomes.",
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHeadline
        id="case-studies-title"
        title="Case Studies"
        description="Strategy breakdowns and performance outcomes from SaaS Google Ads campaigns."
      />

      <section className="py-5 sm:py-6" aria-label="Case study list">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {caseStudies.map((caseStudy) => (
            <CaseStudyListCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
