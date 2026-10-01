import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { ResultCard } from "@/components/sections/ResultsProof";
import QuoteAttribution from "@/components/ui/QuoteAttribution";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { managementPlanFeatures, pricingPlans } from "@/lib/pricing";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Sections for /services/[slug] (DESIGN.md §7.14). Each takes its copy from the
// matching block in lib/services.js.

const container = "mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8";
const level2 = "shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]";

function SectionIntro({ id, title, titleAside, description }) {
  return (
    <div className="max-w-[680px]">
      <h2 id={id} className="font-display text-h2 text-balance text-ink">
        {title}
        {titleAside ? <span className="block text-muted">{titleAside}</span> : null}
      </h2>
      {description ? <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">{description}</p> : null}
    </div>
  );
}

function SectionQuote({ quote, className = "mt-6 border-t border-border pt-5.5" }) {
  if (!quote) return null;
  return (
    <QuoteAttribution
      compact
      className={className}
      {...quote}
      companyLogoAlt={`${quote.company} logo`}
      avatarAlt={quote.person}
    />
  );
}

// ─── Proof: account snapshots (channels without a written case study) ────

export function ServiceSnapshots({ title, description, snapshots = [], footnote, quote }) {
  return (
    <section aria-labelledby="service-proof-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <div className="mb-10 sm:mb-14">
          <SectionIntro id="service-proof-title" title={title} description={description} />
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {snapshots.map((snapshot) => (
            <ResultCard key={snapshot.label} {...snapshot} />
          ))}
        </ul>
        {footnote ? <p className="mt-7 text-sm text-fine">{footnote}</p> : null}
        <SectionQuote quote={quote} className="mt-9 border-t border-border pt-7" />
      </div>
    </section>
  );
}

// ─── Leaks: editorial list (§7.7) ────────────────────────────────────────

export function ServiceLeaks({ title, titleAside, description, items, quote }) {
  return (
    <section aria-labelledby="service-leaks-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="service-leaks-title" className="font-display text-h2 text-balance text-ink lg:col-span-5">
            {title}
            {titleAside ? <span className="block text-muted">{titleAside}</span> : null}
          </h2>
          <div className="lg:col-span-7 lg:self-end">
            <p className="max-w-[32em] text-lg leading-[1.5] text-pretty text-body">{description}</p>
          </div>
        </div>

        <ul className="mt-10 border-t border-border sm:mt-14">
          {items.map(({ title: itemTitle, description: itemDescription }) => (
            <li
              key={itemTitle}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:py-8 lg:grid-cols-12 lg:gap-x-10"
            >
              <h3 className="text-xl font-bold text-ink sm:text-2xl lg:col-span-5">{itemTitle}</h3>
              <div className="lg:col-span-7">
                <p className="max-w-[36em] text-copy text-pretty text-body">{itemDescription}</p>
              </div>
            </li>
          ))}
        </ul>

        <SectionQuote quote={quote} className="mt-9 pt-0" />
      </div>
    </section>
  );
}

// ─── Process: numbered feature cards with mockups (§7.3) ─────────────────

export function ServiceProcess({ title, description, steps, visuals = [], quote }) {
  return (
    <section aria-labelledby="service-process-title" className="py-12">
      <div className={container}>
        <SectionIntro id="service-process-title" title={title} description={description} />

        <ol className="mt-10 grid grid-cols-1 gap-5.5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Visual = visuals[index];
            return (
              <li
                key={step.title}
                className={`flex flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 ${level2}`}
              >
                <div className="h-52 overflow-hidden rounded-[18px] bg-surface p-3.5" aria-hidden="true">
                  {Visual ? <Visual /> : null}
                </div>
                <div className="flex-1 px-4 pt-5.5 pb-6">
                  <h3 className="flex items-baseline gap-2.5 text-xl font-bold text-ink">
                    <span className="text-sm font-medium tracking-normal text-body tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-copy leading-[1.5] text-body">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <SectionQuote quote={quote} />
      </div>
    </section>
  );
}

// ─── Campaign types: flat cards (§6 level 0) ─────────────────────────────

export function ServiceCampaignTypes({ title, description, items, quote }) {
  return (
    <section aria-labelledby="service-campaigns-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <SectionIntro id="service-campaigns-title" title={title} description={description} />

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-white px-6 pt-5.5 pb-6">
              <p className="text-sm font-medium leading-[1.5] text-muted">{item.label}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-copy leading-[1.5] text-body">{item.description}</p>
            </li>
          ))}
        </ul>

        <SectionQuote quote={quote} />
      </div>
    </section>
  );
}

// ─── Pricing: same plans on every channel (lib/pricing.js) ───────────────

const managementTiers = pricingPlans.filter((plan) => plan.title === "Growth" || plan.title === "Scale");

export function ServicePricing({ serviceName, adSpendBilledBy }) {
  return (
    <section aria-labelledby="service-pricing-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <SectionIntro
          id="service-pricing-title"
          title="One monthly fee, no lock-in"
          description={`${serviceName} management is priced the same as every channel I run. Month-to-month, cancel with 7 days' notice.`}
        />

        <div
          className={`mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white sm:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${level2}`}
        >
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:py-8 lg:border-r lg:border-border">
            {managementTiers.map((tier) => (
              <div key={tier.title}>
                <p className="text-xl font-bold text-ink">{tier.title}</p>
                <p className="mt-3 font-display text-5xl tabular-nums text-ink">
                  {tier.price}
                  {tier.cadence ? <span className="font-sans text-lg text-fine">/{tier.cadence}</span> : null}
                </p>
                <p className="mt-3 text-copy leading-[1.5] text-body">{tier.description}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-6 py-7 sm:px-8 sm:py-8 lg:border-t-0">
            <p className="text-sm font-medium leading-[1.5] text-muted">Both plans include</p>
            <ul className="mt-4 flex flex-col gap-3">
              {managementPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-copy leading-[1.5] text-body">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" />
              <Link href="/pricing" className="border-b border-ink px-1 py-3.75 text-base font-semibold text-ink">
                See full pricing
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-7 text-sm text-fine">
          All prices in USD. Ad spend is paid to {adSpendBilledBy} directly, separately from my fee.
        </p>
      </div>
    </section>
  );
}

// ─── Fit: good fit vs not yet ────────────────────────────────────────────

function FitList({ heading, items, Icon }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-ink">{heading}</h3>
      <ul className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3.5 text-copy leading-[1.5] text-body">
            <Icon aria-hidden="true" className="mt-0.5 h-5.5 w-5.5 shrink-0 text-ink" strokeWidth={1.75} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceFit({ title, description, goodFit, notYet, footnote }) {
  return (
    <section aria-labelledby="service-fit-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <SectionIntro id="service-fit-title" title={title} description={description} />

        <div
          className={`mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white sm:mt-14 md:grid-cols-2 ${level2}`}
        >
          <div className="px-6 py-7 sm:px-8 sm:py-8 md:border-r md:border-border">
            <FitList heading="A good fit" items={goodFit} Icon={Check} />
          </div>
          <div className="border-t border-border px-6 py-7 sm:px-8 sm:py-8 md:border-t-0">
            <FitList heading="Not yet" items={notYet} Icon={Minus} />
          </div>
        </div>

        {footnote ? <p className="mt-6 text-lg leading-[1.5] text-body">{footnote}</p> : null}
      </div>
    </section>
  );
}

// ─── Other channels: internal links between service pages ────────────────

export function OtherServices({ services }) {
  if (!services.length) return null;

  return (
    <section aria-labelledby="other-services-title" className="py-12">
      <div className={container}>
        <h2 id="other-services-title" className="font-display text-h2 text-balance text-ink">
          Other channels I run
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="group relative rounded-2xl border border-border bg-white px-6 pt-5.5 pb-6">
              <h3 className="text-xl font-bold text-ink">
                <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                  {service.name}
                </Link>
              </h3>
              <span className="mt-5 inline-flex items-center gap-1 border-b border-ink text-base font-semibold text-ink transition-colors group-hover:border-body group-hover:text-body">
                See how I run it
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
