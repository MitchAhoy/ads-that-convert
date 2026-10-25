import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { BookButton, Section, SectionHead, AccentUnderline, focusRing, hpBookingBarButton } from "@/components/home/primitives";
import CaseStudyQuoteCard from "@/components/case-studies/CaseStudyQuoteCard";
import CaseStudyResultsTable from "@/components/case-studies/CaseStudyResultsTable";
import CaseStudyScreenshot from "@/components/case-studies/CaseStudyScreenshot";
import CaseStudySection, { sectionId, toSentenceCase } from "@/components/case-studies/CaseStudySection";
import CaseStudyVisual, { hasCaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { CaseStudyGrid } from "@/components/case-studies/ResultsSections";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { getCaseStudies } from "@/lib/caseStudies";

// Full case study page, used by /results/[slug] (DESIGN.md §16.11).

// Markdown images: the optional title (`![alt](src "Monthly report")`) becomes
// the window label.
function MdxImage({ src, alt, title }) {
  return <CaseStudyScreenshot src={src} alt={alt} label={title || "Screenshot"} className="my-2" />;
}

const mdxComponents = {
  CaseStudySection,
  CaseStudyQuoteCard,
  img: MdxImage,
};

// Section titles for the sidebar, read from the MDX source.
function getSectionTitles(source) {
  return [...source.matchAll(/<CaseStudySection\s+title="([^"]+)"/g)].map((match) => toSentenceCase(match[1]));
}

// The H1 ends in the pen-underlined accent phrase: the part after the last comma, or
// from the last "for", "from" or "with", or the last two words.
function splitTitle(title) {
  const comma = title.lastIndexOf(", ");
  if (comma > 0) return [title.slice(0, comma + 1), title.slice(comma + 2)];
  const joint = Math.max(...[" for ", " from ", " with "].map((word) => title.lastIndexOf(word)));
  if (joint > 0) return [title.slice(0, joint), title.slice(joint + 1)];
  const words = title.split(" ");
  if (words.length < 4) return ["", title];
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

function CaseStudyHero({ caseStudy }) {
  const [lead, accent] = splitTitle(caseStudy.title);
  return (
    <Section labelledBy="case-study-title" innerClassName="flex flex-col lg:flex-row">
      <div className="flex flex-col gap-4 px-5 pt-6 pb-8 sm:px-8 lg:w-150 lg:shrink-0 lg:gap-5 lg:border-r lg:border-hp-line lg:px-12 lg:pt-10 lg:pb-13">
        <Link
          href="/results"
          className={`inline-flex w-fit items-center gap-2 rounded font-hp text-sm/5 font-medium text-hp-body transition-colors hover:text-hp-ink ${focusRing}`}
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
          All results
        </Link>
        <div className="flex items-center gap-3 pt-2 lg:pt-4">
          {caseStudy.clientLogo ? (
            <>
              <Image src={caseStudy.clientLogo} alt={caseStudy.clientName || ""} width={215} height={91} className="h-4.5 w-auto lg:h-5.5" />
              <span aria-hidden="true" className="h-3.5 w-px bg-[#dadce0]" />
            </>
          ) : null}
          <p className="font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">{caseStudy.category} · Case study</p>
        </div>
        <h1 id="case-study-title">
          <span className="block font-hp text-[34px]/10 font-medium tracking-[-0.035em] text-hp-ink lg:text-5xl/13.5">
            {lead}{" "}
            <AccentUnderline seed={`case:${accent}`}>{accent}</AccentUnderline>
          </span>
        </h1>
        <p className="font-hp text-[17px]/6.5 text-hp-body lg:text-lg/7">{caseStudy.excerpt}</p>
        <div className="flex items-center gap-3 pt-1 lg:pt-2">
          {caseStudy.authorImage ? (
            <Image src={caseStudy.authorImage} alt="" width={72} height={72} className="size-9 rounded-full object-cover" />
          ) : null}
          <div className="flex flex-col">
            <span className="font-hp text-sm/5 font-medium text-hp-ink">{caseStudy.authorName}</span>
            <span className="font-hp text-[13px]/4.5 text-hp-fine">
              Ran the account{caseStudy.readTime ? ` · ${caseStudy.readTime}` : ""}
            </span>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="hp-well hidden flex-1 px-7 pt-12 lg:flex xl:px-9">
        {hasCaseStudyVisual(caseStudy.slug, "hero") ? (
          <CaseStudyVisual slug={caseStudy.slug} variant="hero" />
        ) : (
          <div className="flex w-full items-end">
            <CaseStudyScreenshot src={caseStudy.detailHeroImage} alt="" label="Monthly report" className="w-full rounded-b-none" />
          </div>
        )}
      </div>
    </Section>
  );
}

function StatsBand({ stats }) {
  if (!stats.length) return null;
  return (
    <section aria-label="Results at a glance" className="border-b border-hp-line hp-hatch">
      <dl className="hp-ink-band mx-auto grid w-full max-w-[1120px] grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse justify-end gap-1 border-[#24262b] px-5 py-5.5 sm:px-8 lg:px-6 lg:py-9 ${
              index % 2 === 0 ? "border-r" : ""
            } ${index < stats.length - (stats.length % 2 === 0 ? 2 : 1) ? "border-b lg:border-b-0" : ""} ${
              index < stats.length - 1 ? "lg:border-r" : "lg:border-r-0"
            } ${index === stats.length - 1 && stats.length % 2 === 1 ? "col-span-2 border-r-0 lg:col-span-1" : ""} ${
              index === 0 ? "lg:pl-12" : ""
            }`}
          >
            <dd className="font-hp text-[13px]/4.5 text-[#a3a9b3] lg:text-sm/5">{stat.detail}</dd>
            <dt className="font-hp text-sm/4.75 font-medium text-white lg:text-[15px]/5.25">{stat.label}</dt>
            <dd
              className={`font-hp text-[32px]/9 font-medium tracking-[-0.04em] tabular-nums lg:text-[44px]/12 ${
                index === 0 ? "text-[#7ea3fa]" : "text-white"
              }`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Sidebar({ titles, hasProof }) {
  const items = [...titles.map((title) => ({ title, id: sectionId(title) }))];
  if (hasProof) items.push({ title: "From the account", id: "from-the-account" });
  return (
    <aside className="hidden lg:block lg:w-85 lg:shrink-0 lg:border-r lg:border-hp-line">
      <div className="sticky top-16 flex flex-col gap-7 py-14 pr-10 pl-12">
        <nav aria-label="On this page" className="flex flex-col gap-1">
          <p className="pb-2.5 font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">On this page</p>
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-2.5 border-l-2 border-hp-line py-1.75 pl-3 font-hp text-[15px]/5 text-hp-body transition-colors hover:border-hp-accent hover:text-hp-ink ${focusRing}`}
            >
              <span className="font-hp-mono text-xs/4 text-hp-muted">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          ))}
        </nav>
        <div data-booking-cta-zone className="flex flex-col gap-3.5 rounded-xl border border-hp-line bg-hp-band p-5">
          <div className="flex flex-col gap-1">
            <p className="font-hp text-[17px]/6 font-medium text-hp-ink">Want the same for your SaaS?</p>
            <p className="font-hp text-sm/5.25 text-hp-body">15 minutes with me. You&apos;ll leave with a go or no-go on Google Ads.</p>
          </div>
          <BookButton size="none" className="w-full gap-2.25 rounded-[10px] px-4 py-2.75 text-base/5.5" />
        </div>
      </div>
    </aside>
  );
}

function Proof({ caseStudy, number }) {
  if (!caseStudy.proofImage) return null;
  return (
    <Section id="from-the-account" labelledBy="proof-title" className="scroll-mt-16">
      <SectionHead
        id="proof-title"
        marker={0}
        eyebrow={`${String(number).padStart(2, "0")} · From the account`}
        lead="Straight from the"
        accent="Google Ads account."
        intro={
          caseStudy.proofIntro ||
          "An unedited screenshot of the campaigns view, with the conversion and MRR columns I report on."
        }
      />
      <figure className="flex flex-col gap-4.5 px-5 pb-10 sm:px-8 lg:px-12 lg:pb-12">
        <CaseStudyScreenshot src={caseStudy.proofImage} alt={caseStudy.proofImageAlt || ""} />
        <figcaption className="max-w-205 font-hp text-[13px]/5 text-hp-fine lg:text-sm/5.25">
          {caseStudy.proofCaption || "Client unnamed under NDA. Figures in USD."}
        </figcaption>
      </figure>
    </Section>
  );
}

function MoreResults({ studies }) {
  if (!studies.length) return null;
  return (
    <Section labelledBy="more-results-title">
      <div className="flex flex-col gap-2 px-5 pt-10 pb-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pt-14 lg:pb-9">
        <div className="flex flex-col gap-2.5">
          <p className="font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">More results</p>
          <h2 id="more-results-title">
            <span className="block font-hp text-2xl/7.5 font-medium tracking-[-0.025em] text-hp-ink lg:text-[28px]/8.5">
              Other accounts, reported the same way
            </span>
          </h2>
        </div>
        <Link
          href="/results"
          className={`hidden w-fit border-b border-hp-ink py-1.5 font-hp text-base/5.5 font-medium text-hp-ink lg:block ${focusRing}`}
        >
          All results →
        </Link>
      </div>
      <div className="lg:border-t lg:border-hp-line">
        <CaseStudyGrid studies={studies} />
      </div>
    </Section>
  );
}

export default async function CaseStudyArticle({ caseStudy }) {
  const [{ content }, allStudies] = await Promise.all([
    compileMDX({
      source: caseStudy.content,
      components: mdxComponents,
      options: { parseFrontmatter: false },
    }),
    getCaseStudies(),
  ]);

  const titles = getSectionTitles(caseStudy.content);
  const moreStudies = allStudies.filter((study) => study.slug !== caseStudy.slug).slice(0, 3);

  return (
    <>
      <main className="bg-white">
        <CaseStudyHero caseStudy={caseStudy} />
        <StatsBand stats={caseStudy.stats} />
        <Section label="Case study" innerClassName="flex">
          <Sidebar titles={titles} hasProof={Boolean(caseStudy.proofImage)} />
          <article
            aria-labelledby="case-study-title"
            className="flex min-w-0 flex-1 flex-col gap-10 px-5 pt-9 pb-10 [counter-reset:case-section] sm:px-8 lg:gap-13 lg:pt-14 lg:pr-24 lg:pb-16 lg:pl-16"
          >
            {content}
            <CaseStudyResultsTable table={caseStudy.resultsTable} />
          </article>
        </Section>
        <Proof caseStudy={caseStudy} number={titles.length + 1} />
        <MoreResults studies={moreStudies} />
        <HomeFinalCta underlineSeed={`case:${caseStudy.slug}`} />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
