import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { flattenFaqAnswer } from "@/lib/faqs";
import { generateMeta } from "@/lib/seo";
import { getServiceBySlug, getServiceSlugs, services } from "@/lib/services";

const BASE_URL = "https://www.adsthatconvert.co";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return generateMeta({ title: "Service not found | Ads That Convert", path: `/services/${slug}`, noIndex: true });
  }

  return generateMeta({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${slug}`,
    // Non-indexable services stay crawlable ("noindex, follow").
    noIndex: !service.indexable,
    follow: true,
  });
}

function buildSchema(service) {
  const url = `${BASE_URL}/services/${service.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name} management for SaaS`,
      serviceType: `${service.name} management`,
      description: service.seo.description,
      url,
      provider: { "@type": "ProfessionalService", name: "Ads That Convert", url: `${BASE_URL}/` },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: service.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: flattenFaqAnswer(item.answer) },
      })),
    },
  ];
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((other) => other.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(service)) }}
      />
      <ServicePageTemplate service={service} otherServices={otherServices} />
    </>
  );
}
