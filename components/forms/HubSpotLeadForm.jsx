"use client";

import { useId, useState } from "react";
import posthog from "posthog-js";

const DEFAULT_FORM = {
  firstName: "",
  email: "",
};

function normalizeEmail(value) {
  return value?.trim().toLowerCase() || "";
}

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
  analyticsEventBase = "lead_magnet_optin",
  analyticsProperties = {},
  showSuccessPreview = false,
  collapseOnSuccess = false,
  hideControlsOnSuccess = true,
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
        if (posthog.__loaded) {
          posthog.capture(`${analyticsEventBase}_submit_error`, {
            form_key: formKey,
            error_message: payload?.error || "unknown_error",
            ...analyticsProperties,
          });
        }
        setStatus("error");
        setMessage(payload?.error || "Something went wrong. Please try again.");
        return;
      }

      if (posthog.__loaded) {
        const normalizedEmail = normalizeEmail(form.email);

        if (normalizedEmail) {
          posthog.identify(normalizedEmail, {
            email: normalizedEmail,
            first_name: form.firstName?.trim() || undefined,
            lead_form_key: formKey,
            lead_source: "lead_magnet",
          });
        }

        posthog.capture(`${analyticsEventBase}_submit_success`, {
          form_key: formKey,
          ...analyticsProperties,
        });
      }
      setStatus("success");
      setMessage(successMessage);
      setForm(DEFAULT_FORM);
      onSuccess?.(payload);
    } catch {
      if (posthog.__loaded) {
        posthog.capture(`${analyticsEventBase}_submit_error`, {
          form_key: formKey,
          error_message: "network_or_runtime_error",
          ...analyticsProperties,
        });
      }
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";
  const showSuccessMessage = showSuccessPreview || isSuccess;
  const shouldCollapseFormControls = (collapseOnSuccess || hideControlsOnSuccess) && isSuccess;

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
          shouldCollapseFormControls ? "max-h-0 -translate-y-1 opacity-0" : "max-h-[320px] translate-y-0 opacity-100"
        }`}
      >
        <div className="space-y-4">
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
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
          showSuccessMessage ? "max-h-24 translate-y-0 opacity-100" : "max-h-0 translate-y-1 opacity-0"
        }`}
      >
        <div
          role="alert"
          aria-live="polite"
          className="w-full whitespace-nowrap rounded-[1.2rem] bg-emerald-100/75 px-2 py-2 text-xs font-medium leading-[1.2] tracking-[-0.01em] text-emerald-700"
        >
          <span>{successMessage}</span>
        </div>
      </div>

      {isError ? (
        <p className="text-base text-red-700" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
