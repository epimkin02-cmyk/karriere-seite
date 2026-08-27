// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Abschnitt `#ueber-uns` — die Kanzlei stellt sich vor.
 *
 * Der kürzeste Abschnitt der Seite: ein Kopf, zwei Personen. Mehr stand im
 * Original nicht auf der Seite, und erfunden wird hier nichts
 * (HAUSREGELN-KANZLEI §3). Deshalb ein einziges Band statt zweier — für einen
 * Kopf und zwei Karten wäre ein Farbwechsel dazwischen eine Zäsur ohne Anlass.
 *
 * Das `<h1>` des alten Seitenkopfs ist die `<h2>` dieses Abschnitts, der Lead
 * sein einleitender Fliesstext, „Wir stellen uns vor:" eine `<h3>` und die
 * Namen sind `<h4>`. Der Button des Seitenkopfs entfällt.
 *
 * ## Die Personenkarten haben kein Foto — und vermissen keines
 *
 * `TeamMember.image` ist bei beiden Personen `null`; die Kanzlei führt keine
 * Porträts. Ein leerer Bildrahmen oder ein grauer Kreis mit Initialen wäre die
 * schlechteste Antwort darauf: er zeigt nicht eine Person, sondern das Fehlen
 * ihres Bildes, und tut das auf jeder Karte gleich gross. Die Karte ist deshalb
 * ein **typografisches Namensschild** und kein Bildplatzhalter: ein kurzer
 * Akzentstrich als Anker, darunter der Name und die Funktion in
 * `text-foreground-muted`. So gelesen ist die Karte vollständig — es fehlt
 * sichtbar nichts.
 *
 * **Wie das Foto später hineinkommt.** Die Karte ist bereits als Reihe angelegt
 * (`flex-col`, ab `lg` `flex-row items-center`) mit genau einem Kind, der
 * Textspalte. Kommt ein Porträt, wird es als *erstes* Kind dieser Reihe
 * gerendert — ein `next/image` mit fester Kantenlänge und `rounded-card`, `alt`
 * aus `member.name`. Das Raster darüber ist `lg:items-start`, eine dadurch
 * höhere Karte zieht ihre Nachbarin also nicht mit. Bewusst wird **kein** Platz
 * reserviert: eine leere Box vorzuhalten wäre genau der Platzhalter, den es hier
 * nicht geben soll.
 *
 * Die Karten liegen auf Mint und sind deshalb weiss gefüllt — umgekehrt zur
 * früheren Fassung, wo das Band weiss war. React-Keys kommen aus `member.id`,
 * nicht aus dem Namen.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { HERO_CONTENT, TEAM_CONTENT } from "@/data/kanzlei/ueber-uns";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  HEADING,
  SUBHEADING,
} from "./typografie";

export const UeberUns = () => (
  <section
    id="ueber-uns"
    aria-labelledby="ueber-uns-heading"
    className={`rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      <div className="flex flex-col gap-5">
        {/* `justify-start` neben `text-left`: der TextEngine-Container ist eine
            Flex-Zeile, `text-align` allein richtet dort nichts aus. */}
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {HERO_CONTENT.eyebrow}
        </TextEngine>
        {/* `hyphens-auto` wegen „Steuerberater" — deutsche Komposita brechen
            sonst aus der Spalte. */}
        <TextEngine
          id="ueber-uns-heading"
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

      <section
        id="team"
        aria-labelledby="team-heading"
        className={`flex flex-col gap-8 lg:gap-12 ${ANCHOR_OFFSET}`}
      >
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {TEAM_CONTENT.eyebrow}
          </TextEngine>
          <h3 id="team-heading" className={`max-w-[45rem] ${SUBHEADING}`}>
            {TEAM_CONTENT.title}
          </h3>
        </div>

        {/* Echte Liste: eine Vorlesefunktion kündigt „Liste mit 2 Einträgen" an,
            und die Karten sind damit als gleichrangig ausgezeichnet — was eine
            Geschäftsführung und ihre Assistenz in einer Vorstellung sind. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ul"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2 lg:items-start lg:gap-6"
        >
          {TEAM_CONTENT.members.map((member) => (
            <li
              key={member.id}
              className="flex flex-col gap-6 rounded-card border border-border-subtle bg-background px-6 py-8 lg:flex-row lg:items-center lg:px-8 lg:py-10"
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
                <h4 className="text-[1.5rem] leading-display font-light lg:text-[1.75rem]">
                  {member.name}
                </h4>
                <p className={`max-w-[38rem] text-foreground-muted ${BODY}`}>
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </Inview>
      </section>
    </div>
  </section>
);
