"use client";

import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
};

export default function HubSpotTestForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setMessage(payload?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Success. The contact was sent to HubSpot.");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isLoading = status === "loading";
  const messageClassName =
    status === "error" ? "text-red-700" : status === "success" ? "text-emerald-700" : "text-zinc-700";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="hubspot-test-name" className="mb-2 block text-sm font-medium text-zinc-800">
          Name
        </label>
        <input
          id="hubspot-test-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Jane Smith"
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="hubspot-test-email" className="mb-2 block text-sm font-medium text-zinc-800">
          Email
        </label>
        <input
          id="hubspot-test-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="jane@company.com"
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-base font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit test form"}
      </button>

      <p className={`text-base ${messageClassName}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
