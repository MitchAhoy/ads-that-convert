// Optional `resultsTable` frontmatter, as a hairline table at the end of the
// case study body.
export default function CaseStudyResultsTable({ table }) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
    return null;
  }

  return (
    <section aria-labelledby="results-table-title" className="[counter-increment:case-section]">
      <h2
        id="results-table-title"
        className="flex items-baseline gap-3.5 before:font-hp-mono before:text-xs/4 before:font-normal before:text-hp-accent before:content-[counter(case-section,decimal-leading-zero)]"
      >
        <span className="font-hp-display text-2xl/7.5 font-medium tracking-[-0.025em] text-hp-ink lg:text-[28px]/8.5">Results</span>
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-hp-line">
        <table className="min-w-full border-collapse text-left font-hp text-base/6 text-hp-text">
          <caption className="sr-only">{table.caption || "Case study results table"}</caption>
          <thead>
            <tr className="border-b border-hp-line bg-hp-band text-sm text-hp-ink">
              {table.columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-hp-line last:border-b-0">
                {row.map((value, cellIndex) => (
                  <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3 tabular-nums">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
