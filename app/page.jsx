import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#e9eaec] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
