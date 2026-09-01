// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Band `#zahlen` — der dunkle Anker der Seite, und ihr einziger Beweis.
 *
 * ## Warum es dieses Band gibt
 *
 * Zwei Probleme, ein Band.
 *
 * **Das erste ist gestalterisch.** Die Seite hatte acht Abschnitte mit
 * identischem Aufbau — Kapitälchen, dünne Überschrift, Fliesstext — auf
 * abwechselnd weissem und mintfarbenem Grund. Über elf Bildschirme hinweg gab
 * es keine einzige Stelle, an der das Auge hängenbleibt. Eine dunkle Fläche in
 * der Seitenmitte ist der billigste und wirksamste Bruch in diesem Rhythmus:
 * sie teilt die Seite in ein Davor und ein Danach und gibt beim Scrollen eine
 * Landmarke.
 *
 * **Das zweite ist inhaltlich und wiegt schwerer.** Die Seite behauptete
 * Vertrauenswürdigkeit ausschliesslich in Adjektiven — „zuverlässig",
 * „kompetent", „erstklassig" — und belegte nichts davon. Für eine regionale
 * Kanzlei ist Vertrauen das ganze Produkt.
 *
 * ## Jede Zahl hier ist nachgerechnet
 *
 * Und das ist keine Floskel, sondern die Bedingung, unter der dieses Band
 * überhaupt existieren darf. Eine erfundene Zahl auf der Seite einer
 * Steuerkanzlei wäre der denkbar schlechteste Ort für eine erfundene Zahl.
 *
 *  - **47** und **10** sind zur Bauzeit aus `CATALOGUE_CONTENT` der
 *    Unternehmensseite gezählt, nicht geschätzt. Mit den fünf Punkten der
 *    Privatseite sind es 52; hier steht die Unternehmenszahl, weil sie zum
 *    Satz daneben gehört.
 *  - **12** stammt wörtlich aus dem Fliesstext der Kanzlei („Mit insgesamt 12
 *    Mitarbeitern …", `src/data/kanzlei/ueber-uns.ts`).
 *
 * ⚠️ Die Karriereseite sagt an derselben Stelle **15+**. Einer der beiden Werte
 * ist veraltet, und welcher, weiss nur die Kanzlei. Solange das offen ist,
 * steht hier die Zahl von der Website, weil dieses Band auf der Website steht.
 *
 * Ein Gründungsjahr fehlt bewusst: es steht weder im alten Auftritt noch in den
 * Unterlagen, und geraten wird hier nichts.
 *
 * ## Kontrast
 *
 * Das Band trägt seit dem 01.09. einen Verlauf (`flaeche-verlauf-tief`), oben
 * die 700er, unten die 900er. Massgeblich für den Kontrast ist damit das obere,
 * hellere Ende: Weiss darauf misst **9,01:1**, Limette **8,56:1**, die
 * Beschriftung in `white/80` **6,38:1**.
 *
 * Gemessen, nicht geschätzt: Weiss auf `--raw-color-brand-900` (#00431f)
 * ergibt **11,52:1**, die Limette der Zahlen (#f8ffb4) **10,95:1**, die
 * gedämpfte Beschriftung in `white/80` **7,9:1**. Alle drei liegen weit über
 * den 4,5:1, die AA verlangt — was hier zählt, weil dieses Band das einzige der
 * Seite mit hellem Text auf dunklem Grund ist und damit das einzige, bei dem
 * ein Fehler nicht schon anderswo aufgefallen wäre.
 */

import { StatCounter } from "@/components/common/stat-counter";
import { Inview } from "@/components/animation/springs/in-view";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

import { ANCHOR_OFFSET } from "./typografie";

interface Zahl {
  wert: string;
  label: string;
  /** Woher die Zahl kommt — steht nur hier, nicht auf der Seite. */
  beleg: string;
}

const ZAHLEN: readonly Zahl[] = [
  {
    wert: "47",
    label: "Leistungen für Unternehmen",
    beleg: "gezählt aus CATALOGUE_CONTENT, fuer-unternehmen.ts",
  },
  {
    wert: "10",
    label: "Fachgebiete unter einem Dach",
    beleg: "Blöcke in CATALOGUE_CONTENT, fuer-unternehmen.ts",
  },
  {
    wert: "12",
    label: "Mitarbeiterinnen und Mitarbeiter",
    beleg: "Fliesstext der Kanzlei, ueber-uns.ts — Karriereseite sagt 15+",
  },
];

export const Zahlen = () => (
  <section
    id="zahlen"
    aria-labelledby="zahlen-heading"
    // `pb-6`: die Tafel stösst sonst unten hart an das Mintband, das seine
    // eigene Rundung nach oben mitbringt — zwei Rundungen, die einander auf
    // demselben Pixel berühren, sehen aus wie ein Fehler. Nach oben braucht es
    // nichts, dort liegt schon das weisse Ende des Abschnitts darüber.
    className={`px-5 pb-6 md:px-10 ${ANCHOR_OFFSET}`}
  >
    {/* Die dunkle Fläche ist eine **Tafel** und kein Band über die volle Breite.
     *
     * Das war sie bis zum 01.09. nämlich, wie alle anderen Bänder der Seite
     * auch. Bei den hellen Bändern fällt das nicht auf — sie gehen in den
     * weissen Seitenhintergrund über. Bei diesem hier schon: die abgerundeten
     * Ecken von `rounded-section` sassen links und rechts genau auf der
     * Fensterkante, und eine Rundung, die an der Kante verschwindet, sieht nicht
     * gerundet aus, sondern abgeschnitten.
     *
     * Der Seitenrand sitzt deshalb jetzt aussen an der Sektion, die Tafel
     * darin. Am Text ändert das nichts: die Sektion nimmt die üblichen 5 bzw.
     * 10 Einheiten, die Tafel innen dieselben noch einmal, und das Inhaltsmass
     * von 85rem in der Mitte landet damit auf denselben Pixeln wie in den
     * Abschnitten darüber und darunter — nachgemessen. Die Tafel selbst ragt
     * nur weiter nach aussen als der Text, und genau das macht sie zur Tafel. */}
    <div className="rounded-section flaeche-verlauf-tief px-5 py-16 text-white md:px-10 lg:py-24">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <h2
          id="zahlen-heading"
          className="max-w-[26rem] text-[1.75rem] leading-display font-light hyphens-auto lg:text-[2.25rem]"
        >
          Eine Kanzlei, die alles abdeckt, nicht nur die Steuererklärung.
        </h2>

        {/* `<dl>` statt `<div>`: Zahl und Beschriftung sind ein Begriffspaar, und
            genau das ist eine Definitionsliste. Eine Vorlesefunktion liest damit
            „47, Leistungen für Unternehmen" als Einheit statt als zwei
            zusammenhanglose Fetzen.

            Die Zahl steht im `<dd>` und die Beschriftung im `<dt>` — also
            scheinbar verkehrt herum. Ist es nicht: der Begriff ist „Leistungen
            für Unternehmen", der Wert dazu ist 47. Optisch steht die Zahl oben,
            weil sie die Aufmerksamkeit trägt. Untereinander (bis `sm`) dreht
            `flex-col-reverse` das Sichtbare um, im Raster darüber `row-start` —
            beide Male ohne die Bedeutung anzufassen. */}
        {/* `<Inview>` kennt `dl` nicht als Tag, deshalb der Wrapper: die
            Bewegung sitzt aussen, die Bedeutung innen. */}
        <Inview {...ELEMENT_MOTION} mode="once" tag="div">
          {/* `grid-rows-2` plus `grid-rows-subgrid` in den Kindern: die Zahlen
              teilen sich eine Zeile, die Beschriftungen die andere. Ohne das
              richtet sich jedes Paar für sich aus, und sobald **eine**
              Beschriftung zweizeilig wird — „Mitarbeiterinnen und Mitarbeiter" —
              rutscht ihre Zahl nach oben aus der Reihe. Gemessen waren es 16 px.

              Warum nicht einfach `items-end` auf dem Raster: dann stünden die
              Beschriftungen bündig und die Zahlen unterschiedlich hoch — also
              derselbe Fehler, nur an der anderen Kante. Subgrid richtet beide
              Zeilen aus, weil die Kinder das Raster des Elternteils übernehmen
              statt ein eigenes aufzumachen. */}
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:grid-rows-[auto_auto] lg:gap-14">
            {ZAHLEN.map((zahl) => (
              <div
                key={zahl.label}
                // `gap-3` statt der früheren `gap-1`: die Zahl steht mit
                // `leading-none` in einer Zeilenbox, die eng am Zeichen sitzt,
                // und 4 px darunter klebte die Beschriftung förmlich am Fuss der
                // Ziffer. Der Abstand gilt in beiden Anordnungen — die Spalte
                // unter `sm` ist ein Flex-Kasten, darüber ein Subgrid, und ein
                // Subgrid bringt seine eigenen Rinnen mit (nachgemessen: der
                // Wert hier gewinnt, nicht die 56 px der `<dl>`).
                className="flex flex-col-reverse gap-3 sm:grid sm:row-span-2 sm:grid-rows-subgrid lg:gap-4"
              >
                <dt className="max-w-[12rem] text-sm leading-body font-light text-white/80 sm:row-start-2">
                  {zahl.label}
                </dt>
                <dd className="text-[3rem] leading-none font-light text-action-secondary sm:row-start-1 lg:text-[4rem]">
                  <StatCounter value={zahl.wert} />
                </dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </div>
  </section>
);
