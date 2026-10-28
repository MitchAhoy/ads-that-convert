import Reveal from "@/components/home/Reveal";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import {
  AuditCard,
  BudgetCard,
  CardTitle,
  Check,
  GreyChip,
  LeakSlot,
  MockCard,
  StructureCard,
} from "@/components/services/illustrations/shared";

// LinkedIn Ads mockups for /services/linkedin-ads. Order of `leaks` matches
// leaks.items in lib/services.js. LinkedIn labels feed ads "Promoted".

function Toggle({ on }) {
  return (
    <span className={`flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 ${on ? "justify-end bg-hp-accent" : "bg-[#dadde2]"}`}>
      <span className="size-3 rounded-full bg-white" />
    </span>
  );
}

function Radio({ selected }) {
  return (
    <span
      className={`size-3.5 shrink-0 rounded-full ${selected ? "shadow-[inset_0_0_0_4.5px_#155eef]" : "shadow-[inset_0_0_0_1.5px_#c3c7cf]"}`}
    />
  );
}

function ExpansionOff() {
  const rows = [
    ["Enable Audience Expansion", "Off"],
    ["LinkedIn Audience Network", "Off"],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.25 px-3.5 py-3">
        <span className="flex items-center gap-1.75">
          <LinkedInIcon className="size-3.5" />
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Audience &amp; placement</span>
        </span>
        {rows.map(([label]) => (
          <span key={label} className="flex items-center justify-between border-t border-hp-line-soft pt-2">
            <span className="font-hp text-xs/4 text-hp-body">{label}</span>
            <Toggle on={false} />
          </span>
        ))}
        <span className="flex items-center justify-between border-t border-hp-line-soft pt-2">
          <span className="font-hp text-xs/4 text-hp-ink">Matched audience only</span>
          <Toggle on />
        </span>
      </MockCard>
    </LeakSlot>
  );
}

function TargetingStack() {
  const layers = ["Job function: Engineering", "Seniority: Director+", "Company list: 1,240 accounts"];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-1.5 px-3.5 py-3">
        <CardTitle title="Audience" meta="42k members" className="pb-1" />
        <span className="flex items-center justify-between px-0.5">
          <span className="font-hp text-xs/4 text-hp-muted line-through">Job title: &quot;Manager&quot;</span>
          <GreyChip>Removed</GreyChip>
        </span>
        {layers.map((layer, index) => (
          <span
            key={layer}
            className="rv-fade flex items-center gap-1.75 rounded-md bg-[#eef3fe] px-2 py-1 font-hp text-xs/4 text-hp-ink"
            style={{ "--rv-i": index + 1 }}
          >
            <Check className="size-3" strokeWidth={3} />
            {layer}
          </span>
        ))}
      </MockCard>
    </LeakSlot>
  );
}

function LeadQuality() {
  const rows = [
    ["Form fills", "w-50 bg-[#dadde2]", "120", "text-hp-fine"],
    ["Qualified", "w-22 bg-[#8fb0f8]", "34", "text-hp-ink"],
    ["Opportunities", "w-10 bg-hp-accent", "11", "text-hp-ink"],
  ];
  return (
    <LeakSlot>
      <div className="flex w-72.5 flex-col gap-2.5">
        <div className="flex items-baseline justify-between">
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Lead Gen Form</span>
          <span className="font-hp-mono text-xs/4 text-hp-fine">LAST 30 DAYS</span>
        </div>
        {rows.map(([label, bar, value, tone], index) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="w-21 shrink-0 font-hp text-xs/4 text-hp-body">{label}</span>
            <span className={`rv-fade h-2.5 rounded-[3px] ${bar}`} style={{ "--rv-i": index }} />
            <span className={`font-hp-mono text-xs/4 ${tone}`}>{value}</span>
          </div>
        ))}
        <span className="font-hp text-xs/4 text-hp-fine">Synced to your CRM within minutes</span>
      </div>
    </LeakSlot>
  );
}

function Bidding() {
  const options = [
    ["Maximum delivery", false],
    ["Cost cap", false],
    ["Manual bidding", true],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.25 px-3.5 py-3">
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Bidding strategy</span>
        <span className="flex flex-col gap-1.5">
          {options.map(([label, selected]) => (
            <span key={label} className="flex items-center gap-2">
              <Radio selected={selected} />
              <span className={`font-hp text-[13px]/4.5 ${selected ? "font-medium text-hp-ink" : "text-hp-muted"}`}>{label}</span>
            </span>
          ))}
        </span>
        <span className="flex items-center justify-between border-t border-hp-line-soft pt-2">
          <span className="font-hp-mono text-xs/4 text-hp-muted line-through">Suggested $18.40</span>
          <span className="font-hp-mono text-xs/4 font-medium text-hp-accent">Your bid $11.20</span>
        </span>
      </MockCard>
    </LeakSlot>
  );
}

function InsightTag() {
  return (
    <LeakSlot>
      <div className="rv flex w-70 flex-col overflow-hidden rounded-xl bg-hp-ink shadow-[0_8px_24px_rgba(14,15,17,0.14)]">
        <div className="flex flex-col gap-0.75 px-3.5 py-3 font-hp-mono text-xs/4.25">
          <span className="text-[#8f96a3]">&lt;!-- LinkedIn Insight Tag --&gt;</span>
          <span className="text-white">window.lintrk(&apos;track&apos;, {"{"}</span>
          <span className="pl-3.5 text-[#c7d6fc]">conversion_id: &apos;demo_booked&apos;</span>
          <span className="text-white">{"});"}</span>
        </div>
        <div className="flex items-center justify-between bg-[#1a1c20] px-3.5 py-2.25">
          <span className="flex items-center gap-1.5 font-hp text-xs/4 text-white">
            <span className="size-1.5 rounded-full bg-[#4ade80]" />
            Tag active
          </span>
          <span className="font-hp text-xs/4 text-[#c3c7cf]">+ CRM stages via CAPI</span>
        </div>
      </div>
    </LeakSlot>
  );
}

const audit = (
  <AuditCard
    title="Audience review"
    meta="Last 30 days"
    rows={[
      ["Directors, software", "Converting"],
      ["Audience Network", "Off"],
      ["Entry-level titles", <GreyChip key="chip">Excluded</GreyChip>],
    ]}
    totalLabel="Segments excluded"
    total="4"
  />
);

function FeedAd({ className = "", compact }) {
  return (
    <div className={`flex flex-col overflow-hidden bg-white ${className}`}>
      <div className="flex items-center gap-2.5 px-3.5 pt-3.5">
        <span className="size-8 shrink-0 rounded-md bg-hp-accent" />
        <span className="flex flex-1 flex-col">
          <span className="font-hp text-sm/4.5 font-semibold text-hp-ink">YourSaaS</span>
          <span className="font-hp text-xs/4 text-hp-fine">Promoted</span>
        </span>
        <span className="font-hp text-base/4 text-hp-fine">···</span>
      </div>
      <p className="px-3.5 pt-2.5 pb-3 font-hp text-[13px]/4.75 text-hp-ink">
        RevOps leaders: see how 300 SaaS teams forecast pipeline. The 2026 benchmark report, free.
      </p>
      <div className={`flex items-center justify-center bg-linear-to-b from-[#e3e9fd] to-[#eef1fd] ${compact ? "h-34" : "h-42.5"}`}>
        <span className="flex w-50 flex-col gap-2 rounded-lg bg-white p-3.5 shadow-[0_4px_14px_rgba(21,94,239,0.12)]">
          <span className="font-hp text-xs/4 font-semibold text-hp-ink">Pipeline benchmarks</span>
          <span className="flex h-10 items-end gap-1.5">
            {[40, 62, 50, 84, 100].map((height, index) => (
              <span key={index} className="w-full rounded-xs bg-hp-accent" style={{ height: `${height}%`, opacity: 0.4 + index * 0.15 }} />
            ))}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between bg-[#f4f5f7] px-3.5 py-2.5">
        <span className="flex flex-col">
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Get the report</span>
          <span className="font-hp text-xs/4 text-hp-fine">yoursaas.com</span>
        </span>
        <span className="rounded-full px-3 py-1 font-hp text-[13px]/4.5 font-semibold text-hp-accent shadow-[inset_0_0_0_1px_#155eef]">
          Download
        </span>
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
            ["Target accounts", "live"],
            ["Thought leader ads", "live"],
            ["Retargeting", "live"],
            ["Lead Gen Forms", "If the CRM is ready"],
            ["Scale budget", "Once pipeline shows"],
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
          ["Target accounts", "#155EEF", 52],
          ["Thought leader ads", "#6E95F5", 30],
          ["Retargeting (capped)", "#C7D6FC", 18],
        ]}
      />
    </>
  );
}

export const linkedinVisuals = {
  icon: <LinkedInIcon className="w-5 sm:w-6.5 lg:w-7.5" />,
  syncIcon: <LinkedInIcon className="size-3.25" />,
  syncLabel: "LinkedIn Ads",
  mrrLabel: "New MRR from LinkedIn Ads",
  leaks: [ExpansionOff, TargetingStack, LeadQuality, Bidding, InsightTag],
  audit,
  Build,
  Campaigns,
};
