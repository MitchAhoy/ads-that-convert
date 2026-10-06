export default function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex rounded-full bg-zinc-200 px-3 py-1 text-base font-medium text-zinc-700 ${className}`}>
      {children}
    </span>
  );
}
