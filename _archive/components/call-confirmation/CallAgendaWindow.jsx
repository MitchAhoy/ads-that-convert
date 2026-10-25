import Image from "next/image";
import AppWindow from "@/components/services/AppWindow";

// The 15 minutes, split the way the call runs. `minutes` drives the bar widths;
// the fit check is the one pastel element (DESIGN.md §7.5).
const agenda = [
  { start: "0:00", minutes: 4, title: "Your product and goals", detail: "Pricing, sales motion, 90-day targets" },
  {
    start: "4:00",
    minutes: 6,
    title: "Where search fits today",
    detail: "Your account, or competitors' ads if you're not live",
  },
  {
    start: "10:00",
    minutes: 3,
    title: "Fit check",
    detail: "Sign-up to paid, LTV and payback against CPCs",
    highlight: true,
  },
  { start: "13:00", minutes: 2, title: "Go or no-go", detail: "A straight answer and next steps" },
];

const highlightFill = "linear-gradient(90deg, var(--pastel-lavender), var(--pastel-blush))";

export default function CallAgendaWindow() {
  return (
    <AppWindow
      label="Discovery call · 15 min"
      ariaLabel="Agenda for the 15-minute discovery call: your product and goals, where search fits today, a fit check, then a go or no-go answer with next steps."
    >
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.8125rem] font-bold text-ink">SaaS Google Ads discovery call</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Image src="/google-meet-logo.png" alt="" width={12} height={12} />
              Google Meet · 15 min
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
            <Image
              src="/team/mitch.jpeg"
              alt=""
              width={48}
              height={48}
              className="h-6 w-6 rounded-full object-cover"
            />
            Mitch, host
          </span>
        </div>

        <div className="mt-4 flex h-2 gap-1">
          {agenda.map((item) => (
            <span
              key={item.start}
              className={`h-full rounded-full ${item.highlight ? "grain relative overflow-hidden" : "bg-[#e4e2dd]"}`}
              style={{ flexGrow: item.minutes, ...(item.highlight ? { background: highlightFill } : {}) }}
            />
          ))}
        </div>

        <ol className="mt-3">
          {agenda.map((item, index) => (
            <li
              key={item.start}
              className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-2 py-3 ${index > 0 ? "border-t border-surface" : ""}`}
            >
              <span className="pt-px font-mono text-xs text-muted tabular-nums">{item.start}</span>
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {item.title}
                  {item.highlight ? (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: highlightFill }} />
                  ) : null}
                </span>
                <span className="mt-0.5 block text-xs text-muted">{item.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </AppWindow>
  );
}
