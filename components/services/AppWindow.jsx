// Window chrome for service-page hero views: the same frame as the homepage
// code window and case-study screenshots (DESIGN.md §7.12). Pass `label` for
// the title bar and an `ariaLabel` describing what the view shows.
export default function AppWindow({ label, icon, ariaLabel, caption, children }) {
  return (
    <figure className="w-full">
      <div
        role="img"
        aria-label={ariaLabel}
        className="overflow-hidden rounded-xl border border-border bg-white leading-[1.4] shadow-[0_4px_8px_rgba(26,26,24,0.04),0_20px_40px_rgba(26,26,24,0.08)]"
      >
        <div className="relative flex h-8.5 items-center justify-center border-b border-border bg-surface">
          <span className="absolute left-3.5 flex gap-1.75">
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            {icon}
            {label}
          </span>
        </div>
        {children}
      </div>
      {caption ? <figcaption className="mt-3.5 text-sm text-fine">{caption}</figcaption> : null}
    </figure>
  );
}
