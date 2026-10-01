import CaseStudyListCard from "@/components/case-studies/CaseStudyListCard";
import ResultsLedger from "@/components/case-studies/ResultsLedger";
import PageHero from "@/components/sections/PageHero";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import QuoteAttribution from "@/components/ui/QuoteAttribution";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { getCaseStudies } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

export function generateMetadata() {
  return generateMeta({
    title: "Results | Ads That Convert",
    description:
      "SaaS Google Ads case studies reported in new MRR, payback and pipeline, with the account changes behind each result.",
    path: "/results",
  });
}

const reportedMetrics = [
  {
    title: "New MRR",
    description:
      "Revenue from new customers who came through paid search, tracked from the click through to Stripe or your CRM.",
  },
  {
    title: "Months to payback",
    description: "How long it takes a customer to earn back what it cost to acquire them. This decides whether we scale.",
  },
  {
    title: "Pipeline and sign-up quality",
    description: "For sales-led products: qualified demos and opportunities, not raw form fills.",
  },
  {
    title: "Trials and sign-ups",
    description: "Counted, then followed through to paid. A trial that never converts isn't a result.",
  },
  {
    title: "Clicks, CTR and impressions",
    description: "Kept in the appendix. Useful for diagnosing an account, not for judging it.",
  },
];

function WhatIReport() {
  return (
    <section aria-labelledby="what-i-report-title" className="pt-16 pb-12 sm:pt-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="what-i-report-title" className="font-display text-h2 text-balance text-ink lg:col-span-5">
            How results are measured <span className="block text-muted">and what&apos;s left out</span>
          </h2>
          <div className="lg:col-span-7 lg:self-end">
            <p className="max-w-[32em] text-lg leading-[1.5] text-pretty text-body">
              Each case study on this page uses the numbers your finance team already tracks. Your reports will use the
              same ones.
            </p>
            <div className="mt-8">
              <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" />
            </div>
          </div>
        </div>

        <ul className="mt-10 border-t border-border sm:mt-14">
          {reportedMetrics.map(({ title, description }) => (
            <li
              key={title}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:py-8 lg:grid-cols-12 lg:gap-x-10"
            >
              <h3 className="text-xl font-bold text-ink sm:text-2xl lg:col-span-5">{title}</h3>
              <div className="lg:col-span-7">
                <p className="max-w-[36em] text-copy text-pretty text-body">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function ResultsPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <GridFrame bleedTop>
        <PageHero
          id="results-title"
          title="Client results, measured in MRR and payback"
          description="Each case study shows where the account started, what I changed, and what it produced in trials, pipeline and new MRR."
          secondaryLink={{ href: "#case-studies", label: "Read the case studies" }}
          aside={<ResultsLedger />}
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <section id="case-studies" aria-labelledby="case-studies-title" className="scroll-mt-24 pt-16 pb-12 sm:pt-20">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-[680px]">
              <h2 id="case-studies-title" className="font-display text-h2 text-balance text-ink">
                Each account, from start to result
              </h2>
              <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">
                The starting point, the changes I made, and the numbers that came out of them. Where the client allows
                it, screenshots come straight from the Google Ads account.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-5.5 sm:mt-14 lg:grid-cols-3">
              {caseStudies.map((caseStudy) => (
                <li key={caseStudy.slug}>
                  <CaseStudyListCard caseStudy={caseStudy} />
                </li>
              ))}
            </ul>

            <QuoteAttribution
              compact
              className="mt-9 border-t border-border pt-7"
              quote="He was very proactive in keeping tabs on our ad programs, making great recommendations, and we've driven several million dollars in ARR because of him."
              person="Natasha"
              role="Marketing"
              company="Nooks"
              companyLogoSrc="/client-logos/nooks.png"
              companyLogoAlt="Nooks logo"
              avatarSrc="/client pfp/natasha nooks.jpeg"
              avatarAlt="Natasha"
            />
          </div>
        </section>
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <ClientLogoMarquee />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <WhatIReport />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <TestimonialSlider
          title="What clients say about the results"
          description="Short excerpts, word for word, from founders and marketing leads."
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>
    </>
  );
}
