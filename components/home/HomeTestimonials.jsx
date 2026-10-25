"use client";

import { useEffect, useRef, useState } from "react";
import HomeVideoCard from "@/components/home/HomeVideoCard";
import { AccentHeading, BookButton, Section, SectionHead } from "@/components/home/primitives";
import { videos } from "@/components/sections/videoTestimonialsData";

// Short roles and logo boxes as designed (the full "Founder @ Senja" style
// positions stay in the shared data for other pages).
const homeDetails = {
  Olly: { role: "Founder", logoBox: "h-9 w-21.5 -mr-2 self-start" },
  Natasha: { role: "Marketing", logoBox: "h-8 w-20 -mr-1.5" },
  Lauren: { role: "Marketing", logoBox: "h-6.25 w-32" },
  Sander: { role: "Founder", logoBox: "h-6 w-29.5" },
};

const homeVideos = videos.map((video) => ({ ...video, ...homeDetails[video.clientName] }));

// Four video testimonials side by side on desktop; a swipe row with dots
// below `lg`. Ends with the mid-page booking band.
// Defaults are the homepage copy; service pages pass their own label and
// marker, and name their channel in the booking band.
export default function HomeTestimonials({
  eyebrow = "01 · Clients",
  marker = 0,
  ctaBody = "I'll tell you on the call whether paid search will work for you, and what it would take.",
  intro,
  showCta = true,
}) {
  const rowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const onScroll = () => {
      const card = row.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(row).columnGap || "0");
      const maxScroll = row.scrollWidth - row.clientWidth;
      // The last card can't snap to the left edge, so treat "scrolled to the end" as the last dot.
      const index = row.scrollLeft >= maxScroll - 2 ? homeVideos.length - 1 : Math.round(row.scrollLeft / step);
      setActiveIndex(Math.min(homeVideos.length - 1, Math.max(0, index)));
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="dont-take-my-word-for-it" labelledBy="video-testimonials-title">
      {intro ? (
        <SectionHead id="video-testimonials-title" eyebrow={eyebrow} lead="Founders and marketers," accent="on the record." marker={marker} intro={intro} />
      ) : (
        <div className="px-5 pt-12 pb-6 sm:px-8 lg:px-12 lg:pt-18 lg:pb-12">
          <AccentHeading id="video-testimonials-title" eyebrow={eyebrow} lead="Founders and marketers," accent="on the record." marker={marker} />
        </div>
      )}

      <ul
        ref={rowRef}
        aria-label="Video testimonials"
        className="hide-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:scroll-px-8 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-0 lg:overflow-visible lg:border-t lg:border-hp-line lg:px-0"
      >
        {homeVideos.map((video) => (
          <li
            key={video.playbackId}
            className="w-72.5 shrink-0 snap-start rounded-[18px] border border-hp-line px-3 pt-3 pb-5 lg:w-auto lg:min-w-0 lg:rounded-none lg:border-0 lg:border-r lg:px-5 lg:pt-5 lg:pb-7 lg:last:border-r-0"
          >
            <HomeVideoCard video={video} />
          </li>
        ))}
      </ul>

      {/* Position dots for the swipe row (decorative: the row itself scrolls). */}
      <div aria-hidden="true" className="flex justify-center gap-1.5 pt-4.5 pb-8 lg:hidden">
        {homeVideos.map((video, index) => (
          <span
            key={video.playbackId}
            className={`h-1.5 rounded-full transition-all duration-200 ${index === activeIndex ? "w-4.5 bg-hp-ink" : "w-1.5 bg-[#d5d8dd]"}`}
          />
        ))}
      </div>

      {showCta ? (
      <div data-booking-cta-zone className="flex flex-col gap-3.5 border-t border-hp-line bg-hp-wash px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-12">
        <div className="flex flex-col gap-0.5">
          <p className="font-hp text-lg/6.5 font-medium tracking-[-0.01em] text-hp-ink">Want the same for your SaaS?</p>
          <p className="font-hp text-[15px]/5.5 text-hp-soft">
            {ctaBody}
          </p>
        </div>
        <BookButton size="none" className="w-full gap-2.25 rounded-xl px-4.5 py-3.5 text-base/5.5 lg:w-auto lg:rounded-[10px] lg:py-2.75" />
      </div>
      ) : null}
    </Section>
  );
}
