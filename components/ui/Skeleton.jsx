export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-full bg-zinc-200/80 ${className}`.trim()} />;
}
