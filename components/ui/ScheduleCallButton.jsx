import Image from "next/image";
import Link from "next/link";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";

const sizeClasses = {
  desktop: "h-12 px-6 text-base",
  mobile: "h-14 px-6 text-base",
};

export default function ScheduleCallButton({
  url,
  href,
  className = "",
  onClick,
  size = "desktop",
}) {
  const destination = url ?? href ?? SCHEDULE_CALL_URL;
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 font-medium text-white transition-colors hover:bg-zinc-800 ${sizeClasses[size] ?? sizeClasses.desktop} ${className}`;
  const content = (
    <>
      <Image
        src="/google-meet-logo.png"
        alt=""
        width={size === "mobile" ? 20 : 18}
        height={size === "mobile" ? 20 : 18}
        aria-hidden="true"
      />
      <span>Schedule a Call</span>
    </>
  );

  if (destination === SCHEDULE_CALL_URL) {
    return (
      <FilloutPopupTrigger className={classes} onClick={onClick}>
        {content}
      </FilloutPopupTrigger>
    );
  }

  return (
    <Link
      href={destination}
      onClick={onClick}
      className={classes}
    >
      {content}
    </Link>
  );
}
