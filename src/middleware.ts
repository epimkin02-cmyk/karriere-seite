import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Weiterleitungen von den alten URLs der Sellwerk-Seite.
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
 * 308 statt 302: Suchmaschinen übertragen die Wertung dauerhaft auf die neue
 * Adresse, statt beide Varianten weiterzuführen.
 */
const LEGACY_PATHS = new Map<string, string>([
  ["/Impressum", "/impressum"],
  ["/barrierefreiheitserklarung", "/barrierefreiheitserklaerung"],
  ["/jobs", "/karriere"],
]);

export function middleware(request: NextRequest) {
  const target = LEGACY_PATHS.get(request.nextUrl.pathname);
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Nur die drei Altpfade prüfen. Ein weiter gefasster Matcher liesse jede
  // Anfrage durch die Middleware laufen, für nichts.
  matcher: ["/Impressum", "/barrierefreiheitserklarung", "/jobs"],
};
