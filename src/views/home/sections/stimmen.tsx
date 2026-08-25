// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Stimmen — das Zitat einer Kollegin oder eines Kollegen.
 *
 * Die ruhigste Sektion der Seite und die einzige, die genau eine Sache zeigt.
 * Alles ist zentriert und einspaltig, das Band bekommt mehr vertikale Luft als
 * seine Nachbarn: nach der Entscheidungsdichte der Stellen-Karten soll hier
 * nichts konkurrieren, damit die Zeile eines Menschen für sich stehen kann.
 *
 * Weißes Band, weil die Alternation der Bänder die Struktur der Seite trägt und
 * ein Zitat ohne Fläche darunter am leisesten wirkt.
 *
 * Das Markup ist bewusst `figure`/`blockquote`/`figcaption` und keine
 * Div-Konstruktion — die Zuordnung „dieser Satz stammt von dieser Person" ist
 * hier die eigentliche Aussage und gehört damit ins Dokument, nicht nur in die
 * Optik.
 *
 * > Warum `BODY_MOTION` auf einem so großen Text
 * > Die Zeile ist Fließtext in Display-Größe, kein Heading. `HEADING_MOTION`
 * > würde sie mit dem Sektions-`h2` darüber auf eine Ebene stellen und beide
 * > Reveals gegeneinander laufen lassen.
 *
 * > Warum eine Maximalbreite von 48rem
 * > Der Wortlaut ist noch ein sichtbar markierter Platzhalter (`[PLATZHALTER —
 * > …]`, Absicht des Kunden). Der echte Satz kommt mit 40–60 Wörtern nach, und
 * > über die volle Seitenbreite wären das bei dieser Schriftgröße unlesbar
 * > lange Zeilen. Die Kappung hält die Zeilenlänge in beiden Zuständen im
 * > Lesebereich, ohne den Platzhalter zu kaschieren.
 */

import Image from "next/image";

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { TestimonialContent } from "@/data/mocks/home";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

export interface StimmenProps {
  content: TestimonialContent;
}

/** Kaskade, falls später mehr als ein Zitat nachkommt. */
const QUOTE_DELAY_STEP = 140;

/** 96px — groß genug, um ein Gesicht zu sein, klein genug, um dem Satz nicht die Show zu stehlen. */
const PORTRAIT_SIZE = 96;

export const Stimmen = ({ content }: StimmenProps) => (
  <section
    id="stimmen"
    aria-labelledby="stimmen-heading"
    className="relative bg-background px-5 py-28 md:px-10 lg:py-44"
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col items-center gap-14 lg:gap-20">
      {/* `justify-center` neben `text-center`: TextEngine legt die Wörter als
          Flex-Items aus, Textausrichtung allein bewegt darin nichts. */}
      <div className="flex w-full flex-col items-center gap-4 text-center lg:gap-6">
        <TextEngine
          tag="p"
          className="w-full justify-center text-center text-sm leading-body font-medium text-accent uppercase"
          {...EYEBROW_MOTION}
        >
          {content.eyebrow}
        </TextEngine>
        <TextEngine
          id="stimmen-heading"
          tag="h2"
          className="w-full justify-center text-center text-[2.25rem] leading-display font-light md:text-[3rem] lg:w-[45rem] lg:text-6xl"
          {...HEADING_MOTION}
        >
          {content.title}
        </TextEngine>
      </div>

      {/* Aktuell genau ein Eintrag, gestaltet für genau einen. Mehrere stehen
          untereinander mit so viel Abstand, dass sie sich nicht als Liste
          lesen, sondern als einzelne Stimmen. */}
      <div className="flex w-full flex-col items-center gap-24 lg:gap-32">
        {content.quotes.map((quote, index) => (
          // `mode` nach dem Spread: ELEMENT_MOTION bringt `mode: "always"` mit
          // und würde das hier gewünschte "once" sonst still überschreiben.
          <Inview
            key={quote.name}
            {...ELEMENT_MOTION}
            tag="figure"
            delayIn={index * QUOTE_DELAY_STEP}
            className="flex w-full max-w-[48rem] flex-col items-center gap-8 lg:gap-10"
          >
            {/* Ohne Portrait bleibt die Stelle leer statt einen Platzhalter-
                kreis zu zeigen: die Sektion ist zentriert und einspaltig, sie
                ist auch ohne Bild ausgewogen. Ein leerer Kreis wäre eine
                Behauptung, dass etwas fehlt. */}
            {quote.image && (
              <Image
                src={quote.image}
                alt={quote.name}
                width={PORTRAIT_SIZE}
                height={PORTRAIT_SIZE}
                className="size-24 rounded-full object-cover"
              />
            )}

            {/* Rein dekorativ und deshalb aus dem Screenreader-Baum genommen —
                vorgelesen wäre es nur Rauschen vor dem eigentlichen Satz. Als
                Vektor statt als Schriftzeichen, damit im Komponentenfile kein
                sichtbarer String steht (harte Regel #12). */}
            <svg
              viewBox="0 0 60 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              className="h-8 w-[3rem] text-accent/25 lg:h-10 lg:w-[3.75rem]"
            >
              <path fill="currentColor" d="M0 0H24V24H12L0 40Z" />
              <path fill="currentColor" d="M36 0H60V24H48L36 40Z" />
            </svg>

            {/* `lang` sitzt auf dem Blockquote, `hyphens-auto` auf der Engine:
                deutsche Komposita in dieser Schriftgröße brechen sonst über die
                Kante der 390px-Spalte. */}
            <blockquote lang="de" className="w-full">
              <TextEngine
                tag="p"
                className="w-full justify-center text-center text-[1.75rem] leading-display font-light hyphens-auto md:text-[2.25rem] lg:text-[2.5rem]"
                {...BODY_MOTION}
              >
                {quote.quote}
              </TextEngine>
            </blockquote>

            {/* Statisch: die Zuschreibung ist Meta zum Satz, kein zweiter
                Auftritt — ein eigener Reveal würde sie dazu machen. */}
            <figcaption className="flex flex-col items-center gap-1 text-center">
              <span className="text-base leading-body font-medium">
                {quote.name}
              </span>
              <span className="text-sm leading-body font-light text-foreground-muted">
                {quote.role}
              </span>
            </figcaption>
          </Inview>
        ))}
      </div>
    </div>
  </section>
);
