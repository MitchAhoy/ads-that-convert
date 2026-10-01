import PricingPlanCard from "@/components/ui/PricingPlanCard";
import QuoteAttribution from "@/components/ui/QuoteAttribution";
import FaqAccordion from "@/components/sections/FaqAccordion";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { managementPlanFeatures, pricingFaqItems, pricingNotes, pricingPlans } from "@/lib/pricing";
import { generateMeta } from "@/lib/seo";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Plan content lives in lib/pricing.js (shared with the WebMCP tools).
const auditPlan = pricingPlans.find((plan) => plan.title === "Account Audit");
const managementPlans = pricingPlans.filter((plan) => plan !== auditPlan);
const [leadNote, ...termsNotes] = pricingNotes;

const rolloutSteps = [
  {
    title: "Discovery + audit",
    description: "Deep review of your account, funnel, offer, and customer journey to identify the highest-impact opportunities.",
  },
  {
    title: "Strategy + build",
    description: "Campaign architecture, tracking validation, ad copy planning, and launch prep aligned to pipeline goals.",
  },
  {
    title: "Launch + optimize",
    description: "Rapid iteration on search terms, bidding, audiences, and messaging with a strict focus on qualified revenue.",
  },
  {
    title: "Reporting + roadmap",
    description: "Clear reporting and a forward plan so your team always knows what is working and what comes next.",
  },
];

export function generateMetadata() {
  return generateMeta({
    title: "Pricing | Ads That Convert",
    description:
      "Transparent SaaS Google Ads management pricing built to grow qualified pipeline and revenue.",
    path: "/pricing",
  });
}

function PricingPlans() {
  return (
    <section aria-label="Pricing plans" className="pt-8 pb-12 sm:pt-10">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5.5">
          <PricingPlanCard
            elevated
            plans={managementPlans}
            trustText="Free 15-min strategy call · No commitment"
            featuresTitle="Every management plan includes"
            features={[leadNote, ...managementPlanFeatures]}
          />

          {/* One-off audit, set apart from the retainers as a lower-commitment way in. */}
          <PricingPlanCard plan={auditPlan} eyebrow="Not ready for management? Start with an audit" />
        </div>

        <p className="mt-7 text-center text-sm text-fine">{termsNotes.join(" ")}</p>

        <QuoteAttribution
          compact
          className="mt-9 border-t border-border pt-7"
          quote="Not only was he able to deliver paying customers below our target cost per acquisition, but he is incredible at helping us stay on top of what's going on in the account."
          person="Olly"
          role="Founder"
          company="Senja"
          companyLogoSrc="/client-logos/senja.png"
          companyLogoAlt="Senja logo"
          avatarSrc="/client pfp/olly.png"
          avatarAlt="Olly"
        />
      </div>
    </section>
  );
}

// Editorial list (DESIGN.md §7.7) with numbered steps.
function Onboarding() {
  return (
    <section aria-labelledby="rollout-heading" className="pt-16 pb-12 sm:pt-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px]">
          <h2 id="rollout-heading" className="font-display text-h2 text-balance text-ink">
            What onboarding looks like
          </h2>
          <p className="mt-4 max-w-[32em] text-lg leading-[1.5] text-pretty text-body">
            The first 30 days are structured to move fast without sacrificing strategic clarity.
          </p>
        </div>

        <ol className="mt-10 border-t border-border sm:mt-14">
          {rolloutSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-x-10"
            >
              <h3 className="flex items-baseline gap-4 text-xl font-bold text-ink sm:text-2xl lg:col-span-5">
                <span className="w-6 shrink-0 text-sm font-medium text-body tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
              </h3>
              <div className="pl-10 lg:col-span-7 lg:pl-0">
                <p className="max-w-[36em] text-copy text-pretty text-body">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* No visible header: the page opens straight on the plans. The h1 stays for screen readers and SEO. */}
      <h1 className="sr-only">Straightforward pricing for SaaS Google Ads management</h1>

      <GridFrame bleedTop>
        <PricingPlans />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <ClientLogoMarquee title="You're in good company" />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <Onboarding />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <FaqAccordion
          numbered
          title="Questions founders ask before starting"
          items={pricingFaqItems}
          sidebar={{ href: SCHEDULE_CALL_URL }}
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>
    </>
  );
}
