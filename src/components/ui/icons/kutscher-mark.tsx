// 📖 Docs: obsidian/frontend/components/ui.md

/**
 * Kutscher monogram — a geometric K.
 *
 * INTERIM. The template shipped a DNA helix here, which belonged to the medical
 * clinic it was designed for and reads as plainly wrong on a tax firm. This
 * replaces it with a mark that at least says the right thing, drawn to the same
 * rules as the rest of the system: flat fill, no stroke, no shadow, and painted
 * with `currentColor` so the lime-on-green pairing stays a token decision
 * rather than part of the artwork (hard rule #7).
 *
 * When the firm's real logo arrives, replace the geometry in ONE place — the
 * `MARK_PATH` constant in `src/lib/brand-mark.ts` — and re-export it here. The
 * favicon, the Apple touch icon and the Open Graph card all read that same
 * constant, so they cannot drift apart from the header.
 *
 * The arms meet the stem rather than floating clear of it: a detached-arm K
 * looks deliberate at 40px in the header and looks broken at 16px in a browser
 * tab, and the tab is the size that has to survive.
 */

import { MARK_PATH } from "@/lib/brand-mark";

export interface IconProps {
  className?: string;
}

export const KutscherMark = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d={MARK_PATH} fill="currentColor" />
  </svg>
);
