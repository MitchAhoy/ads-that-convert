import Image from "next/image";
import Link from "next/link";

const sizeClasses = {
  desktop: "h-12 px-6 text-base",
  mobile: "h-14 px-6 text-base",
};

export default function ScheduleCallButton({
  href = "#",
  className = "",
  onClick,
  size = "desktop",
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 font-medium text-white transition-colors hover:bg-zinc-800 ${sizeClasses[size] ?? sizeClasses.desktop} ${className}`}
    >
      <Image
        src="/google-meet-logo.png"
        alt=""
        width={size === "mobile" ? 20 : 18}
        height={size === "mobile" ? 20 : 18}
        aria-hidden="true"
      />
      <span>Schedule a Call</span>
    </Link>
  );
}
