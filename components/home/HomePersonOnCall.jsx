import Image from "next/image";
import { Clock, Database, Users } from "lucide-react";
import SlackIcon from "@/components/ui/SlackIcon";
import Reveal from "@/components/home/Reveal";
import { AccentHeading, Section } from "@/components/home/primitives";

const MITCH = "/team/mitch-headline-portrait.png";

// Generic person glyph on a coloured tile (placeholder Slack avatars).
function PersonTile({ color, className }) {
  return (
    <span className={`flex items-end justify-center overflow-hidden ${className}`} style={{ backgroundColor: color }}>
      <svg viewBox="0 0 30 30" className="size-[85%]">
        <circle cx="15" cy="12" r="5.6" fill="rgba(255,255,255,0.92)" />
        <path d="M4.5 30c0-6.2 4.7-10.4 10.5-10.4S25.5 23.8 25.5 30z" fill="rgba(255,255,255,0.92)" />
      </svg>
    </span>
  );
}

const changes = [
  { title: "Budget moved to Competitor campaign", when: "Yesterday", tag: "Budget", tagClass: "bg-[#eff4ff] text-hp-accent", note: "+$40/day · explained in #acme-google-ads", current: true },
  { title: "Added 14 negative keywords", when: "Tue", tag: "Keywords", tagClass: "bg-[#fef3e2] text-[#b45309]" },
  { title: "New ad copy test on Trial campaign", when: "Mon", tag: "Ads", tagClass: "bg-[#f3eefe] text-[#7c3aed]" },
  { title: "Paid-signup conversion value updated", when: "Mon", tag: "Tracking", tagClass: "bg-[#e8f7ee] text-[#15803d]", faded: true, last: true },
];

// Slack thread + change history mockup (decorative).
function SlackMockup() {
  return (
    <div
      aria-hidden="true"
      className="flex w-full max-w-127.75 shrink-0 flex-col gap-2 rounded-t-[18px] bg-hp-tray p-2 font-hp shadow-[0_0_0_1px_rgba(14,15,17,0.06),0_6px_16px_rgba(14,15,17,0.05)] lg:w-127.75 lg:gap-3 lg:p-3"
    >
      <Reveal className="flex flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgba(14,15,17,0.04)]">
        <div className="flex items-center justify-between border-b border-hp-line-soft px-4.5 py-3">
          <div className="flex items-center gap-2.25">
            <SlackIcon className="size-3.75" />
            <span className="text-[15px]/5 font-semibold text-hp-ink"># acme-google-ads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex">
              <PersonTile color="#1D9BD1" className="size-5 rounded-[5px] border-[1.5px] border-white" />
              <Image src={MITCH} alt="" width={40} height={40} className="-ml-1.25 size-5 rounded-[5px] border-[1.5px] border-white object-cover" />
              <PersonTile color="#E8912D" className="-ml-1.25 size-5 rounded-[5px] border-[1.5px] border-white" />
              <PersonTile color="#2BAC76" className="-ml-1.25 size-5 rounded-[5px] border-[1.5px] border-white" />
            </span>
            <span className="text-[13px]/4.5 text-[#6b7079]">4</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4.5 pt-4 pb-4.5">
          <div className="rv flex gap-2.75" style={{ "--rv-i": 1 }}>
            <PersonTile color="#1D9BD1" className="size-8 shrink-0 rounded-[7px]" />
            <div className="flex flex-col gap-0.5">
              <p className="flex items-baseline gap-1.75">
                <span className="text-sm/4.75 font-semibold text-hp-ink">Sarah</span>
                <span className="text-xs/4 text-hp-muted">9:14 AM</span>
              </p>
              <p className="text-sm/5 text-[#1d1f23]">Trial sign-ups jumped this morning. Did something change?</p>
            </div>
          </div>

          <div className="rv flex gap-2.75" style={{ "--rv-i": 3 }}>
            <Image src={MITCH} alt="" width={64} height={64} className="size-8 shrink-0 rounded-[7px] object-cover" />
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <p className="flex items-baseline gap-1.75">
                  <span className="text-sm/4.75 font-semibold text-hp-ink">Mitch</span>
                  <span className="text-xs/4 text-hp-muted">9:16 AM</span>
                </p>
                <p className="text-sm/5 text-[#1d1f23]">
                  Yes, I moved budget into the competitor campaign yesterday. Early numbers below, full read on Friday.
                </p>
              </div>
              <div style={{ "--rv-i": 5 }} className="rv-pop flex w-full max-w-82.5 items-center gap-4 rounded-sm border-l-3 border-hp-accent bg-[#f7f9ff] px-3.5 py-2.5">
                <div className="flex shrink-0 flex-col gap-px">
                  <span className="text-xs/4 text-hp-soft">Trials, last 7 days</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-xl/6 font-semibold tracking-[-0.02em] text-hp-ink">86</span>
                    <span className="text-xs/4 font-medium text-hp-up">▲ 34%</span>
                  </span>
                </div>
                <svg viewBox="-3 0 136 34" className="h-8.5 w-34 shrink-0 overflow-visible">
                  <path className="rv-draw" style={{ "--rv-i": 7 }} pathLength="1" d="M0 28 L20 26 L40 27 L60 22 L80 16 L100 10 L130 3" fill="none" stroke="#155EEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle className="rv-fade" style={{ "--rv-i": 15 }} cx="130" cy="3" r="3" fill="#155EEF" />
                </svg>
              </div>
              <div className="rv-fade flex items-center gap-2.5" style={{ "--rv-i": 8 }}>
                <span className="flex items-center gap-1 rounded-full border border-[#c7d6fc] bg-[#eff4ff] px-2 py-0.5 text-xs/4 text-hp-accent">
                  <span className="font-semibold">+1</span> 2
                </span>
                <span className="text-xs/4 font-medium text-hp-accent">3 replies</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="flex flex-col rounded-xl border border-[#e4e4e7] bg-white px-4.5 pt-3.5 pb-1.5 shadow-[0_1px_2px_rgba(14,15,17,0.04)]">
        <div className="flex items-center justify-between pb-2.5">
          <span className="text-[15px]/5 font-semibold text-hp-ink">Change history</span>
          <span className="flex items-center gap-1.5">
            <Image src={MITCH} alt="" width={36} height={36} className="size-4.5 rounded-full object-cover" />
            <span className="text-[13px]/4.5 text-hp-soft">All changes by Mitch</span>
          </span>
        </div>
        <div className="flex flex-col">
          {changes.map((change, index) => (
            <div key={change.title} className="rv relative flex gap-3" style={{ "--rv-i": index + 1 }}>
              <div className={`flex w-3 shrink-0 flex-col items-center ${change.current ? "pt-1.25" : "pt-1.5"}`}>
                {change.current ? (
                  <span className="size-2.5 shrink-0 rounded-full bg-hp-accent shadow-[0_0_0_3px_#dce6fd]" />
                ) : (
                  <span className="size-2 shrink-0 rounded-full bg-white shadow-[0_0_0_1.5px_#c9cdd3]" />
                )}
                {change.last ? null : <span className="w-px grow bg-[#e4e6ea]" />}
              </div>
              <div className={`flex grow flex-col gap-1 ${change.last ? "pb-3" : "pb-3.5"}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className={`text-sm/5 ${change.current ? "font-medium text-hp-ink" : "text-[#1d1f23]"}`}>{change.title}</span>
                  <span className="shrink-0 pt-0.5 text-xs/4 text-hp-muted">{change.when}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-[5px] px-1.75 py-px text-xs/4 font-medium ${change.tagClass}`}>{change.tag}</span>
                  {change.note ? <span className="hidden text-xs/4 text-[#6b7079] sm:inline">{change.note}</span> : null}
                </div>
              </div>
              {/* Fades the oldest change out (a veil rather than opacity keeps text contrast measurable). */}
              {change.faded ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/45" /> : null}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

const points = [
  { Icon: Database, text: "8+ years in paid media across 85+ verticals, and tens of millions in managed spend." },
  { Icon: Clock, text: "A small client list, so your account gets real hours." },
  { Icon: Users, text: "Want a reference? I'll put you in touch with a current client." },
];

export default function HomePersonOnCall() {
  return (
    <Section labelledBy="person-on-call-title" innerClassName="flex flex-col lg:flex-row">
      {/* Illustration cell: second on phones, first (left) on desktop. */}
      <div className="order-2 flex flex-col px-5 pt-1.5 pb-11 sm:px-8 lg:order-1 lg:w-139.75 lg:shrink-0 lg:justify-between lg:gap-3.5 lg:border-r lg:border-hp-line lg:pt-26 lg:pr-0 lg:pb-0 lg:pl-12">
        <p className="hidden max-w-105 flex-col gap-0.5 pr-12 font-hp text-[22px]/7 font-medium tracking-[-0.02em] lg:flex">
          <span className="text-hp-ink">Every change made by me,</span>
          <span className="text-hp-muted">and explained in your Slack.</span>
        </p>
        <SlackMockup />
      </div>

      <div className="order-1 flex flex-col items-start px-5 pt-12 pb-4.5 sm:px-8 lg:order-2 lg:flex-1 lg:px-12 lg:pt-18 lg:pb-14">
        <AccentHeading id="person-on-call-title" eyebrow="03 · How I work" lead="The person on the call" accent="is the person in your account." marker={2} className="lg:pt-5" />
        <p className="pt-4.5 font-hp text-base/6.25 text-hp-body lg:pt-5 lg:text-[17px]/6.75">
          At most agencies a senior sells the account and a junior runs it. I have no juniors to hand it to. Strategy,
          build, weekly changes and reporting are all done by me.
        </p>
        <ul className="hidden flex-col gap-3.5 self-stretch py-7 lg:flex">
          {points.map(({ Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <span className="flex w-5.5 shrink-0 pt-0.5">
                <Icon aria-hidden="true" className="size-5 text-hp-icon" strokeWidth={1.75} />
              </span>
              <span className="font-hp text-base/6 text-hp-ink">{text}</span>
            </li>
          ))}
        </ul>
        <figure className="hidden items-start gap-3 self-stretch border-t border-hp-line pt-5.5 lg:flex">
          <Image src="/client pfp/dominic whyte.png" alt="Dominic Whyte" width={72} height={72} className="size-9 shrink-0 rounded-full object-cover" />
          <div className="flex flex-col gap-0.5">
            <blockquote className="font-hp text-[15px]/5.5 font-medium text-hp-ink">
              &quot;Working with Mitch from Ads That Convert has been a game-changer for our startup.&quot;
            </blockquote>
            <figcaption className="flex items-center gap-2.5">
              <span className="font-hp text-sm/5 text-hp-fine">Dominic Whyte, Founder</span>
              <span aria-hidden="true" className="h-3.5 w-px bg-[#dadce0]" />
              <span className="relative block h-5.5 w-13.75">
                <Image src="/client-logos/fillout.png" alt="Fillout" fill sizes="56px" className="object-contain" />
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </Section>
  );
}
