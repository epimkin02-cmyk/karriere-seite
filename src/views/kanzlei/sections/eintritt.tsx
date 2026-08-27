// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Einblendung für den ersten Bildschirm — die einzige Bewegung der Seite, die
 * ohne JavaScript auskommt.
 *
 * ## Warum es das gibt
 *
 * Der Rest der Seite blendet Text über `spring-text-engine` ein, und das bleibt
 * so. Federn brauchen aber React, und React braucht Hydration: gemessen auf
 * einem 390er-Viewport stand das erste Wort der Hero-Überschrift **694 ms** nach
 * dem ersten Byte. Solange der Ladevorhang darüber lag, hat das niemand
 * gesehen. Ohne ihn sieht man ein leeres Band — also genau das, was durch das
 * Entfernen des Vorhangs eigentlich verschwinden sollte.
 *
 * Diese Komponente rendert denselben Effekt (Auflösen aus der Unschärfe,
 * leichtes Steigen, Wort für Wort versetzt) als reine CSS-Animation. Die läuft
 * mit dem ersten Paint, unabhängig davon, wann — oder ob — JavaScript ankommt.
 *
 * **Sie gilt nur über der Falz.** Alles, was erst beim Scrollen ins Bild kommt,
 * bleibt bei den Federn: dort ist die Verzögerung durch Hydration unsichtbar,
 * weil das Element ohnehin noch nicht im Viewport steht, und dort ist die
 * Reveal-Logik der Engine (`mode="always"`, Selbstheilung bei verhungerter
 * Feder) das bessere Werkzeug.
 *
 * ## Zwei Textknoten, absichtlich
 *
 * Der Text steht einmal als zusammenhängender `sr-only`-Knoten und einmal als
 * Wortkette mit `aria-hidden`. Ein Screenreader liest sonst 28 einzeln
 * ausgezeichnete Wortboxen als 28 Fragmente vor. Dieselbe Aufteilung benutzt
 * auch TextEngine — der Umgang mit dem Text bleibt für assistive Technik also
 * unverändert, egal welcher der beiden Wege den Absatz einblendet.
 */

import type { ElementType } from "react";

export interface EintrittProps {
  /** Das Tag, das gerendert wird — `h1` für die Überschrift, sonst `p`. */
  tag?: ElementType;
  children: string;
  className?: string;
  id?: string;
  /**
   * Anteil aus `text-presets.ts`: `heading` läuft weiter und unschärfer,
   * `body` enger gestaffelt, `eyebrow` (Vorgabe) knapp wie ein Etikett.
   */
  variant?: "eyebrow" | "heading" | "body";
  /**
   * Versatz des ganzen Blocks in ms, für die Kaskade innerhalb des Heros.
   * Der Wortversatz läuft danach relativ dazu weiter.
   */
  delay?: number;
}

const VARIANT_CLASS = {
  eyebrow: "",
  heading: "entry-heading",
  body: "entry-body",
} as const;

export const Eintritt = ({
  tag: Tag = "p",
  children,
  className,
  id,
  variant = "eyebrow",
  delay = 0,
}: EintrittProps) => {
  // Am Leerzeichen trennen, die Leerzeichen aber als eigene Textknoten
  // stehenlassen: die Wortboxen sind `inline-block`, und ohne echten
  // Zwischenraum klebten sie aneinander. Der normale Zeilenumbruch bleibt so
  // erhalten, inklusive `hyphens-auto` an der Überschrift.
  const words = children.split(" ");

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            <span
              className={`entry-item entry-word ${VARIANT_CLASS[variant]}`}
              style={
                {
                  "--entry-index": index,
                  "--entry-delay": `${delay}ms`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
};
