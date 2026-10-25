import Reveal from "@/components/home/Reveal";
import MetaIcon from "@/components/ui/MetaIcon";
import {
  AuditCard,
  BudgetCard,
  Check,
  GreyChip,
  LeakSlot,
  MockCard,
  StructureCard,
} from "@/components/services/illustrations/shared";

// Meta ads mockups for /services/meta-ads. Order of `leaks` matches
// leaks.items in lib/services.js.

function EventPicker() {
  return (
    <LeakSlot>
      <MockCard className="w-62.5 gap-2 p-3">
        <span className="font-hp text-xs/4 text-hp-fine">Conversion event</span>
        <span className="flex items-center justify-between rounded-lg px-2.5 py-1.75 shadow-[0_0_0_1.5px_#155eef,0_0_0_4px_rgba(21,94,239,0.12)]">
          <span className="font-hp-mono text-[13px]/4.5 text-hp-ink">Subscribe</span>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="flex items-center justify-between px-2.5 py-1.25">
            <span className="font-hp-mono text-xs/4 text-hp-muted line-through">CompleteRegistration</span>
            <span className="font-hp text-xs/4 text-hp-muted">sign-up</span>
          </span>
          <span className="flex items-center justify-between px-2.5 py-1.25">
            <span className="font-hp-mono text-xs/4 text-hp-body">StartTrial</span>
            <span className="font-hp text-xs/4 text-hp-fine">trial</span>
          </span>
          <span className="flex items-center justify-between rounded-md bg-[#eef3fe] px-2.5 py-1.25">
            <span className="font-hp-mono text-xs/4 text-hp-ink">Subscribe</span>
            <span className="flex items-center gap-1 font-hp text-xs/4 font-medium text-hp-accent">
              paid
              <Check />
            </span>
          </span>
        </span>
      </MockCard>
    </LeakSlot>
  );
}

function PixelAndApi() {
  return (
    <LeakSlot>
      <div className="relative h-39 w-72.5">
        <svg viewBox="0 0 290 156" className="absolute inset-0 h-39 w-72.5" fill="none">
          <path className="rv-fade" d="M 98 67 C 124 67, 134 79, 152 80" stroke="#C3C7CF" strokeWidth="1.5" strokeDasharray="4 4" />
          <path className="rv-draw" pathLength="1" style={{ "--rv-i": 2 }} d="M 154 135 C 198 135, 200 108, 236 106" stroke="#155EEF" strokeWidth="2" />
          <circle cx="236" cy="106" r="3" fill="#155EEF" />
        </svg>
        <span className={`rv-pop absolute top-13 left-0 flex items-center gap-1.75 rounded-full bg-white py-1.75 pr-3 pl-2.5 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]`}>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 9h20" />
          </svg>
          <span className="font-hp-mono text-xs/4 text-hp-body">Pixel</span>
        </span>
        <span className="rv-pop absolute top-30 left-0 flex items-center gap-1.75 rounded-full bg-white py-1.75 pr-3 pl-2.5 shadow-[0_0_0_1.5px_#155eef,0_2px_6px_rgba(14,15,17,0.04)]" style={{ "--rv-i": 1 }}>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#155EEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="7" rx="1.5" />
            <rect x="3" y="14" width="18" height="7" rx="1.5" />
            <path d="M7 6.5h.01M7 17.5h.01" />
          </svg>
          <span className="font-hp-mono text-xs/4 text-hp-ink">Conversions API</span>
        </span>
        <span className="rv-pop absolute top-17.25 left-37.5 flex items-center gap-1.25 rounded-full bg-white py-0.75 pr-2 pl-1.25 shadow-[0_0_0_1px_#e4e6ea]" style={{ "--rv-i": 3 }}>
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m5.7 5.7 12.6 12.6" />
          </svg>
          <span className="font-hp text-xs/4 text-hp-fine">ad blocker</span>
        </span>
        <span className="rv-pop absolute top-19.75 left-58.5 flex size-13.5 items-center justify-center rounded-[14px] bg-white shadow-[0_0_0_1px_#e4e6ea,0_8px_20px_rgba(14,15,17,0.08)]" style={{ "--rv-i": 4 }}>
          <MetaIcon className="size-7.5" />
        </span>
      </div>
    </LeakSlot>
  );
}

function CreativeFatigue() {
  return (
    <LeakSlot>
      <MockCard className="w-72.5 gap-2 px-3 pt-3 pb-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-6 shrink-0 rounded-md bg-linear-135 from-[#dcd3fb] via-[#c7d6fc] to-[#f7d9e3]" />
            <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Hook A</span>
            <span className="font-hp text-xs/4 text-hp-fine">week 11</span>
          </span>
          <span className="rounded-full bg-hp-ink px-2.25 py-0.75 font-hp text-xs/4 font-medium text-white">Retire</span>
        </div>
        <svg viewBox="0 0 266 70" className="h-17.5 w-66.5" fill="none">
          <path d="M 0 23.5 H 266 M 0 46.5 H 266" stroke="#F0F1F3" />
          <path d="M 180 0 V 70" stroke="#C3C7CF" strokeDasharray="3 3" />
          <path className="rv-draw" pathLength="1" d="M 0 60 C 40 59, 80 52, 120 41 S 200 12, 266 7" stroke="#0E0F11" strokeWidth="1.75" strokeLinecap="round" />
          <path className="rv-draw" pathLength="1" style={{ "--rv-i": 1 }} d="M 0 12 C 50 12, 90 18, 130 32 S 210 56, 266 61" stroke="#155EEF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="180" cy="17" r="3.5" fill="#FFFFFF" stroke="#0E0F11" strokeWidth="1.75" />
          <circle cx="180" cy="51" r="3.5" fill="#FFFFFF" stroke="#155EEF" strokeWidth="2" />
        </svg>
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1.5 font-hp text-xs/4 text-hp-body">
            <span className="h-0.5 w-3 rounded-full bg-hp-ink" />
            Frequency
          </span>
          <span className="flex items-center gap-1.5 font-hp text-xs/4 text-hp-body">
            <span className="h-0.5 w-3 rounded-full bg-hp-accent" />
            CTR
          </span>
        </div>
      </MockCard>
    </LeakSlot>
  );
}

function Consolidation() {
  const thin = [18, 11, 24, 8, 15, 20, 9, 13, 22, 7, 16, 10];
  const thick = [
    [74, "#155EEF"],
    [58, "#8FB0F8"],
    [88, "#C7D6FC"],
  ];
  return (
    <LeakSlot className="gap-4">
      <div className="flex flex-col gap-2.5">
        <div className="flex h-23 items-end gap-1">
          {thin.map((height, index) => (
            <span key={index} className="rv-bar w-1.5 rounded-xs bg-[#dadde2]" style={{ height, "--rv-i": index, "--rv-step": "30ms" }} />
          ))}
        </div>
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">12 ad sets</span>
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-hp-tray py-0.75 pr-2.25 pl-2 font-hp text-xs/4 text-hp-soft">
          <span className="size-1.5 rounded-full bg-[#a0a5ae]" />
          Learning limited
        </span>
      </div>
      <svg viewBox="0 0 24 24" className="mb-13 size-5 shrink-0" fill="none" stroke="#A0A5AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      <div className="flex flex-col gap-2.5">
        <div className="flex h-23 items-end gap-1.5">
          {thick.map(([height, color], index) => (
            <span key={color} className="rv-bar w-6 rounded-sm" style={{ height, backgroundColor: color, "--rv-i": index + 12, "--rv-step": "30ms" }} />
          ))}
        </div>
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">3 ad sets</span>
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#ecf7ef] py-0.75 pr-2.25 pl-2 font-hp text-xs/4 font-medium text-hp-up">
          <span className="size-1.5 rounded-full bg-hp-up" />
          Active
        </span>
      </div>
    </LeakSlot>
  );
}

function Journey() {
  const steps = [
    { label: "Saw ad", day: "Day 1", tag: "0% credit", icon: <MetaIcon className="size-5.5" /> },
    {
      label: "Googled",
      day: "Day 6",
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#4B5059" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      ),
    },
    {
      label: "Direct visit",
      day: "Day 9",
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#4B5059" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      ),
    },
    {
      label: "Paid",
      day: "Day 12",
      tag: "Last click",
      final: true,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
    },
  ];
  return (
    <LeakSlot>
      <div className="relative flex w-72.5 items-end gap-3.5">
        {/* Dashed path through the circle centres (tag 30px + half a 38px circle). */}
        <span className="absolute top-12.25 right-7.75 left-7.75 border-t-[1.5px] border-dashed border-[#c3c7cf]" />
        {steps.map((step, index) => (
          <div key={step.label} className="rv-pop relative flex w-15.5 flex-col items-center" style={{ "--rv-i": index, "--rv-step": "120ms" }}>
            {step.tag ? (
              <span
                className={`mb-2 rounded-full px-2 py-0.75 font-hp text-xs/4 whitespace-nowrap ${
                  step.final ? "bg-hp-ink font-medium text-white" : "bg-white text-hp-fine shadow-[0_0_0_1px_#e4e6ea]"
                }`}
              >
                {step.tag}
              </span>
            ) : null}
            <span
              className={`flex size-9.5 items-center justify-center rounded-full ${
                step.final ? "bg-hp-accent shadow-[0_0_0_4px_rgba(21,94,239,0.14)]" : "bg-white shadow-[0_0_0_1px_#e4e6ea]"
              }`}
            >
              {step.icon}
            </span>
            <span className="pt-2 font-hp text-xs/4 font-medium whitespace-nowrap text-hp-ink">{step.label}</span>
            <span className="font-hp-mono text-xs/4 text-hp-fine">{step.day}</span>
          </div>
        ))}
      </div>
    </LeakSlot>
  );
}

const audit = (
  <AuditCard
    title="Creative tests"
    meta="This week"
    rows={[
      ["Founder video", "Winner"],
      ["Pain-point static", "Live"],
      ["Feature carousel", <GreyChip key="chip">Cut</GreyChip>],
    ]}
    totalLabel="New angles tested"
    total="3"
  />
);

function FeedAd({ className = "", compact }) {
  return (
    <div className={`flex flex-col overflow-hidden bg-white ${className}`}>
      <div className="flex items-center gap-2.5 px-3.5 pt-3.5">
        <span className="size-8 shrink-0 rounded-full bg-hp-accent" />
        <span className="flex flex-1 flex-col">
          <span className="font-hp text-sm/4.5 font-semibold text-hp-ink">YourSaaS</span>
          <span className="font-hp text-xs/4 text-hp-fine">Sponsored</span>
        </span>
        <span className="font-hp text-base/4 text-hp-fine">···</span>
      </div>
      <p className="px-3.5 pt-2.5 pb-3 font-hp text-[13px]/4.75 text-hp-ink">
        Still onboarding users by hand? Build guided tours in minutes, no engineers needed.
      </p>
      <div className={`flex items-center justify-center bg-linear-to-b from-[#e3e9fd] to-[#eef1fd] ${compact ? "h-34" : "h-42.5"}`}>
        <span className="flex w-50 flex-col gap-2 rounded-lg bg-white p-3.5 shadow-[0_4px_14px_rgba(21,94,239,0.12)]">
          <span className="h-1.5 w-[64%] rounded-full bg-hp-accent" />
          <span className="h-1.5 w-[88%] rounded-full bg-hp-line" />
          <span className="h-1.5 w-[70%] rounded-full bg-hp-line" />
          <span className="mt-1.5 w-fit rounded-md bg-hp-ink px-2.5 py-1 font-hp text-xs/4 text-white">Next step</span>
        </span>
      </div>
      <div className="flex items-center justify-between bg-[#f4f5f7] px-3.5 py-2.5">
        <span className="flex flex-col">
          <span className="font-hp text-xs/4 text-hp-fine uppercase">yoursaas.com</span>
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Start your free trial</span>
        </span>
        <span className="rounded-md bg-[#e4e6eb] px-3 py-1.5 font-hp text-[13px]/4.5 font-semibold text-hp-ink">Sign up</span>
      </div>
    </div>
  );
}

function Build() {
  return (
    <Reveal aria-hidden="true" className="flex h-62.5 shrink-0 overflow-hidden pt-3.5 lg:h-auto lg:gap-4 lg:overflow-visible lg:pt-3">
      <div className="rv flex w-87.5 shrink-0 flex-col rounded-t-[18px] bg-hp-tray shadow-[0_0_0_1px_rgba(14,15,17,0.06)] lg:w-75">
        <div className="flex gap-1.5 px-4 py-3">
          <span className="size-2 rounded-full bg-[#d5d8dd]" />
          <span className="size-2 rounded-full bg-[#d5d8dd]" />
          <span className="size-2 rounded-full bg-[#d5d8dd]" />
        </div>
        <FeedAd compact className="h-82.5 rounded-t-[14px] shadow-[0_0_0_1px_rgba(14,15,17,0.07)]" />
      </div>
      <div className="rv hidden xl:flex" style={{ "--rv-i": 2 }}>
        <StructureCard
          title="Campaign structure"
          rows={[
            ["Prospecting", "live"],
            ["Creative testing", "live"],
            ["Retargeting", "live"],
            ["New creative batch", "Weekly"],
            ["Scale budget", "Once it pays back"],
          ]}
        />
      </div>
    </Reveal>
  );
}

function Campaigns() {
  return (
    <>
      <MockCard className="overflow-hidden">
        <FeedAd />
      </MockCard>
      <BudgetCard
        segments={[
          ["Prospecting", "#155EEF", 61],
          ["Creative testing", "#6E95F5", 24],
          ["Retargeting (capped)", "#C7D6FC", 15],
        ]}
      />
    </>
  );
}

export const metaVisuals = {
  icon: <MetaIcon className="w-6 sm:w-8 lg:w-9" />,
  syncIcon: <MetaIcon className="h-3.5 w-4" />,
  syncLabel: "Meta Ads",
  mrrLabel: "New MRR from Meta ads",
  leaks: [EventPicker, PixelAndApi, CreativeFatigue, Consolidation, Journey],
  audit,
  Build,
  Campaigns,
};
