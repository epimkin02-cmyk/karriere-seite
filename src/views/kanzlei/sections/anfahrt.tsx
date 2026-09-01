// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Band `#anfahrt` — Wegbeschreibung und Zwei-Klick-Karte.
 *
 * Ein eigener Abschnitt neben `#kontakt` und kein Kind davon: „Wie erreiche ich
 * die?" und „Wo sind die?" sind zwei Fragen, und die Navigation soll für die
 * zweite ein eigenes Ziel haben. Deshalb behält die Überschrift ihre `<h2>` und
 * rutscht nicht wie die Inhalte der übernommenen Seitenköpfe eine Ebene tiefer.
 *
 * Die Karte lädt erst nach Einwilligung — `StandortKarte` bringt die Schwelle
 * mit, und ihre Texte liegen bei den Karriere-Inhalten, weil dort die erste
 * Karte stand.
 *
 * Auf `lg` steht die Überschrift links neben dem Fliesstext, damit die
 * Textspalte im lesbaren Mass bleibt statt über die Blattbreite zu laufen.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { StandortKarte } from "@/components/kanzlei/standort-karte";
import { CONTACT_CARD, DIRECTIONS_CONTENT } from "@/data/kanzlei/kontakt";
// Koordinaten und die Texte der Einwilligungsschwelle liegen in den
// Karriere-Inhalten, weil dort die erste Karte stand. Richtig aufgehoben wären
// sie bei der Adresse, also in `firma.ts` — dorthin sollten sie beim nächsten
// Aufräumen umziehen. Nicht jetzt: an den Inhaltsdateien wird parallel
// gearbeitet, und ein Umzug quer durch zwei Datenmodelle kollidiert dort.
import { LOCATION_CONTENT } from "@/data/mocks/karriere";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  HEADING,
  PROSA_FLIESSEND,
} from "./typografie";

const ADDRESS_LINE = `${CONTACT_CARD.address.street}, ${CONTACT_CARD.address.postalCode} ${CONTACT_CARD.address.city}`;

export const Anfahrt = () => (
  <section
    id="anfahrt"
    aria-labelledby="anfahrt-heading"
    className={`rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
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
          className={`lg:flex-1 ${BODY} ${PROSA_FLIESSEND}`}
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
          // Vom Kunden so gewünscht: die Karte soll ohne Klick zu sehen sein.
          // Was das rechtlich bedeutet, steht an der Prop in [[StandortKarte]].
          autoLoad
          // Der Abschnitt ist für nichts anderes da als für den Weg hierher —
          // die Karte füllt ihn deshalb, statt als Streifen darin zu liegen.
          gross
        />
      </Inview>
    </div>
  </section>
);
