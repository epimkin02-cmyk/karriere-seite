/**
 * Copy and content for the contact page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/kontakt
 * (retrieved 2026-08-27). Body copy, field labels and the form's status
 * messages are verbatim from that page. Strings the original did not have are
 * marked `// NEU`; original oddities are kept and marked `// sic:`.
 *
 * The original's submit button carries no readable label (it is rendered by
 * the site builder's widget), so `submitLabel` below is NEU.
 *
 * Components take this through props — never by importing this file directly.
 */

import type { OpeningHour, PhoneNumber, PostalAddress } from "./firma";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  EMAIL,
  EMAIL_HREF,
  OPENING_HOURS,
  PRIMARY_PHONE,
} from "./firma";

/* -------------------------------------------------------------------------- */
/* Interfaces                                                                  */
/* -------------------------------------------------------------------------- */

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
}

/** The card next to the form: address, one phone number, e-mail, hours. */
export interface ContactCard {
  companyName: string;
  address: PostalAddress;
  phone: PhoneNumber;
  email: string;
  emailHref: string;
  openingHoursTitle: string;
  openingHours: readonly OpeningHour[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
}

export interface FormContent {
  eyebrow: string;
  title: string;
  description: string;
  /** The legend the builder's widget prints inside the form. */
  legend: string;
  fields: readonly FormField[];
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface DirectionsContent {
  eyebrow: string;
  title: string;
  body: string;
}

/* -------------------------------------------------------------------------- */
/* 1 — Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO_CONTENT: HeroContent = {
  eyebrow: "Kontakt", // NEU — im Original nur der Navigationspunkt
  title: "So erreichen Sie Ihren Steuerberater in Pößneck",
  lead:
    "Wir betreuen geschäftliche, aber auch private Mandanten in jeglichen Steuerfragen. Lassen Sie sich individuell und diskret beraten!",
};

/* -------------------------------------------------------------------------- */
/* 2 — Kontaktkarte                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The contact page prints only the first of the four numbers the footer
 * carries; the other three appear in the footer only. See `PHONE_NUMBERS`
 * in `firma.ts` for the full set.
 */
export const CONTACT_CARD: ContactCard = {
  companyName: COMPANY_NAME,
  address: COMPANY_ADDRESS,
  phone: PRIMARY_PHONE,
  email: EMAIL,
  emailHref: EMAIL_HREF,
  openingHoursTitle: "Öffnungszeiten",
  openingHours: OPENING_HOURS,
};

/* -------------------------------------------------------------------------- */
/* 3 — Kontaktformular                                                         */
/* -------------------------------------------------------------------------- */

export const FORM_CONTENT: FormContent = {
  eyebrow: "Anfrage", // NEU
  title: "Steuerberater kontaktieren",
  description: "Teilen Sie uns Ihr Anliegen mit und wir melden uns zeitnah bei Ihnen.",
  // sic: englische Legende auf einer sonst deutschen Seite, Vorgabe des Baukastens
  legend: "Contact Us",
  /**
   * Every field is marked with a trailing asterisk in the source, i.e. all
   * five are required. The asterisk is not part of `label` — render it from
   * `required` so screen readers announce it once, not twice.
   */
  fields: [
    { name: "vorname", label: "Vorname", type: "text", required: true },
    { name: "nachname", label: "Nachname", type: "text", required: true },
    { name: "email", label: "E-Mail", type: "email", required: true },
    { name: "telefon", label: "Telefon", type: "tel", required: true },
    { name: "nachricht", label: "Nachricht", type: "textarea", required: true },
  ],
  submitLabel: "Nachricht senden", // NEU — das Original hat keine lesbare Button-Beschriftung
  successMessage:
    "Danke, dass Sie uns kontaktiert haben. Wir werden uns so schnell wie möglich bei Ihnen melden.",
  errorMessage:
    "Hoppla, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
};

/* -------------------------------------------------------------------------- */
/* 4 — Anfahrt                                                                 */
/* -------------------------------------------------------------------------- */

export const DIRECTIONS_CONTENT: DirectionsContent = {
  eyebrow: "Anfahrt", // NEU
  title: "Ihr Weg zu unserer Steuerkanzlei",
  body:
    "Unser Büro befindet sich am Rande von Pößneck und ist mit öffentlichen Verkehrsmitteln gut zu erreichen. In der Nähe finden Sie zudem mehrere Parkplätze.",
};
