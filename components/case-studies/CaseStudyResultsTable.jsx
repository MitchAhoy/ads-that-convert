export default function CaseStudyResultsTable({ table }) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
    return null;
  }

  return (
    <section className="py-5 sm:py-6" aria-labelledby="results-table-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[760px]">
          <h2 id="results-table-title" className="text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#011428] sm:text-[2.25rem]">
            Results
          </h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <table className="min-w-full border-collapse text-left text-base leading-[1.6] text-zinc-700">
              <caption className="sr-only">{table.caption || "Case study results table"}</caption>
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-200/70 text-sm text-zinc-800">
                  {table.columns.map((column) => (
                    <th key={column} scope="col" className="px-4 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="border-b border-zinc-200/80 last:border-b-0">
                    {row.map((value, cellIndex) => (
                      <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
