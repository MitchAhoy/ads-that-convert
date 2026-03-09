"use client";

import { useMemo, useState } from "react";

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

  const resultTone = useMemo(() => {
    if (!result || result.error) return "bg-zinc-100 text-zinc-800";
    if (result.outcome === "positive") return "bg-green-100 text-green-900";
    if (result.outcome === "negative") return "bg-red-100 text-red-900";
    return "bg-amber-100 text-amber-900";
  }, [result]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
        <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.01em] text-zinc-950">Inputs</h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-base text-zinc-800">
            Control Visitors (A)
            <input
              type="number"
              min="0"
              value={form.controlVisitors}
              onChange={(event) => updateField("controlVisitors", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            Control Conversions (A)
            <input
              type="number"
              min="0"
              value={form.controlConversions}
              onChange={(event) => updateField("controlConversions", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            Variation Visitors (B)
            <input
              type="number"
              min="0"
              value={form.variationVisitors}
              onChange={(event) => updateField("variationVisitors", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>

          <label className="text-base text-zinc-800">
            Variation Conversions (B)
            <input
              type="number"
              min="0"
              value={form.variationConversions}
              onChange={(event) => updateField("variationConversions", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-base text-zinc-800">
            Test Type
            <select
              value={form.testType}
              onChange={(event) => updateField("testType", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            >
              <option value="one-sided">One-sided</option>
              <option value="two-sided">Two-sided</option>
            </select>
          </label>

          <label className="text-base text-zinc-800">
            Confidence Level
            <select
              value={form.confidenceLevel}
              onChange={(event) => updateField("confidenceLevel", event.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-base text-zinc-900 outline-none transition focus:border-zinc-400"
            >
              <option value="0.90">90%</option>
              <option value="0.95">95%</option>
              <option value="0.99">99%</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Calculate significance
        </button>
      </form>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <div className={`rounded-t-2xl px-5 py-4 ${resultTone}`}>
          <h2 className="text-xl font-semibold">Test results</h2>
        </div>

        <div className="p-5">
          {!submitted ? (
            <p className="text-base text-zinc-700">Run the calculator to see statistical significance, p-value, and test power.</p>
          ) : result?.error ? (
            <p className="text-base text-red-700">{result.error}</p>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-zinc-900">
                {result.isSignificant ? "Significant result" : "No significant difference"}
              </p>

              <p className="text-base leading-[1.6] text-zinc-700">
                Variant A: {formatPercent(result.controlRate)} conversion rate. Variant B: {formatPercent(result.variationRate)} conversion rate.{" "}
                {result.isSignificant
                  ? `At ${Math.round(result.confidenceLevel * 100)}% confidence, variant ${result.relativeDifference > 0 ? "B" : "A"} is likely to outperform.`
                  : `At ${Math.round(result.confidenceLevel * 100)}% confidence, the difference is not statistically significant.`}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-sm text-zinc-600">Relative Difference</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950">{result.relativeDifference.toFixed(2)}%</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-sm text-zinc-600">Statistical Power</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950">{(result.power * 100).toFixed(2)}%</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-sm text-zinc-600">p-value</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-950">{result.pValue.toFixed(4)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
