import Link from "next/link";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Staggered word reveal, same as the homepage H1 (`.reveal-word` in globals.css).
function revealWords(text) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 ? " " : null}
      <span className="reveal-word" style={{ "--i": i }}>
        {word}
      </span>
    </span>
  ));
}

// Stage card hero for internal pages (DESIGN.md §7.1). Same card, type and CTA
// row as the homepage Hero; `aside` fills the right-hand column on desktop.
export default function PageHero({
  id = "page-title",
  pill,
  title,
  description,
  secondaryLink,
  showCta = true,
  aside,
  children,
}) {
  const hasAside = Boolean(aside);

  return (
    <section aria-labelledby={id} className="py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
        <div
          className={`relative grid grid-cols-1 items-start gap-12 rounded-[28px] border border-border bg-white px-5 py-12 shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)] sm:px-10 sm:py-16 ${
            hasAside ? "lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:justify-items-center" : ""
          }`}
        >
          <div className={`relative w-full ${hasAside ? "max-w-[610px]" : "max-w-[760px]"}`}>
            {pill ? (
              <div className="mb-5.5 flex w-fit items-center gap-2.5 rounded-full border border-border bg-page py-2 pr-4 pl-3 text-sm leading-none font-medium text-body">
                {pill}
              </div>
            ) : null}

            <h1 id={id} className="font-display text-h1 text-balance text-ink">
              {typeof title === "string" ? revealWords(title) : title}
            </h1>

            {description ? (
              <p className="mt-5.5 max-w-[30em] text-copy leading-normal text-pretty text-body sm:text-lg">
                {description}
              </p>
            ) : null}

            {children}

            {showCta ? (
              <div className="mt-8.5 flex flex-col items-start gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap sm:items-center">
                <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" className="w-full sm:w-auto" />
                {secondaryLink ? (
                  <Link
                    href={secondaryLink.href}
                    className="border-b border-ink px-1 py-3.75 text-base font-semibold text-ink"
                  >
                    {secondaryLink.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {hasAside ? <div className="relative hidden w-full lg:block">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
