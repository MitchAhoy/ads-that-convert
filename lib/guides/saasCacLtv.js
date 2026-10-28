// Copy shared by the /guides/saas-paid-search-cac-ltv page and its FAQPage
// JSON-LD, so the visible FAQ and the schema always match.

export const guidePath = "/guides/saas-paid-search-cac-ltv";

export const guideUpdated = "28 Oct 2026";

// Short name for link lists such as /llms.txt.
export const guideName = "SaaS paid search: CAC, LTV and payback";

export const guideSeo = {
  title: "SaaS Paid Search: CAC, LTV and Payback Guide | Ads That Convert",
  description:
    "How I plan and judge SaaS Google Ads on CAC, LTV, LTV:CAC, payback period and pipeline quality, with formulas, CRM offline conversions and a worked example.",
  keywords: [
    "SaaS paid search CAC",
    "SaaS Google Ads LTV CAC",
    "SaaS payback period paid search",
    "paid search agency SaaS metrics",
  ],
};

export const guideFaqItems = [
  {
    question: "What is a good LTV:CAC ratio for SaaS paid search?",
    answer: [
      "3:1 is the common benchmark: each customer brings in three times what they cost to acquire, measured on gross margin. Below that, paid search is usually funding growth you can't afford to scale. Well above it often means you're under-spending and leaving customers to competitors.",
      "The ratio alone isn't enough, because it says nothing about cash. A 4:1 ratio that takes three years to pay back can still strain a company, so I always pair it with a payback ceiling.",
    ],
  },
  {
    question: "Should I judge Google Ads on blended CAC or paid CAC?",
    answer: [
      "Both, for different jobs. Paid CAC (what paid search spent, divided by the customers it brought in) is what you bid and budget against. Blended CAC (all sales and marketing cost, divided by all new customers) is what tells you whether the business as a whole is acquiring efficiently.",
      "If paid CAC looks great but blended CAC is rising, paid search may be taking credit for customers who would have come anyway, often through brand terms. That's why I report brand and non-brand on separate lines.",
    ],
  },
  {
    question: "How long before I can judge CAC from Google Ads?",
    answer: [
      "Expect a reliable read on cost per paid customer around month two or three, once enough trials have had time to convert. Payback takes longer to confirm, because it needs a few months of revenue from each cohort of customers.",
    ],
  },
  {
    question: "Can Google Ads bid to pipeline or revenue instead of leads?",
    answer: [
      "Yes. Capture the click ID with each sign-up or lead, then send later stages (qualified lead, opportunity, closed-won, first payment) back to Google Ads as offline conversions with a value. Google then bids toward the searches that turn into revenue, not the ones that only fill forms.",
      "It needs enough volume at the stage you bid to. If closed-won deals are too rare for Google to learn from, I bid to an earlier stage, such as a sales-qualified lead, valued by how often it closes.",
    ],
  },
  {
    question: "What if I don't know my LTV yet?",
    answer: [
      "Use a conservative stand-in. Cap lifetime at 24 or 36 months, or simply set the target from payback: how many months of gross margin you're willing to wait to get the acquisition cost back. That gives a maximum CAC you can defend without guessing at five-year retention.",
    ],
  },
  {
    question: "Do you work out these targets before I spend anything?",
    answer: [
      "Yes. Before we work together, I look at your sign-up to paid rate, customer lifetime value and target payback, and compare them with what clicks cost for your keywords. If the numbers don't work, I'll tell you on the call. If they do, the same numbers become the targets I report against.",
    ],
  },
];
