import Image from "next/image";
import { clientLogos } from "@/components/sections/clientLogosData";

export default function ClientLogos() {
  const marqueeLogos = [...clientLogos, ...clientLogos];
  const boostedLogos = new Set([
    "PVCR",
    "ContentStudio",
    "DealBuyer",
    "DialMyCalls",
  ]);

  return (
    <section aria-label="Client logos" className="py-5 sm:py-6">
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 text-center text-base leading-[1.6] text-zinc-600 sm:w-[290px] sm:text-left sm:text-md">
            Trusted by high-growth SaaS teams worldwide
          </p>

          <div className="relative flex-1 overflow-hidden">
            <ul className="logo-marquee flex w-max items-center gap-2 pr-2 sm:gap-3 sm:pr-3">
              {marqueeLogos.map((logo, index) => (
                <li
                  key={`${logo.src}-${index}`}
                  className="flex h-12 w-36 shrink-0 items-center justify-center sm:w-40"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={`w-auto object-contain brightness-0 ${
                      boostedLogos.has(logo.alt)
                        ? "max-h-11 max-w-[170px]"
                        : "max-h-10 max-w-[150px]"
                    }`}
                  />
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#e9eaec] to-transparent sm:w-16"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#e9eaec] to-transparent sm:w-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
