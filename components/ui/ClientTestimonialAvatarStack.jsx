import Image from "next/image";

function buildExcerpt(text, maxLength = 72) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}...`;
}

export default function ClientTestimonialAvatarStack({
  clients = [],
  trustText = "",
  ctaText = "View client results",
  ctaHref = "/results",
  maxVisible = 7,
  className = "",
}) {
  const visibleClients = clients.slice(0, maxVisible);

  if (visibleClients.length === 0) {
    return null;
  }

  return (
    <div className={`flex shrink-0 flex-col items-start gap-2 ${className}`}>
      <ul className="flex items-center">
        {visibleClients.map((client) => {
          const excerpt = client.highlight || buildExcerpt(client.quote);

          return (
            <li key={client.name} className="group relative first:ml-0 -ml-3">
              <button
                type="button"
                className="relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
                aria-label={`${client.name}: ${excerpt}`}
              >
                <Image
                  src={client.avatarSrc}
                  alt={client.name}
                  width={56}
                  height={56}
                  className="h-11 w-11 rounded-full border-2 border-zinc-100 bg-zinc-200 object-cover sm:h-12 sm:w-12"
                />
              </button>

              <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden w-56 -translate-x-1/2 -translate-y-[calc(100%+0.65rem)] rounded-xl bg-zinc-900 px-3 py-2 opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:block">
                <p className="text-base leading-[1.5] text-zinc-50">{`"${excerpt}"`}</p>
                <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-zinc-900" />
              </div>
            </li>
          );
        })}
      </ul>

      {trustText ? (
        <p className="text-sm leading-[1.5] text-zinc-700">{trustText}</p>
      ) : null}

      {ctaText ? (
        <a
          href={ctaHref}
          className="inline-block whitespace-nowrap self-center text-center text-sm leading-[1.5] text-[#0c2237] underline underline-offset-4"
        >
          {ctaText}
        </a>
      ) : null}
    </div>
  );
}
