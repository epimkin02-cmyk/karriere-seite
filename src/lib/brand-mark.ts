/**
 * The Kutscher monogram as raw geometry, plus a standalone SVG data URI.
 *
 * This file is the single source for the mark. `KutscherMark` in
 * `components/ui/icons` paints `MARK_PATH` with `currentColor`, which is right
 * for the DOM but useless to Satori: the icon, Apple-icon and Open Graph routes
 * render outside React's cascade, so the fill has to be baked in — hence the
 * second export.
 *
 * INTERIM ARTWORK. Replacing the firm's real logo is a one-line change here;
 * every surface that shows the mark reads from this constant.
 *
 * The geometry, on a 24×24 grid: a 3-wide stem from x 4 to 7 spanning y 3–21,
 * and two 4-wide slanted arms meeting it at the vertical centre (7,12). Nothing
 * is rounded — the design system's one radius belongs to surfaces, not to
 * letterforms, and a rounded K at favicon size just reads blurry.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */

export const MARK_PATH =
  "M4 3H7V21H4V3Z M16 3H20L11 12H7L16 3Z M7 12H11L20 21H16L7 12Z";

/**
 * @param fill - any CSS colour; baked into the SVG because Satori has no
 *   `currentColor` to inherit from.
 */
export const brandMarkDataUri = (fill: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}" fill="${fill}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
