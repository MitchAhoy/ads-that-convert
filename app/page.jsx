import Hero from "@/components/sections/Hero";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Testimonials from "@/components/sections/Testimonials";
import ResultsProof from "@/components/sections/ResultsProof";
import SeniorHands from "@/components/sections/SeniorHands";
import FitThenBuild from "@/components/sections/FitThenBuild";
import WhoIsThisFor from "@/components/sections/WhoIsThisFor";
import PricingCta from "@/components/sections/PricingCta";
import WhyFoundersStay from "@/components/sections/WhyFoundersStay";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";
import FloatingOptInWidget from "@/components/forms/FloatingOptInWidget";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { defaultFaqItems, flattenFaqAnswer } from "@/lib/faqs";
import { generateMeta } from "@/lib/seo";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

export function generateMetadata() {
  return generateMeta({
    title: "SaaS Google Ads Agency | Ads That Convert",
    description:
      "We're a specialized SaaS Google Ads agency dedicated to scaling your SaaS business with high-converting campaigns.",
    path: "/",
    image:
      "https://cdn.prod.website-files.com/65a9d6c9d617d2e8d8505f6a/65b23f39f1362d0152e8e771_favicon.png",
    keywords: [
      "SaaS Google Ads agency",
      "Google Ads for SaaS",
      "SaaS PPC agency",
      "paid advertising for SaaS",
    ],
  });
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ads That Convert",
  image:
    "https://cdn.prod.website-files.com/65a9d6c9d617d2e8d8505f6a/65b23f39f1362d0152e8e771_favicon.png",
  logo: "https://cdn.prod.website-files.com/65a9d6c9d617d2e8d8505f6a/65b23f39f1362d0152e8e771_favicon.png",
  url: "https://www.adsthatconvert.co/",
  telephone: "+61290984766",
  email: "mitch@adsthatconvert.co",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 302, 13/15 Wentworth Avenue",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    postalCode: "2000",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.linkedin.com/company/ads-that-convert"],
  priceRange: "$$",
  description:
    "Ads That Convert is a Google Ads marketing agency specializing in helping SaaS businesses generate more customers and MRR through targeted campaigns.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "19",
  },
  knowsAbout: [
    "Google Ads",
    "Paid Advertising",
    "YouTube Ads",
    "Lead Generation",
    "Conversion Rate Optimization",
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: defaultFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: flattenFaqAnswer(item.answer),
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GridFrame bleedTop>
        <Hero />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <Testimonials title="Founders and marketers, on the record" />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <ResultsProof />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <ClientLogoMarquee />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <SeniorHands />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <FitThenBuild />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <WhoIsThisFor />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <PricingCta />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <WhyFoundersStay />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <TestimonialSlider />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <FaqAccordion numbered sidebar={{ href: SCHEDULE_CALL_URL }} />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>

      <FloatingOptInWidget
        triggerAfterId="dont-take-my-word-for-it"
        mobileTriggerAfterId="results"
        title="Are you wasting $2,000+/month on Google Ads and don't know it?"
        description="100+ SaaS accounts audited. The same 6 budget leaks, every single time. This guide shows you exactly where your money is going and how to plug those holes."
      />
    </>
  );
}
