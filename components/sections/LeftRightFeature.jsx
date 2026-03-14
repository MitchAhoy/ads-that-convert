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
  imageSrc,
  imageAlt,
  reverse = false,
}) {
  const textOrderClass = reverse ? "lg:order-2" : "lg:order-1";
  const mediaOrderClass = reverse ? "lg:order-1" : "lg:order-2";

  return (
    <section id={sectionId} className="py-5 sm:py-6">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={textOrderClass}>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0c2237]">
              {title}
            </h2>

            <p className="mt-4 text-lg leading-[1.6] text-zinc-900">{description}</p>

            <ul className="mt-6 space-y-5">
              {points.map((point) => (
                <li key={point.text} className="flex items-center gap-4 text-base leading-[1.6] text-zinc-900">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-zinc-950">
                    <point.Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-8 text-base italic leading-[1.5] text-zinc-900">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={avatarAlt || `${person} avatar`}
                  width={72}
                  height={72}
                  className="h-12 w-12 rounded-full border border-zinc-300 object-cover sm:h-14 sm:w-14"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 text-base font-semibold text-zinc-800 sm:h-14 sm:w-14 sm:text-lg">
                  {getInitials(person)}
                </span>
              )}

              <div className="min-w-[180px]">
                <p className="text-base font-semibold leading-[1.4] text-zinc-950">{person}</p>
                <p className="text-base leading-[1.6] text-zinc-900">
                  {role}, {company}
                </p>
              </div>

              {companyLogoSrc ? (
                <>
                  <span aria-hidden="true" className="hidden h-14 w-px bg-zinc-400 sm:block" />
                  <Image
                    src={companyLogoSrc}
                    alt={companyLogoAlt || `${company} logo`}
                    width={200}
                    height={60}
                    className={`h-10 w-auto object-contain brightness-0 sm:h-12 ${companyLogoClassName || ""}`}
                  />
                </>
              ) : null}
            </div>
        </div>

        <div className={mediaOrderClass}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={700}
            height={520}
            className="h-auto w-full opacity-95 contrast-90 saturate-75"
          />
        </div>
      </div>
    </section>
  );
}
