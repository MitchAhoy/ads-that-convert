import Image from "next/image";
import { Gauge, Settings2, Workflow } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import ClientTestimonialAvatarStack from "@/components/ui/ClientTestimonialAvatarStack";
import HeroClientLogoGrid from "@/components/sections/HeroClientLogoGrid";
import { textTestimonials } from "@/components/sections/testimonialsData";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const valueProps = [
  {
    text: "No junior handoffs: I manage your campaign from planning to profit",
    Icon: Settings2,
    iconClassName: "h-6 w-6",
  },
  {
    text: "Fast execution inside your workflow via Slack or email.",
    Icon: Workflow,
    iconClassName: "h-6 w-6",
  },
  {
    text: "Big-agency performance with small-agency speed.",
    Icon: Gauge,
    iconClassName: "h-6 w-6",
  },
];

const featuredClientNames = [
  "Dominic Whyte",
  "Dave Batchelor",
  "Oliver Meakings",
  "Cathy Paraggio",
  "Sunny Jain",
  "Lachlan Thompson",
  "Menachem Ani",
  "Ed Forrester",
  "Jacob Reichman",
];

const featuredClientHighlights = {
  "Dominic Whyte": "A game-changer for our startup.",
  "Dave Batchelor": "Highly recommend him for SaaS growth.",
  "Oliver Meakings": "The detail and insight was mind-blowing.",
  "Cathy Paraggio": "My campaigns are at a 4x ROAS.",
  "Sunny Jain": "Straight-to-the-point and delivered for us.",
  "Lachlan Thompson": "So many headaches solved at once.",
  "Menachem Ani": "Attention to detail and quick turnarounds.",
  "Ed Forrester": "Super responsive and highly optimized setup.",
  "Jacob Reichman": "Stellar results beyond previous managers.",
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
      className="pt-4 pb-5 sm:pt-5 sm:pb-6"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:justify-items-center">
        <div className="w-full max-w-[610px] text-center sm:text-left">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full px-3 py-2 text-sm leading-[1.4] text-zinc-900 sm:mx-0 sm:px-4">
            <span aria-hidden="true" className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span>Now accepting new clients</span>
          </div>

          <h1
            id="hero-title"
            className="mt-5 font-serif text-[clamp(2rem,5vw,2.1875rem)] font-semibold leading-[1.15] tracking-tight text-black sm:mt-6"
          >
            SaaS Google Ads Agency Driving Growth for Ambitious Businesses
          </h1>

          <p className="mt-5 text-base leading-[1.6] text-[#16181b] sm:text-lg">
            Convert clicks into SaaS customers with your new fully managed
            Google Ads service.
          </p>

          <ul className="mt-8 space-y-5 text-base leading-[1.6] text-[#16181b]">
            {valueProps.map((item) => (
              <li key={item.text} className="flex items-start justify-center gap-4 text-left sm:items-center sm:justify-start">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#111827] sm:mt-0">
                  <item.Icon
                    aria-hidden="true"
                    className={item.iconClassName}
                    strokeWidth={2}
                  />
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-start sm:gap-5 sm:flex-nowrap">
            <ScheduleCallButton url={SCHEDULE_CALL_URL} />
            <ClientTestimonialAvatarStack
              clients={featuredClients}
              ctaText="See real client results"
              ctaHref="/results"
              maxVisible={9}
            />
          </div>
          <HeroClientLogoGrid />
        </div>

        <div className="hidden w-full lg:block">
          <Image
            src="/hero-left-image.svg"
            alt="Conversions and acquisition dashboard preview"
            width={573}
            height={417}
            priority
            className="h-auto w-full object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}
