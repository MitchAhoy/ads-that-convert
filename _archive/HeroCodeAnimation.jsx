"use client";

import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import { ShikiMagicMove } from "shiki-magic-move/react";

const theme = "github-light";
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
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-[0_4px_8px_rgba(26,26,24,0.04),0_20px_40px_rgba(26,26,24,0.08)]">
        <div className="relative flex h-8.5 items-center justify-center border-b border-border bg-surface">
          <div className="absolute left-3.5 flex gap-1.75">
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
          </div>
          <span className="text-xs text-muted">growth.ts</span>
        </div>

        <div className="hero-magic-move px-2 pt-4 pb-5">
          {highlighter ? (
            <ShikiMagicMove
              lang="ts"
              theme={theme}
              highlighter={highlighter}
              code={snippets[step]}
              className="hero-magic-move-code"
              options={{ duration: 900, stagger: 0.35, lineNumbers: true }}
            />
          ) : (
            <div className="hero-magic-move-placeholder animate-pulse rounded-lg bg-surface" />
          )}
        </div>
      </div>
    </div>
  );
}
