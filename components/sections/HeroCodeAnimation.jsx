"use client";

import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import { ShikiMagicMove } from "shiki-magic-move/react";

const theme = "material-theme-palenight";
const snippets = [
  `const before = {
  wastedSpend: 4600,
  signups: 27,
  upgrades: 1,
  signUpRate: 0.014,
  upgradeToPayingRate: 0.037,
  newMrr: 99,
};`,
  `optimize({
  searchTerms: "cut low-intent traffic",
  tracking: "track all sales touch points",
  bidding: "target payback period",
  messageMatch: "tailored for query",
});`,
  `const after = {
  wastedSpend: 0,
  signups: 142,
  upgrades: 20,
  signUpRate: 0.05,
  upgradeToPayingRate: 0.141,
  newMrr: 1980,
};`,
];

export default function HeroCodeAnimation() {
  const [highlighter, setHighlighter] = useState();
  const [step, setStep] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let instance;

    async function initializeHighlighter() {
      instance = await createHighlighter({
        themes: [theme],
        langs: ["ts"],
      });

      if (!isCancelled) {
        setHighlighter(instance);
      }
    }

    initializeHighlighter();

    return () => {
      isCancelled = true;
      instance?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!highlighter || typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setStep((currentStep) => (currentStep + 1) % snippets.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [highlighter]);

  return (
    <div className="relative mx-auto w-full max-w-[920px]">
      <div className="relative overflow-hidden rounded-[34px] border border-[#1f2942] bg-[#0b1020] p-3 shadow-[0_30px_90px_rgba(10,12,24,0.42)]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400/90" />
            <span className="h-3 w-3 rounded-full bg-amber-300/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">
            growth.ts
          </span>
        </div>

        <div className="hero-magic-move bg-[linear-gradient(180deg,#0b1020_0%,#09101d_100%)] px-2 py-4">
          {highlighter ? (
            <ShikiMagicMove
              key="hero-magic-move"
              lang="ts"
              theme={theme}
              highlighter={highlighter}
              code={snippets[step]}
              className="hero-magic-move-code"
              options={{ duration: 900, stagger: 0.35, lineNumbers: true }}
            />
          ) : (
            <div className="h-full animate-pulse rounded-[24px] bg-white/[0.03]" />
          )}
        </div>
      </div>
    </div>
  );
}
