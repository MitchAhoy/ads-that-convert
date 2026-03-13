import buildEmailLayout from "@/lib/email/components/EmailLayout";

export const newsletterSampleProps = {
  preheader: "We keep finding the same conversion leak in SaaS accounts.",
  opener: "Most teams are not short on budget. They are short on signal quality.",
  title: "The fastest way to waste spend is treating all search intent as equal",
  paragraphs: [
    "When we audit accounts, this shows up fast. High-intent and low-intent terms sit in the same campaign, then bidding tries to average the chaos.",
    "You feel it as rising cost per qualified lead and unstable volume week to week. The platform keeps spending, but your pipeline confidence drops.",
    "Split intent by campaign goal and write ad copy for the query you actually bought. That one move usually improves both lead quality and pacing.",
  ],
  quote:
    "The account was not underfunded. It was under-structured. Once intent was separated, performance stopped swinging.",
  optionalParagraph:
    "If your SQL rate moves more than your CTR, structure is usually the lever, not creative refreshes.",
  ctaLabel: "Book a free strategy call →",
  ctaUrl: "https://www.adsthatconvert.co/book",
  accentTarget: "cta",
};

export default function renderNewsletterEmail(props = newsletterSampleProps) {
  return buildEmailLayout(props);
}
