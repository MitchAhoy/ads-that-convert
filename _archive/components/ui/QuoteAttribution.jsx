import Image from "next/image";

// Rendered heights are tuned per logo so each reads at a similar optical size
// beside the name, and none outweighs the person (the source files have very
// different padding). Unlisted logos fall back to `h-8`.
const logoHeightBySrc = {
  "/client-logos/fillout.png": "h-7",
  "/client-logos/nooks.png": "h-8",
  "/client-logos/senja.png": "h-9",
  "/client-logos/dialmycalls.png": "h-10",
  "/client-logos/livetourney.svg": "h-10",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function QuoteAttribution({
  quote,
  person,
  role,
  company,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoClassName,
  avatarSrc,
  avatarAlt,
  compact = false,
  className = "",
}) {
  return (
    <figure className={className}>
      <blockquote
        className={
          compact
            ? "max-w-[34em] text-lg font-medium leading-[1.5] text-ink"
            : "max-w-[30em] text-xl font-medium leading-[1.45] tracking-[-0.01em] text-ink"
        }
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className={`${compact ? "mt-5.5 gap-5" : "mt-5.5 gap-4 sm:gap-5"} flex flex-wrap items-center`}>
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={avatarAlt || `${person} avatar`}
            width={72}
            height={72}
            className={`h-11 w-11 shrink-0 rounded-full object-cover ${compact ? "bg-border" : "border border-border"}`}
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-base font-semibold text-ink">
            {getInitials(person)}
          </span>
        )}

        <div className="sm:min-w-[180px]">
          <p className="text-base font-bold leading-[1.4] tracking-[-0.03em] text-ink">{person}</p>
          <p className="text-sm leading-[1.5] text-fine">
            {role}, {company}
          </p>
        </div>

        {companyLogoSrc ? (
          <>
            <span aria-hidden="true" className="hidden h-9 w-px shrink-0 bg-border sm:block" />
            <Image
              src={companyLogoSrc}
              alt={companyLogoAlt || `${company} logo`}
              width={200}
              height={60}
              className={`w-auto object-contain ${companyLogoClassName || logoHeightBySrc[companyLogoSrc] || "h-8"}`}
            />
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
