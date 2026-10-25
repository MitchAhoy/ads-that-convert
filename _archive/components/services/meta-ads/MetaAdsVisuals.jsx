import AppWindow from "@/components/services/AppWindow";
import MetaIcon from "@/components/ui/MetaIcon";

// Hero for /services/meta-ads: the tracking setup in Events Manager. No
// performance numbers, since there's no written-up Meta account yet.
const events = [
  { name: "PageView", source: "Pixel + CAPI" },
  { name: "CompleteRegistration", source: "Pixel + CAPI" },
  { name: "StartTrial", source: "CAPI · App" },
  { name: "Subscribe", source: "CAPI · Stripe", value: true },
];

const columns = "grid grid-cols-[minmax(0,1fr)_6.5rem_3.5rem] items-center gap-x-3";

export function MetaAdsHeroVisual() {
  return (
    <AppWindow
      label="Meta Events Manager"
      icon={<MetaIcon className="h-3.5 w-3.5" />}
      ariaLabel="Meta Events Manager showing sign-up, trial and subscription events sent through the Conversions API, with campaigns optimising for Subscribe"
      caption="Paid subscriptions sent server-side, so Meta optimises for customers."
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5">
        <span className="text-[0.9375rem] font-semibold text-[#1c2b33]">Datasets</span>
        <span className="rounded-md bg-[#e7f0ff] px-2 py-0.5 text-xs font-medium text-[#0866ff]">
          Optimising for: Subscribe
        </span>
      </div>

      <div className="mt-3 border-t border-[#e4e6eb] text-xs">
        <div className={`${columns} border-b border-[#e4e6eb] px-4 py-2 font-semibold text-[#606770]`}>
          <span>Event</span>
          <span>Received from</span>
          <span className="text-right">Status</span>
        </div>
        {events.map((event) => (
          <div key={event.name} className={`${columns} border-b border-[#f0f2f5] px-4 py-2.5 text-[#1c2b33]`}>
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate font-medium">{event.name}</span>
              {event.value ? (
                <span className="shrink-0 rounded bg-[#f0f2f5] px-1.5 text-xs text-[#606770]">+ value</span>
              ) : null}
            </span>
            <span className="text-[#606770]">{event.source}</span>
            <span className="flex items-center justify-end gap-1.5 text-[#606770]">
              <span className="h-2 w-2 rounded-full bg-[#31a24c]" />
              Active
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 bg-[#f7f8fa] px-4 py-2.5 text-xs text-[#606770]">
        <span>Deduplicated across browser and server</span>
        <span className="font-medium text-[#1c2b33]">On</span>
      </div>
    </AppWindow>
  );
}
