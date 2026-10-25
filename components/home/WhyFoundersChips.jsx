"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import GoogleAdsIcon from "@/components/ui/GoogleAdsIcon";
import Play from "@/components/home/Play";

// Illustrations for "Why founders hire me": one small product scene per
// reason, each animating once as it scrolls into view (Play.jsx + play.css).
// Decorative and aria-hidden, except the press logos (real logos, alt text).
// Numbers are illustrative.

const card = "rounded-xl bg-white shadow-[0_0_0_1px_#e4e6ea,0_8px_24px_rgba(14,15,17,0.06)]";
const easeOut = (t) => 1 - (1 - t) ** 3;
const delay = (ms) => ({ "--pl-d": `${ms}ms` });

// ─── Reported in MRR: a weekly report where MRR leads and clicks trail ───

const MRR = 3664;
const formatMrr = (value) => `$${Math.round(value).toLocaleString("en-US")}`;

function countFrom(el) {
  const target = el.querySelector("[data-count]");
  if (target) target.textContent = formatMrr(0);
}

function countUp(el) {
  const target = el.querySelector("[data-count]");
  if (!target) return;
  const start = performance.now() + 200;
  const tick = (now) => {
    const t = Math.min(1, Math.max(0, (now - start) / 1300));
    target.textContent = formatMrr(MRR * easeOut(t));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function MrrChip() {
  const rows = [
    ["Trials", "128"],
    ["Paid customers", "23"],
  ];
  return (
    <Play aria-hidden="true" onReady={countFrom} onPlay={countUp} className={`${card} pl-pop flex w-70 flex-col px-3.5 pt-3 pb-2`}>
      <span className="flex items-center justify-between pb-2">
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Weekly report</span>
        <span className="font-hp-mono text-xs/4 text-hp-fine">MON 9:00</span>
      </span>
      <span className="flex items-end justify-between border-t border-hp-line-soft pt-2 pb-1.5">
        <span className="flex flex-col">
          <span className="font-hp text-xs/4 text-hp-fine">New MRR</span>
          <span className="flex items-baseline gap-1.5">
            <span data-count className="min-w-[4.1em] font-hp text-xl/6.5 font-semibold tracking-[-0.03em] text-hp-ink tabular-nums">
              {formatMrr(MRR)}
            </span>
            <span className="pl-pop font-hp text-xs/4 font-medium text-hp-up" style={delay(1400)}>
              ▲ 18%
            </span>
          </span>
        </span>
        <svg viewBox="0 0 72 28" className="h-7 w-18 shrink-0" fill="none">
          <path
            className="pl-draw"
            pathLength="1"
            style={delay(300)}
            d="M1 24 L11 21 L21 22 L31 15 L41 16 L51 9 L61 8 L71 3"
            stroke="#155EEF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {rows.map(([label, value], index) => (
        <span key={label} className="pl-up flex justify-between border-t border-hp-line-soft py-1.25" style={delay(500 + index * 120)}>
          <span className="font-hp text-xs/4 text-hp-body">{label}</span>
          <span className="font-hp text-xs/4 font-semibold text-hp-ink">{value}</span>
        </span>
      ))}
      <span className="pl-up flex justify-between border-t border-hp-line-soft py-1.25" style={delay(740)}>
        <span className="font-hp text-xs/4 text-hp-muted">Clicks, CTR</span>
        <span className="font-hp text-xs/4 text-hp-muted">in the appendix</span>
      </span>
    </Play>
  );
}

// ─── You own the account: the access panel, with you as the owner ────────

export function OwnerChip() {
  const users = [
    { initial: "Y", email: "you@yoursaas.com", role: "Admin · owner", owner: true },
    { initial: "M", email: "mitch@adsthatconvert.co", role: "Standard" },
  ];
  return (
    <Play aria-hidden="true" className={`${card} pl-pop flex w-70 flex-col px-3.5 pt-3 pb-2.5`}>
      <span className="flex items-center gap-1.75 pb-2">
        <GoogleAdsIcon className="h-3.5 w-3.75" />
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Access and security</span>
      </span>
      {users.map((user, index) => (
        <span key={user.email} className="pl-up flex items-center gap-2 border-t border-hp-line-soft py-1.75" style={delay(300 + index * 150)}>
          <span
            className={`flex size-5.5 shrink-0 items-center justify-center rounded-full font-hp text-xs/4 font-semibold ${
              user.owner ? "bg-hp-accent text-white" : "bg-hp-tray text-hp-soft"
            }`}
          >
            {user.initial}
          </span>
          <span className={`min-w-0 flex-1 truncate font-hp text-xs/4 ${user.owner ? "font-medium text-hp-ink" : "text-hp-body"}`}>
            {user.email}
          </span>
          <span
            className={`pl-pop shrink-0 rounded-full px-2 py-0.5 font-hp text-xs/4 ${
              user.owner ? "bg-[#eef3fe] font-medium text-hp-accent" : "bg-hp-tray text-hp-soft"
            }`}
            style={delay(650 + index * 150)}
          >
            {user.role}
          </span>
        </span>
      ))}
      <span className="pl-up flex items-center justify-between border-t border-hp-line-soft pt-1.75" style={delay(800)}>
        <span className="flex items-center gap-1.75 font-hp text-xs/4 text-hp-body">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
          Billing
        </span>
        <span className="font-hp text-xs/4 font-medium text-hp-ink">Your card ·· 4242</span>
      </span>
    </Play>
  );
}

// ─── Tracking built by hand: the snippet, line by line, then received ────

const codeLines = [
  [["// fires on first payment", "text-[#8f96a3]"]],
  [["dataLayer", "text-white"], [".push({", "text-[#8f96a3]"]],
  [["  event: ", "text-white"], ["'paid'", "text-[#c7d6fc]"], [",", "text-[#8f96a3]"]],
  [["  value: ", "text-white"], ["149", "text-[#fcd34d]"], [",", "text-[#8f96a3]"]],
  [["  currency: ", "text-white"], ["'USD'", "text-[#c7d6fc]"]],
  [["});", "text-[#8f96a3]"]],
];

export function CodeChip() {
  return (
    <Play aria-hidden="true" className="pl-pop flex w-72.5 flex-col overflow-hidden rounded-xl bg-hp-ink shadow-[0_8px_24px_rgba(14,15,17,0.16)]">
      <span className="flex items-center gap-1.5 border-b border-[#24262b] px-3 py-2">
        <span className="size-2 rounded-full bg-[#3a3d44]" />
        <span className="size-2 rounded-full bg-[#3a3d44]" />
        <span className="size-2 rounded-full bg-[#3a3d44]" />
        <span className="pl-1.5 font-hp-mono text-xs/4 text-[#8f96a3]">checkout.js</span>
      </span>
      <span className="flex flex-col px-3 py-2 font-hp-mono text-xs/4.5 whitespace-pre">
        {codeLines.map((tokens, index) => (
          <span key={index} className="pl-fade flex" style={delay(250 + index * 170)}>
            <span className="w-4.5 shrink-0 text-[#5b616b]">{index + 1}</span>
            {tokens.map(([text, tone]) => (
              <span key={text} className={tone}>
                {text}
              </span>
            ))}
            {index === codeLines.length - 1 ? <span className="pl-caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#c7d6fc]" /> : null}
          </span>
        ))}
      </span>
      <span className="pl-up flex items-center justify-between bg-[#1a1c20] px-3 py-1.75" style={delay(1350)}>
        <span className="flex items-center gap-1.5 font-hp text-xs/4 text-white">
          <GoogleAdsIcon className="h-3 w-3.25" />
          Google Ads
        </span>
        <span className="font-hp text-xs/4 font-medium text-[#4ade80]">✓ Conversion received</span>
      </span>
    </Play>
  );
}

// ─── No lock-in: months roll on with no minimum term ─────────────────────

export function TermsChip() {
  const months = Array.from({ length: 12 }, (_, index) => index);
  return (
    <Play aria-hidden="true" className={`${card} pl-pop flex w-70 flex-col gap-2.5 px-3.5 pt-3 pb-3`}>
      <span className="flex items-center justify-between">
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Your plan</span>
        <span className="rounded-full bg-[#eef3fe] px-2 py-0.5 font-hp text-xs/4 font-medium text-hp-accent">Month-to-month</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="flex gap-0.75">
          {months.map((month) => (
            <span
              key={month}
              className={`pl-pop h-5 flex-1 rounded-[3px] ${month < 7 ? "bg-hp-accent" : "border border-dashed border-[#c3c7cf]"}`}
              style={delay(250 + month * 55)}
            />
          ))}
        </span>
        <span className="flex justify-between font-hp-mono text-xs/4 text-hp-fine">
          <span>M1</span>
          <span>renews monthly</span>
          <span>M12</span>
        </span>
      </span>
      <span className="flex items-center justify-between border-t border-hp-line-soft pt-2">
        <span className="flex items-center gap-2 font-hp text-xs/4">
          <span className="text-hp-body">Minimum term</span>
          <span className="relative text-hp-muted">
            12 months
            <span className="pl-strike absolute inset-x-0 top-1/2 h-px bg-hp-ink" style={delay(1000)} />
          </span>
          <span className="pl-pop font-semibold text-hp-ink" style={delay(1250)}>
            None
          </span>
        </span>
        <span className="rounded-md px-2 py-0.75 font-hp text-xs/4 text-hp-soft shadow-[0_0_0_1px_#e4e6ea]">Cancel</span>
      </span>
    </Play>
  );
}

// ─── Published in the PPC press: a stack of the actual pieces ────────────

export function PressLogos({ logos }) {
  // Back to front. `kind` and `title` describe the real pieces linked in the footer.
  const pieces = [
    { ...logos.find((logo) => logo.alt === "PPC Chat"), kind: "Interview", title: "Meet Mitch Cartwright" },
    { ...logos.find((logo) => logo.alt === "Optmyzr"), kind: "Podcast", title: "Optmyzr podcast guest" },
    { ...logos.find((logo) => logo.alt === "PPC Hero"), kind: "Article", title: "End-to-end lead gen funnel tracking" },
    { ...logos.find((logo) => logo.alt === "Search Engine Journal"), kind: "Article", title: "Hyper-local PPC landing pages" },
  ];
  const last = pieces.length - 1;
  return (
    <Play className="relative block h-44 w-70">
      {pieces.map((piece, index) => {
        const depth = last - index;
        return (
          <span
            key={piece.alt}
            className={`${card} pl-fade absolute right-0 bottom-0 left-0 flex h-24 origin-bottom flex-col gap-1.5 px-3.5 ${depth === 0 ? "pt-2.5" : "pt-1.5"}`}
            style={{
              // Each card behind peeks out 24px, enough to show its logo.
              transform: `translateY(${-depth * 24}px) scale(${1 - depth * 0.035})`,
              zIndex: index,
              "--pl-d": `${index * 140}ms`,
            }}
          >
            <span className="flex items-center justify-between">
              <span className={`relative block ${piece.box}`}>
                <Image src={piece.src} alt={piece.alt} fill sizes="96px" className="object-contain object-left" />
              </span>
              <span className="font-hp-mono text-xs/4 text-hp-fine uppercase">{piece.kind}</span>
            </span>
            {depth === 0 ? (
              <>
                <span className="pt-1 font-hp text-[13px]/4.5 font-semibold text-hp-ink">{piece.title}</span>
                <span className="h-1.5 w-[86%] rounded-full bg-hp-line" />
                <span className="h-1.5 w-[64%] rounded-full bg-hp-line-soft" />
              </>
            ) : null}
          </span>
        );
      })}
    </Play>
  );
}

// ─── References on request: pick a current client to speak to ───────────

// Generic on purpose: no client names, companies or photos.
const referenceRoles = ["SaaS founder", "Head of growth", "Marketing lead"];

export function ReferencesChip() {
  return (
    <Play aria-hidden="true" className={`${card} pl-pop flex w-70 flex-col px-3.5 pt-3 pb-1.5`}>
      <span className="flex items-center justify-between pb-2">
        <span className="font-hp text-[13px]/4.5 font-semibold text-hp-ink">Speak to a client first</span>
        <span className="font-hp-mono text-xs/4 text-hp-fine">BEFORE YOU SIGN</span>
      </span>
      {referenceRoles.map((role, index) => {
        return (
          <span
            key={role}
            className="pl-up flex items-center gap-2.5 border-t border-hp-line-soft py-1.5"
            style={delay(300 + index * 140)}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-hp-tray text-hp-fine">
              <UserRound className="size-3.5" strokeWidth={2} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-hp text-xs/4 font-semibold text-hp-ink">{role}</span>
              <span className="truncate font-hp text-xs/4 text-hp-fine">Current client</span>
            </span>
            {index === 0 ? (
              <span className="flex items-center gap-1.5 font-hp text-xs/4 font-medium text-hp-up">
                <span className="pl-ping relative size-1.5 rounded-full bg-hp-up text-hp-up" />
                Intro
              </span>
            ) : (
              <span className="font-hp text-xs/4 text-hp-muted">Intro</span>
            )}
          </span>
        );
      })}
    </Play>
  );
}
