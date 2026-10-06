import Image from "next/image";
import Link from "next/link";

export default function VideoTestimonialCard({
  thumbnailSrc = "/hero-left-image.svg",
  thumbnailAlt = "Video testimonial preview",
  quote = "Their creative approach truly impressed me. I've collaborated with other branding teams before, but none matched their clarity and precision. From the first meeting to final delivery, everything was smooth, thoughtful, and impactful.",
  name = "Jamie R.",
  role = "CEO",
  company = "Geneva",
  videoHref = "#",
}) {
  return (
    <article className="rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
      <div className="relative overflow-hidden rounded-[1.1rem]">
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={896}
          height={504}
          className="aspect-[16/9] h-auto w-full object-cover"
        />
        <Link
          href={videoHref}
          aria-label={`Play video testimonial by ${name}`}
          className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/65"
        >
          <span aria-hidden="true" className="ml-1 text-xl leading-none">
            ▶
          </span>
        </Link>
      </div>

      <blockquote className="mt-4 text-base leading-[1.6] text-zinc-800 sm:text-md">
        {quote}
      </blockquote>

      <footer className="mt-4 border-t border-zinc-300 pt-4">
        <p className="text-base font-semibold leading-[1.4] text-zinc-900">{name}</p>
        <p className="text-sm leading-[1.5] text-zinc-600">
          {role} of {company}
        </p>
      </footer>
    </article>
  );
}
