"use client";

// 📖 Docs: obsidian/frontend/components/dna-ink-scene.md

/**
 * Lazy client wrapper für die DNA-Ink-Szene — und die Stelle, an der auf dem
 * Telefon entschieden wird, dass sie gar nicht erst läuft.
 *
 * `dynamic({ ssr: false })` hält `three` und das Szenenmodul aus dem
 * Erst-Bundle: der Chunk wird erst geholt, wenn dieser Wrapper auf dem Client
 * montiert. Er garantiert ausserdem, dass die Szene nie im SSR läuft, wo es
 * weder Canvas noch WebGL-Kontext gibt.
 *
 * ## Auf dem Telefon steht ein Standbild
 *
 * Gemessen auf 390 px mit vierfach gedrosselter CPU, Startseite gegen eine
 * Seite ohne Szene:
 *
 * | | mit Szene | ohne |
 * |---|---|---|
 * | JavaScript | 344 KB | 194 KB |
 * | LCP | 1196 ms | 228 ms |
 * | blockierter Hauptthread | 4412 ms in 52 Tasks | 251 ms in 2 |
 *
 * Die Szene kostet also **150 KB und rund vier Sekunden Hauptthread** — für
 * eine Dekoration, auf den rund 90 % der Besuche, die vom Telefon kommen. Vier
 * Sekunden blockierter Hauptthread heissen: Antippen wirkt nicht, Scrollen
 * ruckelt, und das alles genau in den Sekunden, in denen jemand entscheidet, ob
 * er hier bleibt.
 *
 * Statt dessen liegt dort ein **aus derselben Szene gerendertes Standbild**
 * (`szene-standbild.webp`, 11 KB). Nicht nachgebaut, nicht gemalt: aus der
 * laufenden Szene bei voller Punktdichte aufgenommen, im Seitenverhältnis des
 * Streifens, den das Telefon zeigt. Der Bildrand ist pixelgenau `#eff4f2` —
 * dieselbe Farbe, mit der die Szene ihren Puffer löscht und mit der das Band
 * hinterlegt ist, damit an den Kanten keine Naht steht.
 *
 * Auf dem Rechner bleibt die Szene live. Dort ist sie bezahlbar, und dort sieht
 * man ihr die Bewegung auch an.
 *
 * ## Das Standbild ist auch auf dem Rechner das Posterbild
 *
 * Es wird dort **nicht** durch die Szene ersetzt, sondern liegt darunter; die
 * Szene blendet sich beim ersten gezeichneten Frame darüber ein
 * (`@react-spring/web`, Hausregel #1). Vorher stand an dieser Stelle ein
 * leerer Kasten, bis der `three`-Chunk da war. Elf Kilobyte dafür, dass die
 * Fläche vom ersten Moment an aussieht, wie sie aussehen soll, sind ein guter
 * Tausch.
 */

import { animated, useSpring } from "@react-spring/web";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { getDeviceTier, type DeviceTier } from "@/lib/scene/device";

import type { DnaInkProps } from "./dna-ink";

const DnaInk = dynamic(
  () => import("./dna-ink").then((m) => ({ default: m.DnaInk })),
  { ssr: false, loading: () => null },
);

/** Langsam genug, dass es als Auflösen liest, kurz genug, dass es kein Warten ist. */
const FADE_CONFIG = { tension: 60, friction: 26 };

const STILL = {
  src: "/assets/kutscher/szene-standbild.webp",
  width: 1536,
  height: 393,
} as const;

/**
 * Rein dekorativ, deshalb `alt=""`.
 *
 * Eine Beschreibung wie „abstrakte grüne Doppelhelix" wäre für eine
 * Screenreader-Nutzerin kein Gewinn: die Grafik trägt keine Information, die
 * nicht schon im Text daneben steht. `alt=""` nimmt sie aus dem Baum, statt
 * eine Beschreibung vorzulesen, mit der niemand etwas anfangen kann.
 */
const Standbild = () => (
  <Image
    src={STILL.src}
    width={STILL.width}
    height={STILL.height}
    alt=""
    priority
    sizes="(min-width: 64rem) 50vw, 100vw"
    className="size-full object-cover"
  />
);

export interface LazyDnaInkProps extends DnaInkProps {
  /**
   * Die Szene unterhalb des Desktop-Tiers ganz weglassen — auch das Standbild.
   *
   * Die Kontakt-Instanz liegt `hidden lg:block`, und `hidden` ist
   * `display: none` — das versteckt den Canvas, hält React aber nicht davon ab,
   * ihn zu montieren. Auf einem iPhone-Viewport gemessen baute die Seite ZWEI
   * WebGL-Kontexte: zweiter Renderer, zweiter Satz Punktpuffer, zweiter
   * Shader-Compile, alles für eine Fläche, die nie zusammengesetzt wird. Die
   * Komponente nicht zu rendern ist der einzige Weg, das wirklich nicht zu
   * bezahlen.
   */
  desktopOnly?: boolean;
}

export const LazyDnaInk = ({ desktopOnly, ...props }: LazyDnaInkProps) => {
  const [painted, setPainted] = useState(false);

  /**
   * Der Tier-Test läuft in einem EFFEKT, niemals beim Rendern.
   *
   * `window.innerWidth` während des Renderns zu lesen, lässt den ersten
   * Client-Durchlauf vom Server abweichen, und React wirft Hydration-Fehler
   * #418 — genau das tat die erste Fassung. `null` als Startwert ist das, was
   * der Server sieht, der erste Client-Durchlauf ist damit identisch, und die
   * Entscheidung fällt erst danach.
   */
  const [tier, setTier] = useState<DeviceTier | null>(null);

  useEffect(() => setTier(getDeviceTier()), []);

  const handleReady = useCallback(() => setPainted(true), []);

  const fade = useSpring({ opacity: painted ? 1 : 0, config: FADE_CONFIG });

  // Kontakt-Instanz unterhalb des Desktops: gar nichts, auch kein Bild. Sie
  // liegt dort ohnehin hinter `display: none`.
  if (desktopOnly && tier !== "desktop") return null;

  // Vor der Messung (Server und erster Client-Durchlauf) und auf dem Telefon:
  // nur das Standbild. `three` wird in diesem Fall nie geholt.
  if (tier === null || tier === "mobile") return <Standbild />;

  return (
    <div className="relative size-full">
      <Standbild />
      <animated.div className="absolute inset-0" style={fade}>
        <DnaInk {...props} onReady={handleReady} />
      </animated.div>
    </div>
  );
};
