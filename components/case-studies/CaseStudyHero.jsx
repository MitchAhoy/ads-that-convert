import Image from "next/image";

export default function CaseStudyHero({
  title,
  authorName,
  readTime,
  heroImage,
  heroImageAlt,
  summaryMetric,
}) {
  return (
    <section className="pt-4 pb-5 sm:pt-5 sm:pb-6" aria-labelledby="case-study-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-start">
          <div>
            <h1 id="case-study-title" className="max-w-[18ch] text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#011428] sm:text-5xl">
              {title}
            </h1>

            {summaryMetric ? (
              <p className="mt-4 text-lg font-medium leading-[1.5] text-zinc-700">{summaryMetric}</p>
            ) : null}

            <div className="mt-8 space-y-1 text-base text-zinc-700">
              <p>
                By {authorName}
                {readTime ? ` · ${readTime}` : ""}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              width={1120}
              height={630}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
