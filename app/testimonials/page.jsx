import Testimonials from "@/components/sections/Testimonials";
import TextTestimonialsGrid from "@/components/sections/TextTestimonialsGrid";
import SharedClientLogoSection from "@/components/sections/SharedClientLogoSection";
import PageHeadline from "@/components/ui/PageHeadline";

export default function TestimonialsPage() {
  return (
    <>
      <PageHeadline
        id="testimonials-heading"
        title="In their own words"
        description="Real feedback from SaaS founders and marketing teams we have supported."
      />
      <Testimonials title="" />
      <TextTestimonialsGrid title="" description="" />
      <SharedClientLogoSection />
    </>
  );
}
