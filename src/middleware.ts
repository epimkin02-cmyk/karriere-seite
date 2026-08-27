import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Weiterleitungen von den alten URLs — denen der Sellwerk-Seite und denen
 * dieser Website vor der Zusammenlegung.
 *
 * **Warum Middleware und nicht `redirects()` in `next.config.ts`.** Next
 * vergleicht die `source`-Pfade von `redirects()` case-insensitiv. Die Regel
 * `/Impressum` → `/impressum` trifft damit auch die Kleinschreibung und zeigt
 * auf sich selbst: `/impressum` antwortete mit 308 auf `/impressum`, eine
 * Endlosschleife, die im Build nicht auffällt und erst beim Aufruf sichtbar
 * wird. Hier vergleichen wir den Pfad selbst und damit exakt.
 *
 * Zwei der alten Adressen sind Fehler, die wir nicht mitschleppen:
 * `/Impressum` beginnt gross, und `/barrierefreiheitserklarung` fehlt ein „e".
 * Beide sind seit Jahren in Verzeichnissen, Signaturen und im Google-Index —
 * sie dürfen nicht ins Leere laufen, sobald diese Seite die alte ablöst.
 *
 * **Die vier Unterseiten.** `/ueber-uns`, `/fuer-unternehmen`, `/fuer-private`
 * und `/kontakt` existieren auf der Live-Seite und sind indexiert. Ihre Inhalte
 * stehen jetzt als Abschnitte auf `/`, die Routen sind gelöscht — ohne diese
 * Regeln lieferten sie ab dem Umschalten eine 404 an Besucher, die aus dem
 * Google-Treffer oder aus einem Lesezeichen kommen. Ziel ist deshalb der Anker
 * des Abschnitts, nicht bloss `/`: wer „Für Unternehmen" gesucht hat, soll auch
 * dort landen und nicht am Seitenanfang.
 *
 * Der Fragmentteil wird auf der `NextURL` gesetzt und nicht an den Pfad
 * gehängt: `pathname = "/#unternehmen"` wäre ein Pfad mit einem Rautenzeichen
 * darin, kein Fragment, und käme prozentkodiert beim Browser an.
 *
 * 308 statt 302: Suchmaschinen übertragen die Wertung dauerhaft auf die neue
 * Adresse, statt beide Varianten weiterzuführen.
 */
interface LegacyTarget {
  pathname: string;
  /** Mit führender Raute, oder leer für ein Ziel ohne Sprungmarke. */
  hash: string;
}

const LEGACY_PATHS = new Map<string, LegacyTarget>([
  ["/Impressum", { pathname: "/impressum", hash: "" }],
  [
    "/barrierefreiheitserklarung",
    { pathname: "/barrierefreiheitserklaerung", hash: "" },
  ],
  ["/jobs", { pathname: "/karriere", hash: "" }],
  ["/ueber-uns", { pathname: "/", hash: "#ueber-uns" }],
  ["/fuer-unternehmen", { pathname: "/", hash: "#unternehmen" }],
  ["/fuer-private", { pathname: "/", hash: "#private" }],
  ["/kontakt", { pathname: "/", hash: "#kontakt" }],
]);

export function middleware(request: NextRequest) {
  const target = LEGACY_PATHS.get(request.nextUrl.pathname);
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target.pathname;
  url.hash = target.hash;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Nur die sieben Altpfade prüfen. Ein weiter gefasster Matcher liesse jede
  // Anfrage durch die Middleware laufen, für nichts.
  matcher: [
    "/Impressum",
    "/barrierefreiheitserklarung",
    "/jobs",
    "/ueber-uns",
    "/fuer-unternehmen",
    "/fuer-private",
    "/kontakt",
  ],
};
