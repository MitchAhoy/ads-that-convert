import { EMAIL_BRAND } from "@/lib/email/brand";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getAccentColor(accentTarget, currentTarget) {
  return accentTarget === currentTarget ? EMAIL_BRAND.palette.accent : EMAIL_BRAND.palette.body;
}

export default function buildEmailLayout({
  preheader,
  opener,
  title,
  paragraphs = [],
  quote,
  optionalParagraph = "",
  ctaLabel = "Book a free strategy call →",
  ctaUrl = "https://www.adsthatconvert.co/book",
  accentTarget = "cta",
}) {
  const safePreheader = escapeHtml(preheader);
  const safeOpener = escapeHtml(opener);
  const safeTitle = escapeHtml(title);
  const safeQuote = escapeHtml(quote);
  const safeOptionalParagraph = optionalParagraph ? escapeHtml(optionalParagraph) : "";
  const safeCtaLabel = escapeHtml(ctaLabel);
  const safeCtaUrl = escapeHtml(ctaUrl);

  const bodyParagraphHtml = paragraphs
    .slice(0, 3)
    .map(
      (paragraph) => `
      <p style="margin:0 0 20px;color:${EMAIL_BRAND.palette.body};font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
        ${escapeHtml(paragraph)}
      </p>
    `,
    )
    .join("");

  const optionalParagraphHtml = safeOptionalParagraph
    ? `
      <p style="margin:22px 0 0;color:${EMAIL_BRAND.palette.body};font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
        ${safeOptionalParagraph}
      </p>
    `
    : "";

  const quoteBorderColor = getAccentColor(accentTarget, "quote");
  const ctaColor = getAccentColor(accentTarget, "cta");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${EMAIL_BRAND.palette.pageBackground};">
    <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">
      ${safePreheader}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="width:100%;border-collapse:collapse;background-color:${EMAIL_BRAND.palette.pageBackground};">
      <tr>
        <td align="center" style="padding:36px 16px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="width:100%;max-width:640px;border-collapse:collapse;">
            <tr>
              <td align="center" style="padding-bottom:26px;">
                <a href="${EMAIL_BRAND.siteUrl}" target="_blank" rel="noreferrer" style="text-decoration:none;color:${EMAIL_BRAND.palette.body};display:inline-block;">
                  <img
                    src="${EMAIL_BRAND.siteUrl}/logo.svg"
                    alt="Ads That Convert"
                    width="180"
                    height="15"
                    style="display:block;border:0;outline:none;text-decoration:none;height:auto;"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:28px;overflow:hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                  style="width:100%;border-collapse:collapse;background-color:#ffffff;">
                  <tr>
                    <td style="padding:44px 42px 30px;font-family:${EMAIL_BRAND.typography.fontFamily};">
                      <p style="margin:0;color:${EMAIL_BRAND.palette.body};font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
                        ${safeOpener}
                      </p>

                      <h1 style="margin:18px 0 22px;color:${EMAIL_BRAND.palette.heading};font-size:${EMAIL_BRAND.typography.headlineSize};line-height:${EMAIL_BRAND.typography.headingLineHeight};font-weight:700;letter-spacing:-0.02em;">
                        ${safeTitle}
                      </h1>

                      ${bodyParagraphHtml}

                      <blockquote style="margin:26px 0 0;padding:2px 0 2px 16px;border-left:3px solid ${quoteBorderColor};color:${EMAIL_BRAND.palette.body};font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
                        ${safeQuote}
                      </blockquote>

                      ${optionalParagraphHtml}

                      <p style="margin:24px 0 0;font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
                        <a href="${safeCtaUrl}" target="_blank" rel="noreferrer"
                          style="color:${ctaColor};text-decoration:underline;">
                          ${safeCtaLabel}
                        </a>
                      </p>

                      <p style="margin:36px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;font-style:italic;color:${EMAIL_BRAND.palette.body};">
                        Mitch
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:24px;">
                <p style="margin:0;color:${EMAIL_BRAND.palette.muted};font-family:${EMAIL_BRAND.typography.fontFamily};font-size:${EMAIL_BRAND.typography.bodySize};line-height:${EMAIL_BRAND.typography.bodyLineHeight};">
                  adsthatconvert.co
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
