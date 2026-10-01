// Real Google Ads screenshots, framed in the same window chrome as the homepage
// code window (HeroCodeAnimation). Built from spans so it's valid inside the
// <p> that MDX wraps around markdown images.
export default function CaseStudyScreenshot({ src, alt = "", label = "Google Ads · Campaigns", className = "" }) {
  return (
    <span
      className={`block overflow-hidden rounded-xl border border-border bg-white shadow-[0_4px_8px_rgba(26,26,24,0.04),0_20px_40px_rgba(26,26,24,0.08)] ${className}`}
    >
      <span className="relative flex h-8.5 items-center justify-center border-b border-border bg-surface">
        <span aria-hidden="true" className="absolute left-3.5 flex gap-1.75">
          <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
        </span>
        <span className="text-xs text-muted">{label}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX images have unknown intrinsic sizes */}
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </span>
  );
}
