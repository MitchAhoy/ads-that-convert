import { Section } from "@/components/home/primitives";

// Loading states for the dynamic routes, drawn in the homepage system
// (DESIGN.md §16): a hero block and a hairline grid of placeholder cells.

function Bar({ className = "" }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-full bg-hp-tray ${className}`} />;
}

function LoadingAnnouncer({ label }) {
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {label}
    </div>
  );
}

function HeroSkeleton({ centered = true }) {
  return (
    <Section label="Loading" innerClassName="hp-hero-dots">
      <div
        className={`flex flex-col gap-5 px-5 pt-12 pb-11 sm:px-8 lg:px-12 lg:pt-18 lg:pb-14 ${centered ? "items-center" : "items-start"}`}
      >
        <Bar className="h-10 w-4/5 max-w-160 lg:h-14" />
        <Bar className="h-10 w-3/5 max-w-120 lg:h-14" />
        <Bar className="mt-2 h-4 w-full max-w-140" />
        <Bar className="h-4 w-4/5 max-w-110" />
      </div>
    </Section>
  );
}

function GridSkeleton({ cells = 3 }) {
  return (
    <Section label="Loading">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {Array.from({ length: cells }, (_, index) => (
          <div key={index} className="flex flex-col gap-3 border-t border-hp-line px-5 py-8 sm:px-8 lg:border-t-0 lg:border-r lg:px-10 lg:last:border-r-0">
            <div aria-hidden="true" className="hp-well h-40 animate-pulse rounded-lg" />
            <Bar className="mt-2 h-3 w-24" />
            <Bar className="h-5 w-4/5" />
            <Bar className="h-4 w-full" />
          </div>
        ))}
      </div>
    </Section>
  );
}

export function CaseStudyListLoading({ title }) {
  return (
    <main className="bg-white">
      <LoadingAnnouncer label={`Loading ${title}`} />
      <HeroSkeleton />
      <GridSkeleton />
    </main>
  );
}

export function CaseStudyDetailLoading() {
  return (
    <main className="bg-white">
      <LoadingAnnouncer label="Loading case study" />
      <HeroSkeleton centered={false} />
      <GridSkeleton cells={2} />
    </main>
  );
}

export function ToolPageLoading() {
  return (
    <main className="bg-white">
      <LoadingAnnouncer label="Loading tool" />
      <HeroSkeleton />
      <GridSkeleton cells={2} />
    </main>
  );
}
