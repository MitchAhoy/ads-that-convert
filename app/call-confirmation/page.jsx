import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CallConfirmationPostHogCapture from "@/components/analytics/CallConfirmationPostHogCapture";
import CallAgendaWindow from "@/components/call-confirmation/CallAgendaWindow";
import { BeforeWeMeet, CONTACT_EMAIL, WhatYouLeaveWith } from "@/components/call-confirmation/CallConfirmationSections";
import PageHero from "@/components/sections/PageHero";
import Testimonials from "@/components/sections/Testimonials";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CallToActionCard from "@/components/ui/CallToActionCard";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { generateMeta } from "@/lib/seo";

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
    answer: [`Email **${CONTACT_EMAIL}** with a couple of times that suit you and I'll move the call.`],
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

      <GridFrame bleedTop>
        <PageHero
          id="call-confirmation-title"
          pill={
            <>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>
                <span className="text-ink">Call booked</span> · 15 min on Google Meet
              </span>
            </>
          }
          title={firstName ? `Thanks ${firstName}, your call is booked` : "Your call is booked"}
          description="A calendar invite with the Google Meet link is on its way. Before we talk, I'll review your site and current setup, so we can spend the 15 minutes on whether Google Ads will pay back for you."
          showCta={false}
          aside={<CallAgendaWindow />}
        >
          <p className="mt-8 text-base leading-normal text-body">
            Need a different time?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-ink underline decoration-ink underline-offset-2"
            >
              Email me
            </a>{" "}
            and I&apos;ll move it.
          </p>
        </PageHero>
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <BeforeWeMeet />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <WhatYouLeaveWith />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <Testimonials title="Founders and marketers, on the record" sectionId="client-videos" />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <FaqAccordion
          title="What people ask before the call"
          items={callConfirmationFaqs}
          numbered
          sidebar={{
            title: "Need a different time?",
            description: "Email me a couple of times that suit and I'll move the call.",
            action: (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-fit items-center gap-1 border-b border-ink text-base font-semibold text-ink transition-colors hover:border-body hover:text-body"
              >
                Email me to reschedule
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            ),
          }}
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <section aria-labelledby="final-cta-title" className="pt-10 pb-16">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            <CallToActionCard
              id="final-cta-title"
              title="See you on the call"
              description="Until then, the case studies show how I work: where each account started, what I changed and what it did for new MRR."
              action={
                <Link
                  href="/results"
                  className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6.5 py-4 text-base font-semibold text-white shadow-[0_6px_18px_rgba(26,26,24,0.18)] transition-colors hover:bg-[#2d2d2a]"
                >
                  Read the case studies
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                </Link>
              }
            />
          </div>
        </section>
      </GridFrame>
    </>
  );
}
