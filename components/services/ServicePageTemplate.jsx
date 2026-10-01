import { Fragment } from "react";
import PageHero from "@/components/sections/PageHero";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import ResultsProof from "@/components/sections/ResultsProof";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import {
  OtherServices,
  ServiceCampaignTypes,
  ServiceFit,
  ServiceLeaks,
  ServicePricing,
  ServiceProcess,
  ServiceSnapshots,
} from "@/components/services/ServiceSections";
import { serviceVisuals } from "@/components/services/serviceVisuals";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

function ServiceProof({ proof }) {
  if (proof.mode === "case-studies") {
    return (
      <ResultsProof sectionId="service-results" title={proof.title} description={proof.description} quote={proof.quote} />
    );
  }
  return <ServiceSnapshots {...proof} />;
}

// Shared shell for every /services/[slug] page (DESIGN.md §7.14). Copy comes
// from lib/services.js, mockups from components/services/serviceVisuals.js.
export default function ServicePageTemplate({ service, otherServices = [] }) {
  const visuals = serviceVisuals[service.slug] ?? {};
  const HeroVisual = visuals.Hero;
  const quotedClients = [service.proof, service.leaks, service.process, service.campaignTypes]
    .map((section) => section.quote?.person)
    .filter(Boolean);

  const sections = [
    <ClientLogoMarquee key="logos" />,
    <ServiceProof key="proof" proof={service.proof} />,
    <ServiceLeaks key="leaks" {...service.leaks} />,
    <ServiceProcess key="process" {...service.process} visuals={visuals.steps} />,
    <ServiceCampaignTypes key="campaigns" {...service.campaignTypes} />,
    <ServiceFit key="fit" {...service.fit} />,
    <ServicePricing key="pricing" serviceName={service.name} adSpendBilledBy={service.pricing.adSpendBilledBy} />,
    <TestimonialSlider key="testimonials" excludeNames={quotedClients} />,
    <FaqAccordion
      key="faq"
      numbered
      title={service.faq.title}
      items={service.faq.items}
      sidebar={{ href: SCHEDULE_CALL_URL }}
    />,
    otherServices.length ? <OtherServices key="other" services={otherServices} /> : null,
    <CTABanner key="cta" {...service.cta} />,
  ].filter(Boolean);

  return (
    <>
      <GridFrame bleedTop>
        <PageHero
          id="service-page-title"
          pill={service.hero.pill}
          title={service.hero.title}
          description={service.hero.description}
          secondaryLink={service.hero.secondaryLink}
          aside={HeroVisual ? <HeroVisual /> : null}
        />
      </GridFrame>

      {sections.map((section) => (
        <Fragment key={section.key}>
          <GridDivider />
          <GridFrame>{section}</GridFrame>
        </Fragment>
      ))}
    </>
  );
}
