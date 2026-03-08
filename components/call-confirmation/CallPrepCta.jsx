import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";

const prepItems = [
  "Your current monthly ad spend (if active)",
  "What a qualified lead looks like for your team",
  "Your revenue targets for the next 90 days",
];

export default function CallPrepCta() {
  return (
    <section className="py-5 sm:py-6" aria-labelledby="prep-cta-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[920px] rounded-3xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6 lg:p-7">
          <h2
            id="prep-cta-title"
            className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
          >
            Want to make the call even more useful?
          </h2>

          <p className="mt-3 max-w-[60ch] text-base sm:text-lg text-zinc-700">
            If you have 2 minutes before we meet, jot down these points so we can get to high-value decisions faster.
          </p>

          <ul className="mt-5 space-y-2">
            {prepItems.map((item) => (
              <li key={item} className="text-base text-zinc-800">{item}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <FilloutPopupTrigger className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-800">
              Reschedule your call
            </FilloutPopupTrigger>

            <a
              href="mailto:mitch@adsthatconvert.co"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              Send context by email
            </a>

            <a
              href="/results"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              See more results
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
