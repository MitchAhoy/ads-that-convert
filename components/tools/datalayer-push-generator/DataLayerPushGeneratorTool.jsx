"use client";

import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const CONFETTI_COLORS = ["#0f172a", "#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

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

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5">
      <section className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Event details</h2>
        <p className="mt-2 text-base text-zinc-700">Build a clean `dataLayer.push()` snippet for GTM event tracking.</p>

        <label className="mt-4 block text-base text-zinc-800">
          Event Name (required)
          <input
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="add_to_cart, view_content, purchase, sign_up"
            className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
          />
        </label>

        <div className="mt-4 space-y-3">
          {parameters.map((param) => (
            <div key={param.id} className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] md:items-center">
              <input
                type="text"
                value={param.name}
                onChange={(event) => updateParameter(param.id, { name: event.target.value })}
                placeholder="Parameter Name"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
              />

              <input
                type="text"
                value={param.isDynamic ? "{{ DYNAMIC }}" : param.value}
                onChange={(event) => updateParameter(param.id, { value: event.target.value })}
                disabled={param.isDynamic}
                placeholder="Parameter Value"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400 disabled:opacity-70"
              />

              <label className="inline-flex items-center gap-2 text-base text-zinc-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-zinc-950"
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
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 p-2 text-zinc-700 transition hover:bg-zinc-100"
                aria-label="Delete parameter"
              >
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addParameter}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          Add parameter
        </button>
      </section>

      <section className="relative rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Generated code</h2>
          <button
            type="button"
            onClick={copySnippet}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <button
          type="button"
          onClick={copySnippet}
          className="mt-4 block w-full cursor-copy overflow-x-auto rounded-xl bg-zinc-900 p-4 text-left"
          title="Click to copy snippet"
        >
          <code className="whitespace-pre font-mono text-sm leading-[1.6] text-zinc-100">{generatedCode}</code>
        </button>

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
      </section>
    </div>
  );
}
