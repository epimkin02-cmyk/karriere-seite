// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * 17 gute Gründe — die Leistungen der Kanzlei als ziehbare Kartenspur.
 *
 * Siebzehn Punkte sind zu viele für ein Raster: untereinander gestapelt wären
 * sie eine Wand, die niemand liest, und aufgeteilt in Spalten verlieren sie die
 * Reihenfolge. Als Spur bleibt jeder Punkt eine eigene kleine Karte, die Menge
 * selbst wird zum Argument („da kommt ja noch was"), und das Ziehen ist die
 * Einladung, weiterzuschauen. Deshalb sind die Karten bewusst schmal und rein
 * typografisch — ein Vorteil pro Karte, nichts drumherum.
 *
 * Ein `<ul>`: die siebzehn Gründe sind gleichrangige Punkte einer Aufzählung,
 * keine Abfolge. Die Abschlusskarte hängt bewusst mit in der Liste — sie ist
 * der achtzehnte Punkt („und wenn dir etwas fehlt"), nicht ein Anhang daneben.
 *
 * Mint-Band mit `rounded-section` gegen die weißen Nachbarbänder. Die Sektion
 * ist **nicht** `sticky`: die Overlay-Kette der Seite ist aufgelöst, sie ist ein
 * normales Band mit eigener vertikaler Polsterung.
 *
 * Die Spur läuft ohne rechte Begrenzung aus dem Bild — abgeschnittene Karten
 * sagen „hier geht es weiter", eine bündige Kante sagt „hier ist Schluss".
 * Deshalb trägt nur der Kopfblock die Maximalbreite, die Spur nimmt die volle
 * Bandbreite und hält nur links die Seitengasse.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Button } from "@/components/ui/button";
import type { ReasonsContent } from "@/data/mocks/home";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { GruendeRail } from "./gruende-rail";

/** Die Spur kommt nach dem Kopfblock herein, nicht mit ihm. */
const RAIL_DELAY = 140;

/**
 * Gemeinsame Kartenhöhe. Feste Höhe statt `stretch`, damit die Spur eine
 * saubere Ober- und Unterkante hat; das Maß kommt von der Abschlusskarte, der
 * einzigen mit Fließtext und Button.
 */
const CARD_HEIGHT = "h-[14rem] lg:h-[15rem]";

export interface GruendeProps {
  content: ReasonsContent;
}

export const Gruende = ({ content }: GruendeProps) => (
  <section
    id="gruende"
    aria-labelledby="gruende-heading"
    className="relative rounded-section bg-surface-section py-20 lg:py-32"
  >
    {/* `justify-start` neben `text-left`: TextEngines Container ist eine
        Flex-Reihe, text-align allein richtet dort nichts aus. */}
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-4 px-5 md:px-10 lg:gap-6">
      <TextEngine
        tag="p"
        className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
        {...EYEBROW_MOTION}
      >
        {content.eyebrow}
      </TextEngine>
      <TextEngine
        id="gruende-heading"
        tag="h2"
        className="justify-start text-left text-[2.25rem] leading-display font-light md:text-[3rem] lg:w-[45rem] lg:text-6xl"
        {...HEADING_MOTION}
      >
        {content.title}
      </TextEngine>
    </div>

    <Inview
      {...ELEMENT_MOTION}
      tag="div"
      delayIn={RAIL_DELAY}
      className="mt-10 lg:mt-16"
    >
      {/* Der Name der Spur ist das Sektions-Heading — kein zweiter Text, der
          gepflegt werden müsste. */}
      <GruendeRail label={content.title}>
        {content.reasons.map((reason) => (
          // `lang`/`hyphens-auto`: „Mitarbeiterrekrutierung" ist breiter als
          // die Karte und würde sie sonst sprengen statt umzubrechen.
          <li
            key={reason.index}
            lang="de"
            className={`flex w-[15rem] shrink-0 flex-col justify-between rounded-card border border-border-subtle bg-background p-5 hyphens-auto lg:w-[17rem] lg:p-6 ${CARD_HEIGHT}`}
          >
            <span className="text-sm leading-body font-medium text-accent">
              {reason.index}
            </span>
            {/* Statisch, ohne TextEngine: Kartentitel sind keine
                Sektions-Headings — siebzehn eigene Reveals auf einer Spur
                wären Lärm. Eine Stufe kleiner als die Karten der anderen
                Sektionen, weil die Karte hier nur ein Wort trägt. */}
            <h3 className="text-[1.125rem] leading-display font-light lg:text-[1.25rem]">
              {reason.label}
            </h3>
          </li>
        ))}

        {/* Abschlusskarte: breiter und in der Handlungsfarbe, damit sie am Ende
            der Spur als Antwort liest und nicht als achtzehnter Vorteil. */}
        <li
          lang="de"
          className={`flex w-[20rem] shrink-0 flex-col justify-between rounded-card bg-action-primary p-5 text-action-primary-foreground hyphens-auto lg:w-[24rem] lg:p-6 ${CARD_HEIGHT}`}
        >
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-[1.25rem] leading-display font-light lg:text-[1.5rem]">
              {content.more.title}
            </h3>
            <p className="text-sm leading-body font-light lg:text-base">
              {content.more.body}
            </p>
          </div>
          {/* `self-start`, sonst zieht die Flex-Spalte die Pille auf die volle
              Kartenbreite; `shrink-0` hält ihre 48px Touch-Ziel-Höhe. */}
          <Button
            href={content.more.href}
            variant="secondary"
            className="shrink-0 self-start"
          >
            {content.more.cta}
          </Button>
        </li>
      </GruendeRail>
    </Inview>
  </section>
);
