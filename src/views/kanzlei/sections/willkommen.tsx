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

import { ANCHOR_OFFSET, BODY, HEADING } from "./typografie";

export const Willkommen = () => (
  <section
    id="willkommen"
    aria-labelledby="willkommen-heading"
    className={`bg-background px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-6 lg:flex-row lg:gap-16">
      <TextEngine
        id="willkommen-heading"
        tag="h2"
        className={`${HEADING} lg:w-[22rem] lg:shrink-0`}
        {...HEADING_MOTION}
      >
        {HERO_CONTENT.pageTitle}
      </TextEngine>
      {/* Ein `<Inview>` für den Block, und der Absatz ohne TextEngine (§2b):
          ein Begrüssungstext dieser Länge, der sich Wort für Wort aus einer
          Unschärfe aufbaut, ist Unruhe statt Auftritt. */}
      <Inview {...ELEMENT_MOTION} mode="once" tag="div" className="max-w-[38rem]">
        <p className={BODY}>{HERO_CONTENT.intro}</p>
      </Inview>
    </div>
  </section>
);
