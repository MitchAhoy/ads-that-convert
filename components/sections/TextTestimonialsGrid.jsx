import Image from "next/image";
import { textTestimonials } from "@/components/sections/testimonialsData";

// Split the quote around its verbatim `highlight` (a trailing "…" marks a cut
// mid-sentence) so the strongest line can be set in ink. No match → no emphasis.
function splitQuote(item) {
  const highlight = item.highlight?.trim().replace(/…$/, "");
  const start = highlight ? item.quote.indexOf(highlight) : -1;
  if (start === -1) return [item.quote, "", ""];
  return [item.quote.slice(0, start), highlight, item.quote.slice(start + highlight.length)];
}

// Editorial "letters page" entry (DESIGN.md §7.8): no card box, a hairline above,
// the client's strongest line in ink and the rest of the quote in body colour.
function TextTestimonial({ item }) {
  const [before, highlight, after] = splitQuote(item);

  return (
    <li className="break-inside-avoid border-t border-border pt-6 pb-10">
      <figure>
        <blockquote className="-indent-[0.45em] text-lg leading-[1.5] text-pretty text-body">
          &ldquo;{before}
          {highlight ? <span className="font-medium text-ink">{highlight}</span> : null}
          {after}&rdquo;
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3">
          <Image
            src={item.avatarSrc}
            alt={item.name}
            width={72}
            height={72}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm leading-[1.5] font-bold tracking-[-0.03em] text-ink">{item.name}</p>
            <p className="text-sm leading-[1.5] text-fine">{item.role}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default function TextTestimonialsGrid({
  title = "More client wins",
  description = "Real feedback from founders and marketing teams we have supported.",
  testimonials = textTestimonials,
}) {
  const hasHeader = Boolean(title) || Boolean(description);

  return (
    <section
      aria-labelledby={title ? "text-testimonials-title" : undefined}
      aria-label={title ? undefined : "Written testimonials"}
      className="pt-16 pb-6"
    >
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {hasHeader ? (
          <div className="max-w-[680px]">
            {title ? (
              <h2 id="text-testimonials-title" className="font-display text-h2 text-balance text-ink">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className={`${title ? "mt-4" : ""} text-lg leading-[1.5] text-pretty text-body`}>{description}</p>
            ) : null}
          </div>
        ) : null}

        <ul
          className={`${hasHeader ? "mt-10 sm:mt-14" : ""} columns-1 gap-x-12 [column-rule:1px_solid_var(--color-border)] sm:columns-2 lg:columns-3`}
        >
          {testimonials.map((item) => (
            <TextTestimonial key={`${item.name}-${item.role}`} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
