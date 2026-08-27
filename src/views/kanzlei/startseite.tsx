// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Startseite der Kanzlei-Website — die Route `/`.
 *
 * ## Die 3D-Szene steht nur hier
 *
 * `LazyDnaInk` ist auf der ganzen Kanzlei-Website genau einmal im DOM, nämlich
 * in diesem Hero (HAUSREGELN-KANZLEI §1). Diese eine Instanz trägt deshalb auch
 * `gatesPreload`: sie hält den Preloader-Vorhang, bis das erste Frame gezeichnet
 * ist. Ein zweiter Halter existiert nicht, und eine Szene weiter unten auf der
 * Seite dürfte den Vorhang gar nicht halten — sie rendert ausserhalb des
 * Viewports nie und würde das Tor nie freigeben.
 *
 * **Der Textblock trägt `relative z-10`, und das ist tragend.** Das Markup steht
 * in Mobile-Reihenfolge, der Canvas also im DOM *nach* der Copy. Ab `lg` liegt
 * er absolut positioniert in der rechten Hälfte des Bandes; ohne eigene
 * Stapelebene würde er über den Text gemalt. `z-10` allein reicht dafür nicht —
 * z-index greift nur auf positionierten Elementen, und der Textblock ist im
 * Mobile-Layout statisch. Deshalb `relative` dazu.
 *
 * **Auf dem Telefon bekommt die Szene einen begrenzten Streifen**, nicht die
 * halbe Bildschirmhöhe wie im Karriere-Hero. Die Karriereseite verkauft eine
 * Stimmung, diese Seite beantwortet die Frage „ist das mein Steuerberater?" —
 * unter dem ersten Bildschirm sollen Lead und Button stehen, nicht Grafik.
 * Rechnerisch: Kopfzeile 5rem plus Streifen 12rem lassen auf einem 390×844-Gerät
 * den kompletten Textblock samt Button über der Falz.
 *
 * ## Die vier Kernkompetenzen ohne Bild
 *
 * `FeatureCard.icon` trägt einen Dateinamen (`frank-pneck-001` …), **die Dateien
 * existieren aber nicht** unter `public/assets/kanzlei/`. Ein `next/image` auf
 * einen fehlenden Pfad ist im Build kein Fehler, sondern erst zur Laufzeit ein
 * kaputtes Bild plus ein 404 je Karte — auf einer Seite mit
 * Barrierefreiheitssiegel der schlechteste denkbare Tausch. Die Karten sind
 * deshalb rein typografisch: eine Ordnungszahl, der Titel als `<h3>`, der Text
 * darunter. Das Feld bleibt in den Daten stehen (die Datendateien werden nicht
 * angefasst) und wird hier bewusst nicht gelesen; sobald die Bilder geliefert
 * sind, ist die Karte die eine Stelle, die es dafür zu ändern gilt.
 *
 * Die Ziffer ist `aria-hidden`: die `<ol>` sagt einer Vorlesefunktion die
 * Position ohnehin an, vorgelesen wäre sie eine Dopplung ohne Bezugswort.
 *
 * ## Die zwei Einstiege
 *
 * Der wichtigste Wegweiser der Seite: fast jede Besucherin gehört entweder zu
 * „Für Unternehmen" oder zu „Für Private", und sie muss das in zwei Sekunden
 * sehen. Zwei gleich grosse Flächen, jede ein echter Link auf die Leistungsseite.
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
 * und sie zu erfinden ist untersagt. So bekommt jeder der beiden Bereiche seinen
 * zugänglichen Namen aus einer echten, sichtbaren Beschriftung.
 *
 * ## Warum „Ihr Steuerberater in Pößneck" zweimal dasteht
 *
 * Das Original druckt den Satz zweimal: einmal als Schlagzeile des Hero-Bandes
 * (`title`) und einmal als Überschrift des Seitentextes (`pageTitle`). Beide
 * Zeichenketten stehen so in den Daten und werden nicht umformuliert. Damit die
 * Wiederholung nicht als Fehler liest, bekommen die beiden Vorkommen
 * unterschiedliche Rollen: im Hero die grosse `<h1>`, im Willkommensblock eine
 * zurückgenommene `<h2>` in der linken Spalte neben dem Fliesstext — dort wirkt
 * sie als Spaltenbeschriftung und nicht als zweite Schlagzeile.
 *
 * Der Import der Inhalte ist direkt und nicht über Props — so schreibt es
 * HAUSREGELN-KANZLEI §3 für die Seiten dieser Website vor.
 */

import Link from "next/link";
import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { RevealOnReady } from "@/components/common/preloader";
import { LazyDnaInk } from "@/components/scene/dna-ink";
import { Button } from "@/components/ui/button";
import type { NavLink } from "@/data/kanzlei/firma";
import { SITE_NAV } from "@/data/kanzlei/firma";
import {
  CLOSING_CONTENT,
  FEATURES_CONTENT,
  HERO_CONTENT,
} from "@/data/kanzlei/startseite";
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

/**
 * Die beiden Leistungsseiten, in der Reihenfolge der Hauptnavigation.
 *
 * Gefiltert statt einzeln gesucht: `find` kann `undefined` liefern und zwingt zu
 * einem Ersatztext, den es nicht geben darf.
 */
const ENTRY_HREFS: readonly string[] = ["/fuer-unternehmen", "/fuer-private"];
const ENTRY_LINKS: readonly NavLink[] = SITE_NAV.filter((link) =>
  ENTRY_HREFS.includes(link.href),
);

export const Startseite = () => (
  <>
    <section
      id="start"
      aria-labelledby="start-heading"
      className="relative overflow-hidden rounded-b-section bg-surface-section px-5 pt-12 pb-10 md:px-10 lg:min-h-[32rem] lg:py-24"
    >
      {/* `relative z-10`: der Canvas steht im DOM weiter unten und liegt ab
          `lg` absolut über dieser Spalte — ohne eigene Stapelebene würde er
          den Text übermalen. */}
      <RevealOnReady className="relative z-10 mx-auto w-full max-w-[85rem]">
        <div className="flex flex-col gap-5 lg:max-w-[29rem] lg:gap-6">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {HERO_CONTENT.eyebrow}
          </TextEngine>
          {/* Der einzige `<h1>` des Dokuments. `hyphens-auto` wegen
              „Steuerberater" — deutsche Komposita brechen sonst aus der
              Spalte. */}
          <TextEngine
            id="start-heading"
            tag="h1"
            className="justify-start text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
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
      </RevealOnReady>

      {/* Telefon: ein begrenzter Streifen unter der Copy, der bis an die
          Bandkanten läuft. Ab `lg` die rechte Hälfte des Bandes; das
          `overflow-hidden` der Sektion schneidet ihn an der Rundung ab. */}
      <div className="pointer-events-none -mx-5 mt-8 h-[12rem] md:-mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mx-0 lg:mt-0 lg:h-auto">
        <LazyDnaInk className="block size-full" gatesPreload />
      </div>
    </section>

    <section
      id="willkommen"
      aria-labelledby="willkommen-heading"
      className="bg-background px-5 py-16 md:px-10 lg:py-24"
    >
      {/* Überschrift links neben dem Text statt darüber: das hält die
          Textspalte bei ~38rem, also im lesbaren Maß. */}
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-6 lg:flex-row lg:gap-16">
        <TextEngine
          id="willkommen-heading"
          tag="h2"
          className={`${HEADING} lg:w-[22rem] lg:shrink-0`}
          {...HEADING_MOTION}
        >
          {HERO_CONTENT.pageTitle}
        </TextEngine>
        {/* Ein `<Inview>` für den Block, und der Absatz ohne TextEngine (§2b):
            ein Begrüßungstext dieser Länge, der sich Wort für Wort aus einer
            Unschärfe aufbaut, ist Unruhe statt Auftritt. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="div"
          className="max-w-[38rem]"
        >
          <p className={BODY}>{HERO_CONTENT.intro}</p>
        </Inview>
      </div>
    </section>

    <section
      id="kernkompetenzen"
      aria-labelledby="kernkompetenzen-heading"
      className="rounded-section bg-surface-section px-5 py-16 md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
            {FEATURES_CONTENT.eyebrow}
          </TextEngine>
          <TextEngine
            id="kernkompetenzen-heading"
            tag="h2"
            className={`max-w-[45rem] ${HEADING}`}
            {...HEADING_MOTION}
          >
            {FEATURES_CONTENT.title}
          </TextEngine>
          <p className={`max-w-[38rem] ${BODY}`}>
            {FEATURES_CONTENT.description}
          </p>
        </div>

        {/* `<ol>`, weil die Ziffern eine Ordnung behaupten — eine
            Vorlesefunktion kündigt sie dann als „Liste mit 4 Einträgen" an und
            zählt selbst mit. Auf `lg` zwei Spalten mit `items-start`, damit die
            unterschiedlich langen Texte die Nachbarkarte nicht mitwachsen
            lassen. */}
        <Inview
          {...ELEMENT_MOTION}
          mode="once"
          tag="ol"
          className="grid grid-cols-1 gap-4 hyphens-auto lg:grid-cols-2 lg:items-start"
        >
          {FEATURES_CONTENT.cards.map((card, index) => (
            <li
              key={card.id}
              className="flex flex-col gap-3 rounded-card border border-border-subtle bg-background px-6 py-7"
            >
              <span
                aria-hidden="true"
                className="text-sm leading-body font-medium text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Kartentitel bleiben statisch — `HEADING_MOTION` gehört den
                  Sektionsüberschriften. */}
              <h3 className="text-[1.25rem] leading-display font-light lg:text-[1.5rem]">
                {card.title}
              </h3>
              <p className={`max-w-[38rem] ${BODY}`}>{card.body}</p>
            </li>
          ))}
        </Inview>
      </div>
    </section>

    <div className="bg-background px-5 py-16 md:px-10 lg:py-24">
      <Inview
        {...ELEMENT_MOTION}
        mode="once"
        tag="div"
        className="mx-auto grid w-full max-w-[85rem] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6"
      >
        {ENTRY_LINKS.map((link) => {
          const slug = link.href.replace("/", "");
          return (
            <section
              key={link.href}
              id={`einstieg-${slug}`}
              aria-labelledby={`einstieg-${slug}-heading`}
            >
              {/* Die ganze Fläche ist der Link, nicht nur die Beschriftung: ein
                  Ziel von einer halben Handbreite trifft auch, wer mit dem
                  Daumen zielt. */}
              <Link
                href={link.href}
                className={`flex h-full flex-col gap-6 rounded-card bg-surface-section-deep px-6 py-8 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section ${FOCUS} lg:px-10 lg:py-12`}
              >
                <EntryIcon
                  href={link.href}
                  className="size-9 text-accent lg:size-11"
                />
                <div className="flex items-center justify-between gap-4">
                  <h2
                    id={`einstieg-${slug}-heading`}
                    className="text-[1.5rem] leading-display font-light lg:text-[2rem]"
                  >
                    {link.label}
                  </h2>
                  <ArrowIcon className="size-6 shrink-0 text-accent" />
                </div>
              </Link>
            </section>
          );
        })}
      </Inview>
    </div>

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
