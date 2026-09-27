export default function ResultsIllustration() {
  return (
    <div
      className="grain relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px]"
      style={{
        background:
          "linear-gradient(100deg, #4a90e2 0%, #6fb8ff 20%, #cbe0f5 40%, #eaf4ff 55%, #a5b4fc 75%, #6d8ff0 100%)",
      }}
      role="img"
      aria-label="Dashboard showing conversion rates by action and a conversion funnel breakdown"
    >
      <div className="absolute right-6 top-8 z-10 w-[210px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_8px_20px_rgba(26,26,24,0.08)] sm:right-9 sm:w-[300px] sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Conversions by action</span>
        </div>
        <p className="mb-3 text-xs text-muted">Conversions</p>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-body">Demo booked</span>
          <span className="font-semibold text-ink">60%</span>
        </div>
        <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full w-[60%] rounded-full" style={{ background: "linear-gradient(90deg, #6d8ff0, #4a90e2)" }} />
        </div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-body">Trial started</span>
          <span className="font-semibold text-ink">40%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full w-[40%] rounded-full" style={{ background: "linear-gradient(90deg, #a5b4fc, #b48be3)" }} />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 w-[230px] rounded-2xl border border-border bg-white p-4 shadow-[0_4px_8px_rgba(26,26,24,0.06),0_20px_40px_rgba(26,26,24,0.09)] sm:left-9 sm:w-[320px] sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Conversion funnel</span>
        </div>
        <p className="text-xs text-muted">Users</p>
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="text-2xl font-bold tracking-[-0.03em] text-ink">2,173</span>
          <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-semibold text-[#166534]">+3.21%</span>
        </div>
        <div className="flex items-center gap-2.5 border-t border-border py-2.5 text-sm">
          <span className="h-2 w-2 rounded-full bg-[#4a90e2]" />
          <span className="flex-1 text-body">Sign ups</span>
          <span className="font-semibold text-ink">40%</span>
        </div>
        <div className="flex items-center gap-2.5 border-t border-border py-2.5 text-sm">
          <span className="h-2 w-2 rounded-full bg-[#b48be3]" />
          <span className="flex-1 text-body">Leads</span>
          <span className="font-semibold text-ink">15%</span>
        </div>
        <div className="flex items-center gap-2.5 border-t border-border pt-2.5 text-sm">
          <span className="h-2 w-2 rounded-full bg-[#f472c9]" />
          <span className="flex-1 text-body">Converted customers</span>
          <span className="font-semibold text-ink">6%</span>
        </div>
      </div>
    </div>
  );
}
