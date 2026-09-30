import Image from "next/image";
import Link from "next/link";
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
          <p className="text-sm font-bold leading-[1.5] tracking-[-0.03em] text-ink">
            {item.name}
          </p>
          <p className="text-xs leading-[1.5] text-muted">{item.role}</p>
        </div>
      </div>
    </li>
  );
}

const rowOne = textTestimonials.slice(0, 6);
const rowTwo = textTestimonials.slice(6);
const mobileMaxCardsPerRow = 4;

// Clip the marquee to the 1120px container (the grid lines) and fade the edges.
const edgeFade =
  "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

export default function TestimonialSlider({
  title = "Don't take our word for it",
  description = "What happens when paid ads actually work.",
}) {
  const rows = [rowOne, rowTwo];

  return (
    <section aria-labelledby="testimonial-slider-title" className="py-16">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px]">
          <h2
            id="testimonial-slider-title"
            className="mb-3.5 font-display text-h2 text-ink"
          >
            {title}
          </h2>
          <p className="text-lg leading-[1.5] text-body">{description}</p>
        </div>
      </div>

      <div
        className="mx-auto mt-9 w-full max-w-[1120px] overflow-hidden"
        style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
      >
        <div className="flex flex-col gap-5">
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
                    animationDirection:
                      rowIndex % 2 === 0 ? "normal" : "reverse",
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
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center px-4">
        <Link
          href="/testimonials"
          className="border-b border-ink px-1 py-3.75 text-base font-semibold text-ink"
        >
          See all testimonials
        </Link>
      </div>
    </section>
  );
}
