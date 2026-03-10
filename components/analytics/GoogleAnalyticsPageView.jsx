"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
