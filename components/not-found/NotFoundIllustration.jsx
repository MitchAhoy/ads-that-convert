import "./not-found.css";

// 404 illustration (DESIGN.md §16.15): the logo's three dots as a funnel with
// the middle dot (the landing page) missing, so the blue conversion dot has
// rolled off onto the floor. Decorative, so hidden from screen readers.
// Labels are HTML over the SVG so they stay at 12px+ on phones.

const stats = [
  { label: "Clicks", value: "1" },
  { label: "Conversions", value: "0" },
  { label: "Cost to you", value: "$0.00" },
];

// Positions in % of the 520×220 scene.
const labelClass = "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-hp-mono text-xs/4";

export default function NotFoundIllustration() {
  return (
    <div aria-hidden="true" className="w-full max-w-140 rounded-[20px] bg-hp-tray p-1.5 shadow-[0_0_0_1px_rgba(14,15,17,0.06)]">
      <div className="flex items-center justify-between gap-3 px-3.5 pt-2 pb-2.5">
        <span className="truncate font-hp-mono text-xs/4 text-hp-fine">Campaign · The page you wanted</span>
        <span className="shrink-0 font-hp text-xs/4 font-medium text-[#B3261E]">Destination not working</span>
      </div>

      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_1px_rgba(14,15,17,0.07),0_2px_8px_rgba(14,15,17,0.04)]">
        <div className="hp-well relative">
          <svg viewBox="0 0 520 220" className="block w-full" fill="none">
            {/* Floor */}
            <path d="M24 196.5H496" stroke="#DADDE2" strokeWidth="1.5" strokeLinecap="round" />

            {/* Ad click → landing page: solid, then broken where the page should be */}
            <path d="M96 140 L150 110" stroke="#0E0F11" strokeWidth="14" strokeLinecap="round" />
            <path d="M166 101 L196 87" stroke="#0E0F11" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 12" />
            <circle cx="96" cy="140" r="28" fill="#0E0F11" />

            {/* The missing landing page */}
            <circle cx="220" cy="78" r="26" fill="#fff" stroke="#9AA0AA" strokeWidth="2.5" strokeDasharray="5 6" />

            {/* Where the conversion should have been */}
            <path d="M244 92 L314 116" stroke="#D3D6DC" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
            <circle cx="330" cy="124" r="14" stroke="#C9CDD3" strokeWidth="2" strokeDasharray="4 5" />

            {/* Its route to the floor */}
            <path
              className="nf-trail"
              d="M330 124 C 370 118, 410 140, 452 180"
              stroke="#155EEF"
              strokeOpacity="0.4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />

            {/* The conversion, rolled away */}
            <g className="nf-fall">
              <ellipse className="nf-shadow" cx="452" cy="197" rx="15" ry="3" fill="#0E0F11" fillOpacity="0.08" />
              <g className="nf-roll">
                <circle cx="452" cy="180" r="16" fill="#155EEF" />
                <circle cx="446" cy="174" r="4.5" fill="#fff" fillOpacity="0.45" />
              </g>
            </g>
          </svg>

          <span className={`${labelClass} text-hp-fine`} style={{ left: "18.5%", top: "43%" }}>
            Ad click
          </span>
          <span className={`${labelClass} text-hp-fine`} style={{ left: "42.3%", top: "14%" }}>
            Landing page
          </span>
          <span className={`${labelClass} font-medium text-hp-ink`} style={{ left: "42.3%", top: "35.5%" }}>
            404
          </span>
          <span className={`${labelClass} text-hp-fine`} style={{ left: "63.5%", top: "44%" }}>
            Conversion
          </span>
          <span className={`nf-note ${labelClass} text-[#1640B8]`} style={{ left: "85%", top: "56%" }}>
            rolled away
          </span>
        </div>

        <dl className="grid grid-cols-3 border-t border-hp-line-soft">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`flex flex-col gap-1 px-3.5 py-3 sm:px-5 sm:py-3.5 ${index > 0 ? "border-l border-hp-line-soft" : ""}`}>
              <dt className="font-hp text-xs/4 text-hp-fine">{stat.label}</dt>
              <dd className="font-hp text-lg/6 font-medium tracking-[-0.02em] text-hp-ink sm:text-xl/7">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
