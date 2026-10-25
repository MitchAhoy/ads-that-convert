import { Info } from "lucide-react";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import Reveal from "@/components/home/Reveal";
import { Section, SectionHead } from "@/components/home/primitives";

// Decorative illustrations, one per fit point. All aria-hidden.

function Pill({ children, strong }) {
  return strong ? (
    <span className="rounded-full bg-hp-accent px-4 py-1.5 font-hp text-[13px]/4.5 font-medium text-white shadow-[0_4px_12px_rgba(21,94,239,0.28)]">
      {children}
    </span>
  ) : (
    <span className="rounded-full bg-white px-3.5 py-1.5 font-hp text-[13px]/4.5 text-hp-text shadow-[0_0_0_1px_rgba(14,15,17,0.1)]">
      {children}
    </span>
  );
}

function Funnel({ label, steps }) {
  return (
    <div className="flex flex-1 basis-0 flex-col items-center">
      <span style={{ "--rv-i": 1, "--rv-step": "120ms" }} className="rv-fade pb-2 font-hp-mono text-xs/4 tracking-[0.04em] text-hp-muted">{label}</span>
      {steps.map((step, index) => (
        <span key={step} className="rv-pop flex flex-col items-center" style={{ "--rv-i": index + 2, "--rv-step": "120ms" }}>
          {index > 0 ? <span className="h-3.5 w-px bg-[#c9cdd3]" /> : null}
          <Pill strong={index === steps.length - 1}>{step}</Pill>
        </span>
      ))}
    </div>
  );
}

function FlowDiagram() {
  return (
    <Reveal aria-hidden="true" className="flex w-79 shrink-0 flex-col items-center">
      <span className="rv-pop flex items-center gap-2 rounded-full bg-white px-3.5 py-1.75 shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.06)]">
        <GoogleAdsIcon className="h-3.25 w-3.5" />
        <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">Ad click</span>
      </span>
      <svg viewBox="0 0 316 30" className="rv-fade h-7.5 w-79" style={{ "--rv-i": 1, "--rv-step": "120ms" }}>
        <path d="M158 0 C158 18, 79 12, 79 30" fill="none" stroke="#C9CDD3" strokeWidth="1.25" strokeDasharray="3 3" />
        <path d="M158 0 C158 18, 237 12, 237 30" fill="none" stroke="#C9CDD3" strokeWidth="1.25" strokeDasharray="3 3" />
      </svg>
      <div className="flex w-79">
        <Funnel label="SELF-SERVE" steps={["Sign-up", "Trial", "Paid"]} />
        <Funnel label="SALES-LED" steps={["Demo", "Opportunity", "Closed won"]} />
      </div>
    </Reveal>
  );
}

export function MrrLine() {
  return (
    <Reveal aria-hidden="true" className="relative flex w-79 shrink-0 flex-col pt-11">
      <svg viewBox="0 0 316 190" className="h-47.5 w-79 overflow-visible">
        <defs>
          <linearGradient id="hp-mrr-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#155EEF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#155EEF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="31.7" x2="316" y2="31.7" stroke="#8A8F98" strokeDasharray="3 4" />
        <path
          className="rv-fade"
          style={{ "--rv-i": 5 }}
          d="M0.0 118.8 L27.3 109.2 L54.5 104.5 L81.8 95.0 L109.1 90.2 L136.4 80.0 L163.6 70.5 L190.9 63.3 L218.2 52.2 L245.5 42.8 L272.7 33.2 L300.0 20.6 L300.0 190 L0 190 Z"
          fill="url(#hp-mrr-area)"
        />
        <path
          className="rv-draw"
          pathLength="1"
          d="M0.0 118.8 L27.3 109.2 L54.5 104.5 L81.8 95.0 L109.1 90.2 L136.4 80.0 L163.6 70.5 L190.9 63.3 L218.2 52.2 L245.5 42.8 L272.7 33.2 L300.0 20.6"
          fill="none"
          stroke="#155EEF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="rv-fade" style={{ "--rv-i": 12 }} cx="300.0" cy="20.6" r="6" fill="#FFFFFF" stroke="#155EEF" strokeWidth="2.5" />
      </svg>
      <span className="absolute top-14.5 left-0 font-hp-mono text-xs/4 tracking-[0.04em] text-[#6b7079]">$20K MRR</span>
      <span style={{ "--rv-i": 13 }} className="rv-pop absolute top-1 right-0 rounded-lg bg-hp-ink px-2.75 py-1.5 font-hp text-[13px]/4.5 font-medium text-white shadow-[0_6px_16px_rgba(14,15,17,0.22)]">
        $21.4k MRR
      </span>
    </Reveal>
  );
}

// Retention dots: 8 cohorts (rows) x 14 months. Months 1–3 are grey (before
// payback), then each cohort keeps 11 - row months, fading month by month.
const monthAlpha = ["F2", "E0", "D1", "C2", "B5", "A8", "9C", "91", "87", "7D", "75"];

function RetentionDots() {
  const dots = [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 14; col += 1) {
      const cx = 11 + col * 22;
      const cy = 10 + row * 20;
      if (col < 3) {
        dots.push(<circle key={`${row}-${col}`} cx={cx} cy={cy} r="4.5" fill="#D5D8DD" />);
      } else if (col - 3 < 11 - row) {
        dots.push(
          <circle
            key={`${row}-${col}`}
            className="rv-fade"
            style={{ "--rv-i": col - 3 + 2, "--rv-step": "70ms" }}
            cx={cx}
            cy={cy}
            r="4.5"
            fill={`#155EEF${monthAlpha[col - 3]}`}
          />,
        );
      } else {
        dots.push(<circle key={`${row}-${col}`} cx={cx} cy={cy} r="1.5" fill="#E4E6EA" />);
      }
    }
  }
  return (
    <Reveal aria-hidden="true" className="relative flex w-77 shrink-0 flex-col gap-2 pt-10">
      <div className="flex justify-between font-hp-mono text-xs/4 tracking-[0.04em] text-hp-muted">
        <span>M1</span>
        <span>M14</span>
      </div>
      <svg viewBox="0 0 308 160" className="h-40 w-77">
        {dots}
        <line x1="66" y1="0" x2="66" y2="160" stroke="#0E0F11" strokeWidth="1.25" strokeDasharray="2 3" />
      </svg>
      <span className="rv-pop absolute top-0.5 left-1 rounded-lg bg-hp-ink px-2.75 py-1.5 font-hp text-[13px]/4.5 font-medium text-white shadow-[0_6px_16px_rgba(14,15,17,0.22)]">
        Pays back at M3
      </span>
    </Reveal>
  );
}

const fitPoints = [
  {
    title: "You sell SaaS,",
    muted: "self-serve or sales-led",
    body: "Trials, freemium or demo requests. I've run all three and set up tracking for each.",
    Illustration: FlowDiagram,
  },
  {
    title: "$20k+ MRR",
    muted: "already coming in",
    body: "This shows product-market fit, and gives enough data to judge whether paid search makes sense.",
    Illustration: MrrLine,
  },
  {
    title: "Customers who stay",
    muted: "long enough to pay back",
    body: "If churn is too high, customers won't stay long enough to pay back what it cost to acquire them.",
    Illustration: RetentionDots,
  },
];

export default function HomeWhoFor() {
  return (
    <Section id="who-this-is-for" labelledBy="who-for-title">
      <SectionHead
        id="who-for-title"
        marker={4}
        eyebrow="05 · Fit"
        lead="Who this works for,"
        accent="and who it doesn't."
        intro="Google Ads amplifies a product that already sells. It can't create a market for one that doesn't. It works if you:"
      />

      <ul className="flex flex-col lg:flex-row lg:border-t lg:border-hp-line">
        {fitPoints.map(({ title, muted, body, Illustration }, index) => (
          <li
            key={title}
            className={`flex min-w-0 flex-col gap-2.5 overflow-hidden border-t border-hp-line px-5 pt-7 sm:px-8 lg:flex-1 lg:basis-0 lg:justify-between lg:gap-0 lg:border-t-0 lg:p-0 ${
              index < fitPoints.length - 1 ? "lg:border-r lg:border-hp-line" : ""
            }`}
          >
            <div className="flex flex-col gap-2.5 lg:px-7 lg:pt-10 lg:pb-7">
              <h3 className="flex flex-wrap gap-x-1.5">
                <span className="font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-ink">{title}</span>
                <span className="font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-muted">{muted}</span>
              </h3>
              <p className="font-hp text-base/6 text-hp-soft lg:text-base/6.25">{body}</p>
            </div>
            {/* Dotted panel behind the illustration; full-bleed in its cell, and
                bottom-aligned across the row on desktop so the panels line up. */}
            <div className="hp-well -mx-5 mt-2.5 flex shrink-0 flex-col items-center overflow-hidden border-t border-hp-line px-5 pt-7 pb-8 sm:-mx-8 sm:px-8 lg:m-0 lg:h-71 lg:px-7 lg:pb-0">
              <Illustration />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-start gap-2.5 border-t border-hp-line bg-hp-wash p-5 sm:px-8 lg:items-center lg:justify-center lg:bg-hp-band lg:px-12 lg:py-6.5">
        <Info aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-hp-fine lg:mt-0" strokeWidth={1.75} />
        <p className="font-hp text-base/6 text-hp-body">
          Pre-revenue, or hoping ads will find product-market fit for you? I&apos;m probably not the right hire yet.
        </p>
      </div>
    </Section>
  );
}
