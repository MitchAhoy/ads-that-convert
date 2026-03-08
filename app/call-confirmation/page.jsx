import PageHeadline from "@/components/ui/PageHeadline";
import CallConfirmationHeroDetails from "@/components/call-confirmation/CallConfirmationHeroDetails";
import CallSocialProofWall from "@/components/call-confirmation/CallSocialProofWall";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { generateMeta } from "@/lib/seo";

const callConfirmationFaqs = [
  {
    question: "What should I prepare for the 15-minute discovery call?",
    answer:
      "Bring your core offer, current goals, and a quick view of your sales process. If you already run Google Ads, sharing account context and recent performance helps us get specific faster.",
  },
  {
    question: "Will we know if Google Ads is a fit by the end of the call?",
    answer:
      "Yes. The purpose is to make a clear go or no-go decision based on your margins, conversion flow, and growth targets. If it is not a fit yet, I will tell you directly.",
  },
  {
    question: "Do I get tactical guidance even if we do not move forward together?",
    answer:
      "Yes. You will leave with practical next steps you can apply immediately, whether we work together afterward or not.",
  },
  {
    question: "What happens if I need to reschedule?",
    answer:
      "Use the same booking link to pick a better time, or email mitch@adsthatconvert.co and I will help you move it quickly.",
  },
];

export function generateMetadata() {
  return generateMeta({
    title: "Call Confirmed | Ads That Convert",
    description:
      "Your 15-minute discovery call is confirmed. Here is what happens next, what to prepare, and proof from teams we have helped grow.",
    path: "/call-confirmation",
  });
}

export default function CallConfirmationPage() {
  return (
    <>
      <PageHeadline
        id="call-confirmation-heading"
        title="You are booked for a 15-minute discovery call"
        description="Great decision. This page will help you get the most value from our conversation and show exactly what outcomes you can expect."
      />
      <CallConfirmationHeroDetails />
      <CallSocialProofWall />
      <FaqAccordion title="Common questions before we meet" items={callConfirmationFaqs} />
    </>
  );
}
