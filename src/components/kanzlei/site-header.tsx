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

import Link from "next/link";

import { KutscherMark } from "@/components/ui/icons";
import {
  BRAND_NAME,
  PRIMARY_PHONE,
  SITE_NAV,
} from "@/data/kanzlei/firma";

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
      <Link
        href="/"
        className="flex items-center gap-3 rounded-mark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-panel bg-accent text-action-secondary">
          <KutscherMark className="size-6" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[1.125rem] leading-display font-medium">
            {BRAND_NAME}
          </span>
          {/* Klein, aber tragend: „Kutscher" allein sagt nicht, worum es geht. */}
          <span className="text-xs leading-body font-light text-foreground-muted">
            Steuerberatung Pößneck
          </span>
        </span>
      </Link>

      <nav aria-label="Hauptnavigation" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {SITE_NAV.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={NAV_LINK}>
                {link.label}
              </Link>
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
