export default function RinseRepeatIllustration() {
  return (
    <div
      className="grain relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px]"
      style={{
        background:
          "radial-gradient(ellipse 90% 100% at 10% 20%, #eafbf1 0%, transparent 65%), radial-gradient(ellipse 80% 90% at 25% 75%, #a3e635 0%, transparent 60%), radial-gradient(ellipse 100% 110% at 75% 45%, #22c1c3 0%, transparent 70%), #1eb0a8",
      }}
      role="img"
      aria-label="Dashboard showing a sessions overview trend line and recurring visitor statistics"
    >
      <div className="absolute right-6 top-8 z-10 w-[220px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_1px_2px_rgba(26,26,24,0.06),0_8px_20px_rgba(26,26,24,0.08)] sm:right-8 sm:w-[300px]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Sessions overview</span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-body">Week</span>
        </div>
        <svg width="100%" height="90" viewBox="0 0 290 110" preserveAspectRatio="none" className="block">
          <defs>
            <linearGradient id="rr-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#22c1c3" />
              <stop offset="1" stopColor="#6d8ff0" />
            </linearGradient>
            <linearGradient id="rr-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#22c1c3" stopOpacity="0.22" />
              <stop offset="1" stopColor="#22c1c3" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 30H290M0 65H290M0 100H290" stroke="#e2e0da" strokeWidth="1" strokeDasharray="3 4" />
          <path
            d="M0 92 L24 74 L44 88 L68 66 L92 72 L116 52 L140 56 L164 40 L188 42 L212 22 L232 30 L256 16 L276 26 L290 20 L290 110 L0 110 Z"
            fill="url(#rr-fill)"
          />
          <path
            d="M0 92 L24 74 L44 88 L68 66 L92 72 L116 52 L140 56 L164 40 L188 42 L212 22 L232 30 L256 16 L276 26 L290 20"
            fill="none"
            stroke="url(#rr-line)"
            strokeWidth="2.25"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute top-46 left-6 z-10 w-50 rounded-2xl border border-border bg-white p-4 shadow-[0_4px_8px_rgba(26,26,24,0.06),0_20px_40px_rgba(26,26,24,0.09)] sm:left-8">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Statistics</span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-body">Week</span>
        </div>
        <div className="border-t border-border py-3">
          <p className="text-xs text-muted">Recurring visitors</p>
          <p className="my-0.5 text-xl font-bold tracking-[-0.03em] text-ink">405,857</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[78%] rounded-full" style={{ background: "linear-gradient(90deg, #22c1c3, #1eb0a8)" }} />
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted">New visitors</p>
          <p className="my-0.5 text-xl font-bold tracking-[-0.03em] text-ink">144,139</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[38%] rounded-full" style={{ background: "linear-gradient(90deg, #a5b4fc, #6d8ff0)" }} />
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-6 z-20 hidden w-46 rounded-2xl border border-border bg-white p-3.5 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] sm:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Devices</span>
        </div>
        <div className="mb-3 flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <span className="h-1.75 w-1.75 rounded-full bg-[#22c1c3]" />
            Desktop
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.75 w-1.75 rounded-full bg-[#6d8ff0]" />
            Mobile
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.75 w-1.75 rounded-full bg-[#a3e635]" />
            Tablet
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { month: "Jan", desktop: 52, mobile: 30, tablet: 10 },
            { month: "Feb", desktop: 30, mobile: 24, tablet: 8 },
            { month: "Mar", desktop: 26, mobile: 14, tablet: 6 },
            { month: "Apr", desktop: 46, mobile: 26, tablet: 12 },
            { month: "May", desktop: 56, mobile: 28, tablet: 9 },
          ].map((row) => (
            <div key={row.month} className="flex items-center gap-2.5">
              <span className="w-6 text-[11px] text-muted">{row.month}</span>
              <div className="flex flex-1 gap-0.75">
                <div className="h-1.75 rounded-full bg-[#22c1c3]" style={{ width: `${row.desktop}%` }} />
                <div className="h-1.75 rounded-full bg-[#6d8ff0]" style={{ width: `${row.mobile}%` }} />
                <div className="h-1.75 rounded-full bg-[#a3e635]" style={{ width: `${row.tablet}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
