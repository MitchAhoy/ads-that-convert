import { Search } from "lucide-react";
import QuoteAttribution from "@/components/ui/QuoteAttribution";

const steps = [
  {
    title: "Fit check",
    description:
      "Sign-up to paid rate, LTV and target payback, compared against current CPCs for your keywords.",
  },
  {
    title: "Tracking",
    description: "Trial, demo and paid events sent back to Google Ads from your product, CRM or Stripe.",
  },
  {
    title: "Build",
    description:
      "Starting with high-intent and competitor terms, then moving into non-branded demand.",
  },
  {
    title: "Iterate",
    description: "Weekly changes, and a report written in MRR.",
  },
];

// Gradient frames reuse the illustration palette; they're decorative only.
const frames = [
  "radial-gradient(ellipse 70% 80% at 15% 85%, #f0a6d8 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 90% 70%, #93b4f5 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 0%, #c4a8ee 0%, transparent 70%), linear-gradient(135deg, #b9a4f0 0%, #d7a8e8 50%, #a9b8f3 100%)",
  "radial-gradient(ellipse 70% 80% at 10% 90%, #7cc4f0 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 95% 20%, #c7b4f5 0%, transparent 60%), radial-gradient(ellipse 80% 70% at 80% 95%, #b5e6ef 0%, transparent 65%), linear-gradient(135deg, #a9c6f5 0%, #b9c2f3 50%, #a6dcef 100%)",
  "radial-gradient(ellipse 60% 70% at 55% 100%, #c8ec7a 0%, transparent 60%), radial-gradient(ellipse 70% 90% at 0% 50%, #5fd4cf 0%, transparent 65%), radial-gradient(ellipse 70% 90% at 100% 40%, #5ccfd0 0%, transparent 65%), linear-gradient(135deg, #7fdcd2 0%, #9ae3cf 50%, #6fd3cf 100%)",
  "radial-gradient(ellipse 70% 80% at 0% 30%, #f7c98f 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 80%, #f1a7c8 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, #f5b6b0 0%, transparent 65%), linear-gradient(135deg, #f6cf9f 0%, #f3bdb4 50%, #eeb0cc 100%)",
];

const miniCard =
  "h-full rounded-[14px] bg-white leading-[1.4] shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]";

// Semicircle gauge: centre (70, 70), radius 62. Angles in degrees from +x.
function arc(from, to) {
  const r = 62;
  const point = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return `${(70 + r * Math.cos(rad)).toFixed(2)} ${(70 - r * Math.sin(rad)).toFixed(2)}`;
  };
  return `M ${point(from)} A ${r} ${r} 0 0 1 ${point(to)}`;
}

function FitGaugeMini() {
  return (
    <div className={`${miniCard} flex flex-col px-4 pt-4 pb-3.5`}>
      <span className="text-[0.8125rem] font-bold text-ink">Paid search fit</span>
      <svg viewBox="0 0 140 78" className="mx-auto mt-2 block w-[140px]" aria-hidden="true">
        <path d={arc(180, 117)} fill="none" stroke="#eda9cf" strokeWidth="14" />
        <path d={arc(117, 65)} fill="none" stroke="#a98ee6" strokeWidth="14" />
        <path d={arc(65, 0)} fill="none" stroke="#7d93ec" strokeWidth="14" />
        <line x1="70" y1="70" x2="112" y2="41.5" stroke="#1a1a18" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="70" r="7" fill="#1a1a18" />
      </svg>
      <div className="-mt-1 flex justify-between px-0.5 text-xs text-muted">
        <span>Hold off</span>
        <span>Test</span>
      </div>
      <span className="mt-auto flex items-center justify-center gap-2 text-sm font-semibold text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
        Worth testing
      </span>
    </div>
  );
}

const events = [
  { name: "trial_started", source: "App", time: "12s" },
  { name: "demo_booked", source: "CRM", time: "4m" },
  { name: "purchase", source: "Stripe", time: "1h" },
  { name: "mrr_value", source: "Stripe", time: "1h" },
];

function ConversionEventsMini() {
  return (
    <div className={`${miniCard} px-3 pt-3.5 pb-1.5`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[0.8125rem] font-bold whitespace-nowrap text-ink">Sent to Google Ads</span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
          Live
        </span>
      </div>
      {events.map((event, index) => (
        <div
          key={event.name}
          className={`flex items-center gap-2 py-1.5 leading-[1.4] ${index > 0 ? "border-t border-surface" : ""}`}
        >
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink">{event.name}</span>
          <span className="text-xs text-muted">{event.source}</span>
          <span className="w-6 text-right font-mono text-xs text-muted">{event.time}</span>
        </div>
      ))}
    </div>
  );
}

function SearchAdMini() {
  return (
    <div className={`${miniCard} px-3.5 pt-3.5 pb-2.5`}>
      <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
        <Search aria-hidden="true" className="h-3 w-3 shrink-0 text-muted" strokeWidth={2.25} />
        <span className="truncate text-xs text-ink">acme alternative for ...</span>
      </div>
      <p className="mt-3 text-xs font-bold text-ink">Sponsored</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-body">
        <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#3fb8ae]" />
        yoursaas.com
      </p>
      <p className="mt-1.5 text-sm leading-[1.3] font-medium text-[#1a0dab]">Switch from Acme in 5 minutes</p>
      <p className="mt-1 text-xs text-body">Import your data in one click.</p>
    </div>
  );
}

const bars = [22, 26, 26, 34, 40];

function WeeklyReportMini() {
  return (
    <div className={`${miniCard} flex flex-col px-3 pt-3.5 pb-3`}>
      <div className="flex items-center justify-between">
        <span className="text-[0.8125rem] font-bold text-ink">Weekly report</span>
        <span className="text-xs text-muted">Wk 6</span>
      </div>
      <p className="mt-2 text-xs text-body">New MRR</p>
      <p className="flex items-baseline gap-1 whitespace-nowrap">
        <span className="text-lg font-bold tracking-[-0.03em] text-ink">$1,980</span>
        <span className="text-xs font-bold text-[#15994f]">↑ 9%</span>
        <span className="text-xs text-muted">vs last week</span>
      </p>
      <div className="mt-auto flex h-10 items-end gap-1.5">
        {bars.map((height, index) => (
          <span key={index} className="flex-1 rounded-t-[3px] bg-[#fbe2c9]" style={{ height }} />
        ))}
        <span
          className="flex-1 rounded-t-[3px]"
          style={{ height: 40, background: "linear-gradient(180deg, #ec6fb0 0%, #f59e56 100%)" }}
        />
      </div>
    </div>
  );
}

const illustrations = [FitGaugeMini, ConversionEventsMini, SearchAdMini, WeeklyReportMini];

export default function FitThenBuild() {
  return (
    <section aria-labelledby="fit-then-build-title" className="py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-20">
        <div className="max-w-[680px]">
          <h2 id="fit-then-build-title" className="font-display text-h2 text-ink text-balance">
            Check the fit, then build
          </h2>
          <p className="mt-3.5 text-lg leading-[1.5] text-body text-pretty">
            Each account starts with your unit economics. If they look like a poor fit for paid search, I&apos;ll say
            so before we start.
          </p>
        </div>

        <ol className="mt-9 grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Illustration = illustrations[index];
            return (
              <li
                key={step.title}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]"
              >
                <div
                  className="grain h-52 overflow-hidden rounded-[18px] p-3.5"
                  style={{ background: frames[index] }}
                  aria-hidden="true"
                >
                  <div className="relative z-10 h-full">
                    <Illustration />
                  </div>
                </div>
                <div className="flex-1 px-4 pt-5.5 pb-6">
                  <h3 className="flex items-baseline gap-2.5 text-xl font-bold text-ink">
                    <span className="text-sm font-medium tracking-normal text-body tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.5] text-body">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 border-t border-border pt-5.5">
          <QuoteAttribution
            compact
            quote="Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!"
            person="Matt Robinson"
            role="Co-Founder"
            company="Live Tourney"
            companyLogoSrc="/client-logos/livetourney.svg"
            companyLogoAlt="Live Tourney logo"
            avatarSrc="/client pfp/matt robinson.png"
            avatarAlt="Matt Robinson"
          />
        </div>
      </div>
    </section>
  );
}
