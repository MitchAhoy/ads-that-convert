"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import "./globals.css";

// Last-resort fallback when the root layout itself crashes. It replaces the
// whole layout, so there's no nav, footer or loaded fonts: keep it plain.
// Reports the crash to PostHog error tracking.
export default function GlobalError({ error }) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white">
        <main className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-hp-ink">Something broke.</h1>
          <p className="mt-4 max-w-md text-lg text-hp-body">
            The page hit an error on our side. It has been reported. Try loading it again.
          </p>
          {/* A plain link forces a full reload, which clears the broken state. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="mt-8 inline-flex items-center rounded-[10px] bg-hp-ink px-4.5 py-2.75 text-base font-medium text-white hover:bg-[#26282c]"
          >
            Back to the homepage
          </a>
        </main>
      </body>
    </html>
  );
}
