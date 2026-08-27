// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Ein Bildband — die eine Stelle, an der auf dieser Seite ein Foto steht.
 *
 * ## Warum es eine Komponente ist und nicht dreimal dasselbe Markup
 *
 * Ein Foto auf einer Seite wie dieser hat drei Eigenschaften, die man an jeder
 * Einbaustelle einzeln vergessen kann und dann genau einmal zu viel vergisst:
 * ein **festes Seitenverhältnis**, damit beim Nachladen nichts springt; die
 * richtigen **`sizes`**, sonst lädt ein Telefon die 1600 px breite Fassung für
 * eine 350 px breite Fläche; und ein **`alt`**, das beschreibt statt zu
 * benennen. Hier stehen sie einmal.
 *
 * ## Das Seitenverhältnis wechselt mit der Breite
 *
 * Auf dem Telefon 4:3, ab `lg` 21:9. Ein breites Panoramabild auf 390 px ist
 * ein 100 px hoher Streifen, auf dem nichts mehr zu erkennen ist; dasselbe Bild
 * im Hochformat über die volle Breite eines Rechners schiebt den nächsten
 * Abschnitt aus dem Bild. `object-cover` schneidet dabei zu, statt zu
 * verzerren — deshalb sollten die Motive Luft am Rand haben.
 *
 * ## Diese Bilder sind Platzhalter
 *
 * Sie stammen von Unsplash und liegen seit dem Bau der Karriereseite im Repo.
 * Weder dieser Rechner noch der Entwicklungsrechner kommen an Unsplash heran
 * (die Domain ist in beiden Netzen gesperrt), es sind also genau diese drei
 * Motive verfügbar. Sie zeigen, wie die Seite mit Bildern wirkt — sie zeigen
 * nicht die Kanzlei. Sobald echte Aufnahmen da sind, werden die Dateien unter
 * `public/assets/kutscher/` ersetzt; an diesem Code ändert sich dabei nichts.
 *
 * `loading="lazy"` ist die Vorgabe von `next/image` und bleibt: kein Bild
 * dieser Komponente steht auf dem ersten Bildschirm.
 */

import Image from "next/image";

import { Inview } from "@/components/animation/springs/in-view";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

import type { Foto } from "./fotos";

const FOCUS = {
  oben: "object-top",
  mitte: "object-center",
  unten: "object-[50%_82%]",
} as const;

export interface BildProps {
  /** Bild samt Alternativtext aus [[FOTOS]]. */
  foto: Foto;
  /**
   * Welcher Teil des Motivs beim Zuschnitt sicher im Bild bleibt.
   * `oben` bei Personen, deren Köpfe sonst abgeschnitten werden.
   */
  focus?: keyof typeof FOCUS;
  className?: string;
}

export const Bild = ({ foto, focus = "mitte", className }: BildProps) => (
  <Inview
    {...ELEMENT_MOTION}
    mode="once"
    tag="div"
    className={`relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface-section md:aspect-[16/9] lg:aspect-[21/9] ${className ?? ""}`}
  >
    <Image
      src={foto.src}
      alt={foto.alt}
      fill
      // Bis `lg` volle Breite minus der Seitenränder, darüber gedeckelt durch
      // die 85rem des Inhaltsmasses. Ohne diese Angabe nimmt Next `100vw` an
      // und liefert einem Rechner die grösste Fassung für eine Fläche, die nie
      // breiter als 1360 px wird.
      sizes="(min-width: 85rem) 1360px, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
      className={`object-cover ${FOCUS[focus]}`}
    />
  </Inview>
);
