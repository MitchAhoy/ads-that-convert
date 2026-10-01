import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseStudyCover from "@/components/case-studies/CaseStudyCover";

// Feature card with a recessed cover well (DESIGN.md §7.3). The whole card is
// clickable through the title link's stretched `after:` overlay.
export default function CaseStudyListCard({ caseStudy, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const href = `/results/${caseStudy.slug}`;
  const meta = [caseStudy.category, caseStudy.readTime].filter(Boolean).join(" · ");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]">
      <div className="aspect-16/10 overflow-hidden rounded-[18px] bg-surface">
        <CaseStudyCover slug={caseStudy.slug} size="card" />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-5.5 pb-6 sm:px-5">
        {meta ? <p className="text-sm font-medium leading-[1.5] text-muted">{meta}</p> : null}
        <Heading className="mt-2 text-xl font-bold text-pretty text-ink">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ink/60"
          >
            {caseStudy.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-copy leading-[1.5] text-pretty text-body">{caseStudy.excerpt}</p>
        <span
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-1 self-start border-b border-ink text-base font-semibold text-ink transition-colors group-hover:border-body group-hover:text-body"
        >
          Read the case study
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </article>
  );
}
