// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Abschnitt `#kontakt` — Anschrift, Öffnungszeiten und Formular.
 *
 * ## Warum Kontaktkarte und Formular nebeneinander stehen
 *
 * Wer hierher springt, will eine von zwei Sachen: **jetzt anrufen** oder
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
 * ## Überschriften
 *
 * Das `<h1>` des alten Seitenkopfs ist die `<h2>` dieses Abschnitts, alles
 * darunter rutscht eine Ebene tiefer: „Steuerberater kontaktieren" ist `<h3>`,
 * der Kanzleiname auf der Karte `<h4>`, „Öffnungszeiten" `<h5>` — lückenlos.
 * Die Anfahrt ist bewusst **kein** Kind dieses Abschnitts, sondern ein eigenes
 * Band mit eigenem Anker; sie behält deshalb ihr `<h2>`.
 *
 * ## Bewegung
 *
 * Wort-für-Wort-Reveals tragen nur Eyebrow und Abschnittsüberschrift. Die
 * Inhalte darunter bekommen je ein einziges `<Inview mode="once">` als Block
 * (§2b): Hier kommt jemand mit einem Anliegen an. Eine Telefonnummer, die sich
 * erst aus einer Unschärfe aufbaut, ist kein Auftritt, sondern eine Verzögerung.
 *
 * Das Formular ist der einzige `"use client"`-Leaf; das Band bleibt Server
 * Component (Hausregel #7).
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import {
  CONTACT_CARD,
  FORM_CONTENT,
  HERO_CONTENT,
} from "@/data/kanzlei/kontakt";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { KontaktFormular } from "../kontakt-formular";
import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  FOCUS,
  HEADING,
  SUBHEADING,
} from "./typografie";

/** Wähl- und Mailziel: auf dem Telefon eine Fläche, kein Textabsatz. */
const CONTACT_LINK = `inline-flex min-h-11 w-fit items-center rounded-mark underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent hover:underline ${FOCUS} ${BODY}`;

/** Kaskade in ms — erst die Kontaktdaten, dann das Formular. */
const ENTRY_DELAY = { card: 0, form: 140 };

export const Kontakt = () => (
  <section
    id="kontakt"
    aria-labelledby="kontakt-heading"
    className={`bg-background px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      <div className="flex flex-col gap-5">
        {/* `justify-start` neben `text-left`: der TextEngine-Container ist eine
            Flex-Zeile, `text-align` allein richtet dort nichts aus. */}
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {HERO_CONTENT.eyebrow}
        </TextEngine>
        {/* `hyphens-auto` wegen „Steuerberater" — deutsche Komposita brechen
            sonst aus der Spalte. */}
        <TextEngine
          id="kontakt-heading"
          tag="h2"
          className={`max-w-[45rem] hyphens-auto ${HEADING}`}
          {...HEADING_MOTION}
        >
          {HERO_CONTENT.title}
        </TextEngine>
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="div"
          className="max-w-[38rem]"
        >
          <p className={BODY}>{HERO_CONTENT.lead}</p>
        </Inview>
      </div>

      <section
        id="kontakt-anfrage"
        aria-labelledby="kontakt-anfrage-heading"
        className={`flex flex-col gap-8 lg:gap-12 ${ANCHOR_OFFSET}`}
      >
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {FORM_CONTENT.eyebrow}
          </TextEngine>
          <h3
            id="kontakt-anfrage-heading"
            className={`max-w-[45rem] ${SUBHEADING}`}
          >
            {FORM_CONTENT.title}
          </h3>
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
            <h4 className="text-[1.25rem] leading-display font-light lg:text-[1.5rem]">
              {CONTACT_CARD.companyName}
            </h4>

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
              <h5 className="text-sm leading-body font-medium text-accent uppercase">
                {CONTACT_CARD.openingHoursTitle}
              </h5>
              {/* Echte Tabelle statt zweier Spalten aus `<div>`: die Zeilenköpfe
                  sind Wochentage, und nur so liest ein Screenreader „Freitag —
                  7:30 bis 14:30" statt zweier loser Zellen. */}
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
            <p className={`max-w-[38rem] ${BODY}`}>{FORM_CONTENT.description}</p>
            <KontaktFormular content={FORM_CONTENT} />
          </Inview>
        </div>
      </section>
    </div>
  </section>
);
