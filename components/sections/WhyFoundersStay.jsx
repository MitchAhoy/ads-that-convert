import Image from "next/image";
import { UserRound } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Gradient frames reuse the illustration palette; they're decorative only.
const frames = {
  account:
    "radial-gradient(ellipse 60% 70% at 0% 100%, #e7a6dc 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 70% 0%, #f2c4e2 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 100% 60%, #b8b2f0 0%, transparent 60%), linear-gradient(135deg, #b9b6f2 0%, #e9c3e6 50%, #cbb4ee 100%)",
  tracking:
    "radial-gradient(ellipse 50% 80% at 0% 40%, #7cc0ef 0%, transparent 60%), radial-gradient(ellipse 45% 60% at 60% 10%, #f4f7fd 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 100% 70%, #a8b4f2 0%, transparent 60%), linear-gradient(135deg, #8cc4f2 0%, #d6e4f8 50%, #adb8f3 100%)",
  contract:
    "radial-gradient(ellipse 60% 60% at 0% 100%, #c8ec7a 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 15% 0%, #eef5f2 0%, transparent 65%), radial-gradient(ellipse 70% 90% at 100% 40%, #5ccfd0 0%, transparent 65%), linear-gradient(135deg, #9fdcd6 0%, #9ae3cf 50%, #6fd3cf 100%)",
  press:
    "radial-gradient(ellipse 50% 60% at 0% 20%, #f5a55a 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 100% 0%, #ee86c2 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 50% 100%, #fbe7a0 0%, transparent 65%), linear-gradient(135deg, #f7c46f 0%, #f7d77f 50%, #f4c562 100%)",
  reference:
    "radial-gradient(ellipse 60% 70% at 0% 100%, #f3a9c1 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 0%, #f8d27e 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 60% 60%, #fbe6c4 0%, transparent 65%), linear-gradient(135deg, #f6d7a6 0%, #f8d6b8 50%, #f3c49a 100%)",
};

const miniCard =
  "h-full rounded-[14px] bg-white leading-[1.4] shadow-[0_1px_2px_rgba(26,26,24,0.06),0_4px_14px_rgba(26,26,24,0.07)]";

function Row({ label, value, first = false, children }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2.5 ${first ? "" : "border-t border-surface"}`}>
      {children ?? <span className="text-sm text-muted">{label}</span>}
      <span className="text-sm font-medium whitespace-nowrap text-ink">{value}</span>
    </div>
  );
}

function YouAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff1fb]">
      <UserRound aria-hidden="true" className="h-4 w-4 text-[#3aa7e0]" strokeWidth={2.25} />
    </span>
  );
}

function AccessMini() {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 -rotate-2 rounded-[14px] bg-white/60" />
      <div className={`${miniCard} relative px-5 pt-4.5 pb-2`}>
        <div className="flex items-baseline justify-between gap-3 pb-2">
          <span className="text-base font-bold text-ink">Access and security</span>
          <span className="text-xs text-muted">Google Ads</span>
        </div>
        <Row value="Owner">
          <span className="flex items-center gap-2.5 text-sm text-ink">
            <YouAvatar />
            You
          </span>
        </Row>
        <Row value="Standard access">
          <span className="flex items-center gap-2.5 text-sm text-ink">
            <Image src="/team/mitch.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
            Mitch
          </span>
        </Row>
        <Row label="Billing" value="Your card" />
      </div>
    </div>
  );
}

function TrackingMini() {
  const str = "text-[#3f9a5c]";
  return (
    <div className={`${miniCard} overflow-hidden`}>
      <div className="flex items-center gap-1.5 bg-surface/70 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-3 font-mono text-xs text-muted">checkout.js</span>
      </div>
      <pre className="overflow-hidden px-5 py-4 font-mono text-xs leading-[1.9] text-ink sm:text-sm sm:leading-[1.8]">
        <span className="text-[#b061c9]">window</span>.dataLayer.push({"{"}
        {"\n  "}event: <span className={str}>&apos;subscription_paid&apos;</span>,
        {"\n  "}value: <span className="text-[#3b82d6]">49.00</span>,
        {"\n  "}plan: <span className={str}>&apos;pro_monthly&apos;</span>,
        {"\n  "}gclid: <span className={str}>&apos;Cj0KCQjw…&apos;</span>
        {"\n"}
        {"});"}
      </pre>
    </div>
  );
}

function AgreementMini() {
  return (
    <div className={`${miniCard} px-4.5 pt-4 pb-1.5`}>
      <span className="block pb-1.5 text-sm font-bold text-ink">Agreement</span>
      <Row label="Term" value="Month-to-month" first />
      <Row label="Lock-in" value="None" />
      <Row label="From" value="$1,500/mo" />
    </div>
  );
}

const pressLogos = [
  // Heights are tuned per logo so they read at a similar optical size.
  { src: "/press-logos/sej.webp", alt: "Search Engine Journal", width: 598, height: 124, className: "h-5" },
  { src: "/press-logos/ppc-hero.png", alt: "PPC Hero", width: 778, height: 117, className: "h-4" },
  { src: "/press-logos/optmyzr.webp", alt: "Optmyzr", width: 544, height: 96, className: "h-4" },
  { src: "/press-logos/ppc-chat.png", alt: "PPC Chat", width: 602, height: 199, className: "h-6" },
];

function PressMini() {
  return (
    <div className={`${miniCard} flex flex-col px-4.5 pt-4 pb-4`}>
      <span className="text-sm font-bold text-ink">Featured in</span>
      <div className="grid flex-1 grid-cols-2 content-center items-center gap-x-6 gap-y-5">
        {pressLogos.map((logo) => (
          <span key={logo.src} className="flex h-6 items-center">
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              className={`${logo.className} w-auto max-w-full object-contain object-left`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function ReferenceMini() {
  return (
    <div className={`${miniCard} flex flex-col px-4.5 pt-4 pb-4`}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold text-ink">Reference call</span>
        <span className="text-xs text-muted">15 min</span>
      </div>
      <div className="mt-3.5 flex items-center gap-3">
        <span className="flex shrink-0">
          <YouAvatar />
          <span className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-surface text-xs font-bold text-body">
            S
          </span>
        </span>
        <span className="text-xs text-body">You + a current client of mine</span>
      </div>
      <span className="mt-auto flex items-center gap-2 text-xs text-body">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22a55b]" />
        Intro sent
      </span>
    </div>
  );
}

const featured = [
  {
    title: "You own the account",
    description:
      "Campaigns run in your own Google Ads account, on your card. If we stop working together, everything stays with you.",
    frame: frames.account,
    Illustration: AccessMini,
  },
  {
    title: "Tracking built by hand",
    description:
      "I write the tracking myself, so paid sign-ups and their value flow back into Google Ads. The dataLayer and UTM tools on this site are ones I built.",
    frame: frames.tracking,
    Illustration: TrackingMini,
  },
];

const supporting = [
  {
    title: "No lock-in contracts",
    description: "Month-to-month, from $1,500.",
    frame: frames.contract,
    Illustration: AgreementMini,
  },
  {
    title: "Published in the PPC press",
    description: "Search Engine Journal, PPC Hero, Optmyzr and PPC Chat.",
    frame: frames.press,
    Illustration: PressMini,
  },
  {
    title: "References on request",
    description: "Talk to a current client before you sign.",
    frame: frames.reference,
    Illustration: ReferenceMini,
  },
];

function ReasonCard({ title, description, frame, Illustration, wide }) {
  return (
    <li
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] ${wide ? "lg:col-span-3" : "sm:max-lg:last:col-span-2 lg:col-span-2"}`}
    >
      <div
        className={`grain overflow-hidden rounded-[18px] ${wide ? "h-64 p-5 sm:h-72 sm:px-10 sm:pt-10 sm:pb-6" : "h-56 p-6"}`}
        style={{ background: frame }}
        aria-hidden="true"
      >
        <div className="relative z-10 h-full">
          <Illustration />
        </div>
      </div>
      <div className={`flex-1 ${wide ? "px-5 pt-6 pb-7" : "px-4 pt-5.5 pb-6"}`}>
        <h3 className={`${wide ? "text-2xl" : "text-xl"} font-bold text-ink`}>{title}</h3>
        <p className={`mt-2 ${wide ? "text-lg" : "text-base"} leading-[1.5] text-body text-pretty`}>{description}</p>
      </div>
    </li>
  );
}

export default function WhyFoundersStay() {
  return (
    <section aria-labelledby="why-founders-stay-title" className="py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 id="why-founders-stay-title" className="font-display text-h2 text-ink text-balance">
            Why founders hire me <span className="block text-muted">and why they stay</span>
          </h2>
          <p className="mt-4 text-lg leading-[1.5] text-body text-pretty">
            You keep control of your account, your data and your contract.
          </p>
          <div className="mt-8 flex justify-center">
            <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" />
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-6">
          {featured.map((item) => (
            <ReasonCard key={item.title} {...item} wide />
          ))}
          {supporting.map((item) => (
            <ReasonCard key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
