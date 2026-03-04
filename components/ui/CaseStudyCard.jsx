import Image from "next/image";
import Link from "next/link";

export default function CaseStudyCard({
  imageSrc,
  imageAlt,
  href = "#",
  ctaLabel = "Read More",
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={896}
          height={512}
          className="aspect-[16/9] h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center px-1 pb-2 pt-4">
        <Link
          href={href}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-[#011428] bg-[#021a37] px-5 py-3 text-base font-medium leading-[1.4] text-white transition-colors hover:bg-[#032246]"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
