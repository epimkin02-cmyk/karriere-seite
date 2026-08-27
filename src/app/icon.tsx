import { ImageResponse } from "next/og";

import { brandMarkDataUri } from "@/lib/brand-mark";

/**
 * Favicon, generated from the logo.
 *
 * Next's `icon` file convention: this replaces a checked-in `favicon.ico` and
 * emits the `<link rel="icon">` automatically, so the metadata helper no longer
 * hand-declares icon paths. Drawing it from `brandMarkDataUri` means the
 * favicon can never drift from the mark used in the header.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          // Weisser Grund, nicht der Markengruen.
          //
          // Das Zeichen besteht aus vier abgestuften Gruentoenen, und drei davon
          // sind hell. Auf gruenem Grund verschwindet die dunkle vierte Kachel
          // und das Zeichen liest sich als L. Auf Weiss steht es vollstaendig da
          // — so, wie es im Logo aussieht.
          background: "#ffffff",
          // ~19% — dieselbe Rundung wie die uebrigen Flaechen des Systems.
          borderRadius: 96,
        }}
      >
        { }
        <img
          src={brandMarkDataUri()}
          alt=""
          width={300}
          height={300}
        />
      </div>
    ),
    size,
  );
}
