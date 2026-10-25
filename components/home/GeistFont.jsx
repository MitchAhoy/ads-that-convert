import { Geist } from "next/font/google";

// The site is set in Geist (DESIGN.md §16). Rendered once in the root layout;
// the :root variable is what `font-hp` resolves to.
const geist = Geist({ subsets: ["latin"], display: "swap" });

export default function GeistFont() {
  return <style>{`:root { --font-geist-sans: ${geist.style.fontFamily}; }`}</style>;
}
