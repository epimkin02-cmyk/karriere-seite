import type { MetadataRoute } from "next";

import { LEGAL_NAV } from "@/data/kanzlei/firma";
import { siteConfig } from "@/lib/site";

/**
 * Erzeugt `/sitemap.xml`.
 *
 * Seit der Zusammenlegung hat die Website vier indexierbare Adressen: die
 * Landingpage und die drei Rechtstexte. Mehr steht hier nicht — und
 * insbesondere **nicht** die Anker der Landingpage. Ein Fragment ist kein
 * Dokument: Suchmaschinen rufen `/#kontakt` als `/` ab, und fünf Zeilen, die
 * alle dieselbe Seite meinen, sind für einen Crawler kein Hinweis auf Struktur,
 * sondern ein Duplikat.
 *
 * `SITE_NAV` taugt seither nicht mehr als Quelle — es enthält genau diese
 * Anker. Die Startseite steht deshalb wieder von Hand hier; sie ist die eine
 * Adresse, die dabei vergessen werden könnte, und die eine, die niemand
 * vergisst.
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
    {
      url: abs("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
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
