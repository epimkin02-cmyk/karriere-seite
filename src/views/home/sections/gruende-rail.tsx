"use client";

// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Gründe-Schiene — die zieh- und scrollbare Kartenspur.
 *
 * Natives `overflow-x-auto` erledigt Rad, Trackpad, Touch und Tastatur; nur die
 * Maus kann so eine Spur nicht greifen. Darüber liegt deshalb Pointer-Capture:
 * drücken, ziehen, loslassen — `scrollLeft` wird direkt geschrieben. Der Klick,
 * der eine Ziehbewegung beendet, wird geschluckt, damit aus einem Zug nie ein
 * Klick auf den Button der Abschlusskarte wird.
 *
 * Der 2px-Balken darunter ist die Positionsanzeige: er federt aus `scrollLeft`
 * und ist das einzige animierte Stück (harte Regel #1).
 *
 * Der Container ist fokussierbar und benannt. Eine horizontale Spur ohne
 * `tabIndex` ist für Tastatur und Screenreader eine Sackgasse — mit ihm scrollen
 * die Pfeiltasten die Schiene, und der Name sagt, was da scrollt.
 */

import { animated, useSpring } from "@react-spring/web";
import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type UIEvent,
} from "react";

import { useLoop } from "@/hooks/animation/use-render-loop";

const PROGRESS_CONFIG = { tension: 260, friction: 38 };
/** Anteil der Reststrecke, den die Schiene pro Frame schließt. */
const GLIDE = 0.18;
/** Geschwindigkeit, die über das Loslassen hinaus getragen wird (in Frames). */
const MOMENTUM = 14;
/** Darunter ist der Glide fertig und natives Scrollen übernimmt wieder. */
const SETTLE_PX = 0.5;
/** Pointer-Weg (px), ab dem ein Druck als Zug und nicht als Klick zählt. */
const DRAG_THRESHOLD = 4;
const EVERY_FRAME = 0;
/**
 * Ruhefüllung des Balkens. Achtzehn Karten sind eine sehr lange Spur — ohne
 * Sockel wäre der Balken am Anfang ein unsichtbarer Strich statt einer Anzeige.
 */
const MIN_FILL = 0.12;

const clampScroll = (rail: HTMLDivElement, value: number): number =>
  Math.min(Math.max(value, 0), rail.scrollWidth - rail.clientWidth);

export interface GruendeRailProps {
  /** Zugänglicher Name der Spur — kommt aus dem Sektions-Heading. */
  label: string;
  children: ReactNode;
}

export const GruendeRail = ({ label, children }: GruendeRailProps) => {
  const railRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);
  /** Wohin die Schiene läuft; der Ticker zieht `scrollLeft` dorthin. */
  const target = useRef<number | null>(null);
  const velocity = useRef(0);
  const lastClientX = useRef(0);

  const [{ fill }, api] = useSpring(() => ({
    fill: MIN_FILL,
    config: PROGRESS_CONFIG,
  }));

  // Zieht die Schiene einmal pro Frame aus dem geteilten Ticker Richtung
  // `target`. Ohne Ziel bleibt natives Scrollen (Rad, Trackpad, Touch,
  // Pfeiltasten) völlig unangetastet.
  useLoop(
    () => {
      const rail = railRef.current;
      if (!rail || target.current === null) return;

      const distance = target.current - rail.scrollLeft;
      if (!dragging.current && Math.abs(distance) < SETTLE_PX) {
        target.current = null;
        return;
      }
      rail.scrollLeft += distance * GLIDE;
    },
    { framerate: EVERY_FRAME },
  );

  const syncProgress = (rail: HTMLDivElement) => {
    const scrollable = rail.scrollWidth - rail.clientWidth;
    if (scrollable <= 0) return;
    api.start({
      fill: MIN_FILL + (1 - MIN_FILL) * (rail.scrollLeft / scrollable),
    });
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) =>
    syncProgress(event.currentTarget);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return; // natives Touch-Scrollen ist besser
    // Verhindert den browsereigenen Bild-/Textzug, der still den Pointer-Strom
    // stiehlt und die Schiene mitten in der Geste stehen lässt.
    event.preventDefault();
    const rail = event.currentTarget;
    dragging.current = true;
    moved.current = false;
    dragStartX.current = event.clientX;
    lastClientX.current = event.clientX;
    velocity.current = 0;
    // Dort greifen, wo die Schiene wirklich steht — nicht an einem alten Ziel.
    dragStartScroll.current = rail.scrollLeft;
    target.current = rail.scrollLeft;
    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const travelled = event.clientX - dragStartX.current;
    if (Math.abs(travelled) > DRAG_THRESHOLD) moved.current = true;
    velocity.current = lastClientX.current - event.clientX;
    lastClientX.current = event.clientX;
    // Ein Ziel setzen statt `scrollLeft` zu schreiben: der Ticker zieht darauf
    // zu, und genau das macht aus dem 1:1-Griff einen Glide.
    target.current = clampScroll(
      event.currentTarget,
      dragStartScroll.current - travelled,
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    // Die Restgeschwindigkeit mitnehmen, damit die Schiene ausrollt statt
    // abrupt zu stehen.
    target.current = clampScroll(
      event.currentTarget,
      (target.current ?? event.currentTarget.scrollLeft) +
        velocity.current * MOMENTUM,
    );
    velocity.current = 0;
  };

  // Ein Zug, der über einer Karte endet, darf deren Link nicht auslösen.
  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!moved.current) return;
    event.preventDefault();
    event.stopPropagation();
    moved.current = false;
  };

  return (
    <>
      <div
        ref={railRef}
        // Fokussierbare, benannte Gruppe: ohne sie erreicht die Tastatur die
        // Spur nur über die Karteninhalte und kann sie nie selbst bewegen.
        tabIndex={0}
        role="group"
        aria-label={label}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        // `touch-pan-y` behält das vertikale Seitenscrollen auf dem Handy, wir
        // übernehmen nur die horizontale Achse.
        // `[&_img]:pointer-events-none` ist die zweite Hälfte des
        // Nativ-Zug-Fixes aus `handlePointerDown`.
        // `[scroll-behavior:auto]` stoppt Lenis' geerbtes `smooth`, das sonst
        // gegen die direkten `scrollLeft`-Schreibvorgänge kämpft und den Zug
        // gummiartig macht.
        // Kein Scroll-Snap: `snap-mandatory` schnappt bei jedem Layout-Wechsel
        // neu und landet ungefragt auf Karte zwei — und es kämpft gegen den
        // Glide, der ohnehin schon dort landet, wo man loslässt.
        className="flex cursor-grab overflow-x-auto overscroll-x-contain touch-pan-y select-none [scroll-behavior:auto] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
      >
        {/* Die Polsterung sitzt auf der Liste, nicht auf dem Scroll-Container:
            ein `padding-right` am Scroller selbst wird beim letzten Element
            verschluckt, hier trägt es sauber als Auslauf-Gasse. */}
        <ul className="flex shrink-0 gap-4 px-5 md:px-10">{children}</ul>
      </div>

      {/* Der Balken hält den Seitenrand der Sektion, damit er als Kante der
          Spur liest und nicht als eigenes Element. */}
      <div className="relative mx-5 mt-6 h-[0.125rem] bg-border-subtle md:mx-10 lg:mt-10">
        <animated.div
          className="h-full origin-left bg-accent"
          style={{ transform: fill.to((value) => `scaleX(${value})`) }}
        />
      </div>
    </>
  );
};
