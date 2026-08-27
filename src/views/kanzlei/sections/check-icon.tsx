/**
 * Dekoratives Häkchen vor einem Katalogpunkt.
 *
 * Steht als Inline-SVG mit `aria-hidden` im Markup und nicht als Zeichen „✔"
 * im Text: sonst liest eine Vorlesefunktion bei jedem der 52 Punkte beider
 * Kataloge „schweres weisses Häkchen" vor (HAUSREGELN-KANZLEI §5).
 *
 * Eigene Datei, weil beide Leistungsabschnitte sie brauchen — als lokale
 * Kopie in zwei Dateien wäre sie die erste Stelle, die auseinanderläuft.
 */

export interface CheckIconProps {
  className?: string;
}

export const CheckIcon = ({ className }: CheckIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="m4.5 12.5 5 5 10-11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
