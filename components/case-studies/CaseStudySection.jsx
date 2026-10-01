// Older MDX files use all-caps section titles ("THE BACKGROUND"); headings are
// sentence case (DESIGN.md §4.3), so normalise them for display.
function toSentenceCase(title) {
  if (typeof title !== "string" || title !== title.toUpperCase()) return title;
  const lower = title.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

// One editorial row of a case study body (DESIGN.md §7.7): the heading sits in
// the left five columns (sticky on desktop), long-form copy in the right seven.
// Rows are numbered 01, 02… via the `case-section` counter reset on the article.
export default function CaseStudySection({ title, children }) {
  return (
    <section className="grid grid-cols-1 gap-4 [counter-increment:case-section] border-b border-border py-10 sm:py-12 lg:grid-cols-12 lg:gap-x-10">
      <h2 className="flex items-baseline gap-3 text-xl font-bold text-ink before:text-sm before:font-medium before:tracking-normal before:text-body before:tabular-nums before:content-[counter(case-section,decimal-leading-zero)] sm:text-2xl lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        {toSentenceCase(title)}
      </h2>
      <div className="case-study-content min-w-0 lg:col-span-7">{children}</div>
    </section>
  );
}
