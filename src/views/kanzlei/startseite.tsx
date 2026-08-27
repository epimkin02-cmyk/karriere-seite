// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Die Kanzlei-Website — seit der Zusammenlegung eine einzige Seite, die Route
 * `/`.
 *
 * Aus fünf Seiten ist eine Landingpage geworden. Diese Datei setzt nur noch
 * zusammen; jeder Abschnitt liegt in `./sections/` und bringt sein eigenes Band,
 * seinen Anker und seine Begründung mit. Was hier steht, ist die **Reihenfolge**
 * — und die ist die eigentliche Entscheidung der Seite.
 *
 * ## Die Dramaturgie
 *
 * Hero, Willkommen und Kernkompetenzen beantworten „Wer seid ihr?". Der
 * Wegweiser teilt das Publikum dann in seine zwei Hälften und schickt jede zu
 * ihrem Leistungsabschnitt — er steht bewusst *vor* beiden, damit niemand durch
 * den falschen scrollen muss, um den richtigen zu finden. „Über uns" folgt
 * hinter den Leistungen, weil Vertrauen an dieser Stelle die Frage beantwortet,
 * die der Katalog aufwirft („und wer macht das?"). Kontakt und Anfahrt sind der
 * Schluss, weil sie das Ziel der Seite sind.
 *
 * ## Der Bandrhythmus
 *
 * Zwölf Bänder, streng abwechselnd Mint und Weiss:
 *
 * | # | Abschnitt | Grund |
 * |---|---|---|
 * | 1 | `#start` | Mint, `rounded-b-section` |
 * | 2 | `#willkommen` | Weiss |
 * | 3 | `#kernkompetenzen` | Mint |
 * | 4 | Wegweiser | Weiss |
 * | 5 | `#unternehmen` — Kopf und Überblick | Mint |
 * | 6 | `#unternehmen` — Katalog | Weiss |
 * | 7 | `#private` — Kopf und Überblick | Mint |
 * | 8 | `#private` — Katalog | Weiss |
 * | 9 | `#ueber-uns` | Mint |
 * | 10 | `#kontakt` | Weiss |
 * | 11 | `#anfahrt` | Mint |
 * | 12 | `#beratung-anfragen` | Weiss |
 *
 * Die beiden Leistungsabschnitte tragen je zwei Bänder statt der früheren drei:
 * Kopf und Überblick teilen sich das Mint. Mit drei Bändern je Abschnitt liefe
 * die Alternation spätestens bei `#private` gegen die Wand — zwei Mintflächen
 * stiessen aneinander, und die Bandfolge ist auf dieser Seite die einzige
 * Gliederung, die aus dem Augenwinkel noch trägt.
 *
 * `rounded-section` liegt genau dort, wo Mint auf Weiss trifft: alle Mintbänder
 * ausser dem Hero haben Weiss über *und* unter sich und sind deshalb rundum
 * gerundet; der Hero stösst oben an die Kopfzeile und rundet nur unten. Das
 * letzte Band ist weiss, damit sich der Abschluss gegen die mintfarbene
 * Fusszeile des Layouts absetzt.
 *
 * Genau ein `<h1>` steht im Hero. Die Seitenköpfe der vier früheren Unterseiten
 * sind entfallen; ihre Überschriften sind zu `<h2>` ihres Abschnitts geworden
 * und alles darunter eine Ebene tiefer gerutscht.
 */

import { Abschluss } from "./sections/abschluss";
import { Anfahrt } from "./sections/anfahrt";
import { FuerPrivate } from "./sections/fuer-private";
import { FuerUnternehmen } from "./sections/fuer-unternehmen";
import { Hero } from "./sections/hero";
import { Kernkompetenzen } from "./sections/kernkompetenzen";
import { Kontakt } from "./sections/kontakt";
import { UeberUns } from "./sections/ueber-uns";
import { Wegweiser } from "./sections/wegweiser";
import { Willkommen } from "./sections/willkommen";

export const Startseite = () => (
  <>
    <Hero />
    <Willkommen />
    <Kernkompetenzen />
    <Wegweiser />
    <FuerUnternehmen />
    <FuerPrivate />
    <UeberUns />
    <Kontakt />
    <Anfahrt />
    <Abschluss />
  </>
);
