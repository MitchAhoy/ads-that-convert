"use client";

import { useMemo, useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";

const labelClass = "block text-sm font-medium text-ink";

const fieldClass =
  "mt-2 block w-full rounded-xl border border-border bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted outline-none transition-colors focus:border-ink focus:ring-1 focus:ring-ink";

function normalCdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) prob = 1 - prob;
  return prob;
}

function inverseNormalCdf(p) {
  const a1 = -39.6968302866538;
  const a2 = 220.946098424521;
  const a3 = -275.928510446969;
  const a4 = 138.357751867269;
  const a5 = -30.6647980661472;
  const a6 = 2.50662827745924;

  const b1 = -54.4760987982241;
  const b2 = 161.585836858041;
  const b3 = -155.698979859887;
  const b4 = 66.8013118877197;
  const b5 = -13.2806815528857;

  const c1 = -0.00778489400243029;
  const c2 = -0.322396458041136;
  const c3 = -2.40075827716184;
  const c4 = -2.54973253934373;
  const c5 = 4.37466414146497;
  const c6 = 2.93816398269878;

  const d1 = 0.00778469570904146;
  const d2 = 0.32246712907004;
  const d3 = 2.445134137143;
  const d4 = 3.75440866190742;

  const q = p - 0.5;

  if (Math.abs(q) <= 0.425) {
    const r = 0.180625 - q * q;
    return (
      (q * (((((a6 * r + a5) * r + a4) * r + a3) * r + a2) * r + a1)) /
      (((((b5 * r + b4) * r + b3) * r + b2) * r + b1) * r + 1)
    );
  }

  let r = q < 0 ? p : 1 - p;
  r = Math.sqrt(-Math.log(r));

  if (r <= 5) {
    const rc = r - 1.6;
    return (
      (q < 0 ? -1 : 1) *
      (((((c6 * rc + c5) * rc + c4) * rc + c3) * rc + c2) * rc + c1) /
      ((((d4 * rc + d3) * rc + d2) * rc + d1) * rc + 1)
    );
  }

  const rc = r - 5;
  return (
    (q < 0 ? -1 : 1) *
    (((((c6 * rc + c5) * rc + c4) * rc + c3) * rc + c2) * rc + c1) /
    ((((d4 * rc + d3) * rc + d2) * rc + d1) * rc + 1)
  );
}

function getCriticalValue(confidenceLevel, testType) {
  const alphaLevel = 1 - confidenceLevel;
  if (testType === "two-sided") {
    return inverseNormalCdf(1 - alphaLevel / 2);
  }
  return inverseNormalCdf(1 - alphaLevel);
}

function formatPercent(value, digits = 2) {
  return `${(value * 100).toFixed(digits)}%`;
}

export default function ABTestingSignificanceCalculatorTool() {
  const [form, setForm] = useState({
    controlVisitors: "",
    controlConversions: "",
    variationVisitors: "",
    variationConversions: "",
    testType: "one-sided",
    confidenceLevel: "0.95",
  });

  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const controlVisitors = Number(form.controlVisitors);
    const controlConversions = Number(form.controlConversions);
    const variationVisitors = Number(form.variationVisitors);
    const variationConversions = Number(form.variationConversions);
    const confidenceLevel = Number(form.confidenceLevel);

    if (!submitted) return null;

    if (
      [controlVisitors, controlConversions, variationVisitors, variationConversions].some(
        (value) => Number.isNaN(value) || value < 0,
      )
    ) {
      return { error: "Please enter non-negative numbers for all fields." };
    }

    if (controlVisitors === 0 || variationVisitors === 0) {
      return { error: "Visitors must be greater than 0 for both variants." };
    }

    if (controlConversions > controlVisitors || variationConversions > variationVisitors) {
      return { error: "Conversions cannot exceed visitors." };
    }

    const controlRate = controlConversions / controlVisitors;
    const variationRate = variationConversions / variationVisitors;

    const pooledStandardError = Math.sqrt(
      (controlRate * (1 - controlRate)) / controlVisitors +
        (variationRate * (1 - variationRate)) / variationVisitors,
    );

    if (pooledStandardError === 0) {
      return { error: "Not enough variation in data to compute significance." };
    }

    const zScore = Math.abs(variationRate - controlRate) / pooledStandardError;
    const pValue =
      form.testType === "two-sided"
        ? (1 - normalCdf(zScore)) * 2
        : 1 - normalCdf(zScore);

    const criticalValue = getCriticalValue(confidenceLevel, form.testType);

    const effectSizeDenominator = Math.sqrt(
      (controlRate * (1 - controlRate) + variationRate * (1 - variationRate)) / 2,
    );
    const effectSize = effectSizeDenominator === 0 ? 0 : Math.abs(variationRate - controlRate) / effectSizeDenominator;

    const power =
      1 -
      normalCdf(
        criticalValue - effectSize * Math.sqrt((controlVisitors * variationVisitors) / (controlVisitors + variationVisitors)),
      );

    const relativeDifference =
      controlRate === 0 ? 0 : ((variationRate - controlRate) / controlRate) * 100;

    const isSignificant = pValue < 1 - confidenceLevel;
    const outcome = isSignificant
      ? relativeDifference > 0
        ? "positive"
        : "negative"
      : "neutral";

    return {
      controlRate,
      variationRate,
      pValue,
      power,
      confidenceLevel,
      relativeDifference,
      isSignificant,
      outcome,
    };
  }, [form, submitted]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  const statusDot = !result || result.error
    ? "bg-muted"
    : result.outcome === "positive"
      ? "bg-[#22a55b]"
      : result.outcome === "negative"
        ? "bg-ink"
        : "bg-muted";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <form onSubmit={handleSubmit} className="min-w-0 lg:pt-7">
        <h2 className="text-xl font-bold text-ink">Inputs</h2>

        <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
          <label className={labelClass}>
            Control Visitors (A)
            <input
              type="number"
              min="0"
              value={form.controlVisitors}
              onChange={(event) => updateField("controlVisitors", event.target.value)}
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Control Conversions (A)
            <input
              type="number"
              min="0"
              value={form.controlConversions}
              onChange={(event) => updateField("controlConversions", event.target.value)}
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Variation Visitors (B)
            <input
              type="number"
              min="0"
              value={form.variationVisitors}
              onChange={(event) => updateField("variationVisitors", event.target.value)}
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Variation Conversions (B)
            <input
              type="number"
              min="0"
              value={form.variationConversions}
              onChange={(event) => updateField("variationConversions", event.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
          <label className={labelClass}>
            Test Type
            <span className="relative mt-2 block">
              <select
                value={form.testType}
                onChange={(event) => updateField("testType", event.target.value)}
                className={`${fieldClass} mt-0! appearance-none pr-10`}
              >
                <option value="one-sided">One-sided</option>
                <option value="two-sided">Two-sided</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.75}
                className="pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 text-fine"
              />
            </span>
          </label>

          <label className={labelClass}>
            Confidence Level
            <span className="relative mt-2 block">
              <select
                value={form.confidenceLevel}
                onChange={(event) => updateField("confidenceLevel", event.target.value)}
                className={`${fieldClass} mt-0! appearance-none pr-10`}
              >
                <option value="0.90">90%</option>
                <option value="0.95">95%</option>
                <option value="0.99">99%</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.75}
                className="pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 text-fine"
              />
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2d2d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2"
        >
          Calculate significance
        </button>
      </form>

      <section aria-live="polite" className="flex min-w-0 flex-col rounded-2xl bg-surface p-5 sm:p-7">
        <h2 className="text-xl font-bold text-ink">Test results</h2>

        <div className="mt-5 flex-1 border-t border-border pt-5">
          {!submitted ? (
            <p className="text-base leading-[1.6] text-fine">Run the calculator to see statistical significance, p-value, and test power.</p>
          ) : result?.error ? (
            <p className="flex items-start gap-2.5 text-base leading-[1.6] text-ink">
              <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-body" />
              {result.error}
            </p>
          ) : (
            <div>
              <p className="flex items-center gap-2.5 text-lg font-semibold text-ink">
                <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDot}`} />
                {result.isSignificant ? "Significant result" : "No significant difference"}
              </p>

              <p className="mt-3 text-base leading-[1.6] text-body">
                Variant A: {formatPercent(result.controlRate)} conversion rate. Variant B: {formatPercent(result.variationRate)} conversion rate.{" "}
                {result.isSignificant
                  ? `At ${Math.round(result.confidenceLevel * 100)}% confidence, variant ${result.relativeDifference > 0 ? "B" : "A"} is likely to outperform.`
                  : `At ${Math.round(result.confidenceLevel * 100)}% confidence, the difference is not statistically significant.`}
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-white px-5 pt-5 pb-5 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] sm:px-6">
                <p className="text-sm font-medium leading-[1.5] text-muted">Relative Difference</p>
                <p className="mt-2 font-display text-5xl tabular-nums text-ink sm:text-6xl">{result.relativeDifference.toFixed(2)}%</p>

                <dl className="mt-5 grid grid-cols-2 border-t border-border pt-4">
                  <div className="pr-4">
                    <dt className="text-sm font-medium leading-[1.5] text-muted">Statistical Power</dt>
                    <dd className="mt-1 text-xl font-bold tabular-nums text-ink">{(result.power * 100).toFixed(2)}%</dd>
                  </div>

                  <div className="border-l border-border pl-4">
                    <dt className="text-sm font-medium leading-[1.5] text-muted">p-value</dt>
                    <dd className="mt-1 text-xl font-bold tabular-nums text-ink">{result.pValue.toFixed(4)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
