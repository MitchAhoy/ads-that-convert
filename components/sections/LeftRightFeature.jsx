import QuoteAttribution from "@/components/ui/QuoteAttribution";

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
            <h2 className="font-display text-h2 text-ink">
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
              <QuoteAttribution
                quote={quote}
                person={person}
                role={role}
                company={company}
                companyLogoSrc={companyLogoSrc}
                companyLogoAlt={companyLogoAlt}
                companyLogoClassName={companyLogoClassName}
                avatarSrc={avatarSrc}
                avatarAlt={avatarAlt}
              />
            </div>
        </div>

        <div className={mediaOrderClass}>{illustration}</div>
        </div>
      </div>
    </section>
  );
}
