/**
 * Die Fotos der Landingpage — Pfade an einer Stelle.
 *
 * Sie liegen bereits im Repo: dieselben drei Unsplash-Aufnahmen, die die
 * Karriereseite benutzt (`src/data/mocks/karriere.ts`). Sie werden hier nicht
 * von dort importiert, weil das die Landingpage an eine Datei binden würde, die
 * mit ihr nichts zu tun hat — die Karriereseite ist ein eigener Auftritt und
 * bekommt irgendwann eigene Bilder.
 *
 * **Alles hier sind Platzhalter.** Sie zeigen, wie die Seite mit Bildern wirkt,
 * und nicht die Kanzlei. Beim Austausch gegen echte Aufnahmen werden die
 * Dateien unter `public/assets/kutscher/` ersetzt und die Namen bleiben stehen;
 * am Code der Abschnitte ändert sich dann nichts.
 *
 * ⚠️ `arbeitsplatz` ist das schwächste der drei: kräftiges Orange auf den
 * Bildschirmen, das gegen das Markengrün steht, und eine Bildsprache, die eher
 * nach Kreativagentur als nach Steuerkanzlei aussieht. Beim Ersetzen zuerst
 * dieses.
 *
 * Ein viertes Bild — ein Porträt — liegt ebenfalls im Repo und wird hier
 * bewusst **nicht** verwendet. Ein Stockfoto unter den Namen einer real
 * benannten Person zu setzen, sagt etwas Falsches über einen Menschen aus, und
 * das ist keine Platzhalterentscheidung mehr. Die Personenkarten in
 * [[UeberUns]] bleiben deshalb typografisch, bis echte Porträts vorliegen.
 */

export const FOTOS = {
  /** Heller Arbeitsplatz am Fenster. */
  kanzlei: "/assets/kutscher/kanzlei.jpg",
  /** Drei Personen im Gespräch an einem Tisch. */
  team: "/assets/kutscher/team.jpg",
  /** Schreibtisch mit zwei Bildschirmen. */
  arbeitsplatz: "/assets/kutscher/arbeitsplatz.jpg",
} as const;
