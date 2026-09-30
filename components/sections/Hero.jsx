import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Spline, User } from "lucide-react";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import SlackIcon from "@/components/ui/SlackIcon";
import ClientTestimonialAvatarStack from "@/components/ui/ClientTestimonialAvatarStack";
import HeroCodeAnimation from "@/components/sections/HeroCodeAnimation";
import { textTestimonials } from "@/components/sections/testimonialsData";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Inline headshot after "hire" in the H1. Hidden for now; flip to re-enable.
const SHOW_HEADLINE_AVATAR = false;

const valueProps = [
  {
    id: "no-account-managers",
    text: "No account managers. The person on the call runs your account.",
    Icon: User,
    iconClassName: "h-6 w-6",
  },
  {
    id: "conversions",
    text: "Conversions tied to trial, demo and paid, then reported as MRR and payback.",
    Icon: Spline,
    iconClassName: "h-6 w-6",
  },
  {
    id: "slack",
    text: (
      <>
        I&apos;m in your{" "}
        <span className="whitespace-nowrap">
          <SlackIcon className="mr-1 inline-block h-[1em] w-[1em] align-[-0.125em]" />
          Slack
        </span>{" "}
        channel, so you message me directly and changes go live ASAP.
      </>
    ),
    Icon: MessageSquare,
    iconClassName: "h-6 w-6",
  },
];

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
  "Bob Thompson": "Amazing team, amazing results.",
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

const featuredClients = featuredClientNames
  .map((name) => textTestimonials.find((testimonial) => testimonial.name === name))
  .filter(Boolean)
  .map((testimonial) => ({
    ...testimonial,
    highlight: featuredClientHighlights[testimonial.name] || testimonial.quote,
  }));

// Staggered word-by-word reveal for the H1, adapted from transitions.dev
// ("Text reveal"). CSS-only (`.reveal-word` in globals.css) so the heading
// stays server-rendered; `start` continues the stagger across segments.
function revealWords(text, start) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 ? " " : null}
      <span className="reveal-word" style={{ "--i": start + i }}>
        {word}
      </span>
    </span>
  ));
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="py-8 sm:py-10"
    >
      {/* Test: Cal.com-style white card lifting the hero off the page tone.
          Inset slightly from the GridFrame lines (xl:px-4) so they stay visible. */}
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
      <div className="relative grid grid-cols-1 items-start gap-12 rounded-[28px] border border-border bg-white px-5 py-12 shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)] sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:justify-items-center lg:px-10">
        <div className="relative w-full max-w-[610px] text-center sm:text-left">
          <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-border bg-page py-2 pr-4 pl-3 text-sm leading-none font-medium text-body sm:mx-0">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span>
              Taking on new SaaS clients{" "}
              <span className="text-muted">(as at 09/28/26)</span>
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-5.5 font-display font-medium! text-h1 text-ink sm:mt-5.5"
          >
            {revealWords("SaaS Google Ads Agency, run by the person you", 0)}{" "}
            <span className="whitespace-nowrap">
              {revealWords("hire", 9)}
              {SHOW_HEADLINE_AVATAR ? (
                <Image
                  src="/team/mitch-headshot.jpg"
                  alt=""
                  width={120}
                  height={120}
                  priority
                  className="mx-[0.14em] inline-block h-[0.92em] w-[0.92em] rounded-full border-[0.06em] border-white object-cover align-[-0.14em] shadow-[0_0_0_1px_var(--color-border),0_4px_12px_rgba(26,26,24,0.12)]"
                />
              ) : null}
            </span>{" "}
            {revealWords("and reported in MRR.", 10)}
          </h1>

          <p className="mt-5.5 max-w-[30em] text-copy leading-normal text-body sm:text-lg">
            I plan, build and manage your{" "}
            <span className="whitespace-nowrap">
              <GoogleAdsIcon className="mr-1 inline-block h-[0.9em] w-[1em] align-[-0.1em]" />
              Google Ads
            </span>{" "}
            myself. You get reports on
            trials, pipeline and new MRR. Clicks and impressions stay in the
            appendix.
          </p>

          <ul className="mt-7 space-y-4 text-copy leading-normal text-body">
            {valueProps.map((item) => (
              <li key={item.id} className="flex items-start justify-center gap-3.5 text-left sm:items-center sm:justify-start">
                <span className="mt-1 flex h-5.5 w-5.5 shrink-0 items-center justify-center text-ink sm:mt-0">
                  <item.Icon
                    aria-hidden="true"
                    className={item.iconClassName}
                    strokeWidth={1.75}
                  />
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8.5 flex flex-col items-center gap-5.5 sm:items-start">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
              <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" />
              <Link
                href="/results"
                className="border-b border-ink py-3.75 px-1 text-base font-semibold text-ink"
              >
                See client results
              </Link>
            </div>
            <ClientTestimonialAvatarStack
              clients={featuredClients}
              ctaText=""
              maxVisible={10}
            />
          </div>
        </div>

        <div className="relative hidden w-full lg:block">
          <HeroCodeAnimation />
        </div>
      </div>
      </div>
    </section>
  );
}
