// 📖 Docs: obsidian/frontend/components/common.md

/**
 * „Für Private" — die Leistungsseite für Privatmandanten.
 *
 * Gleicher Seitenrhythmus wie die Schwesterseite „Für Unternehmen":
 * Seitenkopf, Überblick, Katalog, Abschluss — dieselbe Handschrift, nur
 * kürzer. Die Bänder wechseln Mint / Weiß / Mint / Weiß; das Weiß am Ende
 * setzt den Abschluss gegen die mintfarbene Fußzeile des Layouts ab.
 *
 * ## Warum der Katalog hier offen steht
 *
 * Die Schwesterseite klappt ihre zehn Blöcke mit 47 Punkten in `<details>` ein,
 * weil dort die schiere Menge das Problem ist. Hier sind es **drei Blöcke mit
 * zusammen fünf Punkten** — der ganze Katalog ist kürzer als ein einziger Block
 * drüben. Ein Aufklappmuster würde hier nichts sparen und stattdessen etwas
 * kosten: drei Tipps, um fünf Zeilen zu sehen, plus die stille Behauptung, hier
 * sei mehr verborgen, als es gibt. Zwei Blöcke bestehen ohnehin aus einer
 * einzigen Zeile — ein Klappmechanismus für eine Zeile ist reine Zeremonie.
 * Also stehen alle fünf Punkte offen da; wer die Seite öffnet, hat das
 * Leistungsangebot mit einem Blick vollständig gesehen.
 *
 * Auf `lg` liegen die drei Blöcke nebeneinander, mit `items-start`: der Block
 * „Steuererklärungen" ist dreimal so hoch wie seine Nachbarn, und die sollen
 * nicht auf seine Höhe mitgezogen werden und halbleer wirken.
 *
 * ## Sonstiges
 *
 * Der Punkt „Gesonderte und einheitliche Feststellungserklärung" steht im
 * Original als einziger der Seite ohne ✔-Zeichen (in den Daten mit `// sic:`
 * belegt). Er wird hier trotzdem als regulärer Listenpunkt behandelt: das
 * Häkchen ist auf dieser Website dekoratives Markup und kein Textzeichen, also
 * ist seine Abwesenheit im Original ein Satzfehler und keine Aussage über den
 * Punkt. Ihn als einzigen ohne Häkchen zu setzen, würde eine Rangfolge
 * behaupten, die es nicht gibt.
 *
 * Die Häkchen sind Dekoration und stehen als Inline-SVG mit `aria-hidden` im
 * Markup, nicht als Zeichen im Text — sonst liest ein Screenreader bei jedem
 * Punkt „schweres weißes Häkchen" vor.
 *
 * React-Keys kommen aus `block.id` und `item.id`, nie aus dem Text: die
 * Datendateien dieser Website enthalten wörtlich doppelte Punkte, `text` wäre
 * als Key nicht verlässlich eindeutig.
 *
 * Der Import der Inhalte ist direkt und nicht über Props — so schreibt es
 * HAUSREGELN-KANZLEI §3 für die Seiten dieser Website vor, weil jede Seite
 * genau eine Inhaltsdatei hat und die Route nichts durchreichen kann.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { Button } from "@/components/ui/button";
import {
  CATALOGUE_CONTENT,
  CLOSING_CONTENT,
  HERO_CONTENT,
  OVERVIEW_CONTENT,
} from "@/data/kanzlei/fuer-private";
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

export const FuerPrivate = () => (
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
            „Steuerberater" — deutsche Komposita brechen sonst aus der
            Spalte. */}
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

        {/* Die drei Blöcke sind eine echte Liste — ein Screenreader kündigt sie
            als „Liste mit 3 Einträgen" an, und die Punkte darin je Block als
            eigene Liste. Kein Aufklappen: bei fünf Punkten kostet Klappen mehr,
            als es spart. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-3 lg:items-start"
        >
          {CATALOGUE_CONTENT.blocks.map((block) => (
            <li
              key={block.id}
              className="flex flex-col gap-4 rounded-card border border-border-subtle bg-background px-6 py-7 lg:px-8"
            >
              {/* Kartentitel bleiben statisch — `HEADING_MOTION` gehört den
                  Sektionsüberschriften. */}
              <h3 className="text-[1.25rem] leading-display font-light lg:text-[1.375rem]">
                {block.title}
              </h3>
              <ul className="flex flex-col gap-3">
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
