// One entry per /services/[slug] page. Layout lives in
// components/services/ServicePageTemplate.jsx; channel mockups live in
// components/services/<slug>/ and are looked up by slug.
//
// `indexable: false` renders the page as "noindex, follow" and leaves it out of
// the sitemap. /services/google-ads is noindexed so it never competes with the
// homepage for "saas google ads agency".
//
// `proof.mode`:
// - "case-studies": the written case studies (only Google Ads has them so far)
// - "snapshots": short, anonymised account numbers for channels without a write-up
//
// Quotes must be verbatim from components/sections/testimonialsData.js. Each
// client is quoted once per page: the testimonial slider skips anyone quoted here.
export const services = [
  {
    slug: "google-ads",
    name: "Google Ads",
    indexable: false,
    seo: {
      title: "Google Ads Management for SaaS | Ads That Convert",
      description:
        "Google Ads management for SaaS companies, judged on new MRR and payback. Search, competitor and Performance Max campaigns run by one senior operator.",
      keywords: ["Google Ads management for SaaS", "SaaS PPC management", "B2B SaaS Google Ads"],
    },
    hero: {
      title: "Google Ads management, judged on new MRR and payback",
      description:
        "I run search, competitor and Performance Max campaigns for SaaS companies. Paid sign-ups and their value go back into Google Ads, so it bids for customers, not clicks.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    proof: {
      mode: "case-studies",
      title: "What the accounts produced",
      description:
        "Three SaaS accounts with three different sales models. Each result links to the full write-up.",
      quote: {
        quote: "We would highly recommend this team to any SaaS business serious about paid growth.",
        person: "Dave Batchelor",
        role: "Co-Founder",
        company: "DialMyCalls",
        companyLogoSrc: "/client-logos/dialmycalls.png",
        avatarSrc: "/client pfp/dave batchelor.png",
      },
    },
    leaks: {
      title: "Where SaaS Google Ads budgets leak",
      titleAside: "and how I close each one",
      description:
        "Most accounts I audit lose money in the same few places. None of them are fixed by raising the budget.",
      items: [
        {
          title: "Bidding for sign-ups, not customers",
          description:
            "Google bids toward whatever you count as a conversion. If that's every free sign-up, it finds cheap sign-ups that never pay. I send trial, paid and MRR events back so it learns which clicks become customers.",
        },
        {
          title: "Broad match without guardrails",
          description:
            "Broad match can work for SaaS, but only with value-based bidding and a maintained negative list. Without both, it spends on students, job seekers and people looking for free tools.",
        },
        {
          title: "Brand and non-brand in one campaign",
          description:
            "Branded clicks are cheap and convert well, so they hide how everything else performs. I split them so you can see what search adds beyond people who already know you.",
        },
        {
          title: "Performance Max with nothing to learn from",
          description:
            "Without conversion data and audience signals, PMax drifts into cheap display and video placements. I only switch it on once both are in place.",
        },
        {
          title: "One landing page for every search",
          description:
            "Someone comparing you to a competitor needs a different page from someone searching for the category. I match pages to intent and flag where the page, not the ad, is losing sign-ups.",
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
      title: "Your first 90 days",
      description:
        "Fit and tracking come before any new spend. If the numbers don't support paid search, you'll hear it in week one.",
      steps: [
        {
          title: "Audit",
          description:
            "Your account, search terms and unit economics, sized against what paid search can realistically return.",
        },
        {
          title: "Tracking",
          description:
            "Trial, demo, paid and MRR events sent to Google Ads from your app, CRM or Stripe.",
        },
        {
          title: "Build",
          description:
            "Brand, competitor and high-intent terms first. Broader terms and PMax once the data supports them.",
        },
        {
          title: "Optimise",
          description:
            "Weekly search-term reviews, budget moved toward the best payback, and a report in MRR.",
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
    campaignTypes: {
      title: "The campaigns I run",
      description:
        "Not every SaaS account needs every campaign type. This is the usual order, and when each one earns its budget.",
      items: [
        {
          label: "Usually first",
          title: "Competitor search",
          description:
            "People comparing tools are close to buying. Paired with a comparison page, these are often the cheapest paid customers in the account.",
        },
        {
          label: "The core",
          title: "Non-branded search",
          description:
            "Category and problem searches from people who don't know you yet. This is where most new MRR comes from as an account grows.",
        },
        {
          label: "Defensive",
          title: "Brand search",
          description:
            "Cheap cover when competitors bid on your name. Reported on its own line so it doesn't flatter the rest of the account.",
        },
        {
          label: "Once conversions flow",
          title: "Performance Max",
          description:
            "Works when it has paid-customer data to learn from. Before that, it mostly finds low-quality placements.",
        },
        {
          label: "For scale",
          title: "YouTube and Demand Gen",
          description:
            "Builds demand in categories people don't search for yet. Judged on assisted pipeline, with expectations set up front.",
        },
        {
          label: "Kept small",
          title: "Remarketing",
          description:
            "Reminds trial users and pricing-page visitors. Capped, because it can easily take credit for sign-ups that would have happened anyway.",
        },
      ],
      quote: {
        quote:
          "Mitch knows Google Ads really well and he is super responsive. He's on the case in terms of making sure landing pages are well optimised and everything's set up to obtain as many customers as possible.",
        person: "Ed Forrester",
        role: "Owner",
        company: "Brand Vine",
        avatarSrc: "/client pfp/ed.png",
      },
    },
    fit: {
      title: "When Google Ads is the right channel",
      description: "Search captures demand that already exists. It's the right first channel when:",
      goodFit: [
        "People already search for your category, or for your competitors",
        "You make at least $20k MRR, so there's enough data to learn from",
        "Customers stay long enough to pay back what they cost to acquire",
        "You can track sign-ups through to paid, or you're happy for me to set it up",
      ],
      notYet: [
        "Nobody searches for your category yet",
        "You're pre-revenue or still finding product-market fit",
        "You need the ad spend back inside the first month",
      ],
      footnote: "If it's a not-yet, I'll say so on the call and tell you what I'd do first.",
    },
    pricing: {
      adSpendBilledBy: "Google",
    },
    faq: {
      title: "Google Ads questions from SaaS founders",
      items: [
        {
          question: "How much should a SaaS company spend on Google Ads?",
          answer: [
            "Most of my clients start with $5,000 to $10,000 a month in ad spend. The right number depends on your CPCs, sign-up to paid rate and target payback period. I work it out in the fit check, before you spend anything.",
          ],
        },
        {
          question: "How long until Google Ads produces results?",
          answer: [
            "Tracking and the first campaigns are usually live within 2 to 4 weeks. Expect a reliable read on cost per paid customer around month two or three, once enough trials have had time to convert.",
          ],
        },
        {
          question: "Do you take over existing accounts or start fresh?",
          answer: [
            "Either. An existing account keeps its conversion history, which helps bidding, so I usually restructure rather than rebuild. If tracking is broken, that gets fixed first.",
          ],
        },
        {
          question: "Who owns the account and the data?",
          answer: [
            "You do. Campaigns run in your own Google Ads account, on your card. If we stop working together, everything stays with you.",
          ],
        },
        {
          question: "Do you use Performance Max for SaaS?",
          answer: [
            "Sometimes. PMax needs paid-customer data and audience signals to work, so I add it after search is tracking revenue properly, and I report it separately so its results are easy to judge.",
          ],
        },
        {
          question: "What does reporting look like?",
          answer: [
            "A custom dashboard plus updates in our shared Slack channel. Reports lead with trials, demos, paid customers, new MRR and payback by campaign. Clicks and CTR are there if you want them.",
          ],
        },
      ],
    },
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) ?? null;
}

export function getServiceSlugs() {
  return services.map((service) => service.slug);
}

// Only indexable services belong in the sitemap.
export function getIndexableServiceSlugs() {
  return services.filter((service) => service.indexable).map((service) => service.slug);
}
