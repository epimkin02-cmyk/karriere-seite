// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Fusszeile der Kanzlei-Website.
 *
 * Trägt die vollständigen Kontaktdaten, weil die Fusszeile bei einer regionalen
 * Kanzlei die meistgelesene Stelle der Seite ist — dort suchen Leute Nummer,
 * Adresse und Öffnungszeiten, und zwar von jeder Unterseite aus.
 *
 * Zwei Dinge aus dem Original sind hier ABSICHTLICH nicht übernommen:
 *
 *  - Der unbearbeitete Baukasten-Platzhalter („This is paragraph text. Click it
 *    or hit the Manage Text button…"), der auf der Live-Seite auf jeder
 *    Unterseite steht. Er liegt als `FOOTER_PLACEHOLDER` in den Daten, damit
 *    belegt ist, dass er im Original existiert — gerendert wird er nicht.
 *  - „Powered by Sellwerk", der Hinweis auf den alten Baukasten.
 *
 * Die Öffnungszeiten stehen als echte `<table>` mit `<th scope="row">`: eine
 * Tabelle ist genau das, was sie sind, und ein Screenreader kann sie dann Zeile
 * für Zeile mit Tagesnamen vorlesen statt als vierzehn zusammenhanglose Wörter.
 */

import Image from "next/image";
import Link from "next/link";

import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  EMAIL,
  EMAIL_HREF,
  LEGAL_NAV,
  PHONE_NUMBERS,
  SITE_NAV,
} from "@/data/kanzlei/firma";
import { LOGO } from "@/lib/brand-mark";

const HEADING = "text-sm leading-body font-medium text-accent uppercase";
/**
 * Bewusst `flex` und nicht `inline-flex`.
 *
 * Die 44px-Mindesthöhe ist eine Anforderung an die Zielgrösse (WCAG 2.5.8) und
 * war schon da — sie hat nur nicht gewirkt. Ein `inline-flex` bekommt zwar
 * selbst seine 44px, wächst damit aber über seine Zeilenbox hinaus, statt das
 * `<li>` darum herum wachsen zu lassen: gemessen standen die Telefonnummern in
 * der Fusszeile 15px auseinander bei je 44px Höhe — sie überlappten einander um
 * fast zwei Drittel. Auf dem Telefon heisst das, dass man beim Tippen auf eine
 * Nummer eine andere wählt.
 *
 * `flex` macht daraus eine Blockschachtel, die das `<li>` mitnimmt; `w-fit`
 * hält die Klickfläche trotzdem bei der Breite des Textes statt über die ganze
 * Spalte. Dasselbe galt für die Linkliste in den Rechtstexten.
 */
const LINK =
  "rounded-mark text-base leading-body font-light underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const KanzleiFooter = () => (
  <footer className="mt-20 border-t border-border-subtle bg-surface-section lg:mt-32">
    {/* Das Logo schliesst die Seite so ab, wie die Kopfzeile sie eröffnet.
        Kein Link: es steht am Fuss derselben Seite, auf die es zeigen würde,
        und ein Link, der nichts tut, ist für Tastatur und Vorlesefunktion ein
        Halt ohne Ziel. `alt` trägt trotzdem den Firmennamen — hier ist es die
        letzte Nennung im Dokument. */}
    <div className="mx-auto w-full max-w-[85rem] px-5 pt-14 md:px-10 lg:pt-20">
      <Image
        src={LOGO.src}
        width={LOGO.width}
        height={LOGO.height}
        alt={LOGO.alt}
        className="h-8 w-auto lg:h-9"
      />
    </div>

    <div className="mx-auto grid w-full max-w-[85rem] gap-10 px-5 py-10 md:px-10 lg:grid-cols-3 lg:gap-12 lg:py-14">
      <div className="flex flex-col gap-3">
        <h2 className={HEADING}>Anschrift</h2>
        {/* `<address>` ist das richtige Element für die Kontaktdaten des
            Seiteninhabers — nicht für beliebige Postanschriften im Fliesstext. */}
        <address className="text-base leading-body font-light not-italic">
          {COMPANY_NAME}
          <br />
          {COMPANY_ADDRESS.street}
          <br />
          {COMPANY_ADDRESS.postalCode} {COMPANY_ADDRESS.city}
        </address>
        <a href={EMAIL_HREF} className={LINK}>
          {EMAIL}
        </a>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className={HEADING}>Telefon</h2>
        <ul className="flex flex-col gap-1">
          {PHONE_NUMBERS.map((phone) => (
            <li key={phone.href}>
              {/* Mindestens 44px Zeilenhöhe: auf dem Telefon ist das hier ein
                  Wählziel, kein Textabsatz. */}
              <a href={phone.href} className={`${LINK} flex min-h-11 w-fit items-center`}>
                {phone.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className={HEADING}>Überblick</h2>
        {/* Die Öffnungszeiten standen hier bis zum 01.09. als echte `<table>`.
            Sie sind raus, weil sie an dieser Stelle mehr versprachen, als sie
            hielten: eine Steuerkanzlei arbeitet nach Termin, und wer vor der
            Tür steht, weil dort „Mo–Do 8–16 Uhr" stand, hat trotzdem kein
            Gespräch. Die Zeiten liegen weiter in `firma.ts` (`OPENING_HOURS`)
            und können jederzeit zurück.

            An ihrer Stelle steht das, was eine Fusszeile auf einer elf
            Bildschirme langen Seite wirklich leisten kann: der Weg zurück nach
            oben, ohne zu scrollen. `<a>` und nicht `<Link>`, weil es Anker
            derselben Seite sind. */}
        <nav aria-label="Abschnitte">
          <ul className="flex flex-col">
            {SITE_NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${LINK} flex min-h-11 w-fit items-center`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              {/* Die Karriereseite ist `noindex` und steht in keiner
                  Hauptnavigation — die Fusszeile ist der eine Ort, an dem sie
                  auffindbar sein sollte, ohne die Adresse zu kennen. */}
              <Link
                href="/karriere"
                className={`${LINK} flex min-h-11 w-fit items-center`}
              >
                Karriere
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="border-t border-border-subtle">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-4 px-5 py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm leading-body font-light text-foreground-muted">
          © {COMPANY_NAME}
        </p>
        <nav aria-label="Rechtliches">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${LINK} flex min-h-11 w-fit items-center text-sm`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </footer>
);
