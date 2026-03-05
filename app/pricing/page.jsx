import PricingPlanCard from "@/components/ui/PricingPlanCard";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import { generateMeta } from "@/lib/seo";

const plans = [
  {
    title: "Account Audit",
    price: "$900",
    description: (
      <>
        One-time Google Ads audit for SaaS teams.
      </>
    ),
    ctaLabel: "Purchase Audit",
    ctaHref: "https://buy.stripe.com/4gMcN64EreqV6gQfWW2Ry0n",
    className: "order-3 xl:order-1",
    features: [
      "Full account diagnostic (campaigns, structure, settings)",
      "Tracking and attribution accuracy check",
      "Wasted spend + quick-win opportunities report",
      "Prioritized 30-day action plan",
      "60-minute walkthrough call with Q&A",
    ],
  },
  {
    title: "Growth",
    price: "USD$1,500",
    cadence: "mo",
    description: "up to USD$25,000 monthly ad spend",
    ctaLabel: "Schedule a call",
    ctaHref: SCHEDULE_CALL_URL,
    className: "order-1 xl:order-2",
    highlighted: true,
    features: [
      "End-to-end campaign set up",
      "Direct communication via Slack",
      "Transparent reporting w/ custom dashboards",
      "Access to all project management tasks",
      "No lock-in contracts or minimum terms",
    ],
  },
  {
    title: "Scale",
    price: "Custom",
    description: "USD$25,000+ monthly ad spend",
    ctaLabel: "Schedule a call",
    ctaHref: SCHEDULE_CALL_URL,
    className: "order-2 xl:order-3",
    features: [
      "End-to-end campaign set up",
      "Direct communication via Slack",
      "Transparent reporting w/ custom dashboards",
      "Access to all project management tasks",
      "No lock-in contracts or minimum terms",
    ],
  },
];

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

const faqs = [
  {
    question: "Are there long-term contracts or minimum commitments?",
    answer:
      "No. Everything is month-to-month, so you stay because performance is strong, not because you're locked in. If you decide to stop, you can cancel anytime with 28 days' notice.",
  },
  {
    question: "How much should I invest in ad spend to get results?",
    answer:
      "It varies by industry and offer because CPCs, conversion rates, sales cycles, and targets all affect required spend. As a practical starting point, most SaaS businesses begin in the $3,000-$5,000/month range, then scale once we identify profitable segments and stable conversion performance.",
  },
  {
    question: "How long after I sign up will I start seeing results?",
    answer:
      "The goal is to get you onboarded and live as fast as possible. Most businesses have campaigns live within 7 days so data starts flowing quickly. Timelines can extend when tracking setups are complex or when ad assets and approvals take longer to finalize.",
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
      <section className="pt-4 pb-5 sm:pt-5 sm:pb-6" aria-labelledby="pricing-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <h1 id="pricing-heading" className="mt-3 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.15] text-zinc-950">
            Straightforward pricing for SaaS Google Ads management
          </h1>
          <p className="mt-5 max-w-[70ch] text-base sm:text-md text-zinc-700">
            Whether you&apos;re spending $5,000/mth or $100,000/mth - there are no hidden fees or surprises.
          </p>
        </div>
      </section>

      <section className="py-5 sm:py-6" aria-label="Pricing plans">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-stretch gap-5 px-4 sm:px-6 lg:px-8 xl:grid-cols-3">
          {plans.map((plan) => (
            <PricingPlanCard key={plan.title} {...plan} />
          ))}
        </div>
        <p className="mx-auto mt-6 w-full max-w-[1120px] px-4 text-center text-base text-zinc-700 sm:px-6 lg:px-8">
          All plans are led directly by Mitch. No junior handoffs.
        </p>
      </section>

      <ClientLogoWall className="pt-0" />

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

      <FaqAccordion title="Questions founders ask before starting" items={faqs} />
    </>
  );
}
