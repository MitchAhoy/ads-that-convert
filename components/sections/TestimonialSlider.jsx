import Image from "next/image";
import Link from "next/link";
import { textTestimonials } from "@/components/sections/testimonialsData";

// Show only the strongest line (a verbatim `highlight`) so the wall scans quickly.
// Falls back to the full quote if the highlight is missing or not verbatim.
function getExcerpt(item) {
  const highlight = item.highlight?.trim();
  if (!highlight) return item.quote;
  return item.quote.includes(highlight.replace(/…$/, "")) ? highlight : item.quote;
}

function cardWidth(text) {
  if (text.length < 55) return 260;
  if (text.length < 90) return 310;
  return 360;
}

function TestimonialCard({ item, className = "" }) {
  const excerpt = getExcerpt(item);
  const isExcerpt = excerpt !== item.quote;

  return (
    <li
      style={{ width: `${cardWidth(excerpt)}px` }}
      className={`box-border flex shrink-0 flex-col gap-4 rounded-2xl border border-border bg-white pt-5 px-5 pb-4.5 ${className}`}
    >
      <p
        aria-hidden={isExcerpt || undefined}
        className="text-lg font-medium leading-[1.5] text-ink text-wrap-pretty"
      >
        {`"${excerpt}"`}
      </p>
      {isExcerpt && <p className="sr-only">{`"${item.quote}"`}</p>}
      <div className="mt-auto flex items-center gap-3 pt-1">
        <Image
          src={item.avatarSrc}
          alt={item.name}
          width={72}
          height={72}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold leading-[1.5] tracking-[-0.03em] text-ink">
            {item.name}
          </p>
          <p className="text-sm leading-[1.5] text-fine">{item.role}</p>
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
    <section aria-labelledby="testimonial-slider-title" className="pt-16 pb-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px]">
          <h2
            id="testimonial-slider-title"
            className="mb-4 font-display text-h2 text-ink"
          >
            {title}
          </h2>
          <p className="text-lg leading-[1.5] text-body">{description}</p>
        </div>
      </div>

      <div
        className="mx-auto mt-10 w-full max-w-[1120px] overflow-hidden sm:mt-14"
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
