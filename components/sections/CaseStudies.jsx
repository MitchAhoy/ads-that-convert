import CaseStudyCard from "@/components/ui/CaseStudyCard";

const caseStudies = [
  {
    imageSrc: "/case study images/$3664 in new mrr per month.svg",
    imageAlt: "Case study showing $3,664 in new monthly recurring revenue from non-branded terms",
    href: "/results/b2b-saas-case-study",
  },
  {
    imageSrc: "/case study images/2.89 payback period.svg",
    imageAlt: "Case study showing $2,219 in new monthly recurring revenue in 30 days with a 2.89-month payback",
    href: "/results/ai-b2b-saas-case-study",
  },
  {
    imageSrc: "/case study images/2x B2B pipeline.svg",
    imageAlt: "Case study showing 2x B2B pipeline growth in under two months",
    href: "/results/b2b-saas-leads",
  },
  {
    imageSrc: "/case study images/$50k rev per month.svg",
    imageAlt: "Case study showing a brand-new account reaching $50,000+ in monthly revenue",
    href: "/results/50k-ecommerce-google-ads",
  },
];

export default function CaseStudies() {
  return (
    <section aria-labelledby="case-studies-title" className="py-5 sm:py-6">
      <h2 id="case-studies-title" className="sr-only">
        Case studies
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.imageSrc}
            imageSrc={study.imageSrc}
            imageAlt={study.imageAlt}
            href={study.href}
            ctaLabel="Read More"
          />
        ))}
      </div>
    </section>
  );
}
