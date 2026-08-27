import type { MetadataRoute } from "next";

import { LEGAL_NAV, SITE_NAV } from "@/data/kanzlei/firma";
import { siteConfig } from "@/lib/site";

/**
 * Erzeugt `/sitemap.xml`.
 *
 * Die Einträge werden aus derselben Navigation abgeleitet, die auch die
 * Kopf- und Fusszeile rendern. Eine handgepflegte zweite Liste wäre die
 * klassische Stelle, an der eine neue Seite ein halbes Jahr lang unentdeckt
 * bleibt, weil jemand vergessen hat, sie hier nachzutragen.
 *
 * `/karriere` fehlt bewusst: die Seite ist `noindex` (siehe
 * `src/app/karriere/layout.tsx`), und eine Adresse in die Sitemap zu schreiben,
 * die man Suchmaschinen im selben Atemzug verbietet, ist ein widersprüchliches
 * Signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (href: string) =>
    href === "/" ? siteConfig.url : `${siteConfig.url}${href}`;

  return [
    // Die Startseite steht in SITE_NAV als "/" — sie bekommt hier die höchste
    // Priorität und wird deshalb getrennt behandelt.
    ...SITE_NAV.map((link) => ({
      url: abs(link.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: link.href === "/" ? 1 : 0.8,
    })),
    // Pflichtangaben gehören in den Index, ranken aber nicht und sollen es
    // auch nicht — daher die niedrige Priorität.
    ...LEGAL_NAV.map((link) => ({
      url: abs(link.href),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.1,
    })),
  ];
}
