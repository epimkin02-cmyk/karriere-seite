/**
 * Copy and content for the "Für Unternehmen" page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://www.kutscher-stb.de/fuer-unternehmen
 * (retrieved 2026-08-27). Body copy is verbatim from that page. Strings the
 * original did not have are marked `// NEU`. Original errors are kept
 * unchanged and marked `// sic:`.
 *
 * `SERVICE_BLOCKS` is the heart of this page: ten blocks, 51 bullet points,
 * in the source's order. Two of its bullets carry defects that must survive a
 * round trip — one duplicate line and one unclosed parenthesis. Both are
 * annotated below. Render bullets by `item.id`, never by `item.text`: the
 * duplicate would otherwise collide as a React key.
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

/** The prose section between the hero and the catalogue. */
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
  eyebrow: "Für Unternehmen", // NEU — im Original nur der Navigationspunkt
  title: "Steuerberater für Unternehmen in Pößneck und Umgebung",
  // sic: „Wir betreuen Sie uns Ihr Unternehmen" — Fehler im Original
  lead:
    "Wir betreuen Sie uns Ihr Unternehmen fachgerecht und kompetent in allen Steuerfragen.",
  action: {
    label: "Jetzt beraten lassen",
    href: "/kontakt",
  },
};

/* -------------------------------------------------------------------------- */
/* 2 — Überblick                                                               */
/* -------------------------------------------------------------------------- */

export const OVERVIEW_CONTENT: OverviewContent = {
  eyebrow: "Unsere Arbeitsweise", // NEU
  title: "Qualifizierte Steuerberatung für Unternehmen",
  paragraphs: [
    "Wir begleiten und betreuen Sie unter anderem bei einer Betriebsprüfung. Unsere Aufgaben bestehen darin, Ihre Firma auf die Prüfung durch das Finanzamt vorzubereiten und für die Einhaltung Ihrer Mitwirkungspflichten zu sorgen.",
    "Nach Abschluss der steuerlichen Prüfung vertreten wir Sie gern bei der Besprechung mit der Behörde. Nicht nur bei Betriebsprüfungen stehen wir an Ihrer Seite, sondern auch im Fall von Einsprüchen, Beschwerden und Widersprüchen – etwa bei Steuerstrafsachen und Ordnungswidrigkeiten – können Sie auf unsere Unterstützung vertrauen.",
    "Landet Ihre steuerliche Angelegenheit vor dem Finanzgericht oder dem Bundesfinanzhof, erbringen wir ebenfalls vertrauensvolle Leistungen für eine optimale Vertretung.",
    "Im Rahmen der betriebswirtschaftlichen Beratung entwickeln wir für unsere Geschäftskunden beispielsweise abgestimmte Strategien für eine effiziente Führung der Firma oder Erreichung der gesetzten Ziele. Weiter erstellen wir Liquidationspläne, Kosten- und Leistungsrechnungen und Investitionspläne. Steht Ihr Unternehmen vor einer Umstrukturierung oder einem Wechsel der Geschäftsführung, sind wir ein erstklassiger Ansprechpartner.",
  ],
};

/* -------------------------------------------------------------------------- */
/* 3 — Leistungskatalog                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Ten blocks, 51 bullets, in the source's order.
 *
 * Ids are `<block>-<n>` and are assigned by position, so a repeated `text`
 * still yields a unique, stable key.
 */
export const SERVICE_BLOCKS: readonly ServiceBlock[] = [
  {
    id: "finanzbuchfuehrung",
    title: "Finanzbuchführung",
    items: [
      { id: "finanzbuchfuehrung-1", text: "Erstellung der Finanzbuchführung (DATEV)" },
      { id: "finanzbuchfuehrung-2", text: "Erstellung der Umsatzsteuervoranmeldungen" },
      { id: "finanzbuchfuehrung-3", text: "Betriebs- und Branchenvergleiche" },
      { id: "finanzbuchfuehrung-4", text: "Digitales Belegbuchen (Unternehmen Online)" },
      { id: "finanzbuchfuehrung-5", text: "Unterstützung von Selbstbuchern" },
    ],
  },
  {
    id: "lohnbuchfuehrung",
    title: "Lohnbuchführung",
    items: [
      { id: "lohnbuchfuehrung-1", text: "Erstellung der monatlichen Gehaltsabrechnungen" },
      {
        id: "lohnbuchfuehrung-2",
        // sic: schließende Klammer fehlt im Original
        text: "Mitwirkung bei Betriebsprüfungen (Finanzamt/Sozialversicherung",
      },
      { id: "lohnbuchfuehrung-3", text: "Meldungen Berufsgenossenschaft" },
      { id: "lohnbuchfuehrung-4", text: "Lohnabrechnungen" },
      { id: "lohnbuchfuehrung-5", text: "Probeabrechnungen" },
      { id: "lohnbuchfuehrung-6", text: "Lohnersatzbescheinigungen" },
      { id: "lohnbuchfuehrung-7", text: "Lohnfortzahlungsberechnung" },
      {
        id: "lohnbuchfuehrung-8",
        text: "Kommunikation mit Krankenkasse, Versorgungswerk, Finanzämtern und Behörden",
      },
      // sic: im Original doppelt — identisch mit lohnbuchfuehrung-3
      { id: "lohnbuchfuehrung-9", text: "Meldungen Berufsgenossenschaft" },
      { id: "lohnbuchfuehrung-10", text: "Insolvenzgeldberechnungen" },
      {
        id: "lohnbuchfuehrung-11",
        text: "Mitwirkung bei Prüfungen der Deutschen RV und LSt-Außenprüfung",
      },
    ],
  },
  {
    id: "jahresabschluss",
    title: "Jahresabschluss und Steuererklärungen",
    items: [
      {
        id: "jahresabschluss-1",
        text: "Aufstellung und Mitwirkung bei der Erstellung handels- und steuerrechtlicher Jahresabschlüsse und Zwischenbilanzen",
      },
      { id: "jahresabschluss-2", text: "Eröffnungsbilanzen" },
      {
        id: "jahresabschluss-3",
        text: "Jahresabschlüsse für Einzelfirmen, Personen- und Kapitalgesellschaften sowie Vereine",
      },
      { id: "jahresabschluss-4", text: "Überschussrechnungen gem. § 4 (3) EStG" },
      { id: "jahresabschluss-5", text: "Vermögensaufstellungen" },
      { id: "jahresabschluss-6", text: "Liquidationsbilanzen" },
      { id: "jahresabschluss-7", text: "Erläuterungsberichte" },
      { id: "jahresabschluss-8", text: "Elektronische Offenlegung" },
    ],
  },
  {
    id: "betriebswirtschaftliche-beratung",
    title: "Betriebswirtschaftliche Beratung",
    items: [
      { id: "betriebswirtschaftliche-beratung-1", text: "Kosten- und Leistungsrechnung" },
      { id: "betriebswirtschaftliche-beratung-2", text: "Erarbeitung von Strategien" },
      { id: "betriebswirtschaftliche-beratung-3", text: "Erstellung von Liquidationsplänen" },
      { id: "betriebswirtschaftliche-beratung-4", text: "Unternehmensplanung" },
      {
        id: "betriebswirtschaftliche-beratung-5",
        text: "Steuerliche und betriebswirtschaftliche Beratung im Zusammenhang mit Investitionsentscheidungen",
      },
    ],
  },
  {
    id: "wirtschaftsberatung",
    title: "Wirtschaftsberatung",
    items: [{ id: "wirtschaftsberatung-1", text: "Unternehmensbewertungen" }],
  },
  {
    id: "existenzgruendung",
    title: "Existenzgründung",
    items: [
      { id: "existenzgruendung-1", text: "Mitwirkung Erstellung Businessplan" },
      { id: "existenzgruendung-2", text: "Beratung zur steuerlichen Rechtsformwahl" },
      { id: "existenzgruendung-3", text: "Gründungsformalitäten" },
      { id: "existenzgruendung-4", text: "Unterstützung bei Kreditverhandlungen" },
      {
        id: "existenzgruendung-5",
        text: "Investitions-, Finanzierungs- und Liquiditätspläne",
      },
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
    id: "generationsnachfolge",
    title: "Generationsnachfolge",
    items: [
      { id: "generationsnachfolge-1", text: "Unternehmenssicherung" },
      { id: "generationsnachfolge-2", text: "Betriebsübergang" },
      { id: "generationsnachfolge-3", text: "Erbauseinandersetzung" },
      {
        id: "generationsnachfolge-4",
        text: "Gestaltung und Steueroptimierung bei Betriebsübertragungen",
      },
      { id: "generationsnachfolge-5", text: "Umstrukturierung und Umwandlung" },
      { id: "generationsnachfolge-6", text: "Stiftung" },
    ],
  },
  {
    id: "betriebspruefung",
    title: "Betriebsprüfung",
    items: [
      {
        id: "betriebspruefung-1",
        text: "Unterstützung und Beratung bei der Erfüllung von Mitwirkungspflichten",
      },
      { id: "betriebspruefung-2", text: "Vertretung in der Schlussbesprechung" },
    ],
  },
  {
    id: "vertretung-vor-finanzbehoerden",
    title: "Vertretung vor Finanzbehörden",
    items: [
      {
        id: "vertretung-vor-finanzbehoerden-1",
        text: "Einsprüche, Widersprüche und Beschwerden",
      },
      {
        id: "vertretung-vor-finanzbehoerden-2",
        text: "Vertretung vor dem Finanzgericht",
      },
      {
        id: "vertretung-vor-finanzbehoerden-3",
        text: "Hilfeleistung in Steuerstrafsachen und Ordnungswidrigkeiten",
      },
    ],
  },
];

export const CATALOGUE_CONTENT: CatalogueContent = {
  eyebrow: "Leistungen", // NEU
  title: "Unser Leistungsangebot für Unternehmen", // NEU — das Original hat über dem Katalog keine Überschrift
  blocks: SERVICE_BLOCKS,
};

/* -------------------------------------------------------------------------- */
/* 4 — Abschlussband                                                           */
/* -------------------------------------------------------------------------- */

export const CLOSING_CONTENT: ClosingContent = {
  text: "Lassen Sie Ihr Unternehmen in allen Steuerfragen optimal betreuen!",
  phoneLabel: PRIMARY_PHONE.label,
  phoneHref: PRIMARY_PHONE.href,
};
