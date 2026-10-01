"use client";

import { Check, CircleAlert, Copy, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";

const INPUT_KEYS = ["a", "b", "c", "d"];
const MATCH_TYPES = [
  { key: "exact", label: "Exact" },
  { key: "phrase", label: "Phrase" },
  { key: "broad", label: "Broad" },
];
const CONFETTI_COLORS = [
  "var(--color-ink)",
  "var(--pastel-lavender)",
  "var(--pastel-periwinkle)",
  "var(--pastel-ice)",
  "var(--pastel-blush)",
  "var(--pastel-mint)",
];

// Checkbox rendered as a pill chip: the native input stays in the label (sr-only),
// so keyboard and screen-reader behaviour is unchanged. Ink when checked.
const CHIP_CLASS =
  "relative inline-flex cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-white text-ink ring-1 ring-border ring-inset transition-colors hover:bg-surface has-checked:bg-ink has-checked:text-white has-checked:ring-ink has-checked:hover:bg-[#2d2d2a] has-focus-visible:ring-2 has-focus-visible:ring-ink/60 has-focus-visible:ring-offset-2";

function getCombinations(arr, len) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === len) {
      result.push(current.join(""));
      return;
    }

    for (let i = start; i < arr.length; i += 1) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

function generateCombinations(arr) {
  const result = [];

  for (let i = 1; i <= arr.length; i += 1) {
    result.push(...getCombinations(arr, i));
  }

  return result.sort((a, b) => {
    if (b.length !== a.length) {
      return b.length - a.length;
    }

    return a.localeCompare(b);
  });
}

function applyMatchType(keyword, matchType) {
  if (matchType === "exact") return `[${keyword}]`;
  if (matchType === "phrase") return `"${keyword}"`;

  return keyword;
}

function parseKeywords(value) {
  const trimmed = value.trim();
  if (!trimmed) return [""];

  return trimmed
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function KeywordConcatenationTool() {
  const [inputs, setInputs] = useState({
    a: { enabled: true, value: "" },
    b: { enabled: true, value: "" },
    c: { enabled: true, value: "" },
    d: { enabled: true, value: "" },
  });
  const [selectedMatchTypes, setSelectedMatchTypes] = useState(["exact"]);
  const [selectedCombinations, setSelectedCombinations] = useState([]);
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const selectedInputs = useMemo(
    () => INPUT_KEYS.filter((key) => inputs[key].enabled),
    [inputs],
  );

  const allCombinations = useMemo(
    () => generateCombinations(selectedInputs),
    [selectedInputs],
  );

  const combinationSet = useMemo(() => new Set(allCombinations), [allCombinations]);

  const activeCombinations = useMemo(
    () => selectedCombinations.filter((combo) => combinationSet.has(combo)),
    [selectedCombinations, combinationSet],
  );

  function updateInputEnabled(key, enabled) {
    setInputs((current) => ({
      ...current,
      [key]: {
        ...current[key],
        enabled,
      },
    }));

    setSelectedCombinations((current) => current.filter((combo) => !combo.includes(key)));
  }

  function updateInputValue(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: {
        ...current[key],
        value,
      },
    }));
  }

  function toggleMatchType(matchType) {
    setSelectedMatchTypes((current) => {
      if (current.includes(matchType)) {
        return current.filter((item) => item !== matchType);
      }

      return [...current, matchType];
    });
  }

  function toggleCombination(combo) {
    setSelectedCombinations((current) => {
      if (current.includes(combo)) {
        return current.filter((item) => item !== combo);
      }

      return [...current, combo];
    });
  }

  function runConcatenation() {
    if (activeCombinations.length === 0) {
      setErrorMessage("Select at least one combination.");
      return;
    }

    if (selectedMatchTypes.length === 0) {
      setErrorMessage("Select at least one match type.");
      return;
    }

    const parsedInputs = {};

    selectedInputs.forEach((key) => {
      parsedInputs[key] = parseKeywords(inputs[key].value);
    });

    const results = new Set();

    activeCombinations.forEach((combination) => {
      const parts = combination.split("").map((key) => parsedInputs[key]);

      const builtRows = parts.reduce((acc, current) => {
        if (acc.length === 0) return current;

        const newRows = [];

        acc.forEach((left) => {
          current.forEach((right) => {
            newRows.push(`${left} ${right}`.trim());
          });
        });

        return newRows;
      }, []);

      builtRows.forEach((row) => {
        selectedMatchTypes.forEach((matchType) => {
          results.add(applyMatchType(row, matchType));
        });
      });
    });

    setOutput(Array.from(results).join("\n"));
    setErrorMessage("");
    setCopied(false);
  }

  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      const burst = Array.from({ length: 28 }).map((_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 36 + Math.random() * 92;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 36;

        return {
          id: `${Date.now()}-${index}`,
          tx: `${tx.toFixed(2)}px`,
          ty: `${ty.toFixed(2)}px`,
          color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          delay: `${(index % 8) * 16}ms`,
        };
      });
      setConfettiPieces(burst);
      setTimeout(() => setCopied(false), 1800);
      setTimeout(() => setConfettiPieces([]), 950);
    } catch {
      setErrorMessage("Could not copy output. Please copy manually.");
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {INPUT_KEYS.map((key) => {
          const isEnabled = inputs[key].enabled;

          return (
            <article
              key={key}
              className={`rounded-2xl border border-border p-4 transition-colors sm:p-5 ${
                isEnabled ? "bg-white" : "bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className={`text-xl font-bold ${isEnabled ? "text-ink" : "text-muted"}`}>
                  {key.toUpperCase()}
                </h2>
                <label className={`${CHIP_CLASS} px-3 py-1.5 text-sm font-medium`}>
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isEnabled}
                    onChange={(event) => updateInputEnabled(key, event.target.checked)}
                  />
                  <Check className="hidden h-4 w-4 peer-checked:block" strokeWidth={2} aria-hidden="true" />
                  Include
                </label>
              </div>

              <textarea
                value={inputs[key].value}
                onChange={(event) => updateInputValue(key, event.target.value)}
                disabled={!isEnabled}
                rows={8}
                placeholder="Enter 1 keyword or phrase per line"
                className="mt-4 block w-full resize-y rounded-xl border border-border bg-white p-3 text-base leading-[1.6] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/20 disabled:cursor-not-allowed disabled:bg-surface disabled:text-fine"
              />
            </article>
          );
        })}
      </div>

      <div className="grid grid-cols-1 rounded-2xl border border-border lg:grid-cols-2">
        <section className="p-4 sm:p-6">
          <h3 className="text-xl font-bold text-ink">Output</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {MATCH_TYPES.map((matchType) => (
              <label key={matchType.key} className={`${CHIP_CLASS} px-4 py-2 text-base font-medium`}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selectedMatchTypes.includes(matchType.key)}
                  onChange={() => toggleMatchType(matchType.key)}
                />
                <Check className="hidden h-4 w-4 peer-checked:block" strokeWidth={2} aria-hidden="true" />
                {matchType.label}
              </label>
            ))}
          </div>
        </section>

        <section className="border-t border-border p-4 sm:p-6 lg:border-t-0 lg:border-l">
          <h3 className="text-xl font-bold text-ink">Combinations</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {allCombinations.map((combo) => (
              <label key={combo} className={`${CHIP_CLASS} min-w-14 px-3.5 py-2 text-base font-semibold tabular-nums`}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={activeCombinations.includes(combo)}
                  onChange={() => toggleCombination(combo)}
                />
                {combo.toUpperCase()}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="button"
          onClick={runConcatenation}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2d2d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2"
        >
          <WandSparkles className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          Generate keywords
        </button>

        {errorMessage ? (
          <p role="alert" className="inline-flex items-start gap-2 text-base font-medium text-ink">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {errorMessage}
          </p>
        ) : null}
      </div>

      <section className="relative">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-ink">Generated keywords</h3>
          <button
            type="button"
            onClick={copyOutput}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-semibold text-ink ring-1 ring-ink ring-inset transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            disabled={!output}
          >
            {copied ? (
              <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {confettiPieces.length > 0 ? (
          <div className="pointer-events-none absolute right-4 top-0 h-16 w-16 overflow-visible" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="tool-confetti-piece"
                style={{
                  backgroundColor: piece.color,
                  animationDelay: piece.delay,
                  "--tx": piece.tx,
                  "--ty": piece.ty,
                }}
              />
            ))}
          </div>
        ) : null}
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white shadow-[0_2px_4px_rgba(26,26,24,0.04),0_12px_28px_rgba(26,26,24,0.06)]">
          <div className="relative flex h-8.5 items-center border-b border-border bg-surface" aria-hidden="true">
            <div className="absolute left-3.5 flex gap-1.75">
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            rows={12}
            placeholder="Generated keywords will appear here..."
            onClick={copyOutput}
            title={output ? "Click to copy keywords" : "Generate keywords to copy"}
            className="block w-full cursor-copy resize-y bg-white px-4 py-3.5 font-mono text-base leading-[1.6] text-ink outline-none placeholder:font-sans placeholder:text-muted focus-visible:bg-surface/40"
          />
        </div>
      </section>
    </div>
  );
}
