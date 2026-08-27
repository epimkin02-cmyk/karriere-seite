import { ImageResponse } from "next/og";

import { brandMarkDataUri } from "@/lib/brand-mark";
import { siteConfig } from "@/lib/site";

/**
 * Open Graph / Twitter share card, generated from the logo and site config.
 *
 * Built with `next/og` rather than checked in as a PNG so the card can never
 * fall out of sync with `siteConfig` — change the tagline and the image
 * follows.
 *
 * Bis hierher standen hier zwei Saetze der Vorlage: „Medicine that starts with
 * understanding you" und „Trusted by 40,000+ patients since 2011". Sichtbar
 * wurden sie nur beim Teilen eines Links — in WhatsApp, LinkedIn oder einer
 * Suchvorschau — und genau dort haetten sie am meisten geschadet. Jetzt tragen
 * sie die Schlagzeile der Seite und die Kontaktzeile aus `siteConfig`.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */

export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: siteConfig.brand.mint,
          color: "#000000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 16,
              background: "#ffffff",
            }}
          >
            { }
            <img
              src={brandMarkDataUri()}
              alt=""
              width={52}
              height={52}
            />
          </div>
          <span style={{ fontSize: 44, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 900 }}>
            Ihr Steuerberater in Pößneck
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 28,
              color: siteConfig.brand.green,
            }}
          >
            {`${siteConfig.legal.city} · ${siteConfig.legal.phone}`}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
