import { Clock, Database, GitBranch, Globe, Info, Receipt, Users } from "lucide-react";
import { AccentHeading, BookButton, Section, SectionHead } from "@/components/home/primitives";

// Sections for market pages (DESIGN.md §16.17), built on the homepage
// system. Copy comes from lib/locations.js.

const h3Class = "block font-hp text-[21px]/6.75 font-medium tracking-[-0.02em] text-hp-ink";
const bodyClass = "font-hp text-base/6 text-hp-soft";

// ─── Hero pill: who the page is for ──────────────────────────────────────

export function MarketPill({ label, note }) {
  return (
    <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-2.5 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-hp-accent" />
      <span className="font-hp text-sm/4.5 text-hp-body">
        <span className="font-medium text-hp-ink">{label}</span> · {note}
      </span>
    </span>
  );
}

// ─── The short answer: a plain summary beside a list of facts ────────────

export function LocationAnswer({ eyebrow, marker, heading, paragraphs, facts }) {
  return (
    <Section id="short-answer" labelledBy="answer-title" innerClassName="flex flex-col lg:flex-row">
      <div className="flex flex-col gap-6 px-5 pt-12 pb-8 sm:px-8 lg:w-130 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-12 lg:pt-18 lg:pb-14">
        <AccentHeading id="answer-title" eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} marker={marker} />
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-hp text-[17px]/6.75 text-hp-body">
              {paragraph}
            </p>
          ))}
        </div>
        <div data-booking-cta-zone className="pt-1">
          <BookButton size="hero" className="w-full sm:w-auto" />
        </div>
      </div>

      <dl className="min-w-0 flex-1 lg:py-18">
        {facts.map((fact, index) => (
          <div
            key={fact.term}
            className={`flex flex-col gap-1 border-t border-hp-line px-5 py-4.5 sm:px-8 lg:flex-row lg:items-baseline lg:gap-6 lg:py-5.5 lg:pr-12 lg:pl-10 ${
              index === facts.length - 1 ? "lg:border-b" : ""
            }`}
          >
            <dt className="font-hp-mono text-xs/4 tracking-[0.06em] text-hp-fine uppercase lg:w-40 lg:shrink-0">{fact.term}</dt>
            <dd className="flex flex-col gap-0.5">
              <span className="font-hp text-lg/6 font-medium tracking-[-0.01em] text-hp-ink">{fact.value}</span>
              <span className="font-hp text-[15px]/5.75 text-hp-soft">{fact.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

// ─── Coverage: what working together looks like in this market ──────────

const coverageIcons = {
  hours: Clock,
  markets: Globe,
  clients: Users,
  billing: Receipt,
  crm: Database,
  models: GitBranch,
};

export function LocationCoverage({ eyebrow, marker, heading, description, items, footnote }) {
  return (
    <Section id="coverage" labelledBy="coverage-title">
      <SectionHead id="coverage-title" marker={marker} eyebrow={eyebrow} lead={heading.lead} accent={heading.accent} intro={description} />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:border-t sm:border-hp-line">
        {items.map((item, index) => {
          const Icon = coverageIcons[item.icon] ?? Info;
          return (
            <li
              key={item.title}
              className={`flex min-w-0 flex-col gap-3 border-t border-hp-line px-5 pt-6.5 pb-7.5 sm:border-t-0 sm:px-8 lg:gap-3.5 lg:px-10 lg:pt-9 lg:pb-10 ${
                index % 2 === 0 ? "sm:border-r sm:border-hp-line" : ""
              } ${index < items.length - 2 ? "sm:border-b sm:border-hp-line" : ""} ${
                index % 3 < 2 ? "lg:border-r lg:border-hp-line" : "lg:border-r-0"
              } ${index < items.length - 3 ? "lg:border-b lg:border-hp-line" : "lg:border-b-0"}`}
            >
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-[10px] bg-white text-hp-icon shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.08)]"
              >
                <Icon className="size-4.5" strokeWidth={1.75} />
              </span>
              <h3 className="pt-1.5">
                <span className={h3Class}>{item.title}</span>
              </h3>
              <p className={bodyClass}>{item.description}</p>
            </li>
          );
        })}
      </ul>

      {footnote ? (
        <div className="flex items-start gap-2.5 border-t border-hp-line bg-hp-wash p-5 sm:px-8 lg:items-center lg:justify-center lg:bg-hp-band lg:px-12 lg:py-6.5">
          <Info aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-hp-fine lg:mt-0" strokeWidth={1.75} />
          <p className="font-hp text-base/6 text-hp-body">{footnote}</p>
        </div>
      ) : null}
    </Section>
  );
}
