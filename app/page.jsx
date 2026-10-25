import HomeHero from "@/components/home/HomeHero";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeResults from "@/components/home/HomeResults";
import HomeLogos from "@/components/home/HomeLogos";
import HomePersonOnCall from "@/components/home/HomePersonOnCall";
import HomeProcess from "@/components/home/HomeProcess";
import HomeWhoFor from "@/components/home/HomeWhoFor";
import HomeWhyFounders from "@/components/home/HomeWhyFounders";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { hpBookingBarButton } from "@/components/home/primitives";
import { defaultFaqItems, flattenFaqAnswer } from "@/lib/faqs";
import { generateMeta } from "@/lib/seo";

export function generateMetadata() {
  return generateMeta({
    title: "SaaS Google Ads Agency | Ads That Convert",
    description:
      "I run Google Ads for SaaS companies myself and report in trials, pipeline and new MRR. Month-to-month, from $2,000.",
    path: "/",
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
  image: "https://www.adsthatconvert.co/og-image.png",
  logo: "https://www.adsthatconvert.co/logo-512.png",
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
      <main className="bg-white">
        <HomeHero />
        <HomeTestimonials />
        <HomeResults />
        <HomeLogos />
        <HomePersonOnCall />
        <HomeProcess />
        <HomeWhoFor />
        <HomeWhyFounders />
        <HomeFaq />
        <HomeFinalCta />
      </main>

      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
