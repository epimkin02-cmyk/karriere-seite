// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Abschnitt `#private` — Überblick und Leistungskatalog für Privatmandanten.
 *
 * Gleicher Aufbau wie der Schwesterabschnitt „Für Unternehmen": Kopf und
 * Überblick auf Mint, der Katalog auf Weiss, die Überschriften eine Ebene
 * tiefer als früher (`<h2>` für den Abschnitt, `<h3>` für Überblick und
 * Katalog, `<h4>` für die Blöcke). Dieselbe Handschrift, nur kürzer.
 *
 * ## Warum der Katalog hier offen steht — und trotzdem gleich aussieht
 *
 * Der Schwesterabschnitt sortiert seine zehn Blöcke mit 47 Punkten in vier
 * Themengruppen und klappt jeden Block in ein `<details>` ein, weil dort die
 * schiere Menge das Problem ist. Hier sind es **drei Blöcke mit zusammen fünf
 * Punkten** — der ganze Katalog ist kürzer als ein einziger Block drüben.
 *
 * Beides, Gruppierung und Klappen, würde hier nichts sparen und etwas kosten:
 * Themengruppen über drei Themen sind eine Ordnung, die es nicht zu ordnen
 * gibt, und drei Tipps, um fünf Zeilen zu sehen, sind die stille Behauptung,
 * hier sei mehr verborgen, als es gibt. Zwei Blöcke bestehen ohnehin aus einer
 * einzigen Zeile.
 *
 * Was die beiden Abschnitte trotzdem als Geschwister lesbar macht, ist die
 * **Tafel**: gerundeter Rahmen, Titel oben, Haarlinie, darunter der Inhalt.
 * Drüben trägt der Titel eine Themengruppe und der Inhalt sind Klappzeilen,
 * hier trägt er das Thema selbst und der Inhalt sind die Punkte. Gleiche Form,
 * andere Dichte — statt zweimal derselben Mechanik für zwei sehr verschiedene
 * Mengen.
 *
 * Auf `lg` liegen die drei Tafeln nebeneinander, mit `items-start`: der Block
 * „Steuererklärungen" ist dreimal so hoch wie seine Nachbarn, und die sollen
 * nicht auf seine Höhe mitgezogen werden und halbleer wirken.
 *
 * ## Sonstiges
 *
 * Der Punkt „Gesonderte und einheitliche Feststellungserklärung" steht im
 * Original als einziger ohne ✔-Zeichen (in den Daten mit `// sic:` belegt). Er
 * wird hier trotzdem als regulärer Listenpunkt behandelt: das Häkchen ist auf
 * dieser Website dekoratives Markup und kein Textzeichen, also ist seine
 * Abwesenheit im Original ein Satzfehler und keine Aussage über den Punkt.
 *
 * React-Keys kommen aus `block.id` und `item.id`, nie aus dem Text: die
 * Datendateien dieser Website enthalten wörtlich doppelte Punkte, `text` wäre
 * als Key nicht verlässlich eindeutig.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import {
  CATALOGUE_CONTENT,
  HERO_CONTENT,
  OVERVIEW_CONTENT,
} from "@/data/kanzlei/fuer-private";
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
  HEADING,
  PROSA_SPALTEN,
  SUBHEADING,
} from "./typografie";

export const FuerPrivate = () => (
  <section
    id="private"
    aria-labelledby="private-heading"
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
          <TextEngine
            id="private-heading"
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

        {/* `focus="oben"`: der Mittenausschnitt hätte der stehenden Kollegin
            den Kopf abgeschnitten — das Band ist 21:9, das Foto 3:2, und was
            dabei wegfällt, entscheidet sich hier und nicht im Zufall. */}
        <Bild foto={FOTOS.beratung} focus="oben" />

        {/* Auf `lg` steht die Überschrift links neben dem Fliesstext statt
            darüber: das hält die Textspalte bei ~38rem, also im lesbaren Mass. */}
        <section
          id="private-ueberblick"
          aria-labelledby="private-ueberblick-heading"
          className={`flex flex-col gap-8 lg:flex-row lg:gap-16 ${ANCHOR_OFFSET}`}
        >
          <div className="flex flex-col gap-4 lg:w-[22rem] lg:shrink-0">
            <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
              {OVERVIEW_CONTENT.eyebrow}
            </TextEngine>
            <h3 id="private-ueberblick-heading" className={SUBHEADING}>
              {OVERVIEW_CONTENT.title}
            </h3>
          </div>
          {/* Ein `<Inview>` für den ganzen Block, nicht eines je Absatz (§2b). */}
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
        id="private-leistungen"
        aria-labelledby="private-leistungen-heading"
        className={`mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12 ${ANCHOR_OFFSET}`}
      >
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {CATALOGUE_CONTENT.eyebrow}
          </TextEngine>
          <h3
            id="private-leistungen-heading"
            className={`max-w-[45rem] ${SUBHEADING}`}
          >
            {CATALOGUE_CONTENT.title}
          </h3>
        </div>

        {/* Die drei Blöcke sind eine echte Liste — ein Screenreader kündigt sie
            als „Liste mit 3 Einträgen" an, und die Punkte darin je Block als
            eigene Liste.

            Dieselbe Tafel wie im Schwesterabschnitt: gerundeter Rahmen, Titel
            oben, Haarlinie, darunter der Inhalt. Nur ist der Titel hier das
            Thema selbst und keine Gruppenbeschriftung, und darunter stehen die
            Punkte offen statt in einer Klappzeile — bei drei Blöcken mit
            zusammen fünf Punkten gäbe es nichts zu sparen. Gleiche Handschrift,
            andere Dichte.

            `lg:items-start`: „Steuererklärungen" ist dreimal so hoch wie seine
            Nachbarn. Auf gleiche Höhe gezogen stünden neben ihm zwei Tafeln mit
            einer Zeile und viel Luft — ehrlicher ist es, sie so hoch sein zu
            lassen, wie ihr Inhalt ist. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-3 lg:items-start lg:gap-6"
        >
          {CATALOGUE_CONTENT.blocks.map((block) => (
            <li
              key={block.id}
              className="overflow-hidden rounded-card border border-border-subtle bg-surface-section"
            >
              {/* Kartentitel bleiben statisch — `HEADING_MOTION` gehört den
                  Sektionsüberschriften. */}
              <h4 className="border-b border-border-subtle px-5 py-4 text-[1.125rem] leading-display font-light lg:text-[1.25rem]">
                {block.title}
              </h4>
              <ul className="flex flex-col gap-3 px-5 py-5">
                {block.items.map((item) => (
                  // Key aus `item.id`, nie aus `item.text` — siehe Kopfkommentar.
                  <li key={item.id} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className={BODY}>{item.text}</span>
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
