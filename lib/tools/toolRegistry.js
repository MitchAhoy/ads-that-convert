export const tools = [
  {
    slug: "datalayer-push-snippet-generator",
    name: "dataLayer.push() Snippet Generator",
    title: "dataLayer.push() Snippet Generator",
    description:
      "Generate clean `dataLayer.push()` snippets for Google Tag Manager with dynamic parameters and one-click copy.",
    faqTitle: "dataLayer.push() Snippet Generator FAQs",
    faqItems: [
      {
        question: "What is dataLayer.push and how does it work?",
        answer:
          "dataLayer.push is a method used in Google Tag Manager (GTM) to send data to the data layer. It allows you to dynamically add or update information in your website's data layer, which can then be used for tracking, analytics, and marketing purposes. The method works by pushing JavaScript objects containing key-value pairs that represent various user interactions and events on your website.",
      },
      {
        question: "How do I implement dataLayer.push correctly on my website?",
        answer:
          "To implement dataLayer.push, first initialize the data layer by adding `window.dataLayer = window.dataLayer || [];` to your site. Then use `dataLayer.push({...})` to send event data, for example a purchase event with value. Ensure this code is placed before your GTM container where required so tags can read the pushed data correctly.",
      },
      {
        question: "What are the common use cases for dataLayer.push?",
        answer:
          "dataLayer.push is commonly used for tracking e-commerce transactions, form submissions, user interactions, and custom events. For example, you can track product purchases, add-to-cart actions, page views, user login states, and any custom interactions specific to your website. This data can then be used to trigger tags in GTM and send information to analytics platforms.",
      },
      {
        question: "Why is dataLayer.push preferred over direct variable assignment?",
        answer:
          "dataLayer.push is preferred over direct variable assignment (for example, replacing the whole dataLayer object) because it preserves existing data layer information while adding new data. The push method helps keep previous values intact and supports event-based tracking in GTM. It also works better with asynchronous loading and reduces the risk of data loss during concurrent operations.",
      },
      {
        question: "How can I debug dataLayer.push implementations?",
        answer:
          "You can debug dataLayer.push implementations using GTM Preview mode to inspect data layer events, the browser console to inspect `dataLayer`, and network/devtools checks to monitor downstream requests. You can also log `dataLayer` after pushes to validate structure and values.",
      },
      {
        question: "What are the best practices for using dataLayer.push with Google Tag Manager?",
        answer:
          "Best practices include using consistent naming conventions, pushing events with clear and descriptive event names, validating data types, documenting your data layer schema, and testing thoroughly in GTM Preview mode before publishing.",
      },
      {
        question: "Can dataLayer.push be used for real-time user tracking?",
        answer:
          "Yes, dataLayer.push can be used for real-time user tracking by pushing events as they occur. For example, you can track scroll depth, time spent on page, video interactions, and other user behaviors in real time. These events can trigger GTM tags that send data to analytics tools for immediate reporting.",
      },
      {
        question: "What are the limitations of dataLayer.push?",
        answer:
          "dataLayer.push has limitations, including practical size constraints on pushed objects, potential timing issues with asynchronous scripts, and browser memory considerations. Also, pushed data is not persistent across page loads unless separately stored, and conflicting pushes from multiple scripts can cause data quality issues.",
      },
      {
        question: "How does dataLayer.push handle different data types?",
        answer:
          "dataLayer.push can handle strings, numbers, booleans, arrays, and objects. To keep tracking reliable, maintain consistent types for the same keys across events and avoid sending sensitive information. Large or deeply nested structures should be simplified when possible.",
      },
      {
        question: "What are common errors when using dataLayer.push and how to fix them?",
        answer:
          "Common errors include an undefined dataLayer, incorrect event timing, duplicate pushes, and malformed payloads. Fixes include initializing dataLayer early, validating payload shape before push, using clear unique event names, and testing in GTM Preview/debug workflows before launch.",
      },
    ],
  },
  {
    slug: "ppc-keyword-concatenation-tool",
    name: "PPC Keyword Concatenation Tool",
    title: "PPC Keyword Concatenation Tool",
    description:
      "Combine keyword lists into structured Google Ads variations in seconds, then copy clean output for campaign builds.",
    faqTitle: "PPC Keyword Concatenation Tool FAQs",
    faqItems: [
      {
        question: "What is a keyword concatenation tool and how does it work?",
        answer:
          "Our keyword concatenation tool is a specialized PPC campaign utility that combines multiple keyword lists to create comprehensive search terms. It works by taking keywords from different input fields (A, B, C, and D) and combining them according to your selected patterns. The tool automatically generates all possible keyword combinations while maintaining proper spacing and formatting, saving hours of manual work in campaign setup.",
      },
      {
        question: "Why should I use a keyword concatenation tool for my PPC campaigns?",
        answer:
          "A keyword concatenation tool dramatically improves PPC campaign efficiency by automating the creation of keyword combinations. Instead of manually combining keywords, which is time-consuming and error-prone, the tool instantly generates all possible combinations. This ensures comprehensive keyword coverage, helps discover valuable long-tail keywords, and significantly reduces campaign setup time from hours to minutes.",
      },
      {
        question: "What are the different match types supported by this keyword concatenation tool?",
        answer:
          "Our keyword concatenation tool supports all three essential Google Ads match types: Exact Match (using square brackets [keyword]), Phrase Match (using quotation marks \"keyword\"), and Broad Match (keywords without special characters). You can generate keywords in multiple match types simultaneously by selecting the appropriate checkboxes in the output settings.",
      },
      {
        question: "How many keyword combinations can the concatenation tool generate?",
        answer:
          "The tool can generate thousands of keyword combinations depending on your input. With four input fields (A, B, C, and D), you can create combinations ranging from single keywords to four-word phrases. The actual number depends on how many keywords you enter in each field and which combination patterns you select. The tool efficiently handles large keyword sets while maintaining performance.",
      },
      {
        question: "Can I control which keyword combinations are generated?",
        answer:
          "Yes, you have complete control over keyword combinations through two main features: input field toggles and combination pattern selection. Each input field (A, B, C, D) can be individually enabled or disabled, and you can choose specific combination patterns (like AB, ABC, or ABCD) from the combinations grid. This flexibility allows you to generate exactly the keyword combinations you need for your campaign.",
      },
      {
        question: "How do I export keywords from the concatenation tool?",
        answer:
          "Exporting keywords from our concatenation tool is straightforward. After generating your combinations, the results appear in the output text area. You can either click the copy icon or click anywhere in the output area to automatically copy all keywords to your clipboard. The tool confirms successful copying with a clear visual confirmation.",
      },
      {
        question: "Is there a limit to how many keywords I can input into the concatenation tool?",
        answer:
          "While our keyword concatenation tool can handle large sets of keywords, we recommend keeping individual input fields under 100 keywords each for optimal performance. The tool processes combinations in real-time, so very large keyword sets might take longer to process. For best results, focus on your most relevant keywords in each input field.",
      },
      {
        question: "Can I use the keyword concatenation tool for multiple ad campaigns?",
        answer:
          "Absolutely. The tool is designed to support multiple campaign workflows. You can save different keyword sets for various campaigns, and the tool maintains separate combinations for each set. This makes it easy to manage multiple campaigns simultaneously or create different keyword variations for testing purposes.",
      },
      {
        question: "How does the keyword concatenation tool help with long-tail keywords?",
        answer:
          "The keyword concatenation tool excels at discovering valuable long-tail keywords by combining shorter keywords into longer, more specific phrases. For example, if you input \"buy\" in field A, \"leather\" in field B, and \"shoes\" in field C, the tool will generate combinations like \"buy leather shoes,\" helping you target more specific search queries that often have higher conversion rates.",
      },
      {
        question: "What makes this keyword concatenation tool different from others?",
        answer:
          "Our keyword concatenation tool stands out with its user-friendly interface, flexible match type options, and visual combination pattern selector. Unlike basic concatenation tools, ours supports all PPC match types, allows for selective combination patterns, and includes quality-of-life features like one-click copying and clear visual states for successful actions.",
      },
    ],
  },
  {
    slug: "utm-builder",
    name: "UTM Builder",
    title: "UTM Builder",
    description:
      "Create clean, trackable UTM links in seconds so your campaign reporting stays consistent across channels.",
    faqTitle: "UTM Builder FAQs",
    faqItems: [
      {
        question: "What is a UTM Builder and why should I use one?",
        answer:
          "A UTM builder is a tool that helps you create and customize UTM parameters for your URLs. By using a UTM builder, you can accurately track the performance of your marketing campaigns across different channels, better understand where your website traffic comes from, and make data-driven decisions to improve your marketing strategy.",
      },
      {
        question: "How do UTM parameters work with Google Analytics?",
        answer:
          "UTM parameters created through a UTM builder are automatically recognized by Google Analytics. When someone clicks a link with UTM parameters, Google Analytics captures this information and organizes it into detailed reports showing the source, medium, and campaign data, helping you measure the effectiveness of your marketing efforts.",
      },
      {
        question: "What are the essential UTM parameters I should include when using a UTM builder?",
        answer:
          "The most important UTM parameters are utm_source (which identifies where the traffic comes from) and utm_medium (which indicates the marketing medium). While utm_campaign is optional, it's highly recommended for tracking specific promotional efforts. Additional parameters like utm_content and utm_term can provide extra detail for more granular tracking.",
      },
      {
        question: "Can I use a UTM builder for social media marketing?",
        answer:
          "Yes, a UTM builder is essential for social media marketing. You can create unique UTM codes for different social platforms (Facebook, Twitter, LinkedIn, etc.), post types (organic vs. paid), and specific campaigns. This helps you determine which social media efforts drive the most valuable traffic to your website.",
      },
      {
        question: "How do I create UTM codes for email marketing campaigns?",
        answer:
          "Using a UTM builder, set utm_source as \"email\" or your email service provider, utm_medium as \"email\" or \"newsletter,\" and utm_campaign as your specific email campaign name. You can also use utm_content to differentiate between different links within the same email, helping you track which elements get the most clicks.",
      },
      {
        question: "What are common mistakes to avoid when using a UTM builder?",
        answer:
          "Common mistakes include using inconsistent naming conventions, making parameters case-sensitive, not tracking all campaigns, using spaces instead of underscores or hyphens, and creating overly complex UTM codes. A good UTM builder helps prevent these errors by providing a structured format for parameter creation.",
      },
      {
        question: "How do I track UTM parameters in my marketing campaigns?",
        answer:
          "Once you've created UTMs using a UTM builder, you can track their performance in Google Analytics under Acquisition > Campaigns. This shows you detailed metrics about traffic, engagement, and conversions from your tagged links, helping you measure ROI across different marketing channels.",
      },
      {
        question: "What's the difference between a UTM builder and manual UTM creation?",
        answer:
          "A UTM builder automates the process of creating UTM parameters, reducing errors and ensuring consistency. While you can manually add UTM parameters to URLs, using a UTM builder saves time, prevents syntax errors, and helps maintain a standardized naming convention across your organization.",
      },
      {
        question: "Can I use a UTM builder for offline marketing campaigns?",
        answer:
          "Yes, you can use a UTM builder to create trackable links for offline marketing materials like print ads, brochures, or QR codes. Simply create a UTM code that specifies the offline source (e.g., utm_source=brochure) and use URL shorteners to make the links more manageable in offline formats.",
      },
      {
        question: "How do I maintain consistency when using a UTM builder across my team?",
        answer:
          "Set a shared UTM naming convention and document it for everyone on your team. Define approved values for source, medium, and campaign names, and keep capitalization and separators consistent. Using one central UTM builder workflow helps prevent duplicates and keeps reporting clean.",
      },
    ],
  },
  {
    slug: "ab-testing-significance-calculator",
    name: "A/B Testing Significance Calculator",
    title: "A/B Testing Significance Calculator",
    description:
      "Compare two variants with confidence using p-value and statistical power outputs for faster A/B decisions.",
    faqTitle: "A/B Testing Significance Calculator FAQs",
    faqItems: [
      {
        question: "What Data Do You Need for A/B Testing Calculation?",
        answer:
          "You need four core values: control visitors (A), control conversions (A), variation visitors (B), and variation conversions (B). These inputs allow the calculator to compare conversion rates and compute significance.",
      },
      {
        question: "How to Set Up Your A/B Test Parameters",
        answer:
          "Use test type and confidence level settings. One-sided tests whether variant B is better than A. Two-sided tests whether B is different from A (better or worse). Confidence level options are 90%, 95% (standard), and 99%.",
      },
      {
        question: "Understanding A/B Test Calculator Results",
        answer:
          "The calculator returns a clear significance outcome, conversion rates for both variants, relative difference, statistical power, and p-value so you can assess both direction and reliability of the result.",
      },
      {
        question: "How is the conversion rate calculated?",
        answer:
          "Conversion rate is calculated as conversions divided by visitors for each variant. Control rate = control conversions / control visitors. Variation rate = variation conversions / variation visitors. Results are shown as percentages.",
      },
      {
        question: "What is P-Value in A/B Testing?",
        answer:
          "The p-value is the probability of seeing results at least this extreme if there were no true difference between variants. Lower p-values indicate stronger evidence against the null hypothesis.",
      },
      {
        question: "How to Know if Your A/B Test is Statistically Significant",
        answer:
          "A test is statistically significant when p-value is less than (1 - confidence level). For example, below 0.05 at 95% confidence, below 0.10 at 90%, and below 0.01 at 99%.",
      },
    ],
  },
];

export function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolSlugs() {
  return tools.map((tool) => tool.slug);
}
