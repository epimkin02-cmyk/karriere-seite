/**
 * Die Klassenketten, die alle Abschnitte der Landingpage teilen.
 *
 * Bis zur Zusammenlegung stand dieser Block wörtlich in jeder der fünf
 * Seiten-Views. Auf einer einzigen Seite aus zwölf Bändern wäre das zwölfmal
 * dieselbe Zeichenkette — und zwölf Stellen, an denen die Grundschriftgrösse
 * auseinanderlaufen kann. Sie liegt deshalb einmal hier.
 *
 * Kein Modul mit Komponenten: reine Klassenketten, damit die Abschnitte
 * Server Components bleiben und nichts importieren, was sie nicht rendern.
 */

export const EYEBROW =
  "justify-start text-left text-sm leading-body font-medium text-accent uppercase";

/** Sektionsüberschrift (`h2`) — die grösste Stufe unterhalb des Hero. */
export const HEADING =
  "justify-start text-left text-[1.875rem] leading-display font-light lg:text-[2.5rem]";

/** Unterüberschrift (`h3`) eines Abschnitts, der einen Seitenkopf aufgenommen hat. */
export const SUBHEADING =
  "justify-start text-left text-[1.5rem] leading-display font-light lg:text-[2rem]";

/** §2c der Kanzlei-Regeln: grössere Grundschrift, Zeilenlänge unter ~70 Zeichen. */
export const BODY = "text-[1.0625rem] leading-body font-light lg:text-[1.125rem]";

export const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Ankerversatz jeder Sektion.
 *
 * Die Kopfzeile klebt am oberen Rand und ist `h-20` (5rem) hoch. Ohne Versatz
 * schiebt ein Sprung aus der Navigation die Überschrift des Ziels exakt unter
 * diese Leiste — man landet auf dem Abschnitt und sieht seinen Titel nicht.
 * `scroll-mt-24` (6rem) lässt darüber hinaus einen Finger breit Luft, damit
 * erkennbar bleibt, dass oberhalb noch Seite ist.
 */
export const ANCHOR_OFFSET = "scroll-mt-24";
