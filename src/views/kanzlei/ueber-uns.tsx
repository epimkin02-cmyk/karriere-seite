// 📖 Docs: obsidian/frontend/components/common.md

/**
 * „Über uns" — Seitenkopf, Teamvorstellung, Abschluss.
 *
 * Die kürzeste Seite der Website: ein Kopf, zwei Personen, ein Satz zum
 * Schluss. Mehr stand im Original nicht darauf, und erfunden wird hier nichts
 * (HAUSREGELN-KANZLEI §3). Der Seitenrhythmus ist derselbe wie auf den
 * Leistungsseiten, nur ohne das Katalogband.
 *
 * Bänder: Mint (Kopf) — Weiß (Team) — Weiß (Abschluss). Die beiden weißen
 * Bänder trennt nicht ihr Grund, sondern die mintfarbene Füllung der
 * Personenkarten: sie trägt das Team-Band optisch, ohne dass drei Flächen in
 * Folge dieselbe Farbe behaupten. Weiß am Ende setzt den Abschluss außerdem
 * gegen die mintfarbene Fußzeile des Layouts ab.
 *
 * ## Die Personenkarten haben kein Foto — und vermissen keines
 *
 * `TeamMember.image` ist bei beiden Personen `null`; die Kanzlei führt auf
 * dieser Seite keine Porträts. Ein leerer Bildrahmen oder ein grauer Kreis mit
 * Initialen wäre die schlechteste Antwort darauf: er zeigt nicht eine Person,
 * sondern das Fehlen ihres Bildes, und tut das auf jeder Karte gleich groß.
 * Die Karte ist deshalb ein **typografisches Namensschild** und kein
 * Bildplatzhalter: ein kurzer Akzentstrich als Anker, darunter der Name als
 * `<h3>` und die Funktion in `text-foreground-muted`. So gelesen ist die Karte
 * vollständig — es fehlt sichtbar nichts.
 *
 * **Wie das Foto später hineinkommt.** Die Karte ist bereits als Reihe
 * angelegt (`flex-col`, ab `lg` `flex-row items-center`) mit genau einem Kind,
 * der Textspalte. Kommt ein Porträt, wird es als *erstes* Kind dieser Reihe
 * gerendert — ein `next/image` mit fester Kantenlänge und `rounded-card`,
 * `alt` aus `member.name`. Die Textspalte bleibt, was sie ist; das Raster
 * darüber ist `lg:items-start`, eine dadurch höhere Karte zieht ihre Nachbarin
 * also nicht mit. Bewusst wird **kein** Platz reserviert: eine leere Box
 * vorzuhalten wäre genau der Platzhalter, den es hier nicht geben soll. Zu
 * ändern ist dann diese eine Stelle im Markup, sonst nichts.
 *
 * Der Akzentstrich ist Dekoration und trägt `aria-hidden` — vorgelesen wäre er
 * ein Geräusch vor jedem Namen.
 *
 * React-Keys kommen aus `member.id`, nicht aus dem Namen.
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
  CLOSING_CONTENT,
  HERO_CONTENT,
  TEAM_CONTENT,
} from "@/data/kanzlei/ueber-uns";
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

export const UeberUns = () => (
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
      id="team"
      aria-labelledby="team-heading"
      className="bg-background px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {TEAM_CONTENT.eyebrow}
          </TextEngine>
          <TextEngine
            id="team-heading"
            tag="h2"
            className={`max-w-[45rem] ${HEADING}`}
            {...HEADING_MOTION}
          >
            {TEAM_CONTENT.title}
          </TextEngine>
        </div>

        {/* Echte Liste: eine Vorlesefunktion kündigt „Liste mit 2 Einträgen"
            an, und die Karten sind damit als gleichrangig ausgezeichnet — was
            eine Geschäftsführung und ihre Assistenz in einer Vorstellung sind.
            `lg:items-start`, damit eine später bebilderte Karte ihre Nachbarin
            nicht mitwachsen lässt. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2 lg:items-start lg:gap-6"
        >
          {TEAM_CONTENT.members.map((member) => (
            <li
              key={member.id}
              className="flex flex-col gap-6 rounded-card border border-border-subtle bg-surface-section px-6 py-8 lg:flex-row lg:items-center lg:px-8 lg:py-10"
            >
              {/* Hier kommt das Porträt hin, sobald es geliefert ist — als
                  erstes Kind dieser Reihe. Solange nicht, steht hier nichts:
                  kein reservierter Rahmen, keine leere Fläche. */}
              <div className="flex flex-col gap-2">
                {/* Der Akzentstrich ersetzt das Bild als optischen Anker der
                    Karte. Dekoration, deshalb `aria-hidden`. */}
                <span
                  aria-hidden="true"
                  className="block w-12 border-t-2 border-accent"
                />
                {/* Kartentitel bleiben statisch — `HEADING_MOTION` gehört den
                    Sektionsüberschriften. */}
                <h3 className="text-[1.5rem] leading-display font-light lg:text-[1.75rem]">
                  {member.name}
                </h3>
                <p className={`max-w-[38rem] text-foreground-muted ${BODY}`}>
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </Inview>
      </div>
    </section>

    <section
      id="beratung-anfragen"
      aria-labelledby="beratung-anfragen-heading"
      className="bg-background px-5 pb-16 md:px-10 lg:pb-24"
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
