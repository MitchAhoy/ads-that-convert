export const defaultFaqItems = [
  {
    question: "Will Google Ads work for my SaaS business?",
    answer: [
      "Before we work together, I look at your sign-up to paid rate, customer lifetime value and target payback, and compare them with what clicks cost for your keywords. That shows what the campaigns need to hit to be profitable, and how realistic it is. If the numbers don't work, I'll tell you on the call. If they do, the same numbers become the targets I report against.",
    ],
  },
  {
    question: "What happens on the 15-min call?",
    answer: [
      "You talk to me, not a sales rep. You don't need to give me access to your Google Ads account. Rough figures for revenue per customer, sign-up to paid rate and current ad spend are enough.",
      "By the end you'll get a go or no-go on paid search. If it isn't a fit yet, I'll say so and explain what would need to change.",
    ],
  },
  {
    question: "How much does it cost in total?",
    answer: [
      "Two parts. My management fee starts at $2,000 a month. Your ad spend is paid to Google directly, on your own card.",
      "Most of my clients start with $5,000 to $10,000 a month in ad spend and scale up once results come in. The right amount depends on your sign-up to paid rate, customer lifetime value and target payback, and I'll size it with you on the call.",
    ],
  },
  {
    question: "Who does the work once I sign on?",
    answer: [
      "Me. From the first call to the weekly reports, you deal with me. There are no account managers, juniors or offshore staff on your account.",
      "I've worked in paid media for 8+ years across 85+ verticals, in agencies, as a freelancer and in my own businesses. I keep a small client list on purpose, so your account gets real hours from the person who built it.",
    ],
  },
  {
    question: "How quickly will my campaigns go live?",
    answer: [
      "Most accounts have campaigns live within 7 days of onboarding. That includes the tracking, so trials, demos and paid customers are reported back to Google Ads from the start.",
    ],
  },
  {
    question: "Is there a contract? What if I want to stop?",
    answer: [
      "There are no lock-in contracts. It's month-to-month. Campaigns run in your own Google Ads account, on your card, so if we stop working together everything stays with you.",
    ],
  },
  {
    question: "How do you measure success?",
    answer: [
      "We agree the targets before you sign or pay anything, usually cost per trial or demo, cost per paying customer and months to payback. My reports are written against those. I can't guarantee results (no one can), but I'll make sure your campaigns have every chance of success.",
    ],
  },
  {
    question: "Isn't Google Ads for SaaS expensive and competitive?",
    answer: [
      "Often, yes. But the cost of a click doesn't matter on its own. What matters is whether more revenue comes back than you spend. Search is competitive because it works. I've run accounts with clicks over $100 that stayed profitable.",
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
