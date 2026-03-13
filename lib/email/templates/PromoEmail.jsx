import buildEmailLayout from "@/lib/email/components/EmailLayout";

export const promoSampleProps = {
  preheader: "You can spot this issue in ten minutes during an audit.",
  opener: "We see this in mature SaaS accounts all the time.",
  title: "Your CAC climbs when match type discipline gets loose",
  paragraphs: [
    "Broad terms are not the problem by themselves. Broad terms without strict negatives and ownership rules are the problem.",
    "Once query intent gets noisy, your landing page starts carrying the burden. Then teams blame CRO when acquisition quality was lost upstream.",
    "Keep broad where discovery matters, but protect budget with tight exact clusters for high-buying intent. That balance gives you room to scale.",
  ],
  quote:
    "We did not need a new offer. We needed better control over who saw each message and why.",
  optionalParagraph: "If conversion quality is slipping, the query report tells the truth faster than dashboard summaries.",
  ctaLabel: "Book a free strategy call →",
  ctaUrl: "https://www.adsthatconvert.co/book",
  accentTarget: "quote",
};

export default function renderPromoEmail(props = promoSampleProps) {
  return buildEmailLayout(props);
}
