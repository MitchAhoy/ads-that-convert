import ClientLogoGrid from "@/components/sections/ClientLogoGrid";
import { clientLogosByName, heroClientLogoOrder } from "@/components/sections/clientLogosData";

const orderedLogos = heroClientLogoOrder.map((name) => clientLogosByName[name]).filter(Boolean);
const rowOne = orderedLogos.slice(0, 8);
const rowTwo = orderedLogos.slice(8);

function MarqueeRow({ logos, direction, indent = false }) {
  const doubled = [...logos, ...logos];

  return (
    <div className={`overflow-hidden ${indent ? "pl-24" : ""}`}>
      <ClientLogoGrid
        logos={doubled}
        className="testimonial-horizontal-marquee flex w-max items-center gap-10"
        itemClassName="flex h-14 shrink-0 items-center justify-center"
        imageClassName="max-h-10 max-w-[150px]"
        style={{ animationDuration: "40s", animationDirection: direction }}
      />
    </div>
  );
}

export default function ClientLogoMarquee() {
  return (
    <section aria-labelledby="client-logo-marquee-title" className="py-14 sm:py-18">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10">
          <h2
            id="client-logo-marquee-title"
            className="text-[32px] leading-[1.25] font-bold tracking-[-0.03em] text-ink text-wrap-pretty"
          >
            Paid media driving growth for ambitious SaaS brands
          </h2>

          <div className="relative min-w-0" style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}>
            <div className="flex flex-col gap-2">
              <MarqueeRow logos={rowOne} direction="normal" />
              <MarqueeRow logos={rowTwo} direction="reverse" indent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
