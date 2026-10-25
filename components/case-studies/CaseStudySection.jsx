// Older MDX files use all-caps section titles ("THE BACKGROUND"); headings are
// sentence case, so normalise them for display.
export function toSentenceCase(title) {
  if (typeof title !== "string" || title !== title.toUpperCase()) return title;
  const lower = title.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function sectionId(title) {
  return `section-${String(toSentenceCase(title))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

// One section of a case study body (DESIGN.md §16.11): a mono number (from the
// `case-section` counter on the body) and a sans H2, then the MDX copy styled
// by `.hp-prose` (home.css).
export default function CaseStudySection({ title, children }) {
  return (
    <section id={sectionId(title)} className="scroll-mt-20 [counter-increment:case-section]">
      <h2 className="flex items-baseline gap-3.5 before:font-hp-mono before:text-xs/4 before:font-normal before:tracking-normal before:text-hp-accent before:content-[counter(case-section,decimal-leading-zero)]">
        <span className="font-hp text-2xl/7.5 font-medium tracking-[-0.025em] text-hp-ink lg:text-[28px]/8.5">
          {toSentenceCase(title)}
        </span>
      </h2>
      <div className="hp-prose pt-4">{children}</div>
    </section>
  );
}
