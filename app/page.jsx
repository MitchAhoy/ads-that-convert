import { CircleDollarSign, Eye, Layers3, LineChart, Microscope, ShieldCheck, Smartphone, TrendingUp, UsersRound } from "lucide-react";
import Hero from "@/components/sections/Hero";
import AsSeenInLogos from "@/components/sections/AsSeenInLogos";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Testimonials from "@/components/sections/Testimonials";
import LeftRightFeature from "@/components/sections/LeftRightFeature";
import WhoIsThisFor from "@/components/sections/WhoIsThisFor";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";
import FloatingOptInWidget from "@/components/forms/FloatingOptInWidget";
import { defaultFaqItems } from "@/lib/faqs";
import { generateMeta } from "@/lib/seo";

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

const resultsFirstPoints = [
  {
    text: "8+ years paid media experience across 85+ verticals.",
    Icon: ShieldCheck,
  },
  {
    text: "Seasoned with tens of millions of dollars in profitable ad spend.",
    Icon: CircleDollarSign,
  },
  {
    text: "Want a reference? Ask and I can connect you with current clients.",
    Icon: UsersRound,
  },
];

const oneThingPoints = [
  {
    text: "Laser-focused targeting aimed at prospects with urgent problems.",
    Icon: Smartphone,
  },
  {
    text: "Granular attribution tied directly to pipeline and sales.",
    Icon: Eye,
  },
  {
    text: "Frequent reporting that keeps campaign performance clear.",
    Icon: TrendingUp,
  },
];

const rinseRepeatPoints = [
  {
    text: "Methodical keyword research and campaign planning.",
    Icon: Microscope,
  },
  {
    text: "Meticulously crafted campaigns that deliver ready-to-buy leads.",
    Icon: Layers3,
  },
  {
    text: "Custom reporting that builds a feedback loop for iteration.",
    Icon: LineChart,
  },
];

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
      text: item.answer,
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
      <Hero />
      <Testimonials />

      <LeftRightFeature
        title="Obsessed with results"
        description="A results-first agency. You will never hear noise about vanity engagement metrics, only sales and qualified lead performance."
        points={resultsFirstPoints}
        quote="We would highly recommend this team to any SaaS business serious about paid growth."
        person="Dave Batchelor"
        role="Co-Founder"
        company="DialMyCalls"
        companyLogoSrc="/client-logos/dialmycalls.png"
        companyLogoAlt="DialMyCalls logo"
        avatarSrc="/client pfp/dave batchelor.png"
        avatarAlt="Dave Batchelor"
        imageSrc="/left right 1.svg"
        imageAlt="Dashboard placeholder showing conversion funnel insights"
      />

      <LeftRightFeature
        reverse
        sectionId="really-good-at-1-thing"
        title="Really good at 1-thing"
        description="I do one thing extremely well: building world-class Google Ads campaigns for SaaS companies. Results only, no vanity metrics."
        points={oneThingPoints}
        quote="Working with Mitch from Ads That Convert has been a game-changer for our startup."
        person="Dominic Whyte"
        role="Founder"
        company="Fillout"
        companyLogoSrc="/client-logos/fillout.png"
        companyLogoAlt="Fillout logo"
        companyLogoClassName="h-8 sm:h-10"
        avatarSrc="/client pfp/dominic whyte.png"
        avatarAlt="Dominic Whyte"
        imageSrc="/left right 2.svg"
        imageAlt="Revenue by day and acquisition channel dashboard"
      />

      <LeftRightFeature
        title="A rinse-and-repeat system"
        description="I've done this so many times, there's no guess work. It's a matter of applying my tried and proven Google Ads system into your business."
        points={rinseRepeatPoints}
        quote="Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!"
        person="Matt Robinson"
        role="Co-Founder"
        company="Live Tourney"
        companyLogoSrc="/client-logos/livetourney.svg"
        companyLogoAlt="Live Tourney logo"
        avatarSrc="/client pfp/matt robinson.png"
        avatarAlt="Matt Robinson"
        imageSrc="/left right 3.svg"
        imageAlt="Sessions overview and statistics dashboard"
      />

      <WhoIsThisFor />
      <TestimonialSlider />
      <AsSeenInLogos />
      <FaqAccordion />
      <CTABanner />

      <FloatingOptInWidget
        triggerAfterId="dont-take-my-word-for-it"
        mobileTriggerAfterId="really-good-at-1-thing"
        title="Are you wasting $2,000+/month on Google Ads and don't know it?"
        description="100+ SaaS accounts audited. The same 6 budget leaks, every single time. This guide shows you exactly where your money is going and how to plug those holes."
      />
    </>
  );
}
