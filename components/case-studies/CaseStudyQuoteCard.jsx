import QuoteAttribution from "@/components/ui/QuoteAttribution";

// MDX quote block. Renders the homepage's compact QuoteAttribution (DESIGN.md
// §7.8) after a hairline, so a case study closes with named proof.
export default function CaseStudyQuoteCard({
  quote,
  name,
  role,
  position,
  company,
  profileImageSrc,
  profileImageAlt,
  logoSrc,
  logoAlt,
}) {
  return (
    <QuoteAttribution
      compact
      className="mt-8 border-t border-border pt-7"
      quote={quote}
      person={name}
      role={position || role}
      company={company}
      avatarSrc={profileImageSrc}
      avatarAlt={profileImageAlt}
      companyLogoSrc={logoSrc}
      companyLogoAlt={logoAlt}
    />
  );
}
