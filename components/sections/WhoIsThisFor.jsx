import { RefreshCw } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const fitPoints = [
  {
    title: "A SaaS businesses that need more customers",
    description:
      "If your SaaS company needs qualified users who are ready to become paying subscribers, I can optimize your Google Ads to deliver consistent leads.",
  },
  {
    title: "Turning over of at least $20k/mth in revenue",
    description:
      "I'll use Google Ads to pour fuel on the fire. We need to know you have product market fit to be confident that you have a service that people are going to buy.",
  },
  {
    title: "Have a strong retention rate",
    description:
      "New users are great but we need to know that they will stay long enough to generate profit from their LTV.",
  },
];

function NewCustomersMini() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex h-[68px] overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]">
        <div
          className="grain flex w-16 shrink-0 flex-col items-center justify-center gap-0.5"
          style={{ background: "linear-gradient(170deg, #e895d8 0%, #9b7bf0 55%, #6d6bf5 100%)" }}
        >
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-2.5 w-5.5 rounded-t-full bg-white" style={{ borderRadius: "11px 11px 3px 3px" }} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-3">
          <span className="text-xs text-[#55524e]">New paying customers</span>
          <span className="flex items-center gap-2">
            <span className="text-lg font-medium tracking-[-0.02em] text-ink">142</span>
            <span className="whitespace-nowrap rounded-full bg-[#dcf5e6] px-2 py-0.5 text-[11px] font-medium text-[#15994f]">
              ▲ 28 this month
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-white py-1 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]">
        {["Pro plan", "Team plan", "Pro plan"].map((plan, index) => (
          <div key={index} className={`flex items-center gap-2.5 px-3.5 py-2 ${index > 0 ? "border-t border-surface" : ""}`}>
            <span
              className="grain h-5.5 w-5.5 shrink-0 rounded-full"
              style={{ background: "linear-gradient(170deg, #e895d8 0%, #9b7bf0 55%, #6d6bf5 100%)" }}
            />
            <span className="flex-1 text-xs text-ink">New subscriber</span>
            <span className="text-[11px] text-muted">{plan}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueMini() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#55524e]">Monthly recurring revenue</span>
          <span className="flex items-center gap-2">
            <span className="text-lg font-medium tracking-[-0.02em] text-ink">$21.4k</span>
            <span className="whitespace-nowrap rounded-full bg-[#dcf5e6] px-2 py-0.5 text-[11px] font-medium text-[#15994f]">
              Above $20k
            </span>
          </span>
        </div>
        <span className="shrink-0 rounded-lg border border-border px-2.5 py-1 text-xs text-body">6 mo</span>
      </div>
      <div className="relative flex h-24 items-end gap-1.5">
        <div className="absolute inset-x-0 bottom-[66%] border-t border-dashed border-[#b8b4ae]" />
        <span className="absolute bottom-[calc(66%+3px)] left-0 bg-white pr-1 text-[10px] text-muted">$20k</span>
        <div className="h-[34%] flex-1 rounded bg-border" />
        <div className="h-[42%] flex-1 rounded bg-border" />
        <div className="h-[48%] flex-1 rounded bg-border" />
        <div className="h-[56%] flex-1 rounded bg-border" />
        <div className="h-[66%] flex-1 rounded bg-border" />
        <div
          className="grain h-[84%] flex-1 rounded"
          style={{ background: "linear-gradient(165deg, #9fd0ff 0%, #6fb8ff 40%, #4a7fe2 100%)" }}
        />
      </div>
    </div>
  );
}

function RetentionMini() {
  const rows = [
    [1, 0.88, 0.76, 0.64, 0.52, null],
    [1, 0.88, 0.76, null, null, null],
  ];

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-2.5 rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#55524e]">Month-6 retention</span>
          <span className="flex items-center gap-2">
            <span className="text-lg font-medium tracking-[-0.02em] text-ink">86%</span>
            <span className="whitespace-nowrap rounded-full bg-[#dcf5e6] px-2 py-0.5 text-[11px] font-medium text-[#15994f]">
              Healthy
            </span>
          </span>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-1">
            {row.map((opacity, index) =>
              opacity === null ? (
                <div key={index} className="h-4 rounded bg-surface" />
              ) : (
                <div
                  key={index}
                  className="grain h-4 rounded"
                  style={{
                    background: "linear-gradient(160deg, #34d399 0%, #22c1c3 55%, #1eb0a8 100%)",
                    opacity,
                  }}
                />
              )
            )}
          </div>
        ))}
      </div>
      <div className="flex h-13 overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]">
        <div
          className="grain flex w-13 shrink-0 items-center justify-center"
          style={{ background: "linear-gradient(160deg, #34d399 0%, #22c1c3 55%, #1eb0a8 100%)" }}
        >
          <RefreshCw className="relative h-5.5 w-5.5 text-white" strokeWidth={2.2} />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3">
          <span className="text-xs text-[#55524e]">Customer LTV</span>
          <span className="text-[15px] font-medium text-ink">$4,860</span>
        </div>
      </div>
    </div>
  );
}

const illustrations = [NewCustomersMini, RevenueMini, RetentionMini];

export default function WhoIsThisFor() {
  return (
    <section aria-labelledby="who-is-this-for-title" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px]">
          <h2 id="who-is-this-for-title" className="text-h2 text-ink">
            Who is this for?
          </h2>
          <p className="mt-3.5 text-lg leading-[1.5] text-body">
            My services will turn on a tap of consistent flowing leads but
            it&apos;s not for everyone. We&apos;re likely a fit for each other if
            you&apos;re:
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5.5 md:grid-cols-3">
          {fitPoints.map((point, index) => {
            const Illustration = illustrations[index];
            return (
              <article
                key={point.title}
                className="overflow-hidden rounded-3xl border border-border bg-white pt-2 px-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]"
              >
                <div className="flex h-[250px] flex-col justify-center gap-2.5 rounded-[18px] bg-surface py-5 px-5.5">
                  <Illustration />
                </div>
                <div className="pt-5.5 px-4 pb-6.5">
                  <h3 className="mb-2 text-xl font-bold leading-[1.4] tracking-[-0.03em] text-ink">
                    {point.title}
                  </h3>
                  <p className="text-base leading-[1.5] text-body">{point.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10">
          <ScheduleCallButton url={SCHEDULE_CALL_URL} />
        </div>
      </div>
    </section>
  );
}
