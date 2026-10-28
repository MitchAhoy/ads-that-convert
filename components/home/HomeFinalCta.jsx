import { BookButton, Section, AccentUnderline } from "@/components/home/primitives";

const ctaLine = "block font-hp-display text-[38px]/11 font-medium tracking-[-0.04em] sm:text-[52px]/15 lg:text-[68px]/18.5";

const homeDescription = "Book in a call and I'll show you how I'd scale your acquisition with Google Ads for your product.";

// Defaults are the homepage copy. /call-confirmation passes its own heading,
// `action` (in place of the booking button) and `microcopy={null}`.
export default function HomeFinalCta({
  description = homeDescription,
  lead = "Ready to get more customers",
  accent = "for your SaaS?",
  underlineSeed,
  action,
  microcopy = "You'll talk to me, not a sales rep · Free · No commitment",
}) {
  return (
    <Section labelledBy="final-cta-title" data-booking-cta-zone hatch={false} className="lg:bg-hp-wash" innerClassName="hp-cta-dots overflow-hidden">
      <div className="flex flex-col items-center gap-5 px-5 pt-18 pb-20 text-center sm:px-8 lg:gap-6.5 lg:px-12 lg:pt-30 lg:pb-34">
        <h2 id="final-cta-title">
          <span className={`${ctaLine} text-hp-ink`}>{lead}</span>
          <span className={ctaLine}>
            <AccentUnderline seed={`cta:${underlineSeed ?? accent}`}>{accent}</AccentUnderline>
          </span>
        </h2>
        <p className="max-w-80 font-hp text-[17px]/6.5 text-hp-body sm:max-w-140 lg:text-[19px]/7.25">
          {description}
        </p>
        <div className="w-full max-w-87.5 sm:w-auto sm:max-w-none lg:pt-2">
          {action ?? (<BookButton
            size="none"
            className="w-full gap-2.25 rounded-xl px-4.5 py-4 text-[17px]/5.5 shadow-[0_1px_2px_rgba(14,15,17,0.2),0_10px_28px_rgba(21,94,239,0.28)] sm:w-auto sm:px-6 lg:py-3.75"
          />)}
        </div>
        {microcopy ? <p className="font-hp text-sm/5 text-hp-body lg:text-[15px]/5">{microcopy}</p> : null}
      </div>
    </Section>
  );
}
