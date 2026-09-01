// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Willkommensband `#willkommen` — der Begrüssungstext der Startseite.
 *
 * ## Warum „Ihr Steuerberater in Pößneck" zweimal dasteht
 *
 * Das Original druckt den Satz zweimal: einmal als Schlagzeile des Hero-Bandes
 * (`title`) und einmal als Überschrift des Seitentextes (`pageTitle`). Beide
 * Zeichenketten stehen so in den Daten und werden nicht umformuliert. Damit die
 * Wiederholung nicht als Fehler liest, bekommen die beiden Vorkommen
 * unterschiedliche Rollen: im Hero die grosse `<h1>`, hier eine zurückgenommene
 * `<h2>` in der linken Spalte neben dem Fliesstext — dort wirkt sie als
 * Spaltenbeschriftung und nicht als zweite Schlagzeile.
 *
 * Die Überschrift steht links *neben* dem Text statt darüber: das hält die
 * Textspalte bei ~38rem, also im lesbaren Mass.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { HERO_CONTENT } from "@/data/kanzlei/startseite";
import { ELEMENT_MOTION, HEADING_MOTION } from "@/lib/motion/text-presets";

import { Bild } from "./bild";
import { FOTOS } from "./fotos";
import {
  ANCHOR_OFFSET,
  BODY,
  HEADING,
  PROSA_FLIESSEND,
} from "./typografie";

export const Willkommen = () => (
  <section
    id="willkommen"
    aria-labelledby="willkommen-heading"
    className={`bg-background px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-14">
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
      <TextEngine
        id="willkommen-heading"
        tag="h2"
        className={`${HEADING} lg:w-[22rem] lg:shrink-0`}
        {...HEADING_MOTION}
      >
        {HERO_CONTENT.pageTitle}
      </TextEngine>
      {/* `lg:pt-1.5` richtet Überschrift und Fliesstext auf eine Höhe.
          Ausgemessen: die Versalhöhe des Absatzes lag 5,5 px über der der
          Überschrift. Beide Kästen beginnen bei derselben Y-Koordinate — der
          Versatz kommt allein aus dem Durchschuss, der bei 40 px Schrift mit
          44 px Zeilenhöhe deutlich enger sitzt als bei 18 px mit 21,6 px. Die
          Kästen bündig zu stellen heisst hier eben nicht, dass die Schrift
          bündig steht.

          6 px statt der gemessenen 5,5 — ein halber Pixel Versatz ist nicht zu
          sehen, ein Wert ausserhalb der Abstandsskala des Systems dagegen
          irgendwann schon.

          Ein `<Inview>` für den Block, und der Absatz ohne TextEngine (§2b):
          ein Begrüssungstext dieser Länge, der sich Wort für Wort aus einer
          Unschärfe aufbaut, ist Unruhe statt Auftritt. */}
      <Inview
        {...ELEMENT_MOTION}
        mode="once"
        tag="div"
        className={`lg:flex-1 lg:pt-1.5 ${PROSA_FLIESSEND}`}
      >
        <p className={BODY}>{HERO_CONTENT.intro}</p>
      </Inview>
    </div>

      {/* Das erste Foto der Seite, direkt unter der Begrüssung: bis hierher war
          alles über der Falz Typografie und eine abstrakte Grafik. Der Empfang
          beantwortet die Frage „wo lande ich da eigentlich?" schneller als der
          Absatz darüber — und er ist buchstäblich das Erste, was jemand sieht,
          der die Treppe hochkommt. */}
      <Bild foto={FOTOS.empfang} />
    </div>
  </section>
);
