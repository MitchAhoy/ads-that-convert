import Image from "next/image";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

const valueProps = [
  {
    text: "No junior handoffs: I manage your campaign from planning to profit",
    iconSrc: "/cog-icon.svg",
    iconClassName: "h-6 w-6",
  },
  {
    text: "I'll seamlessly integrate into your business (via Slack or email)",
    iconSrc: "/integrate-icon.svg",
    iconClassName: "h-6 w-6",
  },
  {
    text: "Big agency performance, small agency speed",
    iconSrc: "/performance-icon.svg",
    iconClassName: "h-5 w-5",
  },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pb-10 pt-6 sm:pb-12 sm:pt-8"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:justify-items-center">
        <div className="w-full max-w-[610px] text-center sm:text-left">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full px-3 py-2 text-sm leading-[1.4] text-zinc-900 sm:mx-0 sm:px-4">
            <span aria-hidden="true" className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span>Now accepting new clients</span>
          </div>

          <h1
            id="hero-title"
            className="mt-5 font-serif text-[clamp(2rem,5vw,2.1875rem)] font-semibold leading-[1.15] tracking-tight text-black sm:mt-6"
          >
            SaaS Google Ads Agency Driving Growth for Ambitious Businesses
          </h1>

          <p className="mt-5 text-base leading-[1.6] text-[#16181b] sm:text-lg">
            Convert clicks into SaaS customers with your new fully managed
            Google Ads service.
          </p>

          <ul className="mt-8 space-y-5 text-base leading-[1.6] text-[#16181b]">
            {valueProps.map((item) => (
              <li key={item.text} className="flex items-start justify-center gap-4 text-left sm:justify-start">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#111827]">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className={`${item.iconClassName} object-contain`}
                  />
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-start sm:gap-8">
            <ScheduleCallButton href="#" />
            <a
              href="#"
              className="text-base text-[#0c2237] underline underline-offset-4"
            >
              What my clients are saying
            </a>
          </div>
        </div>

        <div className="relative hidden h-[620px] w-full lg:block">
          <Image
            src="/hero-left-image.svg"
            alt="Conversions and acquisition dashboard preview"
            fill
            priority
            className="object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}
