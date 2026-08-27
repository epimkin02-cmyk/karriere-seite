/**
 * Shared master data for the Frank Kutscher Steuerberatungsgesellschaft mbH
 * website, plus the interfaces every page file in this folder reuses.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/ and its
 * sub-pages (retrieved 2026-08-27). Body copy is verbatim from those pages.
 * Strings the original did not have — eyebrows, section labels, aria copy —
 * are marked `// NEU` at their definition. Original spelling and punctuation
 * errors are kept as-is and marked `// sic:`.
 *
 * Components take this through props — never by importing this file directly
 * (see obsidian/frontend/component-conventions.md → Data rules). Swap it for a
 * CMS payload later without touching a single component.
 */

/* -------------------------------------------------------------------------- */
/* Shared interfaces                                                           */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

/** A phone number in both its display form and its dial form. */
export interface PhoneNumber {
  /** Exactly as printed on the site. */
  label: string;
  /** `tel:` target, exactly as the original anchor carries it. */
  href: string;
}

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

/** One row of the opening-hours table. */
export interface OpeningHour {
  day: string;
  /** Either a time range or the word the original uses for a closed day. */
  hours: string;
  closed: boolean;
}

/**
 * A block of a service catalogue: a title plus its bullet points.
 *
 * `items` carries objects rather than bare strings because the source repeats
 * one bullet verbatim inside the same block (see `LOHNBUCHFUEHRUNG` in
 * `fuer-unternehmen.ts`). React keys must come from `id`, never from `text`.
 */
export interface ServiceItem {
  /** Stable, unique within its block. Use as the React key. */
  id: string;
  text: string;
}

export interface ServiceBlock {
  id: string;
  title: string;
  items: readonly ServiceItem[];
}

/** One paragraph-level node of a legal text. */
export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "address"; lines: readonly string[] }
  | { kind: "link"; label: string; href: string }
  | {
      kind: "linkList";
      items: readonly { label: string; href: string }[];
    }
  | {
      kind: "table";
      columns: readonly string[];
      rows: readonly (readonly string[])[];
    };

/** A section of a legal text: a heading, its level, and its blocks. */
export interface LegalSection {
  id: string;
  heading: string;
  /** 2 = top-level section, 3 = sub-section, 4 = sub-sub-section. */
  level: 2 | 3 | 4;
  blocks: readonly LegalBlock[];
}

export interface LegalDocument {
  /** Slug of the source page, without a leading slash. */
  slug: string;
  title: string;
  /** Lead paragraphs above the first section. Empty on most documents. */
  intro: readonly LegalBlock[];
  sections: readonly LegalSection[];
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const COMPANY_NAME = "Frank Kutscher Steuerberatungsgesellschaft mbH";

/** NEU — short form for the header, where the legal name does not fit. */
export const BRAND_NAME = "Kutscher";

export const COMPANY_ADDRESS: PostalAddress = {
  street: "Naßäckerstr. 12",
  postalCode: "07381",
  city: "Pößneck",
  country: "Deutschland",
};

/**
 * All four numbers from the site footer, in the footer's own order.
 *
 * The `href` values are taken from the original anchors. Note that they are
 * inconsistent in the source: the first two drop the leading zero of the area
 * code correctly, the third and fourth keep an extra digit pattern of their
 * own. They are reproduced unchanged.
 */
export const PHONE_NUMBERS: readonly PhoneNumber[] = [
  { label: "03647 44558200", href: "tel:+49364744558200" },
  { label: "03647 42550", href: "tel:+49364742550" },
  { label: "03647 425512", href: "tel:+493647425512" },
  { label: "03647 44558257", href: "tel:+49364744558257" },
];

/** The number the header and every closing call-to-action band show. */
export const PRIMARY_PHONE: PhoneNumber = PHONE_NUMBERS[0];

export const EMAIL = "kanzlei@kutscher-stb.de";
export const EMAIL_HREF = "mailto:kanzlei@kutscher-stb.de";

/** Used in the Impressum and the Datenschutzerklärung, not in the footer. */
export const LEGAL_EMAIL = "frank.kutscher@kutscher-stb.de";

/** Landline and fax as the Impressum prints them — unspaced, with a leading 0. */
export const LEGAL_PHONE = "0364744558200";
export const LEGAL_FAX = "0364744558257";

/** From the Barrierefreiheitserklärung, for reporting accessibility barriers. */
export const ACCESSIBILITY_EMAIL = "manuela.koeber@kutscher-stb.de";
export const ACCESSIBILITY_PHONE = "+49364744558200";

/* -------------------------------------------------------------------------- */
/* Öffnungszeiten                                                              */
/* -------------------------------------------------------------------------- */

export const OPENING_HOURS: readonly OpeningHour[] = [
  { day: "Montag", hours: "7:30 - 16:30", closed: false },
  { day: "Dienstag", hours: "7:30 - 16:30", closed: false },
  { day: "Mittwoch", hours: "7:30 - 16:30", closed: false },
  { day: "Donnerstag", hours: "7:30 - 16:30", closed: false },
  { day: "Freitag", hours: "7:30 - 14:30", closed: false },
  { day: "Samstag", hours: "Geschlossen", closed: true },
  { day: "Sonntag", hours: "Geschlossen", closed: true },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const SITE_NAV: readonly NavLink[] = [
  { label: "Willkommen", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Für Unternehmen", href: "/fuer-unternehmen" },
  { label: "Für Private", href: "/fuer-private" },
  { label: "Kontakt", href: "/kontakt" },
];

export const LEGAL_NAV: readonly NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutzerklaerung" },
  { label: "Barrierefreiheitserklärung", href: "/barrierefreiheitserklaerung" },
];

/**
 * The footer's third slot on every page carries the site builder's untouched
 * placeholder text. It is reproduced here so the migration can decide to drop
 * it rather than silently inherit it.
 */
// sic: unbearbeiteter Platzhaltertext des Baukastens, steht so im Original
export const FOOTER_PLACEHOLDER =
  "This is paragraph text. Click it or hit the Manage Text button to change the font, color, size, format, and more. To set up site-wide paragraph and title styles, go to Site Theme.";

/** The footer's provider credit, verbatim. */
export const FOOTER_CREDIT = "Powered by Sellwerk";
