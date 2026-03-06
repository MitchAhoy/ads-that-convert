import ClientLogoGrid from "@/components/sections/ClientLogoGrid";
import {
  clientLogosByName,
  heroClientLogoOrder,
} from "@/components/sections/clientLogosData";

const heroClientLogos = heroClientLogoOrder
  .map((logoName) => clientLogosByName[logoName])
  .filter(Boolean);

export default function HeroClientLogoGrid() {
  return (
    <ClientLogoGrid
      logos={heroClientLogos}
      className="mt-6 grid grid-cols-3 items-center gap-x-2 gap-y-2 sm:mt-6 sm:grid-cols-5 sm:gap-x-3 sm:gap-y-1"
      itemClassName="flex h-11 items-center justify-center sm:h-10"
      getImageClassName={(logo) =>
        logo.alt === "AutoRFP"
          ? "max-h-6 max-w-[96px] sm:max-h-7 sm:max-w-[104px]"
          : "max-h-9 max-w-[132px] sm:max-h-10 sm:max-w-[150px]"
      }
    />
  );
}
