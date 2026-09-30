import Image from "next/image";
import { clientLogosByName } from "@/components/sections/clientLogosData";

// Rendered heights are tuned per logo so each wordmark reads at a similar
// optical size (the source files have very different padding/aspect ratios).
const rowOne = [
  ["Fillout", "h-10"],
  ["ContentStudio", "h-[42px]"],
  ["Nooks", "h-[47px]"],
  ["AutoRFP", "h-[19px]"],
  ["ProsperOps", "h-12"],
  ["LiveTourney", "h-[45px]"],
  ["StoreLeads", "h-[47px]"],
  ["FreebieFlow", "h-[38px]"],
];

const rowTwo = [
  ["Everwall", "h-[42px]"],
  ["DialMyCalls", "h-[42px]"],
  ["Senja", "h-[47px]"],
  ["SEOBuddy", "h-[50px]"],
  ["SetSail", "h-[47px]"],
  ["PVCR", "h-[34px]"],
  ["DealBuyer", "h-[53px]"],
];

const edgeFade = "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";

// Two identical groups, each carrying its own trailing gap (pr-10), so a
// -50% translate lands exactly on the start of the second group.
function MarqueeRow({ logos, direction, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="testimonial-horizontal-marquee flex w-max"
        style={{ animationDuration: "40s", animationDirection: direction }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex h-14 items-center gap-10 pr-10"
          >
            {logos.map(([name, heightClass]) => {
              const logo = clientLogosByName[name];
              return (
                <li key={name} className="shrink-0">
                  <Image
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={`block w-auto ${heightClass}`}
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

export default function ClientLogoMarquee() {
  return (
    <section aria-labelledby="client-logo-marquee-title" className="py-12">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 pl-4 sm:pl-6 lg:flex-row lg:items-center lg:pl-20">
        <h2
          id="client-logo-marquee-title"
          className="pr-4 font-display text-2xl leading-[1.3]! text-ink text-wrap-pretty sm:pr-6 lg:w-100 lg:shrink-0 lg:pr-0"
        >
          The average client stays more than 12 months{" "}
          <span className="text-muted">(I don&apos;t have any lock-in contracts to keep them here).</span>
        </h2>

        <div
          className="flex min-w-0 flex-1 flex-col gap-2"
          style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
        >
          <MarqueeRow logos={rowOne} direction="normal" />
          <MarqueeRow logos={rowTwo} direction="reverse" className="pl-23.5" />
        </div>
      </div>
    </section>
  );
}
