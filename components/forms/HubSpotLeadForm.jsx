"use client";

import { useId, useState } from "react";

const DEFAULT_FORM = {
  firstName: "",
  email: "",
};

function getCookieValue(name) {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
}

export default function HubSpotLeadForm({
  formKey = "reduce-wasted-ad-spend",
  submitLabel = "Get the guide",
  submittingLabel = "Sending...",
  successMessage = "Success. Check your inbox for the guide.",
  className = "",
  showFirstName = false,
  firstNameLabel = "First name",
  firstNamePlaceholder = "Jane",
  emailLabel = "Work email",
  emailPlaceholder = "jane@company.com",
  buttonClassName = "",
  inputClassName = "",
  onSuccess,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const firstNameId = useId();
  const emailId = useId();

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
        body: JSON.stringify({
          formKey,
          ...form,
          hutk: getCookieValue("hubspotutk"),
          pageName: document.title,
          pageUri: window.location.href,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setMessage(payload?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(successMessage);
      setForm(DEFAULT_FORM);
      onSuccess?.(payload);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isLoading = status === "loading";
  const messageClassName =
    status === "error" ? "text-red-700" : status === "success" ? "text-emerald-700" : "text-zinc-700";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {showFirstName ? (
        <div>
          <label htmlFor={firstNameId} className="mb-2 block text-sm font-medium text-zinc-800">
            {firstNameLabel}
          </label>
          <input
            id={firstNameId}
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder={firstNamePlaceholder}
            className={`w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70 ${inputClassName}`}
            disabled={isLoading}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor={emailId} className="mb-2 block text-sm font-medium text-zinc-800">
          {emailLabel}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder={emailPlaceholder}
          className={`w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70 ${inputClassName}`}
          disabled={isLoading}
          required
        />
      </div>

      <button
        type="submit"
        className={`inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 ${buttonClassName}`}
        disabled={isLoading}
      >
        {isLoading ? submittingLabel : submitLabel}
      </button>

      <p className={`text-base ${messageClassName}`} role="status" aria-live="polite">
        {message || " "}
      </p>
    </form>
  );
}
