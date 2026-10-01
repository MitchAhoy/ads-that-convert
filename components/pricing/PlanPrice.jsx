// Serif headline price with its cadence ("/mo", or "one-time") in fine print.
export default function PlanPrice({ price, cadence, className = "" }) {
  return (
    <p className={`flex items-baseline gap-2 text-ink ${className}`}>
      <span className="font-display text-5xl tabular-nums">{price}</span>
      {cadence ? (
        <span className="text-base text-fine">{cadence === "one-time" ? cadence : `/${cadence}`}</span>
      ) : null}
    </p>
  );
}
