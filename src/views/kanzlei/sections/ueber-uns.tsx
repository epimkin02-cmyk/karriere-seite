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
 ## Die Personenkarten tragen jetzt echte Porträts
 *
 * Lange stand hier ein Akzentstrich statt eines Bildes, weil die Kanzlei keine
 * Porträts geführt hat — und ein Stockfoto unter einem echten Namen ist keine
 * Platzhalterentscheidung, sondern eine Aussage über einen Menschen. Seit dem
 * 27.08. liegen die richtigen vor, aus einer Serie vor demselben Sprossenfenster
 * aufgenommen, hier auf Kopf und Schultern beschnitten.
 *
 * Der Fallback ist geblieben: `PORTRAETS` ordnet über `member.id` zu, und eine
 * Person ohne Eintrag bekommt weiter den Strich statt eines fremden Gesichts
 * oder einer leeren Box.
 *
 * Die Karten liegen auf Mint und sind deshalb weiss gefüllt — umgekehrt zur
 * früheren Fassung, wo das Band weiss war. React-Keys kommen aus `member.id`,
 * nicht aus dem Namen.
 */

import Image from "next/image";
import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { HERO_CONTENT, TEAM_CONTENT } from "@/data/kanzlei/ueber-uns";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { FOTOS, type Foto } from "./fotos";
import {
  ANCHOR_OFFSET,
  BODY,
  EYEBROW,
  HEADING,
  SUBHEADING,
} from "./typografie";

/**
 * Porträt je Person, zugeordnet über `member.id` aus den Inhaltsdaten.
 *
 * Getrennt von `FOTOS` gehalten, weil hier eine **Zuordnung** steht und nicht
 * nur ein Pfad: welches Gesicht zu welchem Namen gehört. Wer eine dritte Person
 * ergänzt, ohne ein Porträt zu haben, lässt den Eintrag weg — die Karte fällt
 * dann auf den Akzentstrich zurück, statt mit einem fremden Gesicht zu
 * erscheinen.
 */
const PORTRAETS: Partial<Record<string, Foto>> = {
  "frank-kutscher": FOTOS.portraetKutscher,
  "manuela-koeber": FOTOS.portraetKoeber,
};

export const UeberUns = () => (
  <section
    id="ueber-uns"
    aria-labelledby="ueber-uns-heading"
    className={`rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      {/* Kopf und Gruppenbild stehen NEBENEINANDER, nicht untereinander.

          Grund ist das Motiv: die Aufnahme ist hochformatig — das Team steht
          auf der Treppe vor dem Haus, in die Höhe gestaffelt. In ein
          21:9-Querband gezwungen bliebe davon ein Streifen mit abgeschnittenen
          Köpfen. Neben der Textspalte behält es sein Format, und der Abschnitt
          gewinnt die einzige zweispaltige Stelle der Seite — was ihm guttut,
          weil er der kürzeste ist.

          `lg:items-center` statt `items-start`: der Text dieses Abschnitts ist
          kurz — Überschrift und drei Zeilen — und das Bild ist hoch. Oben
          ausgerichtet stünde links unter dem Absatz ein Loch von rund 350 px.
          Mittig gelesen wirkt dasselbe Verhältnis gesetzt statt vergessen. */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col gap-5 lg:flex-1">
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

        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="div"
          className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-background lg:w-[22rem] lg:shrink-0"
        >
          <Image
            src={FOTOS.team.src}
            alt={FOTOS.team.alt}
            fill
            sizes="(min-width: 64rem) 352px, calc(100vw - 2.5rem)"
            className="object-cover"
          />
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
              {/* Das Porträt steht als erstes Kind der Reihe — genau dort, wo
                  der Kommentar an dieser Stelle es seit dem Bau vorgesehen
                  hatte. `PORTRAETS` ordnet es über `member.id` zu, nicht über
                  die Position im Array: eine dritte Person würde die Reihenfolge
                  ändern, ihre `id` nicht.

                  Karten ohne hinterlegtes Porträt behalten den Akzentstrich.
                  Beides zugleich wäre zu viel — der Strich ist der Ersatz für
                  das Bild, nicht sein Beiwerk. */}
              {PORTRAETS[member.id] ? (
                <Image
                  src={PORTRAETS[member.id]!.src}
                  alt={PORTRAETS[member.id]!.alt}
                  width={640}
                  height={640}
                  sizes="(min-width: 64rem) 128px, 112px"
                  className="size-28 shrink-0 rounded-card object-cover lg:size-32"
                />
              ) : null}
              <div className="flex flex-col gap-2">
                {/* Der Akzentstrich ersetzt das Bild als optischen Anker der
                    Karte. Dekoration, deshalb `aria-hidden`. */}
                {PORTRAETS[member.id] ? null : (
                  <span
                    aria-hidden="true"
                    className="block w-12 border-t-2 border-accent"
                  />
                )}
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
