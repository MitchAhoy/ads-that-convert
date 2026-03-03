import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#e9eaec] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-1">
        <Navbar />
        <Hero />
        <ClientLogos />
      </div>
    </div>
  );
}
