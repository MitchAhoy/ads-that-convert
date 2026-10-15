// Horizontal grid line with a small "+" marker where it crosses each GridFrame
// vertical line. Geometry is pixel-exact: every line is 1px and sits at the
// same anchor (`50% ± 560px`), and the marker box is an odd 25px square whose
// centre pixel lands on that anchor, so the plus sits centred on the crossing.
// The plus is 15px across with 1.5px arms, and the paper-coloured box masks an
// even 5px gap between the plus and all four lines.
function Intersection({ side }) {
  return (
    <span
      className={`absolute -top-3 hidden h-6.25 w-6.25 bg-page text-muted/40 xl:block ${
        side === "left" ? "left-[calc(50%-572px)]" : "left-[calc(50%+548px)]"
      }`}
    >
      <svg viewBox="0 0 25 25" className="h-full w-full" fill="none">
        <path d="M12.5 5v15M5 12.5h15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export default function GridDivider() {
  return (
    <div aria-hidden="true" className="relative z-10 h-px bg-border/60">
      <Intersection side="left" />
      <Intersection side="right" />
    </div>
  );
}
