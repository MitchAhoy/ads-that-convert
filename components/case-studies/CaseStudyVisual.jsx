// Cover illustrations for each case study (DESIGN.md §16.10): a white report
// card drawn from that study's own figures. Decorative (aria-hidden): every
// number also appears in the case study copy. Keep the figures in sync with
// content/case-studies/*.mdx.

const tag = {
  ok: "bg-[#ecfdf3] text-hp-up",
  info: "bg-[#eef3fe] text-[#1640b8]",
};

function Card({ children, className = "" }) {
  return (
    <div
      className={`rv flex w-full flex-col rounded-t-[14px] bg-white shadow-[0_0_0_1px_#e4e6ea,0_10px_30px_rgba(14,15,17,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

function Head({ title, value, note, tagText, tagTone = "ok", large = false }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={`font-hp font-medium text-hp-body ${large ? "text-[13px]/4.5" : "text-xs/4"}`}>{title}</span>
        <span className="flex items-baseline gap-2">
          <span
            className={`font-hp font-medium tracking-[-0.04em] text-hp-ink tabular-nums ${large ? "text-[34px]/9.5" : "text-[28px]/8"}`}
          >
            {value}
          </span>
          {note ? <span className="font-hp text-xs/4 text-hp-fine">{note}</span> : null}
        </span>
      </div>
      <span className={`shrink-0 rounded-md px-2 py-0.5 font-hp-mono text-xs/4 whitespace-nowrap ${tag[tagTone]}`}>{tagText}</span>
    </div>
  );
}

// Rezi: paid upgrades per month, March (about 29) to September (129).
const reziMonths = [
  ["Mar", "~29", 29, "bg-[#e4e6ea]", "text-hp-fine"],
  ["Apr", "107", 107, "bg-[#c7d6fc]"],
  ["May", "116", 116, "bg-[#c7d6fc]"],
  ["Jun", "119", 119, "bg-[#8fb0f8]"],
  ["Jul", "98", 98, "bg-[#8fb0f8]"],
  ["Aug", "118", 118, "bg-[#6e95f5]"],
  ["Sep", "129", 129, "bg-hp-accent", "font-medium text-hp-accent"],
];

function ReziVisual() {
  return (
    <Card className="gap-4 px-4 pt-4.5 pb-5 sm:gap-4.5 sm:px-5.5 sm:pt-5 sm:pb-5.5">
      <Head large title="Paid upgrades · non-brand" value="129" note="in September" tagText="↑ 4.4x since Mar" />
      <div>
        <div className="flex h-30 items-end gap-1.5 border-b border-hp-line-soft sm:h-37.5 sm:gap-2.5">
          {reziMonths.map(([month, label, value, color, labelClass = "text-hp-body"], index) => (
            <div key={month} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className={`font-hp-mono text-xs/3.5 ${labelClass}`}>{label}</span>
              <span
                className={`rv-bar w-full rounded-t-[5px] ${color}`}
                style={{ height: `${Math.round((value / 129) * 100)}%`, "--rv-i": index + 1 }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 pt-2 sm:gap-2.5">
          {reziMonths.map(([month]) => (
            <span key={month} className="flex-1 text-center font-hp-mono text-xs/3.5 text-hp-fine uppercase">
              {month}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[#f7f8fa] px-3 py-2.5">
        <span className="font-hp text-[13px]/4.5 text-hp-body">Cost per upgrade vs breakeven</span>
        <span className={`shrink-0 rounded-[5px] px-1.5 py-px font-hp-mono text-xs/4 ${tag.ok}`}>6 OF 6 BELOW</span>
      </div>
    </Card>
  );
}

function PaybackVisual() {
  const steps = [
    ["558", "Sign-ups", "bg-hp-tray", "text-hp-ink", "text-hp-fine"],
    ["42", "Paid", "bg-[#eef3fe]", "text-[#1640b8]", "text-hp-body"],
    ["$2,219", "New MRR", "bg-hp-accent", "text-white", "text-[#dce6fd]"],
  ];
  return (
    <Card className="h-39 gap-3 px-4 pt-4 pb-3.5">
      <Head title="New MRR · first 30 days" value="$2,219" tagText="2.89-mo payback" tagTone="info" />
      <div className="flex items-center gap-1.5">
        {steps.map(([value, label, bg, valueClass, labelClass], index) => (
          <div key={label} className="flex flex-1 items-center gap-1.5">
            {index > 0 ? (
              <span aria-hidden="true" className="font-hp text-[13px] text-[#9aa0a9]">
                →
              </span>
            ) : null}
            <div className={`rv flex flex-1 flex-col gap-0.5 rounded-lg px-2.25 py-1.75 ${bg}`} style={{ "--rv-i": index + 1 }}>
              <span className={`font-hp text-[15px]/4.5 font-medium ${valueClass}`}>{value}</span>
              <span className={`font-hp text-xs/3.5 whitespace-nowrap ${labelClass}`}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SignupsVisual() {
  return (
    <Card className="h-39 gap-3 px-4 pt-4 pb-3.5">
      <Head title="High-rated sign-ups" value="175" note="from 82" tagText="↓ 55% CPA" />
      <div className="flex flex-col gap-1.75">
        {[
          ["Before", "w-[47%] bg-[#c7d6fc]", "text-hp-fine"],
          ["After", "w-full bg-hp-accent", "text-hp-accent"],
        ].map(([label, bar, labelClass], index) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-12.5 shrink-0 font-hp-mono text-xs/3.5 uppercase ${labelClass}`}>{label}</span>
            <span className="flex h-3.5 flex-1 rounded-full bg-hp-tray">
              <span className={`rv-grow h-full origin-left rounded-full ${bar}`} style={{ "--rv-i": index + 1 }} />
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NonBrandMrrVisual() {
  return (
    <Card className="h-39 gap-2 overflow-hidden px-4 pt-4">
      <Head title="New MRR per month" value="$3,664" tagText="Non-brand" tagTone="info" />
      <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="-mx-4 block h-17.5 w-[calc(100%+2rem)]">
        <defs>
          <linearGradient id="nonbrand-mrr-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#155EEF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#155EEF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 62 C 30 60, 45 56, 70 52 S 115 44, 140 40 S 185 30, 210 24 S 255 12, 300 6 L 300 70 L 0 70 Z"
          fill="url(#nonbrand-mrr-fill)"
        />
        <path
          className="rv-draw"
          pathLength="1"
          d="M0 62 C 30 60, 45 56, 70 52 S 115 44, 140 40 S 185 30, 210 24 S 255 12, 300 6"
          fill="none"
          stroke="#155EEF"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Card>
  );
}

// Rezi as a small grid cover ("More results"), sized like the other three.
function ReziCellVisual() {
  return (
    <Card className="h-39 gap-3 px-4 pt-4 pb-3.5">
      <Head title="Paid upgrades · non-brand" value="129" note="in Sep" tagText="↑ 4.4x" />
      <div className="flex h-12 flex-1 items-end gap-1.5">
        {reziMonths.map(([month, , value, color], index) => (
          <span
            key={month}
            className={`rv-bar flex-1 rounded-t-[4px] ${color}`}
            style={{ height: `${Math.round((value / 129) * 100)}%`, "--rv-i": index + 1 }}
          />
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Hero versions (/results/[slug], right of the H1 from lg). Each card stretches
// to the full height of the hero panel and grows its chart to fill it, so it
// sits flush with the bottom edge whatever the length of the title.

function HeroCard({ children }) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-t-[16px] bg-white px-5 pt-5.5 pb-6 shadow-[0_0_0_1px_#e4e6ea,0_14px_40px_rgba(14,15,17,0.08)] xl:px-6.5 xl:pt-6.5 xl:pb-7">
      {children}
    </div>
  );
}

function HeroRow({ label, value, tone = "ok" }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="font-hp text-[13px]/4.5 text-hp-body">{label}</span>
      <span className={`shrink-0 rounded-[5px] px-1.5 py-px font-hp-mono text-xs/4 ${tag[tone]}`}>{value}</span>
    </div>
  );
}

function ReziHero() {
  return (
    <HeroCard>
      <Head large title="Paid upgrades · non-brand" value="129" note="in September" tagText="↑ 4.4x since Mar" />
      <div className="flex min-h-40 flex-1 flex-col">
        <div className="flex flex-1 items-end gap-2.5 border-b border-hp-line-soft">
          {reziMonths.map(([month, label, value, color, labelClass = "text-hp-body"]) => (
            <div key={month} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className={`font-hp-mono text-xs/3.5 ${labelClass}`}>{label}</span>
              <span className={`w-full rounded-t-[5px] ${color}`} style={{ height: `${Math.round((value / 129) * 88)}%` }} />
            </div>
          ))}
        </div>
        <div className="flex gap-2.5 pt-2">
          {reziMonths.map(([month]) => (
            <span key={month} className="flex-1 text-center font-hp-mono text-xs/3.5 text-hp-fine uppercase">
              {month}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col divide-y divide-hp-line-soft border-t border-hp-line-soft">
        <HeroRow label="Cost per upgrade vs breakeven" value="6 OF 6 BELOW" />
        <HeroRow label="Click to upgrade rate" value="4.46% → 8.76%" />
      </div>
    </HeroCard>
  );
}

function PaybackHero() {
  const steps = [
    ["Sign-ups", "558", "bg-hp-tray", "text-hp-ink", "text-hp-body"],
    ["Paying customers", "42", "bg-[#eef3fe]", "text-[#1640b8]", "text-[#1640b8]"],
    ["New MRR", "$2,219", "bg-hp-accent", "text-white", "text-[#dce6fd]"],
  ];
  const links = ["7.5% became paying", "about $53 MRR each"];
  return (
    <HeroCard>
      <Head large title="New account · first 30 days" value="$2,219" note="new MRR" tagText="2.89-mo payback" tagTone="info" />
      <div className="flex flex-1 flex-col justify-center">
        {steps.map(([label, value, bg, valueClass, labelClass], index) => (
          <div key={label} className="flex flex-col">
            {index > 0 ? (
              <span className="flex items-center gap-2 py-1.5 pl-4 font-hp-mono text-xs/4 text-hp-fine">
                <span aria-hidden="true" className="h-4 w-px bg-[#d5d8dd]" />
                {links[index - 1]}
              </span>
            ) : null}
            <div className={`flex items-center justify-between rounded-[10px] px-4 py-3 ${bg}`}>
              <span className={`font-hp text-sm/5 ${labelClass}`}>{label}</span>
              <span className={`font-hp text-[22px]/7 font-medium tracking-[-0.03em] tabular-nums ${valueClass}`}>{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-hp-line-soft pt-4">
        <div className="flex items-center justify-between font-hp text-[13px]/4.5">
          <span className="text-hp-body">New MRR by keyword type</span>
          <span className="font-hp-mono text-xs/4 text-hp-fine">NET NEW</span>
        </div>
        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          <span className="w-[70%] bg-hp-accent" />
          <span className="flex-1 bg-[#c7d6fc]" />
        </div>
        <div className="flex justify-between font-hp-mono text-xs/4">
          <span className="text-hp-accent">GENERIC NON-BRAND 70%</span>
          <span className="text-hp-fine">OTHER 30%</span>
        </div>
      </div>
    </HeroCard>
  );
}

function SignupsHero() {
  const bars = [
    ["Before", "82", "47%", "bg-[#c7d6fc]", "text-hp-fine"],
    ["After", "175", "100%", "bg-hp-accent", "font-medium text-hp-accent"],
  ];
  return (
    <HeroCard>
      <Head large title="High-rated sign-ups a month" value="175" note="from 82" tagText="↑ 2.1x" />
      <div className="flex min-h-40 flex-1 flex-col">
        <div className="flex flex-1 items-end justify-center gap-8 border-b border-hp-line-soft px-6">
          {bars.map(([label, value, height, color, labelClass]) => (
            <div key={label} className="flex h-full w-24 flex-col items-center justify-end gap-1.5">
              <span className={`font-hp-mono text-xs/3.5 ${labelClass}`}>{value}</span>
              <span className={`w-full rounded-t-[6px] ${color}`} style={{ height: `calc(${height} * 0.88)` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 px-6 pt-2">
          {bars.map(([label, , , , labelClass]) => (
            <span key={label} className={`w-24 text-center font-hp-mono text-xs/3.5 uppercase ${labelClass}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col divide-y divide-hp-line-soft border-t border-hp-line-soft">
        <HeroRow label="Cost per sign-up" value="↓ 55%" />
        <HeroRow label="Conversion rate" value="↑ 34%" />
        <HeroRow label="Bidding on" value="RATED SIGN-UPS" tone="info" />
      </div>
    </HeroCard>
  );
}

function NonBrandMrrHero() {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return (
    <HeroCard>
      <Head large title="New MRR per month · non-brand" value="$3,664" note="in March" tagText="$21k+ in total" tagTone="info" />
      <div className="flex min-h-36 flex-1 flex-col">
        <div className="relative flex-1 border-b border-hp-line-soft">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="nonbrand-mrr-hero-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#155EEF" stopOpacity="0.2" />
                <stop offset="1" stopColor="#155EEF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 90 C 30 88, 45 83, 70 77 S 115 66, 140 60 S 185 45, 210 36 S 255 20, 300 12 L 300 100 L 0 100 Z"
              fill="url(#nonbrand-mrr-hero-fill)"
            />
            <path
              d="M0 90 C 30 88, 45 83, 70 77 S 115 66, 140 60 S 185 45, 210 36 S 255 20, 300 12"
              fill="none"
              stroke="#155EEF"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute top-[12%] right-0 size-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-hp-accent shadow-[0_0_0_1px_#155EEF]" />
        </div>
        <div className="flex justify-between pt-2">
          {months.map((month) => (
            <span
              key={month}
              className={`font-hp-mono text-xs/3.5 uppercase ${month === "Mar" ? "text-hp-accent" : "text-hp-fine"}`}
            >
              {month}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col divide-y divide-hp-line-soft border-t border-hp-line-soft">
        <HeroRow label="Funnel events synced to Google Ads" value="GCLID" tone="info" />
        <HeroRow label="Bidding" value="MANUAL → AUTOMATED" tone="info" />
        <HeroRow label="Inefficient spend pruned" value="WEEKLY" />
      </div>
    </HeroCard>
  );
}

const visuals = {
  "rezi-case-study": { cover: ReziVisual, cell: ReziCellVisual, hero: ReziHero },
  "ai-b2b-saas-case-study": { cover: PaybackVisual, hero: PaybackHero },
  "b2b-saas-leads": { cover: SignupsVisual, hero: SignupsHero },
  // Unlisted free-trial angle on the same account, so it shares the sign-ups cards.
  "saas-free-trial-signups-google-ads": { cover: SignupsVisual, hero: SignupsHero },
  "b2b-saas-case-study": { cover: NonBrandMrrVisual, hero: NonBrandMrrHero },
};

export function hasCaseStudyVisual(slug, variant = "cover") {
  return Boolean(visuals[slug]?.[variant] ?? (variant === "cell" && visuals[slug]?.cover));
}

// variant: "cover" (the /results featured slot and grid), "cell" (the 200px
// grid slot; falls back to the cover, which is already that size except for
// Rezi) or "hero" (the case study hero panel).
export default function CaseStudyVisual({ slug, variant = "cover" }) {
  const set = visuals[slug];
  const Visual = set?.[variant] ?? (variant === "cell" ? set?.cover : null);
  return Visual ? <Visual /> : null;
}

// Compact number tile for phone lists (/results, "More results").
const tiles = {
  "rezi-case-study": ["129", "Paying customers a month"],
  "ai-b2b-saas-case-study": ["$2,219", "New MRR, 30 days"],
  "b2b-saas-leads": ["82 → 175", "Sign-ups a month"],
  "b2b-saas-case-study": ["$3,664", "New MRR a month"],
};

export function CaseStudyTile({ slug }) {
  const tile = tiles[slug];
  if (!tile) return null;
  return (
    <span
      aria-hidden="true"
      className="flex h-19 w-28 shrink-0 flex-col justify-center gap-0.5 rounded-[10px] bg-white p-2.5 shadow-[0_0_0_1px_#e4e6ea,0_4px_12px_rgba(14,15,17,0.05)]"
    >
      <span className="font-hp text-lg/6 font-medium tracking-[-0.03em] whitespace-nowrap text-hp-accent">{tile[0]}</span>
      <span className="font-hp text-xs/3.75 text-hp-fine">{tile[1]}</span>
    </span>
  );
}
