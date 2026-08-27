/**
 * Copy and content for the "Für Private" page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/fuer-private
 * (retrieved 2026-08-27). Body copy is verbatim from that page. Strings the
 * original did not have are marked `// NEU`; original defects are kept and
 * marked `// sic:`.
 *
 * Components take this through props — never by importing this file directly.
 */

import type { CtaLink, ServiceBlock } from "./firma";
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

export interface OverviewContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
}

export interface CatalogueContent {
  eyebrow: string;
  title: string;
  blocks: readonly ServiceBlock[];
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
  eyebrow: "Für Private", // NEU — im Original nur der Navigationspunkt
  title: "Steuerberater für Private",
  lead:
    "Unsere Steuerkanzlei in Pößneck kümmert sich um Ihre Steuererklärung und organisiert alle benötigten Unterlagen für Sie.",
  action: {
    label: "Beratungstermin vereinbaren",
    href: "/kontakt",
  },
};

/* -------------------------------------------------------------------------- */
/* 2 — Überblick                                                               */
/* -------------------------------------------------------------------------- */

export const OVERVIEW_CONTENT: OverviewContent = {
  eyebrow: "Unser Angebot", // NEU
  title: "Moderne Leistungen für unsere Mandanten",
  paragraphs: [
    "Wir prüfen Ihre Steuerbescheide und fertigen die Jahresabschlüsse für unsere Mandanten ebenfalls zuverlässig an. Neben den rechnerischen Abschlüssen zum Ende des Geschäftsjahres werden in unserem Büro auch Zwischenbilanzen und Eröffnungsbilanzen erstellt. Weiterhin sind wir für die saubere Ausarbeitung von Überschussrechnungen gem. § 4(3) EStG sowie für Erläuterungsberichte zuständig.",
    "Vermögensaufstellungen werden wir Ihnen ebenso übersichtlich und klar vorlegen. Dadurch bekommen Sie einen Überblick über Ihre eigene finanzielle Lage. Sonderbilanzen, wie etwa die Liquidationsbilanz, zählen ebenfalls zu unseren Leistungen.",
    "Mithilfe der Abwicklungsbilanz wird unter anderem offengelegt, welche finanziellen Verpflichtungen Sie noch erfüllen müssen.",
    "Die Steuererklärung im Bereich Erben und Schenken stellt uns vor keine Schwierigkeiten. Sowohl bei einem Erbe als auch bei einer Schenkung kann es dazu kommen, dass eine Steuer vom Finanzamt erhoben wird. Wir sorgen dafür, dass Sie das erhaltene Vermögen korrekt versteuern. Dem Finanzamt übermitteln wir zudem sämtliche Umsatzsteuervoranmeldungen – sorgfältig, komplett und strukturiert.",
  ],
};

/* -------------------------------------------------------------------------- */
/* 3 — Leistungskatalog                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Three blocks, five bullets, in the source's order.
 *
 * Note on `steuererklaerungen-2`: in the source that line is the only bullet
 * on the whole site rendered WITHOUT the ✔ glyph its siblings carry. The text
 * is reproduced as-is; whether the missing tick is intentional is a question
 * for the client. Render all three uniformly unless told otherwise.
 */
export const SERVICE_BLOCKS: readonly ServiceBlock[] = [
  {
    id: "steuererklaerungen",
    title: "Steuererklärungen",
    items: [
      { id: "steuererklaerungen-1", text: "Einkommensteuererklärung" },
      // sic: im Original ohne das ✔-Zeichen, das alle anderen Punkte tragen
      {
        id: "steuererklaerungen-2",
        text: "Gesonderte und einheitliche Feststellungserklärung",
      },
      { id: "steuererklaerungen-3", text: "Umsatzsteuererklärungen" },
    ],
  },
  {
    id: "schenken-und-erben",
    title: "Schenken und Erben",
    items: [
      {
        id: "schenken-und-erben-1",
        text: "Erstellung von Schenkungs- und Erbschaftssteuererklärungen",
      },
    ],
  },
  {
    id: "existenzgruendung",
    title: "Existenzgründung",
    items: [{ id: "existenzgruendung-1", text: "Steuerliche Beratung" }],
  },
];

export const CATALOGUE_CONTENT: CatalogueContent = {
  eyebrow: "Leistungen", // NEU
  title: "Unser Leistungsangebot für Privatpersonen", // NEU — das Original hat über dem Katalog keine Überschrift
  blocks: SERVICE_BLOCKS,
};

/* -------------------------------------------------------------------------- */
/* 4 — Abschlussband                                                           */
/* -------------------------------------------------------------------------- */

export const CLOSING_CONTENT: ClosingContent = {
  text:
    "Rufen Sie uns an und erhalten Sie qualifizierte Hilfe bei Ihrer nächsten Steuererklärung!",
  phoneLabel: PRIMARY_PHONE.label,
  phoneHref: PRIMARY_PHONE.href,
};
