import { BadgeDollarSign, RefreshCw, UserRound } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

const fitPoints = [
  {
    title: "A SaaS businesses that need more customers",
    description:
      "If your SaaS company needs qualified users who are ready to become paying subscribers, I can optimize your Google Ads to deliver consistent leads.",
    Icon: UserRound,
  },
  {
    title: "Turning over of at least $20k/mth in revenue",
    description:
      "I'll use Google Ads to pour fuel on the fire. We need to know you have product market fit to be confident that you have a service that people are going to buy.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Have a strong retention rate",
    description:
      "New users are great but we need to know that they will stay long enough to generate profit from their LTV.",
    Icon: RefreshCw,
  },
];

export default function WhoIsThisFor() {
  return (
    <section aria-labelledby="who-is-this-for-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[780px] text-center">
          <h2
            id="who-is-this-for-title"
            className="font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0c2237]"
          >
            Who is this for?
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-zinc-900 sm:text-lg">
            My services will turn on a tap of consistent flowing leads but
            it&apos;s not for everyone. We&apos;re likely a fit for each other if
            you&apos;re:
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {fitPoints.map((point) => (
            <article key={point.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center text-zinc-950">
                <point.Icon aria-hidden="true" className="h-12 w-12" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0c2237]">
                {point.title}
              </h3>
              <p className="mt-3 text-base leading-[1.6] text-zinc-900 sm:text-lg">
                {point.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <ScheduleCallButton href="#" />
        </div>
      </div>
    </section>
  );
}
