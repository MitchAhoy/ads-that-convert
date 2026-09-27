import Image from "next/image";
import { textTestimonials } from "@/components/sections/testimonialsData";

function cardWidth(quote) {
  if (quote.length < 110) return 240;
  if (quote.length < 170) return 290;
  return 340;
}

function TestimonialCard({ item, className = "" }) {
  return (
    <li
      style={{ width: `${cardWidth(item.quote)}px` }}
      className={`box-border flex shrink-0 flex-col gap-3 rounded-2xl border border-border bg-white pt-5 px-5 pb-4.5 ${className}`}
    >
      <p className="text-sm leading-[1.5] text-body text-wrap-pretty">{`"${item.quote}"`}</p>
      <div className="mt-auto flex items-center gap-3 pt-1">
        <Image
          src={item.avatarSrc}
          alt={item.name}
          width={72}
          height={72}
          className="h-9 w-9 shrink-0 rounded-full object-cover saturate-[2.4]"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold leading-[1.5] tracking-[-0.03em] text-ink">{item.name}</p>
          <p className="text-xs leading-[1.5] text-muted">{item.role}</p>
        </div>
      </div>
    </li>
  );
}

const rowOne = textTestimonials.slice(0, 6);
const rowTwo = textTestimonials.slice(6);
const mobileMaxCardsPerRow = 4;

export default function TestimonialSlider({
  title = "Don't take our word for it",
  description = "What happens when paid ads actually work.",
}) {
  const rows = [rowOne, rowTwo];

  return (
    <section aria-labelledby="testimonial-slider-title" className="py-16">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px]">
          <h2 id="testimonial-slider-title" className="mb-3.5 text-h2 text-ink">
            {title}
          </h2>
          <p className="text-lg leading-[1.5] text-body">{description}</p>
        </div>
      </div>

      <div className="relative left-1/2 mt-9 w-screen -translate-x-1/2">
        <div className="relative">
          <div className="flex flex-col gap-5 overflow-hidden">
            {rows.map((row, rowIndex) => {
              const mobileRow = row.slice(0, mobileMaxCardsPerRow);
              const shouldHideOnMobile = rowIndex === 1;

              return (
              <div
                key={`row-${rowIndex}`}
                className={`overflow-hidden ${shouldHideOnMobile ? "hidden sm:block" : ""}`}
              >
                <ul
                  className="testimonial-horizontal-marquee flex w-max gap-4"
                  style={{
                    animationDuration: "70s",
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
                "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 35%, rgba(255, 255, 255, 0.55) 68%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32"
            style={{
              background:
                "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 35%, rgba(255, 255, 255, 0.55) 68%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
