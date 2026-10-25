import Reveal from "@/components/home/Reveal";
import OpenAIIcon from "@/components/ui/OpenAIIcon";
import {
  AuditCard,
  CardTitle,
  Check,
  GreyChip,
  LeakSlot,
  MockCard,
  StructureCard,
} from "@/components/services/illustrations/shared";

// ChatGPT ads mockups for /services/chatgpt-ads. Order of `leaks` matches
// leaks.items in lib/services.js.

function OptimiseFor() {
  const options = [
    ["Clicks", "text-hp-muted line-through"],
    ["Trials", "text-hp-soft"],
  ];
  const events = ["trial_started", "subscription_paid"];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.5 px-3.5 py-3">
        <span className="font-hp text-xs/4 text-hp-fine">Judge this campaign on</span>
        <div className="flex gap-0.5 rounded-lg bg-hp-tray p-0.75">
          {options.map(([label, tone]) => (
            <span key={label} className={`flex-1 py-1.25 text-center font-hp text-xs/4 ${tone}`}>
              {label}
            </span>
          ))}
          <span className="flex-1 rounded-md bg-white py-1.25 text-center font-hp text-xs/4 font-semibold text-hp-ink shadow-[0_1px_3px_rgba(14,15,17,0.1)]">
            Paid
          </span>
        </div>
        <div className="flex flex-col gap-1.25">
          {events.map((event, index) => (
            <div key={event} className="flex items-center justify-between">
              <span className={`font-hp-mono text-xs/4 ${index === 1 ? "text-hp-ink" : "text-hp-body"}`}>{event}</span>
              <span className="flex items-center gap-1.25 font-hp text-xs/4 text-hp-up">
                <span className="size-1.5 rounded-full bg-hp-up" />
                pixel + API
              </span>
            </div>
          ))}
        </div>
      </MockCard>
    </LeakSlot>
  );
}

function ContextHint() {
  return (
    <LeakSlot>
      <div className="flex w-71.5 flex-col gap-2.5">
        <div className="rv-fade flex gap-1.5">
          {["crm software", "best crm", "crm tool"].map((keyword) => (
            <span key={keyword} className="rounded-md bg-hp-tray px-1.75 py-0.75 font-hp-mono text-xs/4 text-hp-muted line-through">
              {keyword}
            </span>
          ))}
        </div>
        <div className="rv flex flex-col gap-2 rounded-xl bg-white px-3.5 py-3 shadow-[0_0_0_1.5px_#155eef,0_8px_24px_rgba(14,15,17,0.06)]" style={{ "--rv-i": 2 }}>
          <span className="flex items-center gap-1.75">
            <OpenAIIcon className="size-4" />
            <span className="font-hp text-xs/4 text-hp-fine">Context hint</span>
          </span>
          <span className="font-hp text-[13px]/4.75 text-hp-ink">Agency owner asking how to stop losing leads in a shared spreadsheet</span>
        </div>
      </div>
    </LeakSlot>
  );
}

function SponsoredCard({ body, tag, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-xl bg-white px-3.5 py-3 shadow-[0_0_0_1px_#e4e6ea] ${className}`}>
      <span className="flex items-center justify-between gap-2">
        <span className="font-hp text-xs/4 text-hp-fine">Sponsored</span>
        {tag ? <span className="rounded-md bg-hp-accent px-2 py-0.5 font-hp text-xs/4 font-medium text-white">{tag}</span> : null}
      </span>
      <span className="flex items-center gap-2">
        <span className="size-5 rounded-[5px] bg-hp-accent" />
        <span className="font-hp text-sm/5 font-semibold text-hp-ink">YourSaaS</span>
      </span>
      <span className="font-hp text-[13px]/4.75 text-hp-body">{body}</span>
    </div>
  );
}

function UserBubble({ children, className = "" }) {
  return (
    <span className={`self-end rounded-2xl bg-hp-tray px-3 py-1.5 font-hp text-[13px]/4.75 text-hp-ink ${className}`}>{children}</span>
  );
}

function AnswerLines({ widths }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e4e6ea]">
        <OpenAIIcon className="size-3" />
      </span>
      <span className="flex flex-1 flex-col gap-1.75 pt-1">
        {widths.map((width, index) => (
          <span key={index} className="h-1.5 rounded-full bg-hp-line" style={{ width }} />
        ))}
      </span>
    </div>
  );
}

function ChatSponsored() {
  return (
    <LeakSlot>
      <div className="flex w-71.5 flex-col gap-2">
        <UserBubble className="rv-fade text-xs/4">Best CRM for a 10-person agency?</UserBubble>
        <div className="rv-fade flex flex-col gap-1.25 px-0.5" style={{ "--rv-i": 1 }}>
          <span className="h-1.5 w-[88%] rounded-full bg-hp-line" />
          <span className="h-1.5 w-[74%] rounded-full bg-hp-line" />
        </div>
        <div className="rv flex flex-col gap-0.75 rounded-xl bg-white px-3 py-2.5 shadow-[0_0_0_1px_#e4e6ea,0_8px_24px_rgba(14,15,17,0.06)]" style={{ "--rv-i": 2 }}>
          <span className="font-hp text-xs/4 text-hp-fine">Sponsored · yoursaas.com</span>
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Built for 10-person agencies</span>
          <span className="font-hp text-xs/4 text-hp-body">Move your leads out of the spreadsheet in an afternoon.</span>
        </div>
      </div>
    </LeakSlot>
  );
}

function BrandedLift() {
  const before = [30, 26, 32, 28, 31];
  const after = [
    [38, "#C7D6FC"],
    [47, "#8FB0F8"],
    [55, "#5B8DF4"],
    [64, "#155EEF"],
    [72, "#155EEF"],
    [80, "#155EEF"],
  ];
  return (
    <LeakSlot>
      <div className="flex w-70 flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Branded searches</span>
          <span className="font-hp-mono text-xs/4 text-hp-fine">WEEKLY</span>
        </div>
        <div className="flex h-22 items-end gap-1.25">
          {before.map((height, index) => (
            <span key={`b${index}`} className="rv-bar w-4 rounded-t-[3px] rounded-b-[1px] bg-[#dadde2]" style={{ height, "--rv-i": index, "--rv-step": "40ms" }} />
          ))}
          <span className="h-22 w-0.5 bg-hp-ink" />
          {after.map(([height, color], index) => (
            <span
              key={`a${index}`}
              className="rv-bar w-4 rounded-t-[3px] rounded-b-[1px]"
              style={{ height, backgroundColor: color, "--rv-i": index + 6, "--rv-step": "40ms" }}
            />
          ))}
        </div>
        <span className="flex items-center gap-1.5 pl-25.5">
          <OpenAIIcon className="size-3.25" />
          <span className="font-hp text-xs/4 font-medium text-hp-ink">ChatGPT ads live</span>
        </span>
      </div>
    </LeakSlot>
  );
}

function FunnelCheck() {
  const steps = [
    ["Visit", "w-42.5 bg-[#c7d6fc]", "text-hp-body"],
    ["Trial", "w-24 bg-[#8fb0f8]", "text-hp-body"],
    ["Paid", "w-11.5 bg-hp-accent", "font-medium text-hp-ink"],
  ];
  return (
    <LeakSlot>
      <MockCard className="w-70 gap-2.25 px-3.5 py-3">
        <CardTitle title="Funnel check" meta="From search" />
        {steps.map(([label, bar, tone], index) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className={`w-11 shrink-0 font-hp text-xs/4 ${tone}`}>{label}</span>
            <span className={`rv-fade h-2.5 rounded-[3px] ${bar}`} style={{ "--rv-i": index + 1 }} />
            <Check color="#15803D" className="size-3.5" />
          </div>
        ))}
        <span className="border-t border-hp-line-soft pt-2 font-hp text-xs/4 font-medium text-hp-ink">Ready for ChatGPT traffic</span>
      </MockCard>
    </LeakSlot>
  );
}

const audit = (
  <AuditCard
    title="Launch checklist"
    meta="Before spend"
    rows={[
      ["Pixel installed", "Done"],
      ["Conversions API", "Done"],
      ["Context hints written", <GreyChip key="chip">In review</GreyChip>],
    ]}
    totalLabel="Checks passed"
    total="2 of 3"
  />
);

function ChatWindow({ className = "" }) {
  return (
    <div className={`flex shrink-0 flex-col rounded-t-[18px] bg-hp-tray shadow-[0_0_0_1px_rgba(14,15,17,0.06)] ${className}`}>
      <div className="flex gap-1.5 px-4 py-3">
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
        <span className="size-2 rounded-full bg-[#d5d8dd]" />
      </div>
      <div className="flex h-82.5 shrink-0 flex-col gap-3.5 rounded-t-[14px] bg-white px-4.5 pt-4.5 shadow-[0_0_0_1px_rgba(14,15,17,0.07)]">
        <UserBubble className="max-w-55">Best CRM for a 10-person sales team?</UserBubble>
        <AnswerLines widths={["86%", "78%", "62%"]} />
        <SponsoredCard body="Built for small sales teams. Set up in an afternoon, free for 14 days." />
      </div>
    </div>
  );
}

function Build() {
  return (
    <Reveal aria-hidden="true" className="flex h-62.5 shrink-0 overflow-hidden pt-3.5 lg:h-auto lg:gap-4 lg:overflow-visible lg:pt-3">
      <ChatWindow className="rv w-87.5 lg:w-75" />
      <div className="rv hidden xl:flex" style={{ "--rv-i": 2 }}>
        <StructureCard
          title="Test setup"
          rows={[
            ["Context hints", "live"],
            ["Angle: setup speed", "live"],
            ["Angle: team size", "live"],
            ["Angle: switching", "Testing"],
            ["Scale budget", "Once it pays back"],
          ]}
        />
      </div>
    </Reveal>
  );
}

function Campaigns() {
  const hints = ["Replacing Acme", "Onboarding drop-off", "Product tours for B2B"];
  return (
    <>
      <MockCard className="gap-3.5 p-4">
        <UserBubble className="max-w-65">Which onboarding tool should we use instead of Acme?</UserBubble>
        <AnswerLines widths={["94%", "84%", "70%", "80%"]} />
        <SponsoredCard tag="01 · Conversation-matched" body="Move your onboarding flows over in a day. Free for 14 days." />
      </MockCard>
      <MockCard className="px-4 pt-3.5 pb-4">
        <CardTitle title="Context hints" meta="Buyer scenarios" />
        <div className="flex flex-wrap gap-2 pt-3">
          {hints.map((hint) => (
            <span key={hint} className="rounded-full bg-hp-tray px-2.5 py-1 font-hp text-xs/4 text-hp-ink">
              {hint}
            </span>
          ))}
          <span className="rounded-full px-2.5 py-1 font-hp text-xs/4 text-hp-soft shadow-[0_0_0_1px_#e4e6ea]">+ 9 more</span>
        </div>
      </MockCard>
    </>
  );
}

export const chatgptVisuals = {
  icon: <OpenAIIcon className="w-5.5 sm:w-7 lg:w-8" />,
  syncIcon: <OpenAIIcon className="size-3.5" />,
  syncLabel: "ChatGPT ads",
  mrrLabel: "New MRR from ChatGPT ads",
  leaks: [OptimiseFor, ContextHint, ChatSponsored, BrandedLift, FunnelCheck],
  audit,
  Build,
  Campaigns,
};
