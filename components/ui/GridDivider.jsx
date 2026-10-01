import { Zap } from "lucide-react";

// Horizontal grid line with a small lightning-bolt marker where it crosses each
// GridFrame vertical line. Geometry is pixel-exact: every line is 1px and sits
// at the same anchor (`50% ± 560px`), and the marker box is an odd 21px square
// whose centre pixel lands on that anchor, so the bolt sits centred on the
// crossing. The white box masks an even 4px gap between the bolt and all four lines.
function Intersection({ side }) {
  return (
    <span
      className={`absolute -top-2.5 hidden h-5.25 w-5.25 bg-page xl:block ${
        side === "left" ? "left-[calc(50%-570px)]" : "left-[calc(50%+550px)]"
      }`}
    >
      <Zap
        className="absolute top-1 left-1 h-3.25 w-3.25 fill-current text-muted/70"
        strokeWidth={2.5}
      />
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
