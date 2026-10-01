import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import QuoteAttribution from "@/components/ui/QuoteAttribution";

const results = [
  {
    label: "B2B AI SaaS · built from scratch",
    metric: "$2,219",
    stat: "New MRR in the first 30 days",
    description: "With a 2.89-month payback.",
    href: "/results/ai-b2b-saas-case-study",
  },
  {
    label: "B2B SaaS · freemium",
    metric: "$3,664",
    stat: "New MRR per month",
    description: "From non-branded search terms.",
    href: "/results/b2b-saas-case-study",
  },
  {
    label: "B2B SaaS · sales-led",
    metric: "2x",
    stat: "B2B pipeline, doubled",
    description: "In under 2 months.",
    href: "/results/b2b-saas-leads",
  },
];

// Also used by service pages for account snapshots, which have no case study to link to.
export function ResultCard({ label, metric, stat, description, href }) {
  return (
    <li className="flex h-full flex-col rounded-3xl border border-border bg-white px-6 pt-6 pb-6 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] sm:px-7 sm:pt-7">
      <p className="text-sm font-medium leading-[1.5] text-muted">{label}</p>
      <p className="mt-5 font-display text-6xl tabular-nums text-ink">
        <CountUp value={metric} />
      </p>
      <p className="mt-2 text-lg font-medium leading-[1.4] text-ink">{stat}</p>
      <p className="mt-5 flex-1 border-t border-border pt-5 text-copy leading-[1.5] text-body">{description}</p>
      {href ? (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1 self-start border-b border-ink text-base font-semibold text-ink transition-colors hover:border-body hover:text-body"
        >
          Read the case study
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </Link>
      ) : null}
    </li>
  );
}

export default function ResultsProof({
  sectionId = "results",
  title = "Reported in trials, pipeline and MRR",
  description = "Clicks and CTR are inputs. What I report is what the account produced: trials, demos, pipeline, new MRR and months to payback.",
  quote = {
    quote: "We would highly recommend this team to any SaaS business serious about paid growth.",
    person: "Dave Batchelor",
    role: "Co-Founder",
    company: "DialMyCalls",
    companyLogoSrc: "/client-logos/dialmycalls.png",
    avatarSrc: "/client pfp/dave batchelor.png",
  },
}) {
  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-title`} className="pt-16 pb-12 sm:pt-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-[680px] sm:mb-14">
          <h2
            id={`${sectionId}-title`}
            className="font-display text-h2 text-balance text-ink"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">{description}</p>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {results.map((result) => (
            <ResultCard key={result.href} {...result} />
          ))}
        </ul>

        <p className="mt-7 text-sm text-fine">
          Clients stay unnamed under NDA. Each result links to its full case study.
        </p>

        <QuoteAttribution
          compact
          className="mt-9 border-t border-border pt-7"
          {...quote}
          companyLogoAlt={`${quote.company} logo`}
          avatarAlt={quote.person}
        />
      </div>
    </section>
  );
}
