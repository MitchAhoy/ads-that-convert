import { NextResponse } from "next/server";
import { getEmailTemplate } from "@/lib/email/templates";

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get("template") ?? "editorial";
  const template = getEmailTemplate(templateId);
  const html = template.render(template.sampleProps);

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
