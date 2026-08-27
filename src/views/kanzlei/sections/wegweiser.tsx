// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Der Wegweiser — zwei Flächen, die auf die beiden Leistungsabschnitte zeigen.
 *
 * Der wichtigste Wegweiser der Seite: fast jede Besucherin gehört entweder zu
 * „Für Unternehmen" oder zu „Für Private", und sie muss das in zwei Sekunden
 * sehen. Zwei gleich grosse Flächen, jede ein echter Link.
 *
 * **Seit der Zusammenlegung sind das Ankerlinks, keine Routen.** Damit ist der
 * Wegweiser kein Seitenwechsel mehr, sondern ein Sprung — und genau deshalb
 * steht er als einziges Band der Seite ohne eigenen Anker da: er ist Navigation
 * und kein Ziel. Ein `<a href="#…">` statt `<Link>`, weil hier nichts geladen
 * wird, was der Router auflösen müsste.
 *
 * **Bewusst dieselbe Farbe für beide.** Unterschiedliche Flächenfarben würden
 * eine Rangfolge behaupten, die es nicht gibt — die Kanzlei betreut beide
 * Gruppen gleichrangig, das steht sogar im Text der Sektion darüber („Wir machen
 * keinen Unterschied zwischen unseren Mandanten"). Unterscheidbar sind die
 * Flächen durch die grosse Beschriftung und ein dekoratives Symbol, nicht durch
 * eine Hierarchie der Farbe.
 *
 * Die Beschriftungen kommen aus `SITE_NAV`, nicht aus einer neuen Zeichenkette
 * in dieser Datei: die Startseiten-Daten kennen keine Labels für die beiden
 * Wege, und Kopfzeile, Mobilmenü und dieser Wegweiser müssen dieselben Wörter
 * benutzen, sonst wirkt es wie drei verschiedene Ziele.
 *
 * **Jeder Einstieg ist eine eigene `<section>` mit eigenem `<h2>`.** Ein
 * gemeinsames Band bräuchte eine Überschrift, die es in den Daten nicht gibt —
 * und sie zu erfinden ist untersagt.
 */

import { Inview } from "@/components/animation/springs/in-view";
import type { NavLink } from "@/data/kanzlei/firma";
import { SITE_NAV } from "@/data/kanzlei/firma";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

import { ANCHOR_OFFSET, FOCUS } from "./typografie";

/**
 * Die beiden Leistungsabschnitte, in der Reihenfolge der Hauptnavigation.
 *
 * Gefiltert statt einzeln gesucht: `find` kann `undefined` liefern und zwingt zu
 * einem Ersatztext, den es nicht geben darf.
 */
const ENTRY_HREFS: readonly string[] = ["#unternehmen", "#private"];
const ENTRY_LINKS: readonly NavLink[] = SITE_NAV.filter((link) =>
  ENTRY_HREFS.includes(link.href),
);

export const Wegweiser = () => (
  <div className="bg-background px-5 py-16 md:px-10 lg:py-24">
    <Inview
      {...ELEMENT_MOTION}
      mode="once"
      tag="div"
      className="mx-auto grid w-full max-w-[85rem] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6"
    >
      {ENTRY_LINKS.map((link) => {
        const slug = link.href.replace("#", "");
        return (
          <section
            key={link.href}
            id={`wegweiser-${slug}`}
            aria-labelledby={`wegweiser-${slug}-heading`}
            className={ANCHOR_OFFSET}
          >
            {/* Die ganze Fläche ist der Link, nicht nur die Beschriftung: ein
                Ziel von einer halben Handbreite trifft auch, wer mit dem Daumen
                zielt. */}
            <a
              href={link.href}
              className={`flex h-full flex-col gap-6 rounded-card bg-surface-section-deep px-6 py-8 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section ${FOCUS} lg:px-10 lg:py-12`}
            >
              <EntryIcon
                href={link.href}
                className="size-9 text-accent lg:size-11"
              />
              <div className="flex items-center justify-between gap-4">
                <h2
                  id={`wegweiser-${slug}-heading`}
                  className="text-[1.5rem] leading-display font-light lg:text-[2rem]"
                >
                  {link.label}
                </h2>
                <ArrowIcon className="size-6 shrink-0 text-accent" />
              </div>
            </a>
          </section>
        );
      })}
    </Inview>
  </div>
);

/**
 * Dekoratives Symbol je Einstieg — Haus für Unternehmen, Person für Private.
 *
 * Trägt keine Bedeutung, die nicht schon in der Beschriftung daneben steht,
 * deshalb `aria-hidden`. Es beschleunigt nur das Erkennen aus dem Augenwinkel.
 */
const EntryIcon = ({ href, className }: { href: string; className?: string }) =>
  href === ENTRY_HREFS[0] ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9.5 21v-4.5h5V21M9 10.5h1.5M13.5 10.5H15M9 13.5h1.5M13.5 13.5H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

/** Richtungsanzeige der Einstiegsfläche. */
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
