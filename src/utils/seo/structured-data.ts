/**
 * @fileoverview JSON-LD structured data helpers.
 *
 * Structured data lets search engines understand the site as entities rather
 * than just text. Render the output inside a `<script type="application/ld+json">`
 * tag.
 *
 * Note this page is `noindex` (see `siteConfig.noindex`), so the graph is not
 * doing SEO work today. It stays because it is also read by link previews and
 * assistant surfaces that fetch the page directly, and because flipping the
 * page to indexable should not require re-deriving the entity model.
 */

import { siteConfig } from "@/lib/site";

/**
 * Organization + WebSite schema for the site root. Emit once, in the root
 * layout. The two nodes are linked by `@id` so crawlers treat them as related.
 */
export function getSiteStructuredData() {
  const { legal } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // `AccountingService`, not the generic `Organization`: it inherits from
        // both ProfessionalService and LocalBusiness, which is what lets search
        // engines place the firm in Pößneck rather than treat it as a company
        // that merely has a website.
        "@type": "AccountingService",
        "@id": `${siteConfig.url}/#organization`,
        name: legal.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: legal.phone,
        email: legal.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: legal.street,
          postalCode: legal.postalCode,
          addressLocality: legal.city,
          addressCountry: legal.country,
        },
        // The generated icon route — see `app/icon.tsx`. Never a checked-in PNG
        // that can drift from the mark.
        logo: `${siteConfig.url}/icon`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        inLanguage: "de-DE",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
