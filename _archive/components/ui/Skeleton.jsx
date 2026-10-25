export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-full bg-border/70 ${className}`.trim()} />;
}
