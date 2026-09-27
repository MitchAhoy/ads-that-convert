export default function OneThingIllustration() {
  return (
    <div
      className="grain relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px]"
      style={{
        background:
          "radial-gradient(ellipse 50% 60% at 85% 70%, #fdf0dc 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 65% 10%, #f9a8d4 0%, transparent 60%), radial-gradient(ellipse 55% 75% at 10% 80%, #f472c9 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 25% 15%, #93c5fd 0%, transparent 55%), linear-gradient(95deg, #8b9ef0 0%, #b48be3 55%, #e895d8 100%)",
      }}
      role="img"
      aria-label="Dashboard showing revenue by day and sales by acquisition channel"
    >
      <div className="absolute left-6 top-8 z-10 w-[220px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_8px_20px_rgba(26,26,24,0.08)] sm:left-9 sm:w-[300px]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Revenue by day</span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-body">Last 7 days</span>
        </div>
        <p className="mb-3.5 text-xl font-bold tracking-[-0.03em] text-ink">$54,354</p>
        <div className="flex h-[90px] items-end gap-2.5 border-b border-border">
          <div className="h-[38%] flex-1 rounded-t bg-[#c7d2fe]" />
          <div className="h-[62%] flex-1 rounded-t bg-[#a5b4fc]" />
          <div className="h-[92%] flex-1 rounded-t" style={{ background: "linear-gradient(180deg, #f472c9 0%, #6d8ff0 100%)" }} />
          <div className="h-[54%] flex-1 rounded-t bg-[#a5b4fc]" />
        </div>
        <div className="mt-1.5 flex gap-2.5 text-xs text-muted">
          <span className="flex-1 text-center">Mon</span>
          <span className="flex-1 text-center">Tue</span>
          <span className="flex-1 text-center">Wed</span>
          <span className="flex-1 text-center">Thu</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 z-10 w-[240px] rounded-2xl border border-border bg-white p-4 shadow-[0_4px_8px_rgba(26,26,24,0.06),0_20px_40px_rgba(26,26,24,0.09)] sm:right-9 sm:w-[330px]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Sales by acquisition channel</span>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="grid h-[100px] w-[100px] shrink-0 place-items-center rounded-full"
            style={{ background: "conic-gradient(#6d8ff0 0 54%, #f472c9 54% 79%, #fbbf24 79% 100%)" }}
          >
            <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-white">
              <span className="text-sm font-bold tracking-[-0.03em] text-ink">$54,354</span>
              <span className="text-xs text-muted">32 sales</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div>
              <div className="text-sm font-bold tracking-[-0.03em] text-ink">$29,574</div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d8ff0]" />
                Phone sales
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-[-0.03em] text-ink">$13,435</div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f472c9]" />
                Form sales
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-[-0.03em] text-ink">$9,425</div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
                Online sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
