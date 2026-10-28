import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { h1Line } from "@/components/home/HomeHero";
import { BookButton, QuoteRow, Section, SectionHead, AccentUnderline, focusRing } from "@/components/home/primitives";
import { Check } from "@/components/services/illustrations/shared";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import MetaIcon from "@/components/ui/MetaIcon";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import MicrosoftIcon from "@/components/ui/MicrosoftIcon";
import OpenAIIcon from "@/components/ui/OpenAIIcon";
import { managementPlanFeatures, onboardingSteps, pricingPlans } from "@/lib/pricing";

// Sections for /pricing (DESIGN.md §16.9), built on the homepage system.
// Plan copy and prices come from lib/pricing.js (shared with the WebMCP tools).

const plan = (title) => pricingPlans.find((item) => item.title === title);
const growth = plan("Growth");
const scale = plan("Scale");
const audit = plan("Account Audit");

// ─── Hero ────────────────────────────────────────────────────────────────

const channels = [
  { slug: "google-ads", label: "Google Ads", icon: <GoogleAdsIcon className="w-4" />, tilt: "-rotate-4" },
  { slug: "meta-ads", label: "Meta Ads", icon: <MetaIcon className="w-4.25" />, tilt: "rotate-4" },
  { slug: "chatgpt-ads", label: "ChatGPT Ads", icon: <OpenAIIcon className="w-3.75" />, tilt: "-rotate-4" },
  { slug: "microsoft-ads", label: "Microsoft Ads", icon: <MicrosoftIcon className="w-3.5" />, tilt: "rotate-4" },
  { slug: "linkedin-ads", label: "LinkedIn Ads", icon: <LinkedInIcon className="w-3.75" />, tilt: "-rotate-4" },
];

export function PricingHero() {
  return (
    <Section labelledBy="hero-title" className="relative z-10" innerClassName="hp-hero-dots">
      <div className="flex flex-col items-center px-5 pt-12 pb-11 text-center sm:px-8 lg:px-12 lg:pt-18 lg:pb-14">
        <h1 id="hero-title">
          <span className={`block max-w-[350px] sm:max-w-[600px] lg:max-w-none ${h1Line}`}>
            Straightforward fixed pricing, never a<br className="hidden lg:inline" />{" "}
            <AccentUnderline seed="pricing-hero" className="whitespace-nowrap">% of your ad spend.</AccentUnderline>
          </span>
        </h1>

        <p className="max-w-85 pt-4.5 font-hp text-[17px]/6.5 text-hp-body sm:max-w-140 lg:max-w-165 lg:pt-5.5 lg:text-lg/7">
          One flat monthly fee for Google, Meta, ChatGPT, Microsoft and LinkedIn Ads. No lock-in contracts, cancel with 7 days&apos;
          notice. I lead every account myself.
        </p>

        <ul aria-label="Channels I manage" className="flex max-w-87.5 flex-wrap justify-center gap-2 pt-6 sm:max-w-none sm:gap-2.5 lg:pt-7">
          {channels.map((channel) => (
            <li key={channel.slug}>
              <Link
                href={`/services/${channel.slug}`}
                className={`flex items-center gap-2.25 rounded-full bg-white py-1.75 pr-3.5 pl-2 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)] transition-shadow hover:shadow-[0_0_0_1px_#cfd3d9,0_2px_8px_rgba(14,15,17,0.08)] ${focusRing}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-6.5 items-center justify-center rounded-lg bg-white shadow-[0_0_0_1px_rgba(14,15,17,0.1)] ${channel.tilt}`}
                >
                  {channel.icon}
                </span>
                <span className="font-hp text-[15px]/5 font-medium text-hp-ink">{channel.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ─── Plans: Growth, Scale and the one-off audit side by side ─────────────

const labelClass = "font-hp-mono text-xs/4 font-normal tracking-[0.08em] text-hp-fine uppercase";
const smallHeadClass = "font-hp text-sm/5 font-medium text-hp-fine";
const priceClass = "font-hp text-[36px]/10.5 font-medium tracking-[-0.04em] text-hp-ink lg:text-[64px]/17";

function TierLabel({ title, tag, tagTone = "neutral", marker, tagAlways = false }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="flex items-center gap-2">
        <span aria-hidden="true" className={`size-1.75 shrink-0 rounded-[1.5px] ${marker}`} />
        <span className={labelClass}>{title}</span>
      </h3>
      <span
        className={`rounded-md px-2 py-0.5 font-hp-mono text-xs/4 uppercase ${tagAlways ? "" : "hidden lg:inline"} ${
          tagTone === "accent" ? "bg-[#eef3fe] text-[#1640b8]" : "bg-hp-tray text-hp-body"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}

const hatchMarker = "bg-[repeating-linear-gradient(135deg,#155eef_0,#155eef_1.5px,#8fb0f8_1.5px,#8fb0f8_3px)]";

function CheckList({ items, color, className = "" }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1.25 size-4.5" color={color} strokeWidth={2.25} />
          <span className="font-hp text-base/6 text-hp-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingPlans() {
  return (
    <Section id="plans" labelledBy="plans-title">
      <h2 id="plans-title" className="sr-only">
        Plans and prices
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3">
        {/* Growth */}
        <div className="order-1 flex min-w-0 flex-col gap-2.5 border-r border-hp-line px-5 pt-7 pb-6 sm:px-8 lg:gap-3.5 lg:px-12 lg:pt-11 lg:pb-9">
          <TierLabel title={growth.title} tag="Monthly" marker="bg-hp-accent" />
          <p className="flex items-baseline gap-1 pt-1.5 lg:pt-5">
            <span className={priceClass}>{growth.price}</span>
            <span className="font-hp text-[15px]/5 text-hp-muted lg:text-lg/6">/{growth.cadence}</span>
          </p>
          <p className="font-hp text-[15px]/5.5 text-hp-soft lg:text-base/6">{growth.description}</p>
        </div>

        {/* Scale */}
        <div className="order-2 flex min-w-0 flex-col gap-2.5 px-5 pt-7 pb-6 sm:px-8 lg:gap-3.5 lg:border-r lg:border-hp-line lg:px-10 lg:pt-11 lg:pb-9">
          <TierLabel title={scale.title} tag="Monthly" marker={hatchMarker} />
          <p className={`pt-1.5 lg:pt-5 ${priceClass}`}>{scale.price}</p>
          <p className="font-hp text-[15px]/5.5 text-hp-soft lg:text-base/6">{scale.description}</p>
        </div>

        {/* Monthly details: spend bar, shared features, booking button */}
        <div className="order-3 col-span-2 flex flex-col border-t border-hp-line lg:order-4 lg:border-r">
          <div className="flex flex-col gap-2.5 px-5 pt-5 pb-6 sm:px-8 lg:px-12 lg:pt-6.5 lg:pb-7">
            <p className={smallHeadClass}>Growth or Scale? It depends on your monthly ad spend</p>
            <div aria-hidden="true" className="flex flex-col gap-2.5">
              <div className="flex h-2.5 gap-0.75">
                <span className="flex-1 rounded-l-full bg-hp-accent" />
                <span className="flex-1 rounded-r-full bg-[repeating-linear-gradient(135deg,#155eef_0,#155eef_4px,#8fb0f8_4px,#8fb0f8_8px)]" />
              </div>
              <div className="flex justify-between font-hp-mono text-xs/4">
                <span className="w-16 text-hp-muted lg:w-20">$0</span>
                <span className="text-hp-ink">$25K / MO</span>
                <span className="w-16 text-right text-hp-muted lg:w-20">AND UP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 border-t border-hp-line px-5 pt-6.5 pb-7.5 sm:px-8 lg:px-12 lg:pt-8 lg:pb-10">
            <p className={smallHeadClass}>Both monthly plans include</p>
            <CheckList items={managementPlanFeatures} className="lg:grid-cols-2 lg:gap-x-8" />
            <div data-booking-cta-zone className="flex flex-col items-center gap-2.5 pt-3 sm:flex-row sm:gap-4.5 lg:mt-auto">
              <BookButton size="hero" className="w-full sm:w-auto" />
              <p className="font-hp text-sm/5 text-hp-fine">Free 15-min strategy call · No commitment</p>
            </div>
          </div>
        </div>

        {/* Account audit */}
        <div className="order-4 col-span-2 flex min-w-0 flex-col gap-2.5 border-t border-hp-line px-5 pt-6.5 sm:px-8 lg:order-3 lg:col-span-1 lg:gap-3.5 lg:border-t-0 lg:pt-11 lg:pr-12 lg:pb-9 lg:pl-10">
          <TierLabel title={audit.title} tag="One-time" tagTone="accent" marker="bg-hp-ink" tagAlways />
          <p className={`pt-1.5 lg:pt-5 ${priceClass}`}>
            {audit.price}
            <span className="sr-only"> one-time</span>
          </p>
          <p className="font-hp text-[15px]/5.5 text-hp-soft lg:text-base/6">
            Not ready for management? {audit.description}
          </p>
        </div>

        <div className="order-5 col-span-2 flex flex-col gap-4 px-5 pt-4 pb-7 sm:px-8 lg:col-span-1 lg:border-t lg:border-hp-line lg:pt-6.5 lg:pr-12 lg:pb-10 lg:pl-10">
          <p className={`hidden lg:block ${smallHeadClass}`}>The audit includes</p>
          <CheckList items={audit.features} color="#0E0F11" className="gap-2.5 lg:gap-3" />
          <div className="pt-3 lg:mt-auto">
            <a
              href={audit.ctaHref}
              className={`flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4.5 py-3.5 font-hp text-[17px]/5.5 font-medium text-hp-ink ring-1 ring-hp-ink ring-inset transition-colors hover:bg-hp-tray sm:w-fit sm:rounded-[10px] sm:py-2.75 sm:text-base/5.5 ${focusRing}`}
            >
              {audit.ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 border-t border-hp-line px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12">
        <p className="font-hp text-sm/5.5 text-hp-fine lg:max-w-155">
          All prices in USD. Ad spend is billed by the ad platform, separately from my fee. Month-to-month, cancel anytime
          with 7 days&apos; notice.
        </p>
        <p className="flex w-fit shrink-0 items-center gap-2.5 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-hp-tray text-hp-ink">
            <MessagesSquare className="size-3.75" strokeWidth={2} />
          </span>
          <span className="font-hp text-sm/4.75 font-medium text-hp-ink">Talk to a current client before you sign</span>
        </p>
      </div>

      <QuoteRow
        avatarSrc="/client pfp/olly.png"
        quote="Not only was he able to deliver paying customers below our target cost per acquisition, but he is incredible at helping us stay on top of what's going on in the account."
        name="Olly"
        role="Founder"
        logo={{ src: "/client-logos/senja.png", alt: "Senja", width: 63, height: 26 }}
        quoteClassName="lg:max-w-205"
      />
    </Section>
  );
}

// ─── Onboarding: the first 30 days, each step with a small mockup ────────
// Mockups are decorative (aria-hidden) and their contents illustrative.

const tagTones = {
  fix: "bg-[#fef3f2] text-[#b42318]",
  info: "bg-[#eef3fe] text-[#1640b8]",
  ok: "bg-[#ecfdf3] text-hp-up",
};

function MockCard({ title, meta, metaClass = "text-hp-muted", children }) {
  return (
    <div className="rv flex h-40 w-full max-w-80 flex-col gap-2.25 rounded-t-xl bg-white px-3.5 pt-3.5 pb-4 shadow-[0_0_0_1px_#e4e6ea,0_6px_18px_rgba(14,15,17,0.06)]">
      <div className="flex items-center justify-between pb-0.75">
        <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">{title}</span>
        <span className={`font-hp-mono text-xs/4 ${metaClass}`}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

function MockRow({ label, tag, tone, mono = false, struck = false, index }) {
  return (
    <div className="rv flex items-center justify-between gap-2" style={{ "--rv-i": index + 2 }}>
      <span
        className={`truncate text-xs/4 ${mono ? "font-hp-mono" : "font-hp"} ${struck ? "text-hp-muted line-through" : "text-hp-text"}`}
      >
        {label}
      </span>
      <span className={`shrink-0 rounded-md px-1.75 py-px font-hp-mono text-xs/4 ${tagTones[tone]}`}>{tag}</span>
    </div>
  );
}

function RowsCard({ title, meta, rows, mono }) {
  return (
    <MockCard title={title} meta={meta}>
      {rows.map(([label, tag, tone, struck], index) => (
        <MockRow key={label} label={label} tag={tag} tone={tone} struck={struck} mono={mono} index={index} />
      ))}
    </MockCard>
  );
}

const reportBars = [
  ["h-4", "bg-[#c7d6fc]"],
  ["h-5.5", "bg-[#c7d6fc]"],
  ["h-5", "bg-[#c7d6fc]"],
  ["h-7.5", "bg-[#6e95f5]"],
  ["h-9.5", "bg-[#6e95f5]"],
  ["h-12", "bg-hp-accent"],
];

function ReportCard() {
  return (
    <MockCard title="Weekly report" meta="↑ NEW MRR" metaClass="text-hp-up">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex h-13 items-end gap-1.5 border-b border-hp-line-soft">
          {reportBars.map(([height, color], index) => (
            <span key={index} className={`rv-bar flex-1 rounded-t-[3px] ${height} ${color}`} style={{ "--rv-i": index + 2 }} />
          ))}
        </div>
        <div className="rv flex items-center gap-2 rounded-lg bg-hp-tray px-2 py-1.5" style={{ "--rv-i": 8 }}>
          <span className="font-hp-mono text-xs/4 text-hp-accent">NEXT</span>
          <span className="truncate font-hp text-xs/4 text-hp-text">Test a demo-first page</span>
        </div>
      </div>
    </MockCard>
  );
}

const stepMockups = [
  <RowsCard
    key="audit"
    title="Account audit"
    meta="4 CHECKS"
    rows={[
      ["Conversion tracking", "FIX", "fix"],
      ["Search terms", "WASTE", "fix"],
      ["Campaign structure", "REVIEW", "info"],
      ["Landing page", "OK", "ok"],
    ]}
  />,
  <RowsCard
    key="plan"
    title="Campaign plan"
    meta="LAUNCH PREP"
    rows={[
      ["Competitor terms", "READY", "ok"],
      ["Problem-aware", "READY", "ok"],
      ["Ad copy", "DRAFT", "info"],
      ["Tracking", "VERIFIED", "ok"],
    ]}
  />,
  <RowsCard
    key="terms"
    title="Search terms"
    meta="THIS WEEK"
    mono
    rows={[
      ["crm for startups", "+ ADD", "ok"],
      ["free crm template", "− NEG", "fix", true],
      ["crm for agencies", "↑ BID", "info"],
      ["crm jobs", "− NEG", "fix", true],
    ]}
  />,
  <ReportCard key="report" />,
];

export function PricingOnboarding({ eyebrow, marker }) {
  return (
    <Section id="onboarding" labelledBy="onboarding-title">
      <SectionHead
        id="onboarding-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="What the first 30 days"
        accent="look like."
        intro="The first 30 days are structured to move fast without sacrificing strategic clarity."
      />

      <ol className="grid grid-cols-1 border-t border-hp-line sm:grid-cols-2 lg:grid-cols-4">
        {onboardingSteps.map((step, index) => (
          <li
            key={step.title}
            className={`flex flex-col border-hp-line ${index > 0 ? "border-t" : ""} ${index === 1 ? "sm:border-t-0" : ""} ${
              index % 2 === 0 ? "sm:border-r" : ""
            } lg:border-t-0 ${index < 3 ? "lg:border-r" : ""}`}
          >
            <Reveal aria-hidden="true" className="hp-well flex h-47.5 items-end justify-center border-b border-hp-line px-10 sm:px-8 lg:h-50 lg:px-5.5">
              {stepMockups[index]}
            </Reveal>
            <div
              className={`flex flex-col gap-2 px-5 pt-5.5 pb-7 sm:px-8 lg:gap-2.5 lg:pt-6.5 lg:pb-10 ${
                index === 0 ? "lg:pr-7 lg:pl-12" : index === 3 ? "lg:pr-12 lg:pl-7" : "lg:px-7"
              }`}
            >
              <span aria-hidden="true" className="font-hp-mono text-xs/4 text-hp-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>
                <span className="block font-hp text-xl/6.5 font-medium tracking-[-0.02em] text-hp-ink lg:text-[21px]/6.75">
                  {step.title}
                </span>
              </h3>
              <p className="font-hp text-base/6 text-hp-soft">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <QuoteRow
        avatarSrc="/client pfp/dave batchelor.png"
        quote="Mitch has been great to work with, he really takes charge and gets stuff done without a lot of handholding, which is great! We'd highly recommend him."
        name="Dave Batchelor"
        role="Founder"
        logo={{ src: "/client-logos/dialmycalls.png", alt: "DialMyCalls", width: 75, height: 30 }}
        quoteClassName="lg:max-w-205"
      />
    </Section>
  );
}
