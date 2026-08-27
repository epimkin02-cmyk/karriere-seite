/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Steuerkanzlei Kutscher",
  /** Used as the `<title>` when a page doesn't set its own. */
  title: "Ihr Steuerberater in Pößneck — Frank Kutscher Steuerberatungsgesellschaft",
  description:
    "Steuerberatung für Unternehmen und Privatpersonen in Pößneck und Umgebung: Finanz- und Lohnbuchführung, Jahresabschlüsse, Betriebsprüfung, Existenzgründung und Generationsnachfolge.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Open Graph image, generated from the wordmark at request time by
   * `src/app/opengraph-image.tsx` rather than shipped as a static file.
   */
  ogImage: "/opengraph-image",
  twitterHandle: undefined,
  author: "Frank Kutscher Steuerberatungsgesellschaft mbH",
  /**
   * Die **Website** soll gefunden werden — das war zu Zeiten, als das Projekt
   * nur aus der Anzeigen-Landingpage bestand, umgekehrt.
   *
   * Der `noindex` gilt seitdem nur noch für `/karriere` und steht dort in
   * `src/app/karriere/layout.tsx`. Beides an einem Ort zu steuern ging nicht
   * mehr, sobald indexierte und nicht indexierte Seiten in derselben App
   * liegen: `robots.txt` gilt für die ganze Domain, die Metadaten je Route.
   */
  noindex: false,
  /** Browser theme-color (address bar / PWA) — the brand green. */
  themeColor: "#016d32",
  /** Brand palette, shared with the generated icon and OG routes. */
  brand: {
    green: "#016d32",
    lime: "#f8ffb4",
    mint: "#eff4f2",
  },
  /** Legal identity, used by the footer and the JSON-LD organisation node. */
  legal: {
    name: "Frank Kutscher Steuerberatungsgesellschaft mbH",
    street: "Naßäckerstr. 12",
    postalCode: "07381",
    city: "Pößneck",
    country: "DE",
    phone: "+49 3647 44558200",
    email: "frank.kutscher@kutscher-stb.de",
    imprint: "https://www.kutscher-stb.de/Impressum",
    privacy: "https://www.kutscher-stb.de/datenschutzerklaerung",
  },
} as const;
