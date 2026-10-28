// One entry per /services/[slug] page. Layout lives in
// components/services/ServicePageTemplate.jsx (the homepage system, DESIGN.md
// §16); channel mockups live in components/services/illustrations/ and are
// looked up by slug in components/services/serviceVisuals.js.
//
// `indexable: false` renders the page as "noindex, follow" and leaves it out of
// the sitemap. /services/google-ads is noindexed so it never competes with the
// homepage for "saas google ads agency".
//
// Section headings are two lines: `lead` in ink, `accent` with the highlighter.
// `verdict` names the channel in "a go or no-go on …" and the booking band.
//
// Only Google Ads has written case studies, so only it has a `proof` section
// (the dark results band). The other channels go straight to budget leaks.
//
// Quotes must be verbatim from components/sections/testimonialsData.js, and each
// client is quoted once per page.
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
      titleLead: "Google Ads management,",
      titleMiddle: "judged on",
      titleAccent: "new MRR and payback.",
      verdict: "paid search",
      description:
        "I run search, competitor and Performance Max campaigns for SaaS companies. Paid sign-ups and their value go back into Google Ads, so it bids for customers, not clicks.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    proof: {
      heading: { lead: "What the accounts", accent: "produced." },
      description: "Four SaaS accounts with four different sales models. Each result links to the full write-up.",
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
      heading: { lead: "Where SaaS Google Ads budgets leak", accent: "and how I close each one." },
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
      heading: { lead: "Your first", accent: "90 days." },
      description:
        "Fit and tracking come before any new spend. If the numbers don't support paid search, you'll hear it in week one.",
      steps: [
        {
          title: "Audit",
          muted: "before any new spend",
          description:
            "Your account, search terms and unit economics, sized against what paid search can realistically return.",
        },
        {
          title: "Tracking",
          muted: "all the way to paid",
          description:
            "Trial, demo, paid and MRR events sent to Google Ads from your app, CRM or Stripe.",
        },
        {
          title: "Build",
          muted: "from high intent outwards",
          description:
            "Brand, competitor and high-intent terms first. Broader terms and PMax once the data supports them.",
        },
        {
          title: "Optimise",
          muted: "and report in MRR",
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
      heading: { lead: "The campaigns I run", accent: "and when to use each." },
      description:
        "Not every SaaS account needs every campaign type. This is the usual order, and when each one earns its budget.",
      items: [
        {
          title: "Competitor search",
          description:
            "People comparing tools are close to buying. Paired with a comparison page, these are often the cheapest paid customers in the account.",
        },
        {
          title: "Non-branded search",
          description:
            "Category and problem searches from people who don't know you yet. This is where most new MRR comes from as an account grows.",
        },
        {
          title: "Brand search",
          description:
            "Cheap cover when competitors bid on your name. Reported on its own line so it doesn't flatter the rest of the account.",
        },
        {
          title: "Performance Max",
          description:
            "Works when it has paid-customer data to learn from. Before that, it mostly finds low-quality placements.",
        },
        {
          title: "YouTube and Demand Gen",
          description:
            "Builds demand in categories people don't search for yet. Judged on assisted pipeline, with expectations set up front.",
        },
        {
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
      heading: { lead: "When Google Ads is", accent: "the right channel." },
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
    cta: {
      description: "Book in a call and I'll show you how I'd scale your acquisition with Google Ads for your product.",
    },
    faq: {
      heading: { lead: "Google Ads", accent: "questions from SaaS founders." },
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
            "Tracking and the first campaigns are usually live within 7 days of onboarding. Expect a reliable read on cost per paid customer around month two or three, once enough trials have had time to convert.",
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
  {
    slug: "chatgpt-ads",
    name: "ChatGPT Ads",
    indexable: true,
    seo: {
      title: "ChatGPT Ads Management for SaaS | Ads That Convert",
      description:
        "ChatGPT ads for SaaS companies. Sponsored placements matched to buying conversations, set up with conversion tracking and judged on trials and new MRR.",
      keywords: ["ChatGPT ads for SaaS", "ChatGPT ads agency", "OpenAI ads management"],
    },
    hero: {
      title: "ChatGPT ads for SaaS, measured from day one",
      titleLead: "ChatGPT ads for SaaS,",
      titleMiddle: "measured",
      titleAccent: "from day one.",
      verdict: "ChatGPT ads",
      description:
        "People ask ChatGPT which tool to buy, and sponsored cards now sit under those answers. I set up the campaigns, context hints and conversion tracking, then judge them on trials and new MRR like every other channel.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    leaks: {
      heading: { lead: "Where early ChatGPT ad budgets leak", accent: "and how I close each one." },
      description: "It's a new channel, so the mistakes are new too. These are the ones I see most.",
      items: [
        {
          title: "No conversion tracking",
          description:
            "Without the pixel and Conversions API, ChatGPT gets judged on clicks. I set up both before launch and send trial and paid events, so it's judged on customers.",
        },
        {
          title: "Context hints written like keywords",
          description:
            "ChatGPT matches ads to the conversation, not to exact phrases. A pasted keyword list misses the questions buyers actually ask. I write hints around real buyer scenarios.",
        },
        {
          title: "Ads that ignore the answer above them",
          description:
            "Your ad sits under a reply the person just read. Generic claims get skipped. I write ads that pick up where the answer leaves off.",
        },
        {
          title: "Judging it on last click",
          description:
            "Someone might see you in ChatGPT and sign up days later from Google. I report on blended new MRR and watch branded search for lift, not just in-platform conversions.",
        },
        {
          title: "Testing before the basics work",
          description:
            "If your site and trial don't convert search traffic, they won't convert ChatGPT traffic either. I check the funnel before putting money into a new channel.",
        },
      ],
      quote: {
        quote:
          "From the minute we started the project, the in-depth research that was put into it impressed me. Off the bat performance was strong. Amazing team, amazing results.",
        person: "Bob Thompson",
        role: "Owner",
        company: "Biosol Organics",
        avatarSrc: "/client pfp/bob.png",
      },
    },
    process: {
      heading: { lead: "Your first", accent: "90 days." },
      description:
        "A new channel needs a test budget and a clear bar for success. We agree on both before anything goes live.",
      steps: [
        {
          title: "Fit check",
          muted: "before any spend",
          description:
            "Whether your buyers ask ChatGPT about your category, and what a trial or customer can cost while still paying back.",
        },
        {
          title: "Tracking",
          muted: "all the way to paid",
          description: "Pixel and Conversions API, with trial, paid and MRR events sent from your app, CRM or Stripe.",
        },
        {
          title: "Test",
          muted: "with a contained budget",
          description: "A contained budget, context hints built around real buyer questions, and several ad angles.",
        },
        {
          title: "Decide",
          muted: "and report in MRR",
          description:
            "Scale what pays back and cut what doesn't, with a report in MRR. If it isn't working, you'll hear it from me first.",
        },
      ],
      quote: {
        quote:
          "Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!",
        person: "Matt Robinson",
        role: "Co-Founder",
        company: "Live Tourney",
        companyLogoSrc: "/client-logos/livetourney.svg",
        avatarSrc: "/client pfp/matt robinson.png",
      },
    },
    campaignTypes: {
      heading: { lead: "What I set up,", accent: "and how I use it." },
      description: "The platform is young and the options are still few. This is how I use what's there.",
      items: [
        {
          title: "Conversation-matched ads",
          description:
            "Sponsored cards under answers about your category, the problem you solve or your competitors, guided by context hints.",
        },
        {
          title: "Pixel and Conversions API",
          description:
            "Server-side events, so trials and paid subscriptions count even when they happen days after the click.",
        },
        {
          title: "Conversion bidding",
          description:
            "Bids aimed at trials and paid subscriptions, fed by the pixel and Conversions API, so spend follows customers rather than clicks.",
        },
        {
          title: "Ad and hint testing",
          description: "New angles and buyer scenarios tested against the current best, with losers cut quickly.",
        },
      ],
      quote: {
        quote:
          "Mitch is a fantastic PPC marketer. He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign. I highly recommend working with him!",
        person: "Sunny Jain",
        role: "CEO",
        company: "A&J Education",
        avatarSrc: "/client pfp/sunny.png",
      },
    },
    fit: {
      heading: { lead: "When ChatGPT ads are", accent: "worth testing." },
      description: "It's early. A test makes sense when:",
      goodFit: [
        "Buyers research tools in your category by asking questions",
        "Search ads already work, so there's a baseline to compare against",
        "You can set aside a test budget without needing it back next month",
        "You make at least $20k MRR, so there's enough data to learn from",
      ],
      notYet: [
        "Google Ads isn't working yet (that's the better place to start)",
        "You're pre-revenue or still finding product-market fit",
        "You need guaranteed volume this quarter",
      ],
      footnote: "If it's too early for you, I'll say so and tell you what to watch for.",
    },
    pricing: {
      adSpendBilledBy: "OpenAI",
    },
    cta: {
      description: "Book a call and I'll tell you whether ChatGPT ads make sense for your product, and what I'd test first.",
    },
    faq: {
      heading: { lead: "ChatGPT ads", accent: "questions from SaaS founders." },
      items: [
        {
          question: "How do ChatGPT ads work?",
          answer: [
            "Sponsored cards appear below ChatGPT's answers, labelled and kept separate from the answer itself. They're matched to the topic and intent of the conversation, which advertisers guide with context hints rather than keywords.",
          ],
        },
        {
          question: "Can ads change what ChatGPT recommends?",
          answer: [
            "No. Ads are kept separate from answers, so you can't buy your way into the reply. Showing up in the answer itself is a different job, closer to SEO.",
          ],
        },
        {
          question: "Can you track sign-ups and revenue from ChatGPT ads?",
          answer: [
            "Yes. There's a pixel and a Conversions API. I send trial, paid and MRR events so the channel is judged on customers, not clicks. Reporting is aggregated, so you won't see individual conversations.",
          ],
        },
        {
          question: "How much should I budget for a test?",
          answer: [
            "Enough to get a meaningful number of trials within a month or two at the click costs I see. I size it from your trial-to-paid rate and target payback, so we know in advance what success looks like.",
          ],
        },
        {
          question: "Is it too early to try?",
          answer: [
            "For some SaaS companies, yes. If search isn't working yet, start there. If it is, a contained test now means you learn the channel before it gets crowded.",
          ],
        },
        {
          question: "Who owns the account and the data?",
          answer: [
            "You do. Campaigns run in your own ChatGPT ads account, on your card. If we stop working together, everything stays with you.",
          ],
        },
      ],
    },
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    indexable: true,
    seo: {
      title: "Meta Ads Management for SaaS | Ads That Convert",
      description:
        "Meta ads for SaaS, optimised for trials and paying subscribers, not cheap sign-ups. Conversions API, weekly creative testing and reporting in new MRR.",
      keywords: ["Meta ads for SaaS", "Facebook ads for SaaS", "SaaS Meta ads agency"],
    },
    hero: {
      title: "Meta ads for SaaS, optimised for subscribers, not cheap sign-ups",
      titleLead: "Meta ads for SaaS,",
      titleMiddle: "optimised for",
      titleAccent: "subscribers,",
      titleTail: "not cheap sign-ups.",
      verdict: "Meta ads",
      description:
        "Meta finds people before they know to search for you. I set it up to learn from your paying customers, then test creative every week so costs don't creep up as audiences tire.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    leaks: {
      heading: { lead: "Where SaaS Meta budgets leak", accent: "and how I close each one." },
      description: "Meta is very good at finding whatever you ask it for. Most accounts ask for the wrong thing.",
      items: [
        {
          title: "Optimising for sign-ups",
          description:
            "Ask Meta for sign-ups and it finds people who sign up for everything. I optimise for trial starts or paid subscriptions, so it learns what a customer looks like.",
        },
        {
          title: "Browser-only tracking",
          description:
            "Ad blockers and privacy settings hide conversions from the pixel. Without the Conversions API, Meta optimises on partial data and under-reports what it drove.",
        },
        {
          title: "One ad running for months",
          description:
            "Creative tires faster on Meta than anywhere else. I test new angles on a weekly rhythm and retire ads when frequency climbs and results drop.",
        },
        {
          title: "Budget split across too many ad sets",
          description:
            "Spreading a modest budget over many audiences starves each one of data. I consolidate so the algorithm gets enough conversions to learn from.",
        },
        {
          title: "Judging it on last click",
          description:
            "Meta often starts journeys that end on Google or a direct visit. I report it on blended new MRR and payback, with platform numbers as a cross-check, not the verdict.",
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
    process: {
      heading: { lead: "Your first", accent: "90 days." },
      description:
        "Tracking comes before spend. If your product isn't a fit for paid social, you'll hear it in week one.",
      steps: [
        {
          title: "Audit",
          muted: "before any new spend",
          description:
            "Your account, pixel setup and unit economics, checked against what paid social can realistically return.",
        },
        {
          title: "Tracking",
          muted: "all the way to paid",
          description: "Pixel plus Conversions API, with trial, paid and MRR events sent from your app, CRM or Stripe.",
        },
        {
          title: "Launch",
          muted: "with several angles live",
          description:
            "A few consolidated campaigns optimised for trials or subscriptions, with several creative angles live from day one.",
        },
        {
          title: "Iterate",
          muted: "and report in MRR",
          description: "Weekly creative tests, budget moved toward the best payback, and a report in MRR.",
        },
      ],
      quote: {
        quote:
          "Responsiveness was amazing and we were able to get everything resolved. Shoulda just paid Mitch to start with... so many headaches solved at once!",
        person: "Lachlan Thompson",
        role: "Owner",
        company: "Social Slingshot",
        avatarSrc: "/client pfp/lachie.png",
      },
    },
    campaignTypes: {
      heading: { lead: "How I structure", accent: "Meta for SaaS." },
      description: "Fewer campaigns, more creative. This is the usual setup, and when each part earns its budget.",
      items: [
        {
          title: "Prospecting",
          description:
            "Broad or lightly targeted audiences, optimised for trial starts or subscriptions. The creative does most of the targeting.",
        },
        {
          title: "Creative testing",
          description:
            "New hooks, formats and offers tested against the current winners. Most of the gains on Meta come from here.",
        },
        {
          title: "Retargeting",
          description:
            "Site visitors and trial users who haven't converted. Capped, because it can easily take credit for sign-ups that would have happened anyway.",
        },
      ],
      quote: {
        quote: "Mitch is definitely a sharp operator, and very knowledgeable. Certainly would recommend.",
        person: "Mitchell Anderson",
        role: "IT & Technology Manager",
        company: "Ecommerce Brand",
        avatarSrc: "/client pfp/mitchell.png",
      },
    },
    fit: {
      heading: { lead: "When Meta is", accent: "the right channel." },
      description: "Meta creates demand rather than capturing it. It suits SaaS when:",
      goodFit: [
        "Your product makes sense from a short video or image",
        "There's a self-serve sign-up or free trial with a quick path to paid",
        "You make at least $20k MRR, so there's enough data to learn from",
        "Someone on your side can approve new creative every week or two",
      ],
      notYet: [
        "Enterprise buyers, long sales cycles and committee sign-off",
        "You're pre-revenue or still finding product-market fit",
        "You need the ad spend back inside the first month",
      ],
      footnote: "If search would work better for you first, I'll say so on the call.",
    },
    pricing: {
      adSpendBilledBy: "Meta",
    },
    cta: {
      description: "Book a call and I'll tell you whether Meta makes sense for your product, and what I'd test first.",
    },
    faq: {
      heading: { lead: "Meta ads", accent: "questions from SaaS founders." },
      items: [
        {
          question: "Do Meta ads work for B2B SaaS?",
          answer: [
            "Sometimes. They work best for self-serve and product-led tools with a clear visual hook. For enterprise products with long sales cycles, search is usually the better start, and I'll tell you if that's you.",
          ],
        },
        {
          question: "How much should I spend on Meta ads?",
          answer: [
            "Enough for each campaign to get around 50 optimisation events a week, which is what Meta needs to finish learning. I work the number out from your cost per trial and trial-to-paid rate in the fit check.",
          ],
        },
        {
          question: "What is the Conversions API, and do I need it?",
          answer: [
            "It sends conversion events from your server instead of the browser, so Meta still sees trials and payments that ad blockers and privacy settings would hide. For SaaS, where the paid conversion often happens days later in Stripe, it's close to essential.",
          ],
        },
        {
          question: "Do you make the ad creative?",
          answer: [
            "I write the angles and briefs, and run the testing. The assets can come from your designers, founder-shot video or creators you already work with. I'll tell you on the call what the account will need each month.",
          ],
        },
        {
          question: "Should I run Meta or Google Ads first?",
          answer: [
            "If people already search for your category, Google usually comes first because the intent is higher. Meta suits products people don't know to look for yet. When I run both, Google is usually the base.",
          ],
        },
        {
          question: "Who owns the account and the data?",
          answer: [
            "You do. Campaigns run in your own Meta Business account, on your card. If we stop working together, everything stays with you.",
          ],
        },
      ],
    },
  },
  {
    slug: "microsoft-ads",
    name: "Microsoft Ads",
    indexable: true,
    seo: {
      title: "Microsoft Ads Management for SaaS | Ads That Convert",
      description:
        "Microsoft Ads (Bing) management for SaaS. Search campaigns built on what works in Google, with LinkedIn profile targeting and reporting in new MRR.",
      keywords: ["Microsoft Ads for SaaS", "Bing Ads for SaaS", "Microsoft Advertising agency"],
    },
    hero: {
      title: "Microsoft Ads for SaaS, built on what already works in Google",
      titleLead: "Microsoft Ads for SaaS,",
      titleMiddle: "built on",
      titleAccent: "what already works in Google.",
      verdict: "Microsoft Ads",
      description:
        "Bing, Edge and Copilot reach a different slice of searchers, many of them at work. I replicate the campaigns that already pay back in your Google account, then scale them with Microsoft's own bidding and B2B targeting.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    leaks: {
      heading: { lead: "Where SaaS Microsoft Ads budgets leak", accent: "and how I close each one." },
      description: "Most accounts are a Google import that nobody looked at again. That's a fine start and a poor finish.",
      items: [
        {
          title: "Importing and forgetting",
          description:
            "A scheduled import copies Google's mistakes along with its wins, and can overwrite changes made for Microsoft. I import once, then manage Microsoft as its own account.",
        },
        {
          title: "Copying Google's bids",
          description:
            "Click costs, volume and competition are different, so Google's bids are wrong in both directions. I set targets from Microsoft's own conversion data.",
        },
        {
          title: "Partner sites left unchecked",
          description:
            "Search partner and syndicated placements can bring low-quality traffic. I review them by source and exclude the ones that don't convert.",
        },
        {
          title: "Skipping LinkedIn profile targeting",
          description:
            "Microsoft lets you adjust bids by company, industry and job function using LinkedIn data. For B2B SaaS, that's targeting Google can't offer.",
        },
        {
          title: "No tracking of its own",
          description:
            "Microsoft needs its own UET tag and offline conversion uploads. Without them, automated bidding has nothing to learn from.",
        },
      ],
      quote: {
        quote:
          "Mitch is a fantastic PPC marketer. He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign. I highly recommend working with him!",
        person: "Sunny Jain",
        role: "CEO",
        company: "A&J Education",
        avatarSrc: "/client pfp/sunny.png",
      },
    },
    process: {
      heading: { lead: "Your first", accent: "90 days." },
      description:
        "Microsoft usually builds on a working Google account, so setup is quick. If it would only add a handful of clicks, I'll say so.",
      steps: [
        {
          title: "Audit",
          muted: "both accounts",
          description:
            "Your Google and Microsoft accounts side by side, and how much search volume Microsoft can realistically add.",
        },
        {
          title: "Tracking",
          muted: "all the way to paid",
          description: "UET tag plus offline conversions, with trial, paid and MRR events sent from your app, CRM or Stripe.",
        },
        {
          title: "Build",
          muted: "from proven Google campaigns",
          description:
            "Only the Google campaigns with a proven payback, replicated once, then reworked where Microsoft behaves differently.",
        },
        {
          title: "Optimise",
          muted: "and report in MRR",
          description:
            "Weekly search-term and placement reviews, LinkedIn bid adjustments, and a report in MRR.",
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
      heading: { lead: "The campaigns I run,", accent: "with B2B targeting on top." },
      description: "Mostly search, with Microsoft's B2B targeting layered on top.",
      items: [
        {
          title: "Search campaigns",
          description:
            "Non-branded, competitor and brand search, mirroring what works in Google, with budgets set from Microsoft's own numbers.",
        },
        {
          title: "LinkedIn profile targeting",
          description:
            "Bid up for the companies, industries and job functions that buy from you. Layered on top of search, not used instead of it.",
        },
        {
          title: "Copilot placements",
          description:
            "Search ads can also appear in Microsoft Copilot. I report on them separately so you can see what they add.",
        },
        {
          title: "Performance Max",
          description:
            "Microsoft's version reaches beyond search. I add it once there's paid-customer data for it to learn from.",
        },
        {
          title: "Remarketing",
          description:
            "Site visitors and trial users who haven't converted. Capped, so it doesn't take credit for sign-ups that would have happened anyway.",
        },
      ],
      quote: {
        quote: "Mitch is definitely a sharp operator, and very knowledgeable. Certainly would recommend.",
        person: "Mitchell Anderson",
        role: "IT & Technology Manager",
        company: "Ecommerce Brand",
        avatarSrc: "/client pfp/mitchell.png",
      },
    },
    fit: {
      heading: { lead: "When Microsoft Ads is", accent: "worth adding." },
      description: "It's rarely the first channel, but it's often the easiest second one. It suits SaaS when:",
      goodFit: [
        "Google Ads is already profitable and you want more of the same",
        "Your buyers work at desks, on Windows and Edge",
        "You sell B2B and can use company or job-function targeting",
        "You make at least $20k MRR, so there's enough data to learn from",
      ],
      notYet: [
        "Google Ads isn't working yet (fix that first)",
        "Your search volume is small enough that Microsoft would add a handful of clicks",
        "You're pre-revenue or still finding product-market fit",
      ],
      footnote: "If Microsoft would only add a rounding error, I'll tell you before you spend anything.",
    },
    pricing: {
      adSpendBilledBy: "Microsoft",
    },
    cta: {
      description: "Book a call and I'll tell you how much Microsoft could add to your search results, and what I'd set up first.",
    },
    faq: {
      heading: { lead: "Microsoft Ads", accent: "questions from SaaS founders." },
      items: [
        {
          question: "Is Microsoft Ads worth it for SaaS?",
          answer: [
            "Often, as a second search channel. Volume is smaller than Google, but clicks are frequently cheaper and B2B audiences are strong. I'll estimate what it can add before you commit.",
          ],
        },
        {
          question: "Can't I just import my Google Ads campaigns?",
          answer: [
            "That's the right starting point. The problem is leaving it there: bids, placements and search terms behave differently, and scheduled imports can overwrite fixes. I import once, then manage it properly.",
          ],
        },
        {
          question: "How much should I spend on Microsoft Ads?",
          answer: [
            "Usually a fraction of your Google budget, sized to the search volume available. I work it out from Microsoft's keyword data and your conversion rates.",
          ],
        },
        {
          question: "What is LinkedIn profile targeting?",
          answer: [
            "Microsoft owns LinkedIn, so you can adjust search bids by the searcher's company, industry and job function. It's one of the few ways to add B2B targeting to search.",
          ],
        },
        {
          question: "Do Microsoft ads show in Copilot?",
          answer: [
            "They can. Microsoft search ads appear in Copilot as well as Bing and Edge, and I report those placements separately so you can judge them on their own.",
          ],
        },
        {
          question: "Who owns the account and the data?",
          answer: [
            "You do. Campaigns run in your own Microsoft Advertising account, on your card. If we stop working together, everything stays with you.",
          ],
        },
      ],
    },
  },
  {
    slug: "linkedin-ads",
    name: "LinkedIn Ads",
    indexable: true,
    seo: {
      title: "LinkedIn Ads Management for SaaS | Ads That Convert",
      description:
        "LinkedIn Ads management for B2B SaaS. Account-based targeting, CRM-connected lead tracking and reporting in pipeline and new MRR, not form fills.",
      keywords: ["LinkedIn Ads for SaaS", "LinkedIn Ads agency", "B2B SaaS LinkedIn advertising"],
    },
    hero: {
      title: "LinkedIn Ads for SaaS, built for pipeline, not form fills",
      titleLead: "LinkedIn Ads for SaaS,",
      titleMiddle: "built for",
      titleAccent: "pipeline,",
      titleTail: "not form fills.",
      verdict: "LinkedIn Ads",
      description:
        "LinkedIn is the one place you can target buyers by company, job function and seniority. Clicks are expensive, so I aim spend at the accounts that can buy, track every lead into your CRM, and judge it on pipeline.",
      secondaryLink: { label: "See client results", href: "/results" },
    },
    leaks: {
      heading: { lead: "Where SaaS LinkedIn budgets leak", accent: "and how I close each one." },
      description: "LinkedIn's defaults are built to spend your budget. Each one below costs more per click than anywhere else.",
      items: [
        {
          title: "Default settings left on",
          description:
            "Audience Expansion and the LinkedIn Audience Network are switched on for new campaigns, which spreads budget beyond your targeting. I turn both off until the core audience is proven.",
        },
        {
          title: "Targeting by job title alone",
          description:
            "Titles mean different things at different companies. I combine job function, seniority and your target account list, then check the demographics report for who saw the ads.",
        },
        {
          title: "Counting form fills as wins",
          description:
            "Lead Gen Forms make submitting easy, so lead counts look great and quality often doesn't. I sync leads to your CRM and judge campaigns on qualified pipeline.",
        },
        {
          title: "Accepting suggested bids",
          description:
            "LinkedIn's suggested bids and maximum delivery are tuned to spend. On a small B2B audience I start with manual or capped bids, and loosen them once the data supports it.",
        },
        {
          title: "Tracking stops at the lead",
          description:
            "Without the Insight Tag and the Conversions API sending CRM stages back, LinkedIn can't see which leads became customers, and neither can you.",
        },
      ],
      quote: {
        quote:
          "From the minute we started the project, the in-depth research that was put into it impressed me. Off the bat performance was strong. Amazing team, amazing results.",
        person: "Bob Thompson",
        role: "Owner",
        avatarSrc: "/client pfp/bob.png",
      },
    },
    process: {
      heading: { lead: "Your first", accent: "90 days." },
      description:
        "LinkedIn needs a clear buyer and a sales process behind it. If your deal size can't carry its click costs, you'll hear it in week one.",
      steps: [
        {
          title: "Audit",
          muted: "before any new spend",
          description:
            "Your account, audiences and deal economics, checked against what LinkedIn clicks cost in your market.",
        },
        {
          title: "Tracking",
          muted: "all the way to pipeline",
          description:
            "Insight Tag plus Conversions API, with lead, opportunity and closed-won stages sent back from your CRM.",
        },
        {
          title: "Launch",
          muted: "to your best accounts",
          description:
            "Tight audiences built from job function, seniority and account lists, with several offers and formats live from day one.",
        },
        {
          title: "Iterate",
          muted: "and report in pipeline",
          description:
            "Weekly audience and creative reviews, budget moved toward the campaigns that create opportunities, and a report in pipeline and MRR.",
        },
      ],
      quote: {
        quote:
          "Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!",
        person: "Matt Robinson",
        role: "Co-Founder",
        company: "Live Tourney",
        companyLogoSrc: "/client-logos/livetourney.svg",
        avatarSrc: "/client pfp/matt robinson.png",
      },
    },
    campaignTypes: {
      heading: { lead: "The campaigns I run,", accent: "aimed at accounts that can buy." },
      description: "A few tight campaigns, not one per persona. This is the usual setup, and when each part earns its budget.",
      items: [
        {
          title: "Target account campaigns",
          description:
            "Sponsored content shown only to the companies on your list, filtered by job function and seniority. Most of the budget goes here.",
        },
        {
          title: "Thought leader ads",
          description:
            "Your founder's or team's best posts, promoted to the same audience. They often cost less per click and get read as content, not ads.",
        },
        {
          title: "Document and video ads",
          description:
            "Reports, benchmarks and short demos that build familiarity with buyers who aren't ready for a call yet.",
        },
        {
          title: "Lead Gen Forms",
          description:
            "Added when your CRM and sales team can follow up within hours. Without that, cheap leads go cold and look like a failed channel.",
        },
        {
          title: "Retargeting",
          description:
            "Video viewers, form openers and site visitors from target accounts. Capped, so it doesn't take credit for demos that would have happened anyway.",
        },
      ],
      quote: {
        quote:
          "Mitch is a fantastic PPC marketer. He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign. I highly recommend working with him!",
        person: "Sunny Jain",
        role: "CEO",
        company: "A&J Education",
        avatarSrc: "/client pfp/sunny.png",
      },
    },
    fit: {
      heading: { lead: "When LinkedIn is", accent: "the right channel." },
      description: "LinkedIn is expensive per click and precise about who sees the ad. It suits SaaS when:",
      goodFit: [
        "You sell B2B and can name the job functions and company types that buy",
        "Your deal size is large enough to carry clicks that cost several times Google's",
        "There's a sales team or demo flow to follow up on leads quickly",
      ],
      notYet: [
        "A low-priced self-serve plan, where LinkedIn clicks rarely pay back",
        "Consumer products, or buyers you can't describe by job or company",
        "You're pre-revenue or still finding product-market fit",
      ],
      footnote: "If Google or Meta would get you there for less, I'll say so on the call.",
    },
    pricing: {
      adSpendBilledBy: "LinkedIn",
    },
    cta: {
      description: "Book a call and I'll tell you whether your deal size can carry LinkedIn, and which accounts I'd target first.",
    },
    faq: {
      heading: { lead: "LinkedIn Ads", accent: "questions from SaaS founders." },
      items: [
        {
          question: "Are LinkedIn Ads worth it for SaaS?",
          answer: [
            "For B2B SaaS with a decent deal size, often yes. No other platform lets you target by company, job function and seniority this precisely. For low-priced self-serve products, the click costs usually don't pay back, and I'll tell you if that's you.",
          ],
        },
        {
          question: "How much should I spend on LinkedIn Ads?",
          answer: [
            "Enough to reach your target accounts several times a month, which depends on how many there are and what clicks cost in your market. I work the number out from your audience size, deal value and close rate in the fit check.",
          ],
        },
        {
          question: "Should I use Lead Gen Forms or send people to my site?",
          answer: [
            "Both have a place. Lead Gen Forms convert better but bring more low-intent leads, so they only work when your CRM and sales follow-up are fast. Landing pages bring fewer, warmer leads. I usually test both and judge them on pipeline.",
          ],
        },
        {
          question: "What are thought leader ads?",
          answer: [
            "Promoted posts from a person's profile rather than your company page, usually the founder's. They read like content, so they tend to get more engagement and cheaper clicks than standard sponsored posts.",
          ],
        },
        {
          question: "Should I run LinkedIn or Google Ads first?",
          answer: [
            "If people already search for your category, Google usually comes first because it captures demand that exists. LinkedIn suits products whose buyers you can name but who aren't searching yet. When I run both, Google is usually the base.",
          ],
        },
        {
          question: "Who owns the account and the data?",
          answer: [
            "You do. Campaigns run in your own LinkedIn Campaign Manager account, on your card. If we stop working together, everything stays with you.",
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
