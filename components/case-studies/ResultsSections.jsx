import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { AccentHeading, BookButton, QuoteRow, Section, SectionHead, focusRing } from "@/components/home/primitives";
import CaseStudyVisual, { CaseStudyTile } from "@/components/case-studies/CaseStudyVisual";

// Sections for /results (DESIGN.md §16.10). Case studies come from
// content/case-studies via lib/caseStudies.js.

const FEATURED_SLUG = "rezi-case-study";

const labelClass = "font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase";
const readLinkClass = `w-fit border-b border-hp-ink py-1 font-hp text-[15px]/5 font-medium text-hp-ink transition-colors hover:border-hp-accent hover:text-hp-accent lg:text-base/5.5 ${focusRing}`;

function meta(study) {
  return [study.category, study.readTime].filter(Boolean).join(" · ");
}

function FeaturedStudy({ study }) {
  const stats = study.stats.slice(0, 3);
  return (
    <article className="flex flex-col border-t border-hp-line lg:flex-row">
      <Reveal
        aria-hidden="true"
        className="hp-well flex items-end justify-center px-5 pt-7 sm:px-10 lg:w-130 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-10 lg:pt-9"
      >
        <div className="w-full max-w-110">
          <CaseStudyVisual slug={study.slug} />
        </div>
      </Reveal>
      <div className="flex flex-col gap-3 border-t border-hp-line px-5 pt-5.5 pb-7 sm:px-8 lg:flex-1 lg:justify-center lg:gap-3.5 lg:border-t-0 lg:py-10 lg:pr-12 lg:pl-11">
        <div className="flex items-center gap-3">
          {study.clientLogo ? (
            <>
              <Image src={study.clientLogo} alt={study.clientName || ""} width={215} height={91} className="h-4 w-auto lg:h-4.5" />
              <span aria-hidden="true" className="h-3.5 w-px bg-[#dadce0]" />
            </>
          ) : null}
          <p className={labelClass}>{meta(study)}</p>
        </div>
        <h3>
          <span className="block font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-ink lg:text-[26px]/8">{study.title}</span>
        </h3>
        <p className="hidden font-hp text-base/6.25 text-hp-soft sm:block">{study.excerpt}</p>
        {stats.length ? (
          <dl className="flex gap-5 pt-1 lg:gap-7 lg:pt-2">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="font-hp text-[13px]/4.5 text-hp-fine">{stat.label}</dt>
                <dd
                  className={`font-hp text-2xl/7 font-medium tracking-[-0.03em] lg:text-[28px]/8 ${index === 0 ? "text-hp-accent" : "text-hp-ink"}`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <Link href={`/results/${study.slug}`} className={`mt-1.5 lg:mt-2.5 ${readLinkClass}`}>
          Read the case study →<span className="sr-only">: {study.title}</span>
        </Link>
      </div>
    </article>
  );
}

function StudyCell({ study, index }) {
  return (
    <li
      className={`flex flex-col border-t border-hp-line ${index % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} ${
        index % 3 < 2 ? "lg:border-r" : "lg:border-r-0"
      }`}
    >
      <Reveal
        aria-hidden="true"
        className="hp-well hidden h-50 items-end justify-center overflow-hidden border-b border-hp-line px-7 pt-6 sm:flex"
      >
        <CaseStudyVisual slug={study.slug} variant="cell" />
      </Reveal>
      <div className="flex flex-1 items-start gap-3.5 px-5 py-5 sm:flex-col sm:gap-2.5 sm:px-8 sm:pt-6.5 sm:pb-8.5 lg:px-8">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2.5">
          <p className={labelClass}>{meta(study)}</p>
          <h3>
            <span className="block font-hp text-[17px]/5.75 font-medium tracking-[-0.01em] text-hp-ink sm:text-xl/6.5 sm:tracking-[-0.02em]">
              {study.title}
            </span>
          </h3>
          <p className="hidden font-hp text-[15px]/5.75 text-hp-soft sm:block">{study.excerpt}</p>
          <Link href={`/results/${study.slug}`} className={`mt-0.5 sm:mt-auto sm:pt-2 ${readLinkClass}`}>
            <span className="sm:hidden">Read →</span>
            <span className="hidden sm:inline">Read the case study →</span>
            <span className="sr-only">: {study.title}</span>
          </Link>
        </div>
        <span className="sm:hidden">
          <CaseStudyTile slug={study.slug} />
        </span>
      </div>
    </li>
  );
}

// A featured study (Rezi) followed by the rest. Also used for "More results"
// on each case study, without the head and quote.
export function CaseStudyGrid({ studies }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {studies.map((study, index) => (
        <StudyCell key={study.slug} study={study} index={index} />
      ))}
    </ul>
  );
}

export function ResultsCaseStudies({ caseStudies, eyebrow, marker }) {
  const featured = caseStudies.find((study) => study.slug === FEATURED_SLUG) ?? caseStudies[0];
  const rest = caseStudies.filter((study) => study !== featured);
  return (
    <Section id="case-studies" labelledBy="case-studies-title" className="scroll-mt-16">
      <SectionHead
        id="case-studies-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="Each account,"
        accent="from start to result."
        intro="The starting point, the changes I made, and the numbers that came out of them. Where the client allows it, screenshots come straight from the Google Ads account."
      />
      {featured ? <FeaturedStudy study={featured} /> : null}
      <CaseStudyGrid studies={rest} />
      <QuoteRow
        avatarSrc="/client pfp/natasha nooks.jpeg"
        quote="He was very proactive in keeping tabs on our ad programs, making great recommendations, and we've driven several million dollars in ARR because of him."
        name="Natasha"
        role="Marketing"
        logo={{ src: "/client-logos/nooks.png", alt: "Nooks", width: 70, height: 20 }}
        aside="Rezi approved being named. Other clients stay unnamed under NDA. Figures in USD."
        quoteClassName="lg:max-w-180"
      />
    </Section>
  );
}

const reportedMetrics = [
  {
    title: "New MRR",
    description:
      "Revenue from new customers who came through paid search, tracked from the click through to Stripe or your CRM.",
  },
  {
    title: "Months to payback",
    description: "How long it takes a customer to earn back what it cost to acquire them. This decides whether I scale the budget.",
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
    appendix: true,
  },
];

export function ResultsMeasured({ eyebrow, marker }) {
  return (
    <Section id="how-i-measure" labelledBy="measured-title" innerClassName="flex flex-col lg:flex-row">
      <div className="flex flex-col justify-between gap-6 px-5 pt-12 pb-7 sm:px-8 lg:w-105 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-12 lg:pt-18 lg:pb-12">
        <AccentHeading id="measured-title" eyebrow={eyebrow} lead="What I report," accent="and what I don't." marker={marker} />
        <div data-booking-cta-zone className="flex flex-col gap-3.5 rounded-xl border border-hp-line bg-hp-band p-5 lg:items-start">
          <p className="font-hp text-base/6 text-hp-body">
            Your reports will use the same numbers your finance team already tracks.{" "}
            <Link href="/guides/saas-paid-search-cac-ltv" className={`font-medium text-hp-ink underline underline-offset-4 ${focusRing}`}>
              How I set CAC, LTV and payback targets
            </Link>
            .
          </p>
          <BookButton size="none" className="w-full gap-2.25 rounded-[10px] px-4 py-3.25 text-base/5.5 lg:w-auto lg:py-2.75" />
        </div>
      </div>
      <ul className="flex-1 lg:py-18">
        {reportedMetrics.map((metric, index) => (
          <li
            key={metric.title}
            className={`flex flex-col gap-1.5 border-t border-hp-line px-5 py-4.5 sm:px-8 lg:gap-2 lg:py-6 lg:pr-12 lg:pl-10 ${
              index === reportedMetrics.length - 1 ? "lg:border-b" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3>
                <span
                  className={`block font-hp text-lg/6 font-medium tracking-[-0.02em] lg:text-[21px]/6.75 ${
                    metric.appendix ? "text-hp-muted line-through" : "text-hp-ink"
                  }`}
                >
                  {metric.title}
                </span>
              </h3>
              <span
                className={`shrink-0 rounded-md px-1.75 py-px font-hp-mono text-xs/4 ${
                  metric.appendix ? "bg-hp-tray text-hp-body" : "bg-[#ecfdf3] text-hp-up"
                }`}
              >
                {metric.appendix ? "APPENDIX" : "REPORTED"}
              </span>
            </div>
            <p className="font-hp text-[15px]/5.5 text-hp-soft lg:text-base/6">{metric.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
