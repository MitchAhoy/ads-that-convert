import { Geist } from "next/font/google";

// Headlines are set in Geist (DESIGN.md §16.3). Rendered once in the root layout;
// the :root variable is what `font-hp-display` resolves to.
const geist = Geist({ subsets: ["latin"], display: "swap" });

export default function GeistFont() {
  return <style>{`:root { --font-geist-sans: ${geist.style.fontFamily}; }`}</style>;
}
