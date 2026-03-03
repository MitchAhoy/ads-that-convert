import Image from "next/image";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

const valueProps = [
  {
    text: "No junior handoffs: I manage your campaign from planning to profit",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.067c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 0 0-1.067 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 0 0-2.573-1.067c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 0 0 1.067-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065Z"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3.1"
          stroke="currentColor"
          strokeWidth="2.3"
        />
      </svg>
    ),
  },
  {
    text: "I’ll seamlessly integrate into your business (via Slack or email)",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10 2v2.5a3.5 3.5 0 0 0 7 0V2M14 22v-2.5a3.5 3.5 0 0 0-7 0V22M8.5 5h7M8.5 19h7"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7c0 2.2 2.2 3.4 5 5s5 2.8 5 5"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M17 7c0 2.2-2.2 3.4-5 5s-5 2.8-5 5"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Big agency performance, small agency speed",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 12a9 9 0 0 1 14.7-6.9M21 12a9 9 0 0 1-14.7 6.9"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M17.7 2.8v2.9h-2.9M6.3 21.2v-2.9h2.9"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-12 pt-8">
      <div className="grid grid-cols-[minmax(0,1fr)_500px] items-start gap-8">
        <div className="max-w-[610px] pt-4">
          <h1
            id="hero-title"
            className="font-serif !text-[2.1875rem] font-semibold leading-[1.15] tracking-tight text-black"
          >
            <span className="block whitespace-nowrap">SaaS Google Ads Agency Driving</span>
            <span className="block whitespace-nowrap">Growth for Ambitious Businesses</span>
          </h1>

          <p className="mt-5 text-lg leading-[1.6] text-[#16181b]">
            Convert clicks into SaaS customers with your new fully managed
            Google Ads service.
          </p>

          <ul className="mt-8 space-y-5 text-base leading-[1.6] text-[#16181b]">
            {valueProps.map((item) => (
              <li key={item.text} className="flex items-start gap-4">
                <span className="mt-1 shrink-0 text-[#111827]">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-8">
            <ScheduleCallButton href="#" />
            <a
              href="#"
              className="text-base text-[#0c2237] underline underline-offset-4"
            >
              What my clients are saying
            </a>
          </div>
        </div>

        <div className="relative h-[620px] w-full">
          <Image
            src="/hero-left-image.svg"
            alt="Conversions and acquisition dashboard preview"
            fill
            priority
            className="object-contain object-right-top"
          />
        </div>
      </div>
    </section>
  );
}
