// Optional `resultsTable` frontmatter, rendered as a Level-2 card (DESIGN.md §6.2)
// inside the case study body grid.
export default function CaseStudyResultsTable({ table }) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
    return null;
  }

  return (
    <section
      aria-labelledby="results-table-title"
      className="grid grid-cols-1 gap-4 [counter-increment:case-section] border-b border-border py-10 sm:py-12 lg:grid-cols-12 lg:gap-x-10"
    >
      <h2
        id="results-table-title"
        className="flex items-baseline gap-3 text-xl font-bold text-ink before:text-sm before:font-medium before:tracking-normal before:text-body before:tabular-nums before:content-[counter(case-section,decimal-leading-zero)] sm:text-2xl lg:col-span-5"
      >
        Results
      </h2>
      <div className="min-w-0 lg:col-span-7">
        <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]">
          <table className="min-w-full border-collapse text-left text-base leading-[1.5] text-body">
            <caption className="sr-only">{table.caption || "Case study results table"}</caption>
            <thead>
              <tr className="border-b border-border bg-surface text-sm text-ink">
                {table.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="border-b border-border last:border-b-0">
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
      </div>
    </section>
  );
}
