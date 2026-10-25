import Image from "next/image";

// MDX quote block: a quote in the light band style of QuoteRow, inside the
// case study body.
export default function CaseStudyQuoteCard({ quote, name, role, position, company, profileImageSrc, logoSrc, logoAlt }) {
  return (
    <figure className="mt-8 flex gap-3.5 rounded-xl border border-hp-line bg-hp-band p-5">
      {profileImageSrc ? (
        <Image src={profileImageSrc} alt={name} width={80} height={80} className="size-10 shrink-0 rounded-full object-cover" />
      ) : null}
      <div className="flex flex-col gap-2">
        <blockquote className="font-hp text-base/6 font-medium text-hp-ink">&quot;{quote}&quot;</blockquote>
        <figcaption className="flex items-center gap-2.5 font-hp text-sm/5 text-hp-fine">
          {name}, {position || role}
          {logoSrc ? (
            <>
              <span aria-hidden="true" className="h-3.5 w-px bg-[#dadce0]" />
              <Image src={logoSrc} alt={logoAlt || company || ""} width={75} height={30} className="h-6 w-auto" />
            </>
          ) : company ? (
            ` · ${company}`
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}
