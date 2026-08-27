// 📖 Docs: obsidian/frontend/components/ui.md

/**
 * Die Bildmarke der Kanzlei — die vier Quadrate aus dem Logo.
 *
 * Bis zur Lieferung des echten Logos stand hier ein selbstgezeichnetes K. Das
 * ist Geschichte: Geometrie und Farben stammen jetzt pixelgenau aus der
 * Logodatei (siehe `src/lib/brand-mark.ts`).
 *
 * **Ohne `currentColor`**, anders als jedes andere Icon im System. Bei den
 * übrigen Symbolen ist die Farbe eine Token-Entscheidung (Hausregel #7); hier
 * ist sie Teil der Marke. Vier Kacheln in vier abgestuften Grüntönen sind das
 * Zeichen — eingefärbt wäre es ein anderes.
 *
 * Verwendet wird es dort, wo es **quadratisch** sein muss: Favicon, Apple-Icon,
 * Open-Graph-Bild. In der Kopfzeile steht das vollständige Logo als Bild.
 */

import { MARK_SIZE, MARK_TILES } from "@/lib/brand-mark";

export interface IconProps {
  className?: string;
}

export const KutscherMark = ({ className }: IconProps) => (
  <svg
    viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {MARK_TILES.map((tile) => (
      <rect
        key={`${tile.x}-${tile.y}`}
        x={tile.x}
        y={tile.y}
        width={9}
        height={9}
        fill={tile.fill}
      />
    ))}
  </svg>
);
