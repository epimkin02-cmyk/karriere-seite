// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Band `#kernkompetenzen` — die vier Alleinstellungsmerkmale.
 *
 ## Die vier Karten tragen jetzt Zeichen statt Ziffern
 *
 * Lange stand hier eine Ordnungszahl, weil `FeatureCard.icon` zwar einen
 * Dateinamen trug (`frank-pneck-001` …), die Dateien aber nicht existierten.
 * Seit dem 01.09. liegen vier Strichzeichnungen vor, und sie ersetzen die
 * Ziffer — nicht sie ergänzen: eine Karte mit Zeichen *und* Zähler hätte zwei
 * Anker um dieselbe Aufmerksamkeit konkurrieren lassen.
 *
 * **Zugeordnet wird über `card.id`, nicht über die Position.** Die
 * Reihenfolge im Datenarray kann sich ändern, die Kennung nicht — und ein
 * Herz-Symbol über „Zuverlässig" wäre der Fehler, den bei einer Umsortierung
 * niemand bemerkt. Der Pfad in `card.icon` bleibt dabei ungelesen: er zeigt auf
 * Dateien, die es nie gab, und an den Datendateien wird nichts geändert
 * (HAUSREGELN-KANZLEI §3).
 *
 * Die Zeichen sind `alt=""` — sie illustrieren die Überschrift daneben und
 * tragen keine eigene Information. Die Reihenfolge sagt die `<ol>` einer
 * Vorlesefunktion ohnehin an.
 *
 * ## Die Vorlagen sind beschnitten, nicht bloss verkleinert
 *
 * Geliefert wurden sie als 1254 px grosse PNG mit unterschiedlich viel Luft um
 * das Motiv. Ungeschnitten nebeneinander gestellt wirken vier gleich grosse
 * Kacheln dadurch **verschieden gross** — das Schild füllte seinen Rahmen, die
 * Person schwamm darin. Sie sind deshalb auf ihren sichtbaren Inhalt
 * beschnitten, wieder quadratisch aufgefüllt und auf 256 px gerechnet.
 */

import Image from "next/image";
import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { FEATURES_CONTENT } from "@/data/kanzlei/startseite";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { ANCHOR_OFFSET, BODY, EYEBROW, HEADING } from "./typografie";

/**
 * Zeichen je Karte, zugeordnet über `card.id` aus den Inhaltsdaten.
 *
 * Eine Karte ohne Eintrag bekommt kein Zeichen und keinen Ersatz — die
 * Überschrift trägt die Karte auch allein.
 */
const ZEICHEN: Partial<Record<string, string>> = {
  "persoenliche-betreuung": "/assets/kanzlei/persoenliche-betreuung.png",
  "individuelle-beratung": "/assets/kanzlei/individuelle-beratung.png",
  professionell: "/assets/kanzlei/professionell.png",
  zuverlaessig: "/assets/kanzlei/zuverlaessig.png",
};

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
          Auf `lg` zwei Spalten, **ohne** `items-start`: die Karten strecken
          sich damit auf die Höhe der höchsten ihrer Zeile. Vorher stand dort
          `items-start`, mit der Begründung, ein langer Text solle die
          Nachbarkarte nicht mitwachsen lassen — sichtbar war davon aber vor
          allem, dass zwei nebeneinanderliegende Karten unterschiedlich weit
          nach unten reichten (gemessen 236 gegen 258 px). Eine Kante, die
          nicht durchläuft, fällt mehr auf als etwas Weissraum in der kürzeren
          Karte. */}
      <Inview
        {...ELEMENT_MOTION}
        mode="once"
        tag="ol"
        className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2"
      >
        {FEATURES_CONTENT.cards.map((card) => (
          <li
            key={card.id}
            className="flex flex-col gap-3 rounded-card border border-border-subtle bg-background px-6 py-7"
          >
            {ZEICHEN[card.id] ? (
              <Image
                src={ZEICHEN[card.id]!}
                alt=""
                width={256}
                height={256}
                sizes="56px"
                className="mb-1 size-12 lg:size-14"
              />
            ) : null}
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
