// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Abschnitt `#unternehmen` — Überblick und Leistungskatalog für Geschäftskunden.
 *
 * Bis zur Zusammenlegung war das eine eigene Seite mit eigenem Seitenkopf. Ihr
 * `<h1>` ist jetzt die `<h2>` dieses Abschnitts, ihr Lead der einleitende
 * Fliesstext, und alles darunter rutscht eine Ebene tiefer: Überblick und
 * Katalog tragen `<h3>`, die zehn Katalogblöcke `<h4>`. Der Button des alten
 * Seitenkopfs entfällt — er zeigte auf `/kontakt`, was jetzt drei Bänder
 * weiter unten steht und keinen eigenen Aufruf mehr braucht.
 *
 * Zwei Bänder, nicht drei: Mint trägt Kopf und Überblick zusammen, Weiss den
 * Katalog. Bei fünf aneinandergereihten Abschnitten ist die Alternation die
 * einzige Struktur, die dem Auge bleibt — drei Bänder je Abschnitt würden sie
 * spätestens beim zweiten Leistungsabschnitt kippen.
 *
 * ## Warum der Katalog so aufgebaut ist
 *
 * Der Katalog ist das Problem dieses Abschnitts: zehn Blöcke, zusammen 47
 * Punkte. Als durchlaufende Häkchenliste sind das auf einem 390px-Telefon rund
 * fünf Bildschirmhöhen ununterbrochener Fachbegriffe — eine Textwüste, die
 * niemand liest und in der niemand findet, wonach er sucht. Wer hierher
 * springt, sucht in aller Regel EIN Thema („macht die Kanzlei auch Lohn?"),
 * nicht alle 47.
 *
 * ### Erste Ebene: vier Themen
 *
 * Bis zum 01.09. lagen die zehn Blöcke als zweispaltiges Raster nebeneinander,
 * in der Reihenfolge der alten Website — also in keiner. Das hatte zwei
 * Nachteile, einen sichtbaren und einen inhaltlichen. Sichtbar: einige Blöcke
 * starteten offen, andere zu, und im Raster standen dadurch neben einem hohen
 * offenen Block grosse leere Flächen. Inhaltlich: zehn gleichrangige
 * Fachbegriffe ohne Oberbegriff sind für jemanden, der keine Kanzlei von innen
 * kennt, genau so unsortiert wie 47 Punkte.
 *
 * Jetzt tragen vier Themengruppen den Katalog (`CATALOGUE_GROUPS` in den
 * Daten), und jede ist eine eigene Tafel: Überschrift oben, darunter ihre
 * Blöcke als Zeilen. Die Reihenfolge folgt dem Jahr einer Firma — laufend,
 * Abschluss, Planung, Behörde. Auf `lg` stehen die vier Tafeln als 2 × 2; das
 * Öffnen einer Zeile verlängert nur ihre eigene Tafel und nicht die Nachbarn.
 *
 * ### Zweite Ebene: die Blöcke als `<details>`
 *
 * Jeder Block bleibt ein natives `<details>`/`<summary>`. Das dreht die Liste
 * aus 47 Punkten in eine Liste aus **vier Themen mit zehn Zeilen** um:
 * eingeklappt passt der ganze Katalog auf etwa einen Bildschirm. Bewusst nativ
 * und nicht als nachgebautes Accordion:
 *
 *  - tastaturbedienbar und korrekt ausgezeichnet, ohne ein einziges `aria-*`,
 *  - Strg+F findet auch den Text zugeklappter Blöcke und klappt sie auf,
 *  - funktioniert ohne JavaScript — der Abschnitt bleibt Server Component.
 *
 * Kein `name`-Attribut auf den `<details>`: das würde sie zu einem exklusiven
 * Accordion machen, bei dem das Öffnen eines Blocks einen anderen zuklappt.
 * Wer Lohn- und Finanzbuchführung vergleichen will, soll beide offen haben.
 *
 * **Alle starten zu.** Früher startete der erste Block offen, „damit man sieht,
 * dass hier etwas aufklappt", und jeder sehr kurze Block ebenfalls. Beides ist
 * mit der Gruppierung hinfällig: eine Tafel aus gleich hohen Zeilen mit
 * Anzahl und Winkel liest sich von selbst als Liste zum Aufklappen, und ein
 * gemischter Anfangszustand war genau das, was das Raster zerrissen hat.
 * Dauerhaft verborgen ist nichts: jeder Punkt steht im DOM.
 *
 * ### Die Überschriftenebenen
 *
 * `<h2>` Abschnitt, `<h3>` Katalog, `<h4>` Themengruppe, `<h5>` Block. Vier
 * Ebenen sind viel, aber sie bilden genau die Gliederung ab, die man sieht —
 * und eine Vorlesefunktion kann den Katalog damit Gruppe für Gruppe abgehen,
 * statt sich durch zehn gleichrangige Überschriften zu hangeln.
 *
 * React-Keys kommen aus `item.id`, nie aus `item.text`: „Meldungen
 * Berufsgenossenschaft" steht in der Lohnbuchführung zweimal (Fehler im
 * Original, in den Daten mit `// sic:` belegt) und würde als Key kollidieren.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { ServiceBlock } from "@/data/kanzlei/firma";
import type { CatalogueGroup } from "@/data/kanzlei/fuer-unternehmen";
import {
  CATALOGUE_CONTENT,
  HERO_CONTENT,
  OVERVIEW_CONTENT,
} from "@/data/kanzlei/fuer-unternehmen";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { Bild } from "./bild";
import { CheckIcon } from "./check-icon";
import { FOTOS } from "./fotos";
import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  FOCUS,
  HEADING,
  PROSA_SPALTEN,
  SUBHEADING,
} from "./typografie";

/**
 * Löst die Gruppen der Daten in echte Blöcke auf.
 *
 * Der Rest am Ende ist eine Sicherung, kein Feature: er sammelt Blöcke ein, die
 * in keiner Gruppe stehen. Kommt in `SERVICE_BLOCKS` einmal ein elfter Block
 * dazu, ohne dass jemand die Gruppen anfasst, steht er trotzdem auf der Seite —
 * statt lautlos zu verschwinden, was der Fehler wäre, den niemand bemerkt.
 * Solange die Gruppen vollständig sind, ist diese Tafel leer und wird nicht
 * gerendert.
 */
const gruppiereBloecke = (
  bloecke: readonly ServiceBlock[],
  gruppen: readonly CatalogueGroup[],
) => {
  const nachId = new Map(bloecke.map((block) => [block.id, block]));
  const vergeben = new Set<string>();

  const tafeln = gruppen.map((gruppe) => {
    const inhalt = gruppe.blockIds
      .map((id) => {
        vergeben.add(id);
        return nachId.get(id);
      })
      .filter((block): block is ServiceBlock => block !== undefined);
    return { id: gruppe.id, title: gruppe.title, bloecke: inhalt };
  });

  const rest = bloecke.filter((block) => !vergeben.has(block.id));
  return rest.length > 0
    ? [...tafeln, { id: "weitere", title: "Weitere Leistungen", bloecke: rest }]
    : tafeln;
};

const TAFELN = gruppiereBloecke(
  CATALOGUE_CONTENT.blocks,
  CATALOGUE_CONTENT.groups,
);

export const FuerUnternehmen = () => (
  <section
    id="unternehmen"
    aria-labelledby="unternehmen-heading"
    className={ANCHOR_OFFSET}
  >
    <div className="rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-5">
          {/* `justify-start` neben `text-left`: der TextEngine-Container ist eine
              Flex-Zeile, `text-align` allein richtet dort nichts aus. */}
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {HERO_CONTENT.eyebrow}
          </TextEngine>
          {/* `hyphens-auto` wegen „Steuerberater"/„Umgebung" — deutsche
              Komposita brechen sonst aus der Spalte. */}
          <TextEngine
            id="unternehmen-heading"
            tag="h2"
            className={`max-w-[45rem] hyphens-auto ${HEADING}`}
            {...HEADING_MOTION}
          >
            {HERO_CONTENT.title}
          </TextEngine>
          <Inview
            {...ELEMENT_MOTION}
            mode="once"
            tag="div"
            className="max-w-[38rem]"
          >
            <p className={BODY}>{HERO_CONTENT.lead}</p>
          </Inview>
        </div>

        {/* Der Katalog darunter ist der längste zusammenhängende Textblock der
            Seite — 47 Leistungen in zehn Klappblöcken. Ein Bild davor gibt dem
            Auge einen Halt, bevor es dort hineingeht.

            Und es ist das eine randlose Bild der Seite (siehe [[Bild]]): es
            bricht aus der Inhaltsspalte aus, in der sonst alles steht. Der
            Bruch sitzt hier, weil dahinter der schwerste Abschnitt kommt. */}
        <Bild foto={FOTOS.buero} randlos />

        {/* Auf `lg` steht die Überschrift links neben dem Fliesstext statt
            darüber: das hält die Textspalte bei ~38rem, also im lesbaren Mass,
            statt sie über die volle Blattbreite zu ziehen. */}
        <section
          id="unternehmen-ueberblick"
          aria-labelledby="unternehmen-ueberblick-heading"
          className={`flex flex-col gap-8 lg:flex-row lg:gap-16 ${ANCHOR_OFFSET}`}
        >
          <div className="flex flex-col gap-4 lg:w-[22rem] lg:shrink-0">
            <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
              {OVERVIEW_CONTENT.eyebrow}
            </TextEngine>
            <h3 id="unternehmen-ueberblick-heading" className={SUBHEADING}>
              {OVERVIEW_CONTENT.title}
            </h3>
          </div>
          {/* Ein `<Inview>` für den ganzen Block, nicht eines je Absatz (§2b),
              und die Absätze selbst ohne TextEngine: vier Absätze Fachtext, die
              sich Wort für Wort aus einer Unschärfe aufbauen, sind auf dieser
              Website Unruhe statt Auftritt. */}
          <Inview
            {...ELEMENT_MOTION}
            mode="once"
            tag="div"
            className={`lg:flex-1 ${PROSA_SPALTEN}`}
          >
            {OVERVIEW_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph} className={BODY}>
                {paragraph}
              </p>
            ))}
          </Inview>
        </section>
      </div>
    </div>

    <div className="bg-background px-5 py-16 md:px-10 lg:py-24">
      <section
        id="unternehmen-leistungen"
        aria-labelledby="unternehmen-leistungen-heading"
        className={`mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12 ${ANCHOR_OFFSET}`}
      >
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {CATALOGUE_CONTENT.eyebrow}
          </TextEngine>
          <h3
            id="unternehmen-leistungen-heading"
            className={`max-w-[45rem] ${SUBHEADING}`}
          >
            {CATALOGUE_CONTENT.title}
          </h3>
        </div>

        {/* Vier Tafeln, je eine Themengruppe. Die äussere `<ul>` ist die Liste
            der Themen, die innere je die Liste der Blöcke darin — eine
            Vorlesefunktion kündigt damit „Liste mit 4 Einträgen" an und
            innerhalb einer Gruppe deren Umfang, statt zehn gleichrangige
            Punkte am Stück herunterzulesen.

            `lg:items-start`: die Tafeln sind unterschiedlich hoch (zwei bis
            vier Zeilen), und eine kurze soll nicht auf die Höhe ihrer Nachbarin
            gezogen werden und halbleer wirken. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2 lg:items-start lg:gap-6"
        >
          {TAFELN.map((tafel) => (
            <li
              key={tafel.id}
              className="overflow-hidden rounded-card border border-border-subtle bg-surface-section"
            >
              {/* Der Gruppentitel in derselben Marke wie die Eyebrows der
                  Seite: klein, versal, Akzentfarbe. Er ist eine Beschriftung
                  der Tafel und soll nicht mit den Blocktiteln darunter um
                  Aufmerksamkeit ringen — die tragen den Inhalt. */}
              <h4 className="border-b border-border-subtle px-5 py-4 text-sm leading-body font-medium text-accent uppercase">
                {tafel.title}
              </h4>

              <ul>
                {tafel.bloecke.map((block) => (
                  <li
                    key={block.id}
                    className="border-t border-border-subtle first:border-t-0"
                  >
                    <details className="group">
                      {/* `list-none` plus die WebKit-Regel entfernen das
                          Standard-Dreieck; der Zustand wird stattdessen vom
                          eigenen Chevron angezeigt, das links wie rechts genug
                          Fläche hat.

                          Kein `rounded-card` mehr am `<summary>`: die Zeile ist
                          jetzt eine Zeile in einer Tafel und keine eigene
                          Kachel. Die Rundung sitzt an der Tafel, `overflow-hidden`
                          dort schneidet die erste und letzte Zeile passend ab.

                          Genau dieses `overflow-hidden` macht aber auch
                          `-outline-offset-2` nötig: der Fokusrahmen aus `FOCUS`
                          liegt 2 px AUSSERHALB der Zeile, und bei der ersten
                          und letzten Zeile schneidet die Tafel ihn dort ab —
                          ein Tastaturnutzer sähe seinen Fokus dann nur zu drei
                          Vierteln. Nach innen gezeichnet bleibt er vollständig
                          sichtbar. */}
                      <summary
                        className={`flex min-h-11 cursor-pointer list-none items-center gap-3 px-5 py-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section-deep ${FOCUS} focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden`}
                      >
                        <h5 className="flex-1 text-[1.125rem] leading-display font-light lg:text-[1.25rem]">
                          {block.title}
                        </h5>
                        {/* Rein optische Vorschau auf den Umfang. `aria-hidden`,
                            weil die aufgeklappte `<ul>` einem Screenreader ihre
                            Länge ohnehin ansagt — die Zahl wäre dort eine
                            Dopplung ohne Bezugswort. */}
                        <span
                          aria-hidden="true"
                          className="grid size-7 shrink-0 place-items-center rounded-chip bg-background text-sm leading-body font-medium"
                        >
                          {block.items.length}
                        </span>
                        <ChevronIcon className="size-4 shrink-0 text-foreground-muted group-open:rotate-180" />
                      </summary>
                      <ul className="flex flex-col gap-3 px-5 pt-1 pb-5">
                        {block.items.map((item) => (
                          // Key aus `item.id`: „Meldungen Berufsgenossenschaft"
                          // steht in diesem Block zweimal (sic), `text` kollidiert.
                          <li key={item.id} className="flex items-start gap-3">
                            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                            <span className={BODY}>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Inview>
      </section>
    </div>
  </section>
);

/**
 * Zustandsanzeige des `<summary>`.
 *
 * Dreht ohne `transition`: Hausregel 2 lässt Übergänge nur auf Farbe, Opacity
 * und Border zu, und ein hartes Umschlagen ist bei einem Chevron ohnehin die
 * ehrlichere Rückmeldung.
 */
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="m6 9.5 6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
