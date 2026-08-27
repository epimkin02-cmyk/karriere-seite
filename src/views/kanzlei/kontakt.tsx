// 📖 Docs: obsidian/frontend/components/common.md

/**
 * „Kontakt" — Anschrift, Formular und Anfahrt.
 *
 * ## Warum Kontaktkarte und Formular nebeneinander stehen
 *
 * Wer diese Seite öffnet, will eine von zwei Sachen: **jetzt anrufen** oder
 * **später eine Antwort bekommen**. Beides ist gleich viel wert, also steht
 * beides in einem Band nebeneinander statt untereinander — ein Formular über
 * der Telefonnummer würde die ältere Hälfte der Zielgruppe durch fünf Felder
 * scrollen lassen, bevor sie die Nummer sieht, die sie sucht.
 *
 * Auf dem Telefon (90 % der Besucher, HAUSREGELN §11) stapelt sich das, und dann
 * steht die **Karte zuerst**: Nummer, Adresse und Öffnungszeiten sind drei
 * Bildschirmzentimeter, das Formular ist eine halbe Bildschirmhöhe. Wer tippen
 * will, scrollt gern; wer anrufen will, soll nicht scrollen müssen.
 *
 * Die Karte ist eine `<address>` mit Telefon- und E-Mail-Link darin — das ist
 * genau das Element für die Kontaktdaten des Seiteninhabers — und die
 * Öffnungszeiten sind eine echte `<table>` mit `<th scope="row">`, wie in der
 * Fusszeile: ein Screenreader liest sie dann Zeile für Zeile mit Tagesnamen
 * statt als vierzehn zusammenhanglose Wörter.
 *
 * Überschriften ohne Lücke: `<h1>` im Seitenkopf, `<h2>` je Band, `<h3>` auf der
 * Kontaktkarte, `<h4>` auf den Öffnungszeiten. Die Zwischentitel „Anschrift",
 * „Telefon", „E-Mail" der Fusszeile fehlen hier absichtlich — die Daten kennen
 * sie nicht, und erfundene Zwischenüberschriften wären auf einer Karte mit fünf
 * Zeilen ohnehin mehr Gerüst als Auskunft.
 *
 * ## Bewegung
 *
 * Wort-für-Wort-Reveals tragen nur Eyebrow und Überschrift der drei Bänder. Die
 * Inhalte darunter — Kontaktdaten, Formular, Anfahrtstext — bekommen je ein
 * einziges `<Inview mode="once">` als Block (§2b): Das hier ist die Seite, auf
 * der jemand mit einem Anliegen ankommt. Eine Telefonnummer, die sich erst aus
 * einer Unschärfe aufbaut, ist kein Auftritt, sondern eine Verzögerung.
 *
 * Das Formular ist der einzige `"use client"`-Leaf der Seite; das Band bleibt
 * Server Component (Hausregel #7).
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { StandortKarte } from "@/components/kanzlei/standort-karte";
import {
  CONTACT_CARD,
  DIRECTIONS_CONTENT,
  FORM_CONTENT,
  HERO_CONTENT,
} from "@/data/kanzlei/kontakt";
// Koordinaten und die Texte der Einwilligungsschwelle liegen in den
// Karriere-Inhalten, weil dort die erste Karte stand. Richtig aufgehoben wären
// sie bei der Adresse, also in `firma.ts` — dorthin sollten sie beim nächsten
// Aufräumen umziehen. Nicht jetzt: an den Inhaltsdateien wird parallel
// gearbeitet, und ein Umzug quer durch zwei Datenmodelle kollidiert dort.
import { LOCATION_CONTENT } from "@/data/mocks/karriere";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { KontaktFormular } from "./kontakt-formular";

const EYEBROW =
  "justify-start text-left text-sm leading-body font-medium text-accent uppercase";
const HEADING =
  "justify-start text-left text-[1.875rem] leading-display font-light lg:text-[2.5rem]";
/** §2c der Kanzlei-Regeln: grössere Grundschrift, Zeilenlänge unter ~70 Zeichen. */
const BODY = "text-[1.0625rem] leading-body font-light lg:text-[1.125rem]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
/** Wähl- und Mailziel: auf dem Telefon eine Fläche, kein Textabsatz. */
const CONTACT_LINK = `inline-flex min-h-11 w-fit items-center rounded-mark underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent hover:underline ${FOCUS} ${BODY}`;

/** Kaskade in ms — erst die Kontaktdaten, dann das Formular. */
const ENTRY_DELAY = { card: 0, form: 140 };

const ADDRESS_LINE = `${CONTACT_CARD.address.street}, ${CONTACT_CARD.address.postalCode} ${CONTACT_CARD.address.city}`;

export const Kontakt = () => (
  <>
    <section
      id="einstieg"
      aria-labelledby="einstieg-heading"
      className="rounded-b-section bg-surface-section px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-5 lg:gap-8">
        {/* `justify-start` neben `text-left`: der TextEngine-Container ist eine
            Flex-Zeile, `text-align` allein richtet dort nichts aus. */}
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {HERO_CONTENT.eyebrow}
        </TextEngine>
        {/* Der einzige `<h1>` des Dokuments. `hyphens-auto` wegen
            „Steuerberater" — deutsche Komposita brechen sonst aus der Spalte. */}
        <TextEngine
          id="einstieg-heading"
          tag="h1"
          className="max-w-[45rem] justify-start text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
          {...HEADING_MOTION}
        >
          {HERO_CONTENT.title}
        </TextEngine>
        <TextEngine
          tag="p"
          className={`max-w-[38rem] justify-start text-left ${BODY}`}
          {...BODY_MOTION}
        >
          {HERO_CONTENT.lead}
        </TextEngine>
      </div>
    </section>

    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="bg-background px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {FORM_CONTENT.eyebrow}
          </TextEngine>
          <TextEngine
            id="kontakt-heading"
            tag="h2"
            className={`max-w-[45rem] ${HEADING}`}
            {...HEADING_MOTION}
          >
            {FORM_CONTENT.title}
          </TextEngine>
        </div>

        {/* `items-start`, damit die kurze Datenspalte nicht auf die Höhe des
            Formulars gezogen wird. */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <Inview
            {...ELEMENT_MOTION}
            mode="once"
            delayIn={ENTRY_DELAY.card}
            tag="div"
            className="flex flex-col gap-6 rounded-card bg-surface-section p-6 lg:p-8"
          >
            <h3 className="text-[1.25rem] leading-display font-light lg:text-[1.5rem]">
              {CONTACT_CARD.companyName}
            </h3>

            {/* `<address>` ist das richtige Element für die Kontaktdaten des
                Seiteninhabers — nicht für beliebige Postanschriften im
                Fliesstext. Telefon und E-Mail stehen darin, weil sie dazu
                gehören. */}
            <address className="flex flex-col gap-3 not-italic">
              <span className={BODY}>
                {CONTACT_CARD.address.street}
                <br />
                {CONTACT_CARD.address.postalCode} {CONTACT_CARD.address.city}
              </span>
              {/* Echte `tel:`- und `mailto:`-Links: auf dem Telefon wählt der
                  eine direkt, am Rechner bietet er die Nummer zum Kopieren an. */}
              <a href={CONTACT_CARD.phone.href} className={CONTACT_LINK}>
                {CONTACT_CARD.phone.label}
              </a>
              <a href={CONTACT_CARD.emailHref} className={CONTACT_LINK}>
                {CONTACT_CARD.email}
              </a>
            </address>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm leading-body font-medium text-accent uppercase">
                {CONTACT_CARD.openingHoursTitle}
              </h4>
              {/* Echte Tabelle statt zweier Spalten aus `<div>`: die
                  Zeilenköpfe sind Wochentage, und nur so liest ein Screenreader
                  „Freitag — 7:30 bis 14:30" statt zweier loser Zellen. */}
              <table className="w-full max-w-[24rem] text-[1.0625rem] leading-body font-light">
                <tbody>
                  {CONTACT_CARD.openingHours.map((entry) => (
                    <tr
                      key={entry.day}
                      className="border-b border-border-subtle last:border-0"
                    >
                      <th scope="row" className="py-1.5 text-left font-light">
                        {entry.day}
                      </th>
                      <td
                        className={`py-1.5 text-right ${entry.closed ? "text-foreground-muted" : ""}`}
                      >
                        {entry.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Inview>

          <Inview
            {...ELEMENT_MOTION}
            mode="once"
            delayIn={ENTRY_DELAY.form}
            tag="div"
            className="flex flex-col gap-6"
          >
            <p className={`max-w-[38rem] ${BODY}`}>
              {FORM_CONTENT.description}
            </p>
            <KontaktFormular content={FORM_CONTENT} />
          </Inview>
        </div>
      </div>
    </section>

    <section
      id="anfahrt"
      aria-labelledby="anfahrt-heading"
      className="rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
        {/* Auf `lg` steht die Überschrift links neben dem Fliesstext, damit die
            Textspalte im lesbaren Mass bleibt statt über die Blattbreite zu
            laufen. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-4 lg:w-[22rem] lg:shrink-0">
            <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
              {DIRECTIONS_CONTENT.eyebrow}
            </TextEngine>
            <TextEngine
              id="anfahrt-heading"
              tag="h2"
              className={HEADING}
              {...HEADING_MOTION}
            >
              {DIRECTIONS_CONTENT.title}
            </TextEngine>
          </div>
          <Inview
            {...ELEMENT_MOTION}
            mode="once"
            tag="p"
            className={`max-w-[38rem] ${BODY}`}
          >
            {DIRECTIONS_CONTENT.body}
          </Inview>
        </div>

        <Inview {...ELEMENT_MOTION} mode="once" tag="div">
          <StandortKarte
            title={DIRECTIONS_CONTENT.title}
            coords={LOCATION_CONTENT.coords}
            // Der Routen-Link wird aus der Postanschrift gebaut, nicht aus den
            // Koordinaten — die Adresse ist die verlässlichere Angabe.
            address={ADDRESS_LINE}
            consentTitle={LOCATION_CONTENT.mapConsentTitle}
            consentBody={LOCATION_CONTENT.mapConsentBody}
            consentAction={LOCATION_CONTENT.mapConsentAction}
            routeLabel={LOCATION_CONTENT.routeLabel}
          />
        </Inview>
      </div>
    </section>
  </>
);
