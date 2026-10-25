import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import Reveal from "@/components/home/Reveal";
import { QuoteRow, Section, SectionHead } from "@/components/home/primitives";

// "Check the fit, then build": four steps, each with a decorative mockup.
// Mockups are aria-hidden; their numbers are illustrative.

export function StepHeader({ number, title, muted, description, shortDescription, className = "" }) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <p className="font-hp-mono text-xs/4 tracking-[0.06em] text-hp-accent">{number}</p>
      <h3 className="flex flex-wrap gap-x-1.5 lg:gap-x-1.75">
        <span className="font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-ink lg:text-[26px]/8 lg:tracking-[-0.025em]">
          {title}
        </span>
        <span className="font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-muted lg:text-[26px]/8 lg:tracking-[-0.025em]">
          {muted}
        </span>
      </h3>
      <p className="font-hp text-base/6 text-hp-soft lg:text-base/6.25">
        {shortDescription ? (
          <>
            <span className="lg:hidden">{shortDescription}</span>
            <span className="hidden lg:inline">{description}</span>
          </>
        ) : (
          description
        )}
      </p>
    </div>
  );
}

function LegendDot({ color, label, strong }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className={`font-hp text-[13px]/4.5 ${strong ? "font-medium text-hp-ink" : "text-hp-soft"}`}>{label}</span>
    </span>
  );
}

export function FitGauge() {
  return (
    <Reveal aria-hidden="true" className="relative flex flex-col items-center self-center pt-4.5 lg:h-75 lg:w-105 lg:shrink-0 lg:pt-0">
      <svg viewBox="0 0 400 220" className="h-41.25 w-75 lg:h-57.75 lg:w-105">
        <defs>
          <linearGradient id="hp-gauge-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E4E6EA" stopOpacity="0.15" />
            <stop offset="1" stopColor="#E4E6EA" />
          </linearGradient>
        </defs>
        <path className="rv-draw" pathLength="1" style={{ "--rv-i": 0, "--rv-step": "260ms" }} d="M30 210 A170 170 0 0 1 109.9 65.8" fill="none" stroke="url(#hp-gauge-fade)" strokeWidth="34" />
        <path className="rv-draw" pathLength="1" style={{ "--rv-i": 1, "--rv-step": "260ms" }} d="M120.2 59.9 A170 170 0 0 1 279.8 59.9" fill="none" stroke="#B7CBF8" strokeWidth="34" />
        <path className="rv-draw" pathLength="1" style={{ "--rv-i": 2, "--rv-step": "260ms" }} d="M290.1 65.8 A170 170 0 0 1 370 210" fill="none" stroke="#155EEF" strokeWidth="34" />
      </svg>
      <div className="rv-fade flex gap-3.5 pt-4 lg:gap-4 lg:pt-5.5" style={{ "--rv-i": 9 }}>
        <LegendDot color="#D5D8DD" label="Hold off" />
        <LegendDot color="#B7CBF8" label="Test" />
        <LegendDot color="#155EEF" label="Worth scaling" strong />
      </div>
      <div className="rv-pop absolute inset-x-0 top-23 flex flex-col items-center gap-0.5 lg:top-24 lg:gap-1" style={{ "--rv-i": 6 }}>
        <span className="font-hp text-[46px]/12 font-medium tracking-[-0.04em] text-hp-ink lg:text-[64px]/16">3.4x</span>
        <span className="font-hp text-[13px]/4.5 text-hp-soft lg:text-sm/5">LTV vs. max cost per customer</span>
      </div>
    </Reveal>
  );
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6">
      <circle cx="14" cy="14" r="4.6" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />
      <line x1="14" y1="9.4" x2="14" y2="4.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="3.8" r="1.9" fill="#FFFFFF" />
      <line x1="10.6" y1="17.2" x2="6.8" y2="20.6" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="10.4" y1="11.4" x2="5" y2="7.6" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="4.4" cy="7.2" r="1.7" fill="#FFFFFF" />
    </svg>
  );
}

function StripeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5">
      <path
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

const events = [
  { name: "trial_started", source: "From your app", when: "12s ago", bg: "#0E0F11", icon: <span className="font-hp text-lg/5 font-bold text-white">a</span> },
  { name: "demo_booked", source: "From HubSpot", when: "4m ago", bg: "#FF7A59", icon: <HubSpotMark /> },
  { name: "first_payment", source: "From Stripe · $149 MRR", when: "1h ago", bg: "#635BFF", icon: <StripeMark /> },
  { name: "plan_upgraded", source: "From Stripe · +$80 MRR", when: "3h ago", bg: "#635BFF", icon: <StripeMark />, faded: true },
];

// `syncIcon`/`syncLabel` name the ad platform the events sync to. The tray
// bleeds off the right edge; `headerPadding` keeps a longer label in view.
export function ConversionEvents({
  syncIcon = <GoogleAdsIcon className="h-3.5 w-3.75" />,
  syncLabel = "Google Ads",
  headerPadding = "pr-30",
}) {
  return (
    <Reveal aria-hidden="true" className="flex h-75 shrink-0 overflow-hidden pt-3.5 lg:h-auto lg:pt-0">
      <div className="flex w-130 shrink-0 flex-col rounded-tl-[20px] bg-hp-tray shadow-[0_0_0_1px_rgba(14,15,17,0.06)] lg:w-165">
        <div className={`flex items-center justify-between pt-3.5 pb-3 pl-6 ${headerPadding}`}>
          <span className="font-hp text-[15px]/5 font-medium text-hp-ink">Conversion events</span>
          <span className="flex items-center gap-1.75">
            <span className="font-hp text-[13px]/4.5 text-hp-soft">Syncing to</span>
            {syncIcon}
            <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">{syncLabel}</span>
          </span>
        </div>
        <div className="flex flex-col rounded-tl-2xl bg-white pt-1.5 pl-5 shadow-[0_0_0_1px_rgba(14,15,17,0.07),0_2px_8px_rgba(14,15,17,0.04)]">
          {events.map((event, index) => (
            <div
              key={event.name}
              style={{ "--rv-i": index + 1, "--rv-step": "110ms" }}
              className={`rv relative flex items-center gap-4 py-4 ${index < events.length - 1 ? "border-b border-dashed border-[#e4e6ea]" : ""}`}
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-[11px] shadow-[0_0_0_1px_rgba(14,15,17,0.08)]"
                style={{ backgroundColor: event.bg }}
              >
                {event.icon}
              </span>
              <span className="flex w-44 shrink-0 flex-col gap-0.5 lg:w-62.5">
                <span className="font-hp-mono text-[15px]/5 text-hp-ink">{event.name}</span>
                <span className="font-hp text-sm/5 text-[#6b7079]">{event.source}</span>
              </span>
              <span className="flex w-50 shrink-0 items-center gap-1.75">
                <span className="size-1.75 shrink-0 rounded-full bg-hp-accent" />
                <span className="font-hp text-sm/5 font-medium text-hp-accent">Sent</span>
                <span className="font-hp text-sm/5 text-hp-muted">{event.when}</span>
              </span>
              {event.faded ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/65" /> : null}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// `adLabel` is the platform's ad label ("Sponsored" on Google, "Ad" on Bing).
export function SearchAd({ className = "", adLabel = "Sponsored" }) {
  return (
    <div className={`flex shrink-0 flex-col rounded-t-[18px] bg-hp-tray shadow-[0_0_0_1px_rgba(14,15,17,0.06)] ${className}`}>
      <div className="flex gap-1.5 px-4 py-3">
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
      </div>
      <div className="flex h-82.5 shrink-0 flex-col gap-3.5 rounded-t-[14px] bg-white px-5 pt-4.5 pb-10 shadow-[0_0_0_1px_rgba(14,15,17,0.07)]">
        <div className="flex items-center gap-2 rounded-full px-3.5 py-2.25 shadow-[0_0_0_1px_#e4e6ea]">
          <svg viewBox="0 0 24 24" className="size-3.5 shrink-0">
            <circle cx="11" cy="11" r="7" fill="none" stroke="#8A8F98" strokeWidth="2" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#8A8F98" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-hp text-sm/4.5 text-hp-ink">acme alternative for startups</span>
        </div>
        <div className="flex flex-col gap-1 pt-1.5">
          <p className="flex items-center gap-1.5 font-hp text-[13px]/4.5">
            <span className="font-semibold text-hp-ink">{adLabel}</span>
            <span className="text-[#6b7079]">· yoursaas.com</span>
          </p>
          <p className="font-hp text-[17px]/6 text-[#1a0dab] underline decoration-[#155eef99] decoration-dashed decoration-1 underline-offset-4">
            Switch from Acme in 5 minutes
          </p>
          <p className="font-hp text-sm/5.25 text-hp-body">Import your data in one click. Free for 14 days, no card needed.</p>
        </div>
        <span className="h-2 w-[88%] rounded-full bg-hp-line-soft" />
        <span className="h-2 w-[64%] rounded-full bg-hp-line-soft" />
        <span className="h-2 w-[76%] rounded-full bg-[#f3f4f6]" />
      </div>
    </div>
  );
}

function KeywordCard() {
  const rows = [
    ["Avg. CPC", "$8.40"],
    ["Trial rate", "11.2%"],
    ["Cost per paid", "$412"],
  ];
  return (
    <div className="relative flex w-77.5 shrink-0 flex-col rounded-tl-[18px] bg-linear-to-b from-[#eaf0fe] to-[#f7f9ff] shadow-[0_0_0_1px_rgba(21,94,239,0.12)]">
      <div className="flex items-center gap-2 px-4.5 py-3.25">
        <span className="size-2 rounded-full bg-hp-accent" />
        <span className="font-hp text-[15px]/5 font-medium text-hp-accent">High intent keyword</span>
      </div>
      <div className="flex h-82.5 shrink-0 flex-col gap-4 rounded-tl-[14px] bg-white py-4.5 pr-15 pl-5 shadow-[0_0_0_1px_rgba(14,15,17,0.07)]">
        <div className="flex flex-col gap-1">
          <span className="font-hp text-[19px]/6 font-medium tracking-[-0.01em] text-hp-ink">acme alternative</span>
          <span className="font-hp text-sm/5 text-hp-soft">Competitor term · exact match</span>
        </div>
        <div className="flex flex-col border-t border-hp-line-soft">
          {rows.map(([label, value], index) => (
            <div
              key={label}
              className={`relative flex justify-between py-2.5 ${index < rows.length - 1 ? "border-b border-hp-line-soft" : ""}`}
            >
              <span className="font-hp text-sm/5 text-hp-soft">{label}</span>
              <span className="font-hp text-sm/5 font-medium text-hp-ink">{value}</span>
              {index === rows.length - 1 ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/50" /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuildMockup() {
  return (
    <Reveal aria-hidden="true" className="flex h-62.5 shrink-0 overflow-hidden pt-3.5 lg:relative lg:h-auto lg:gap-4 lg:overflow-visible lg:pt-3">
      <SearchAd className="rv w-87.5 lg:w-75" />
      <span style={{ "--rv-i": 5 }} className="rv-pop absolute top-24.5 left-58 hidden items-center xl:flex gap-1.5 rounded-lg bg-hp-accent px-2.5 py-1.25 font-hp text-sm/4.5 font-medium text-white shadow-[0_6px_16px_rgba(21,94,239,0.3)]">
        Position 1
      </span>
      {/* Needs the full 1120px column; hidden on narrower desktops rather than clipped. */}
      <div className="rv hidden xl:flex" style={{ "--rv-i": 2 }}>
        <KeywordCard />
      </div>
    </Reveal>
  );
}

// Stacked bars per week: [trials, demos, paid] heights in px.
const bars = [
  [12, 17, 34], [13, 18, 36], [17, 26, 52], [15, 23, 46], [19, 31, 61], [20, 32, 63], [21, 31, 62], [24, 39, 77],
  [23, 37, 73], [28, 43, 86], [27, 43, 84], [29, 46, 90], [33, 52, 102], [36, 59, 116], [35, 54, 107], [37, 58, 115],
];

export function MrrChart({ label = "New MRR from Google Ads" }) {
  return (
    <Reveal aria-hidden="true" className="flex flex-col gap-3.5 pt-3.5 lg:pt-0">
      <div className="flex flex-col gap-0.5">
        <span className="font-hp text-sm/5 text-hp-soft">{label}</span>
        <span className="flex items-center gap-2.5">
          <span className="font-hp text-[44px]/12.5 font-medium tracking-[-0.04em] text-hp-ink">$3,664</span>
          <span className="font-hp text-sm/5 font-medium text-hp-up">▲ +18%</span>
        </span>
      </div>
      <div className="flex h-54 items-end gap-1.25">
        {bars.map(([trials, demos, paid], index) => (
          <span key={index} className="rv-bar flex w-4.25 shrink-0 flex-col justify-end gap-0.5" style={{ "--rv-i": index, "--rv-step": "45ms" }}>
            <span className="rounded-xs bg-[#c7d6fc]" style={{ height: trials }} />
            <span className="rounded-xs bg-[#6e95f5]" style={{ height: demos }} />
            <span className="rounded-xs bg-[#1640b8]" style={{ height: paid }} />
          </span>
        ))}
      </div>
      <div className="flex gap-3.5">
        {[
          ["#1640B8", "Paid", "23"],
          ["#6E95F5", "Demos", "41"],
          ["#C7D6FC", "Trials", "128"],
        ].map(([color, label, value]) => (
          <span key={label} className="flex items-center gap-1.5 font-hp text-[13px]/4.5">
            <span className="size-2.25 rounded-xs" style={{ backgroundColor: color }} />
            <span className="text-hp-soft">{label}</span>
            <span className="font-medium text-hp-ink">{value}</span>
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export const fade = "pointer-events-none absolute inset-x-0 bottom-0 hidden bg-linear-to-b from-white/0 to-white to-92% lg:block";
export const cellBase = "flex flex-col gap-2.5 border-t border-hp-line pt-7 lg:h-140 lg:gap-7 lg:overflow-hidden lg:border-t-0 lg:pt-12";

export default function HomeProcess() {
  return (
    <Section id="how-it-works" labelledBy="process-title">
      <SectionHead
        id="process-title"
        marker={3}
        eyebrow="04 · Process"
        lead="Check the fit,"
        accent="then build."
        intro="Each account starts with your unit economics. If they look like a poor fit for paid search, I'll say so before we start."
      />

      <div className="flex flex-col lg:border-t lg:border-hp-line">
          <div className="flex flex-col lg:flex-row lg:border-b lg:border-hp-line">
            <div className={`${cellBase} px-5 pb-8 sm:px-8 lg:w-115 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-12 lg:pb-0`}>
              <StepHeader
                number="01"
                title="Fit check"
                muted="before any spend"
                description="Sign-up to paid rate, LTV and target payback, compared against current CPCs for your keywords."
              />
              <FitGauge />
            </div>
            <div className={`${cellBase} relative overflow-hidden pl-5 sm:pl-8 lg:min-w-0 lg:flex-1 lg:pl-12`}>
              <StepHeader
                number="02"
                title="Tracking"
                muted="all the way to paid"
                description="Trial, demo and paid events sent back to Google Ads from your product, CRM or Stripe, so bidding learns from revenue, not form fills."
                shortDescription="Trial, demo and paid events sent back to Google Ads from your product, CRM or Stripe."
                className="pr-5 sm:pr-8 lg:max-w-140 lg:pr-12"
              />
              <ConversionEvents />
              <span aria-hidden="true" className={`${fade} h-22.5`} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className={`${cellBase} relative overflow-hidden px-5 sm:px-8 lg:min-w-0 lg:flex-1 lg:border-r lg:border-hp-line lg:pr-0 lg:pl-12`}>
              <StepHeader
                number="03"
                title="Build"
                muted="from high intent outwards"
                description="Starting with high-intent and competitor terms, then moving into non-branded demand."
                className="lg:max-w-140 lg:pr-12"
              />
              <BuildMockup />
              <span aria-hidden="true" className={`${fade} h-27.5`} />
            </div>
            <div className={`${cellBase} px-5 pb-8 sm:px-8 lg:w-115 lg:shrink-0 lg:px-12 lg:pb-0`}>
              <StepHeader
                number="04"
                title="Iterate"
                muted="and report in MRR"
                description="Weekly changes, and a report written in new MRR, not clicks."
              />
              <MrrChart />
            </div>
          </div>
      </div>

      <QuoteRow
        avatarSrc="/client pfp/matt robinson.png"
        quote="Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!"
        quoteClassName="lg:max-w-205"
        name="Matt Robinson"
        role="Co-Founder"
        logo={{ src: "/client-logos/livetourney.svg", alt: "LiveTourney", width: 92, height: 37 }}
      />
    </Section>
  );
}
