import { compileMDX } from "next-mdx-remote/rsc";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import CaseStudyListCard from "@/components/case-studies/CaseStudyListCard";
import CaseStudyQuoteCard from "@/components/case-studies/CaseStudyQuoteCard";
import CaseStudyResultsTable from "@/components/case-studies/CaseStudyResultsTable";
import CaseStudyScreenshot from "@/components/case-studies/CaseStudyScreenshot";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { getCaseStudies } from "@/lib/caseStudies";

// Markdown images: the optional title (`![alt](src "Monthly report")`) becomes
// the window label.
function MdxImage({ src, alt, title }) {
  return <CaseStudyScreenshot src={src} alt={alt} label={title || "Screenshot"} className="mt-8" />;
}

const mdxComponents = {
  CaseStudySection,
  CaseStudyQuoteCard,
  img: MdxImage,
};

// Full case study page body, shared by /results/[slug] and /case-studies/[slug].
export default async function CaseStudyArticle({ caseStudy, backHref = "/results" }) {
  const [{ content }, allStudies] = await Promise.all([
    compileMDX({
      source: caseStudy.content,
      components: mdxComponents,
      options: { parseFrontmatter: false },
    }),
    getCaseStudies(),
  ]);

  const moreStudies = allStudies.filter((study) => study.slug !== caseStudy.slug).slice(0, 3);

  return (
    <>
      <GridFrame bleedTop>
        <CaseStudyHero
          slug={caseStudy.slug}
          title={caseStudy.title}
          category={caseStudy.category}
          authorName={caseStudy.authorName}
          authorImage={caseStudy.authorImage}
          readTime={caseStudy.readTime}
          description={caseStudy.excerpt}
          backHref={backHref}
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <article aria-labelledby="case-study-title" className="pt-4 pb-12 [counter-reset:case-section] sm:pt-6">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            {content}
            <CaseStudyResultsTable table={caseStudy.resultsTable} />
          </div>
        </article>
      </GridFrame>

      {caseStudy.proofImage ? (
        <>
          <GridDivider />
          <GridFrame>
            <section aria-labelledby="case-study-proof-title" className="pt-16 pb-12 sm:pt-20">
              <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
                <div className="max-w-[680px]">
                  <h2 id="case-study-proof-title" className="font-display text-h2 text-balance text-ink">
                    Straight from the Google Ads account
                  </h2>
                  <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">
                    An unedited screenshot of the campaigns view, with the conversion and MRR columns I report on.
                  </p>
                </div>
                <figure className="mt-10 sm:mt-14">
                  <CaseStudyScreenshot src={caseStudy.proofImage} alt={caseStudy.proofImageAlt || ""} />
                  <figcaption className="mt-5 text-sm text-fine">
                    Client unnamed under NDA. Figures in USD.
                  </figcaption>
                </figure>
              </div>
            </section>
          </GridFrame>
        </>
      ) : null}

      {moreStudies.length > 0 ? (
        <>
          <GridDivider />
          <GridFrame>
            <section aria-labelledby="more-results-title" className="pt-16 pb-12 sm:pt-20">
              <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
                <div className="max-w-[680px]">
                  <h2 id="more-results-title" className="font-display text-h2 text-balance text-ink">
                    More results
                  </h2>
                  <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">
                    Other accounts, reported the same way: new MRR, payback and pipeline.
                  </p>
                </div>
                <ul className="mt-10 grid grid-cols-1 gap-5.5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
                  {moreStudies.map((study) => (
                    <li key={study.slug}>
                      <CaseStudyListCard caseStudy={study} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </GridFrame>
        </>
      ) : null}

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>
    </>
  );
}
