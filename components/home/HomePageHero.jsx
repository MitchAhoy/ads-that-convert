import Link from "next/link";
import HomeAvatarStack from "@/components/home/HomeAvatarStack";
import { featuredClients, h1Line } from "@/components/home/HomeHero";
import { BookButton, Section, AccentUnderline, focusRing } from "@/components/home/primitives";

// Centred hero for the inner pages (/results, /testimonials, /tools/*), built
// like the homepage hero (DESIGN.md §16.5): dot grid, H1 ending in the pen-underlined
// accent phrase, lede, then optionally the booking row and avatar stack.

export const secondaryLinkClass = `px-1 pt-3 pb-1.5 font-hp text-base/5.5 font-medium text-hp-ink underline underline-offset-[5px] sm:border-b sm:border-hp-ink sm:py-2.75 sm:no-underline ${focusRing}`;

export default function HomePageHero({
  lead,
  accent,
  description,
  pill,
  secondaryLink,
  showBooking = false,
  showAvatars = false,
  underlineSeed,
  microcopy = "15 minutes with me, not a sales rep. You'll leave with a go or no-go on Google Ads.",
  children,
}) {
  return (
    <Section
      labelledBy="hero-title"
      data-booking-cta-zone={showBooking ? "" : undefined}
      className="relative z-10"
      innerClassName="hp-hero-dots"
    >
      <div className="flex flex-col items-center px-5 pt-12 pb-11 text-center sm:px-8 lg:px-12 lg:pt-18 lg:pb-14">
        {pill ? <div className="pb-5 lg:pb-5.5">{pill}</div> : null}
        <h1 id="hero-title">
          <span className={`block max-w-[350px] sm:max-w-[600px] lg:max-w-200 ${h1Line}`}>
            {lead}{accent ? <> <AccentUnderline seed={`hero:${underlineSeed ?? accent}`}>{accent}</AccentUnderline></> : null}
          </span>
        </h1>

        {description ? (
          <p className="max-w-85 pt-4.5 font-hp text-[17px]/6.5 text-hp-body sm:max-w-140 lg:max-w-175 lg:pt-5.5 lg:text-lg/7">
            {description}
          </p>
        ) : null}

        {showBooking ? (
          <>
            <div className="flex w-full max-w-87.5 flex-col items-center gap-1.5 pt-7 sm:w-auto sm:max-w-none sm:flex-row sm:gap-6 lg:pt-8.5">
              <BookButton size="hero" className="w-full sm:w-auto" />
              {secondaryLink ? (
                <Link href={secondaryLink.href} className={secondaryLinkClass}>
                  {secondaryLink.label}
                </Link>
              ) : null}
            </div>
            {microcopy ? (
              <p className="max-w-75 pt-2 font-hp text-sm/5.25 text-[#6b7079] sm:max-w-none lg:pt-3.5">{microcopy}</p>
            ) : null}
          </>
        ) : null}

        {showAvatars ? (
          <div className="flex justify-center pt-4.5 lg:pt-5.5">
            <HomeAvatarStack clients={featuredClients} />
          </div>
        ) : null}

        {children}
      </div>
    </Section>
  );
}
