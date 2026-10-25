import Image from "next/image";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import { markerImage } from "./markerStrokes";
import { underlineImage } from "./underlineStroke";
import "./home.css";

// Shared pieces for the homepage redesign (DESIGN.md §16).

// Visible keyboard focus for custom links and buttons on the homepage.
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hp-accent";

// Full-width band with a hairline under it, and the 1120px column whose side
// hairlines form the page grid (only once the viewport is wider than the column).
// The margins either side of the column carry a faint hatch (`hatch={false}` to
// opt out); the column itself is white unless `innerClassName` sets a surface.
export function Section({ id, labelledBy, label, hatch = true, className = "", innerClassName = "", children, ...rest }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`border-b border-hp-line ${hatch ? "hp-hatch" : ""} ${className}`}
      {...rest}
    >
      <div className={`mx-auto w-full max-w-[1120px] bg-white min-[1121px]:border-x min-[1121px]:border-hp-line ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

// Blue accent phrase with a hand-drawn pen underline, for hero H1s and final
// CTA headings. `seed` picks the stroke (see underlineStroke.js): give every
// headline its own so no two underlines on the site look copy-pasted. Section
// H2s use the highlighter in AccentHeading instead.
export function AccentUnderline({ seed, className = "", children }) {
  return (
    <span className={`hp-underline text-hp-accent ${className}`} style={{ "--hp-underline": underlineImage(seed) }}>
      {children}
    </span>
  );
}

// Numbered mono label above a section H2 ("02 · RESULTS"). Decorative
// structure, so screen readers skip it.
export function Eyebrow({ children }) {
  return (
    <p aria-hidden="true" className="flex items-center gap-2.5">
      <span className="size-1.75 shrink-0 rounded-[1.5px] bg-hp-accent" />
      <span className="font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">{children}</span>
      <span className="h-px w-12 shrink-0 bg-[#dadde2]" />
    </p>
  );
}

// Two-line section H2: an ink line, then an accent line marked with a
// hand-drawn highlighter stroke (`.hp-marker`, home.css). `marker` picks the
// stroke, so give each heading on a page a different one. The hero and final
// CTA use the pen underline in `AccentUnderline` instead. Spans carry the type styles
// because the global h1–h6 rule in globals.css is unlayered.
export function AccentHeading({ id, lead, accent, eyebrow, marker = 0, className = "" }) {
  const heading = (
    <h2 id={id} className={eyebrow ? "" : className}>
      <span className="block font-hp text-[30px]/9 font-medium tracking-[-0.03em] text-hp-ink lg:text-[40px]/11.5">
        {lead}
      </span>
      <span className="block font-hp text-[30px]/9 font-medium tracking-[-0.03em] text-hp-ink lg:text-[40px]/11.5">
        <span className="hp-marker" style={{ "--hp-marker": markerImage(marker) }}>
          {accent}
        </span>
      </span>
    </h2>
  );
  if (!eyebrow) return heading;
  return (
    <div className={`flex flex-col gap-4 lg:gap-5 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {heading}
    </div>
  );
}

// H2 on the left, short intro on the right (stacked on mobile).
export function SectionHead({ id, lead, accent, intro, eyebrow, marker }) {
  return (
    <div className="flex flex-col gap-3.5 px-5 pt-12 pb-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-12 lg:pt-18 lg:pb-12">
      <AccentHeading id={id} lead={lead} accent={accent} eyebrow={eyebrow} marker={marker} />
      {intro ? (
        <p className="font-hp text-base/6.25 text-hp-body lg:w-100 lg:shrink-0">{intro}</p>
      ) : null}
    </div>
  );
}

const bookSizes = {
  // Nav: compact.
  nav: "gap-2.25 rounded-lg px-3.5 py-2 text-sm/5",
  // Default desktop button.
  default: "gap-2.25 rounded-[10px] px-4.5 py-2.75 text-base/5.5",
  // Full-width mobile buttons (hero, menu, booking bar).
  block: "gap-2.25 rounded-xl px-4.5 py-3.75 text-[17px]/5.5",
  // Hero: full-width block on phones, default button from `sm`.
  hero: "gap-2.25 rounded-xl px-4.5 py-3.75 text-[17px]/5.5 sm:rounded-[10px] sm:py-2.75 sm:text-base/5.5",
};

// Every "Book a 15-min call" button: the shared ScheduleCallButton (Fillout
// popup + PostHog tracking), restyled for the homepage.
export function BookButton({ size = "default", trackingSize = "desktop", iconPx = 20, className = "", ...rest }) {
  return (
    <ScheduleCallButton
      url={SCHEDULE_CALL_URL}
      label="Book a 15-min call"
      variant="bare"
      size={trackingSize}
      iconPx={iconPx}
      className={`bg-hp-ink font-hp font-medium text-white hover:bg-[#26282c] ${focusRing} ${bookSizes[size] ?? ""} ${className}`}
      {...rest}
    />
  );
}

// Grey band with a client quote (results, process, testimonials sections).
// Pass `logo` for a client logo, or `company` to name the client in text.
export function QuoteRow({ avatarSrc, quote, name, role, logo, company, aside, quoteClassName = "" }) {
  return (
    <figure className="flex gap-3 border-t border-hp-line bg-hp-band px-5 py-5.5 sm:px-8 lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-7">
      <div className="flex gap-3 lg:items-center lg:gap-3.5">
        <Image
          src={avatarSrc}
          alt={name}
          width={80}
          height={80}
          className="size-9 shrink-0 rounded-full object-cover lg:size-10"
        />
        <div className="flex flex-col gap-1.5 lg:gap-0.5">
          <blockquote className={`font-hp text-[15px]/5.5 font-medium text-hp-ink lg:text-base/6 ${quoteClassName}`}>
            &quot;{quote}&quot;
          </blockquote>
          <figcaption className="flex items-center gap-2 lg:gap-2.5">
            <span className="font-hp text-[13px]/4.5 text-hp-fine lg:text-sm/5">
              {name}, {role}
              {!logo && company ? ` · ${company}` : null}
            </span>
            {logo ? (
              <>
                <span aria-hidden="true" className="h-3 w-px shrink-0 bg-[#dadce0] lg:h-3.5" />
                <span className="relative block shrink-0" style={{ width: logo.width, height: logo.height }}>
                  <Image src={logo.src} alt={logo.alt} fill sizes="120px" className="object-contain" />
                </span>
              </>
            ) : null}
          </figcaption>
        </div>
      </div>
      {aside ? (
        <p className="hidden w-75 shrink-0 font-hp text-[13px]/4.75 text-hp-fine lg:block">{aside}</p>
      ) : null}
    </figure>
  );
}

// MobileBookingBar button styled for this system (homepage and service pages).
export const hpBookingBarButton = {
  variant: "bare",
  iconPx: 20,
  className:
    "w-full gap-2.25 rounded-xl bg-hp-ink px-5 py-3.75 font-hp text-[17px]/5.5 font-medium text-white shadow-[0_2px_4px_rgba(14,15,17,0.08),0_12px_28px_rgba(14,15,17,0.16)] hover:bg-[#26282c] sm:w-auto",
};
