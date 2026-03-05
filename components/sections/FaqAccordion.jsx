"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

const defaultFaqItems = [
  {
    question: "Will Google Ads work for my SaaS business?",
    answer:
      "I don't bring on clients who I don't truly believe I can get results for. That's why before we work together I'll collect a ton of business data from you to calculate if Google Ads will work for your business. Based on this we'll know what metrics we need to hit (and how realistic they are) for your campaigns to be profitable. These forecasts will also serve as a reference for tracking once your campaigns begin so we can measure success.",
  },
  {
    question: "Isn't Google Ads for SaaS expensive and extremely competitive?",
    answer:
      "Most likely... but, the cost of the investment is irrelevant as long as there is more revenue coming back at the end of the month from the sign ups generated via Google Ads. There is a reason why there is so much competition on Google - because it works (very well). I've worked across the most competitive verticals with cost per clicks of $100+ while maintaining profitability. It's all relative.",
  },
  {
    question: "Why would I choose you over another agency or Google Ads manager for my SaaS?",
    answer:
      "The scoreboard is set. For the past 8+ years I've been working with business owners of all sizes generating consistent results (see just some of the reviews above). I've worked in ad accounts from every angle - in advertising agencies, freelance and even in my own businesses.",
  },
  {
    question: "How do you measure success when running campaigns for SaaS?",
    answer:
      "Success KPIs are established in our initial conversations before contracts are signed or payments are made. This keeps everyone on the same page and accountable. I can't guarantee results (no one can) but I will ensure that your campaign has every chance of success.",
  },
  {
    question: "What is the minimum investment I can make to get started?",
    answer:
      "There are a lot of factors that determine the minimum investment needed to become profitable with Google Ads. This is based on your sign up/demo to sales conversion rate, average lifetime value of your customers and the payback period you need on your customers. Most of my clients start with $5,000-$10,000/mth in ad spend and scale up from there once results are coming in.",
  },
  {
    question: "Who am I dealing with and who is completing the work once I sign on?",
    answer:
      "Me, me and me. From the moment you enquire to the first sale you make (and the many more after that) - you'll deal with me. There are no account managers, cheap offshore labour or juniors working on your account. This is a serious investment and I treat your ad dollars as if they were my own.",
  },
];

export default function FaqAccordion({
  title = "What I'm asked by most SaaS founders",
  items = defaultFaqItems,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section aria-labelledby="faq-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            id="faq-title"
            className="font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0c2237]"
          >
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-7 flex max-w-[880px] flex-col gap-3 sm:mt-8 sm:gap-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className="rounded-2xl border border-zinc-200 bg-zinc-100/90 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:px-5 sm:py-4"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-3 text-left"
                >
                  <h3
                    className="max-w-[92%] font-medium leading-[1.45] tracking-[-0.005em] text-zinc-800"
                    style={{ fontSize: "18px" }}
                  >
                    {item.question}
                  </h3>
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-zinc-500">
                    {isOpen ? (
                      <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-[1.6] text-zinc-700">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
