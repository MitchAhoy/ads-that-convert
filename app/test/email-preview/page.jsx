import Link from "next/link";
import { getEmailTemplate, getEmailTemplateList } from "@/lib/email/templates";

export const metadata = {
  title: "Email Preview",
  robots: {
    index: false,
    follow: false,
  },
};

function getTemplateId(searchParams) {
  const templateParam = searchParams?.template;

  if (Array.isArray(templateParam)) {
    return templateParam[0];
  }

  if (typeof templateParam === "string") {
    return templateParam;
  }

  return "editorial";
}

export default async function EmailPreviewPage({ searchParams }) {
  const params = await searchParams;
  const activeTemplateId = getTemplateId(params);
  const templateList = getEmailTemplateList();
  const activeTemplate = getEmailTemplate(activeTemplateId);
  const html = activeTemplate.render(activeTemplate.sampleProps);

  return (
    <main className="rounded-[2rem] border border-zinc-200 bg-zinc-50/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
      <section className="py-5 sm:py-6">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950">
            Email Brand Direction Workshop
          </h1>
          <p className="mt-3 max-w-[56ch] text-base sm:text-lg text-zinc-700">
            Compare three distinct styles and pick the one that feels most like AdsThatConvert before we finalize all campaign templates.
          </p>
        </div>
      </section>

      <section className="py-5 sm:py-6">
        <div className="mx-auto grid w-full max-w-[1120px] gap-5 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
          <aside className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-zinc-950">Templates</h2>
            <ul className="mt-4 space-y-3">
              {templateList.map((template) => {
                const isActive = template.id === activeTemplate.id;
                return (
                  <li key={template.id}>
                    <Link
                      href={`/test/email-preview?template=${template.id}`}
                      className={`block rounded-2xl border px-4 py-3 text-base transition-colors ${
                        isActive
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-zinc-500 hover:bg-zinc-100"
                      }`}
                    >
                      <span className="block font-medium">{template.name}</span>
                      <span className={`mt-1 block text-sm ${isActive ? "text-zinc-200" : "text-zinc-600"}`}>
                        {template.description}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 rounded-2xl border border-zinc-300 bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-900">Subject</p>
              <p className="mt-1 text-base text-zinc-700">{activeTemplate.subject}</p>
              <p className="mt-3 text-sm font-medium text-zinc-900">Preview text</p>
              <p className="mt-1 text-base text-zinc-700">{activeTemplate.previewText}</p>
            </div>
            <Link
              href={`/api/email-preview?template=${activeTemplate.id}`}
              target="_blank"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Open Raw HTML
            </Link>
          </aside>

          <article className="rounded-2xl border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-4">
            <iframe
              title={`${activeTemplate.name} email preview`}
              srcDoc={html}
              className="h-[72vh] w-full rounded-xl border border-zinc-300 bg-white"
            />
          </article>
        </div>
      </section>
    </main>
  );
}
