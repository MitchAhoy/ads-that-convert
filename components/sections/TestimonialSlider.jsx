import Image from "next/image";
import { Star } from "lucide-react";
import { textTestimonials } from "@/components/sections/testimonialsData";

function TestimonialCard({ item, className = "" }) {
  const quoteMaxLength = 170;
  const compactQuote =
    item.quote.length <= quoteMaxLength
      ? item.quote
      : `${item.quote.slice(0, quoteMaxLength).replace(/\s+\S*$/, "").trim()}...`;

  return (
    <li
      className={`flex h-[232px] w-[320px] shrink-0 flex-col rounded-[20px] bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-zinc-300/60 sm:h-[248px] sm:w-[360px] sm:p-5 ${className}`}
    >
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-zinc-900 text-zinc-900" strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>

      <p className="mt-3 text-base leading-[1.6] text-zinc-900">{`"${compactQuote}"`}</p>

      <div className="mt-auto flex items-center gap-2.5 pt-3">
        <Image
          src={item.avatarSrc}
          alt={item.name}
          width={56}
          height={56}
          className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
        />
        <div>
          <p className="text-base font-semibold leading-[1.35] tracking-tight text-zinc-900">{item.name}</p>
          <p className="mt-0.5 text-base leading-[1.5] text-zinc-800">{item.role}</p>
        </div>
      </div>
    </li>
  );
}

const testimonialRows = [0, 1].map((rowIndex) =>
  textTestimonials.filter((_, testimonialIndex) => testimonialIndex % 2 === rowIndex)
);

const mobileMaxCardsPerRow = 4;

export default function TestimonialSlider({
  title = "Don't take our word for it",
  description = "What happens when paid ads actually work.",
}) {
  return (
    <section aria-labelledby="testimonial-slider-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <h2 id="testimonial-slider-title" className="text-3xl font-semibold tracking-[-0.02em] text-zinc-900">
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-[1.6] text-zinc-800 sm:text-lg">{description}</p>
        </div>
      </div>

      <div className="relative left-1/2 mt-5 w-screen -translate-x-1/2">
        <div className="relative">
          <div className="space-y-4 overflow-hidden sm:space-y-5">
            {testimonialRows.map((row, rowIndex) => {
              const mobileRow = row.slice(0, mobileMaxCardsPerRow);
              const shouldHideOnMobile = rowIndex === 1;

              return (
              <div
                key={`row-${rowIndex}`}
                className={`overflow-hidden ${shouldHideOnMobile ? "hidden sm:block" : ""}`}
              >
                <ul
                  className="testimonial-horizontal-marquee flex w-max gap-4 sm:gap-5"
                  style={{
                    animationDuration: "40s",
                    animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse",
                  }}
                  aria-label="Client testimonial cards"
                >
                  {[...mobileRow, ...mobileRow].map((item, itemIndex) => (
                    <TestimonialCard
                      key={`${item.name}-mobile-${itemIndex}`}
                      item={item}
                      className="sm:hidden"
                    />
                  ))}
                  {[...row, ...row].map((item, itemIndex) => (
                    <TestimonialCard
                      key={`${item.name}-desktop-${itemIndex}`}
                      item={item}
                      className="hidden sm:flex"
                    />
                  ))}
                </ul>
              </div>
            )})}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32"
            style={{
              background:
                "linear-gradient(to right, rgba(233, 234, 236, 1) 0%, rgba(233, 234, 236, 0.92) 35%, rgba(233, 234, 236, 0.55) 68%, rgba(233, 234, 236, 0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32"
            style={{
              background:
                "linear-gradient(to left, rgba(233, 234, 236, 1) 0%, rgba(233, 234, 236, 0.92) 35%, rgba(233, 234, 236, 0.55) 68%, rgba(233, 234, 236, 0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
