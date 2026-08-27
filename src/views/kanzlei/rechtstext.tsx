// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Darstellung eines Rechtstextes (Impressum, Datenschutz, Barrierefreiheit).
 *
 * Eine Komponente für alle drei, weil sie sich nur im Inhalt unterscheiden. Die
 * Texte liegen in `src/data/kanzlei/recht.ts` als Blöcke mit einem `kind`-Feld,
 * und diese Datei ist nichts weiter als die Übersetzung dieser Blöcke in
 * semantisches Markup.
 *
 * **Bewusst ohne jede Animation.** Auf allen anderen Seiten lösen sich Texte
 * aus einem Blur auf; hier nicht. Wer ein Impressum aufruft, sucht eine
 * bestimmte Angabe und will sie sofort lesen können — und wer eine
 * Datenschutzerklärung liest, tut das oft mit Screenreader oder starkem Zoom.
 * Ein Reveal wäre hier reine Reibung.
 *
 * **Die Überschriftenebene kommt aus den Daten** (`level: 2 | 3 | 4`), nicht aus
 * der gewünschten Schriftgrösse. Rechtstexte sind verschachtelt gegliedert, und
 * eine Gliederung, die für das Auge stimmt und für den Screenreader nicht, ist
 * genau der Fehler, den eine Barrierefreiheitserklärung ausschliessen soll.
 *
 * Die Quelle hält sich daran allerdings nicht: die Datenschutzerklärung springt
 * an zwei Stellen von Ebene 2 direkt auf Ebene 4. Eine übersprungene Ebene ist
 * für eine Screenreader-Nutzerin eine Lücke in der Gliederung — sie hört, dass
 * etwas fehlt, und weiss nicht, was. Deshalb werden die Ebenen beim Rendern
 * normalisiert: eine Überschrift darf höchstens **eine** Stufe tiefer sein als
 * ihre Vorgängerin.
 *
 * Getrennt wird dabei zwischen Tag und Aussehen: das **Tag** bekommt die
 * normalisierte Ebene, damit die Gliederung stimmt, die **Klasse** behält die
 * Ebene aus den Daten, damit die optische Staffelung des Originals erhalten
 * bleibt. Genau so herum, wie die Hausregel es verlangt — das Tag trägt die
 * Bedeutung, die Klasse das Aussehen.
 */

import type { LegalBlock, LegalDocument } from "@/data/kanzlei/firma";

export interface RechtstextProps {
  document: LegalDocument;
}

/** Ein Mass für alle Textspalten — rund 70 Zeichen je Zeile. */
const COLUMN = "max-w-[42rem]";
const BODY =
  "text-[1.0625rem] leading-relaxed font-light lg:text-[1.125rem]";
const LINK =
  "rounded-mark text-accent underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const HEADING_CLASSES: Record<2 | 3 | 4, string> = {
  2: "text-[1.5rem] leading-display font-light lg:text-[1.75rem]",
  3: "text-[1.25rem] leading-display font-medium lg:text-[1.375rem]",
  4: "text-[1.0625rem] leading-display font-medium lg:text-[1.125rem]",
};

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.kind) {
    case "paragraph":
      return <p className={`${COLUMN} ${BODY}`}>{block.text}</p>;

    case "list":
      return (
        <ul className={`${COLUMN} ${BODY} flex list-disc flex-col gap-2 pl-5`}>
          {/* Index als Key: Rechtstexte wiederholen Formulierungen, und zwei
              gleiche Punkte in einer Liste sind kein Fehler, den wir durch
              einen Key-Konflikt entdecken wollen. Die Liste ist statisch, es
              wird nie umsortiert. */}
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "address":
      return (
        <address className={`${COLUMN} ${BODY} not-italic`}>
          {block.lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </address>
      );

    case "link":
      return (
        <p className={`${COLUMN} ${BODY}`}>
          {/* Externe Ziele in Rechtstexten (Aufsichtsbehörden,
              Schlichtungsstellen) öffnen in einem neuen Tab, damit niemand
              mitten im Lesen aus dem Dokument fällt. `rel` gegen den
              `window.opener`-Zugriff. */}
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            {block.label}
          </a>
        </p>
      );

    case "linkList":
      return (
        <ul className={`${COLUMN} ${BODY} flex flex-col gap-2`}>
          {block.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK} inline-flex min-h-11 items-center`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        // Die Cookie-Tabelle hat sieben Spalten und passt auf keinem Telefon.
        // Eigener Scrollbereich statt Umbruch: eine Tabelle, deren Zellen
        // umbrechen, ist unlesbar, und die Seite selbst darf nie horizontal
        // scrollen. `tabIndex` macht den Bereich mit der Tastatur erreichbar,
        // `role`/`aria-label` sagen an, was da scrollt.
        <div
          tabIndex={0}
          role="region"
          aria-label="Tabelle, horizontal scrollbar"
          className="w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <table className="w-full min-w-[48rem] border-collapse text-sm leading-body font-light">
            <thead>
              <tr>
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b border-border-subtle px-3 py-2 text-left font-medium"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-border-subtle px-3 py-2 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

/**
 * Erlaubt je Abschnitt höchstens eine Stufe Sprung nach unten.
 *
 * Nach oben ist jeder Sprung zulässig — von einer Unterüberschrift zurück auf
 * Ebene 2 zu gehen schliesst einen Abschnitt ab und reisst keine Lücke.
 */
const normaliseLevels = (sections: LegalDocument["sections"]) => {
  let previous = 1;
  return sections.map((section) => {
    const tagLevel = Math.min(section.level, previous + 1) as 2 | 3 | 4;
    previous = tagLevel;
    return { section, tagLevel };
  });
};

export const Rechtstext = ({ document }: RechtstextProps) => (
  <>
    <section className="rounded-b-section bg-surface-section px-5 pt-14 pb-12 md:px-10 lg:pt-20 lg:pb-16">
      <div className="mx-auto w-full max-w-[85rem]">
        <h1 className="max-w-[42rem] text-[2rem] leading-display font-light md:text-[2.5rem] lg:text-[3rem]">
          {document.title}
        </h1>
      </div>
    </section>

    <div className="mx-auto w-full max-w-[85rem] px-5 py-12 md:px-10 lg:py-16">
      {document.intro.length > 0 && (
        <div className="flex flex-col gap-4">
          {document.intro.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      )}

      {normaliseLevels(document.sections).map(({ section, tagLevel }) => {
        const Heading = `h${tagLevel}` as "h2" | "h3" | "h4";
        return (
          <section key={section.id} className="mt-10 flex flex-col gap-4 lg:mt-12">
            <Heading className={HEADING_CLASSES[section.level]}>
              {section.heading}
            </Heading>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        );
      })}
    </div>
  </>
);
