import renderNewsletterEmail, { newsletterSampleProps } from "@/lib/email/templates/NewsletterEmail";
import renderPromoEmail, { promoSampleProps } from "@/lib/email/templates/PromoEmail";
import renderFounderNoteEmail, { founderNoteSampleProps } from "@/lib/email/templates/FounderNoteEmail";

export const EMAIL_TEMPLATES = {
  editorial: {
    id: "editorial",
    name: "Editorial Signal",
    description: "Calmer type, pull-quote voice, and text-link CTA.",
    subject: "One Google Ads signal worth fixing this week",
    previewText: newsletterSampleProps.preheader,
    render: renderNewsletterEmail,
    sampleProps: newsletterSampleProps,
  },
  proof: {
    id: "proof",
    name: "Proof First",
    description: "Asymmetric metrics + testimonial block before the ask.",
    subject: "Quarterly performance snapshot from a SaaS account",
    previewText: promoSampleProps.preheader,
    render: renderPromoEmail,
    sampleProps: promoSampleProps,
  },
  founder: {
    id: "founder",
    name: "Founder Note",
    description: "Direct, conversational note with a lightweight reply CTA.",
    subject: "A quick founder note on account priorities",
    previewText: founderNoteSampleProps.preheader,
    render: renderFounderNoteEmail,
    sampleProps: founderNoteSampleProps,
  },
};

export function getEmailTemplate(templateId) {
  return EMAIL_TEMPLATES[templateId] ?? EMAIL_TEMPLATES.editorial;
}

export function getEmailTemplateList() {
  return Object.values(EMAIL_TEMPLATES);
}
