import Image from "next/image";
import Link from "next/link";

const featuredLogos = [
  {
    src: "/as seen in logos/search engine journal.webp",
    alt: "Search Engine Journal logo",
    width: 354,
    height: 85,
    href: "https://www.searchenginejournal.com/hyper-local-ppc-landing-pages/464792/",
  },
  {
    src: "/as seen in logos/optmyzr.webp",
    alt: "Optmyzr logo",
    width: 356,
    height: 82,
    href: "https://www.youtube.com/watch?v=GkNDnQZVK4M&t=42s&pp=ygUgb3B0eW16ciBwb2RjYXN0IG1pdGNoIGNhcnR3cmlnaHQ%3D",
  },
  {
    src: "/as seen in logos/ppc hero.png",
    alt: "PPC Hero logo",
    width: 344,
    height: 78,
    href: "https://ppchero.com/how-to-set-up-and-optimize-end-to-end-lead-gen-funnel-tracking-with-no-crm-required/",
  },
  {
    src: "/as seen in logos/ppc chat.png",
    alt: "PPC Chat logo",
    width: 289,
    height: 90,
    href: "https://officialppcchat.com/meet-mitch-cartwright/",
  },
];

export default function AsSeenInLogos() {
  return (
    <section aria-labelledby="as-seen-in-title" className="bg-[#e9eaec] py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <h2
            id="as-seen-in-title"
            className="text-center font-serif text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#122338]"
          >
            You may have seen me on
          </h2>

          <ul className="grid w-full grid-cols-2 items-center justify-items-center gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5 lg:grid-cols-4 lg:gap-x-5">
            {featuredLogos.map((logo) => (
              <li key={logo.src} className="flex h-28 w-full items-center justify-center lg:w-[224px]">
                <Link
                  href={logo.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={`Open ${logo.alt}`}
                  className="block h-full w-full"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-full w-full object-contain"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
