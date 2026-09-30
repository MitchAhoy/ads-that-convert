import Image from "next/image";

const MITCH_AVATAR = "/team/mitch.jpeg";

const messages = [
  {
    name: "Sarah",
    time: "9:12 AM",
    text: "Trial sign-ups jumped this morning. Did something change?",
  },
  {
    name: "Mitch",
    time: "9:14 AM",
    text: "Yes, I moved budget into the competitor campaign yesterday. I'll check trial-to-paid on Friday and report back here.",
  },
];

const changes = [
  { text: "Budget moved to Competitor campaign", when: "Yesterday" },
  { text: "Added 14 negative keywords", when: "Tue" },
  { text: "New ad copy test on Trial campaign", when: "Mon" },
  { text: "Paid-signup conversion value updated", when: "Mon" },
];

// Generic client avatar (pastel silhouette), drawn inline so it stays crisp at any size.
function ClientAvatar({ className = "" }) {
  return (
    <span className={`block shrink-0 overflow-hidden bg-white ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <circle cx="50" cy="33" r="22" className="fill-(--pastel-periwinkle)" />
        <path d="M8 96c0-22 19-37 42-37s42 15 42 37z" className="fill-(--pastel-periwinkle)" />
      </svg>
    </span>
  );
}

function MitchAvatar({ className = "", size = 40 }) {
  return (
    <Image
      src={MITCH_AVATAR}
      alt=""
      width={size}
      height={size}
      className={`block shrink-0 object-cover ${className}`}
    />
  );
}

export default function SlackChangeHistoryIllustration() {
  return (
    <div
      className="grain relative h-[450px] overflow-hidden rounded-3xl leading-normal"
      style={{
        background:
          "radial-gradient(ellipse 30% 40% at 85% 70%, var(--pastel-butter) 0%, transparent 60%), radial-gradient(ellipse 65% 55% at 65% 10%, var(--pastel-ice) 0%, transparent 60%), radial-gradient(ellipse 55% 75% at 10% 80%, var(--pastel-blush) 0%, transparent 55%), radial-gradient(ellipse 55% 110% at 100% 55%, rgb(255 255 255 / 0.16) 0%, transparent 75%), linear-gradient(95deg, var(--pastel-periwinkle) 0%, var(--pastel-lavender) 60%, var(--pastel-blush) 100%)",
      }}
      role="img"
      aria-label="Slack channel where Mitch answers a client directly, above a Google Ads change history showing every change made by Mitch"
    >
      <div className="absolute top-9 left-8 z-3 w-[362px] max-w-[calc(100%-64px)] overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.1)]">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-bold text-ink"># acme-google-ads</span>
          <span className="flex items-center">
            <MitchAvatar size={48} className="h-6 w-6 rounded-[7px] border-2 border-white" />
            <ClientAvatar className="-ml-1.5 h-6 w-6 rounded-[7px] border-2 border-white" />
            <span className="ml-1.5 text-xs text-muted">2</span>
          </span>
        </div>

        <div className="flex flex-col gap-3.5 px-4 pt-3.5 pb-4">
          {messages.map((message) => (
            <div key={message.name} className="flex gap-2.5">
              {message.name === "Mitch" ? (
                <MitchAvatar size={68} className="h-8.5 w-8.5 rounded-lg" />
              ) : (
                <ClientAvatar className="h-8.5 w-8.5 rounded-lg" />
              )}
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-ink">{message.name}</span>
                  <span className="text-[11px] text-muted">{message.time}</span>
                </div>
                <p className="text-sm leading-[1.45] text-ink">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-8 bottom-9 z-2 w-[368px] max-w-[calc(100%-64px)] rounded-2xl border border-border bg-white px-[18px] pt-4 pb-2 shadow-[0_4px_8px_rgba(26,26,24,0.06),0_20px_40px_rgba(26,26,24,0.12)]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Change history</span>
          <span className="rounded-full bg-surface px-2.5 py-[3px] text-xs text-body">Last 7 days</span>
        </div>
        <p className="mb-1.5 text-xs text-muted">Changes made by: Mitch only</p>
        {changes.map((change) => (
          <div key={change.text} className="flex items-center gap-2.5 border-t border-surface py-[9px]">
            <MitchAvatar size={44} className="h-5.5 w-5.5 rounded-full" />
            <span className="min-w-0 flex-1 text-[12.5px] text-ink">{change.text}</span>
            <span className="text-[11px] whitespace-nowrap text-muted">{change.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
