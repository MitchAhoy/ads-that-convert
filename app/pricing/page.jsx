import HomeLogos from "@/components/home/HomeLogos";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { hpBookingBarButton } from "@/components/home/primitives";
import { PricingHero, PricingOnboarding, PricingPlans } from "@/components/pricing/PricingSections";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { pricingFaqItems } from "@/lib/pricing";
import { generateMeta } from "@/lib/seo";

// /pricing on the homepage system (DESIGN.md §16.9). Plan content lives in
// lib/pricing.js (shared with the WebMCP tools).

export function generateMetadata() {
  return generateMeta({
    title: "Pricing | Ads That Convert",
    description:
      "Transparent SaaS Google Ads management pricing built to grow qualified pipeline and revenue.",
    path: "/pricing",
  });
}

// HomeFaq takes answers as arrays of paragraphs.
const faqItems = pricingFaqItems.map(({ question, answer }) => ({ question, answer: [answer] }));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="bg-white">
        <PricingHero />
        <PricingPlans />
        <HomeLogos />
        <PricingOnboarding eyebrow="01 · Onboarding" marker={0} />
        <HomeFaq eyebrow="02 · FAQ" marker={1} lead="Questions I get" accent="before we start." items={faqItems} />
        <HomeFinalCta underlineSeed="pricing" />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
