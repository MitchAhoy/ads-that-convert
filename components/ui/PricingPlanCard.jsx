import PlanCta from "@/components/pricing/PlanCta";
import PlanFeatureList from "@/components/pricing/PlanFeatureList";
import PlanPrice from "@/components/pricing/PlanPrice";

const shadow = {
  stage: "shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)]",
  card: "shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]",
};

function Tier({ plan, eyebrow, showCta = true, className = "" }) {
  return (
    <div className={`flex flex-col px-6 pt-6 pb-7 sm:px-7 sm:pt-7 ${className}`}>
      {eyebrow ? <p className="mb-2 text-sm leading-[1.5] font-medium text-muted">{eyebrow}</p> : null}
      <h2 className="text-xl font-bold text-ink">{plan.title}</h2>
      <PlanPrice price={plan.price} cadence={plan.cadence} className="mt-5" />
      <p className="mt-3 text-copy leading-[1.5] text-body">{plan.description}</p>
      {showCta ? (
        <div className="mt-auto pt-8">
          <PlanCta ctaHref={plan.ctaHref} ctaLabel={plan.ctaLabel} />
        </div>
      ) : null}
    </div>
  );
}

// Pricing card (DESIGN.md §7.11). Two columns split by a hairline: either two
// tiers side by side with their shared features and one shared CTA underneath
// (`plans`; every tier books the same call), or one tier with its own features
// beside it (`plan`).
export default function PricingPlanCard({
  plans,
  plan,
  eyebrow,
  features,
  featuresTitle,
  trustText,
  elevated = false,
}) {
  const divider = "border-t border-border sm:border-t-0 sm:border-l";

  return (
    <article
      className={`overflow-hidden rounded-3xl border border-border bg-white ${elevated ? shadow.stage : shadow.card}`}
    >
      {plans ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {plans.map((tier, index) => (
              <Tier key={tier.title} plan={tier} showCta={false} className={index > 0 ? divider : ""} />
            ))}
          </div>
          <div className="border-t border-border px-6 pt-6 pb-7 sm:px-7 sm:pt-7">
            {featuresTitle ? <h3 className="text-lg font-bold text-ink">{featuresTitle}</h3> : null}
            <PlanFeatureList features={features} className="mt-5 sm:grid-cols-2 sm:gap-x-10" />

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PlanCta ctaHref={plans[0].ctaHref} ctaLabel={plans[0].ctaLabel} highlighted />
              {trustText ? <p className="text-sm text-fine">{trustText}</p> : null}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Tier plan={plan} eyebrow={eyebrow} />
          {/* Centred against the tier column so the shorter list doesn't leave a gap below it. */}
          <div className={`px-6 pt-6 pb-7 sm:flex sm:items-center sm:px-7 sm:py-7 ${divider}`}>
            <PlanFeatureList features={features ?? plan.features} />
          </div>
        </div>
      )}
    </article>
  );
}
