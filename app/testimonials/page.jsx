import Testimonials from "@/components/sections/Testimonials";
import TextTestimonialsGrid from "@/components/sections/TextTestimonialsGrid";
import ClientLogoWall from "@/components/sections/ClientLogoWall";

export default function TestimonialsPage() {
  return (
    <>
      <Testimonials title="In their own words" titleAlign="center" />
      <TextTestimonialsGrid title="" description="" />
      <ClientLogoWall title="You're in good company" />
    </>
  );
}
