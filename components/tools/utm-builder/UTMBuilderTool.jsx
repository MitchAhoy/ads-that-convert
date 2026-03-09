"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

const CONFETTI_COLORS = ["#0f172a", "#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

const INITIAL_FIELDS = {
  baseUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
};

function normalizeValue(value) {
  return value.trim();
}

function buildSuffix(fields) {
  const params = new URLSearchParams();

  if (fields.utmSource) params.append("utm_source", fields.utmSource);
  if (fields.utmMedium) params.append("utm_medium", fields.utmMedium);
  if (fields.utmCampaign) params.append("utm_campaign", fields.utmCampaign);
  if (fields.utmContent) params.append("utm_content", fields.utmContent);
  if (fields.utmTerm) params.append("utm_term", fields.utmTerm);

  const query = params.toString();
  return query ? `?${query}` : "";
}

function buildFullUrl(baseUrl, suffix) {
  if (!baseUrl) return "";
  if (!suffix) return baseUrl;

  const cleanSuffix = suffix.replace(/^\?/, "");
  if (!cleanSuffix) return baseUrl;

  try {
    const parsed = new URL(baseUrl);
    const existing = new URLSearchParams(parsed.search);
    const incoming = new URLSearchParams(cleanSuffix);

    incoming.forEach((value, key) => {
      existing.set(key, value);
    });

    parsed.search = existing.toString();
    return parsed.toString();
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}${cleanSuffix}`;
  }
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

export default function UTMBuilderTool() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [copiedField, setCopiedField] = useState("");
  const [confettiPieces, setConfettiPieces] = useState([]);

  const normalized = useMemo(
    () => ({
      baseUrl: normalizeValue(fields.baseUrl),
      utmSource: normalizeValue(fields.utmSource),
      utmMedium: normalizeValue(fields.utmMedium),
      utmCampaign: normalizeValue(fields.utmCampaign),
      utmContent: normalizeValue(fields.utmContent),
      utmTerm: normalizeValue(fields.utmTerm),
    }),
    [fields],
  );

  const urlSuffix = useMemo(() => buildSuffix(normalized), [normalized]);
  const fullUrl = useMemo(
    () => buildFullUrl(normalized.baseUrl, urlSuffix),
    [normalized.baseUrl, urlSuffix],
  );

  function updateField(key, value) {
    setFields((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyValue(value, fieldName) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldName);
      setConfettiPieces(buildConfettiBurst());
      setTimeout(() => setCopiedField(""), 1800);
      setTimeout(() => setConfettiPieces([]), 950);
    } catch {
      setCopiedField("");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5">
      <section className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">UTM parameters</h2>
        <p className="mt-2 text-base text-zinc-700">Source and medium are required for clean campaign attribution.</p>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <label className="text-base text-zinc-800">
            Base URL
            <input
              type="text"
              value={fields.baseUrl}
              onChange={(event) => updateField("baseUrl", event.target.value)}
              placeholder="https://www.example.com/pricing"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            UTM Source (required)
            <input
              type="text"
              value={fields.utmSource}
              onChange={(event) => updateField("utmSource", event.target.value)}
              placeholder="google"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            UTM Medium (required)
            <input
              type="text"
              value={fields.utmMedium}
              onChange={(event) => updateField("utmMedium", event.target.value)}
              placeholder="cpc"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            UTM Campaign
            <input
              type="text"
              value={fields.utmCampaign}
              onChange={(event) => updateField("utmCampaign", event.target.value)}
              placeholder="spring_launch"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            UTM Content
            <input
              type="text"
              value={fields.utmContent}
              onChange={(event) => updateField("utmContent", event.target.value)}
              placeholder="headline_a"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            UTM Term
            <input
              type="text"
              value={fields.utmTerm}
              onChange={(event) => updateField("utmTerm", event.target.value)}
              placeholder="saas_google_ads"
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>
        </div>
      </section>

      <section className="relative rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Generated output</h2>
        <p className="mt-2 text-base text-zinc-700">Click either output field to copy.</p>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-base font-medium text-zinc-900">Full URL</p>
            <button
              type="button"
              onClick={() => copyValue(fullUrl, "fullUrl")}
              className="mt-1 flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-left text-base text-zinc-900 transition hover:bg-zinc-100"
              title={fullUrl ? "Click to copy full URL" : "Add values to generate URL"}
            >
              <span className="min-w-0 truncate">{fullUrl || "Your full tagged URL will appear here..."}</span>
              {copiedField === "fullUrl" ? <Check className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Copy className="h-5 w-5 shrink-0" aria-hidden="true" />}
            </button>
          </div>

          <div>
            <p className="text-base font-medium text-zinc-900">Final URL Suffix</p>
            <button
              type="button"
              onClick={() => copyValue(urlSuffix, "urlSuffix")}
              className="mt-1 flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-left text-base text-zinc-900 transition hover:bg-zinc-100"
              title={urlSuffix ? "Click to copy suffix" : "Add values to generate suffix"}
            >
              <span className="min-w-0 truncate">{urlSuffix || "Your query-string suffix will appear here..."}</span>
              {copiedField === "urlSuffix" ? <Check className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Copy className="h-5 w-5 shrink-0" aria-hidden="true" />}
            </button>
          </div>

          {(!normalized.utmSource || !normalized.utmMedium) ? (
            <p className="text-base text-zinc-700">Tip: add both `utm_source` and `utm_medium` to keep attribution complete.</p>
          ) : null}
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
      </section>
    </div>
  );
}
