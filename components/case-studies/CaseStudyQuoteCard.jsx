import Image from "next/image";

export default function CaseStudyQuoteCard({
  quote,
  name,
  role,
  position,
  company,
  profileImageSrc,
  profileImageAlt,
  logoSrc,
  logoAlt,
}) {
  const jobTitle = position || role;
  const hasMeta = Boolean(name) || Boolean(jobTitle) || Boolean(company) || Boolean(logoSrc);

  return (
    <article className="mt-5 rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
      <blockquote className="text-base italic leading-[1.6] text-zinc-800 sm:text-md">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {hasMeta ? (
        <footer className="mt-4 flex items-end justify-between gap-4 border-t border-zinc-300 pt-4">
          <div className="flex items-center gap-3">
            {profileImageSrc ? (
              <Image
                src={profileImageSrc}
                alt={profileImageAlt || `${name || "Client"} profile photo`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border border-zinc-300 object-cover"
              />
            ) : null}

            <div>
              {name ? <p className="m-0 text-base font-semibold leading-[1.35] text-zinc-900">{name}</p> : null}
              {(jobTitle || company) ? (
                <p className="m-0 mt-0.5 text-base leading-[1.45] text-zinc-600">{[jobTitle, company].filter(Boolean).join(" @ ")}</p>
              ) : null}
            </div>
          </div>

          {logoSrc ? (
            <div className="flex h-8 items-center">
              <Image
                src={logoSrc}
                alt={logoAlt || `${company || "Client"} logo`}
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>
          ) : null}
        </footer>
      ) : null}
    </article>
  );
}
