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

import Link from "next/link";

import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  EMAIL,
  EMAIL_HREF,
  LEGAL_NAV,
  OPENING_HOURS,
  PHONE_NUMBERS,
} from "@/data/kanzlei/firma";

const HEADING = "text-sm leading-body font-medium text-accent uppercase";
const LINK =
  "rounded-mark text-base leading-body font-light underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const KanzleiFooter = () => (
  <footer className="mt-20 border-t border-border-subtle bg-surface-section lg:mt-32">
    <div className="mx-auto grid w-full max-w-[85rem] gap-10 px-5 py-14 md:px-10 lg:grid-cols-3 lg:gap-12 lg:py-20">
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
              <a href={phone.href} className={`${LINK} inline-flex min-h-11 items-center`}>
                {phone.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className={HEADING}>Öffnungszeiten</h2>
        <table className="w-full max-w-[20rem] text-base leading-body font-light">
          <caption className="sr-only">
            Öffnungszeiten der Kanzlei nach Wochentag
          </caption>
          <tbody>
            {OPENING_HOURS.map((entry) => (
              <tr key={entry.day} className="border-b border-border-subtle last:border-0">
                <th scope="row" className="py-1.5 text-left font-light">
                  {entry.day}
                </th>
                <td
                  className={`py-1.5 text-right ${entry.closed ? "text-foreground-muted" : ""}`}
                >
                  {entry.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <Link href={link.href} className={`${LINK} inline-flex min-h-11 items-center text-sm`}>
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
