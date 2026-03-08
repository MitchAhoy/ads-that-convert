const timelineSteps = [
  {
    title: "Pre-call review starts now",
    description: "I review your goals, offer, and current setup before we meet so the call can stay focused.",
  },
  {
    title: "15-minute discovery call",
    description: "We align on your bottlenecks, targets, and whether Google Ads is the right growth channel right now.",
  },
  {
    title: "Clear next-step recommendation",
    description: "You leave with a practical plan and a confident decision on what to do next.",
  },
];

export default function CallNextStepsTimeline() {
  return (
    <section className="py-5 sm:py-6" aria-labelledby="next-steps-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <h2
            id="next-steps-title"
            className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
          >
            What this 15-minute call gives you
          </h2>
          <p className="mt-3 text-base sm:text-[1.125rem] text-zinc-700">
            No vague intro chat. We keep it practical, direct, and focused on growth decisions.
          </p>
        </div>

        <ol className="mx-auto mt-6 grid max-w-[960px] grid-cols-1 gap-4 sm:mt-7 lg:grid-cols-3">
          {timelineSteps.map(({ title, description }, index) => (
            <li
              key={title}
              className="onboarding-card rounded-2xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
              style={{ "--stagger-delay": `${index * 90}ms` }}
            >
              <p className="text-base font-semibold uppercase tracking-[0.03em] text-zinc-500">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold leading-[1.25] text-zinc-950">{title}</h3>
              <p className="mt-3 text-base leading-[1.6] text-zinc-700">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
