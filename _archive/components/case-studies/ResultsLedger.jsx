// Hero aside for /results: a report-style window summarising each case study's
// headline number. Styled as a mockup (DESIGN.md §7.5) in the same window chrome
// as the homepage code window (HeroCodeAnimation). Figures come from the case
// studies in /content/case-studies — keep them in sync.
const rows = [
  { label: "New MRR, first 30 days", segment: "B2B AI SaaS", value: "$2,219", note: "2.89-mo payback" },
  { label: "New MRR per month", segment: "B2B SaaS · freemium", value: "$3,664", note: "Non-branded search" },
  { label: "High-rated sign-ups", segment: "B2B SaaS · sales-led", value: "82 → 175", note: "↓ 55% cost/sign-up", positive: true },
];

// Cumulative new MRR from non-branded search (B2B SaaS study, "over $21k").
const bars = [10, 16, 21, 26, 33, 38, 46];

export default function ResultsLedger() {
  return (
    <div
      role="img"
      aria-label="Summary of client results: $2,219 new MRR in 30 days with a 2.89-month payback, $3,664 new MRR per month from non-branded search, and high-rated sign-ups up from 82 to 175."
      className="relative mx-auto w-full max-w-[520px]"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-[0_4px_8px_rgba(26,26,24,0.04),0_20px_40px_rgba(26,26,24,0.08)]">
        <div className="relative flex h-8.5 items-center justify-center border-b border-border bg-surface">
          <div className="absolute left-3.5 flex gap-1.75">
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          </div>
          <span className="text-xs text-muted">client-results.report</span>
        </div>

        <div className="px-5 pt-3 pb-5">
          <ul>
            {rows.map((row, index) => (
              <li
                key={row.label}
                className={`flex items-center justify-between gap-4 py-3 leading-[1.4] ${index > 0 ? "border-t border-surface" : ""}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{row.label}</p>
                  <p className="truncate text-xs text-muted">{row.segment}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold tracking-[-0.03em] text-ink tabular-nums">{row.value}</p>
                  <p className={`text-xs ${row.positive ? "font-semibold text-[#15994f]" : "text-muted"}`}>{row.note}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-2 rounded-[14px] bg-surface px-4 pt-3.5 pb-3">
            <div className="flex items-baseline justify-between gap-3 leading-[1.4]">
              <span className="text-xs text-body">Cumulative new MRR · non-branded</span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-ink tabular-nums">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
                $21k+
              </span>
            </div>
            <div className="mt-3 flex h-12 items-end gap-1.5">
              {bars.map((height, index) => (
                <span key={index} className="flex-1 rounded-t-[3px] bg-[#e4e2dd]" style={{ height }} />
              ))}
              <span
                className="grain relative flex-1 rounded-t-[3px]"
                style={{ height: 48, background: "linear-gradient(180deg, var(--pastel-blush) 0%, var(--pastel-lavender) 100%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
