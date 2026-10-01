"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { defaultFaqItems, flattenFaqAnswer } from "@/lib/faqs";
import { formatPlanPrice, pricingFaqItems, pricingNotes, pricingPlans } from "@/lib/pricing";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Registers site tools with the browser's WebMCP API (navigator.modelContext,
// W3C Web Machine Learning CG draft) so in-browser AI agents can query
// pricing, results and FAQs, and hand the visitor to the booking form.
// Renders nothing, and is a no-op in browsers without the API.

function textResult(data) {
  return {
    content: [
      {
        type: "text",
        text: typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

function absoluteUrl(path) {
  return new URL(path, window.location.origin).toString();
}

function trackToolCall(name) {
  if (posthog.__loaded) {
    posthog.capture("webmcp_tool_called", {
      tool_name: name,
      page_path: window.location.pathname,
    });
  }
}

function buildTools(caseStudies) {
  return [
    {
      name: "get_pricing",
      description:
        "Get Ads That Convert's pricing plans for SaaS Google Ads management: plan names, prices, monthly ad spend tiers, and what each plan includes.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        trackToolCall("get_pricing");
        return textResult({
          plans: pricingPlans.map(({ title, price, cadence, description, features, ctaLabel, ctaHref }) => ({
            name: title,
            price: formatPlanPrice({ price, cadence }),
            summary: description,
            includes: features,
            nextStep: { label: ctaLabel, url: ctaHref },
          })),
          notes: pricingNotes,
          pricingPage: absoluteUrl("/pricing"),
        });
      },
    },
    {
      name: "list_case_studies",
      description:
        "List Ads That Convert's published Google Ads case studies with headline results and links to the full write-ups.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        trackToolCall("list_case_studies");
        return textResult(
          caseStudies.map((study) => ({
            ...study,
            url: absoluteUrl(`/results/${study.slug}`),
          })),
        );
      },
    },
    {
      name: "get_faqs",
      description:
        "Get answers to common questions about working with Ads That Convert: fit for SaaS, ad spend minimums, contracts, onboarding timelines, and who does the work.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        trackToolCall("get_faqs");
        return textResult(
          [...defaultFaqItems, ...pricingFaqItems].map(({ question, answer }) => ({
            question,
            answer: Array.isArray(answer) ? flattenFaqAnswer(answer) : answer,
          })),
        );
      },
    },
    {
      name: "book_strategy_call",
      description:
        "Open the form to book a free strategy call with Mitch at Ads That Convert. Only use this when the user has said they want to book a call. It navigates the page to the booking form; the user fills it in themselves.",
      inputSchema: { type: "object", properties: {} },
      async execute() {
        trackToolCall("book_strategy_call");
        // Defer so the result is delivered before the page unloads.
        setTimeout(() => window.location.assign(SCHEDULE_CALL_URL), 300);
        return textResult(`Opening the booking form at ${SCHEDULE_CALL_URL}. The user needs to complete it themselves.`);
      },
    },
  ];
}

export default function WebMcpTools({ caseStudies = [] }) {
  useEffect(() => {
    const modelContext = navigator.modelContext;

    if (!modelContext?.registerTool) {
      return undefined;
    }

    const registered = [];

    for (const tool of buildTools(caseStudies)) {
      try {
        modelContext.registerTool(tool);
        registered.push(tool.name);
      } catch (error) {
        // Already registered (e.g. Fast Refresh) or the API shape changed; skip.
        console.warn(`WebMCP: could not register "${tool.name}"`, error);
      }
    }

    return () => {
      for (const name of registered) {
        try {
          modelContext.unregisterTool?.(name);
        } catch {
          // Ignore: tool may already be gone.
        }
      }
    };
  }, [caseStudies]);

  return null;
}
