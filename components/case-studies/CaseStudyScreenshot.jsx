// Real Google Ads screenshots in a light window frame (DESIGN.md §16.11).
// Built from spans so it's valid inside the <p> that MDX wraps around images.
export default function CaseStudyScreenshot({ src, alt = "", label = "Google Ads · Campaigns", className = "" }) {
  return (
    <span
      className={`block overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_#e4e6ea,0_8px_24px_rgba(14,15,17,0.06)] ${className}`}
    >
      <span className="flex h-7.5 items-center gap-1.5 border-b border-hp-line-soft bg-hp-band px-3">
        <span aria-hidden="true" className="size-2 rounded-full bg-[#e4e6ea]" />
        <span aria-hidden="true" className="size-2 rounded-full bg-[#e4e6ea]" />
        <span aria-hidden="true" className="size-2 rounded-full bg-[#e4e6ea]" />
        <span className="ml-2.5 truncate font-hp-mono text-xs/4 text-hp-muted">{label}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX images have unknown intrinsic sizes */}
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </span>
  );
}
