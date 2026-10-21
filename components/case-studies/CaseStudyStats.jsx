// Optional `stats` frontmatter: the headline numbers as one Level-2 card split
// into cells, above the case study body (DESIGN.md §7.12).
export default function CaseStudyStats({ stats }) {
  if (!Array.isArray(stats) || stats.length === 0) {
    return null;
  }

  return (
    <section aria-label="Headline results" className="pt-6 pb-4 sm:pt-8">
      <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col border-border px-5 py-6 sm:px-6 sm:py-7 max-lg:border-b max-lg:odd:border-r lg:border-l lg:first:border-l-0 ${
              index === stats.length - 1 && stats.length % 2 === 1 ? "max-lg:col-span-2 max-lg:border-r-0 max-lg:border-b-0" : ""
            } ${index >= stats.length - 2 && stats.length % 2 === 0 ? "max-lg:border-b-0" : ""}`}
          >
            <dt className="order-1 text-sm font-medium leading-[1.5] text-fine">{stat.label}</dt>
            <dd className="order-2 mt-2 font-display text-4xl text-ink tabular-nums sm:text-5xl">{stat.value}</dd>
            {stat.detail ? (
              <dd className="order-3 mt-2 text-sm leading-[1.5] text-pretty text-fine">{stat.detail}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
