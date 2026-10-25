import Image from "next/image";
import Reveal from "@/components/home/Reveal";
import { h1Line } from "@/components/home/HomeHero";
import { QuoteRow, Section, SectionHead, AccentUnderline, focusRing } from "@/components/home/primitives";
import { Check } from "@/components/services/illustrations/shared";

// Sections for /call-confirmation (DESIGN.md §16.14). The visitor has just
// booked, so nothing here asks them to book again.

export const CONTACT_EMAIL = "mitch@adsthatconvert.co";

const emailLinkClass = `font-medium text-hp-ink underline decoration-hp-ink underline-offset-2 ${focusRing}`;

// ─── Hero: confirmation and the call agenda ──────────────────────────────

const agenda = [
  ["0:00", "Your product and goals", "Pricing, sales motion, 90-day targets", "bg-[#c7d6fc]"],
  ["4:00", "Where search fits today", "Your account, or competitors' ads if you're not live", "bg-[#8fb0f8]"],
  ["10:00", "Fit check", "Sign-up to paid, LTV and payback against CPCs", "bg-[#6e95f5]"],
  ["13:00", "Go or no-go", "A straight answer and next steps", "bg-hp-accent"],
];

function AgendaCard() {
  return (
    <div
      role="img"
      aria-label="Agenda for the 15-minute discovery call: your product and goals, where search fits today, a fit check, then a go or no-go answer with next steps."
      className="w-full max-w-105 rounded-[14px] bg-white shadow-[0_0_0_1px_#e4e6ea,0_12px_32px_rgba(14,15,17,0.1)]"
    >
      <div className="flex items-start justify-between gap-3 px-4.5 pt-4.5 pb-3.5">
        <div className="flex flex-col gap-1">
          <span className="font-hp text-[15px]/5 font-medium text-hp-ink">SaaS Google Ads discovery call</span>
          <span className="flex items-center gap-1.5 font-hp text-[13px]/4.5 text-hp-fine">
            <Image src="/google-meet-logo.png" alt="" width={28} height={28} className="size-3.5" />
            Google Meet · 15 min
          </span>
        </div>
        <Image src="/team/mitch-headshot.jpg" alt="" width={56} height={56} className="size-7 rounded-full object-cover" />
      </div>
      <div className="flex h-1.5 gap-0.75 px-4.5">
        <span className="flex-[4] rounded-full bg-[#c7d6fc]" />
        <span className="flex-[6] rounded-full bg-[#8fb0f8]" />
        <span className="flex-[3] rounded-full bg-[#6e95f5]" />
        <span className="flex-[2] rounded-full bg-hp-accent" />
      </div>
      <ul className="px-4.5 pt-2.5 pb-2">
        {agenda.map(([time, title, detail, dot], index) => (
          <li key={time} className={`flex gap-3.5 py-3 ${index < agenda.length - 1 ? "border-b border-hp-line-soft" : ""}`}>
            <span className="w-9 shrink-0 font-hp-mono text-xs/5 text-hp-muted">{time}</span>
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 font-hp text-sm/5 font-medium text-hp-ink">
                <span className={`size-1.5 rounded-full ${dot}`} />
                {title}
              </span>
              <span className="font-hp text-[13px]/4.5 text-hp-fine">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConfirmationHero({ firstName }) {
  return (
    <Section labelledBy="call-confirmation-title" innerClassName="flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center gap-4.5 bg-[radial-gradient(90%_40%_at_0%_0%,rgba(21,94,239,0.08)_0%,rgba(21,94,239,0)_70%)] px-5 pt-9 pb-8 sm:px-8 lg:w-150 lg:shrink-0 lg:gap-5.5 lg:border-r lg:border-hp-line lg:bg-[radial-gradient(70%_50%_at_0%_0%,rgba(21,94,239,0.08)_0%,rgba(21,94,239,0)_70%)] lg:px-12 lg:py-16">
        <p className="flex w-fit items-center gap-2 rounded-full bg-[#ecfdf3] py-1.5 pr-3 pl-2.5 shadow-[0_0_0_1px_#bbf7d0]">
          <span aria-hidden="true" className="size-1.75 rounded-full bg-hp-up" />
          <span className="font-hp text-sm/4.5 font-medium text-hp-up">Call booked · 15 min on Google Meet</span>
        </p>
        <h1 id="call-confirmation-title">
          <span className={`block ${h1Line} lg:text-[56px]/15.5`}>
            {firstName ? `Thanks ${firstName},` : "Thanks,"}{" "}
            <AccentUnderline seed="call-confirmation-hero">your call is booked.</AccentUnderline>
          </span>
        </h1>
        <p className="font-hp text-[17px]/6.5 text-hp-body lg:text-lg/7">
          A calendar invite with the Google Meet link is on its way. Before we talk, I&apos;ll review your site and current
          setup, so we can spend the 15 minutes on whether Google Ads will pay back for you.
        </p>
        <p className="font-hp text-[15px]/5.5 text-hp-body">
          Need a different time?{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={emailLinkClass}>
            Email me
          </a>{" "}
          and I&apos;ll move it.
        </p>
      </div>
      <div className="hp-well flex flex-1 items-center justify-center border-t border-hp-line px-5 py-7 sm:px-8 lg:border-t-0 lg:px-10 lg:py-12">
        <AgendaCard />
      </div>
    </Section>
  );
}

// ─── 01 · Before we meet: three steps, each with a small mockup ──────────

const cardClass =
  "rv flex h-40 w-full max-w-80 shrink-0 flex-col gap-2.5 rounded-t-xl bg-white px-3.5 pt-3.5 pb-4 shadow-[0_0_0_1px_#e4e6ea,0_6px_18px_rgba(14,15,17,0.06)]";

function CardHead({ title, meta }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">{title}</span>
      <span className="font-hp-mono text-xs/4 text-hp-muted">{meta}</span>
    </div>
  );
}

function InviteCard() {
  return (
    <div className={cardClass}>
      <CardHead title="Invitation" meta="FROM MITCH" />
      <div className="flex items-center gap-2">
        <Image src="/google-meet-logo.png" alt="" width={32} height={32} className="size-4" />
        <span className="font-hp text-xs/4 text-hp-text">Discovery call · Google Meet · 15 min</span>
      </div>
      <span className="h-px bg-hp-line-soft" />
      <span className="font-hp text-xs/4 text-hp-muted">Going?</span>
      <div className="flex gap-1.5">
        <span className="flex flex-1 justify-center rounded-[7px] bg-hp-accent py-1.25 font-hp text-xs/4 font-medium text-white">✓ Yes</span>
        <span className="flex flex-1 justify-center rounded-[7px] py-1.25 font-hp text-xs/4 text-hp-text shadow-[inset_0_0_0_1px_#e4e6ea]">Maybe</span>
        <span className="flex flex-1 justify-center rounded-[7px] py-1.25 font-hp text-xs/4 text-hp-text shadow-[inset_0_0_0_1px_#e4e6ea]">No</span>
      </div>
    </div>
  );
}

function NumbersCard() {
  const rows = [
    ["Revenue per customer", "$ ___"],
    ["Sign-up to paid", "__ %"],
    ["Monthly ad spend", "$ ___"],
  ];
  return (
    <div className={`${cardClass} gap-2.25`}>
      <CardHead title="Fit check inputs" meta="ROUGH IS FINE" />
      {rows.map(([label, value], index) => (
        <div key={label} className="rv flex items-center justify-between" style={{ "--rv-i": index + 2 }}>
          <span className="font-hp text-xs/4 text-hp-text">{label}</span>
          <span className="w-16 rounded-md px-1.75 py-px font-hp-mono text-xs/4 text-hp-muted shadow-[inset_0_0_0_1px_#e4e6ea]">{value}</span>
        </div>
      ))}
      <div className="rv flex items-center justify-between" style={{ "--rv-i": 5 }}>
        <span className="font-hp text-xs/4 text-hp-text">Account access</span>
        <span className="rounded-md bg-[#ecfdf3] px-1.75 py-px font-hp-mono text-xs/4 text-hp-up">NOT NEEDED</span>
      </div>
    </div>
  );
}

function ReplyCard() {
  return (
    <div className={cardClass}>
      <CardHead title="Re: Discovery call" meta="OPTIONAL" />
      <div className="flex items-center gap-2 rounded-lg bg-hp-tray px-2.25 py-1.75">
        <span className="flex size-5.5 items-center justify-center rounded-[5px] bg-[#c7d6fc] font-hp-mono text-xs text-[#1640b8]">▤</span>
        <span className="flex flex-col">
          <span className="font-hp-mono text-xs/4 text-hp-ink">campaigns_90d.png</span>
          <span className="font-hp text-xs/4 text-hp-muted">Screenshot</span>
        </span>
      </div>
      <span className="mt-auto self-end rounded-[7px] bg-hp-ink px-2.5 py-1 font-hp text-xs/4 font-medium text-white">Send</span>
    </div>
  );
}

const prepSteps = [
  {
    title: "Accept the calendar invite",
    card: <InviteCard />,
    description: (
      <>
        It has the Google Meet link. If it hasn&apos;t arrived in a few minutes, check your spam folder, then email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={emailLinkClass}>
          {CONTACT_EMAIL}
        </a>{" "}
        and I&apos;ll resend it.
      </>
    ),
  },
  {
    title: "Have three numbers to hand",
    card: <NumbersCard />,
    description:
      "Your average revenue per customer (or LTV), your sign-up or demo to paid rate, and your monthly ad spend if you're running any. Rough figures are fine. They decide whether paid search can pay back, so with them we can get to a real answer on the call.",
  },
  {
    title: "Send anything that adds context",
    card: <ReplyCard />,
    description: (
      <>
        Already running Google Ads? A screenshot of the last 90 days by campaign is enough. No account access needed yet.
        Reply to the invite or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={emailLinkClass}>
          {CONTACT_EMAIL}
        </a>
        .
      </>
    ),
  },
];

export function BeforeWeMeet({ eyebrow, marker }) {
  return (
    <Section id="before-we-meet" labelledBy="before-we-meet-title">
      <SectionHead
        id="before-we-meet-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="Before we meet,"
        accent="three small things."
        intro="None of it is required. Each one means less time on background and more time on whether Google Ads will work for you."
      />
      <ol className="grid grid-cols-1 border-t border-hp-line lg:grid-cols-3">
        {prepSteps.map((step, index) => (
          <li key={step.title} className={`flex flex-col border-hp-line ${index > 0 ? "border-t lg:border-t-0" : ""} ${index < 2 ? "lg:border-r" : ""}`}>
            <Reveal aria-hidden="true" className="hp-well flex h-47.5 items-end justify-center border-b border-hp-line px-10 lg:h-50 lg:px-12">
              {step.card}
            </Reveal>
            <div
              className={`flex flex-col gap-2 px-5 pt-5.5 pb-7 sm:px-8 lg:gap-2.5 lg:pt-6.5 lg:pb-10 ${
                index === 0 ? "lg:pr-7 lg:pl-12" : index === 2 ? "lg:pr-12 lg:pl-7" : "lg:px-7"
              }`}
            >
              <span aria-hidden="true" className="font-hp-mono text-xs/4 text-hp-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>
                <span className="block font-hp text-xl/6.5 font-medium tracking-[-0.02em] text-hp-ink lg:text-[21px]/6.75">{step.title}</span>
              </h3>
              <p className="font-hp text-base/6 text-hp-soft">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <QuoteRow
        avatarSrc="/client pfp/sunny.png"
        quote="Mitch is a fantastic PPC marketer. He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign. I highly recommend working with him!"
        name="Sunny Jain"
        role="CEO"
        company="A&J Education"
        quoteClassName="lg:max-w-205"
      />
    </Section>
  );
}

// ─── 02 · What you'll leave with ─────────────────────────────────────────

const youGet = [
  "A straight go or no-go on Google Ads, based on your margins and conversion rates",
  "The first two or three changes I'd make, whether or not we work together",
  "A realistic ad spend for a test that tells you something",
  "If it's a fit, pricing and how onboarding works",
];

const itIsnt = [
  "A pitch deck or a hard sell",
  "A handoff. I run the call, and the account if we work together",
  "A push into a long contract. Plans are month-to-month with 7 days' notice",
];

function OutcomeList({ title, items, good }) {
  return (
    <div className="flex flex-col gap-4.5 border-t border-hp-line px-5 pt-7 pb-8 sm:px-8 lg:border-t-0 lg:border-r lg:px-8 lg:pt-10 lg:pb-11">
      <h3>
        <span className="block font-hp text-[22px]/7 font-medium tracking-[-0.02em] text-hp-ink">{title}</span>
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            {good ? (
              <Check className="mt-1.25 size-4" strokeWidth={2} />
            ) : (
              <span aria-hidden="true" className="mt-3 h-px w-3.5 shrink-0 bg-hp-muted" />
            )}
            <span className="font-hp text-base/6 text-hp-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhatYouLeaveWith({ eyebrow, marker }) {
  return (
    <Section id="the-call" labelledBy="leave-with-title">
      <SectionHead
        id="leave-with-title"
        marker={marker}
        eyebrow={eyebrow}
        lead="What you'll leave"
        accent="the call with."
        intro="Fifteen minutes is enough for a clear answer on whether Google Ads makes sense for your product right now. It isn't enough for a sales pitch, so there won't be one."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:border-t lg:border-hp-line">
        <OutcomeList title="What you'll get" items={youGet} good />
        <OutcomeList title="What it isn't" items={itIsnt} />
        <figure className="hp-well flex items-center justify-center border-t border-hp-line px-5 py-8 sm:px-8 lg:border-t-0 lg:px-8">
          <div className="flex max-w-75 flex-col gap-4 rounded-[14px] bg-white p-5 shadow-[0_0_0_1px_#e4e6ea,0_8px_24px_rgba(14,15,17,0.07)] lg:-rotate-[1.5deg]">
            <svg aria-hidden="true" viewBox="0 0 34 26" className="w-6.5">
              <path
                d="M0 26V15.6C0 6.9 4.6 1.7 13 0l1.6 3.6C9.9 5 7.6 8 7.3 12H14v14H0zm19.4 0V15.6C19.4 6.9 24 1.7 32.4 0L34 3.6C29.3 5 27 8 26.7 12h6.7v14h-14z"
                fill="#155EEF"
                fillOpacity="0.85"
              />
            </svg>
            <blockquote className="font-hp text-base/6 font-medium text-hp-ink">
              Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make
              sure we were happy. Will definitely work with him again!
            </blockquote>
            <figcaption className="flex items-center gap-2.5">
              <Image src="/client pfp/matt robinson.png" alt="" width={64} height={64} className="size-8 rounded-full object-cover" />
              <span className="flex flex-col">
                <span className="font-hp text-[13px]/4.5 font-medium text-hp-ink">Matt Robinson</span>
                <span className="font-hp text-xs/4 text-hp-fine">Co-Founder, Live Tourney</span>
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
      <div className="flex items-start gap-2.5 border-t border-hp-line bg-hp-wash p-5 sm:px-8 lg:items-center lg:justify-center lg:bg-hp-band lg:px-12 lg:py-6.5">
        <p className="font-hp text-base/6 text-hp-body">
          If paid search doesn&apos;t look like it will pay back for you yet, I&apos;ll say so on the call and tell you what would
          need to change first.
        </p>
      </div>
    </Section>
  );
}
