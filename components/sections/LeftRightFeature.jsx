import Image from "next/image";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function LeftRightFeature({
  sectionId,
  title,
  description,
  points = [],
  quote,
  person,
  role,
  company,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoClassName,
  avatarSrc,
  avatarAlt,
  illustration,
  reverse = false,
}) {
  const textOrderClass = reverse ? "lg:order-2" : "lg:order-1";
  const mediaOrderClass = reverse ? "lg:order-1" : "lg:order-2";

  return (
    <section id={sectionId} className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className={textOrderClass}>
            <h2 className="text-h2 text-ink">
              {title}
            </h2>

            <p className="mt-5 max-w-[30em] text-lg leading-[1.5] text-body">{description}</p>

            <ul className="mt-8 space-y-4.5">
              {points.map((point) => (
                <li key={point.text} className="flex items-center gap-3.5 text-base leading-[1.5] text-ink">
                  <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center text-ink">
                    <point.Icon aria-hidden="true" className="h-5.5 w-5.5" strokeWidth={1.75} />
                  </span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-border pt-7">
              <blockquote className="max-w-[30em] text-xl font-medium leading-[1.45] tracking-[-0.01em] text-ink">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="mt-5.5 flex flex-wrap items-center gap-4 sm:gap-5">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={avatarAlt || `${person} avatar`}
                    width={72}
                    height={72}
                    className="h-11 w-11 rounded-full border border-border object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-base font-semibold text-ink">
                    {getInitials(person)}
                  </span>
                )}

                <div className="min-w-[180px]">
                  <p className="text-base font-bold leading-[1.4] tracking-[-0.03em] text-ink">{person}</p>
                  <p className="text-sm leading-[1.5] text-muted">
                    {role}, {company}
                  </p>
                </div>

                {companyLogoSrc ? (
                  <>
                    <span aria-hidden="true" className="hidden h-9 w-px bg-border sm:block" />
                    <Image
                      src={companyLogoSrc}
                      alt={companyLogoAlt || `${company} logo`}
                      width={200}
                      height={60}
                      className={`h-11.5 w-auto object-contain ${companyLogoClassName || ""}`}
                    />
                  </>
                ) : null}
              </div>
            </div>
        </div>

        <div className={mediaOrderClass}>{illustration}</div>
        </div>
      </div>
    </section>
  );
}
