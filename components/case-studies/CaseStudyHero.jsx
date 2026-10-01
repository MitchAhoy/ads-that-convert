import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CaseStudyCover from "@/components/case-studies/CaseStudyCover";

// Stage card hero for a single case study (DESIGN.md §7.1): back link, meta,
// serif H1, excerpt and author, with the cover artwork below.
export default function CaseStudyHero({
  slug,
  title,
  category,
  authorName,
  authorImage,
  readTime,
  description,
  backHref = "/results",
}) {
  return (
    <section aria-labelledby="case-study-title" className="py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
        <div className="rounded-[28px] border border-border bg-white px-2 pt-10 pb-2 shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)] sm:pt-14">
          <div className="px-3 sm:px-8 lg:px-8">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-base font-medium text-body transition-colors hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              All results
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
              <div className="lg:col-span-8">
                {category ? <p className="text-sm font-medium leading-[1.5] text-muted">{category}</p> : null}
                <h1
                  id="case-study-title"
                  className="mt-3 max-w-[20ch] font-display font-medium! text-h1 text-balance text-ink"
                >
                  {title}
                </h1>
                {description ? (
                  <p className="mt-5 max-w-[32em] text-lg leading-[1.5] text-pretty text-body">{description}</p>
                ) : null}
              </div>

              <div className="flex items-center gap-3.5 lg:col-span-4 lg:justify-end">
                {authorImage ? (
                  <Image
                    src={authorImage}
                    alt=""
                    width={88}
                    height={88}
                    className="h-11 w-11 shrink-0 rounded-full bg-border object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-base font-bold leading-[1.4] tracking-[-0.03em] text-ink">{authorName}</p>
                  {readTime ? <p className="text-sm leading-[1.5] text-fine">{readTime}</p> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 aspect-4/3 overflow-hidden rounded-[20px] bg-surface sm:mt-12 sm:aspect-2/1">
            <CaseStudyCover slug={slug} size="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
