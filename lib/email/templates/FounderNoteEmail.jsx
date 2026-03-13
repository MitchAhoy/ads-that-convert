import buildEmailLayout from "@/lib/email/components/EmailLayout";

export const founderNoteSampleProps = {
  preheader: "A founder note from Mitch on account focus.",
  opener: "I would not start with new channels here.",
  title: "Most growth stalls because execution got polite",
  paragraphs: [
    "By polite, I mean nobody wants to cut what is underperforming because it still looks busy in reporting. Busy is not the same as useful.",
    "When we take over an account, we remove ambiguity first. Clear ownership by campaign objective, clear query intent, clear decision cadence.",
    "The result is usually fewer debates and faster learning loops. You stop guessing and start compounding what actually moves pipeline.",
  ],
  quote:
    "Performance improved when the team stopped protecting legacy structure and started protecting decision quality.",
  optionalParagraph: "If your account has grown fast, this cleanup is often the highest leverage week you can run this quarter.",
  ctaLabel: "Book a free strategy call →",
  ctaUrl: "https://www.adsthatconvert.co/book",
  accentTarget: "dot",
};

export default function renderFounderNoteEmail(props = founderNoteSampleProps) {
  return buildEmailLayout(props);
}
