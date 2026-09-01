// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Fusszeile der Kanzlei-Website.
 *
 * Trägt die vollständigen Kontaktdaten, weil die Fusszeile bei einer regionalen
 * Kanzlei die meistgelesene Stelle der Seite ist — dort suchen Leute Nummer und
 * Adresse, und zwar von jeder Unterseite aus.
 *
 * Zwei Dinge aus dem Original sind hier ABSICHTLICH nicht übernommen:
 *
 *  - Der unbearbeitete Baukasten-Platzhalter („This is paragraph text. Click it
 *    or hit the Manage Text button…"), der auf der Live-Seite auf jeder
 *    Unterseite steht. Er liegt als `FOOTER_PLACEHOLDER` in den Daten, damit
 *    belegt ist, dass er im Original existiert — gerendert wird er nicht.
 *  - „Powered by Sellwerk", der Hinweis auf den alten Baukasten.
 *
 * ## Das Foto rechts
 *
 * Seit dem 01.09. steht rechts neben den Kontaktspalten ein Bild. Das ist die
 * einzige Stelle der Website, an der ein Foto ausserhalb der Landingpage
 * auftaucht — unter den Rechtstexten steht sonst nur Text, und die enden damit
 * nicht mehr in einer Wüste aus Paragrafen, sondern mit einem Gesicht.
 *
 * Es sitzt in derselben Zeile wie Logo und Spalten, nicht darunter: ein Bild
 * unter der Fusszeile wäre ein weiterer Abschnitt, ein Bild neben ihr ist ihr
 * rechter Abschluss. Deshalb ist der äussere Kasten hier ein Raster mit zwei
 * Spalten und nicht mehr der frühere dreispaltige Block — Logo und Spalten
 * rücken zusammen in die linke, das Bild füllt die rechte über die volle Höhe.
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
/**
 * Das Foto der Fusszeile.
 *
 * Steht hier und nicht in [[fotos]]: jene Liste sind die Bilder der
 * Landingpage, diese Fusszeile dagegen ist Seitengerüst und erscheint auch
 * unter den Rechtstexten. Und ein Modul aus `components/`, das aus `views/`
 * importiert, wäre die falsche Richtung.
 *
 * ⚠️ Der Name der Kollegin ist NICHT bekannt, deshalb steht im `alt` nur der
 * Name, der belegt ist. Sie ist **nicht** Manuela Köber — die trägt eine Brille
 * und ist auf `portraet-koeber.webp` zu sehen. Sobald der zweite Name da ist,
 * gehört er hier hinein. Genau diese Zuordnung ist auf dieser Seite schon
 * einmal falsch gewesen; ein Gesicht unter einem Namen wird nicht geraten.
 */
const FOOTER_FOTO = {
  src: "/assets/kutscher/team-duo.webp",
  alt: "Frank Kutscher mit einer Mitarbeiterin der Kanzlei",
} as const;

const LINK =
  "rounded-mark text-base leading-body font-light underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const KanzleiFooter = () => (
  <footer className="mt-20 border-t border-border-subtle bg-surface-section lg:mt-32">
    {/* Das Logo schliesst die Seite so ab, wie die Kopfzeile sie eröffnet.
        Kein Link: es steht am Fuss derselben Seite, auf die es zeigen würde,
        und ein Link, der nichts tut, ist für Tastatur und Vorlesefunktion ein
        Halt ohne Ziel. `alt` trägt trotzdem den Firmennamen — hier ist es die
        letzte Nennung im Dokument. */}
    <div className="mx-auto grid w-full max-w-[85rem] gap-10 px-5 pt-14 pb-10 md:px-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:pt-20 lg:pb-14">
      <div className="flex flex-col gap-10 lg:gap-12">
        <Image
          src={LOGO.src}
          width={LOGO.width}
          height={LOGO.height}
          alt={LOGO.alt}
          className="h-8 w-auto lg:h-9"
        />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
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
      </div>

      {/* Das Foto — rechte Spalte ab `lg`, darunter ein Streifen über die
       *  volle Breite.
       *
       * ## Zwei Formate aus einer Datei
       *
       * Die Aufnahme ist hochformatig (1000 × 1284). Ab `lg` steht sie in einer
       * 20rem breiten Spalte, deren Höhe das Raster vorgibt: die Zeile ist so
       * hoch wie die linke Spalte aus Logo und Kontaktblöcken, und `h-auto`
       * lässt das Bild diese Höhe mitnehmen. Das Verhältnis liegt damit nahe
       * am Bild selbst, es wird kaum beschnitten — `object-center` genügt.
       *
       * Auf dem Telefon geht das nicht: 1284 px hoch wären dort ein halber
       * Bildschirm Fusszeile, bevor die Rechtstexte kommen. Also ein 14rem
       * hoher Streifen. Ein Hochformat in einem 1,6:1 breiten Kasten zeigt
       * knapp die Hälfte seiner Höhe, und welche Hälfte, entscheidet
       * `object-position`: bei 15 % beginnt der Ausschnitt dicht über den
       * Köpfen und endet an den Hüften. Zentriert stünden dort Bäuche und
       * Beine.
       *
       * Eine Datei für beide Fälle, kein zweites `<Image>` — sonst lädt der
       * Browser dasselbe Motiv zweimal.
       *
       * `rounded-card` und `bg-surface-section-deep` sind dieselben Marken wie
       * bei den Bildern der Landingpage: gerundete Ecke, ruhige Fläche
       * darunter, solange das Bild noch nicht da ist.
       *
       * Kein `priority`: die Fusszeile steht auf keiner Seite im ersten Bild. */}
      <div className="relative h-[14rem] overflow-hidden rounded-card bg-surface-section-deep lg:h-auto lg:min-h-[22rem]">
        <Image
          src={FOOTER_FOTO.src}
          alt={FOOTER_FOTO.alt}
          fill
          sizes="(min-width: 64rem) 20rem, calc(100vw - 2.5rem)"
          className="object-cover object-[50%_15%] lg:object-center"
        />
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
