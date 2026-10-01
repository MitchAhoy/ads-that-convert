"use client";

import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const CONFETTI_COLORS = [
  "var(--color-ink)",
  "var(--pastel-lavender)",
  "var(--pastel-periwinkle)",
  "var(--pastel-ice)",
  "var(--pastel-blush)",
  "var(--pastel-mint)",
];

function createParameter(name = "", value = "", isDynamic = false) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    value,
    isDynamic,
  };
}

function buildConfettiBurst() {
  return Array.from({ length: 28 }).map((_, index) => {
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
}

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (!Number.isNaN(Number(trimmed))) return Number(trimmed);
  if (trimmed.toLowerCase() === "true") return true;
  if (trimmed.toLowerCase() === "false") return false;

  return trimmed;
}

function renderValue(value, isDynamic = false) {
  if (isDynamic) return "{{ DYNAMIC }}";
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  return JSON.stringify(value);
}

function buildSnippet(eventName, parameters) {
  const safeEventName = eventName.trim();
  const lines = [];

  lines.push("<script>");
  lines.push("window.dataLayer = window.dataLayer || [];");
  lines.push("window.dataLayer.push({");
  lines.push(`  \"event\": ${JSON.stringify(safeEventName)},`);

  const activeParams = parameters.filter((param) => param.name.trim() !== "");

  activeParams.forEach((param, index) => {
    const key = JSON.stringify(param.name.trim());
    const value = param.isDynamic ? "{{ DYNAMIC }}" : renderValue(parseValue(param.value));
    const isLast = index === activeParams.length - 1;
    lines.push(`  ${key}: ${value}${isLast ? "" : ","}`);
  });

  lines.push("});");
  lines.push("</script>");

  return lines.join("\n");
}

export default function DataLayerPushGeneratorTool() {
  const [eventName, setEventName] = useState("");
  const [parameters, setParameters] = useState([
    createParameter("value", "{{ DYNAMIC }}", true),
    createParameter(),
  ]);
  const [copied, setCopied] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const generatedCode = useMemo(
    () => buildSnippet(eventName, parameters),
    [eventName, parameters],
  );

  function addParameter() {
    setParameters((current) => [...current, createParameter()]);
  }

  function removeParameter(id) {
    setParameters((current) => current.filter((param) => param.id !== id));
  }

  function updateParameter(id, updates) {
    setParameters((current) =>
      current.map((param) => {
        if (param.id !== id) return param;
        return {
          ...param,
          ...updates,
        };
      }),
    );
  }

  async function copySnippet() {
    if (!generatedCode) return;

    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setConfettiPieces(buildConfettiBurst());
      setTimeout(() => setCopied(false), 1800);
      setTimeout(() => setConfettiPieces([]), 950);
    } catch {
      setCopied(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/15 disabled:cursor-not-allowed disabled:bg-surface disabled:text-fine";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-0">
      <section className="lg:pr-8">
        <h2 className="text-xl font-bold text-ink lg:flex lg:min-h-11 lg:items-center">Event details</h2>
        <p className="mt-2 text-base leading-[1.5] text-body">Build a clean <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink">dataLayer.push()</code> snippet for GTM event tracking.</p>

        <label className="mt-6 block text-sm font-medium text-ink">
          Event Name (required)
          <input
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="add_to_cart, view_content, purchase, sign_up"
            className={`mt-2 ${inputClass}`}
          />
        </label>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {parameters.map((param) => (
            <li
              key={param.id}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-2.5 gap-y-2 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
            >
              <input
                type="text"
                value={param.name}
                onChange={(event) => updateParameter(param.id, { name: event.target.value })}
                placeholder="Parameter Name"
                className={inputClass}
              />

              <input
                type="text"
                value={param.isDynamic ? "{{ DYNAMIC }}" : param.value}
                onChange={(event) => updateParameter(param.id, { value: event.target.value })}
                disabled={param.isDynamic}
                placeholder="Parameter Value"
                className={inputClass}
              />

              <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-body sm:pl-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded accent-(--color-ink)"
                  checked={param.isDynamic}
                  onChange={(event) =>
                    updateParameter(param.id, {
                      isDynamic: event.target.checked,
                      value: event.target.checked ? "{{ DYNAMIC }}" : "",
                    })
                  }
                />
                Dynamic
              </label>

              <button
                type="button"
                onClick={() => removeParameter(param.id)}
                className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-ink transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:outline-none"
                aria-label="Delete parameter"
              >
                <Trash2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addParameter}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-ink ring-1 ring-ink transition-colors ring-inset hover:bg-surface focus-visible:ring-2 focus-visible:outline-none"
        >
          <Plus className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          Add parameter
        </button>
      </section>

      <section className="relative border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-ink">Generated code</h2>
          <button
            type="button"
            onClick={copySnippet}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#2d2d2a] focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {copied ? (
              <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]">
          <div className="flex h-8.5 items-center border-b border-border bg-surface px-3.5" aria-hidden="true">
            <div className="flex gap-1.75">
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#d8d5ce]" />
            </div>
          </div>

          <button
            type="button"
            onClick={copySnippet}
            className="block w-full cursor-copy overflow-x-auto px-5 pt-4 pb-5 text-left transition-colors hover:bg-surface/40 focus-visible:bg-surface/40 focus-visible:outline-none"
            title="Click to copy snippet"
          >
            <code className="font-mono text-sm leading-[1.7] whitespace-pre text-ink">{generatedCode}</code>
          </button>
        </div>

        {confettiPieces.length > 0 ? (
          <div className="pointer-events-none absolute top-0 right-4 h-16 w-16 overflow-visible" aria-hidden="true">
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
      </section>
    </div>
  );
}
