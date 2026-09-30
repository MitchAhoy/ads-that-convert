import Image from "next/image";
import { clientLogosByName } from "@/components/sections/clientLogosData";

// Rendered heights are tuned per logo so each wordmark reads at a similar
// optical size (the source files have very different padding/aspect ratios).
const rowOne = [
  ["Fillout", "h-12"],
  ["ContentStudio", "h-12.5"],
  ["Nooks", "h-14"],
  ["AutoRFP", "h-[23px]"],
  ["ProsperOps", "h-14.5"],
  ["LiveTourney", "h-13.5"],
  ["StoreLeads", "h-14"],
  ["FreebieFlow", "h-11.5"],
];

const rowTwo = [
  ["Everwall", "h-12.5"],
  ["DialMyCalls", "h-12.5"],
  ["Senja", "h-14"],
  ["SEOBuddy", "h-15"],
  ["SetSail", "h-14"],
  ["PVCR", "h-[41px]"],
  ["DealBuyer", "h-16"],
];

const edgeFade = "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)";

// Two identical groups, each carrying its own trailing gap (pr-12), so a
// -50% translate lands exactly on the start of the second group.
function MarqueeRow({ logos, direction, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="testimonial-horizontal-marquee flex w-max"
        style={{ animationDuration: "48s", animationDirection: direction }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex h-16 items-center gap-12 pr-12"
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
    <section aria-labelledby="client-logo-marquee-title" className="py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 pl-4 sm:pl-6 lg:flex-row lg:items-center lg:pl-8">
        <h2
          id="client-logo-marquee-title"
          className="pr-4 font-display text-2xl leading-[1.3]! text-ink text-wrap-pretty sm:pr-6 lg:w-100 lg:shrink-0 lg:pr-0"
        >
          The average client stays more than 12 months{" "}
          <span className="text-muted">(I don&apos;t have any lock-in contracts to keep them here).</span>
        </h2>

        <div
          className="flex min-w-0 flex-1 flex-col gap-4"
          style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
        >
          <MarqueeRow logos={rowOne} direction="normal" />
          <MarqueeRow logos={rowTwo} direction="reverse" className="pl-28" />
        </div>
      </div>
    </section>
  );
}
