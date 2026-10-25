import Image from "next/image";
import { clientLogosByName, logoRowOne, logoRowTwo } from "@/components/sections/clientLogosData";
import { Section } from "@/components/home/primitives";

// Two copies of the row, each carrying its own trailing gap, so a -50%
// translate lands exactly on the start of the second copy.
function MarqueeRow({ logos, direction, className }) {
  return (
    <div className={`flex shrink-0 ${className}`}>
      <div
        className="testimonial-horizontal-marquee hp-marquee flex w-max shrink-0"
        style={{ animationDuration: "48s", animationDirection: direction }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex h-12 items-center gap-8 pr-8 lg:h-16 lg:gap-12 lg:pr-12"
          >
            {logos.map(([name, height]) => {
              const logo = clientLogosByName[name];
              return (
                <li key={name} className="shrink-0">
                  <Image
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="block w-auto"
                    style={{ height: `calc(${height}px * var(--logo-scale))` }}
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function HomeLogos() {
  return (
    <Section labelledBy="client-logos-title" innerClassName="flex flex-col gap-5.5 pt-11 pb-10 lg:flex-row lg:gap-0 lg:py-0">
      <h2
        id="client-logos-title"
        className="flex flex-col px-5 sm:px-8 lg:w-100 lg:shrink-0 lg:justify-end lg:border-r lg:border-hp-line lg:p-12"
      >
        <span className="font-hp text-[22px]/7.25 font-medium tracking-[-0.02em] text-hp-ink lg:text-2xl/7.75">
          The average client stays more than 12 months
        </span>
        <span className="font-hp text-[22px]/7.25 font-medium tracking-[-0.02em] text-hp-muted lg:text-2xl/7.75">
          (I don&apos;t have any lock-in contracts to keep them here).
        </span>
      </h2>

      {/* No edge fades: logos are clipped cleanly at the column hairlines. */}
      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-2.5 overflow-hidden [--logo-scale:0.75] lg:gap-4 lg:py-14 lg:[--logo-scale:1]">
        <MarqueeRow logos={logoRowOne} direction="normal" className="pl-5 lg:pl-6" />
        <MarqueeRow logos={logoRowTwo} direction="reverse" className="-ml-12.5 lg:-ml-17.5" />
      </div>
    </Section>
  );
}
