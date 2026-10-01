import Link from "next/link";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";

// Mockups for /services/google-ads (DESIGN.md §7.5–7.6). The step minis are
// decorative (rendered in aria-hidden wells); the hero is a labelled figure.

const miniCard =
  "h-full rounded-[14px] bg-white leading-[1.4] shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]";

const highlightGradient = "linear-gradient(90deg, var(--pastel-lavender) 0%, var(--pastel-blush) 100%)";

function LiveDot({ children }) {
  return (
    <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
      {children}
    </span>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────

// Real numbers from the "$2,219 new MRR in 30 days" client account
// (/results/ai-b2b-saas-case-study), rebuilt as Google Ads UI so it stays
// legible at hero size. Zero rows are kept: real accounts have them.
const campaigns = [
  { name: "Search | Generic", cost: "$5,100.96", mrr: "$1,306.00", payback: "3.91" },
  { name: "Search | Brand", cost: "$803.92", mrr: "$663.55", payback: "1.21" },
  { name: "Search | Competitor", cost: "$164.16", mrr: "$201.30", payback: "0.82" },
  { name: "Search | Use Cases", cost: "$34.10", mrr: "$0.00", payback: "0.00" },
  { name: "Search | Features", cost: "$193.11", mrr: "$0.00", payback: "0.00" },
];

const tableColumns = "grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_3.25rem] items-center gap-x-2";

// Traced from the account's sign-up (red) and purchase (blue) lines, same period.
const signUps = "0,48 12,49 24,48 36,43 48,35 60,40 72,39 84,42 96,52 108,42 120,40 132,33 144,36 156,36 168,37 180,36 192,44 204,32 216,40 228,28 240,26 252,33 264,35 276,44 288,28 300,22 312,29 324,30 336,34 348,40";
const purchases = "0,58 12,58 24,58 36,58 48,58 60,25 72,46 84,58 96,58 108,46 120,46 132,40 144,46 156,46 168,38 180,58 192,50 204,40 216,40 228,58 240,46 252,33 264,33 276,46 288,38 300,16 312,26 324,40 336,33 348,44";

export function GoogleAdsHeroVisual() {
  return (
    <figure className="w-full">
      <div
        role="img"
        aria-label="Google Ads campaigns for a B2B AI SaaS client over 30 days: $6,296 spent, $2,219 in new MRR, 2.84-month payback"
        className="overflow-hidden rounded-xl border border-border bg-white leading-[1.4] shadow-[0_4px_8px_rgba(26,26,24,0.04),0_20px_40px_rgba(26,26,24,0.08)]"
      >
        <div className="relative flex h-8.5 items-center justify-center border-b border-border bg-surface">
          <span className="absolute left-3.5 flex gap-1.75">
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <GoogleAdsIcon className="h-3 w-3.5" />
            Google Ads · Campaigns
          </span>
        </div>

        <div className="px-4 pt-3.5">
          <span className="text-[0.9375rem] text-[#202124]">Campaigns</span>
        </div>

        <div className="px-4 pt-3">
          <div className="flex gap-3 text-xs text-[#5f6368]">
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-2.5 bg-[#1a73e8]" />
              Purchase
            </span>
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-2.5 bg-[#d93025]" />
              Sign Up
            </span>
          </div>
          <svg viewBox="0 0 348 62" preserveAspectRatio="none" className="mt-1.5 block h-14 w-full">
            <line x1="0" y1="60" x2="348" y2="60" stroke="#dadce0" strokeWidth="1" />
            <polyline points={signUps} fill="none" stroke="#d93025" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            <polyline points={purchases} fill="none" stroke="#1a73e8" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div className="mt-3 border-t border-[#dadce0] text-xs">
          <div className={`${tableColumns} border-b border-[#dadce0] px-4 py-2 font-medium text-[#3c4043]`}>
            <span>Campaign</span>
            <span className="text-right">Cost</span>
            <span className="text-right">New MRR</span>
            <span className="text-right">Payback</span>
          </div>
          {campaigns.map((row) => (
            <div key={row.name} className={`${tableColumns} border-b border-[#f1f3f4] px-4 py-2 text-[#3c4043]`}>
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#1e8e3e]" />
                <span className="truncate text-[#1a73e8]">{row.name}</span>
              </span>
              <span className="text-right tabular-nums">{row.cost}</span>
              <span className="text-right tabular-nums">{row.mrr}</span>
              <span className="text-right tabular-nums">{row.payback}</span>
            </div>
          ))}
          <div className={`${tableColumns} bg-[#f8f9fa] px-4 py-2 font-medium text-[#202124]`}>
            <span>Total: Account</span>
            <span className="text-right tabular-nums">$6,296.25</span>
            <span className="text-right tabular-nums">$2,219.15</span>
            <span className="text-right tabular-nums">2.84</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3.5 text-sm text-fine">
        A client&apos;s first 30 days.{" "}
        <Link href="/results/ai-b2b-saas-case-study" className="font-semibold text-ink underline decoration-ink underline-offset-2">
          Read the case study
        </Link>
      </figcaption>
    </figure>
  );
}

// ─── Step 01: Audit ──────────────────────────────────────────────────────

const findings = [
  { label: "Junk search terms", value: "$2,480" },
  { label: "Display placements", value: "$610" },
  { label: "Duplicate sign-ups", value: "Tracking" },
];

function AuditMini() {
  return (
    <div className={`${miniCard} flex flex-col px-3 pt-3.5 pb-3`}>
      <span className="text-[0.8125rem] font-bold text-ink">Audit findings</span>
      {findings.map((finding, index) => (
        <div
          key={finding.label}
          className={`flex items-center justify-between gap-2 py-1.5 ${index > 0 ? "border-t border-surface" : "mt-1"}`}
        >
          <span className="truncate text-xs text-body">{finding.label}</span>
          <span className="shrink-0 text-xs font-semibold text-ink tabular-nums">{finding.value}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-surface pt-2">
        <span className="text-xs text-muted">Wasted each month</span>
        <span
          className="grain relative rounded-md px-2 py-0.5 text-xs font-bold text-ink"
          style={{ background: highlightGradient }}
        >
          <span className="relative z-10">$3,090</span>
        </span>
      </div>
    </div>
  );
}

// ─── Step 02: Tracking ───────────────────────────────────────────────────

const uploads = [
  { event: "trial_started", value: "", source: "App" },
  { event: "demo_booked", value: "", source: "CRM" },
  { event: "closed_won", value: "$4,800", source: "CRM" },
  { event: "purchase", value: "$99", source: "Stripe" },
];

function ConversionUploadMini() {
  return (
    <div className={`${miniCard} px-3 pt-3.5 pb-1.5`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[0.8125rem] font-bold whitespace-nowrap text-ink">Conversion uploads</span>
        <LiveDot>Synced</LiveDot>
      </div>
      {uploads.map((upload, index) => (
        <div
          key={upload.event}
          className={`flex items-center gap-2 py-1.5 ${index > 0 ? "border-t border-surface" : ""}`}
        >
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink">{upload.event}</span>
          {upload.value ? <span className="text-xs font-semibold text-ink tabular-nums">{upload.value}</span> : null}
          <span className="w-10 text-right text-xs text-muted">{upload.source}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Step 03: Build ──────────────────────────────────────────────────────

const structure = [
  { name: "Brand", status: "Live" },
  { name: "Competitors", status: "Live" },
  { name: "Non-brand, high intent", status: "Live" },
  { name: "Performance Max", status: "Week 8" },
];

function CampaignStructureMini() {
  return (
    <div className={`${miniCard} px-3 pt-3.5 pb-2`}>
      <span className="text-[0.8125rem] font-bold text-ink">Account structure</span>
      <div className="mt-2 border-l border-border pl-3">
        {structure.map((campaign) => {
          const isLive = campaign.status === "Live";
          return (
            <div key={campaign.name} className="relative flex items-center justify-between gap-2 py-1.5">
              <span className="absolute top-1/2 -left-3 h-px w-2 bg-border" />
              <span className={`truncate text-xs ${isLive ? "text-ink" : "text-muted"}`}>{campaign.name}</span>
              {isLive ? (
                <LiveDot>Live</LiveDot>
              ) : (
                <span className="shrink-0 rounded-full bg-page px-2 py-0.5 text-xs text-muted">{campaign.status}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 04: Optimise ───────────────────────────────────────────────────

const payback = [
  { name: "Brand", months: 0.5 },
  { name: "Competitors", months: 2.1 },
  { name: "Non-brand", months: 2.8, highlight: true },
  { name: "PMax", months: 4.9 },
];

function PaybackMini() {
  const max = 6;
  return (
    <div className={`${miniCard} flex flex-col px-3 pt-3.5 pb-3`}>
      <span className="text-[0.8125rem] font-bold text-ink">Payback in months</span>
      <div className="mt-2.5 flex flex-1 flex-col justify-between gap-1.5">
        {payback.map((row) => (
          <div key={row.name} className="grid grid-cols-[4.75rem_minmax(0,1fr)_1.75rem] items-center gap-2">
            <span className="truncate text-xs text-body">{row.name}</span>
            <span className="h-2.5 overflow-hidden rounded-[3px] bg-page">
              <span
                className={`block h-full rounded-[3px] ${row.highlight ? "grain relative" : "bg-[#e4e2dd]"}`}
                style={{
                  width: `${(row.months / max) * 100}%`,
                  background: row.highlight ? highlightGradient : undefined,
                }}
              />
            </span>
            <span className="text-right text-xs text-ink tabular-nums">{row.months}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const googleAdsStepVisuals = [AuditMini, ConversionUploadMini, CampaignStructureMini, PaybackMini];
