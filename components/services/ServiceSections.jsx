import Link from "next/link";
import { Info, MessagesSquare } from "lucide-react";
import HomeAvatarStack from "@/components/home/HomeAvatarStack";
import { featuredClients, h1Line, valueProps } from "@/components/home/HomeHero";
import { ConversionEvents, FitGauge, MrrChart, StepHeader, cellBase, fade } from "@/components/home/HomeProcess";
import { MrrLine } from "@/components/home/HomeWhoFor";
import { BookButton, QuoteRow, Section, SectionHead, AccentUnderline, focusRing } from "@/components/home/primitives";
import { Check, CampaignWell } from "@/components/services/illustrations/shared";
import { managementPlanFeatures, pricingPlans } from "@/lib/pricing";

// Sections for /services/[slug] (DESIGN.md §16.8), built on the homepage
// system. Copy comes from lib/services.js, mockups from serviceVisuals.js.

const secondaryLinkClass = `px-1 pt-3 pb-1.5 font-hp text-base/5.5 font-medium text-hp-ink underline underline-offset-[5px] sm:border-b sm:border-hp-ink sm:py-2.75 sm:no-underline ${focusRing}`;

// Client logos used in quote bands, at the size they were designed.
const quoteLogos = {
  "/client-logos/fillout.png": { width: 62, height: 26 },
  "/client-logos/dialmycalls.png": { width: 75, height: 30 },
  "/client-logos/livetourney.svg": { width: 92, height: 37 },
};

// lib/services.js quote → QuoteRow props.
export function quoteRowProps({ quote, person, role, company, companyLogoSrc, avatarSrc }) {
  const logoSize = companyLogoSrc ? quoteLogos[companyLogoSrc] : null;
  return {
    avatarSrc,
    quote,
    name: person,
    role,
    company,
    logo: logoSize ? { src: companyLogoSrc, alt: company, ...logoSize } : undefined,
  };
}

const h3Class = "block font-hp text-[21px]/6.75 font-medium tracking-[-0.02em] text-hp-ink";
const bodyClass = "font-hp text-base/6 text-hp-soft";

// ─── Hero ────────────────────────────────────────────────────────────────

export function ServiceHero({ hero, icon }) {
  return (
    <Section labelledBy="hero-title" data-booking-cta-zone className="relative z-10" innerClassName="hp-hero-dots">
      <div className="flex flex-col items-center px-5 pt-12 pb-11 text-center sm:px-8 lg:px-12 lg:pt-24 lg:pb-18">
        <h1 id="hero-title">
          <span className={`block max-w-[350px] sm:max-w-[600px] lg:max-w-200 ${h1Line}`}>
            <span
              aria-hidden="true"
              className="mx-[0.06em] -my-2 inline-flex size-9 -rotate-4 items-center justify-center rounded-[10px] bg-white align-middle shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.08)] sm:size-12 sm:rounded-xl lg:size-14 lg:rounded-[14px]"
            >
              {icon}
            </span>{" "}
            {hero.titleLead}
            <br className="hidden lg:inline" /> {hero.titleMiddle}{" "}
            <AccentUnderline seed={`service:${hero.titleAccent}`}>{hero.titleAccent}</AccentUnderline>
            {hero.titleTail ? (
              <>
                <br className="hidden lg:inline" /> {hero.titleTail}
              </>
            ) : null}
          </span>
        </h1>

        <p className="max-w-85 pt-4.5 font-hp text-[17px]/6.5 text-hp-body sm:max-w-140 lg:max-w-175 lg:pt-5.5 lg:text-lg/7">
          {hero.description}
        </p>

        <ul className="flex w-full max-w-87.5 flex-col gap-3.5 pt-6.5 text-left sm:w-auto sm:max-w-none lg:pt-7.5">
          {valueProps.map((item) => (
            <li key={item.id} className="flex items-start gap-3 sm:items-center lg:gap-3.5">
              {item.tile}
              <span className="font-hp text-base/6 text-hp-text">{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="flex w-full max-w-87.5 flex-col items-center gap-1.5 pt-7 sm:w-auto sm:max-w-none sm:flex-row sm:gap-6 lg:pt-8.5">
          <BookButton size="hero" className="w-full sm:w-auto" />
          {hero.secondaryLink ? (
            <Link href={hero.secondaryLink.href} className={secondaryLinkClass}>
              {hero.secondaryLink.label}
            </Link>
          ) : null}
        </div>

        <p className="max-w-75 pt-2 font-hp text-sm/5.25 text-[#6b7079] sm:max-w-none lg:pt-3.5">
          15 minutes with me, not a sales rep. You&apos;ll leave with a go or no-go on {hero.verdict}.
        </p>

        <div className="flex justify-center pt-4.5 lg:pt-5.5">
          <HomeAvatarStack clients={featuredClients} />
        </div>
      </div>
    </Section>
  );
}

// ─── Budget leaks: five reasons with a mockup each, then an audit card ───

export function ServiceLeaks({ eyebrow, marker, heading, description, items, quote, visuals }) {
  return (
    <Section id="budget-leaks" labelledBy="leaks-title">
      <SectionHead id="leaks-title" marker={marker} eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} intro={description} />

      <ul className="grid grid-cols-1 lg:grid-cols-3 lg:border-t lg:border-hp-line">
        {items.map((item, index) => {
          const Visual = visuals.leaks[index];
          return (
            <li
              key={item.title}
              className={`flex min-w-0 flex-col gap-3 border-t border-hp-line px-5 pt-6.5 pb-7.5 sm:px-8 lg:gap-3.5 lg:border-t-0 lg:px-10 lg:pt-9 lg:pb-10 ${
                index % 3 < 2 ? "lg:border-r lg:border-hp-line" : ""
              } ${index < 3 ? "lg:border-b lg:border-hp-line" : ""}`}
            >
              {Visual ? <Visual /> : null}
              <h3 className="pt-1.5">
                <span className={h3Class}>{item.title}</span>
              </h3>
              <p className={bodyClass}>{item.description}</p>
            </li>
          );
        })}
        <li aria-hidden="true" className="hp-well flex items-center justify-center border-t border-hp-line px-5 py-7 sm:px-8 lg:border-t-0 lg:px-10">
          {visuals.audit}
        </li>
      </ul>

      {quote ? <QuoteRow {...quoteRowProps(quote)} quoteClassName="lg:max-w-205" /> : null}
    </Section>
  );
}

// ─── Process: the first 90 days ──────────────────────────────────────────

export function ServiceProcess({ eyebrow, marker, heading, description, steps, quote, visuals }) {
  const [audit, tracking, build, iterate] = steps;
  const { Build } = visuals;
  return (
    <Section id="how-it-works" labelledBy="process-title">
      <SectionHead id="process-title" marker={marker} eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} intro={description} />

      <div className="flex flex-col lg:border-t lg:border-hp-line">
        <div className="flex flex-col lg:flex-row lg:border-b lg:border-hp-line">
          <div className={`${cellBase} px-5 pb-8 sm:px-8 lg:w-115 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-12 lg:pb-0`}>
            <StepHeader number="01" title={audit.title} muted={audit.muted} description={audit.description} />
            <FitGauge />
          </div>
          <div className={`${cellBase} relative overflow-hidden pl-5 sm:pl-8 lg:min-w-0 lg:flex-1 lg:pl-12`}>
            <StepHeader
              number="02"
              title={tracking.title}
              muted={tracking.muted}
              description={tracking.description}
              className="pr-5 sm:pr-8 lg:max-w-140 lg:pr-12"
            />
            <ConversionEvents syncIcon={visuals.syncIcon} syncLabel={visuals.syncLabel} headerPadding="pr-44 lg:pr-30" />
            <span aria-hidden="true" className={`${fade} h-22.5`} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className={`${cellBase} relative overflow-hidden px-5 sm:px-8 lg:min-w-0 lg:flex-1 lg:border-r lg:border-hp-line lg:pr-0 lg:pl-12`}>
            <StepHeader
              number="03"
              title={build.title}
              muted={build.muted}
              description={build.description}
              className="lg:max-w-140 lg:pr-12"
            />
            <Build />
            <span aria-hidden="true" className={`${fade} h-27.5`} />
          </div>
          <div className={`${cellBase} px-5 pb-8 sm:px-8 lg:w-115 lg:shrink-0 lg:px-12 lg:pb-0`}>
            <StepHeader number="04" title={iterate.title} muted={iterate.muted} description={iterate.description} />
            <MrrChart label={visuals.mrrLabel} />
          </div>
        </div>
      </div>

      {quote ? <QuoteRow {...quoteRowProps(quote)} quoteClassName="lg:max-w-205" /> : null}
    </Section>
  );
}

// ─── Campaign types: numbered list beside a mockup well ──────────────────

export function ServiceCampaigns({ eyebrow, marker, heading, description, items, quote, visuals }) {
  const { Campaigns } = visuals;
  return (
    <Section id="campaigns" labelledBy="campaigns-title">
      <SectionHead id="campaigns-title" marker={marker} eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} intro={description} />

      <div className="flex flex-col lg:flex-row lg:border-t lg:border-hp-line">
        <div className="order-2 flex lg:order-1">
          <CampaignWell>
            <Campaigns />
          </CampaignWell>
        </div>
        <ol className="order-1 min-w-0 flex-1 lg:order-2">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`flex gap-4 border-t border-hp-line px-5 pt-6 pb-7 sm:px-8 lg:gap-8 lg:px-10 lg:pt-8 lg:pb-8.5 ${index === 0 ? "lg:border-t-0" : ""}`}
            >
              <span aria-hidden="true" className="w-5 shrink-0 pt-1.25 font-hp-mono text-xs/4 text-hp-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3>
                  <span className={h3Class}>{item.title}</span>
                </h3>
                <p className={bodyClass}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {quote ? <QuoteRow {...quoteRowProps(quote)} quoteClassName="lg:max-w-205" /> : null}
    </Section>
  );
}

// ─── Fit: good fit, not yet, and the $20k MRR line ───────────────────────

function FitList({ title, items, good }) {
  return (
    <div className="flex flex-col gap-4.5 border-t border-hp-line px-5 pt-7 pb-8 sm:px-8 lg:border-t-0 lg:border-r lg:px-8 lg:pt-10 lg:pb-11">
      <h3>
        <span className="block font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-ink">{title}</span>
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            {good ? (
              <Check className="mt-1.25 size-4" strokeWidth={2} />
            ) : (
              <span aria-hidden="true" className="mt-3 h-px w-3.5 shrink-0 bg-hp-muted" />
            )}
            <span className="font-hp text-base/6 text-hp-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceFit({ eyebrow, marker, heading, description, goodFit, notYet, footnote }) {
  return (
    <Section id="fit" labelledBy="fit-title">
      <SectionHead id="fit-title" marker={marker} eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} intro={description} />

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:border-t lg:border-hp-line">
        <FitList title="A good fit" items={goodFit} good />
        <FitList title="Not yet" items={notYet} />
        <div className="hp-well flex items-center justify-center overflow-hidden border-t border-hp-line px-5 pt-7 pb-8 sm:px-8 lg:border-t-0 lg:px-7">
          <MrrLine />
        </div>
      </div>

      <div className="flex items-start gap-2.5 border-t border-hp-line bg-hp-wash p-5 sm:px-8 lg:items-center lg:justify-center lg:bg-hp-band lg:px-12 lg:py-6.5">
        <Info aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-hp-fine lg:mt-0" strokeWidth={1.75} />
        <p className="font-hp text-base/6 text-hp-body">{footnote}</p>
      </div>
    </Section>
  );
}

// ─── Pricing: same plans on every channel (lib/pricing.js) ───────────────

const plans = ["Growth", "Scale"].map((title) => pricingPlans.find((plan) => plan.title === title));

function SpendBar({ scale }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-2 pt-6 lg:mt-auto">
      <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-hp-tray">
        {scale ? (
          <>
            <span className="h-full w-[62%] bg-[#c7d6fc]" />
            <span className="h-full flex-1 bg-[repeating-linear-gradient(135deg,#155eef_0,#155eef_3px,#8fb0f8_3px,#8fb0f8_6px)]" />
          </>
        ) : (
          <span className="h-full w-[62%] rounded-full bg-hp-accent" />
        )}
      </div>
      <div className="flex justify-between font-hp-mono text-xs/4 text-hp-fine">
        <span>$0</span>
        <span className="text-hp-ink">
          {scale ? "$25K+" : "$25K"}
          <span className="hidden lg:inline"> / MO AD SPEND</span>
        </span>
      </div>
    </div>
  );
}

export function ServicePricing({ eyebrow, marker, serviceName, adSpendBilledBy }) {
  return (
    <Section id="pricing" labelledBy="pricing-title">
      <SectionHead
        id="pricing-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="One monthly fee,"
        accent="no lock-in."
        intro={`${serviceName} management is priced the same as every channel I run. Month-to-month, cancel with 7 days' notice.`}
      />

      <div className="grid grid-cols-2 border-t border-hp-line lg:grid-cols-[340px_330px_1fr]">
        {plans.map((plan, index) => (
          <div
            key={plan.title}
            className={`flex min-w-0 flex-col px-5 pt-7 pb-6 sm:px-8 lg:px-12 lg:pt-11 lg:pb-11 ${index === 0 ? "border-r border-hp-line" : "lg:border-r lg:border-hp-line"}`}
          >
            <h3>
              <span className="block font-hp-mono text-xs/4 font-normal tracking-[0.06em] text-hp-fine uppercase">{plan.title}</span>
            </h3>
            <p className="flex items-baseline gap-1.5 pt-3 lg:pt-4">
              <span className="font-hp text-[36px]/10.5 font-medium tracking-[-0.04em] text-hp-ink lg:text-[56px]/16">{plan.price}</span>
              {plan.cadence ? <span className="font-hp text-[15px]/5 text-hp-fine lg:text-lg/6">/{plan.cadence}</span> : null}
            </p>
            <p className="pt-2 font-hp text-[15px]/5.75 text-hp-body lg:pt-3 lg:text-base/6">{plan.description}</p>
            <SpendBar scale={index === 1} />
          </div>
        ))}
        <div className="col-span-2 flex flex-col gap-4 border-t border-hp-line px-5 pt-7 pb-8 sm:px-8 lg:col-span-1 lg:border-t-0 lg:px-10 lg:pt-11 lg:pb-11">
          <p className="font-hp text-sm/5 text-hp-fine">Both plans include</p>
          <ul className="flex flex-col gap-3">
            {managementPlanFeatures.map((feature) => (
              <li key={feature} className="flex gap-3">
                <Check className="mt-1.25 size-4" strokeWidth={2} />
                <span className="font-hp text-base/6 text-hp-text">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-1.5 pt-3 sm:flex-row sm:gap-5">
            <BookButton size="hero" className="w-full sm:w-auto" />
            <Link href="/pricing" className={secondaryLinkClass}>
              See full pricing
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 border-t border-hp-line bg-hp-band px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-5">
        <p className="font-hp text-sm/5.5 text-hp-fine">
          All prices in USD. Ad spend is paid to {adSpendBilledBy} directly, separately from my fee.
        </p>
        <p className="flex w-fit items-center gap-2.5 rounded-full bg-white py-2 pr-3.5 pl-2 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-hp-tray text-hp-ink">
            <MessagesSquare className="size-3.75" strokeWidth={2} />
          </span>
          <span className="font-hp text-sm/4.75 font-medium text-hp-ink">Talk to a current client before you sign</span>
        </p>
      </div>
    </Section>
  );
}
