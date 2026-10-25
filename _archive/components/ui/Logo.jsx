export default function Logo({ iconClassName = "h-5 w-5", textClassName = "text-lg" }) {
  return (
    <span className="inline-flex items-center gap-2.25">
      <svg
        className={iconClassName}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M28 62 L52 40" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        <path d="M52 40 L74 58" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        <circle cx="28" cy="62" r="15" fill="currentColor" />
        <circle cx="52" cy="40" r="10" fill="currentColor" />
        <circle cx="74" cy="58" r="7" fill="currentColor" />
      </svg>
      <span className={`font-bold tracking-[-0.03em] text-ink ${textClassName}`}>
        adsthatconvert
      </span>
    </span>
  );
}
