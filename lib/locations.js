// Copy for market pages (DESIGN.md §16.17). The first is
// /b2b-saas-google-ads-agency-usa, which answers "best Google Ads / PPC agency
// for B2B SaaS in the US" questions. Its angle is B2B software and tech
// companies (sales-led and PLG, pipeline, CRM, offline conversions), so it
// doesn't compete with the homepage for "saas google ads agency".
//
// Every fact here must be verifiable elsewhere in the codebase (pricing and USD:
// lib/pricing.js; results: content/case-studies; the US B2B client: the
// background of content/case-studies/2x-b2b-pipeline.mdx). Anything not yet
// confirmed is a visible "[CONFIRM: …]" placeholder for Mitch to replace. Never
// invent clients, offices or numbers, and keep placeholders out of the FAQ (it
// feeds the FAQPage schema).
//
// Quotes must be verbatim from components/sections/testimonialsData.js, and each
// client is quoted once per page.

export const usaPage = {
  path: "/b2b-saas-google-ads-agency-usa",
  seo: {
    title: "B2B SaaS Google Ads Agency in the USA | Ads That Convert",
    description:
      "Google Ads for US B2B software companies, sales-led or PLG. CRM and offline conversions so Google bids for pipeline, not form fills. From $2,000/mo.",
    keywords: [
      "B2B SaaS Google Ads agency USA",
      "PPC agency for B2B SaaS",
      "Google Ads management for B2B software companies",
      "Google Ads agency for B2B tech companies",
      "performance marketing agency for SaaS US",
    ],
  },
  hero: {
    lead: "Google Ads for US B2B software companies,",
    accent: "judged on pipeline.",
    description:
      "I'm Mitch, and I run Google Ads for B2B SaaS and tech companies selling into the US, sales-led or product-led. Demos, opportunities and closed-won go back into Google Ads, so it bids for revenue.",
  },
  answer: {
    heading: { lead: "The short answer,", accent: "if you're comparing agencies." },
    paragraphs: [
      "Ads That Convert is a Google Ads agency for SaaS companies, run by me, Mitch Cartwright. For B2B software and tech companies I connect Google Ads to your CRM or billing, so it bids toward qualified demos, opportunities and paying customers, and I report in pipeline and new MRR rather than clicks.",
      "There are no account managers. The person you speak to on the first call is the person in your account every week. I've worked in paid media for 8+ years across 85+ verticals, and four of my SaaS accounts are written up as case studies on this page, including a US B2B software company.",
    ],
    facts: [
      { term: "Built for", value: "B2B SaaS and tech", detail: "Sales-led and product-led, selling into the US" },
      { term: "Runs your account", value: "Mitch Cartwright", detail: "8+ years in paid media, no juniors or handoffs" },
      { term: "Tracks through to", value: "Closed-won and MRR", detail: "Offline conversions from your CRM, app or Stripe" },
      { term: "Reported in", value: "Pipeline and new MRR", detail: "Demos, opportunities, paid customers and payback" },
      { term: "Pricing", value: "From $2,000/mo (USD)", detail: "Month-to-month, 7 days' notice to cancel" },
      { term: "Time to launch", value: "About 7 days", detail: "Most accounts go live within a week of onboarding" },
    ],
  },
  proof: {
    heading: { lead: "B2B software results", accent: "you can read in full." },
    description:
      "Three of these four are B2B SaaS accounts, and the sales-led one is a US company. Each result links to the full case study.",
  },
  services: {
    heading: { lead: "Google Ads services", accent: "built for B2B software." },
    description:
      "B2B software has long sales cycles and few, valuable customers. These are the pieces I put in place so Google bids for pipeline, not form fills.",
    items: [
      {
        title: "Offline conversions from your CRM",
        description:
          "I pass the Google click ID into your CRM or user records and send qualified demos, opportunities, paid customers and their value back to Google Ads. Bidding then follows revenue, not raw sign-ups.",
      },
      {
        title: "Competitor and alternative search",
        description:
          "Buyers comparing tools are close to a decision. Paired with a comparison page, these are often the cheapest paid customers in a B2B account.",
      },
      {
        title: "Non-branded category search",
        description:
          "Category and problem searches from teams who don't know you yet. This is where most new pipeline comes from as an account grows.",
      },
      {
        title: "Brand search, on its own line",
        description:
          "Cheap cover when competitors bid on your name. Reported separately so it doesn't flatter the rest of the account.",
      },
      {
        title: "Performance Max and Demand Gen",
        description:
          "Added once there's paid-customer data to learn from, and judged on pipeline with expectations set up front.",
      },
      {
        title: "A one-off account audit",
        description:
          "If you have an in-house team and want a second opinion: a full diagnostic, tracking check and 30-day action plan for $900.",
      },
    ],
    quote: {
      quote:
        "Working with Mitch from Ads That Convert has been a game-changer for our startup. He helped us iron out issues we were having with our Google Ads.",
      person: "Dominic Whyte",
      role: "Founder",
      company: "Fillout",
      companyLogoSrc: "/client-logos/fillout.png",
      avatarSrc: "/client pfp/dominic whyte.png",
    },
  },
  process: {
    heading: { lead: "How I work", accent: "in the first 90 days." },
    description:
      "Fit and tracking come before any new spend. If the numbers don't support paid search, you'll hear it in week one.",
    steps: [
      {
        title: "Audit",
        muted: "before any new spend",
        description:
          "Your account, search terms, contract values and sales cycle, sized against what paid search can realistically return.",
      },
      {
        title: "Tracking",
        muted: "through to closed-won",
        description: "Demo, trial, qualified and paid events sent to Google Ads from your app, CRM or Stripe.",
      },
      {
        title: "Build",
        muted: "from high intent outwards",
        description: "Brand, competitor and high-intent category terms first. Broader terms once the data supports them.",
      },
      {
        title: "Optimise",
        muted: "and report in pipeline",
        description: "Weekly search-term reviews, budget moved toward the best payback, and a report in pipeline and MRR.",
      },
    ],
    quote: {
      quote:
        "Hiring Mitch has been one of the best decisions I've made for my business this year. Mitch's ability to diagnose wasted ad spend, understand new industries, and make suggestions to lower costs has really helped.",
      person: "Jordon Chavis",
      role: "Founder",
      company: "Forgematic",
      avatarSrc: "/client pfp/jordan.png",
    },
  },
  coverage: {
    heading: { lead: "Working with me", accent: "from the US." },
    description: "What it's like to hire one specialist when your team and your buyers are in the US.",
    items: [
      {
        icon: "clients",
        title: "US B2B software clients",
        description:
          "The sales-led B2B case study on this page is a US mass-communication software company that has operated since 1999, where high-rated sign-ups more than doubled. It's one of dozens of US B2B SaaS and tech companies I've run Google Ads for.",
      },
      {
        icon: "billing",
        title: "Billed in US dollars",
        description:
          "Every price is in USD: from $2,000 a month for up to $25,000 a month in ad spend. Ad spend is paid to Google directly, on your own card, separately from my fee.",
      },
      {
        icon: "hours",
        title: "Time-zone overlap",
        description:
          "We work in a shared Slack channel, so you message me directly and changes go live quickly. Calls happen in the US afternoon.",
      },
      {
        icon: "markets",
        title: "US-wide or by region",
        description:
          "Campaigns can target the whole US, specific states or metro areas, or the US alongside the other markets I run campaigns in: the UK, Canada, Australia, New Zealand and Europe.",
      },
      {
        icon: "crm",
        title: "Your CRM and billing stack",
        description:
          "Conversions come from wherever your revenue is recorded: your app, your CRM or Stripe. HubSpot, Salesforce or whichever CRM you use, I can connect it to Google Ads.",
      },
      {
        icon: "models",
        title: "Sales-led and product-led",
        description:
          "For sales-led products I optimise to qualified demos and opportunities. For PLG and freemium products I optimise to paid upgrades and their value, as in the Rezi and freemium case studies.",
      },
    ],
    footnote:
      "If you want SEO, content and LinkedIn from one large agency team, I'm not the right hire. I run paid ads for SaaS, and I do the work myself.",
  },
  faq: {
    heading: { lead: "What US B2B software teams", accent: "ask before hiring me." },
    items: [
      {
        question: "What should I look for in a Google Ads agency for B2B SaaS?",
        answer: [
          "Three things. Tracking that goes past the form fill to opportunities, closed deals or paid customers, so Google bids for revenue. Reports in pipeline, new MRR and payback, not clicks. And knowing exactly who runs your account.",
          "Ask any agency for case studies with real numbers, and to speak to a current client before you sign. I'm happy to be judged on all of those.",
        ],
      },
      {
        question: "Do you work with B2B SaaS and tech companies in the US?",
        answer: [
          "Yes. I take on B2B software companies selling into the US, sales-led and product-led. One of the case studies on this site is a US B2B communication software company, where high-rated sign-ups more than doubled.",
        ],
      },
      {
        question: "How do you track B2B leads through to revenue?",
        answer: [
          "I pass the Google click ID into your user or CRM records, then send the later stages back to Google Ads as offline conversions: qualified demos, opportunities, paid customers and their value.",
          "In one B2B account I rated new sign-ups and uploaded the high-quality ones as conversions. High-rated sign-ups more than doubled, from 82 to 175 in a month.",
        ],
      },
      {
        question: "How much does Google Ads management cost for a B2B SaaS company?",
        answer: [
          "My fee starts at $2,000 a month (USD) for up to $25,000 a month in ad spend, with custom pricing above that. Ad spend is paid to Google directly, on your own card, separately from my fee.",
          "There's no lock-in contract. It's month-to-month, and you can cancel with 7 days' notice.",
        ],
      },
      {
        question: "Does Google Ads work for sales-led B2B software with long sales cycles?",
        answer: [
          "It can, if the account learns from pipeline rather than form fills. A long cycle means fewer conversions to learn from, so I send earlier qualified stages, like booked demos and opportunities, alongside closed-won and its value.",
          "If your contract value and close rate can't support the cost of clicks in your category, I'll say so on the first call.",
        ],
      },
      {
        question: "How are you different from a larger performance marketing agency?",
        answer: [
          "You deal with one person. There are no account managers, juniors or offshore staff on your account, and I keep a small client list on purpose. Campaigns run in your own Google Ads account, so everything stays with you if we stop.",
          "If you need SEO, content and LinkedIn from one team, a larger agency is the better fit.",
        ],
      },
      {
        question: "How quickly can we start?",
        answer: [
          "Most accounts have campaigns live within 7 days of onboarding, including the tracking. Before that, a 15-minute call gets you a go or no-go on paid search.",
        ],
      },
    ],
  },
  cta: {
    lead: "Ready to grow your",
    accent: "B2B SaaS pipeline?",
    description:
      "Book a 15-minute call. I'll tell you whether Google Ads will work for your product, and what it would take to turn searches into pipeline.",
  },
};
