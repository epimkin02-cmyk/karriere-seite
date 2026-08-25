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
  title: "Karriere bei der Steuerkanzlei Kutscher in Pößneck",
  description:
    "Steuerfachangestellte/r oder Steuerfachwirt/in (m/w/d) in Pößneck: überdurchschnittliches Gehalt, bis zu drei Tage Homeoffice, 4-Tage-Woche möglich, 600 € Gesundheitsbudget. Schnellbewerbung ohne Unterlagen.",
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
   * The page is deliberately excluded from search engines — it is the landing
   * page of a paid recruiting funnel, and the client wants it reachable only
   * through the ad. `robots.ts`, the metadata generator and the sitemap all
   * read this one flag, so flipping it here is the whole switch.
   */
  noindex: true,
  /** Browser theme-color (address bar / PWA) — the brand green. */
  themeColor: "#246f65",
  /** Brand palette, shared with the generated icon and OG routes. */
  brand: {
    green: "#246f65",
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
