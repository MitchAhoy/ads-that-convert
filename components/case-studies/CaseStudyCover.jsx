// Case study cover artwork (DESIGN.md §7.5 *Mini mockups, §7.6 illustration frame, §10 grain).
// A pastel wash with one or two floating white product panels that tell each study's story.
//
// The frame fills its parent (the recessed well), so the parent sets the size, aspect and radius.
// Everything inside is laid out with container queries against the frame itself:
//   - under 30rem (480px): one centred panel (mobile cards, 3-col cards)
//   - 30rem and up: the panel plus a compact secondary chip under its bottom-right corner
//   - size="hero" and @2xl (672px) and up: larger panels, and the secondary becomes a full panel
// A hero rendered in a narrow frame falls back to the card composition, so it never overflows.

// Floating panels: white, hairline, warm shadow. The secondary panel sits one step higher.
const panelBase =
  "rounded-2xl border border-white/80 bg-white/95 leading-[1.4] shadow-[0_1px_2px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.1)]";
const panelRaised =
  "rounded-2xl border border-border bg-white leading-[1.4] shadow-[0_4px_8px_rgba(26,26,24,0.06),0_20px_40px_rgba(26,26,24,0.12)]";

// Layered radial washes, pastel vars only. Each study leads with a different hue so the four
// read as a set: lavender, ice/periwinkle, blush, mint with a touch of butter.
const washes = {
  lavender:
    "radial-gradient(ellipse 34% 44% at 88% 18%, var(--pastel-butter) 0%, transparent 62%), radial-gradient(ellipse 60% 70% at 8% 100%, var(--pastel-blush) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 110%, var(--pastel-periwinkle) 0%, transparent 60%), radial-gradient(ellipse 60% 90% at 100% 50%, rgb(255 255 255 / 0.18) 0%, transparent 75%), linear-gradient(120deg, var(--pastel-lavender) 0%, var(--pastel-lavender) 45%, var(--pastel-periwinkle) 100%)",
  ice: "radial-gradient(ellipse 40% 55% at 6% 90%, var(--pastel-mint) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 96% 8%, var(--pastel-lavender) 0%, transparent 62%), radial-gradient(ellipse 60% 90% at 30% 20%, rgb(255 255 255 / 0.2) 0%, transparent 70%), linear-gradient(105deg, var(--pastel-ice) 0%, var(--pastel-ice) 30%, var(--pastel-periwinkle) 100%)",
  blush:
    "radial-gradient(ellipse 30% 40% at 12% 12%, var(--pastel-butter) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 100% 100%, var(--pastel-periwinkle) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 70% 0%, var(--pastel-lavender) 0%, transparent 62%), radial-gradient(ellipse 60% 90% at 20% 60%, rgb(255 255 255 / 0.16) 0%, transparent 75%), linear-gradient(115deg, var(--pastel-blush) 0%, var(--pastel-blush) 40%, var(--pastel-lavender) 100%)",
  mint: "radial-gradient(ellipse 38% 50% at 90% 12%, var(--pastel-butter) 0%, transparent 64%), radial-gradient(ellipse 50% 60% at 100% 100%, var(--pastel-lavender) 0%, transparent 62%), radial-gradient(ellipse 45% 60% at 55% 110%, var(--pastel-ice) 0%, transparent 62%), radial-gradient(ellipse 60% 90% at 30% 40%, rgb(255 255 255 / 0.18) 0%, transparent 75%), linear-gradient(115deg, var(--pastel-mint) 0%, var(--pastel-mint) 45%, var(--pastel-ice) 100%)",
};

// Where the two panels sit. The hero slots extend the card slots with @2xl overrides.
// On cards the chip only overlaps the primary panel's padding; on the hero the secondary
// overlaps only the primary's right-hand padding.
const slots = {
  card: {
    primary:
      "absolute inset-x-4 top-1/2 -translate-y-1/2 @min-[30rem]:inset-x-auto @min-[30rem]:top-[8%] @min-[30rem]:left-[6%] @min-[30rem]:w-[62%] @min-[30rem]:translate-y-0",
    secondary: "absolute right-[5%] bottom-[7%] hidden w-[36%] @min-[30rem]:block",
  },
  hero: {
    primary:
      "absolute inset-x-4 top-1/2 -translate-y-1/2 @min-[30rem]:inset-x-auto @min-[30rem]:top-[8%] @min-[30rem]:left-[6%] @min-[30rem]:w-[62%] @min-[30rem]:translate-y-0 @2xl:top-1/2 @2xl:left-[7%] @2xl:w-[50%] @2xl:-translate-y-[58%]",
    secondary:
      "absolute right-[5%] bottom-[7%] hidden w-[36%] @min-[30rem]:block @2xl:top-1/2 @2xl:right-[7%] @2xl:bottom-auto @2xl:w-[38.5%] @2xl:-translate-y-[28%]",
  },
};

function CoverFrame({ wash, label, hero, className, primary, secondary }) {
  const slot = hero ? slots.hero : slots.card;
  return (
    <div
      role="img"
      aria-label={label}
      className={`@container grain relative h-full w-full overflow-hidden rounded-[inherit] text-left leading-normal ${className}`}
      style={{ background: washes[wash] }}
    >
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <div className={`${slot.primary} z-10`}>{primary}</div>
        {secondary ? <div className={`${slot.secondary} z-20`}>{secondary}</div> : null}
      </div>
    </div>
  );
}

// Card sizes, and the @2xl steps a hero adds on top. Written out in full so Tailwind sees them.
const sizes = {
  pad: {
    card: "px-4 pt-3.5 pb-3.5 @md:px-5 @md:pt-4 @md:pb-4",
    hero: "px-4 pt-3.5 pb-3.5 @md:px-5 @md:pt-4 @md:pb-4 @2xl:px-7 @2xl:pt-6 @2xl:pb-6",
  },
  title: { card: "text-[0.8125rem]", hero: "text-[0.8125rem] @2xl:text-sm" },
  metric: { card: "text-[2.5rem] @md:text-[2.75rem]", hero: "text-[2.5rem] @md:text-[2.75rem] @2xl:text-7xl" },
  unit: { card: "text-sm", hero: "text-sm @2xl:text-base" },
  row: { card: "text-xs", hero: "text-xs @2xl:text-sm" },
  chart: { card: "h-10 @md:h-12", hero: "h-10 @md:h-12 @2xl:h-36" },
  chartGap: { card: "mt-3", hero: "mt-3 @2xl:mt-8" },
};
const pick = (group, hero) => sizes[group][hero ? "hero" : "card"];

const chipPanel = `${panelRaised} px-3.5 pt-3 pb-3`;
const heroPanel = `${panelRaised} px-5 pt-4.5`;

// Secondary slot: the compact chip on cards (and on heroes below @2xl), the full panel on heroes.
function Secondary({ hero, chip, full }) {
  if (!hero) return chip;
  return (
    <>
      <div className="@2xl:hidden">{chip}</div>
      <div className="hidden @2xl:block">{full}</div>
    </>
  );
}

function PanelHeader({ title, children, hero }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={`truncate font-bold text-ink ${pick("title", hero)}`}>{title}</span>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="shrink-0 rounded-full bg-surface px-2.5 py-0.5 text-xs whitespace-nowrap text-body">
      {children}
    </span>
  );
}

function Live({ children = "Live" }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 text-xs whitespace-nowrap text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
      {children}
    </span>
  );
}

// The one serif moment per cover: the headline stat.
function Metric({ value, unit, hero }) {
  return (
    <p className="flex items-baseline gap-2 whitespace-nowrap">
      <span className={`font-display text-ink tabular-nums ${pick("metric", hero)}`}>{value}</span>
      {unit ? <span className={`text-body ${pick("unit", hero)}`}>{unit}</span> : null}
    </p>
  );
}

function Delta({ children }) {
  return <span className="text-xs font-bold whitespace-nowrap text-[#15994f]">{children}</span>;
}

// Compact sans figure used in secondary panels.
function Figure({ children, large = false }) {
  return (
    <span className={`font-bold tracking-[-0.03em] text-ink tabular-nums ${large ? "text-3xl" : "text-xl"}`}>
      {children}
    </span>
  );
}

function StatRows({ rows }) {
  return (
    <div className="mt-3">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-3 border-t border-surface py-2.5">
          <span className="text-sm text-body">{label}</span>
          <span className="text-sm font-semibold text-ink tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  );
}

const toPath = (points) => points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

// Line chart in a 300×80 box that stretches to its container; strokes stay crisp at any size.
// The area fill is the mockup's one pastel highlight.
function LineChart({ id, line, stops, vertical, guideY, guideLabel, dot, marker, hero }) {
  return (
    <div className={`grain relative ${pick("chart", hero)}`}>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
            {stops.map(([offset, color, opacity = 1]) => (
              <stop key={offset} offset={offset} style={{ stopColor: color, stopOpacity: opacity }} />
            ))}
          </linearGradient>
        </defs>
        <path d={`${line} L300 80 L0 80 Z`} fill={`url(#${id})`} />
        <line
          x1="0"
          y1={guideY}
          x2="300"
          y2={guideY}
          stroke="#b8b4ae"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        {marker != null ? (
          <line
            x1={marker * 3}
            y1={guideY}
            x2={marker * 3}
            y2="80"
            stroke="#1a1a18"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <path d={line} fill="none" stroke="#1a1a18" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-[0_1px_3px_rgba(26,26,24,0.25)]"
        style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
      />
      <span
        className="absolute left-0 text-xs leading-none text-muted"
        style={{ top: `${(guideY / 80) * 100}%`, transform: "translateY(calc(-100% - 5px))" }}
      >
        {guideLabel}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. AI B2B SaaS: 2.89-month payback, $2,219 new MRR in 30 days       */
/* ------------------------------------------------------------------ */

// Cumulative contribution per cohort (concave), crossing the CAC line at month 2.89 of 6.
const PAYBACK_X = (2.89 / 6) * 100;
const CAC_Y = 24;
const paybackLine = toPath(
  Array.from({ length: 25 }, (_, i) => {
    const m = (i / 24) * 6;
    return [(m / 6) * 300, 76 - 70 * (1 - Math.exp(-0.47 * m))];
  })
);

function PaybackPanel({ hero }) {
  return (
    <div className={`${panelBase} ${pick("pad", hero)}`}>
      <PanelHeader title="Payback period" hero={hero}>
        <Pill>Non-branded</Pill>
      </PanelHeader>
      <div className="mt-1 flex items-end justify-between gap-3">
        <Metric value="2.89" unit="months" hero={hero} />
        <span className="mb-2 hidden @md:inline @2xl:mb-3">
          <Delta>Under 3 months</Delta>
        </span>
      </div>
      <div className={pick("chartGap", hero)}>
        <LineChart
          id={`cover-payback-${hero ? "hero" : "card"}`}
          line={paybackLine}
          stops={[
            ["0%", "var(--pastel-periwinkle)", 0.85],
            ["55%", "var(--pastel-lavender)", 0.85],
            ["100%", "var(--pastel-blush)", 0.85],
          ]}
          guideY={CAC_Y}
          guideLabel="CAC"
          marker={PAYBACK_X}
          dot={[PAYBACK_X, (CAC_Y / 80) * 100]}
          hero={hero}
        />
        <div className="relative mt-1.5 flex justify-between text-xs text-muted tabular-nums">
          <span>M0</span>
          <span
            className="absolute -translate-x-1/2 font-bold whitespace-nowrap text-ink"
            style={{ left: `${PAYBACK_X}%` }}
          >
            Paid back
          </span>
          <span>M6</span>
        </div>
      </div>
    </div>
  );
}

function NewMrrPanel({ hero }) {
  return (
    <Secondary
      hero={hero}
      chip={
        <div className={chipPanel}>
          <PanelHeader title="New MRR">
            <span className="text-xs whitespace-nowrap text-muted">First 30 days</span>
          </PanelHeader>
          <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
            <Figure>$2,219</Figure>
            <Delta>Net new</Delta>
          </p>
        </div>
      }
      full={
        <div className={`${heroPanel} pb-2`}>
          <PanelHeader title="New MRR" hero>
            <span className="text-xs whitespace-nowrap text-muted">First 30 days</span>
          </PanelHeader>
          <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
            <Figure large>$2,219</Figure>
            <Delta>Net new customers</Delta>
          </p>
          <StatRows
            rows={[
              ["Sign-ups", "558"],
              ["Paying customers", "42"],
              ["From non-branded terms", "70%"],
            ]}
          />
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. B2B SaaS freemium: $3,664 new MRR / month from non-branded terms */
/* ------------------------------------------------------------------ */

const nonBrandedTerms = [
  { term: "team scheduling software", mrr: 1284 },
  { term: "free shift planner app", mrr: 972 },
  { term: "staff rota template", mrr: 816 },
  { term: "employee availability tool", mrr: 592 },
];

function NonBrandedPanel({ hero }) {
  const max = nonBrandedTerms[0].mrr;
  return (
    <div className={`${panelBase} ${pick("pad", hero)} pb-1.5! ${hero ? "@2xl:pb-3!" : ""}`}>
      <PanelHeader title="Search terms" hero={hero}>
        <Pill>Non-branded</Pill>
      </PanelHeader>
      <div className="mt-1">
        <Metric value="$3,664" unit="new MRR / mo" hero={hero} />
      </div>
      <div className={hero ? "mt-2 @2xl:mt-4" : "mt-2"}>
        {nonBrandedTerms.map((row, index) => (
          <div
            key={row.term}
            className={`items-center gap-3 border-t border-surface py-1.5 ${
              index < 2 ? "flex" : hero ? "hidden @2xl:flex" : "hidden"
            } ${hero ? "@2xl:py-3" : ""}`}
          >
            <span className={`min-w-0 flex-1 truncate text-ink ${pick("row", hero)}`}>{row.term}</span>
            <span
              className={`relative h-1.5 w-10 shrink-0 overflow-hidden rounded-full bg-[#e8e6e1] @md:w-14 ${
                hero ? "@2xl:w-28" : ""
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full ${index === 0 ? "grain" : "bg-[#b8b4ae]"}`}
                style={{
                  width: `${(row.mrr / max) * 100}%`,
                  background:
                    index === 0 ? "linear-gradient(90deg, var(--pastel-ice) 0%, var(--pastel-periwinkle) 100%)" : undefined,
                }}
              />
            </span>
            <span className={`shrink-0 text-right font-semibold text-ink tabular-nums ${pick("row", hero)}`}>
              ${row.mrr.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const cumulativeBars = [18, 30, 44, 57, 70, 84, 100];
const cumulativeSpark = toPath(cumulativeBars.map((h, i) => [2 + (i / (cumulativeBars.length - 1)) * 76, 26 - (h / 100) * 23]));

function CumulativeBars({ className }) {
  return (
    <div className={`flex items-end ${className}`}>
      {cumulativeBars.map((h, i) => (
        <span
          key={h}
          className={`flex-1 rounded-t-[2px] ${i === cumulativeBars.length - 1 ? "bg-[#55524e]" : "bg-[#e4e2dd]"}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function CumulativeMrrPanel({ hero }) {
  return (
    <Secondary
      hero={hero}
      chip={
        <div className={chipPanel}>
          <PanelHeader title="Cumulative new MRR" />
          <div className="mt-1 flex items-end justify-between gap-3">
            <Figure>$21k+</Figure>
            <svg viewBox="0 0 80 28" className="mb-1 h-7 w-20 overflow-visible" aria-hidden="true">
              <path d={cumulativeSpark} fill="none" stroke="#1a1a18" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="78" cy="3" r="2.5" fill="#1a1a18" stroke="#fff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      }
      full={
        <div className={`${heroPanel} pb-4`}>
          <PanelHeader title="Cumulative new MRR" hero>
            <Live>Synced from app</Live>
          </PanelHeader>
          <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
            <Figure large>$21k+</Figure>
            <span className="text-xs text-muted">from non-branded terms</span>
          </p>
          <CumulativeBars className="mt-4 h-24 gap-1.5" />
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>Month 1</span>
            <span>Month 7</span>
          </div>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* 3. B2B SaaS sales-led: high-rated sign-ups 82 → 175                 */
/* ------------------------------------------------------------------ */

const signupBars = [
  { label: "Before", value: 82 },
  { label: "After", value: 175, lead: true },
];

function SignupsPanel({ hero }) {
  return (
    <div className={`${panelBase} ${pick("pad", hero)}`}>
      <PanelHeader title="High-rated sign-ups" hero={hero}>
        <Pill>Per month</Pill>
      </PanelHeader>
      <div className="mt-1 flex items-end justify-between gap-4">
        <div className="min-w-0 pb-5">
          <Metric value="2.1×" hero={hero} />
          <p className={`mt-1 whitespace-nowrap text-body ${pick("row", hero)}`}>
            <span className="font-semibold text-ink tabular-nums">82 → 175</span> in a month
          </p>
        </div>
        <div className={`flex shrink-0 items-end gap-2.5 pt-5 ${hero ? "@2xl:gap-4 @2xl:pt-6" : ""}`}>
          {signupBars.map((bar) => (
            <div key={bar.label} className="flex flex-col items-center">
              <div className={`flex h-16 items-end @md:h-18 ${hero ? "@2xl:h-36" : ""}`}>
                <span
                  className={`relative block w-9 rounded-t-md @md:w-11 ${hero ? "@2xl:w-16" : ""} ${
                    bar.lead ? "grain" : "bg-[#e4e2dd]"
                  }`}
                  style={{
                    height: `${(bar.value / 175) * 100}%`,
                    background: bar.lead
                      ? "linear-gradient(180deg, var(--pastel-blush) 0%, var(--pastel-lavender) 100%)"
                      : undefined,
                  }}
                >
                  <span
                    className={`absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 text-xs tabular-nums ${
                      bar.lead ? "font-bold text-ink" : "text-muted"
                    }`}
                  >
                    {bar.value}
                  </span>
                </span>
              </div>
              <span className="mt-1 text-xs text-muted">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
      {hero ? (
        <div className="mt-5 hidden grid-cols-2 border-t border-surface pt-4 @2xl:grid">
          <div>
            <p className="text-xs text-muted">Conversion rate</p>
            <p className="mt-0.5 flex items-baseline gap-1.5 text-base font-semibold text-ink">
              +34% <Delta>↑</Delta>
            </p>
          </div>
          <div className="border-l border-surface pl-5">
            <p className="text-xs text-muted">Cost per sign-up</p>
            <p className="mt-0.5 flex items-baseline gap-1.5 text-base font-semibold text-ink">
              −55% <Delta>↓</Delta>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const keywordCull = [
  { term: "free bulk sms app", paused: true },
  { term: "anonymous text sender", paused: true },
  { term: "school emergency alerts", rating: "A" },
  { term: "staff notification system", rating: "A" },
];

function KeywordCullPanel({ hero }) {
  return (
    <Secondary
      hero={hero}
      chip={
        <div className={chipPanel}>
          <PanelHeader title="Cost per sign-up" />
          <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
            <Figure>−55%</Figure>
            <span className="truncate text-xs text-muted">after keyword cull</span>
          </p>
        </div>
      }
      full={
        <div className={`${heroPanel} pb-2`}>
          <PanelHeader title="Keywords by lead rating" hero>
            <Live>Ratings uploaded</Live>
          </PanelHeader>
          <div className="mt-2">
            {keywordCull.map((row) => (
              <div key={row.term} className="flex items-center gap-2 border-t border-surface py-2.5">
                <span
                  className={`min-w-0 flex-1 truncate text-sm ${
                    row.paused ? "text-muted line-through decoration-[#b8b4ae]" : "text-ink"
                  }`}
                >
                  {row.term}
                </span>
                {row.paused ? (
                  <span className="shrink-0 text-xs text-muted">Paused</span>
                ) : (
                  <span className="shrink-0 rounded-full border border-border px-2 text-xs font-semibold text-ink">
                    Rated {row.rating}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Fallback for unknown slugs                                          */
/* ------------------------------------------------------------------ */

const genericBars = [30, 38, 44, 52, 63, 72, 100];

function GenericPanel({ hero }) {
  return (
    <div className={`${panelBase} ${pick("pad", hero)}`}>
      <PanelHeader title="Pipeline from Google Ads" hero={hero}>
        <Live>Tracked</Live>
      </PanelHeader>
      <div className={`mt-4 flex h-20 items-end gap-1.5 @md:h-24 ${hero ? "@2xl:mt-6 @2xl:h-44" : ""}`}>
        {genericBars.map((h, i) => {
          const lead = i === genericBars.length - 1;
          return (
            <span
              key={h}
              className={`flex-1 rounded-t-[3px] ${lead ? "grain relative" : "bg-[#e4e2dd]"}`}
              style={{
                height: `${h}%`,
                background: lead
                  ? "linear-gradient(180deg, var(--pastel-blush) 0%, var(--pastel-lavender) 55%, var(--pastel-periwinkle) 100%)"
                  : undefined,
              }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>Month 1</span>
        <span>Month 7</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

// Keyed by case study frontmatter `slug`.
export const caseStudyCovers = {
  "ai-b2b-saas-case-study": {
    wash: "lavender",
    label:
      "Payback chart for a B2B AI SaaS account: customer acquisition cost recovered in 2.89 months, with $2,219 in new MRR in the first 30 days",
    Primary: PaybackPanel,
    Secondary: NewMrrPanel,
  },
  "b2b-saas-case-study": {
    wash: "ice",
    label: "Search term report for a B2B SaaS account: $3,664 in new MRR per month from non-branded search terms",
    Primary: NonBrandedPanel,
    Secondary: CumulativeMrrPanel,
  },
  "b2b-saas-leads": {
    wash: "blush",
    label:
      "Before and after chart for a B2B SaaS account: high-rated sign-ups more than doubled from 82 to 175 in a month, with cost per sign-up down 55%",
    Primary: SignupsPanel,
    Secondary: KeywordCullPanel,
  },
};

const fallbackCover = {
  wash: "lavender",
  label: "Google Ads results chart showing pipeline growing month on month",
  Primary: GenericPanel,
  Secondary: null,
};

export default function CaseStudyCover({ slug, size = "card", className = "" }) {
  const cover = caseStudyCovers[slug] ?? fallbackCover;
  const hero = size === "hero";
  const { Primary, Secondary: SecondaryPanel } = cover;
  return (
    <CoverFrame
      wash={cover.wash}
      label={cover.label}
      hero={hero}
      className={className}
      primary={<Primary hero={hero} />}
      secondary={SecondaryPanel ? <SecondaryPanel hero={hero} /> : null}
    />
  );
}
