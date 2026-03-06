import ClientLogoGrid from "@/components/sections/ClientLogoGrid";
import {
  clientLogosByName,
  heroClientLogoOrder,
} from "@/components/sections/clientLogosData";

const sharedClientLogos = heroClientLogoOrder
  .map((logoName) => clientLogosByName[logoName])
  .filter(Boolean);

export default function SharedClientLogoSection({
  title = "You're in good company",
  className = "",
}) {
  return (
    <section className={`pt-0 pb-5 sm:pb-6 ${className}`} aria-label="Client logos">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base font-medium text-zinc-700">{title}</p>
        <ClientLogoGrid
          logos={sharedClientLogos}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 lg:gap-x-12"
          itemClassName="flex h-11 items-center justify-center sm:h-12 lg:h-10"
          getImageClassName={(logo) =>
            logo.alt === "AutoRFP"
              ? "max-h-6 max-w-[96px] sm:max-h-7 sm:max-w-[104px]"
              : "max-h-9 max-w-[132px] sm:max-h-10 sm:max-w-[150px]"
          }
        />
      </div>
    </section>
  );
}
