import Image from "next/image";

const clientLogos = [
  { src: "/client-logos/autorfp.svg", alt: "AutoRFP", width: 160, height: 48 },
  { src: "/client-logos/contentstudio.png", alt: "ContentStudio", width: 160, height: 64 },
  { src: "/client-logos/dealbuyer.png", alt: "DealBuyer", width: 160, height: 64 },
  { src: "/client-logos/dialmycalls.png", alt: "DialMyCalls", width: 160, height: 64 },
  { src: "/client-logos/everwall.png", alt: "Everwall", width: 160, height: 64 },
  { src: "/client-logos/fillout.png", alt: "Fillout", width: 160, height: 64 },
  { src: "/client-logos/freebieflow.svg", alt: "FreebieFlow", width: 160, height: 48 },
  { src: "/client-logos/livetourney.svg", alt: "LiveTourney", width: 160, height: 48 },
  { src: "/client-logos/nooks.png", alt: "Nooks", width: 160, height: 64 },
  { src: "/client-logos/prosperops.png", alt: "ProsperOps", width: 160, height: 64 },
  { src: "/client-logos/senja.png", alt: "Senja", width: 160, height: 64 },
  { src: "/client-logos/seobuddy.png", alt: "SEOBuddy", width: 160, height: 64 },
  { src: "/client-logos/setsail.png", alt: "SetSail", width: 160, height: 64 },
  { src: "/client-logos/storeleads.svg", alt: "StoreLeads", width: 160, height: 48 },
];

export default function ClientLogoWall({ title = "You're in good company", className = "" }) {
  return (
    <section className={`py-5 sm:py-6 ${className}`} aria-label="Client logos">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base font-medium text-zinc-700">{title}</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3">
          {clientLogos.map((logo) => (
            <li key={logo.src} className="flex h-14 w-[122px] items-center justify-center sm:w-[130px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-h-10 w-auto max-w-[148px] object-contain brightness-0 opacity-90"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
