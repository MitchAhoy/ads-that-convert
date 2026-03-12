const HUBSPOT_API_BASE_URL = "https://api.hubapi.com";
const ACQUISITION_SOURCE_VALUE = "homepage lead magnet";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseName(name) {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(/\s+/).filter(Boolean);

  return {
    firstname: nameParts[0] || "",
    lastname: nameParts.slice(1).join(" "),
  };
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

  const response = await fetch(`${HUBSPOT_API_BASE_URL}${path}`, {
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

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (!name) {
    return jsonResponse({ ok: false, error: "Please enter your name." }, 400);
  }

  if (!email) {
    return jsonResponse({ ok: false, error: "Please enter your email." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const { firstname, lastname } = parseName(name);
  const properties = {
    email,
    firstname,
    lastname,
    acquisition_source: ACQUISITION_SOURCE_VALUE,
  };

  const existingContact = await hubspotRequest(
    `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
    {
      method: "GET",
    }
  );

  if (existingContact.ok) {
    const updateResponse = await hubspotRequest(
      `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      {
        method: "PATCH",
        body: JSON.stringify({ properties }),
      }
    );

    if (!updateResponse.ok) {
      return jsonResponse(
        {
          ok: false,
          error: updateResponse.status === 400 ? updateResponse.error : "Unable to update contact in HubSpot.",
        },
        updateResponse.status >= 400 && updateResponse.status < 600 ? updateResponse.status : 500
      );
    }

    return jsonResponse({ ok: true });
  }

  if (existingContact.status !== 404) {
    return jsonResponse(
      {
        ok: false,
        error:
          existingContact.status === 500
            ? existingContact.error
            : "Unable to check for an existing HubSpot contact.",
      },
      existingContact.status >= 400 && existingContact.status < 600 ? existingContact.status : 500
    );
  }

  const createResponse = await hubspotRequest("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  if (!createResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        error: createResponse.status === 400 ? createResponse.error : "Unable to create contact in HubSpot.",
      },
      createResponse.status >= 400 && createResponse.status < 600 ? createResponse.status : 500
    );
  }

  return jsonResponse({ ok: true });
}
