import Image from "next/image";
import Link from "next/link";

export default function CaseStudyListCard({ caseStudy }) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-4">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={caseStudy.heroImage}
          alt={caseStudy.heroImageAlt}
          width={896}
          height={512}
          className="aspect-[16/9] h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
        <p className="text-sm text-zinc-600">Case Study {caseStudy.category ? `> ${caseStudy.category}` : ""}</p>
        <h2 className="mt-2 text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#011428]">
          <Link href={`/case-studies/${caseStudy.slug}`} className="hover:underline">
            {caseStudy.title}
          </Link>
        </h2>
        <p className="mt-3 text-base text-zinc-700">{caseStudy.excerpt}</p>

        <div className="mt-4 space-y-1 text-base text-zinc-600">
          <p>By {caseStudy.authorName}</p>
        </div>

        <div className="mt-5">
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#011428] bg-[#021a37] px-5 py-3 text-base font-medium leading-[1.4] text-white transition-colors hover:bg-[#032246]"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
