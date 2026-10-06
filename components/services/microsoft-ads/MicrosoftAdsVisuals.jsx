import { Check } from "lucide-react";
import AppWindow from "@/components/services/AppWindow";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import MicrosoftIcon from "@/components/ui/MicrosoftIcon";

// Hero for /services/microsoft-ads: a replication plan. The Google columns are
// real numbers from the same client account as the Google Ads hero
// (/results/ai-b2b-saas-case-study). The Microsoft column is a decision, not a
// result: there's no written-up Microsoft account yet, so no Microsoft numbers.
const campaigns = [
  { name: "Search | Generic", payback: "3.91", mrr: "$1,306.00", replicate: true },
  { name: "Search | Brand", payback: "1.21", mrr: "$663.55", replicate: true },
  { name: "Search | Competitor", payback: "0.82", mrr: "$201.30", replicate: true },
  { name: "Search | Use Cases", payback: "0.00", mrr: "$0.00", replicate: false },
  { name: "Search | Features", payback: "0.00", mrr: "$0.00", replicate: false },
];

const columns = "grid grid-cols-[minmax(0,1fr)_3.25rem_4.75rem_5.25rem] items-center gap-x-2";

export function MicrosoftAdsHeroVisual() {
  return (
    <AppWindow
      label="Google Ads → Microsoft Advertising"
      icon={<GoogleAdsIcon className="h-3 w-3.5" />}
      ariaLabel="Replication plan: three Google Ads campaigns with a proven payback ($2,170.85 new MRR at 2.9 months) marked to replicate in Microsoft Advertising, and two campaigns with no revenue left behind"
      caption="Real Google Ads numbers from a client account. Only campaigns that pay back get replicated."
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5">
        <span className="text-[0.9375rem] font-semibold text-[#201f1e]">Replication plan</span>
        <span className="text-xs text-muted">Last 30 days in Google</span>
      </div>

      <div className="mt-3 border-t border-[#edebe9] text-xs">
        <div className={`${columns} border-b border-[#edebe9] px-4 pt-2 pb-1 text-[#605e5c]`}>
          <span className="flex items-center gap-1.5">
            <GoogleAdsIcon className="h-2.5 w-3" />
            Proven in Google
          </span>
          <span className="col-span-2" />
          <span className="flex items-center justify-end gap-1.5">
            <MicrosoftIcon className="h-2.5 w-2.5" />
            Microsoft
          </span>
        </div>
        <div className={`${columns} border-b border-[#edebe9] px-4 py-2 font-semibold text-[#605e5c]`}>
          <span>Campaign</span>
          <span className="text-right">Payback</span>
          <span className="text-right">New MRR</span>
          <span className="text-right">Replicate</span>
        </div>

        {campaigns.map((row) => (
          <div
            key={row.name}
            className={`${columns} border-b border-[#f3f2f1] px-4 py-2 ${row.replicate ? "text-[#323130]" : "text-[#a19f9d]"}`}
          >
            <span className={`truncate ${row.replicate ? "text-[#1a73e8]" : ""}`}>{row.name}</span>
            <span className="text-right tabular-nums">{row.payback}</span>
            <span className="text-right tabular-nums">{row.mrr}</span>
            {row.replicate ? (
              <span className="flex items-center justify-end gap-1 font-medium text-[#0078d4]">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
                Replicate
              </span>
            ) : (
              <span className="text-right">Leave out</span>
            )}
          </div>
        ))}

        <div className={`${columns} bg-[#faf9f8] px-4 py-2 font-semibold text-[#201f1e]`}>
          <span>Carried over</span>
          <span className="text-right tabular-nums">2.90</span>
          <span className="text-right tabular-nums">$2,170.85</span>
          <span className="text-right text-[#0078d4]">3 campaigns</span>
        </div>
      </div>

      <div className="px-4 pt-3 pb-3.5 text-xs leading-[1.5] text-[#605e5c]">
        Then scaled for Microsoft: bids from its own conversion data, plus LinkedIn company and job function
        adjustments.
      </div>
    </AppWindow>
  );
}
