const stats = [
  {
    label: "Client satisfaction",
    value: "5.0/5",
    description: "Average review sentiment across published client testimonials.",
  },
  {
    label: "Paid media experience",
    value: "8+ years",
    description: "Hands-on Google Ads strategy and management for growth-focused teams.",
  },
  {
    label: "Ad spend managed",
    value: "$10M+",
    description: "Campaign budget deployed with a direct focus on qualified pipeline.",
  },
  {
    label: "High-intent operators",
    value: "85+ verticals",
    description: "Breadth of category data to find signal faster and reduce wasted spend.",
  },
];

export default function CallProofStatsStrip() {
  return (
    <section className="py-5 sm:py-6" aria-labelledby="proof-strip-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] rounded-3xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
          <h2
            id="proof-strip-title"
            className="text-center text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
          >
            You are in experienced hands
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, description }) => (
              <li key={label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-base uppercase tracking-[0.03em] text-zinc-500">{label}</p>
                <p className="mt-1 text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950">
                  {value}
                </p>
                <p className="mt-2 text-base leading-[1.6] text-zinc-700">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
