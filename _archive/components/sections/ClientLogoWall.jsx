import ClientLogoGrid from "@/components/sections/ClientLogoGrid";
import { clientLogos } from "@/components/sections/clientLogosData";

export default function ClientLogoWall({ title = "You're in good company", className = "" }) {
  return (
    <section className={`py-5 sm:py-6 ${className}`} aria-label="Client logos">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base font-medium text-zinc-700">{title}</p>
        <ClientLogoGrid
          logos={clientLogos}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3"
          itemClassName="flex h-14 w-[122px] items-center justify-center sm:w-[130px]"
          imageClassName="max-h-10 max-w-[148px] brightness-0 opacity-90"
        />
      </div>
    </section>
  );
}
