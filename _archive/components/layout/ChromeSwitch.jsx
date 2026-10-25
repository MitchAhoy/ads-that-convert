"use client";

import { usePathname } from "next/navigation";

// Pages built on the homepage system (DESIGN.md §16): the homepage, /pricing
// and the /services/* pages. They get the homepage nav and footer; every other page
// keeps the shared site chrome.
export function usesHomeSystem(pathname) {
  return pathname === "/" || pathname === "/pricing" || pathname.startsWith("/services/");
}

export default function ChromeSwitch({ home, site }) {
  const pathname = usePathname();
  return usesHomeSystem(pathname) ? home : site;
}
