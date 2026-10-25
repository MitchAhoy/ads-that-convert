"use client";

import { usePathname } from "next/navigation";

// The URL the visitor actually asked for, in a small address bar, with the
// path marked by a spellcheck squiggle as if it were a typo. Long paths are
// truncated so the bar never pushes the page wider than the phone.
export default function MissingUrl() {
  const pathname = usePathname() || "/this-page";
  return (
    <p className="flex max-w-full items-start rounded-lg bg-white px-3 pt-1.75 pb-0.75 font-hp-mono text-[13px]/5 shadow-[0_0_0_1px_#e4e6ea]">
      <span className="shrink-0 text-hp-muted">adsthatconvert.co</span>
      {/* pb gives the squiggle room inside the truncating box. */}
      <span className="truncate pb-1 text-hp-ink underline decoration-[#D93025] decoration-wavy decoration-1 underline-offset-[4px]">
        {pathname}
      </span>
    </p>
  );
}
