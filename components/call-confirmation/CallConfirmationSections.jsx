import { Check, Minus } from "lucide-react";
import QuoteAttribution from "@/components/ui/QuoteAttribution";

const container = "mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8";
const level2 = "shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]";
const inlineLink = "font-semibold text-ink underline decoration-ink underline-offset-2";

export const CONTACT_EMAIL = "mitch@adsthatconvert.co";

// ─── Before we meet: editorial list (DESIGN.md §7.7) ─────────────────────

const prepSteps = [
  {
    title: "Accept the calendar invite",
    description: (
      <>
        It has the Google Meet link. If it hasn&apos;t arrived in a few minutes, check your spam folder, then email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLink}>
          {CONTACT_EMAIL}
        </a>{" "}
        and I&apos;ll resend it.
      </>
    ),
  },
  {
    title: "Have three numbers to hand",
    description:
      "Your average revenue per customer (or LTV), your sign-up or demo to paid rate, and your monthly ad spend if you're running any. Rough figures are fine. They decide whether paid search can pay back, so with them we can get to a real answer on the call.",
  },
  {
    title: "Send anything that adds context",
    description: (
      <>
        Already running Google Ads? A screenshot of the last 90 days by campaign is enough. No account access needed
        yet. Reply to the invite or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLink}>
          {CONTACT_EMAIL}
        </a>
        .
      </>
    ),
  },
];

export function BeforeWeMeet() {
  return (
    <section aria-labelledby="before-we-meet-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="before-we-meet-title" className="font-display text-h2 text-balance text-ink lg:col-span-5">
            Before we meet <span className="block text-muted">three small things</span>
          </h2>
          <p className="max-w-[32em] text-lg leading-[1.5] text-pretty text-body lg:col-span-7 lg:self-end">
            None of it is required. Each one means less time on background and more time on whether Google Ads will
            work for you.
          </p>
        </div>

        <ol className="mt-10 border-t border-border sm:mt-14">
          {prepSteps.map(({ title, description }, index) => (
            <li
              key={title}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-x-10"
            >
              <h3 className="text-xl font-bold text-ink sm:text-2xl lg:col-span-5">
                <span className="mr-3 text-sm font-medium text-body tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {title}
              </h3>
              <p className="max-w-[36em] text-copy leading-[1.5] text-pretty text-body lg:col-span-7">{description}</p>
            </li>
          ))}
        </ol>

        <QuoteAttribution
          compact
          className="mt-6 border-t border-border pt-5"
          quote="He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign."
          person="Sunny Jain"
          role="CEO"
          company="A&J Education"
          avatarSrc="/client pfp/sunny.png"
          avatarAlt="Sunny Jain"
        />
      </div>
    </section>
  );
}

// ─── What you'll leave with: split card, like the service-page fit card ──

const youGet = [
  "A straight go or no-go on Google Ads, based on your margins and conversion rates",
  "The first two or three changes I'd make, whether or not we work together",
  "A realistic ad spend for a test that tells you something",
  "If it's a fit, pricing and how onboarding works",
];

const itIsnt = [
  "A pitch deck or a hard sell",
  "A handoff. I run the call, and the account if we work together",
  "A push into a long contract. Plans are month-to-month with 7 days' notice",
];

function OutcomeList({ heading, items, Icon }) {
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

export function WhatYouLeaveWith() {
  return (
    <section aria-labelledby="leave-with-title" className="pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <div className="max-w-[680px]">
          <h2 id="leave-with-title" className="font-display text-h2 text-balance text-ink">
            What you&apos;ll leave with
          </h2>
          <p className="mt-4 text-lg leading-[1.5] text-pretty text-body">
            Fifteen minutes is enough for a clear answer on whether Google Ads makes sense for your product right now.
            It isn&apos;t enough for a sales pitch, so there won&apos;t be one.
          </p>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white sm:mt-14 md:grid-cols-2 ${level2}`}
        >
          <div className="px-6 py-7 sm:px-8 sm:py-8 md:border-r md:border-border">
            <OutcomeList heading="What you'll get" items={youGet} Icon={Check} />
          </div>
          <div className="border-t border-border px-6 py-7 sm:px-8 sm:py-8 md:border-t-0">
            <OutcomeList heading="What it isn't" items={itIsnt} Icon={Minus} />
          </div>
        </div>

        <p className="mt-6 max-w-[40em] text-lg leading-[1.5] text-pretty text-body">
          If paid search doesn&apos;t look like it will pay back for you yet, I&apos;ll say so on the call and tell you
          what would need to change first.
        </p>

        <QuoteAttribution
          compact
          className="mt-9 border-t border-border pt-7"
          quote="Explained difficult concepts clearly and went above and beyond to make sure we were happy."
          person="Matt Robinson"
          role="Co-Founder"
          company="Live Tourney"
          avatarSrc="/client pfp/matt robinson.png"
          avatarAlt="Matt Robinson"
        />
      </div>
    </section>
  );
}
