"use client";

// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Mobilmenü der Kanzlei-Website.
 *
 * Ein Client-Blatt, weil es das einzige Stück Kopfzeile mit Zustand ist. Bewusst
 * schlicht gehalten: ein aufklappendes Panel unter der Leiste, keine
 * Vollbild-Overlay-Choreografie. Fünf Links brauchen keine Inszenierung, und
 * jede Animation hier steht zwischen jemandem und der Telefonnummer.
 *
 * Die drei Dinge, an denen solche Menüs üblicherweise scheitern und die hier
 * deshalb ausdrücklich gelöst sind: das Panel schliesst bei Escape, es schliesst
 * beim Navigieren (sonst bleibt es beim Zurückblättern offen stehen), und der
 * Fokus wandert beim Schliessen zurück auf den Auslöser statt an den Anfang des
 * Dokuments.
 */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { NavLink } from "@/data/kanzlei/firma";

export interface KanzleiMobileMenuProps {
  navLinks: readonly NavLink[];
}

export const KanzleiMobileMenu = ({ navLinks }: KanzleiMobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Beim Routenwechsel schliessen. Ohne das bleibt das Panel nach einem Klick
  // offen über der neuen Seite stehen, weil Next die Komponente nicht neu
  // montiert.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Zurück auf den Auslöser: sonst landet der Fokus am Dokumentanfang und
      // die Tastaturnutzerin muss sich erneut durch die Kopfzeile arbeiten.
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="kanzlei-mobilmenu"
        className="grid size-11 place-items-center rounded-panel border border-border-subtle text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">
          {open ? "Menü schließen" : "Menü öffnen"}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="size-5"
        >
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Bedingt gerendert, nicht nur ausgeblendet: ein sichtbar verstecktes
          Panel behält seine Links im Tabbing-Pfad, und man tabbt dann durch ein
          Menü, das niemand sieht. */}
      {open && (
        <nav
          id="kanzlei-mobilmenu"
          aria-label="Hauptnavigation"
          className="absolute inset-x-0 top-20 border-b border-border-subtle bg-background px-5 pb-4 shadow-sm md:px-10"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border-subtle last:border-0">
                {/* `<a>` statt `<Link>`: die Einträge sind Anker auf derselben
                    Seite, der Router hat nichts aufzulösen. Das Schliessen
                    hängt deshalb am Klick und nicht mehr allein am
                    Routenwechsel — ein Hash ändert `usePathname` nicht, das
                    Panel bliebe sonst über dem Sprungziel stehen. */}
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center text-[1.125rem] leading-body font-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
