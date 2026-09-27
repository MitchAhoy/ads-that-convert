// Vertical grid lines at `50% ± 560px` (the 1120px container edges). Must stay
// on the same anchor as GridDivider's intersection markers.
// `bleedTop` extends the lines up behind the navbar (which lives in the layout,
// above the page) so they reach the top of the document.
export default function GridFrame({ bleedTop = false, children }) {
  const top = bleedTop ? "-top-40" : "top-0";
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute ${top} bottom-0 left-[calc(50%-560px)] hidden w-px bg-border/60 xl:block`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute ${top} bottom-0 left-[calc(50%+560px)] hidden w-px bg-border/60 xl:block`}
      />
      {children}
    </div>
  );
}
