import Image from "next/image";
import Link from "next/link";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import SlackIcon from "@/components/ui/SlackIcon";
import HomeAvatarStack from "@/components/home/HomeAvatarStack";
import { BookButton, Section, AccentUnderline, focusRing } from "@/components/home/primitives";
import { textTestimonials } from "@/components/sections/testimonialsData";

const featuredClientNames = [
  "Bob Thompson",
  "Cathy Paraggio",
  "Dave Batchelor",
  "Dominic Whyte",
  "Ed Forrester",
  "Jacob Reichman",
  "Jordon Chavis",
  "Lachlan Thompson",
  "Matt Robinson",
  "Menachem Ani",
];

const featuredClientHighlights = {
  "Bob Thompson": "Amazing results.",
  "Cathy Paraggio": "My campaigns are at a 4x ROAS!!",
  "Dave Batchelor": "He really takes charge and gets stuff done.",
  "Dominic Whyte": "A game-changer for our startup.",
  "Ed Forrester": "Knows Google Ads really well and he is super responsive.",
  "Jacob Reichman": "Stellar results, unachievable through previous managers.",
  "Jordon Chavis": "One of the best decisions I've made for my business this year.",
  "Lachlan Thompson": "So many headaches solved at once!",
  "Matt Robinson": "Went above and beyond to make sure we were happy.",
  "Menachem Ani": "Attention to detail, quick turnaround times.",
};

export const featuredClients = featuredClientNames
  .map((name) => textTestimonials.find((testimonial) => testimonial.name === name))
  .filter(Boolean)
  .map((testimonial) => ({
    ...testimonial,
    highlight: featuredClientHighlights[testimonial.name] || testimonial.quote,
  }));

// Small tilted tiles in front of each value prop (decorative).
const tileClass =
  "flex size-7.5 shrink-0 rounded-lg bg-white shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.08)]";

export const valueProps = [
  {
    id: "no-account-managers",
    text: "No account managers. The person on the call runs your account.",
    tile: (
      // One person, verified: the person on the call is the one in the account.
      <span aria-hidden="true" className={`${tileClass} -rotate-4 items-center justify-center`}>
        <svg viewBox="0 0 18 18" className="size-4.5">
          <circle cx="8" cy="5.5" r="3.5" fill="#6E95F5" />
          <path d="M1.5 16.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" fill="#C7D6FC" />
          <circle cx="13.5" cy="13" r="3.9" fill="#155EEF" stroke="#FFFFFF" strokeWidth="1.4" />
          <path d="M11.8 13.1l1.2 1.2 2.2-2.4" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
  {
    id: "conversions",
    text: "Conversions tied to trial, demo and paid, then reported as MRR and payback.",
    tile: (
      <span aria-hidden="true" className={`${tileClass} rotate-3 items-end justify-center gap-0.5 pb-1.75`}>
        <span className="h-1.5 w-1.25 rounded-[1px] bg-[#c7d6fc]" />
        <span className="h-2.5 w-1.25 rounded-[1px] bg-[#6e95f5]" />
        <span className="h-3.75 w-1.25 rounded-[1px] bg-hp-accent" />
      </span>
    ),
  },
  {
    id: "slack",
    text: "I'm in your Slack channel, so you message me directly and changes go live ASAP.",
    tile: (
      <span aria-hidden="true" className={`${tileClass} -rotate-3 items-center justify-center`}>
        <SlackIcon className="size-3.75" />
      </span>
    ),
  },
];

export const h1Line = "font-hp font-medium tracking-[-0.035em] text-hp-ink text-4xl/10.5 sm:text-5xl/14 lg:text-[64px]/18";

export default function HomeHero() {
  return (
    <Section labelledBy="hero-title" data-booking-cta-zone className="relative z-10" innerClassName="hp-hero-dots">
      <div className="flex flex-col items-center px-5 pt-10 pb-11 text-center sm:px-8 lg:px-12 lg:pt-22 lg:pb-18">
        <Link
          href="/results/rezi-case-study"
          className={`group flex max-w-full items-center gap-2 rounded-full border border-hp-line py-1.5 pr-3 pl-3 transition-colors hover:border-[#d5d8dd] lg:gap-2.5 lg:pr-4 lg:pl-3.5 ${focusRing}`}
        >
          <Image src="/client-logos/rezi.svg" alt="Rezi" width={215} height={91} className="h-3 w-auto shrink-0 lg:h-3.5" />
          <span aria-hidden="true" className="h-3 w-px shrink-0 bg-[#e4e6ea] lg:h-3.5" />
          <span className="font-hp text-[13px]/4.5 text-hp-text lg:hidden">New: 29 → 129 paying customers/mo</span>
          <span className="hidden min-w-0 truncate font-hp text-sm/5 text-hp-soft lg:inline">
            <span className="mr-1.5 font-medium text-hp-ink">New case study:</span>
            From acquiring 29 to 129 paying customers per month with Google Ads
          </span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5 lg:size-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="#0E0F11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <h1 id="hero-title" className="pt-5.5 lg:pt-7">
          <span className={`block max-w-[350px] sm:max-w-[560px] lg:max-w-none ${h1Line}`}>
            SaaS{" "}
            <span
              aria-hidden="true"
              className="mx-[0.06em] -my-2 inline-flex size-9 rotate-6 items-center justify-center rounded-[10px] bg-white align-middle shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.08)] sm:size-12 sm:rounded-xl lg:size-14 lg:rounded-[14px]"
            >
              <GoogleAdsIcon className="w-5.5 sm:w-7.5 lg:w-8.5" />
            </span>{" "}
            Google Ads Agency,
            <br className="hidden lg:inline" /> run by the{" "}
            <span className="whitespace-nowrap">
              <a
                href="https://x.com/PayPerMitch"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Mitch on X (opens in a new tab)"
                className={`mx-[0.06em] -my-2 inline-block size-9 -rotate-5 overflow-hidden rounded-[10px] border-[2.5px] border-white bg-hp-tray align-middle shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.08)] transition-[rotate,scale] duration-200 hover:rotate-0 hover:scale-105 sm:size-12 sm:rounded-xl lg:size-14 lg:rounded-[14px] lg:border-3 ${focusRing}`}
              >
                <Image
                  src="/team/mitch-headline-portrait.png"
                  alt=""
                  width={112}
                  height={112}
                  priority
                  className="size-full object-cover"
                />
              </a>{" "}
              person
            </span>{" "}
            you hire
            <br className="hidden lg:inline" /> and{" "}
            <AccentUnderline seed="home-hero" className="whitespace-nowrap">
              reported in MRR.
            </AccentUnderline>
          </span>
        </h1>

        <p className="max-w-85 pt-4.5 font-hp text-[17px]/6.5 text-hp-body sm:max-w-140 lg:max-w-155 lg:pt-5.5 lg:text-lg/7">
          I plan, build and manage your Google Ads. You get reports on trials, pipeline and new MRR. Clicks and
          impressions stay in the appendix.
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
          <Link
            href="/results"
            className={`px-1 pt-3 pb-1.5 font-hp text-base/5.5 font-medium text-hp-ink underline underline-offset-[5px] sm:border-b sm:border-hp-ink sm:py-2.75 sm:no-underline ${focusRing}`}
          >
            See client results
          </Link>
        </div>

        <p className="max-w-75 pt-2 font-hp text-sm/5.25 text-[#6b7079] sm:max-w-none lg:pt-3.5">
          15 minutes with me, not a sales rep. You&apos;ll leave with a go or no-go on paid search.
        </p>

        <div className="flex justify-center pt-4.5 lg:pt-5.5">
          <HomeAvatarStack clients={featuredClients} />
        </div>
      </div>
    </Section>
  );
}
