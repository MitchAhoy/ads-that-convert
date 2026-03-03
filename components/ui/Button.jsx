export default function Button({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-base font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
