import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Shared by the /pricing page and the WebMCP agent tools, so both always
// describe the same plans.
export const pricingPlans = [
  {
    title: "Account Audit",
    price: "$900",
    description: "One-time Google Ads audit for SaaS teams.",
    ctaLabel: "Purchase Audit",
    ctaHref: "https://buy.stripe.com/4gMcN64EreqV6gQfWW2Ry0n",
    features: [
      "Full account diagnostic (campaigns, structure, settings)",
      "Tracking and attribution accuracy check",
      "Wasted spend + quick-win opportunities report",
      "Prioritized 30-day action plan",
      "60-minute walkthrough call with Q&A",
    ],
  },
  {
    title: "Growth",
    price: "USD$1,500",
    cadence: "mo",
    description: "up to USD$25,000 monthly ad spend",
    ctaLabel: "Book a 15-min call",
    ctaHref: SCHEDULE_CALL_URL,
    features: [
      "End-to-end campaign set up",
      "Direct communication via Slack",
      "Transparent reporting w/ custom dashboards",
      "Access to all project management tasks",
      "No lock-in contracts or minimum terms",
    ],
  },
  {
    title: "Scale",
    price: "Custom",
    description: "USD$25,000+ monthly ad spend",
    ctaLabel: "Book a 15-min call",
    ctaHref: SCHEDULE_CALL_URL,
    features: [
      "End-to-end campaign set up",
      "Direct communication via Slack",
      "Transparent reporting w/ custom dashboards",
      "Access to all project management tasks",
      "No lock-in contracts or minimum terms",
    ],
  },
];

export const pricingFaqItems = [
  {
    question: "Are there long-term contracts or minimum commitments?",
    answer:
      "No. Everything is month-to-month, so you stay because performance is strong, not because you're locked in. If you decide to stop, you can cancel anytime with 28 days' notice.",
  },
  {
    question: "How much should I invest in ad spend to get results?",
    answer:
      "It varies by industry and offer because CPCs, conversion rates, sales cycles, and targets all affect required spend. As a practical starting point, most SaaS businesses begin in the $3,000-$5,000/month range, then scale once we identify profitable segments and stable conversion performance.",
  },
  {
    question: "How long after I sign up will I start seeing results?",
    answer:
      "The goal is to get you onboarded and live as fast as possible. Most businesses have campaigns live within 7 days so data starts flowing quickly. Timelines can extend when tracking setups are complex or when ad assets and approvals take longer to finalize.",
  },
];
