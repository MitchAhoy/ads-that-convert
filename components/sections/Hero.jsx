import Link from "next/link";
import { MessageSquare, Spline, User } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import ClientTestimonialAvatarStack from "@/components/ui/ClientTestimonialAvatarStack";
import HeroCodeAnimation from "@/components/sections/HeroCodeAnimation";
import { textTestimonials } from "@/components/sections/testimonialsData";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const valueProps = [
  {
    text: "No account managers. The person on the call runs your account.",
    Icon: User,
    iconClassName: "h-6 w-6",
  },
  {
    text: "Conversions tied to trial, demo and paid, then reported as MRR and payback.",
    Icon: Spline,
    iconClassName: "h-6 w-6",
  },
  {
    text: "I'm in your Slack channel, so you message me directly and changes go live ASAP.",
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

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="py-16"
    >
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:justify-items-center lg:px-8">
        <div className="w-full max-w-[610px] text-center sm:text-left">
          <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full bg-surface py-2 pr-4 pl-3 text-sm leading-none font-medium text-body sm:mx-0">
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
            className="mt-5.5 text-h1 font-bold text-ink sm:mt-5.5"
          >
            SaaS Google Ads Agency, run by the person you hire and reported in
            MRR.
          </h1>

          <p className="mt-5.5 max-w-[30em] text-base leading-normal text-body sm:text-lg">
            I plan, build and manage your Google Ads myself. You get reports on
            trials, pipeline and new MRR. Clicks and impressions stay in the
            appendix.
          </p>

          <ul className="mt-7 space-y-4 text-base leading-normal text-body">
            {valueProps.map((item) => (
              <li key={item.text} className="flex items-start justify-center gap-3.5 text-left sm:items-center sm:justify-start">
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
                className="border-b border-ink py-3.75 px-1 text-[15px] font-semibold text-ink"
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

        <div className="hidden w-full lg:block">
          <HeroCodeAnimation />
        </div>
      </div>
    </section>
  );
}
