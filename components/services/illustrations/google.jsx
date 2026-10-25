import Reveal from "@/components/home/Reveal";
import { SearchAd } from "@/components/home/HomeProcess";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import {
  AuditCard,
  BudgetCard,
  CardTitle,
  GreyChip,
  LeakSlot,
  MockCard,
  SearchGlyph,
  SerpAd,
  SkeletonLines,
  StructureCard,
} from "@/components/services/illustrations/shared";

// Google Ads mockups for /services/google-ads. Order of `leaks` matches
// leaks.items in lib/services.js.

function ConversionActions() {
  const rows = [
    ["Sign-up", "Secondary", "text-hp-muted"],
    ["Trial started", "Secondary", "text-hp-body"],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 px-3.5 pt-3 pb-1.5">
        <CardTitle title="Conversion actions" meta="Goal" className="pb-2" />
        {rows.map(([label, goal, tone]) => (
          <div key={label} className="flex items-center justify-between border-t border-hp-line-soft py-1.75">
            <span className={`font-hp text-[13px]/4.5 ${tone}`}>{label}</span>
            <GreyChip>{goal}</GreyChip>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-hp-line-soft py-1.75">
          <span className="flex items-center gap-1.5">
            <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">Paid subscription</span>
            <span className="font-hp-mono text-xs/4 text-hp-up">+value</span>
          </span>
          <span className="rounded-full bg-hp-accent px-2 py-0.5 font-hp text-xs/4 font-medium text-white">Primary</span>
        </div>
      </MockCard>
    </LeakSlot>
  );
}

function NegativeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 shrink-0" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </svg>
  );
}

function SearchTerms() {
  const negatives = ["free crm for students", "crm developer jobs"];
  return (
    <LeakSlot>
      <MockCard className="w-70 px-3.5 pt-3 pb-1.5">
        <CardTitle title="Search terms" meta="Broad" className="pb-2" />
        {negatives.map((term) => (
          <div key={term} className="flex items-center justify-between border-t border-hp-line-soft py-1.75">
            <span className="font-hp-mono text-xs/4 text-hp-muted line-through">{term}</span>
            <span className="flex items-center gap-1 font-hp text-xs/4 text-hp-fine">
              <NegativeGlyph />
              Negative
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-hp-line-soft py-1.75">
          <span className="font-hp-mono text-xs/4 text-hp-ink">crm for small agencies</span>
          <span className="flex items-center gap-1.5 font-hp text-xs/4 font-medium text-hp-up">
            <span className="size-1.5 rounded-full bg-hp-up" />
            Paid
          </span>
        </div>
      </MockCard>
    </LeakSlot>
  );
}

function BrandSplit() {
  const rows = [
    ["Blended", "looks fine", "w-32.5 bg-[#dadde2]", "text-hp-fine", "text-hp-fine font-normal"],
    ["Search | Brand", "cheap", "w-10 bg-[#c7d6fc]", "text-hp-ink font-medium", "text-hp-body"],
    ["Search | Generic", "the real cost", "w-64 bg-hp-accent", "text-hp-ink font-medium", "text-hp-accent font-medium"],
  ];
  return (
    <LeakSlot>
      <div className="flex w-70 flex-col gap-2.5">
        <span className="rv-fade font-hp-mono text-xs/4 tracking-[0.04em] text-hp-fine">COST PER TRIAL</span>
        {rows.map(([label, note, bar, labelTone, noteTone], index) => (
          <div key={label} className="flex flex-col gap-1.25">
            <div className="flex items-baseline justify-between">
              <span className={`font-hp text-[13px]/4.5 ${labelTone}`}>{label}</span>
              <span className={`font-hp text-xs/4 ${noteTone}`}>{note}</span>
            </div>
            <span className={`rv-fade h-2 rounded-[3px] ${bar}`} style={{ "--rv-i": index + 1 }} />
          </div>
        ))}
      </div>
    </LeakSlot>
  );
}

function PmaxDonut() {
  // Circumference of r=33 is 207.3. Display 48%, YouTube 31%, Search 21%.
  const arcs = [
    ["#DADDE2", 99.5, 0],
    ["#A0A5AE", 64.3, -99.5],
    ["#155EEF", 43.5, -163.8],
  ];
  const legend = [
    ["#DADDE2", "Display"],
    ["#A0A5AE", "YouTube"],
    ["#155EEF", "Search"],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 flex-row! items-center gap-4.5 px-4 py-3.5">
        <svg viewBox="0 0 84 84" className="size-21 shrink-0">
          <circle cx="42" cy="42" r="33" fill="none" stroke="#EEF0F3" strokeWidth="12" />
          {arcs.map(([color, length, offset]) => (
            <circle
              key={color}
              cx="42"
              cy="42"
              r="33"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={`${length} 207.3`}
              strokeDashoffset={offset}
              transform="rotate(-90 42 42)"
            />
          ))}
        </svg>
        <div className="flex flex-col gap-1.75">
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">PMax spend</span>
          {legend.map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.75 font-hp text-xs/4 text-hp-body">
              <span className="size-2 rounded-xs" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
          <GreyChip className="w-fit">0 audience signals</GreyChip>
        </div>
      </MockCard>
    </LeakSlot>
  );
}

function QueryToPage() {
  const routes = [
    ["acme alternative", "/vs/acme"],
    ["crm for agencies", "/agencies"],
    ["crm pricing", "/pricing"],
  ];
  return (
    <LeakSlot>
      <div className="flex w-71.5 flex-col gap-2.5">
        {routes.map(([query, page], index) => (
          <div key={query} className="rv flex items-center gap-2" style={{ "--rv-i": index }}>
            <span className="flex w-37.5 shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-[0_0_0_1px_#e4e6ea]">
              <SearchGlyph />
              <span className="font-hp text-xs/4 text-hp-ink">{query}</span>
            </span>
            <svg viewBox="0 0 18 10" className="h-2.5 w-4.5 shrink-0" fill="none">
              <path d="M0 5h15M12 1.5 15.5 5 12 8.5" stroke="#A0A5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="rounded-md bg-[#eef3fe] px-2 py-1 font-hp-mono text-xs/4 text-hp-accent">{page}</span>
          </div>
        ))}
        <span className="rv-fade pt-0.5 font-hp-mono text-xs/4 text-hp-muted line-through" style={{ "--rv-i": 4 }}>
          every search → /
        </span>
      </div>
    </LeakSlot>
  );
}

const audit = (
  <AuditCard
    title="Audit findings"
    meta="Last 30 days"
    rows={[
      ["Junk search terms", "$2,480"],
      ["Display placements", "$610"],
      ["Duplicate sign-ups", <GreyChip key="chip">Tracking</GreyChip>],
    ]}
    totalLabel="Wasted each month"
    total="$3,090"
  />
);

function Build() {
  return (
    <Reveal aria-hidden="true" className="flex h-62.5 shrink-0 overflow-hidden pt-3.5 lg:relative lg:h-auto lg:gap-4 lg:overflow-visible lg:pt-3">
      <SearchAd className="rv w-87.5 lg:w-75" />
      <span
        style={{ "--rv-i": 5 }}
        className="rv-pop absolute top-24.5 left-58 hidden items-center gap-1.5 rounded-lg bg-hp-accent px-2.5 py-1.25 font-hp text-sm/4.5 font-medium text-white shadow-[0_6px_16px_rgba(21,94,239,0.3)] xl:flex"
      >
        Position 1
      </span>
      <div className="rv hidden xl:flex" style={{ "--rv-i": 2 }}>
        <StructureCard
          title="Account structure"
          rows={[
            ["Brand", "live"],
            ["Competitors", "live"],
            ["Non-brand, high intent", "live"],
            ["Performance Max", "Week 8"],
            ["Broader terms", "Once data supports"],
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
        <div className="flex items-center gap-2 px-4 py-3">
          <SearchGlyph className="size-3.5" />
          <span className="font-hp text-sm/5 text-hp-ink">acme alternative</span>
        </div>
        <SerpAd
          label="Sponsored"
          url="yoursaas.com/vs/acme"
          headline="Switch from Acme in 5 minutes"
          description="Import your data in one click. Free for 14 days, no card needed."
          tag="01 · Competitor search"
        />
        <SerpAd label="Sponsored" url="acme.com" headline="Acme | Official site" description="The original. Trusted by teams everywhere." faded />
        <SkeletonLines className="border-t border-hp-line-soft px-4 py-4" />
      </MockCard>
      <BudgetCard
        segments={[
          ["Competitor", "#155EEF", 24],
          ["Non-brand", "#6E95F5", 46],
          ["Brand", "#C7D6FC", 9],
          ["PMax", "#DADDE2", 13],
          ["Remarketing", "#EEF0F3", 8],
        ]}
      />
    </>
  );
}

export const googleVisuals = {
  icon: <GoogleAdsIcon className="w-5.5 sm:w-7.5 lg:w-8.5" />,
  syncIcon: <GoogleAdsIcon className="h-3.5 w-3.75" />,
  syncLabel: "Google Ads",
  mrrLabel: "New MRR from Google Ads",
  leaks: [ConversionActions, SearchTerms, BrandSplit, PmaxDonut, QueryToPage],
  audit,
  Build,
  Campaigns,
};
