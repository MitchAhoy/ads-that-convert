"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

// Ink plus the site's pastel family (DESIGN.md §3.2), so the copy burst stays on-palette.
const CONFETTI_COLORS = [
  "var(--color-ink)",
  "var(--pastel-lavender)",
  "var(--pastel-periwinkle)",
  "var(--pastel-ice)",
  "var(--pastel-blush)",
  "var(--pastel-butter)",
];

const LABEL_CLASS = "text-sm font-medium text-ink";
const INPUT_CLASS =
  "mt-2 block w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted outline-none transition focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-0";
const OUTPUT_CLASS =
  "group mt-2 flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-white px-3.5 py-3 text-left transition hover:border-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60";

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
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="pb-8 lg:border-r lg:border-border lg:pr-8 lg:pb-0">
        <h2 className="text-xl font-bold text-ink">UTM parameters</h2>
        <p className="mt-2 text-base leading-[1.6] text-body">Source and medium are required for clean campaign attribution.</p>

        <div className="mt-6 grid grid-cols-1 gap-5">
          <label className="block">
            <span className={LABEL_CLASS}>Base URL</span>
            <input
              type="text"
              value={fields.baseUrl}
              onChange={(event) => updateField("baseUrl", event.target.value)}
              placeholder="https://www.example.com/pricing"
              className={INPUT_CLASS}
            />
          </label>

          <label className="block">
            <span className={LABEL_CLASS}>UTM Source (required)</span>
            <input
              type="text"
              value={fields.utmSource}
              onChange={(event) => updateField("utmSource", event.target.value)}
              placeholder="google"
              className={INPUT_CLASS}
            />
          </label>

          <label className="block">
            <span className={LABEL_CLASS}>UTM Medium (required)</span>
            <input
              type="text"
              value={fields.utmMedium}
              onChange={(event) => updateField("utmMedium", event.target.value)}
              placeholder="cpc"
              className={INPUT_CLASS}
            />
          </label>

          <label className="block">
            <span className={LABEL_CLASS}>UTM Campaign</span>
            <input
              type="text"
              value={fields.utmCampaign}
              onChange={(event) => updateField("utmCampaign", event.target.value)}
              placeholder="spring_launch"
              className={INPUT_CLASS}
            />
          </label>

          <label className="block">
            <span className={LABEL_CLASS}>UTM Content</span>
            <input
              type="text"
              value={fields.utmContent}
              onChange={(event) => updateField("utmContent", event.target.value)}
              placeholder="headline_a"
              className={INPUT_CLASS}
            />
          </label>

          <label className="block">
            <span className={LABEL_CLASS}>UTM Term</span>
            <input
              type="text"
              value={fields.utmTerm}
              onChange={(event) => updateField("utmTerm", event.target.value)}
              placeholder="saas_google_ads"
              className={INPUT_CLASS}
            />
          </label>
        </div>
      </section>

      <section className="relative border-t border-border pt-8 lg:border-t-0 lg:pt-0 lg:pl-8">
        <h2 className="text-xl font-bold text-ink">Generated output</h2>
        <p className="mt-2 text-base leading-[1.6] text-body">Click either output field to copy.</p>

        <div className="mt-6 space-y-5 rounded-2xl bg-surface p-4 sm:p-5">
          <div>
            <p className={LABEL_CLASS}>Full URL</p>
            <button
              type="button"
              onClick={() => copyValue(fullUrl, "fullUrl")}
              className={OUTPUT_CLASS}
              title={fullUrl ? "Click to copy full URL" : "Add values to generate URL"}
            >
              <span className={`min-w-0 wrap-anywhere font-mono text-base leading-[1.55] ${fullUrl ? "text-ink" : "text-muted"}`}>
                {fullUrl || "Your full tagged URL will appear here..."}
              </span>
              <span className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition group-hover:bg-surface">
                {copiedField === "fullUrl" ? <Check className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" /> : <Copy className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />}
              </span>
            </button>
          </div>

          <div>
            <p className={LABEL_CLASS}>Final URL Suffix</p>
            <button
              type="button"
              onClick={() => copyValue(urlSuffix, "urlSuffix")}
              className={OUTPUT_CLASS}
              title={urlSuffix ? "Click to copy suffix" : "Add values to generate suffix"}
            >
              <span className={`min-w-0 wrap-anywhere font-mono text-base leading-[1.55] ${urlSuffix ? "text-ink" : "text-muted"}`}>
                {urlSuffix || "Your query-string suffix will appear here..."}
              </span>
              <span className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition group-hover:bg-surface">
                {copiedField === "urlSuffix" ? <Check className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" /> : <Copy className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />}
              </span>
            </button>
          </div>

          {(!normalized.utmSource || !normalized.utmMedium) ? (
            <p className="text-sm leading-[1.5] text-fine">Tip: add both <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink">utm_source</code> and <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink">utm_medium</code> to keep attribution complete.</p>
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
