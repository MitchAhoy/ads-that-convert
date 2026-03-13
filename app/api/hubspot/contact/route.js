const HUBSPOT_API_BASE_URL = "https://api.hubapi.com";
const HUBSPOT_FORMS_API_BASE_URL = "https://api.hsforms.com";
const DEFAULT_PORTAL_ID = "442934845";
const FORM_CONFIGS = {
  "reduce-wasted-ad-spend": {
    acquisitionSource: "homepage lead magnet",
    formGuidEnvVar: "HUBSPOT_FORM_GUID_REDUCE_WASTED_AD_SPEND",
  },
};

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function getDevErrorDetails(submissionResponse) {
  if (process.env.NODE_ENV === "production") {
    return undefined;
  }

  return {
    hubspotStatus: submissionResponse.status,
    hubspotError: submissionResponse.error,
    hubspotData: submissionResponse.data ?? null,
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function hubspotRequest(path, options = {}) {
  const { includeAuth = true, ...requestOptions } = options;
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (includeAuth && !token) {
    return {
      ok: false,
      status: 500,
      error: "Missing HubSpot configuration.",
    };
  }

  const url = path.startsWith("http") ? path : `${HUBSPOT_API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(includeAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(requestOptions.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (response.ok) {
    return {
      ok: true,
      status: response.status,
      data,
    };
  }

  return {
    ok: false,
    status: response.status,
    error: data?.message || "HubSpot request failed.",
    data,
  };
}

function isFormsWriteScopeError(submissionResponse) {
  const errorText = `${submissionResponse?.error || ""} ${submissionResponse?.data?.message || ""}`.toLowerCase();
  return errorText.includes("form-submissions-write");
}

function getClientIpAddress(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || undefined;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const formKey = typeof payload?.formKey === "string" ? payload.formKey.trim() : "reduce-wasted-ad-spend";
  const firstName = typeof payload?.firstName === "string" ? payload.firstName.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const hutk = typeof payload?.hutk === "string" ? payload.hutk.trim() : "";
  const pageName = typeof payload?.pageName === "string" ? payload.pageName.trim() : "";
  const pageUri = typeof payload?.pageUri === "string" ? payload.pageUri.trim() : "";
  const portalId = process.env.HUBSPOT_PORTAL_ID || DEFAULT_PORTAL_ID;
  const formConfig = FORM_CONFIGS[formKey];

  if (!formConfig) {
    return jsonResponse({ ok: false, error: "Unknown HubSpot form configuration." }, 400);
  }

  const formGuid = process.env[formConfig.formGuidEnvVar];

  if (!formGuid) {
    return jsonResponse({ ok: false, error: "Missing HubSpot form configuration." }, 500);
  }

  if (!email) {
    return jsonResponse({ ok: false, error: "Please enter your email." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const properties = {
    email,
    acquisition_source: formConfig.acquisitionSource,
  };

  if (firstName) {
    properties.firstname = firstName;
  }

  const submissionPayload = {
    submittedAt: Date.now().toString(),
    fields: Object.entries(properties).map(([fieldName, value]) => ({
      name: fieldName,
      value,
    })),
    context: {
      hutk: hutk || undefined,
      ipAddress: getClientIpAddress(request),
      pageName: pageName || undefined,
      pageUri: pageUri || undefined,
    },
  };

  let submissionResponse = await hubspotRequest(
    `${HUBSPOT_FORMS_API_BASE_URL}/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
    {
      method: "POST",
      body: JSON.stringify(submissionPayload),
    }
  );

  if (!submissionResponse.ok && (submissionResponse.status === 401 || submissionResponse.status === 403) && isFormsWriteScopeError(submissionResponse)) {
    submissionResponse = await hubspotRequest(
      `${HUBSPOT_FORMS_API_BASE_URL}/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        includeAuth: false,
        body: JSON.stringify(submissionPayload),
      }
    );
  }

  if (!submissionResponse.ok) {
    const devDetails = getDevErrorDetails(submissionResponse);

    return jsonResponse(
      {
        ok: false,
        error:
          submissionResponse.status === 400
            ? "HubSpot rejected the form submission. Check the HubSpot form fields and configuration."
            : submissionResponse.status === 403
              ? "HubSpot denied this submission. Check token scopes, portal ID, and form GUID pairing."
            : "Unable to submit the form to HubSpot.",
        ...(devDetails ? { details: devDetails } : {}),
      },
      submissionResponse.status >= 400 && submissionResponse.status < 600 ? submissionResponse.status : 500
    );
  }

  return jsonResponse({ ok: true });
}
