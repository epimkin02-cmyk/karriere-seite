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
 * Punkte. Als eine durchlaufende Häkchenliste sind das auf einem 390px-Telefon
 * rund fünf Bildschirmhöhen ununterbrochener Fachbegriffe — eine Textwüste, die
 * niemand liest und in der niemand findet, wonach er sucht. Wer hierher
 * springt, sucht in aller Regel EIN Thema („macht die Kanzlei auch Lohn?"),
 * nicht alle 47.
 *
 * Deshalb ist jeder Block ein natives `<details>`/`<summary>`. Das dreht die
 * Liste aus 47 Punkten in eine Liste aus **zehn Themen** um: eingeklappt passt
 * der ganze Katalog auf etwa anderthalb Bildschirme. Bewusst nativ und nicht
 * als nachgebautes Accordion:
 *
 *  - tastaturbedienbar und korrekt ausgezeichnet, ohne ein einziges `aria-*`,
 *  - Strg+F findet auch den Text zugeklappter Blöcke und klappt sie auf,
 *  - funktioniert ohne JavaScript — der Abschnitt bleibt Server Component.
 *
 * Kein `name`-Attribut auf den `<details>`: das würde sie zu einem exklusiven
 * Accordion machen, bei dem das Öffnen eines Blocks einen anderen zuklappt.
 * Wer Lohn- und Finanzbuchführung vergleichen will, soll beide offen haben.
 *
 * **Was offen startet:** der erste Block, damit überhaupt sichtbar ist, dass
 * hier etwas aufklappt; und jeder Block mit höchstens zwei Punkten, denn ein
 * Klappmechanismus für eine einzige Zeile kostet mehr Aufmerksamkeit, als er
 * Platz spart. Dauerhaft verborgen ist damit nichts: jeder Punkt steht im DOM.
 *
 * React-Keys kommen aus `item.id`, nie aus `item.text`: „Meldungen
 * Berufsgenossenschaft" steht in der Lohnbuchführung zweimal (Fehler im
 * Original, in den Daten mit `// sic:` belegt) und würde als Key kollidieren.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { ServiceBlock } from "@/data/kanzlei/firma";
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

import { CheckIcon } from "./check-icon";
import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  FOCUS,
  HEADING,
  SUBHEADING,
} from "./typografie";

/** Ein Block mit höchstens so vielen Punkten startet offen — siehe Kopfkommentar. */
const ALWAYS_OPEN_MAX_ITEMS = 2;

const isOpenByDefault = (block: ServiceBlock, index: number) =>
  index === 0 || block.items.length <= ALWAYS_OPEN_MAX_ITEMS;

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
            className="flex max-w-[38rem] flex-col gap-5"
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
                className="group rounded-card border border-border-subtle bg-surface-section"
              >
                {/* `list-none` plus die WebKit-Regel entfernen das
                    Standard-Dreieck; der Zustand wird stattdessen vom eigenen
                    Chevron angezeigt, das links wie rechts genug Fläche hat. */}
                <summary
                  className={`flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-card px-5 py-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section-deep ${FOCUS} [&::-webkit-details-marker]:hidden`}
                >
                  <h4 className="flex-1 text-[1.25rem] leading-display font-light lg:text-[1.375rem]">
                    {block.title}
                  </h4>
                  {/* Rein optische Vorschau auf den Umfang. `aria-hidden`, weil
                      die aufgeklappte `<ul>` einem Screenreader ihre Länge
                      ohnehin ansagt — die Zahl wäre dort eine Dopplung ohne
                      Bezugswort. */}
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
