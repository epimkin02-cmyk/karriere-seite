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

/**
 * Fliesstext über die volle Breite — als **zwei Spalten**, nicht als eine.
 *
 * Die Abschnitte, die einen alten Seitenkopf aufgenommen haben, sind so
 * gebaut: Überschrift links in einer 22rem-Spalte, Fliesstext rechts daneben.
 * Der Text stand dort bei 38rem, das Inhaltsmass ist aber 85rem — rechts blieb
 * ein knappes Drittel der Seite leer.
 *
 * Die naheliegende Antwort wäre, den Text auf die ganze Restbreite zu ziehen.
 * Das ist die falsche: bei rund 59rem Laufweite stehen etwa 130 Zeichen in
 * einer Zeile, und das Auge findet den Anfang der nächsten nicht mehr
 * zuverlässig — ab etwa 90 Zeichen springt man beim Zeilenwechsel messbar
 * häufiger in die falsche Zeile. §2c der Hausregeln nennt deshalb 70 Zeichen
 * als Obergrenze.
 *
 * Zwei Spalten lösen beides: die Fläche ist genutzt, die Zeile bleibt bei rund
 * 55 Zeichen. Erst ab `lg` — darunter ist der Bildschirm für zwei Spalten zu
 * schmal, und der Text läuft wie bisher einspaltig.
 *
 * `break-inside-avoid` hält einen Absatz zusammen, statt ihn über den
 * Spaltenumbruch zu reissen. Der Abstand zwischen Absätzen kommt über
 * `[&>p+p]:mt-5` und nicht über ein Flex-`gap`: eine Flex-Spalte und
 * `columns` schliessen einander aus — das Flex-Layout gewinnt, und die
 * Mehrspaltigkeit hätte schlicht keine Wirkung.
 */
export const PROSA_SPALTEN =
  "lg:columns-2 lg:gap-12 [&>p]:break-inside-avoid [&>p+p]:mt-5";

/**
 * ## Warum es keine Variante für einen einzelnen langen Absatz gibt
 *
 * Es gab eine (`PROSA_FLIESSEND`, ohne `break-inside-avoid`), damit ein langer
 * Absatz über den Spaltenumbruch laufen kann. Sie ist wieder raus, weil
 * Chromium dabei die zweite Spalte um **4,4 px** nach unten versetzt: der
 * Absatz wird fragmentiert, und das zweite Fragment beginnt nicht exakt am
 * Spaltenanfang. Nachgemessen mit `Range.getBoundingClientRect()` über jedes
 * Zeichen — Spalte 1 startet bei 754,5, Spalte 2 bei 758,9. Weder ein anderer
 * `column-fill`, noch eine ganzzahlige Zeilenhöhe, noch `orphans`/`widows`
 * ändern daran etwas.
 *
 * Mit `break-inside-avoid` tritt das nicht auf, weil dann kein Absatz
 * fragmentiert wird: gemessen starten beide Spalten der Überblicksabschnitte
 * auf den Pixel genau gleich. Ein einzelner langer Absatz wird deshalb vor dem
 * Rendern in zwei aufgeteilt (siehe [[Willkommen]]) statt umbrochen.
 */

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
