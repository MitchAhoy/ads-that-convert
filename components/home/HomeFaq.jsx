"use client";

import { useState } from "react";
import { AccentHeading, BookButton, Section, focusRing } from "@/components/home/primitives";
import { defaultFaqItems } from "@/lib/faqs";

// `ask` swaps the card's copy and button (/call-confirmation uses it for
// rescheduling).
function AskCard({ ask, className = "" }) {
  return (
    <div data-booking-cta-zone className={`flex flex-col gap-3.5 rounded-xl border border-hp-line bg-hp-band p-5 lg:items-start lg:gap-4 lg:p-5.5 ${className}`}>
      <div className="flex flex-col gap-1">
        <p className="font-hp text-lg/6 font-medium tracking-[-0.01em] text-hp-ink">{ask?.title ?? "Couldn't find an answer?"}</p>
        <p className="font-hp text-[15px]/5.75 text-hp-body">{ask?.body ?? "Book a call and ask me directly."}</p>
      </div>
      {ask?.action ?? <BookButton size="none" className="w-full gap-2.25 rounded-[10px] px-4 py-3.25 text-base/5.5 lg:w-auto lg:py-2.5" />}
    </div>
  );
}

// The questions must match the page's FAQ schema (app/page.jsx uses lib/faqs.js).
// The first item starts open.
// Defaults are the homepage copy and lib/faqs.js; service pages pass their own.
export default function HomeFaq({
  eyebrow = "07 · FAQ",
  marker = 6,
  lead = "What I'm asked by",
  accent = "most SaaS founders.",
  items = defaultFaqItems,
  ask,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faq" labelledBy="faq-title" innerClassName="flex flex-col lg:grid lg:grid-cols-[420px_1fr] lg:grid-rows-[auto_1fr]">
      <div className="px-5 pt-12 pb-6 sm:px-8 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-hp-line lg:px-12 lg:pt-18 lg:pb-0">
        <AccentHeading id="faq-title" eyebrow={eyebrow} lead={lead} accent={accent} marker={marker} />
      </div>

      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:py-24">
        {items.map((item, index) => {
          const isOpen = index === openIndex;
          const number = String(index + 1).padStart(2, "0");
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <div key={item.question} className={`border-t border-hp-line ${index === items.length - 1 ? "lg:border-b" : ""}`}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`flex w-full items-start gap-3 px-5 py-4.5 text-left font-normal tracking-normal sm:px-8 lg:items-center lg:gap-4 lg:px-12 lg:py-5.5 ${focusRing} focus-visible:-outline-offset-2 ${
                    isOpen ? "pb-2.5 lg:pb-2.5" : ""
                  }`}
                >
                  <span
                    className={`hidden w-5.5 shrink-0 font-hp-mono text-xs/4 lg:inline ${isOpen ? "text-hp-accent" : "text-hp-muted"}`}
                  >
                    {number}
                  </span>
                  <span className="flex-1 font-hp text-base/5.75 font-medium text-hp-ink lg:text-[17px]/6">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={`w-4 shrink-0 text-center font-hp text-xl/5.5 lg:text-xl/5 ${isOpen ? "text-hp-ink" : "text-hp-muted"}`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pr-10 pb-5.5 sm:px-8 sm:pr-13 lg:pr-20 lg:pb-6.5 lg:pl-21.5"
              >
                <div className="flex flex-col gap-3">
                  {item.answer.map((block, blockIndex) =>
                    typeof block === "string" ? (
                      <p key={blockIndex} className="font-hp text-[15px]/6 text-hp-body">
                        {block}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pt-2 pb-10 sm:px-8 lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col lg:justify-end lg:border-r lg:border-hp-line lg:px-12 lg:pt-10 lg:pb-12">
        <AskCard ask={ask} />
      </div>
    </Section>
  );
}
