"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Section, SectionHead, focusRing } from "@/components/home/primitives";
import { textTestimonials } from "@/components/sections/testimonialsData";

// "In writing" on /testimonials (DESIGN.md §16.12): one featured pull-quote,
// then every other written review in three hairline columns (one column on
// phones, where the first six show and the rest open on request).
// Quotes are verbatim from testimonialsData.js.

const FEATURED = "Jacob Reichman";
const MOBILE_VISIBLE = 6;

function QuoteMark({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 34 26" className={className}>
      <path
        d="M0 26V15.6C0 6.9 4.6 1.7 13 0l1.6 3.6C9.9 5 7.6 8 7.3 12H14v14H0zm19.4 0V15.6C19.4 6.9 24 1.7 32.4 0L34 3.6C29.3 5 27 8 26.7 12h6.7v14h-14z"
        fill="#155EEF"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function Person({ testimonial, size = "size-9" }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Image
        src={testimonial.avatarSrc}
        alt=""
        width={80}
        height={80}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
      <span className="flex flex-col">
        <span className="font-hp text-sm/5 font-medium text-hp-ink">{testimonial.name}</span>
        <span className="font-hp text-[13px]/4.5 text-hp-fine">{testimonial.role}</span>
      </span>
    </figcaption>
  );
}

// Spread the reviews over three columns in reading order (1, 4, 7… in the
// first), so the masonry stays balanced.
function toColumns(items, count) {
  return Array.from({ length: count }, (_, column) => items.filter((_, index) => index % count === column));
}

export default function WrittenTestimonials({ eyebrow, marker }) {
  const [expanded, setExpanded] = useState(false);
  const featured = textTestimonials.find((testimonial) => testimonial.name === FEATURED);
  const rest = textTestimonials.filter((testimonial) => testimonial !== featured);
  const columns = toColumns(rest, 3);

  return (
    <Section id="in-writing" labelledBy="written-title">
      <SectionHead
        id="written-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="What clients say"
        accent="when the camera's off."
        intro="Reviews from founders, owners and marketing leads, in SaaS and beyond."
      />

      {featured ? (
        <figure className="hp-well flex flex-col gap-4 border-t border-hp-line px-5 pt-7 pb-7.5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-12 lg:pt-11 lg:pb-11.5">
          <div className="flex max-w-190 flex-col gap-4 lg:gap-4.5">
            <QuoteMark className="w-7 lg:w-8.5" />
            <blockquote className="font-hp text-[23px]/7.5 font-medium tracking-[-0.02em] text-hp-ink lg:text-[32px]/10 lg:tracking-[-0.025em]">
              {featured.highlight}
            </blockquote>
          </div>
          <div className="w-fit shrink-0 rounded-full bg-white py-2 pr-3.5 pl-2 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)] lg:py-2.5 lg:pr-4 lg:pl-2.5">
            <Person testimonial={featured} size="size-8.5 lg:size-10" />
          </div>
        </figure>
      ) : null}

      {/* Desktop: three columns. */}
      <div className="hidden border-t border-hp-line lg:flex">
        {columns.map((column, columnIndex) => (
          <ul key={columnIndex} className={`flex-1 ${columnIndex < 2 ? "border-r border-hp-line" : ""}`}>
            {column.map((testimonial, index) => (
              <li
                key={testimonial.name}
                className={`${index < column.length - 1 ? "border-b border-hp-line" : ""} ${
                  columnIndex === 0 ? "pr-8 pl-12" : columnIndex === 2 ? "pr-12 pl-9" : "px-9"
                } pt-8 pb-8.5`}
              >
                <figure className="flex flex-col gap-5">
                  <blockquote className="font-hp text-base/6.5 text-hp-text">&quot;{testimonial.quote}&quot;</blockquote>
                  <Person testimonial={testimonial} />
                </figure>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Phones and tablets: one column, the first few then "show more". */}
      <ul className="lg:hidden">
        {rest.map((testimonial, index) => (
          <li
            key={testimonial.name}
            hidden={!expanded && index >= MOBILE_VISIBLE}
            className="border-t border-hp-line px-5 pt-6 pb-6.5 sm:px-8"
          >
            <figure className="flex flex-col gap-4">
              <blockquote className="font-hp text-base/6.5 text-hp-text">&quot;{testimonial.quote}&quot;</blockquote>
              <Person testimonial={testimonial} />
            </figure>
          </li>
        ))}
      </ul>
      {!expanded && rest.length > MOBILE_VISIBLE ? (
        <div className="px-5 pt-1 pb-7 sm:px-8 lg:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4.5 py-3.25 font-hp text-base/5.5 font-medium text-hp-ink shadow-[inset_0_0_0_1px_#d5d8de] ${focusRing}`}
          >
            Show {rest.length - MOBILE_VISIBLE} more reviews
            <ChevronDown aria-hidden="true" className="size-4" strokeWidth={2} />
          </button>
        </div>
      ) : null}
    </Section>
  );
}
