const fitPoints = [
  {
    title: "Sell SaaS, self-serve or sales-led",
    description: "Trials, freemium or demo requests. I've run all three and set up tracking for each.",
  },
  {
    title: "Make at least $20k MRR",
    description:
      "This shows product-market fit, and gives enough data to judge whether paid search makes sense.",
  },
  {
    title: "Keep customers long enough to pay back",
    description: "If a customer churns before month three, ads will struggle to be profitable.",
  },
];

const miniCard =
  "rounded-[14px] bg-white leading-[1.4] shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]";

// Illustration-only accents (see AGENTS.md: never used for UI chrome).
const endpointGradient = "linear-gradient(160deg, var(--pastel-blush) 0%, var(--pastel-lavender) 55%, var(--pastel-periwinkle) 100%)";

function StatusDot({ children }) {
  return (
    <span className="flex shrink-0 items-center gap-1 text-xs text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
      {children}
    </span>
  );
}

function CardHeader({ label, status }) {
  return (
    <div className="flex items-center justify-between gap-1.5">
      <span className="truncate text-xs text-[#55524e]">{label}</span>
      <StatusDot>{status}</StatusDot>
    </div>
  );
}

function PathStep({ label, stages }) {
  return (
    <div>
      <p className="text-xs font-bold text-ink">{label}</p>
      <div className="mt-1.5 flex items-center">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          return (
            <div key={stage} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
              {isLast ? (
                <span
                  className="grain flex h-4.5 w-4.5 items-center justify-center rounded-full"
                  style={{ background: endpointGradient }}
                >
                  <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              ) : (
                <span className="h-4.5 w-4.5 shrink-0 rounded-full bg-white shadow-[0_0_0_1px_rgba(26,26,24,0.06),0_1px_3px_rgba(26,26,24,0.1)]" />
              )}
              {isLast ? null : <span className="mx-2 h-px flex-1 bg-border" />}
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-xs text-ink">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  );
}

function ConversionPathMini() {
  return (
    <div className={`${miniCard} px-3.5 pt-3 pb-3.5`}>
      <CardHeader label="Conversion path" status="Tracked" />
      <div className="mt-2">
        <PathStep label="Self-serve" stages={["Sign-up", "Trial", "Paid"]} />
      </div>
      <div className="mt-2.5 border-t border-surface pt-2.5">
        <PathStep label="Sales-led" stages={["Demo", "Opportunity", "Closed"]} />
      </div>
    </div>
  );
}

const mrrBars = [22, 29, 35, 41, 50];

function RevenueMini() {
  return (
    <div className={`${miniCard} px-3 pt-3 pb-3.5`}>
      <CardHeader label="Monthly recurring revenue" status="Above $20k" />
      <p className="mt-1 text-[1.375rem] leading-[1.3] font-medium tracking-[-0.02em] text-ink">$21.4k</p>

      <div className="relative mt-4 flex h-16 items-end gap-1.5">
        <span className="absolute bottom-12 left-0 text-xs leading-none text-muted" style={{ transform: "translateY(-6px)" }}>
          $20k
        </span>
        <span className="absolute inset-x-0 bottom-12 border-t border-dashed border-[#b8b4ae]" />
        {mrrBars.map((height) => (
          <span key={height} className="flex-1 rounded-[3px] bg-[#e4e2dd]" style={{ height }} />
        ))}
        <span
          className="grain relative flex-1 rounded-[3px]"
          style={{ height: 63, background: "linear-gradient(180deg, var(--pastel-ice) 0%, var(--pastel-periwinkle) 100%)" }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>Apr</span>
        <span>Sep</span>
      </div>
    </div>
  );
}

function LifetimeMini() {
  return (
    <div className={`${miniCard} px-3.5 pt-3 pb-3`}>
      <CardHeader label="Average customer lifetime" status="Pays back" />
      <p className="mt-1 text-[1.375rem] leading-[1.3] font-medium tracking-[-0.02em] text-ink">14 months</p>

      <div className="mt-3 flex h-6.5 overflow-hidden rounded-md">
        <span className="flex w-1/4 items-center bg-[#e8e6e1] px-2 text-xs text-body">CAC</span>
        <span
          className="grain relative flex flex-1 items-center px-2 text-xs text-body"
          style={{ background: "linear-gradient(90deg, var(--pastel-mint) 0%, var(--pastel-ice) 100%)" }}
        >
          <span className="relative z-10">Profit</span>
        </span>
      </div>
      <div className="relative mt-2 flex justify-between text-xs text-muted">
        <span>M1</span>
        <span className="absolute left-[calc(25%-0.75rem)] font-bold text-ink">M3</span>
        <span>M14</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-surface pt-3">
        <span className="text-xs text-[#55524e]">Month-6 retention</span>
        <span className="text-sm font-semibold text-ink">86%</span>
      </div>
    </div>
  );
}

const illustrations = [ConversionPathMini, RevenueMini, LifetimeMini];

export default function WhoIsThisFor() {
  return (
    <section aria-labelledby="who-is-this-for-title" className="py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px]">
          <h2 id="who-is-this-for-title" className="font-display text-h2 text-ink">
            Who this works for
          </h2>
          <p className="mt-4 text-lg leading-[1.5] text-body text-pretty">
            Google Ads amplifies a product that already sells. It can&apos;t create a market for one that doesn&apos;t.
            It works if you:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5.5 sm:mt-14 md:grid-cols-3">
          {fitPoints.map((point, index) => {
            const Illustration = illustrations[index];
            return (
              <article
                key={point.title}
                className="overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]"
              >
                <div
                  className="flex h-55 flex-col justify-center rounded-[18px] bg-surface p-5"
                  aria-hidden="true"
                >
                  <Illustration />
                </div>
                <div className="px-4 pt-5.5 pb-6.5">
                  <h3 className="mb-2 text-xl font-bold text-ink">
                    {point.title}
                  </h3>
                  <p className="text-copy leading-[1.5] text-body">{point.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-lg leading-[1.5] text-body">
          Pre-revenue, or hoping ads will find product-market fit for you? I&apos;m probably not the right hire yet.
        </p>
      </div>
    </section>
  );
}
