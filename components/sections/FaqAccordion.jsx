"use client";

import { useState } from "react";
import { defaultFaqItems } from "@/lib/faqs";
import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

function renderBold(text, keyPrefix) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${index}`} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${index}`}>{part}</span>;
  });
}

function AnswerBlock({ block, index }) {
  if (typeof block === "string") {
    return <p className="text-base leading-[1.55] text-body">{renderBold(block, `p-${index}`)}</p>;
  }

  if (block.list) {
    return (
      <div className="flex flex-col gap-2">
        {block.list.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-baseline gap-3">
            <span className="-mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            <span className="text-base leading-[1.55] text-body">{renderBold(item, `li-${index}-${itemIndex}`)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (block.lead || block.link) {
    return (
      <p className="mt-1 text-base leading-[1.55] text-body">
        {block.lead ?? block.link}{" "}
        <FilloutPopupTrigger className="inline font-semibold text-ink underline decoration-ink underline-offset-2">
          {block.label}
        </FilloutPopupTrigger>
      </p>
    );
  }

  return null;
}

function FaqItem({ item, index, isOpen, onToggle, numbered }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-border bg-white transition-shadow ${
        isOpen ? "shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 py-5 pr-5 pl-6 text-left transition-colors hover:bg-surface"
      >
        {numbered ? (
          <span className="w-6 shrink-0 text-sm font-semibold text-muted [font-variant-numeric:tabular-nums]">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 text-lg leading-[1.4] font-semibold tracking-[-0.02em] text-ink text-wrap-pretty">
          {item.question}
        </span>
        <span
          className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-ink" : "bg-surface"
          }`}
        >
          <span
            className={`absolute h-0.5 w-3 rounded-full ${isOpen ? "bg-white" : "bg-ink"}`}
          />
          <span
            className={`absolute h-0.5 w-3 rounded-full transition-transform duration-200 ${
              isOpen ? "rotate-0" : "rotate-90"
            } ${isOpen ? "bg-white" : "bg-ink"}`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`flex max-w-[40em] flex-col gap-3 pt-0 pb-6 ${numbered ? "pl-16" : "pl-6"} pr-6`}
          >
            {(Array.isArray(item.answer) ? item.answer : [item.answer]).map((block, blockIndex) => (
              <AnswerBlock key={blockIndex} block={block} index={blockIndex} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FaqAccordion({
  title = "What I'm asked by most SaaS founders",
  subheading = "",
  items = defaultFaqItems,
  numbered = false,
  sidebar = null,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const list = (
    <div className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          item={item}
          index={index}
          numbered={numbered}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );

  if (sidebar) {
    return (
      <section aria-labelledby="faq-title" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start gap-14">
            <div className="flex min-w-0 flex-1 basis-80 flex-col gap-8 lg:sticky lg:top-25">
              <div>
                <h2 id="faq-title" className="text-h2 text-ink">
                  {title}
                </h2>
                {subheading ? (
                  <p className="mt-5 max-w-[26em] text-lg leading-[1.5] text-body">{subheading}</p>
                ) : null}
              </div>
              <div className="flex max-w-[380px] flex-col gap-4.5 rounded-2xl bg-surface p-6">
                <div>
                  <p className="mb-1.5 text-xl font-bold leading-[1.4] tracking-[-0.03em] text-ink">
                    {sidebar.title ?? "Couldn't find an answer?"}
                  </p>
                  <p className="text-base leading-[1.5] text-body">
                    {sidebar.description ?? "Book a call and ask me directly."}
                  </p>
                </div>
                <ScheduleCallButton url={sidebar.href} className="w-fit" />
              </div>
            </div>

            <div className="min-w-0 flex-1 basis-120">{list}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="faq-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 id="faq-title" className="text-h2 text-ink">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-7 max-w-[880px] sm:mt-8">{list}</div>
      </div>
    </section>
  );
}
