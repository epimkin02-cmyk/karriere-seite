// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Kopfzeile der Kanzlei-Website.
 *
 * Bewusst NICHT die schwebende Glasleiste der Karriereseite. Die Karriereseite
 * ist eine Funnel-Landingpage über einer WebGL-Szene; hier lesen Mandanten
 * Fachtexte, und ein halbtransparenter Balken über Fließtext ist dort Unruhe
 * ohne Gegenwert.
 *
 * Die Telefonnummer steht im Kopf, auf jeder Seite, auch auf dem Telefon. Das
 * ist die wichtigste Entscheidung an dieser Komponente: die Mandantschaft ist
 * regional und eher älter, und der häufigste Grund, warum jemand die Seite
 * einer Steuerkanzlei öffnet, ist die Frage „wie erreiche ich die?". Unter `lg`
 * schrumpft sie auf ein Hörer-Symbol mit 44px Ziel, damit sie neben dem
 * Burger-Menü Platz hat — sichtbar bleibt sie immer.
 *
 * Server Component: hier braucht nichts State. Das Mobilmenü ist ein eigenes
 * Client-Blatt.
 */

import Image from "next/image";
import Link from "next/link";

import { PRIMARY_PHONE, SITE_NAV } from "@/data/kanzlei/firma";
import { LOGO } from "@/lib/brand-mark";

import { KanzleiMobileMenu } from "./mobile-menu";

const NAV_LINK =
  "rounded-mark px-3 py-2 text-base leading-body font-light text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const KanzleiHeader = () => (
  <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-glass">
    {/* Der Sprunglink ist die erste fokussierbare Stelle des Dokuments. Ohne
        ihn tabbt sich jemand mit Tastatur auf jeder Unterseite erst durch die
        komplette Navigation, bevor der Inhalt beginnt. */}
    <a
      href="#inhalt"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-mark focus:bg-action-primary focus:px-4 focus:py-2 focus:text-action-primary-foreground"
    >
      Zum Inhalt springen
    </a>

    <div className="mx-auto flex h-20 w-full max-w-[85rem] items-center justify-between gap-4 px-5 md:px-10">
      {/* Das Logo trägt den Firmennamen selbst, deshalb steht daneben kein Text
          mehr. `alt` übernimmt seine Rolle: es ist zugleich der zugängliche
          Name dieses Links, und ein Screenreader liest damit „Frank Kutscher
          Steuerberatungsgesellschaft mbH, Link" statt „Bild, Link".

          `priority`, weil das Logo in der Kopfzeile beim ersten Bildschirm
          steht — ohne das lädt Next es faul nach und die Leiste ist für einen
          Moment leer. `width`/`height` sind die echten Masse der Datei, damit
          nichts springt.

          Unter `lg` kleiner: bei 390 px teilen sich Logo, Telefonknopf und
          Burger die Zeile, und mit voller Breite wird es rechnerisch zu eng. */}
      <Link
        href="/"
        className="flex shrink-0 items-center rounded-mark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image
          src={LOGO.src}
          width={LOGO.width}
          height={LOGO.height}
          alt={LOGO.alt}
          priority
          className="h-7 w-auto lg:h-9"
        />
      </Link>

      {/* Seit der Zusammenlegung sind alle fünf Einträge Anker auf derselben
          Seite. Deshalb `<a>` und nicht `<Link>`: der Router hätte hier nichts
          aufzulösen, und ein `<Link>` auf einen reinen Hash lädt im
          ungünstigen Fall die Route neu, statt bloss zu springen. Der Sprung
          landet dank `scroll-mt-24` an den Sektionen nicht unter dieser
          klebenden Leiste. */}
      <nav aria-label="Hauptnavigation" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {SITE_NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={NAV_LINK}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {/* Ein echter `tel:`-Link, kein Button mit Handler — auf dem Telefon
            wählt er direkt, am Rechner bietet er die Nummer zum Kopieren an. */}
        <a
          href={PRIMARY_PHONE.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-action bg-action-primary px-4 text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:px-5"
        >
          <PhoneIcon className="size-4 shrink-0" />
          {/* Genau EIN Textknoten je Breakpoint. Beide gleichzeitig zu rendern
              und einen davon `sr-only` zu setzen, liest ein Screenreader als
              „03647 44558200 Anrufen" vor — der versteckte Text verschwindet
              nur optisch, nicht aus dem Baum. `hidden` entfernt ihn wirklich. */}
          <span className="text-base leading-body font-light lg:hidden">
            Anrufen
          </span>
          <span className="hidden text-base leading-body font-light lg:inline">
            {PRIMARY_PHONE.label}
          </span>
        </a>

        <KanzleiMobileMenu navLinks={SITE_NAV} />
      </div>
    </div>
  </header>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.4 4.6 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
