// 📖 Docs: obsidian/frontend/components/common.md

/**
 * „Für Unternehmen" — die Leistungsseite für Geschäftskunden.
 *
 * ## Warum der Katalog so aufgebaut ist
 *
 * Der Katalog ist das Problem dieser Seite: zehn Blöcke, zusammen 47 Punkte.
 * Als eine durchlaufende Häkchenliste sind das auf einem 390px-Telefon rund
 * fünf Bildschirmhöhen ununterbrochener Fachbegriffe — eine Textwüste, die
 * niemand liest und in der niemand findet, wonach er sucht. Wer diese Seite
 * öffnet, sucht in aller Regel EIN Thema („macht die Kanzlei auch Lohn?"),
 * nicht alle 47.
 *
 * Deshalb ist jeder Block ein natives `<details>`/`<summary>`. Das dreht die
 * Seite von einer Liste aus 47 Punkten in eine Liste aus **zehn Themen** um:
 * eingeklappt passt der ganze Katalog auf etwa anderthalb Bildschirme, und der
 * Weg zum gesuchten Punkt ist ein Blick plus ein Tipp statt einer Minute
 * Scrollen. Bewusst nativ und nicht als nachgebautes Accordion:
 *
 *  - tastaturbedienbar und korrekt ausgezeichnet, ohne ein einziges `aria-*`,
 *  - Strg+F findet auch den Text zugeklappter Blöcke und klappt sie auf,
 *  - funktioniert ohne JavaScript — die Seite bleibt eine Server Component.
 *
 * Kein `name`-Attribut auf den `<details>`: das würde sie zu einem exklusiven
 * Accordion machen, bei dem das Öffnen eines Blocks einen anderen zuklappt.
 * Wer Lohn- und Finanzbuchführung vergleichen will, soll beide offen haben.
 *
 * **Die ungleichen Blockgrößen erledigt der eingeklappte Zustand.** Elf Punkte
 * (Lohnbuchführung) neben einem einzigen (Wirtschaftsberatung, Schenken und
 * Erben) sehen in jedem starren Raster kaputt aus — der eine Block ist eine
 * Wand, der andere eine halbleere Karte. Eingeklappt sind alle zehn Zeilen
 * gleich hoch und lesen sich als gleichrangige Themen; die Zahl im Chip sagt
 * vorab, wie viel dahintersteckt. Auf `lg` liegen die Blöcke in einem
 * zweispaltigen Raster mit `items-start`, damit ein geöffneter Block seine
 * Nachbarn nicht mitwachsen lässt.
 *
 * **Was offen startet:** der erste Block, damit überhaupt sichtbar ist, dass
 * hier etwas aufklappt — zehn zugeklappte Zeilen erklären sich sonst nicht
 * selbst; und jeder Block mit höchstens zwei Punkten, denn ein Klappmechanismus
 * für eine einzige Zeile kostet mehr Aufmerksamkeit, als er Platz spart.
 * Dauerhaft verborgen ist damit nichts: jeder Block ist aufklappbar, jeder
 * Punkt steht im DOM und wird von Suche und Vorlesefunktion gefunden.
 *
 * Bei `lg` bleibt es beim Aufklappen statt alles offen zu zeigen: `open` ist ein
 * Attribut, kein Breakpoint, und die CSS-Wege, das per Media Query zu erzwingen
 * (`::details-content`), sind je nach Browser da oder nicht. Ein Katalog, der
 * auf dem Rechner der Mandantin je nach Browserversion anders funktioniert, ist
 * für eine Seite mit Barrierefreiheitssiegel der schlechtere Tausch als zwei
 * Spalten, die überall gleich funktionieren.
 *
 * ## Sonstiges
 *
 * Die Häkchen sind Dekoration und stehen als Inline-SVG mit `aria-hidden` im
 * Markup, nicht als Zeichen im Text — sonst liest ein Screenreader 47-mal
 * „schweres weißes Häkchen" vor.
 *
 * React-Keys kommen aus `item.id`, nie aus `item.text`: „Meldungen
 * Berufsgenossenschaft" steht in der Lohnbuchführung zweimal (Fehler im
 * Original, in den Daten mit `// sic:` belegt) und würde als Key kollidieren.
 *
 * Der Import der Inhalte ist direkt und nicht über Props — so schreibt es
 * HAUSREGELN-KANZLEI §3 für die Seiten dieser Website vor, weil jede Seite
 * genau eine Inhaltsdatei hat und die Route nichts durchreichen kann.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { Button } from "@/components/ui/button";
import type { ServiceBlock } from "@/data/kanzlei/firma";
import {
  CATALOGUE_CONTENT,
  CLOSING_CONTENT,
  HERO_CONTENT,
  OVERVIEW_CONTENT,
} from "@/data/kanzlei/fuer-unternehmen";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

const EYEBROW =
  "justify-start text-left text-sm leading-body font-medium text-accent uppercase";
const HEADING =
  "justify-start text-left text-[1.875rem] leading-display font-light lg:text-[2.5rem]";
/** §2c der Kanzlei-Regeln: größere Grundschrift, Zeilenlänge unter ~70 Zeichen. */
const BODY = "text-[1.0625rem] leading-body font-light lg:text-[1.125rem]";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Ein Block mit höchstens so vielen Punkten startet offen — siehe Kopfkommentar. */
const ALWAYS_OPEN_MAX_ITEMS = 2;

const isOpenByDefault = (block: ServiceBlock, index: number) =>
  index === 0 || block.items.length <= ALWAYS_OPEN_MAX_ITEMS;

export const FuerUnternehmen = () => (
  <>
    <section
      id="einstieg"
      aria-labelledby="einstieg-heading"
      className="rounded-b-section bg-surface-section px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-5 lg:gap-8">
        {/* `justify-start` neben `text-left`: der TextEngine-Container ist eine
            Flex-Zeile, `text-align` allein richtet dort nichts aus. */}
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {HERO_CONTENT.eyebrow}
        </TextEngine>
        {/* Der einzige `<h1>` des Dokuments. `hyphens-auto` wegen
            „Steuerberater"/„Umgebung" — deutsche Komposita brechen sonst aus
            der Spalte. */}
        <TextEngine
          id="einstieg-heading"
          tag="h1"
          className="max-w-[45rem] justify-start text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
          {...HEADING_MOTION}
        >
          {HERO_CONTENT.title}
        </TextEngine>
        <TextEngine
          tag="p"
          className={`max-w-[38rem] justify-start text-left ${BODY}`}
          {...BODY_MOTION}
        >
          {HERO_CONTENT.lead}
        </TextEngine>
        <Spring {...ELEMENT_MOTION} delayIn={140} tag="div" className="mt-3">
          <Button href={HERO_CONTENT.action.href} variant="primary">
            {HERO_CONTENT.action.label}
          </Button>
        </Spring>
      </div>
    </section>

    <section
      id="ueberblick"
      aria-labelledby="ueberblick-heading"
      className="bg-background px-5 py-16 md:px-10 lg:py-24"
    >
      {/* Auf `lg` steht die Überschrift links neben dem Fließtext statt darüber:
          das hält die Textspalte bei ~38rem, also im lesbaren Maß, statt sie
          über die volle Blattbreite zu ziehen. */}
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-[22rem] lg:shrink-0">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {OVERVIEW_CONTENT.eyebrow}
          </TextEngine>
          <TextEngine
            id="ueberblick-heading"
            tag="h2"
            className={HEADING}
            {...HEADING_MOTION}
          >
            {OVERVIEW_CONTENT.title}
          </TextEngine>
        </div>
        {/* Ein `<Inview>` für den ganzen Block, nicht eines je Absatz (§2b), und
            die Absätze selbst ohne TextEngine: vier Absätze Fachtext, die sich
            Wort für Wort aus einer Unschärfe aufbauen, sind auf dieser Website
            Unruhe statt Auftritt. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="div"
          className="flex max-w-[38rem] flex-col gap-5"
        >
          {OVERVIEW_CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph} className={BODY}>
              {paragraph}
            </p>
          ))}
        </Inview>
      </div>
    </section>

    <section
      id="leistungen"
      aria-labelledby="leistungen-heading"
      className="rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {CATALOGUE_CONTENT.eyebrow}
          </TextEngine>
          <TextEngine
            id="leistungen-heading"
            tag="h2"
            className={`max-w-[45rem] ${HEADING}`}
            {...HEADING_MOTION}
          >
            {CATALOGUE_CONTENT.title}
          </TextEngine>
        </div>

        {/* Die zehn Blöcke sind eine echte Liste — ein Screenreader kündigt sie
            als „Liste mit 10 Einträgen" an, was hier genau die Auskunft ist,
            die das Aufklappmuster sonst verschweigt. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-3 hyphens-auto lg:grid-cols-2 lg:items-start lg:gap-4"
        >
          {CATALOGUE_CONTENT.blocks.map((block, index) => (
            <li key={block.id}>
              <details
                open={isOpenByDefault(block, index)}
                className="group rounded-card border border-border-subtle bg-background"
              >
                {/* `list-none` plus die WebKit-Regel entfernen das
                    Standard-Dreieck; der Zustand wird stattdessen vom eigenen
                    Chevron angezeigt, das links wie rechts genug Fläche hat. */}
                <summary
                  className={`flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-card px-5 py-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section ${FOCUS} [&::-webkit-details-marker]:hidden`}
                >
                  <h3 className="flex-1 text-[1.25rem] leading-display font-light lg:text-[1.375rem]">
                    {block.title}
                  </h3>
                  {/* Rein optische Vorschau auf den Umfang. `aria-hidden`, weil
                      die aufgeklappte `<ul>` einem Screenreader ihre Länge
                      ohnehin ansagt — die Zahl wäre dort eine Dopplung ohne
                      Bezugswort. */}
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-chip bg-surface-section-deep text-sm leading-body font-medium"
                  >
                    {block.items.length}
                  </span>
                  <ChevronIcon className="size-4 shrink-0 text-foreground-muted group-open:rotate-180" />
                </summary>
                <ul className="flex flex-col gap-3 px-5 pt-1 pb-5">
                  {block.items.map((item) => (
                    // Key aus `item.id`: „Meldungen Berufsgenossenschaft" steht
                    // in diesem Block zweimal (sic), `text` kollidiert.
                    <li key={item.id} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className={BODY}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </Inview>
      </div>
    </section>

    <section
      id="beratung-anfragen"
      aria-labelledby="beratung-anfragen-heading"
      className="bg-background px-5 py-16 md:px-10 lg:py-24"
    >
      {/* Das Abschlussband ist eine Geste, kein Textblock: ein `<Inview>` für
          Satz und Nummer zusammen, die Überschrift ohne eigenen Auftritt. */}
      <Inview
        {...ELEMENT_MOTION}
        mode="once"
        tag="div"
        className="mx-auto flex w-full max-w-[85rem] flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      >
        <h2
          id="beratung-anfragen-heading"
          className="max-w-[38rem] text-[1.5rem] leading-display font-light lg:text-[2rem]"
        >
          {CLOSING_CONTENT.text}
        </h2>
        {/* Echter `tel:`-Link statt Button mit Handler: auf dem Telefon wählt er
            direkt, am Rechner bietet er die Nummer zum Kopieren an. */}
        <a
          href={CLOSING_CONTENT.phoneHref}
          className={`inline-flex min-h-12 shrink-0 items-center rounded-action bg-action-primary px-8 text-[1.125rem] leading-body font-light text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-border ${FOCUS}`}
        >
          {CLOSING_CONTENT.phoneLabel}
        </a>
      </Inview>
    </section>
  </>
);

/** Dekoratives Häkchen vor jedem Katalogpunkt. */
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="m4.5 12.5 5 5 10-11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
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
