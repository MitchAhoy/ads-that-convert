import Testimonials from "@/components/sections/Testimonials";
import TextTestimonialsGrid from "@/components/sections/TextTestimonialsGrid";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { generateMeta } from "@/lib/seo";

export function generateMetadata() {
  return generateMeta({
    title: "Testimonials | Ads That Convert",
    description: "Real feedback from SaaS founders and marketing teams we have supported.",
    path: "/testimonials",
  });
}

export default function TestimonialsPage() {
  return (
    <>
      {/* No visible header: the page opens straight on the videos. The h1 stays for screen readers and SEO. */}
      <h1 className="sr-only">In their own words</h1>

      <GridFrame bleedTop>
        <Testimonials title="" />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <TextTestimonialsGrid title="" description="" />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <ClientLogoMarquee
          title={
            <>
              Every quote on this page is from a real client.{" "}
              <span className="text-muted">Here are some of their companies.</span>
            </>
          }
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>
    </>
  );
}
