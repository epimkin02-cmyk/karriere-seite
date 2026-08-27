"use client";

// 📖 Docs: obsidian/frontend/components/dna-ink-scene.md

/**
 * Lazy client wrapper for the DNA Ink scene.
 *
 * `dynamic({ ssr: false })` keeps `three` and the scene module out of the
 * page's first-load JS: the chunk is only fetched once this wrapper mounts on
 * the client. It also guarantees the scene never runs during SSR, where there
 * is no canvas and no WebGL context to build one from.
 *
 * ## Why the scene fades in
 *
 * This used to be the other way round: the wrapper held a preloader curtain
 * open until the scene had drawn its first frame, so by the time anyone saw the
 * page the canvas was already there. The curtain is gone — it cost every
 * visitor the better part of a second before they could read anything — and
 * without it the scene simply appears mid-scroll, several hundred milliseconds
 * after the text, which reads as a glitch.
 *
 * So the canvas starts transparent and is faded in on its first frame. The box
 * around it has its final size from the first paint either way, so nothing
 * moves; only the scene itself resolves. `@react-spring/web`, like every other
 * animation on the site (hard rule #1).
 */

import { animated, useSpring } from "@react-spring/web";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { getDeviceTier } from "@/lib/scene/device";

import type { DnaInkProps } from "./dna-ink";

const DnaInk = dynamic(
  () => import("./dna-ink").then((m) => ({ default: m.DnaInk })),
  { ssr: false, loading: () => null },
);

/** Slow enough to read as the scene resolving, short enough not to be a wait. */
const FADE_CONFIG = { tension: 60, friction: 26 };

export interface LazyDnaInkProps extends DnaInkProps {
  /**
   * Skip the scene entirely below the desktop tier.
   *
   * The contact instance is laid out `hidden lg:block`, and `hidden` is
   * `display: none` — which hides the canvas but does **not** stop React from
   * mounting it. Measured on an iPhone viewport, the page built TWO WebGL
   * contexts: a second renderer, a second set of point buffers and a second
   * shader compile, all for a canvas that is never composited. Not rendering
   * the component is the only way to actually not pay for it.
   */
  desktopOnly?: boolean;
}

export const LazyDnaInk = ({ desktopOnly, ...props }: LazyDnaInkProps) => {
  const [painted, setPainted] = useState(false);

  /**
   * The tier check happens in an EFFECT, never during render.
   *
   * Reading `window.innerWidth` while rendering makes the client's first pass
   * disagree with the server's, and React throws hydration error #418 — which
   * is exactly what the first version of this did. Starting at `false` matches
   * the server, where `dynamic({ ssr: false })` renders `null` regardless, so
   * the first client pass is identical and the scene only appears afterwards.
   */
  const [allowed, setAllowed] = useState(!desktopOnly);

  useEffect(() => {
    if (!desktopOnly) return;
    setAllowed(getDeviceTier() === "desktop");
  }, [desktopOnly]);

  const handleReady = useCallback(() => setPainted(true), []);

  const fade = useSpring({ opacity: painted ? 1 : 0, config: FADE_CONFIG });

  if (!allowed) return null;

  return (
    <animated.div className="size-full" style={fade}>
      <DnaInk {...props} onReady={handleReady} />
    </animated.div>
  );
};
