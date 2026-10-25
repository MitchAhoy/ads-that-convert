import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CallConfirmationPostHogCapture from "@/components/analytics/CallConfirmationPostHogCapture";
import {
  BeforeWeMeet,
  CONTACT_EMAIL,
  ConfirmationHero,
  WhatYouLeaveWith,
} from "@/components/call-confirmation/CallConfirmationSections";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { focusRing } from "@/components/home/primitives";
import { generateMeta } from "@/lib/seo";

// /call-confirmation on the homepage system (DESIGN.md §16.14). No booking
// buttons and no floating booking bar: the visitor has just booked.

const callConfirmationFaqs = [
  {
    question: "Who will I be speaking with?",
    answer: [
      "Me. I run every discovery call myself, and if we work together I'm the one planning, building and managing your account. There are no account managers or juniors.",
    ],
  },
  {
    question: "Do I need to give you access to my Google Ads account?",
    answer: [
      "No. A screenshot of the last 90 days by campaign is plenty for this call. Access only comes up if we decide to work together.",
    ],
  },
  {
    question: "What if I'm not running Google Ads yet?",
    answer: [
      "That's fine, and common. We'll look at what competitors are bidding on and work out whether the numbers could work for you before you spend anything.",
    ],
  },
  {
    question: "Will I know if Google Ads is a fit by the end of the call?",
    answer: [
      "Yes, that's the point of the call. You'll get a go or no-go based on your margins, conversion rates and targets. If it isn't a fit yet, I'll tell you directly and explain what would need to change.",
    ],
  },
  {
    question: "What happens after the call?",
    answer: [
      "If it's a fit and you want to go ahead, I'll send through pricing and next steps. Most accounts have campaigns live within 7 days of onboarding. If it isn't, you keep the recommendations either way.",
    ],
  },
  {
    question: "How do I reschedule?",
    answer: [`Email ${CONTACT_EMAIL} with a couple of times that suit you and I'll move the call.`],
  },
];

export function generateMetadata() {
  return generateMeta({
    title: "Call Booked | Ads That Convert",
    description:
      "Your 15-minute discovery call is booked. What to prepare, how the call runs and what you'll leave with.",
    path: "/call-confirmation",
    noIndex: true,
    follow: true,
  });
}

// Fillout appends `name` to the redirect URL. Use the first name only, and fall
// back to the plain headline if it's missing or doesn't look like a name.
function getFirstName(name) {
  const first = typeof name === "string" ? name.trim().split(/\s+/)[0] : "";
  return /^[\p{L}'-]{1,30}$/u.test(first) ? first.charAt(0).toUpperCase() + first.slice(1) : "";
}

export default async function CallConfirmationPage({ searchParams }) {
  const { name } = await searchParams;
  const firstName = getFirstName(name);

  return (
    <>
      <CallConfirmationPostHogCapture />
      <main className="bg-white">
        <ConfirmationHero firstName={firstName} />
        <BeforeWeMeet eyebrow="01 · Before we meet" marker={0} />
        <WhatYouLeaveWith eyebrow="02 · The call" marker={1} />
        <HomeTestimonials
          eyebrow="03 · Clients"
          marker={2}
          showCta={false}
          intro="While you wait: four clients on camera, talking about what working with me is actually like."
        />
        <HomeFaq
          eyebrow="04 · FAQ"
          marker={3}
          lead="What people ask"
          accent="before the call."
          items={callConfirmationFaqs}
          ask={{
            title: "Need a different time?",
            body: "Email me a couple of times that suit and I'll move the call.",
            action: (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`flex w-full items-center justify-center gap-2 rounded-[10px] bg-hp-ink px-4 py-3.25 font-hp text-base/5.5 font-medium text-white hover:bg-[#26282c] lg:w-auto lg:py-2.5 ${focusRing}`}
              >
                Email me to reschedule
              </a>
            ),
          }}
        />
        <HomeFinalCta
          lead="See you"
          accent="on the call."
          description="Until then, the case studies show how I work: where each account started, what I changed and what it did for new MRR."
          microcopy={null}
          action={
            <Link
              href="/results"
              className={`flex w-full items-center justify-center gap-2.25 rounded-xl bg-hp-ink px-4.5 py-4 font-hp text-[17px]/5.5 font-medium text-white shadow-[0_1px_2px_rgba(14,15,17,0.2),0_10px_28px_rgba(21,94,239,0.28)] hover:bg-[#26282c] sm:w-auto sm:px-6 lg:py-3.75 ${focusRing}`}
            >
              Read the case studies
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
          }
        />
      </main>
    </>
  );
}
