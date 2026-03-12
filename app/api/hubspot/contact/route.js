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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function hubspotRequest(path, options = {}) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!token) {
    return {
      ok: false,
      status: 500,
      error: "Missing HubSpot configuration.",
    };
  }

  const url = path.startsWith("http") ? path : `${HUBSPOT_API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
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

  const submissionResponse = await hubspotRequest(
    `${HUBSPOT_FORMS_API_BASE_URL}/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
    {
      method: "POST",
      body: JSON.stringify({
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
      }),
    }
  );

  if (!submissionResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        error:
          submissionResponse.status === 400
            ? "HubSpot rejected the form submission. Check the HubSpot form fields and configuration."
            : "Unable to submit the form to HubSpot.",
      },
      submissionResponse.status >= 400 && submissionResponse.status < 600 ? submissionResponse.status : 500
    );
  }

  return jsonResponse({ ok: true });
}
