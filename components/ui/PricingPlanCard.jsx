import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPlanCard({
  title,
  price,
  cadence,
  description,
  ctaLabel,
  ctaHref,
  features,
  highlighted = false,
  className = "",
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm sm:p-8 ${
        highlighted
          ? "border-zinc-900 ring-1 ring-zinc-900"
          : "border-zinc-200"
      } ${className}`}
    >
      <h2 className="text-2xl font-semibold text-zinc-950 sm:text-3xl">{title}</h2>
      <p className="mt-3 text-base text-zinc-700 sm:min-h-[3.25rem]">{description}</p>

      <p className="mt-4 flex items-end text-zinc-950 sm:min-h-[3.75rem]">
        <span className="text-4xl font-semibold tracking-tight sm:text-5xl">{price}</span>
        {cadence ? <span className="ml-2 text-base text-zinc-600">/{cadence}</span> : null}
      </p>

      <Link
        href={ctaHref}
        className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 text-base font-medium transition-colors ${
          highlighted
            ? "bg-zinc-950 text-white hover:bg-zinc-800"
            : "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
        }`}
      >
        {ctaLabel}
      </Link>

      <ul className="mt-6 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-base text-zinc-700">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-zinc-950" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
