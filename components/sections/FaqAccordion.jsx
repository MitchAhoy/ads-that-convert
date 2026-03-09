"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { defaultFaqItems } from "@/lib/faqs";

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
