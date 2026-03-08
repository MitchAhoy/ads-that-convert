const reassurancePoints = [
  "Calendar invite sent and call details confirmed.",
  "A focused 15-minute discovery call agenda.",
  "Actionable recommendations based on your current setup.",
];

export default function CallConfirmationHeroDetails() {
  return (
    <section className="py-5 sm:py-6" aria-labelledby="confirmation-next-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[920px] rounded-3xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6 lg:p-7">
          <h2
            id="confirmation-next-title"
            className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
          >
            Here is what happens next
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {reassurancePoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4"
              >
                <p className="text-base leading-[1.6] text-zinc-800">{point}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-base text-zinc-700">
            Need to share anything before the call? Email{" "}
            <a className="underline decoration-zinc-400 underline-offset-4 hover:text-zinc-950" href="mailto:mitch@adsthatconvert.co">
              mitch@adsthatconvert.co
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
