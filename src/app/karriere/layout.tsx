import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Karriere-Layout — trägt nur die Metadaten.
 *
 * Der Bereich hat bewusst **kein** eigenes Chrome: die Karriereseite bringt
 * Header und Footer selbst mit, weil sie eine Funnel-Landingpage ist und
 * absichtlich nicht wie der Rest der Website aussieht. Sie liegt deshalb
 * ausserhalb der `(kanzlei)`-Gruppe, die das gemeinsame Seitengerüst hält.
 *
 * `noindex` gilt nur hier. Die Kanzlei-Website soll gefunden werden, die
 * Anzeigen-Landingpage nicht — beides steuert `siteConfig.noindex` bzw. dieser
 * Block, und beides kann sich nicht mehr gegenseitig überschreiben, seit die
 * Seiten getrennte Routen sind.
 */
export const metadata: Metadata = {
  title: "Karriere bei der Steuerkanzlei Kutscher in Pößneck",
  description:
    "Steuerfachangestellte/r oder Steuerfachwirt/in (m/w/d) in Pößneck: überdurchschnittliches Gehalt, bis zu drei Tage Homeoffice, 4-Tage-Woche möglich, 600 € Gesundheitsbudget. Schnellbewerbung ohne Unterlagen.",
  alternates: { canonical: "/karriere" },
  robots: siteConfig.noindex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      }
    : { index: true, follow: true },
};

export default function KarriereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
