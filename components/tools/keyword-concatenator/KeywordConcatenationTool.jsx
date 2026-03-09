"use client";

import { Check, Copy, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";

const INPUT_KEYS = ["a", "b", "c", "d"];
const MATCH_TYPES = [
  { key: "exact", label: "Exact" },
  { key: "phrase", label: "Phrase" },
  { key: "broad", label: "Broad" },
];
const CONFETTI_COLORS = ["#0f172a", "#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

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
    <div className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {INPUT_KEYS.map((key) => {
          const isEnabled = inputs[key].enabled;

          return (
            <article
              key={key}
              className={`rounded-2xl border border-zinc-200 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5 ${
                isEnabled ? "bg-zinc-100/90" : "bg-zinc-200/50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">
                  {key.toUpperCase()}
                </h2>
                <label className="inline-flex items-center gap-2 text-sm text-zinc-800">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-zinc-950"
                    checked={isEnabled}
                    onChange={(event) => updateInputEnabled(key, event.target.checked)}
                  />
                  Include
                </label>
              </div>

              <textarea
                value={inputs[key].value}
                onChange={(event) => updateInputValue(key, event.target.value)}
                disabled={!isEnabled}
                rows={8}
                placeholder="Enter 1 keyword or phrase per line"
                className="mt-4 w-full resize-y rounded-xl border border-zinc-200 bg-transparent p-3 text-base leading-[1.6] text-zinc-900 outline-none transition focus:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </article>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
          <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Output</h3>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {MATCH_TYPES.map((matchType) => (
              <label key={matchType.key} className="inline-flex items-center gap-2 text-base text-zinc-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-zinc-950"
                  checked={selectedMatchTypes.includes(matchType.key)}
                  onChange={() => toggleMatchType(matchType.key)}
                />
                {matchType.label}
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
          <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Combinations</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {allCombinations.map((combo) => (
              <label key={combo} className="inline-flex items-center gap-2 text-base text-zinc-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-zinc-950"
                  checked={activeCombinations.includes(combo)}
                  onChange={() => toggleCombination(combo)}
                />
                {combo.toUpperCase()}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={runConcatenation}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <WandSparkles className="h-5 w-5" aria-hidden="true" />
          Generate keywords
        </button>

        {errorMessage ? <p className="text-base text-red-700">{errorMessage}</p> : null}
      </div>

      <section className="relative rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Generated keywords</h3>
          <button
            type="button"
            onClick={copyOutput}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-800 transition-colors hover:bg-zinc-100"
            disabled={!output}
          >
            {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {confettiPieces.length > 0 ? (
          <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 overflow-visible" aria-hidden="true">
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
        <textarea
          readOnly
          value={output}
          rows={12}
          placeholder="Generated keywords will appear here..."
          onClick={copyOutput}
          title={output ? "Click to copy keywords" : "Generate keywords to copy"}
          className="mt-4 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-base leading-[1.6] text-zinc-900 outline-none cursor-copy"
        />
      </section>
    </div>
  );
}
