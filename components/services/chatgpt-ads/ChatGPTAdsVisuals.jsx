import AppWindow from "@/components/services/AppWindow";
import OpenAIIcon from "@/components/ui/OpenAIIcon";

// Hero for /services/chatgpt-ads: where the ad sits, in ChatGPT's own UI. No
// performance numbers, since there's no written-up ChatGPT account yet.
export function ChatGPTAdsHeroVisual() {
  return (
    <AppWindow
      label="ChatGPT"
      icon={<OpenAIIcon className="h-3 w-3" />}
      ariaLabel="A ChatGPT conversation about invoicing software, with a sponsored card for a SaaS product shown below the answer"
      caption="Sponsored cards sit below the answer, matched to the conversation."
    >
      <div className="space-y-4 px-5 pt-5 pb-5 text-[0.8125rem] leading-[1.55] text-[#0d0d0d]">
        <p className="ml-auto w-fit max-w-[80%] rounded-[18px] bg-[#f4f4f4] px-3.5 py-2">
          What&apos;s the best invoicing software for a five-person agency?
        </p>
        <div className="space-y-2.5">
          <p>For a small agency, look for three things:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Time tracking that flows straight into invoices</li>
            <li>Recurring billing for retainer clients</li>
            <li>A client portal, so you&apos;re not chasing payments by email</li>
          </ul>
          <p>Most tools here offer a free trial, so test two or three with a real client.</p>
        </div>

        <div className="rounded-2xl border border-[#e5e5e5] px-4 py-3.5">
          <p className="text-xs text-[#8f8f8f]">Sponsored</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ececec] text-xs font-bold text-[#5d5d5d]">
              Y
            </span>
            <span className="text-xs text-[#5d5d5d]">yoursaas.com</span>
          </div>
          <p className="mt-1.5 font-semibold">Invoicing built for small agencies</p>
          <p className="mt-0.5 text-[#5d5d5d]">Track time, bill retainers and get paid faster. Free 14-day trial.</p>
        </div>
      </div>
    </AppWindow>
  );
}
