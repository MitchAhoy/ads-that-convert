import Link from "next/link";
import { QuoteRow, Section, SectionHead } from "@/components/home/primitives";

// `short*` fields are the tighter phone copy from the mobile artboard.
const results = [
  {
    label: "B2C AI SaaS",
    shortLabel: "B2C AI SaaS",
    metric: "129",
    stat: "Paying customers a month",
    description: "Up from 29 in six months, profitable every month.",
    shortDescription: "Up from 29 in six months.",
    href: "/results/rezi-case-study",
  },
  {
    label: "B2B AI SaaS · From scratch",
    shortLabel: "B2B AI SaaS",
    metric: "$2,219",
    stat: "New MRR in the first 30 days",
    shortStat: "New MRR in 30 days",
    description: "With a 2.89-month payback.",
    shortDescription: "2.89-month payback.",
    href: "/results/ai-b2b-saas-case-study",
  },
  {
    label: "B2B SaaS · Freemium",
    shortLabel: "B2B · Freemium",
    metric: "$3,664",
    stat: "New MRR per month",
    description: "From non-branded search terms.",
    shortDescription: "From non-branded search.",
    href: "/results/b2b-saas-case-study",
  },
  {
    label: "B2B SaaS · Sales-led",
    shortLabel: "B2B · Sales-led",
    metric: "2x",
    stat: "B2B pipeline, doubled",
    description: "In under 2 months.",
    href: "/results/b2b-saas-leads",
  },
];

function Responsive({ full, short }) {
  if (!short || short === full) return full;
  return (
    <>
      <span className="lg:hidden">{short}</span>
      <span className="hidden lg:inline">{full}</span>
    </>
  );
}

const homeQuote = {
  avatarSrc: "/client pfp/dave batchelor.png",
  quote: "We would highly recommend this team to any SaaS business serious about paid growth.",
  name: "Dave Batchelor",
  role: "Co-Founder",
  logo: { src: "/client-logos/dialmycalls.png", alt: "DialMyCalls", width: 75, height: 30 },
  aside: "Rezi approved being named. Other clients stay unnamed under NDA. Each result links to its full case study.",
};

// Defaults are the homepage copy; the Google Ads service page passes its own.
// /results passes `lead={null}` (no section head, the band sits under its hero)
// and `quote={null}`.
export default function HomeResults({
  eyebrow = "02 · Results",
  marker = 1,
  lead = "Reported in trials,",
  accent = "pipeline and MRR.",
  intro = "Clicks and CTR are inputs. What I report is what the account produced: trials, demos, pipeline, new MRR and months to payback.",
  quote = homeQuote,
}) {
  return (
    <Section id="results" labelledBy="results-title">
      {lead ? (
        <SectionHead id="results-title" marker={marker} eyebrow={eyebrow} lead={lead} accent={accent} intro={intro} />
      ) : (
        <h2 id="results-title" className="sr-only">
          Headline results
        </h2>
      )}

      {/* Dark band: the one ink moment on the page, so the numbers lead. */}
      <ul className="hp-ink-band grid grid-cols-2 lg:grid-cols-4">
        {results.map((result, index) => (
          <li
            key={result.href}
            className={`group relative flex flex-col gap-1.5 p-5 sm:px-8 lg:gap-0 lg:px-7 lg:pt-8 lg:pb-7.5 ${
              index % 2 === 0 ? "border-r border-[#24262b]" : ""
            } ${index < 2 ? "border-b border-[#24262b] lg:border-b-0" : ""} ${index === 1 ? "lg:border-r lg:border-[#24262b]" : ""}`}
          >
            <p className="font-hp-mono text-[11px]/3.5 tracking-[0.06em] text-[#8f96a3] uppercase lg:text-xs/4">
              <Responsive full={result.label} short={result.shortLabel} />
            </p>
            <p
              className="pt-2.5 font-hp text-[38px]/10.5 font-medium tracking-[-0.04em] text-white tabular-nums transition-colors duration-200 group-focus-within:text-[#7ea3fa] group-hover:text-[#7ea3fa] lg:pt-10 lg:text-[56px]/15"
            >
              {result.metric}
            </p>
            <p className="font-hp text-[15px]/5.25 font-medium text-white lg:h-14 lg:shrink-0 lg:pt-2 lg:text-[17px]/6">
              <Responsive full={result.stat} short={result.shortStat} />
            </p>
            <p className="font-hp text-sm/5 text-[#a3a9b3] lg:h-21 lg:shrink-0 lg:pt-2.5 lg:text-[15px]/5.75">
              <Responsive full={result.description} short={result.shortDescription} />
            </p>
            {/* The link covers the whole cell (absolute on phones, a stretched ::after
                from `lg`); its label only shows from `lg`. */}
            <Link
              href={result.href}
              className={`absolute inset-0 font-hp text-sm/5 font-medium text-white hover:text-[#7ea3fa] lg:static lg:after:absolute lg:after:inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white`}
            >
              <span className="sr-only lg:not-sr-only">Read the case study →</span>
              <span className="sr-only">: {result.stat}</span>
            </Link>
          </li>
        ))}
      </ul>

      {quote ? <QuoteRow {...quote} /> : null}
    </Section>
  );
}
