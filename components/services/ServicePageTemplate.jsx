import { Fragment } from "react";
import HomeLogos from "@/components/home/HomeLogos";
import HomeResults from "@/components/home/HomeResults";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import { hpBookingBarButton } from "@/components/home/primitives";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import {
  ServiceCampaigns,
  ServiceFit,
  ServiceHero,
  ServiceLeaks,
  ServicePricing,
  ServiceProcess,
  quoteRowProps,
} from "@/components/services/ServiceSections";
import { serviceVisuals } from "@/components/services/serviceVisuals";

// Shared page for every /services/[slug] (DESIGN.md §16.8). It uses the
// homepage system: copy from lib/services.js, mockups from serviceVisuals.js.
// Section labels are numbered in page order, and each H2 gets its own
// highlighter stroke (marker index = position on the page).
export default function ServicePageTemplate({ service }) {
  const visuals = serviceVisuals[service.slug];
  const { hero, proof, leaks, process, campaignTypes, fit, pricing, faq, cta } = service;

  const sections = [
    proof && {
      key: "results",
      label: "Results",
      render: (props) => (
        <HomeResults
          {...props}
          lead={proof.heading.lead}
          accent={proof.heading.accent}
          intro={proof.description}
          quote={{
            ...quoteRowProps(proof.quote),
            aside: "Rezi approved being named. Other clients stay unnamed under NDA. Each result links to its full case study.",
          }}
        />
      ),
    },
    { key: "leaks", label: "Budget leaks", render: (props) => <ServiceLeaks {...props} {...leaks} visuals={visuals} /> },
    { key: "process", label: "Process", render: (props) => <ServiceProcess {...props} {...process} visuals={visuals} /> },
    { key: "campaigns", label: "Campaigns", render: (props) => <ServiceCampaigns {...props} {...campaignTypes} visuals={visuals} /> },
    { key: "fit", label: "Fit", render: (props) => <ServiceFit {...props} {...fit} /> },
    {
      key: "pricing",
      label: "Pricing",
      render: (props) => <ServicePricing {...props} serviceName={service.name} adSpendBilledBy={pricing.adSpendBilledBy} />,
    },
    {
      key: "clients",
      label: "Clients",
      render: (props) => (
        <HomeTestimonials
          {...props}
          ctaBody={`I'll tell you on the call whether ${hero.verdict} will work for you, and what it would take.`}
        />
      ),
    },
    {
      key: "faq",
      label: "FAQ",
      render: (props) => <HomeFaq {...props} lead={faq.heading.lead} accent={faq.heading.accent} items={faq.items} />,
    },
  ].filter(Boolean);

  return (
    <>
      <main className="bg-white">
        <ServiceHero hero={hero} icon={visuals.icon} />
        <HomeLogos />
        {sections.map((section, index) => (
          <Fragment key={section.key}>
            {section.render({
              eyebrow: `${String(index + 1).padStart(2, "0")} · ${section.label}`,
              marker: index,
            })}
          </Fragment>
        ))}
        <HomeFinalCta description={cta.description} underlineSeed={`service:${service.slug}`} />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
