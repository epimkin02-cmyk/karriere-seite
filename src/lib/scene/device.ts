/**
 * Device tiering for the WebGL scene — read ONCE, at construction.
 *
 * Every per-device decision the scene makes lives here: how many points to
 * build, how many pixels to render them into, how often to draw, and whether to
 * draw at all. Keeping them in one module is the point — when the DPR clamp and
 * the particle count are decided in two different files they drift, and the
 * drift is invisible until someone profiles a phone.
 *
 * Read once, never re-read. A device does not change tier mid-session, and
 * rebuilding 200k points on a resize costs far more than the mismatch is worth.
 * The one thing that legitimately changes at runtime is the reduced-motion
 * preference, which is why that has its own live query.
 *
 * 📖 Skill: .claude/skills/optimize-3d-scene
 */

export type DeviceTier = "mobile" | "tablet" | "desktop";

/**
 * The coarse-pointer clause is what makes this correct rather than merely
 * plausible: a 1024px-wide tablet and a 430px phone both fail a width-only test
 * in ways that matter, and "has no hover and a coarse pointer" is the honest
 * description of the hardware we are protecting.
 */
const isCoarse = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

export const getDeviceTier = (): DeviceTier => {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768 || (isCoarse() && w < 1024)) return "mobile";
  if (w < 1280 || isCoarse()) return "tablet";
  return "desktop";
};

/**
 * Pixel-ratio ceiling per tier.
 *
 * A 3× phone renders NINE times the fragments of a 1× screen. For a cloud of
 * soft, additively blended sprites with no hard edge anywhere in frame, that
 * buys nothing a person can see — this scene has no thin lines and no text in
 * the shader, which is the case where dropping below 1.0 would alias visibly.
 * The floor of 0.75 on the larger tiers keeps a low-DPI external monitor from
 * rendering the cloud too coarsely to read as a cloud.
 */
export const maxPixelRatioFor = (tier: DeviceTier): number =>
  tier === "mobile" ? 0.85 : tier === "tablet" ? 1.25 : 1.5;

/**
 * Frame budget in milliseconds per tier, as the shared ticker expects it
 * (`0` = draw on every tick).
 *
 * The ink plume evolves on a slow noise field; at 30 fps it still reads as
 * drifting rather than stepping, and halving the frame count is the single
 * largest saving available on a phone. Note the ticker skips while
 * `time - last <= framerate`, so 1000/30 measures nearer 26 fps than 30 — it
 * errs cheap, which is the right direction, but do not quote 30 as measured.
 */
export const frameBudgetFor = (tier: DeviceTier): number =>
  tier === "mobile" ? 1000 / 30 : tier === "tablet" ? 1000 / 45 : 0;

/**
 * Point-count multiplier per tier.
 *
 * Roughly a third on mobile. The phone dies on fill rate, not on vertex count —
 * 200k additively blended sprites each covering several pixels is an enormous
 * amount of overdraw — so this is the lever that matters, far more than
 * geometry detail.
 */
export const pointScaleFor = (tier: DeviceTier): number =>
  tier === "mobile" ? 0.34 : tier === "tablet" ? 0.6 : 1;

/** Live, not cached: a person can flip this while the page is open. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The nearest thing the web exposes to iOS Low Power Mode, which has no API.
 * `saveData` is an explicit user choice; `deviceMemory <= 2` is a phone that
 * will struggle with this scene whatever we do to it.
 */
export const isEnergySaver = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  return Boolean(nav.connection?.saveData) || (nav.deviceMemory ?? 8) <= 2;
};

/**
 * Should the scene play its entrance and then stop drawing entirely?
 *
 * WebGL keeps the last drawn frame on the canvas, so a frozen scene costs
 * exactly nothing from then on — it is still a picture, just not a moving one.
 * That is the right answer both for someone who asked the OS for less motion
 * and for a phone that has told us it is conserving power.
 */
export const sceneShouldFreeze = (tier: DeviceTier): boolean =>
  prefersReducedMotion() || (tier === "mobile" && isEnergySaver());
