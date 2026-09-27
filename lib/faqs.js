export const defaultFaqItems = [
  {
    question: "Will Google Ads work for my SaaS business?",
    answer: [
      "If people already search for the problem your product solves, **Google Ads can put you in front of them** when they are ready to buy. On a call I'll look at search demand for your category and tell you straight if it's a fit.",
      { lead: "Not sure you are a fit?", label: "Book a quick call" },
    ],
  },
  {
    question: "Isn't Google Ads for SaaS expensive and extremely competitive?",
    answer: [
      "It gets expensive when budget goes to broad keywords and vanity clicks. **Laser-focused targeting** on high-intent searches keeps cost per customer in line with what a customer is worth to you.",
    ],
  },
  {
    question: "Why would I choose you over another agency or Google Ads manager for my SaaS?",
    answer: [
      {
        list: [
          "**Senior operator** on every task, from strategy to build",
          "Reporting tied to **pipeline and sales**, not clicks",
          "**No lock-in contracts** or minimum terms",
        ],
      },
    ],
  },
  {
    question: "How do you measure success when running campaigns for SaaS?",
    answer: [
      "**Pipeline and revenue.** Reporting tracks sign-ups, trials, demos and paid conversions back to the campaign that drove them.",
    ],
  },
  {
    question: "What is the minimum investment I can make to get started?",
    answer: [
      "**Growth is $2,000/mo** for up to $25,000 monthly ad spend.",
      "Above $25K, the **Scale** plan is priced to your account.",
      { lead: "Want a custom quote?", label: "Book a quick call" },
    ],
  },
  {
    question: "Who am I dealing with and who is completing the work once I sign on?",
    answer: [
      "**Mitch, directly.** No account managers and no junior handoffs. You get a Slack channel with the person building your campaigns.",
    ],
  },
];

export function flattenFaqAnswer(answer) {
  return answer
    .map((block) => {
      if (typeof block === "string") {
        return block.replace(/\*\*(.+?)\*\*/g, "$1");
      }
      if (block.list) {
        return block.list.map((item) => item.replace(/\*\*(.+?)\*\*/g, "$1")).join(" ");
      }
      if (block.lead) {
        return `${block.lead} ${block.label}`;
      }
      return "";
    })
    .join(" ");
}
