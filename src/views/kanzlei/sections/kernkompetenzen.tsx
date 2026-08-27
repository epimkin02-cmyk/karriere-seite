// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Band `#kernkompetenzen` — die vier Alleinstellungsmerkmale.
 *
 * ## Die vier Karten ohne Bild
 *
 * `FeatureCard.icon` trägt einen Dateinamen (`frank-pneck-001` …), **die Dateien
 * existieren aber nicht** unter `public/assets/kanzlei/`. Ein `next/image` auf
 * einen fehlenden Pfad ist im Build kein Fehler, sondern erst zur Laufzeit ein
 * kaputtes Bild plus ein 404 je Karte — auf einer Seite mit
 * Barrierefreiheitssiegel der schlechteste denkbare Tausch. Die Karten sind
 * deshalb rein typografisch: eine Ordnungszahl, der Titel als `<h3>`, der Text
 * darunter. Das Feld bleibt in den Daten stehen (die Datendateien werden nicht
 * angefasst) und wird hier bewusst nicht gelesen; sobald die Bilder geliefert
 * sind, ist die Karte die eine Stelle, die es dafür zu ändern gilt.
 *
 * Die Ziffer ist `aria-hidden`: die `<ol>` sagt einer Vorlesefunktion die
 * Position ohnehin an, vorgelesen wäre sie eine Dopplung ohne Bezugswort.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { FEATURES_CONTENT } from "@/data/kanzlei/startseite";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { ANCHOR_OFFSET, BODY, EYEBROW, HEADING } from "./typografie";

export const Kernkompetenzen = () => (
  <section
    id="kernkompetenzen"
    aria-labelledby="kernkompetenzen-heading"
    className={`rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
      <div className="flex flex-col gap-4">
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {FEATURES_CONTENT.eyebrow}
        </TextEngine>
        <TextEngine
          id="kernkompetenzen-heading"
          tag="h2"
          className={`max-w-[45rem] ${HEADING}`}
          {...HEADING_MOTION}
        >
          {FEATURES_CONTENT.title}
        </TextEngine>
        <p className={`max-w-[38rem] ${BODY}`}>{FEATURES_CONTENT.description}</p>
      </div>

      {/* `<ol>`, weil die Ziffern eine Ordnung behaupten — eine Vorlesefunktion
          kündigt sie dann als „Liste mit 4 Einträgen" an und zählt selbst mit.
          Auf `lg` zwei Spalten mit `items-start`, damit die unterschiedlich
          langen Texte die Nachbarkarte nicht mitwachsen lassen. */}
      <Inview
        {...ELEMENT_MOTION}
        mode="once"
        tag="ol"
        className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2 lg:items-start"
      >
        {FEATURES_CONTENT.cards.map((card, index) => (
          <li
            key={card.id}
            className="flex flex-col gap-3 rounded-card border border-border-subtle bg-background px-6 py-7"
          >
            <span
              aria-hidden="true"
              className="text-sm leading-body font-medium text-accent"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* Kartentitel bleiben statisch — `HEADING_MOTION` gehört den
                Sektionsüberschriften. */}
            <h3 className="text-[1.25rem] leading-display font-light lg:text-[1.5rem]">
              {card.title}
            </h3>
            <p className={`max-w-[38rem] ${BODY}`}>{card.body}</p>
          </li>
        ))}
      </Inview>
    </div>
  </section>
);
