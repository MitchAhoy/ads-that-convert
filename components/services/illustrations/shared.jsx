import Reveal from "@/components/home/Reveal";

// Building blocks for the service page mockups (DESIGN.md §16.8). Every
// mockup is decorative and aria-hidden; its numbers are illustrative.

export const cardShadow = "shadow-[0_0_0_1px_#e4e6ea,0_8px_24px_rgba(14,15,17,0.06)]";
export const pillShadow = "shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]";

// The fixed-height slot above each budget-leak card's H3. Mockups sit on its
// bottom edge so the H3s line up across a row.
export function LeakSlot({ className = "", children }) {
  return (
    <Reveal aria-hidden="true" className={`flex h-39 shrink-0 items-end ${className}`}>
      {children}
    </Reveal>
  );
}

export function MockCard({ className = "", children }) {
  return <div className={`rv flex flex-col rounded-xl bg-white ${cardShadow} ${className}`}>{children}</div>;
}

export function CardTitle({ title, meta, className = "" }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">{title}</span>
      {meta ? <span className="font-hp-mono text-xs/4 text-hp-fine uppercase">{meta}</span> : null}
    </div>
  );
}

export function Dot({ color = "#15803D", className = "" }) {
  return <span className={`size-1.5 shrink-0 rounded-full ${className}`} style={{ backgroundColor: color }} />;
}

// Small grey pill ("Secondary", "Excluded", "Week 8").
export function GreyChip({ children, className = "" }) {
  return (
    <span className={`rounded-full bg-hp-tray px-2 py-0.5 font-hp text-xs/4 whitespace-nowrap text-hp-soft ${className}`}>
      {children}
    </span>
  );
}

export function Status({ children, color = "#15803D" }) {
  return (
    <span className="flex items-center gap-1.5 font-hp text-xs/4 font-medium whitespace-nowrap" style={{ color }}>
      <Dot color={color} />
      {children}
    </span>
  );
}

export function Check({ className = "size-3.25", color = "#155EEF", strokeWidth = 2.5 }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function SearchGlyph({ className = "size-3", color = "#6B7280" }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

// The card in the dotted well that closes each budget-leaks grid.
// `rows` are [label, value]; a value can be a string or a node (e.g. a chip).
export function AuditCard({ title, meta, rows, totalLabel, total }) {
  return (
    <MockCard className="w-full px-4.5 pt-4 pb-3.5">
      <CardTitle title={title} meta={meta} className="pb-2.5" />
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between border-t border-hp-line-soft py-2">
          <span className="font-hp text-[13px]/4.5 text-hp-body">{label}</span>
          {typeof value === "string" ? <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">{value}</span> : value}
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-hp-line pt-2.5">
        <span className="font-hp text-[13px]/4.5 text-hp-muted">{totalLabel}</span>
        <span className="font-hp text-lg/5.5 font-semibold tracking-[-0.02em] text-hp-accent">{total}</span>
      </div>
    </MockCard>
  );
}

// Right-hand card in process step 3: a blue header and a list of campaigns or
// tests, each live or waiting on a condition. `rows` are [label, status],
// where status is "live" or the text of a grey chip.
export function StructureCard({ title, rows }) {
  return (
    <div className="flex w-77.5 shrink-0 flex-col rounded-tl-[18px] bg-linear-to-b from-[#eaf0fe] to-[#f7f9ff] shadow-[0_0_0_1px_rgba(21,94,239,0.12)]">
      <div className="flex items-center gap-2 px-4.5 py-3.25">
        <span className="size-2 rounded-full bg-hp-accent" />
        <span className="font-hp text-[15px]/5 font-medium text-hp-accent">{title}</span>
      </div>
      <div className="flex h-82.5 shrink-0 flex-col rounded-tl-[14px] bg-white pt-2 pr-6 pl-5 shadow-[0_0_0_1px_rgba(14,15,17,0.07)]">
        {rows.map(([label, status], index) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-3 py-3 ${index < rows.length - 1 ? "border-b border-hp-line-soft" : ""}`}
          >
            <span className={`font-hp text-sm/5 ${status === "live" ? "font-medium text-hp-ink" : "text-hp-soft"}`}>{label}</span>
            {status === "live" ? <Status>Live</Status> : <GreyChip>{status}</GreyChip>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stacked budget bar with a legend. `segments` are [label, colour, share %].
export function BudgetCard({ segments }) {
  return (
    <MockCard className="w-full px-4 pt-3.5 pb-4" >
      <CardTitle title="Budget by campaign" meta="This month" />
      <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-xs">
        {segments.map(([label, color, share]) => (
          <span key={label} className="h-full" style={{ width: `${share}%`, backgroundColor: color }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 pt-3">
        {segments.map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5 font-hp text-xs/4 text-hp-body">
            <span className="size-2 rounded-xs" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </MockCard>
  );
}

// A results-page ad in a search mockup. `faded` greys out a competitor's ad.
export function SerpAd({ label, url, headline, description, tag, faded }) {
  return (
    <div className={`flex flex-col gap-1 border-t border-hp-line-soft px-4 py-3.5 ${faded ? "relative" : ""}`}>
      <p className="font-hp text-xs/4">
        <span className="font-semibold text-hp-ink">{label}</span>
        <span className="text-hp-fine"> · {url}</span>
      </p>
      <p className="font-hp text-base/5.5 text-[#1a0dab]">{headline}</p>
      <p className="font-hp text-[13px]/4.75 text-hp-body">{description}</p>
      {tag ? (
        <span className="mt-1.5 w-fit rounded-md bg-hp-accent px-2 py-0.5 font-hp text-xs/4 font-medium text-white">{tag}</span>
      ) : null}
      {faded ? <span className="pointer-events-none absolute inset-0 bg-white/45" /> : null}
    </div>
  );
}

export function SkeletonLines({ widths = ["40%", "70%", "84%", "60%"], className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {widths.map((width, index) => (
        <span key={index} className={`h-1.5 rounded-full ${index < 2 ? "bg-hp-line" : "bg-hp-line-soft"}`} style={{ width }} />
      ))}
    </div>
  );
}

export function CampaignWell({ children }) {
  return (
    <Reveal
      aria-hidden="true"
      className="hp-well flex w-full flex-col justify-center gap-4 border-t border-hp-line px-5 py-8 sm:px-8 lg:w-105 lg:shrink-0 lg:border-t-0 lg:border-r lg:px-9 lg:py-10"
    >
      {children}
    </Reveal>
  );
}
