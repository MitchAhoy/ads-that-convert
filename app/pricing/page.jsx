import PricingPlanCard from "@/components/ui/PricingPlanCard";
import FaqAccordion from "@/components/sections/FaqAccordion";
import SharedClientLogoSection from "@/components/sections/SharedClientLogoSection";
import PageHeadline from "@/components/ui/PageHeadline";
import { pricingFaqItems, pricingPlans } from "@/lib/pricing";
import { generateMeta } from "@/lib/seo";

// Layout-only props; plan content lives in lib/pricing.js.
const planLayout = {
  "Account Audit": { className: "order-3 xl:order-1" },
  Growth: { className: "order-1 xl:order-2", highlighted: true },
  Scale: { className: "order-2 xl:order-3" },
};

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

export default function PricingPage() {
  return (
    <>
      <PageHeadline
        id="pricing-heading"
        title="Straightforward pricing for SaaS Google Ads management"
      />

      <section className="py-5 sm:py-6" aria-label="Pricing plans">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-stretch gap-5 px-4 sm:px-6 lg:px-8 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.title} {...plan} {...planLayout[plan.title]} />
          ))}
        </div>
        <p className="mx-auto mt-6 w-full max-w-[1120px] px-4 text-center text-base text-zinc-700 sm:px-6 lg:px-8">
          All plans are led directly by Mitch. No junior handoffs.
        </p>
      </section>

      <SharedClientLogoSection />

      <section className="py-5 sm:py-6" aria-labelledby="rollout-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <h2 id="rollout-heading" className="text-2xl font-semibold text-zinc-950 sm:text-3xl">
            What onboarding looks like
          </h2>
          <p className="mt-4 max-w-[70ch] text-base sm:text-md text-zinc-700">
            The first 30 days are structured to move fast without sacrificing strategic clarity.
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
            {rolloutSteps.map((step, index) => (
              <li
                key={step.title}
                className="onboarding-card rounded-2xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6"
                style={{ "--stagger-delay": `${index * 90}ms` }}
              >
                <h3 className="text-xl font-semibold text-zinc-950">{step.title}</h3>
                <p className="mt-3 text-base text-zinc-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqAccordion title="Questions founders ask before starting" items={pricingFaqItems} />
    </>
  );
}
