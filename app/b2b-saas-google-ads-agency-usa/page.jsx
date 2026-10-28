import HomePageHero from "@/components/home/HomePageHero";
import HomeLogos from "@/components/home/HomeLogos";
import HomeResults from "@/components/home/HomeResults";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { hpBookingBarButton } from "@/components/home/primitives";
import { LocationAnswer, LocationCoverage, MarketPill } from "@/components/locations/LocationSections";
import { ServiceCampaigns, ServicePricing, ServiceProcess } from "@/components/services/ServiceSections";
import { serviceVisuals } from "@/components/services/serviceVisuals";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { flattenFaqAnswer } from "@/lib/faqs";
import { usaPage as page } from "@/lib/locations";
import { generateMeta } from "@/lib/seo";

// US B2B software page (DESIGN.md §16.17). Its angle is B2B SaaS and tech
// (pipeline, CRM, offline conversions), so it doesn't compete with the
// homepage for "saas google ads agency". Copy lives in lib/locations.js;
// services, process and pricing reuse the Google Ads service page sections.

const BASE_URL = "https://www.adsthatconvert.co";
const PAGE_URL = `${BASE_URL}${page.path}`;
const US = { "@type": "Country", name: "United States" };

export function generateMetadata() {
  return generateMeta({
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    path: page.path,
  });
}

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Google Ads management for B2B SaaS and software companies",
    serviceType: "Google Ads management",
    description: page.seo.description,
    url: PAGE_URL,
    audience: { "@type": "BusinessAudience", audienceType: "B2B SaaS and software companies" },
    provider: {
      "@type": "ProfessionalService",
      name: "Ads That Convert",
      url: `${BASE_URL}/`,
      founder: { "@type": "Person", name: "Mitch Cartwright" },
    },
    areaServed: US,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "B2B SaaS Google Ads in the USA", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: flattenFaqAnswer(item.answer) },
    })),
  },
];

export default function B2bSaasGoogleAdsUsaPage() {
  const visuals = serviceVisuals["google-ads"];
  const { hero, answer, proof, services, process, coverage, faq, cta } = page;

  // Section labels are numbered in page order and each H2 gets its own
  // highlighter stroke (marker = position), as on the service pages.
  const label = (index, text) => `${String(index + 1).padStart(2, "0")} · ${text}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="bg-white">
        <HomePageHero
          pill={<MarketPill label="B2B SaaS and tech" note="Sales-led and PLG" />}
          lead={hero.lead}
          accent={hero.accent}
          description={hero.description}
          showBooking
          showAvatars
          secondaryLink={{ href: "#results", label: "See client results" }}
          underlineSeed="market:usa"
        />
        <HomeLogos />
        <LocationAnswer eyebrow={label(0, "Short answer")} marker={0} {...answer} />
        <HomeResults eyebrow={label(1, "Results")} marker={1} lead={proof.heading.lead} accent={proof.heading.accent} intro={proof.description} />
        <ServiceCampaigns eyebrow={label(2, "Services")} marker={2} {...services} visuals={visuals} />
        <ServiceProcess eyebrow={label(3, "How I work")} marker={3} {...process} visuals={visuals} />
        <LocationCoverage eyebrow={label(4, "US teams")} marker={4} {...coverage} />
        <ServicePricing eyebrow={label(5, "Pricing")} marker={5} serviceName="Google Ads" adSpendBilledBy="Google" />
        <HomeTestimonials
          eyebrow={label(6, "Clients")}
          marker={6}
          ctaBody="I'll tell you on the call whether Google Ads will work for your product, and what it would take."
        />
        <HomeFaq eyebrow={label(7, "FAQ")} marker={7} lead={faq.heading.lead} accent={faq.heading.accent} items={faq.items} />
        <HomeFinalCta lead={cta.lead} accent={cta.accent} description={cta.description} underlineSeed="market:usa" />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
