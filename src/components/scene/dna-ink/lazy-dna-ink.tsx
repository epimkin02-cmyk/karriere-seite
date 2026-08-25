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
 * That laziness is exactly why `gatesPreload` exists. `window.load` does not
 * wait for a chunk fetched after hydration, so the [[preloader]] would lift its
 * curtain onto an empty hero. The gate is claimed **here**, in the eagerly
 * mounted wrapper, rather than inside the lazy component — by the time that
 * chunk arrives the preloader may already have finished, and there would be
 * nothing left to hold.
 */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePreload } from "@/components/common/preloader";
import { getDeviceTier } from "@/lib/scene/device";

import type { DnaInkProps } from "./dna-ink";

const DnaInk = dynamic(
  () => import("./dna-ink").then((m) => ({ default: m.DnaInk })),
  { ssr: false, loading: () => null },
);

export interface LazyDnaInkProps extends DnaInkProps {
  /**
   * Hold the preloader's curtain until this scene has drawn its first frame.
   * Set it on the hero instance only: a scene that is off screen never renders,
   * so its gate would never resolve.
   */
  gatesPreload?: boolean;
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

export const LazyDnaInk = ({
  gatesPreload,
  desktopOnly,
  ...props
}: LazyDnaInkProps) => {
  const { registerGate } = usePreload();
  const releaseRef = useRef<(() => void) | null>(null);

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

  useEffect(() => {
    if (!gatesPreload) return;
    const release = registerGate();
    releaseRef.current = release;
    // Released on unmount too, so a scene that is torn down before it ever
    // paints cannot strand the curtain.
    return release;
  }, [gatesPreload, registerGate]);

  const handleReady = useCallback(() => releaseRef.current?.(), []);

  if (!allowed) return null;

  return <DnaInk {...props} onReady={gatesPreload ? handleReady : undefined} />;
};
