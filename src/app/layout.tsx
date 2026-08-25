import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { AdaptiveGrid } from "@/components/common/grid";
import { PreloadProvider, Preloader } from "@/components/common/preloader";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/**
 * Figtree Variable — the site's only typeface, self-hosted.
 *
 * The Dantora template shipped Google Sans Flex through `next/font/google`.
 * Replaced here for two reasons, and the second one is not negotiable:
 *
 *  1. `next/font/google` fetches from `fonts.googleapis.com` at BUILD time.
 *  2. A German site may not hand a visitor's IP to Google without prior
 *     consent, and `next/font` inlines the file at build time precisely so the
 *     browser never talks to Google — but only if the family is available.
 *     Serving the file ourselves removes the question entirely: there is no
 *     third-party request on this page at all, which is also why there is no
 *     cookie banner to click away.
 *
 * Figtree is the closest match to the design's intent: a geometric humanist
 * sans with generous round forms that stays friendly at the Light weight the
 * layout uses for 60px headings. One variable file covers 300–900, so the
 * design's Light (300) and Medium (500) cost nothing extra — 20 KB for the
 * latin range, 10 KB more for latin-ext.
 *
 * The CSS variable keeps its original name so `--font-sans` in globals.css and
 * every `font-sans` utility downstream resolve unchanged.
 */
const figtree = localFont({
  variable: "--font-google-sans-flex",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/figtree-variable-latin.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/figtree-variable-latin-ext.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${figtree.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        {/* The provider wraps everything so any subtree can wait for the
            curtain; the page itself still renders underneath it from the first
            byte, which is what keeps the document crawlable. */}
        <PreloadProvider>
          <Preloader />
          <ScrollLayout>
            <AdaptiveGrid />
            <ReducedMotion />
            {/* No cookie banner, and that is a deliberate result rather than an
                omission. The page sets no cookies, loads no analytics, and — since
                the typeface is self-hosted — makes no third-party request at all.
                The one external embed, the Google map, is behind an explicit
                click that carries its own consent. Under TDDDG §25 a banner is
                required for storage that is not strictly necessary; there is
                none here, so a banner would be asking permission for nothing
                while covering the call to action on a phone. If tracking is ever
                added, the template's `LazyCookie` is still in
                `components/common/Cookie/` and this is where it mounts. */}
            {children}
          </ScrollLayout>
        </PreloadProvider>
      </body>
    </html>
  );
}
