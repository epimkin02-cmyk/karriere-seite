/**
 * Die Bildmarke der Kanzlei — vier Quadrate — als Geometrie und als SVG-Data-URI.
 *
 * Bis hierher stand an dieser Stelle ein selbstgezeichnetes K als Platzhalter.
 * Das echte Logo liegt jetzt als `public/assets/marke/logo.png` bei und trägt
 * links diese vier Kacheln, rechts den Schriftzug. Der Schriftzug bleibt im
 * Bild; die **Kacheln** stehen hier zusätzlich als Vektor, und zwar aus einem
 * handfesten Grund: Favicon, Apple-Icon und das Open-Graph-Bild werden zur
 * Laufzeit gerendert und brauchen ein **quadratisches** Zeichen. Ein
 * 200 × 36 breites Logo auf 32 × 32 gequetscht ist unlesbar.
 *
 * Die Geometrie ist nicht nachgezeichnet, sondern **aus der Logodatei gemessen**:
 * ein 2 × 2-Raster aus 9 × 9-Kacheln mit 1 Einheit Fuge, insgesamt 19 × 19. Die
 * vier Farben sind pixelgenau aus derselben Datei entnommen. Deshalb ist dieser
 * Teil des Logos in jeder Grösse gestochen scharf, unabhängig davon, wie
 * hochauflösend die gelieferte PNG ist.
 *
 * ## Warum die Farben hier fest stehen und nicht aus `siteConfig` kommen
 *
 * Der Rest der Seite läuft auf `#016d32`, der vom Kunden vorgegebenen
 * Akzentfarbe. Das Logo trägt `#006e36`. Der Unterschied ist mit blossem Auge
 * nicht zu sehen, aber ein Logo ist kein Gestaltungselement, das man an ein
 * Farbschema anpasst — es ist eine Marke und wird wiedergegeben, wie sie ist.
 * Die drei helleren Töne haben ohnehin keine Entsprechung im Token-System.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */

/** Kantenlänge des Zeichens in eigenen Einheiten — zwei Kacheln plus Fuge. */
export const MARK_SIZE = 19;

/** Die vier Kacheln, im Uhrzeigersinn von oben links. Aus dem Logo gemessen. */
export const MARK_TILES = [
  { x: 0, y: 0, fill: "#aecab7" },
  { x: 10, y: 0, fill: "#d3e2d7" },
  { x: 0, y: 10, fill: "#6ea482" },
  { x: 10, y: 10, fill: "#006e36" },
] as const;

/**
 * Das Zeichen als eigenständige SVG-Data-URI.
 *
 * Satori — der Renderer hinter `ImageResponse` — kennt weder `currentColor`
 * noch React-Komponenten aus dem eigenen Baum, deshalb die zweite Ausgabeform
 * neben [[KutscherMark]].
 */
export const brandMarkDataUri = (): string => {
  const rects = MARK_TILES.map(
    (t) => `<rect x="${t.x}" y="${t.y}" width="9" height="9" fill="${t.fill}"/>`,
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_SIZE} ${MARK_SIZE}">${rects}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Das vollständige Logo als Datei.
 *
 * ⚠️ Die gelieferte Datei ist **200 × 36 px**. Für die Kopfzeile reicht das
 * gerade eben bei einfacher Pixeldichte; auf einem Telefon mit zwei- oder
 * dreifacher Dichte — und das sind rund 90 % der Besuche — ist der Schriftzug
 * sichtbar weich. Sobald eine Vektorfassung (SVG, EPS, PDF) oder wenigstens
 * eine PNG ab 1000 px Breite vorliegt, wird sie hier ausgetauscht; sonst ändert
 * sich nichts.
 */
export const LOGO = {
  src: "/assets/marke/logo.png",
  width: 200,
  height: 36,
  /** Trägt den Firmennamen, weil das Bild ihn zeigt und Text ihn nicht doppelt. */
  alt: "Frank Kutscher Steuerberatungsgesellschaft mbH",
} as const;
