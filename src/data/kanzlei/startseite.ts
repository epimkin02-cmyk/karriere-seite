/**
 * Copy and content for the home page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/
 * (retrieved 2026-08-27). Body copy is verbatim from that page. Strings the
 * original did not have — eyebrows, section labels — are marked `// NEU` at
 * their definition. Original errors are kept and marked `// sic:`.
 *
 * Components take this through props — never by importing this file directly.
 */

import type { CtaLink, SectionIntro } from "./firma";
import { PRIMARY_PHONE } from "./firma";

/* -------------------------------------------------------------------------- */
/* Interfaces                                                                  */
/* -------------------------------------------------------------------------- */

export interface HeroContent {
  /** The small line above the headline — the original's first text block. */
  eyebrow: string;
  title: string;
  /** Sits above the headline in the source, under the eyebrow. */
  lead: string;
  /** The page's one button. */
  action: CtaLink;
  /** The headline of the page body, below the hero band. */
  pageTitle: string;
  /** The welcome paragraph under `pageTitle`. */
  intro: string;
}

/** One of the four Alleinstellungsmerkmale cards. */
export interface FeatureCard {
  id: string;
  title: string;
  body: string;
  /** Icon file under `public/assets/kanzlei/`, without the extension. */
  icon: string;
}

export interface FeaturesContent extends SectionIntro {
  cards: readonly FeatureCard[];
}

/** The closing band: one sentence and the phone number. */
export interface ClosingContent {
  text: string;
  phoneLabel: string;
  phoneHref: string;
}

/* -------------------------------------------------------------------------- */
/* 1 — Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO_CONTENT: HeroContent = {
  eyebrow: "Rundum gut beraten",
  title: "Ihr Steuerberater in Pößneck",
  lead:
    "In unserer Steuerkanzlei betreuen wir Unternehmen und private Mandanten bei jeglichen steuerlichen Anliegen. Wir freuen uns auf Ihren Besuch!",
  action: {
    label: "Beratungstermin vereinbaren",
    href: "/kontakt",
  },
  pageTitle: "Ihr Steuerberater in Pößneck",
  intro:
    "Herzlich willkommen auf unserer Website. Wir freuen uns, Sie bei uns begrüßen zu dürfen. Hier finden Sie alle Informationen über unsere Steuerkanzlei und können sich einen ersten Überblick über unsere angebotenen Leistungen verschaffen. Alle steuerlichen Angelegenheiten sind unser Spezialgebiet und wir möchten unseren Mandanten dabei jederzeit mit Rat und Tat zur Seite stehen. Gern erklären wir Ihnen alles ganz genau und unterstützen Sie auch beim Ausfüllen von Formularen. Wir lassen Sie mit Ihren Steuerfragen nicht allein.",
};

/* -------------------------------------------------------------------------- */
/* 2 — Alleinstellungsmerkmale                                                 */
/* -------------------------------------------------------------------------- */

export const FEATURES_CONTENT: FeaturesContent = {
  eyebrow: "Alleinstellungsmerkmale", // NEU — aus dem Fließtext abgeleitet
  title: "Kompetente Steuerberatung für Unternehmen",
  description:
    "Wir machen keinen Unterschied zwischen unseren Mandanten. Bei uns erhält jeder die Beratung, die er benötigt. Hier möchten wir Ihnen einige unserer wichtigsten Alleinstellungsmerkmale vorstellen:",
  cards: [
    {
      id: "persoenliche-betreuung",
      title: "Persönliche Betreuung",
      body:
        "Wir achten darauf, dass Sie für Ihre Anliegen einen festen Ansprechpartner zugeteilt bekommen, der sich mit Ihrer Thematik am besten auskennt. Wir beraten Sie persönlich und sind daran interessiert, unsere Mandanten kennenzulernen.",
      icon: "frank-pneck-001",
    },
    {
      id: "individuelle-beratung",
      title: "Individuelle Beratung",
      body:
        "Wir möchten unseren Mandanten auf Augenhöhe begegnen und möglichst auf alle individuellen Bedürfnisse gezielt eingehen. Steuergesetze mögen recht einheitlich gestaltet sein, aber die Leben unserer Mandanten sind es nicht. Deshalb suchen wir gemeinsam mit unseren Mandanten nach den passenden Lösungen für individuelle Gegebenheiten.",
      icon: "frank-pneck-002",
    },
    {
      id: "professionell",
      title: "Professionell",
      body:
        "Mit umfassenden Qualifikationen und regelmäßigen Weiterbildungen möchten wir unsere Mandanten jederzeit kompetent unterstützen können. Dabei achten wir selbstverständlich auch auf ein Höchstmaß an Diskretion. Ihre persönlichen Informationen sind bei uns sicher.",
      icon: "frank-pneck-003",
    },
    {
      id: "zuverlaessig",
      title: "Zuverlässig",
      // sic: der letzte Satz endet im Original ohne Punkt
      body:
        "Die Verantwortung, die unsere Mandanten uns übertragen, ist uns bewusst. Deshalb legen wir besonders viel Wert darauf, dass Sie sich auf uns verlassen können. Alles, was wir gemeinsam mit Ihnen besprechen, führen wir auch zeitnah durch",
      icon: "frank-pneck-004",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 3 — Abschlussband                                                           */
/* -------------------------------------------------------------------------- */

export const CLOSING_CONTENT: ClosingContent = {
  text:
    "Legen Sie Ihre steuerlichen Angelegenheiten in die Hände von Profis und lehnen Sie sich entspannt zurück!",
  phoneLabel: PRIMARY_PHONE.label,
  phoneHref: PRIMARY_PHONE.href,
};
