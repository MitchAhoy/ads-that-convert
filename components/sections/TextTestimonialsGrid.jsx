import Image from "next/image";
import { Star } from "lucide-react";
import { textTestimonials } from "@/components/sections/testimonialsData";

function TextTestimonialCard({ item }) {
  return (
    <article className="mb-3 break-inside-avoid rounded-2xl bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-zinc-300/60 sm:mb-4 sm:p-5">
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-zinc-900 text-zinc-900" strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>

      <p className="mt-3 text-base leading-[1.6] text-zinc-900">{`"${item.quote}"`}</p>

      <footer className="mt-4 border-t border-zinc-300 pt-4">
        <div className="flex items-center gap-3">
          <Image
            src={item.avatarSrc}
            alt={item.name}
            width={56}
            height={56}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-semibold leading-[1.35] tracking-tight text-zinc-900">{item.name}</p>
            <p className="text-base leading-[1.5] text-zinc-800">{item.role}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function TextTestimonialsGrid({
  title = "More client wins",
  description = "Real feedback from founders and marketing teams we have supported.",
  testimonials = textTestimonials,
}) {
  const hasHeader = Boolean(title) || Boolean(description);

  return (
    <section aria-labelledby="text-testimonials-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {hasHeader ? (
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            {title ? (
              <h2 id="text-testimonials-title" className="text-3xl font-semibold tracking-[-0.02em] text-zinc-900">
                {title}
              </h2>
            ) : null}
            {description ? <p className="text-base leading-[1.6] text-zinc-800 sm:text-md">{description}</p> : null}
          </div>
        ) : null}

        <div className={`${hasHeader ? "mt-5 sm:mt-6" : ""} columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3`}>
          {testimonials.map((item) => (
            <TextTestimonialCard key={`${item.name}-${item.role}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
