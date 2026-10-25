import Reveal from "@/components/home/Reveal";
import { SearchAd } from "@/components/home/HomeProcess";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import MicrosoftIcon from "@/components/ui/MicrosoftIcon";
import {
  AuditCard,
  CardTitle,
  Check,
  GreyChip,
  LeakSlot,
  MockCard,
  SearchGlyph,
  SerpAd,
  SkeletonLines,
  StructureCard,
} from "@/components/services/illustrations/shared";

// Microsoft Ads mockups for /services/microsoft-ads. Order of `leaks` matches
// leaks.items in lib/services.js. Bing labels search ads "Ad".

function Radio({ selected }) {
  return (
    <span
      className={`size-3.5 shrink-0 rounded-full ${selected ? "shadow-[inset_0_0_0_4.5px_#155eef]" : "shadow-[inset_0_0_0_1.5px_#c3c7cf]"}`}
    />
  );
}

function ImportOnce() {
  const options = [
    ["Once", true],
    ["Daily", false],
    ["Weekly", false],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.25 px-3.5 py-3">
        <span className="flex items-center gap-1.75">
          <GoogleAdsIcon className="h-3.5 w-3.75" />
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Import from Google Ads</span>
        </span>
        <span className="flex flex-col gap-1.5">
          {options.map(([label, selected]) => (
            <span key={label} className="flex items-center gap-2">
              <Radio selected={selected} />
              <span className={`font-hp text-[13px]/4.5 ${selected ? "font-medium text-hp-ink" : "text-hp-muted"}`}>{label}</span>
            </span>
          ))}
        </span>
        <span className="flex items-center justify-between border-t border-hp-line-soft pt-2">
          <span className="font-hp text-xs/4 text-hp-body">Auto-sync changes</span>
          <span className="flex h-4 w-7 items-center rounded-full bg-[#dadde2] p-0.5">
            <span className="size-3 rounded-full bg-white" />
          </span>
        </span>
      </MockCard>
    </LeakSlot>
  );
}

function BidCompare() {
  const rows = [
    [<GoogleAdsIcon key="g" className="h-3.25 w-3.5" />, "w-47.5 bg-[#dadde2]", "$6.40", "text-hp-fine"],
    [<MicrosoftIcon key="m" className="size-3.25" />, "w-29 bg-hp-accent", "$3.90", "text-hp-ink"],
  ];
  return (
    <LeakSlot>
      <div className="flex w-70 flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="font-hp-mono text-xs/4 text-hp-ink">crm for agencies</span>
          <span className="font-hp-mono text-xs/4 text-hp-fine">MAX CPC</span>
        </div>
        {rows.map(([icon, bar, value, tone], index) => (
          <div key={value} className="flex items-center gap-2.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-white shadow-[0_0_0_1px_#e4e6ea]">{icon}</span>
            <span className={`rv-fade h-2.5 rounded-[3px] ${bar}`} style={{ "--rv-i": index }} />
            <span className={`font-hp-mono text-xs/4 ${tone}`}>{value}</span>
          </div>
        ))}
        <span className="font-hp text-xs/4 text-hp-fine">Set from Microsoft&apos;s own conversion data</span>
      </div>
    </LeakSlot>
  );
}

function Publishers() {
  const excluded = ["free-coupons.site", "games-daily.io", "parked-domain.net"];
  return (
    <LeakSlot>
      <MockCard className="w-70 px-3.5 pt-3 pb-1.5">
        <CardTitle title="Website URL (publisher)" className="pb-1.5" />
        <div className="flex items-center justify-between border-t border-hp-line-soft py-1.5">
          <span className="font-hp-mono text-xs/4 text-hp-ink">bing.com</span>
          <span className="flex items-center gap-1.25 font-hp text-xs/4 text-hp-up">
            <span className="size-1.5 rounded-full bg-hp-up" />
            Converting
          </span>
        </div>
        {excluded.map((site) => (
          <div key={site} className="flex items-center justify-between border-t border-hp-line-soft py-1.5">
            <span className="font-hp-mono text-xs/4 text-hp-muted line-through">{site}</span>
            <GreyChip>Excluded</GreyChip>
          </div>
        ))}
      </MockCard>
    </LeakSlot>
  );
}

function ProfileMatch() {
  const matches = ["Engineering", "Software", "51–200 staff"];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.5 px-3.5 py-3">
        <span className="flex items-center gap-2.5">
          <span className="size-8 shrink-0 rounded-full bg-linear-135 from-[#c7d6fc] via-[#dcd3fb] to-[#f7d9e3]" />
          <span className="flex flex-col">
            <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Searcher at work</span>
            <span className="font-hp text-xs/4 text-hp-fine">matched by LinkedIn profile</span>
          </span>
        </span>
        <span className="flex flex-wrap gap-1.5">
          {matches.map((match) => (
            <span key={match} className="flex items-center gap-1.25 rounded-full bg-[#eef3fe] py-0.75 pr-2.25 pl-1.75 font-hp text-xs/4 text-hp-ink">
              <Check className="size-3" strokeWidth={3} />
              {match}
            </span>
          ))}
        </span>
        <span className="flex items-center justify-between border-t border-hp-line-soft pt-2">
          <span className="font-hp text-xs/4 text-hp-body">Bid adjustment</span>
          <span className="font-hp text-[15px]/5 font-semibold tracking-[-0.02em] text-hp-accent">+30%</span>
        </span>
      </MockCard>
    </LeakSlot>
  );
}

function UetTag() {
  return (
    <LeakSlot>
      <div className="rv flex w-70 flex-col overflow-hidden rounded-xl bg-hp-ink shadow-[0_8px_24px_rgba(14,15,17,0.14)]">
        <div className="flex flex-col gap-0.75 px-3.5 py-3 font-hp-mono text-xs/4.25">
          <span className="text-[#8f96a3]">&lt;!-- Microsoft UET --&gt;</span>
          <span className="text-white">window.uetq.push(&apos;event&apos;,</span>
          <span className="pl-3.5 text-[#c7d6fc]">&apos;subscription_paid&apos;,</span>
          <span className="pl-3.5 text-white">{"{ revenue_value: 149 });"}</span>
        </div>
        <div className="flex items-center justify-between bg-[#1a1c20] px-3.5 py-2.25">
          <span className="flex items-center gap-1.5 font-hp text-xs/4 text-white">
            <span className="size-1.5 rounded-full bg-[#4ade80]" />
            Tag active
          </span>
          <span className="font-hp text-xs/4 text-[#c3c7cf]">+ offline uploads daily</span>
        </div>
      </div>
    </LeakSlot>
  );
}

const audit = (
  <AuditCard
    title="Placement review"
    meta="Last 30 days"
    rows={[
      ["Bing search", "Converting"],
      ["Search partners", "Excluded"],
      ["Copilot", <GreyChip key="chip">Reported apart</GreyChip>],
    ]}
    totalLabel="Sources excluded"
    total="3"
  />
);

function Build() {
  return (
    <Reveal aria-hidden="true" className="flex h-62.5 shrink-0 overflow-hidden pt-3.5 lg:relative lg:h-auto lg:gap-4 lg:overflow-visible lg:pt-3">
      <SearchAd className="rv w-87.5 lg:w-75" adLabel="Ad" />
      <span
        style={{ "--rv-i": 5 }}
        className="rv-pop absolute top-24.5 left-58 hidden items-center gap-1.5 rounded-lg bg-hp-accent px-2.5 py-1.25 font-hp text-sm/4.5 font-medium text-white shadow-[0_6px_16px_rgba(21,94,239,0.3)] xl:flex"
      >
        Top ad
      </span>
      <div className="rv hidden xl:flex" style={{ "--rv-i": 2 }}>
        <StructureCard
          title="Imported from Google"
          rows={[
            ["Search | Competitor", "live"],
            ["Search | Generic", "live"],
            ["Search | Brand", "live"],
            ["LinkedIn targeting", "Layered on"],
            ["Performance Max", "Once data exists"],
          ]}
        />
      </div>
    </Reveal>
  );
}

function Campaigns() {
  const adjustments = [
    ["Job function: Engineering", "+30%", "text-hp-up"],
    ["Industry: Software", "+20%", "text-hp-up"],
    ["Company size: 1-10", "-25%", "text-hp-soft"],
  ];
  return (
    <>
      <MockCard className="overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <SearchGlyph className="size-3.5" />
          <span className="font-hp text-sm/5 text-hp-ink">acme alternative</span>
        </div>
        <SerpAd
          label="Ad"
          url="yoursaas.com/vs/acme"
          headline="Switch from Acme in 5 minutes"
          description="Import your data in one click. Free for 14 days, no card needed."
          tag="01 · Search campaigns"
        />
        <SerpAd label="Ad" url="acme.com" headline="Acme | Official site" description="The original. Trusted by teams everywhere." faded />
        <SkeletonLines className="border-t border-hp-line-soft px-4 py-4" />
      </MockCard>
      <MockCard className="px-4 pt-3.5 pb-1.5">
        <CardTitle title="LinkedIn profile targeting" meta="Bid adj." className="pb-2.5" />
        {adjustments.map(([label, value, tone]) => (
          <div key={label} className="flex items-center justify-between border-t border-hp-line-soft py-2">
            <span className="font-hp text-[13px]/4.5 text-hp-body">{label}</span>
            <span className={`font-hp text-[13px]/4.5 font-semibold ${tone}`}>{value}</span>
          </div>
        ))}
      </MockCard>
    </>
  );
}

export const microsoftVisuals = {
  icon: <MicrosoftIcon className="w-5 sm:w-6.5 lg:w-7.5" />,
  syncIcon: <MicrosoftIcon className="size-3.25" />,
  syncLabel: "Microsoft Ads",
  mrrLabel: "New MRR from Microsoft Ads",
  leaks: [ImportOnce, BidCompare, Publishers, ProfileMatch, UetTag],
  audit,
  Build,
  Campaigns,
};
