import { Check } from "lucide-react";

export default function PlanFeatureList({ features, className = "" }) {
  return (
    <ul className={`grid gap-3.5 ${className}`}>
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-copy leading-[1.5] text-body">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
