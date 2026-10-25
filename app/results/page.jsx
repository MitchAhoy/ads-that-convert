import HomeResults from "@/components/home/HomeResults";
import HomeLogos from "@/components/home/HomeLogos";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomePageHero from "@/components/home/HomePageHero";
import { hpBookingBarButton } from "@/components/home/primitives";
import { ResultsCaseStudies, ResultsMeasured } from "@/components/case-studies/ResultsSections";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { getCaseStudies } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

export function generateMetadata() {
  return generateMeta({
    title: "Results | Ads That Convert",
    description:
      "SaaS Google Ads case studies reported in new MRR, payback and pipeline, with the account changes behind each result.",
    path: "/results",
  });
}

// /results on the homepage system (DESIGN.md §16.10).
export default async function ResultsPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <main className="bg-white">
        <HomePageHero
          lead="Client results, measured in"
          accent="MRR and payback."
          description="Each case study shows where the account started, what I changed, and what it produced in trials, pipeline and new MRR."
          showBooking
          showAvatars
          secondaryLink={{ href: "#case-studies", label: "Read the case studies" }}
        />
        <HomeResults lead={null} quote={null} />
        <ResultsCaseStudies caseStudies={caseStudies} eyebrow="01 · Case studies" marker={0} />
        <HomeLogos />
        <ResultsMeasured eyebrow="02 · How I measure" marker={1} />
        <HomeFinalCta underlineSeed="results" />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
