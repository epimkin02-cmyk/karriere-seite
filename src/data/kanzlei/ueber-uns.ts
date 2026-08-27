/**
 * Copy and content for the "Über uns" page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/ueber-uns
 * (retrieved 2026-08-27). Body copy is verbatim from that page. Strings the
 * original did not have — eyebrows, section labels — are marked `// NEU`.
 *
 * The page is short: a hero, two people, and a closing line. It carries no
 * team photos and no biographies; nothing beyond what is below was on it.
 *
 * Components take this through props — never by importing this file directly.
 */

import type { CtaLink } from "./firma";
import { PRIMARY_PHONE } from "./firma";

/* -------------------------------------------------------------------------- */
/* Interfaces                                                                  */
/* -------------------------------------------------------------------------- */

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  action: CtaLink;
}

/** One member of the leadership, as the page lists them. */
export interface TeamMember {
  id: string;
  name: string;
  /** The line under the name — the original prints it as one string. */
  role: string;
  /** Null until the client supplies a portrait; the page carries none. */
  image: string | null;
}

export interface TeamContent {
  eyebrow: string;
  title: string;
  members: readonly TeamMember[];
}

export interface ClosingContent {
  text: string;
  phoneLabel: string;
  phoneHref: string;
}

/* -------------------------------------------------------------------------- */
/* 1 — Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO_CONTENT: HeroContent = {
  eyebrow: "Über uns", // NEU — im Original nur der Navigationspunkt
  title: "Erfahrener Steuerberater in Pößneck",
  lead:
    "Mit insgesamt 12 Mitarbeitern kümmern wir uns um die vielseitigen Anliegen unserer Mandanten. Auch Vereinsabschlüsse gehören zu unserem Leistungsangebot.",
  action: {
    label: "Anfrage senden",
    href: "/kontakt",
  },
};

/* -------------------------------------------------------------------------- */
/* 2 — Wir stellen uns vor                                                     */
/* -------------------------------------------------------------------------- */

export const TEAM_CONTENT: TeamContent = {
  eyebrow: "Das Team", // NEU
  title: "Wir stellen uns vor:",
  members: [
    {
      id: "frank-kutscher",
      name: "Frank Kutscher",
      role: "Steuerberater, Geschäftsführer",
      image: null,
    },
    {
      id: "manuela-koeber",
      name: "Manuela Köber",
      role: "Assistentin der Geschäftsführung",
      image: null,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 3 — Abschlussband                                                           */
/* -------------------------------------------------------------------------- */

export const CLOSING_CONTENT: ClosingContent = {
  text:
    "Lernen Sie uns und unser Leistungsangebot in einem persönlichen Beratungsgespräch näher kennen!",
  phoneLabel: PRIMARY_PHONE.label,
  phoneHref: PRIMARY_PHONE.href,
};
