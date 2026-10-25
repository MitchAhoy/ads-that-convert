import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomeLogos from "@/components/home/HomeLogos";
import HomePageHero from "@/components/home/HomePageHero";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { hpBookingBarButton } from "@/components/home/primitives";
import WrittenTestimonials from "@/components/testimonials/WrittenTestimonials";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { generateMeta } from "@/lib/seo";

export function generateMetadata() {
  return generateMeta({
    title: "Testimonials | Ads That Convert",
    description: "Real feedback from SaaS founders and marketing teams I have worked with.",
    path: "/testimonials",
  });
}

// /testimonials on the homepage system (DESIGN.md §16.12).
export default function TestimonialsPage() {
  return (
    <>
      <main className="bg-white">
        <HomePageHero
          lead="Don't take my word for it."
          accent="Hear it from my clients."
          description="Every quote on this page is from a real client, word for word. Four on video, twelve in writing."
          showAvatars
        />
        <HomeTestimonials
          eyebrow="01 · On video"
          marker={0}
          intro="Four clients on camera, talking about what working with me is actually like."
        />
        <WrittenTestimonials eyebrow="02 · In writing" marker={1} />
        <HomeLogos />
        <HomeFinalCta underlineSeed="testimonials" />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
