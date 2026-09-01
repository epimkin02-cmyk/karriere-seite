---
tags: [meta, changelog]
updated: 2026-08-10
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-08-10

- **Preloader added** — `src/components/common/preloader/`. A brand-green curtain
  with a ring drawn clockwise from twelve o'clock, the DNA mark filling
  diagonally from its lower-left, and a percentage counter; all three are `.to()`
  interpolations off a single `progress` spring. The bar creeps to 85% on its own
  and completes once the page is ready. Exit is `clip-path: inset(0 0 B 0)` with
  `B` springing to 100 — the panel is trimmed from its bottom edge upward, so the
  page is uncovered bottom-to-top.
  - Readiness is `window.load` **and** `document.fonts.ready`: on a
    typography-first design, uncovering mid-swap shows the hero in a fallback
    face and then reflows it.
  - New `<RevealOnReady>` holds the hero's entry animations until the curtain has
    finished. The hero is in view from the first frame, so its `TextEngine`
    reveals otherwise run to completion behind the curtain. It re-arms them by
    swapping a `key` (a remount, so the copy stays server-rendered and
    crawlable) rather than by conditionally rendering the subtree.
  - `onRest` fires at *any* rest, including the spring's initial settle, so the
    handler guards on `lifting` — without it the curtain lifts on mount.
  See [[components/common]] *Preloader*.
- **The whole hero enters, and it enters sooner.**
  - Every block is now animated, not just the copy: the divider, trust line,
    service chips and actions run `ELEMENT_MOTION` on `<Spring>` with a
    140/220/300/380 ms cascade. New preset in `text-presets.ts` — same
    blur-and-rise as the copy so it reads as one gesture. `<RevealOnReady>`
    gained a `className` and now carries each block's positioning itself,
    rather than nesting inside a second wrapper.
  - The hand-off moved off `onRest` to a threshold on the curtain's own
    position (`REVEAL_AT_INSET`, 60). Waiting for rest meant the reveal
    *started* on an already-uncovered page. Measured: the curtain is visually
    gone by ~1.9 s but only rests at ~2.6 s, because the spring approaches 100%
    asymptotically — `onRest` is ~800 ms later than it looks.
- **DNA scene settings panel is off by default**, development included. It sat
  over the header's Contact button in every screenshot, and it was the only
  reader of the `localStorage` override that used to mask the committed config.
  Pass `controls` explicitly to tune.
- **Preloader corrected: it was lifting early, and the hero animated twice.**
  Both were measured, not guessed — a per-frame probe of the overlay and of the
  hero's first animated word.
  - *Early lift.* Readiness was `window.load` + fonts, neither of which waits for
    a lazily mounted chunk — and the hero's centrepiece is one
    (`dynamic({ ssr: false })`). The overlay was gone at **982 ms**, before
    `three` had been fetched. Readiness now also requires every registered
    **gate** to release, plus a 900 ms floor so a warm cache cannot flash the
    ring past. `LazyDnaInk gatesPreload` claims a gate and releases it from the
    scene's first *drawn frame*, not its mount. A 6 s ceiling forces the curtain
    up if a gate never resolves.
  - *Double hero reveal.* The remount in `RevealOnReady` re-armed the animation
    but never suppressed the first, behind-the-curtain pass — which ended at full
    opacity, so the frame that removed the overlay painted finished text one tick
    before the remount reset it. The subtree is now `opacity-0` until `revealed`.
    Timeline after the fix: overlay up 0→2640 ms at zero opacity, then a single
    reveal 2704→3121 ms.
- **Burger menu added; scroll choreography restored on small screens.**
  - New `MobileMenu` below `lg` — the nav links plus the Contact action behind
    an accessible toggle (`aria-expanded`/`aria-controls`, Escape, scroll-lock,
    links close on activation). The header's pill CTA is now desktop-only: as a
    bare arrow disc on a phone it read as a broken control.
  - The Services scrub and both overlays run at **every** breakpoint again
    (ADR-0020 §4 amended). Safe on touch because none of them calls
    `preventDefault` — they are pure functions of scroll position.
  - **Scroll-snap removed from both rails.** `snap-mandatory` re-snaps on any
    layout shift, and Team changes height as it becomes sticky: the rail was
    landing on card two unprompted — measured `scrollLeft: 383`, exactly one
    card. It also fought the drag-and-glide.
  - Contact switched from `justify-center` to `justify-start` + `pt-28`: the
    stacked content is taller than a phone viewport, so centring pushed the
    heading under the fixed header instead of balancing anything.
- **DNA scene retuned** from a client panel session — a softer, cooler read:
  two-tone strand (`#247061` → `#4ca98a`) instead of a flat green, a muted
  `#81a297` ink core resolving to `#f7fec3`, `brightness` down to `0.4`,
  `turbulence` more than halved to `1.6`, and a much finer `helixSize: 1` with
  `inkSize: 6`. Camera pulled in to `12`, coil widened to `1.75`, pointer
  influence up (`radius 5`, `strength 1.55`), `maxPixelRatio` down to `1.5`.
  Applied to **both** instances — hero and Contact share `DNA_INK_CONFIG`, so
  the one file covers them. A stored panel override was clearing from
  `localStorage` as part of this: it would have masked the committed values in
  development. See [[dna-ink-scene]] *Tuning*.
- **Tablet and mobile layouts added** (ADR-0020, amending ADR-0019). `lg`
  (1024px) is the single layout breakpoint: above it the Figma composition, below it a flow layout. Sections
  are now authored in **mobile** DOM order with the desktop composition rebuilt
  from `lg:` offsets — which is why the hero copy needs an explicit `z-10`, the
  canvas now following it in the DOM. New `useMediaQuery` hook drives the
  behaviour that must genuinely change: the Services scroll hijack is off, the
  About and Contact overlays are off, Team stops being sticky, Contact's second
  WebGL scene isn't mounted, the header nav is hidden and its CTA collapses to
  the arrow disc below `sm`. Rails become native snap scrollers.
- **Adaptive grid narrowed to the desktop range.** Its 1024 and 360 bases
  produced *smaller* text on a larger device — an 820px tablet computed a 12.6px
  root against a 500px phone's 21.6px, with a jump at every edge. Proportional
  scaling only pays where the layout is absolutely positioned, so below `lg` the
  root is a plain 16px.
- **Site metadata filled in and icons generated from the logo.** `siteConfig`
  carries the clinic's real name, description, `#246f65` theme colour and a
  `brand` block. Three `next/og` routes — `app/icon.tsx`, `app/apple-icon.tsx`,
  `app/opengraph-image.tsx` — render the favicon, iOS icon and share card from
  `src/lib/brand-mark.ts`, so none of them can drift from the header's mark. The
  starter's placeholder icon set was deleted, along with the hand-written
  `icons` block in `generateMetadata` (Next's file conventions emit those tags).
  JSON-LD upgraded from `Organization` to `MedicalClinic`. Verified: `/icon`,
  `/apple-icon`, `/opengraph-image` and `/manifest.json` all 200.
- **Heading reveals are now word-level and quicker.** `HEADING_MOTION` moved
  from `line*` to `word*` — the heading assembles left to right instead of whole
  rows sliding up as blocks — with `DISPLAY_SPRING` firmed up to
  `tension 130 / friction 24`, 60px travel out of a 20px blur and a 55 ms word
  stagger. Word staggering already spreads a reveal over several hundred ms, so
  the spring itself had to get brisker rather than slower.
- **Card titles made static.** The service card `h3`s, the Team intro card's
  `h2` and the Contact form's `h3` no longer animate: five titles revealing
  while the rail scrubs is noise, the Team card's would replay on every drag
  pass, and the form title competed with the section heading on the same screen.
  `HEADING_MOTION` is now explicitly a **section**-heading preset. Verified in
  the DOM: 0 animated slots on all three, 7 on the Services section heading.
- **Services rail lowered to `top-[39%]`**, widening the gap under the heading
  by shortening the cards — the bottom gutter stays pinned to the side gutter.
- **DNA scene: camera parallax escaped its range — the last "different angle"
  cause.** Reproduced the scroll round-trip and read `scene.inspect()` mid-bug:
  `camY = −45.28` against a legal ±3. The window-level `pointermove` computes
  NDC from the **canvas rect**; with the canvas scrolled ~9000px away the maths
  yields ±15+, and the camera followed — viewing the helix down its axis from
  triple distance, i.e. the small knot at a random angle. Fixed in three
  layers: `setPointer` clamps NDC to [−1, 1], the component ignores moves while
  the canvas is off screen, and `resetClock()` zeroes the pointer easing state
  so a stale target cannot swing the camera on re-entry. Verified by replaying
  the breaking sequence — pose identical to baseline, all cameras within range.
- **DNA scene: the render gate was latching shut — this was the recurring bug.**
  Found by instrumenting rather than guessing: a new dev-only `scene.inspect()`
  on `window.__dnaScenes` reported `{ appear: 0, elapsed: 0 }` for a scene
  plainly on screen. `IntersectionObserver` fires its first callback with
  whatever the layout says at subscribe time; if that reads "not intersecting",
  a static element never produces another callback and the gate stays shut
  forever. With no `render()`, `uAppear` stays 0 — and at zero appear only the
  densest overlaps clear the visibility threshold, which is precisely the
  "small faint knot" screenshot. Scrolling away and back happened to fire the
  observer, hence the intermittency. Visibility is now read from
  `getBoundingClientRect()` once per frame in the ticker, which cannot latch.
  `config.spin` set to **0** so the helix holds one fixed pose.
- **`absolute` on a `TextEngine` does nothing** — it sets `position: relative`
  inline, and inline beats a class, so `top`/`left` became flow-relative
  offsets. That is why the Services eyebrow and description sat under the
  heading at full width. Positioning moved onto wrapper `<div>`s.
- **Heading motion made larger and slower** — its own `DISPLAY_SPRING`
  (`tension 48`), 90px of travel out of a 24px blur, 170ms line stagger.
- **`StatCounter` added** for the About figures: splits prefix/number/suffix and
  springs only the number (`tension 22`), so the count decelerates softly and
  the layout never shifts; full value kept in `aria-label`.
- Services dwell tuned back to 4 viewports of runway with 1 of dwell.
- **DNA scene rewinds on exit.** The remaining complaint was *rotation*: the
  helix spins continuously, so every return to a scene block found it at a
  different angle. `resetClock()` now zeroes the scene clock and spin phase on
  the visibility observer's **exit** edge — off screen, so no jump is ever
  visible — and the render gate lost its `rootMargin` so both share one
  boundary. Each arrival opens on the same pose. The ongoing spin while you
  watch is `config.spin`; set it to `0` for a static model.
- **Text reveals switched to `mode="always"` — a correctness fix.** With `once`,
  a reveal whose spring was starved when the trigger fired never replayed, so
  the copy stayed invisible permanently; that was the "texts on the right
  disappeared" report. `always` heals on the next entry. Also pinned
  `columnGap: 0.25` on headings — TextEngine's default word gap is wider than a
  real space and pushed the Services heading onto a third line behind the card
  rail (its container also went to `43.5rem`). Heading motion extended to the
  Team heading, the service card titles and the form title.
- **Services dwell made explicit** — a `DWELL_VIEWPORTS` knob was added because
  lengthening the runway alone only slowed the scrub; the overlay still began
  one viewport after it ended. Now 6 viewports of runway with 2 of dwell, so the
  last card can be read before About covers it.
- Team caption name/role gap widened to `gap-3` at the same `h-16` plate height.
- **DNA scene: found the actual cause — point size was never normalised.**
  `gl_PointSize` is in device pixels, so a sprite covered a larger share of a
  smaller canvas: narrowing the window packed the cloud tighter and MULTIPLY
  blending turned that overlap into a darker, shifted colour. Every resize
  changed the scene's appearance, which is what "it keeps changing position"
  was. Both clouds now scale by `uPixelScale`
  (`bufferHeight / 1600`) — the same normalisation the **atmosphere layer
  already had** (`uRes.y / 900.0`), which is what gave the diagnosis away.
  Verified by halving the hero's height at runtime: the helix scales and keeps
  its density and colour. The two earlier fixes (clamped clock, visibility
  gating) were real but addressed different symptoms.
- **Text motion system added** — `src/lib/motion/text-presets.ts` holds three
  `TextEngine` presets (eyebrow / heading / body), all resolving out of a
  `blur(12px)` on spring configs, `mode="once"`. Applied across hero, Why,
  Services, About and Contact so the page reads as one vocabulary rather than
  per-section effects. Centred blocks pair `justify-center` with `text-center`
  per hard rule #3.
- **Review fixes**: the Services runway grew to four viewports so the last card
  can be read before About covers it; the team rail drag now eases toward a
  target with release momentum instead of writing `scrollLeft` 1:1; team caption
  plates are `h-16`, matching the intro card's social buttons, with centred text
  and a wider name/role gap; the Contact panel's padding is uniform `p-8`.
- **DNA scene: the earlier pass — frame starvation, plus a regression of my
  own.** Two fixes, one on top of the other:
  1. **`uAppear` moved back to wall clock.** Tying the entrance fade to the
     frame-accumulated clock (the previous turn's teleport fix) meant that after
     any rAF throttling the scene sat stuck part-faded — a small faint tangle
     instead of a helix, which is what "changes its position" actually looked
     like. `uTime` still uses the clamped frame clock; only the one-shot fade
     uses wall time, where a jump is invisible.
  2. **Render gated on visibility.** The page carries two instances at ~200k
     point sprites each and drew both at all times; that is what starved the
     frame budget in the first place. An `IntersectionObserver` with one
     viewport of `rootMargin` now skips `render()` for the off-screen scene
     (optimize-3d-scene §4).
- **Layout corrections from client review.** Hero copy at 28.55 % so the gaps
  above the eyebrow and below the description match (140/138 against 145/133);
  the Services "Discover" row is `items-end`, putting the label on the same
  line as the lime card's last list row, as Figma does at y 48 of the 72-tall
  row (node `1574:611`); team caption plates inset 32 on all three sides so they
  line up with the intro card's social row.
- **Team rail completed** — the missing fifth portrait and the lime "and other
  60+ specialists" tail card (node `1575:238`) added, order taken from the
  artboard. Names are invented so each matches the person pictured: the mockup's
  own captions put a woman's name on a man's portrait and vice versa.
- **Trail, Team slider, Contact screen refinements.**
  - Trail opacity moved onto its own stiff spring (`tension 900`) so the fade is
    near-instant as in the reference — sharing the soft scale config left every
    card half-transparent for its whole life. The Why section is now
    `overflow-hidden`, so cards no longer spill onto the hero or Services.
  - **Team drag fixed.** Two native behaviours were stealing the gesture: the
    browser's own image drag (`preventDefault()` on pointerdown +
    `[&_img]:pointer-events-none`) and Lenis' inherited
    `scroll-behavior: smooth` fighting direct `scrollLeft` writes
    (`[scroll-behavior:auto]`). Plus `touch-action: pan-y` so vertical page
    scrolling survives on touch. Verified: a 700px drag moves the rail 700px.
  - Team spacing audited against node `1558:410` — card widths, 11px gap, 32px
    card padding, 336px title, 64/12 social row, 40px rail→bar gap and the 2px
    bar all match; cards raised to 70.2 % of the viewport against Figma's
    69.8 % of the artboard.
  - New `HeaderCta` client leaf: an `IntersectionObserver` on `#contact` springs
    the header button out (and drops its `pointer-events`) so the Contact form
    panel can stretch up to the header's own top edge. `SiteHeader` stays a
    Server Component.
- **Cursor image trail rebuilt on the reference implementation.** The client
  pointed at the "Recognize Yourself" block of
  `flourish-with-laurin-textura.vercel.app`; its parameters were read off the
  shipped bundle and applied: 90px spawn threshold, random ±12° tilt,
  `translate(-50%,-50%) rotate(…) scale(…)`, enter `tension 130 / friction 28`,
  leave `tension 300 / friction 24`. The structural change is
  **`useTransition` over a bounded list instead of a recycled `useSprings`
  pool** — our version never let a card *leave*, so the tail faded in place
  rather than dissolving. Verified: 5 cards spawn along the path, each with its
  own tilt, oldest exiting. See [[components/home-sections]].
- **DNA scene no longer teleports on fast scroll — root cause found.** Ink
  position is a pure function of `uTime`, and `uTime` was `performance.now()`.
  Any dropped frames — exactly what fast scrolling causes — advanced it by a
  large step, so the whole plume jumped to a different phase and the strand tore
  apart. `render()` now accumulates **clamped** deltas into a scene clock and
  feeds that to `uTime`, `uAppear` and the atmosphere, capping a stall's cost at
  one 50 ms frame. (The earlier whole-pixel `setSize` guard was a real fix for a
  *different* jitter, but it was not this.) See [[dna-ink-scene]].
- **Services gutters and card internals corrected** — the rail is pinned
  `bottom-10` instead of given a percentage height, so the gap under the cards
  equals the 40px side gutter at any viewport; the sub-service list now stacks
  row / rule / row on a flat `gap-24` with no padding on the rows, as Figma does
  (node `1574:678`) rather than double-counting the gap.
- **About panel colour fixed and given a parallax banner** — the panel is
  `#e5f1ed` (node `1546:162`), a deeper mint than the other sections, which is
  what makes the overlay legible; new `--surface-section-deep`. The banner image
  is 150 % of its frame and drifts against scroll via `AboutBanner`, read once
  per frame from the ticker into a spring.
- **Team rail made a real slider** — full viewport with larger cards, mouse
  dragging via pointer capture (a native scroller cannot be dragged with a
  mouse) with the post-drag click swallowed, and the rail now runs to the
  viewport's right edge instead of being boxed in by a right margin.
- **Sections re-sized to full viewports; page/panel colours corrected.** The
  artboard's screens read as one screen each, so Hero, Why, the Services panel,
  Team and Contact are `h-lvh`, with **horizontal offsets in rem and vertical
  offsets as a percentage of the artboard's 800px** — a fixed rem height
  overflowed short viewports. The Figma frame's own background turned out to be
  **white**, with mint painted by per-section rects (`rounded-[48px]` on the
  edge meeting the page), which is why Why Dantora reads white between two mint
  panels; `--background` is now white and `--surface-section` carries the mint.
  Also: the About block gained `-mt-[100lvh]` so it genuinely rides *over* the
  pinned Services panel instead of following it; the real About banner was
  extracted from Figma (`1546:163`); the Services "Discover" affordance is a
  1px white ring (node `1558:347`), not a filled lime disc; Team gained a real
  slider with a `scrollLeft`-driven progress bar; the Contact submit button's
  height comes from the mockup's 54px frame rather than padding.
  **Two layout bugs fixed:** `CursorTrail` was passed `absolute inset-0` while
  its root already carried `relative` — `relative` won, the box collapsed to
  zero height and the centred copy escaped up into the hero; and team captions
  collided because cap-height trimming removes the leading that separated them.
  **WebGL jitter fixed** (helix jumped on fast scroll): `setSize` now ignores
  sub-pixel `getBoundingClientRect` drift and only reacts to whole-pixel
  changes, and `scrollbar-gutter: stable` stops the viewport width changing when
  the page becomes scrollable. Verified: canvas buffers stay identical across 12
  rapid scroll jumps.
- **Layout rebuilt on Figma's own geometry** after the port measured visibly off
  the design. Two systemic causes, both fixed at the root rather than patched
  per component:
  1. **Cap-height text trim was dropped on import.** Figma trims text boxes to
     cap height (`text-box-trim: trim-both`, `text-box-edge: cap alphabetic`);
     without it every block carried half-leading it was never designed with —
     hero `h1` 132px against Figma's 109, pill buttons 57 against 48, header CTA
     81 against 54 — and the error compounded down the page. `globals.css` now
     applies `text-box: trim-both cap alphabetic` in `@layer base`, plus a
     `text-trim` `@utility` for labels inside flex containers the base rule
     can't reach.
  2. **Viewport-relative section sizing.** `h-lvh` / `260vh` only match the
     artboard when the window shares its aspect ratio. Every section is now its
     exact Figma height in rem and every child sits at the mockup's own
     coordinates; the sticky Services panel is `50rem`, not `100vh`.
  Verified numerically rather than by eye — measured rects divided by the
  adaptive-grid scale now equal the Figma node boxes: logo `40,16 149×54`, nav
  `197,16 422×54`, hero copy `40,282 716`, hero button `40,715 180×48`, scene
  `361,0 1140×800`, About banner `40,40 1360×500`. Method written up in
  [[components/home-sections]].
- **All remaining home sections built** — Why Dantora, Services, About, Team and
  Contact, completing the Figma port's structure. Two new client leaves:
  `CursorTrail` (spring-driven image trail, fixed recycled pool, one spawn per
  90px of pointer travel) and `ServicesTrack` (horizontal scrub — tall wrapper,
  sticky panel, scroll progress read once per frame from the shared ticker into
  a spring). Both overlay reveals — About over Services, Contact over Team — are
  **flow order plus `z-index`**, not scroll listeners: the section below is
  `sticky`, the one after carries the page background. New tokens:
  `--surface-glass-strong`, `--foreground-muted/subtle`, `--corner-card`,
  `--leading-body`. Social icons extracted from the mockup as assets; the
  diagonal-arrow icon turned out to be one glyph reused at 19px and 48px, so
  `ArrowUpRightIcon` was unified onto the 19-unit viewBox. Hero scene repositioned
  to the mockup's exact box (x 361, width 1140 — it overhangs the frame and is
  clipped). Open items and the un-audited values are tracked in
  [[components/home-sections]].
- **Header and hero built** (second stage of the Figma port). New: `<Button>`
  and the `DnaIcon` / `ArrowUpRightIcon` set in `components/ui/`
  ([[components/ui]]), `<SiteHeader>` in `components/common/header/`, and
  `views/home/` — `home.tsx` became a folder with `sections/`. Copy moved to
  `src/data/mocks/home.ts` and reaches sections through props. Icons are
  components painting with `currentColor`, not `.svg` assets, because the Figma
  exports bake `#F8FFB4` into the path. `body` lost the starter's
  `display:flex; height:100vh`, which would have clamped a long page to one
  screen. Sections are positioned at Figma's exact coordinates in rem — see
  [[components/home-sections]]. Remaining sections tracked there.
- **Dantora design foundation laid** (first stage of the Figma port, node
  `1518:1970`). **Font:** Onest → **Google Sans Flex** (`next/font/google`,
  variable 100–1000, axes `GRAD`/`ROND`/`wdth` per the mockup), bound to
  `--font-sans` and applied on `<body>`. **Tokens:** the brand ramp
  (`#246f65` / `#054038` / `#f8ffb4` / `#e5ed9b` / `#eff4f2`, 80 % white glass),
  corner roles (`4 / 8 / 46px`) and the `10px` glass blur, each recorded with
  its Figma origin — see [[design-system]]. **Scaling:** the adaptive grid is
  re-based on the single 1440 Figma frame and its scale-up is now fully
  proportional (`GRID_SCALE_COEF = 1`); verified at a 2560 viewport, root
  font-size 28.44 px = `16 × 2560 / 1440`. **Dark mode removed** — the
  MULTIPLY-blended backdrop only reads on a light surface. ADR-0019.
  ⚠️ No mobile Figma frame exists; the sub-640 breakpoint is still the
  starter's guess.
- **DNA Ink retuned to the teal palette** — `DNA_INK_CONFIG` now carries the
  values from a panel tuning session: `#246f65` strand/ink with a `#faffcc`
  mid-life bleed on an `#eff4f2` backdrop, counts at `helixCount: 40000` /
  `inkCount: 160000`, `brightness` down to `0.6`, `helixOpacity` up to `1.58`.
  See [[dna-ink-scene]]. ⚠️ 200 k point sprites is roughly 4× the ported
  defaults — worth a pass through [[optimize-3d-scene]] before shipping.
- **`bgColor` is no longer a dead control** — the sketch hardcoded `0xffffff`
  in all three places that decide the backdrop (clear colour, `scene.background`,
  `fog.color`) while exposing a `bgColor` swatch that fed a uniform the final
  shader never samples. All three now read `config.bgColor`. It is written with
  `Color.setRGB`, not `setHex`: `setHex` would convert sRGB → linear working
  space, and since the composer's copy pass never encodes back, the backdrop
  would render visibly darker than the hex requested.
- **The settings panel now ships collapsed** — a `⚙ controls` chip that opens on
  click, via native `<details>` / `<summary>`. State is not persisted.
- **DNA Ink settings panel ported as a React component** — the sketch's slider
  panel is back, as `components/scene/dna-ink/dna-ink-controls.tsx`: one row per
  `DnaInkConfig` field, ranges from the sketch's `numericRanges`, reload / reset
  / copy, and a live snapshot rendered as **paste-ready `config.ts` source**.
  Rendered only when `<DnaInk controls>` is set, which defaults to development.
  Edits persist to `localStorage` (`dantora:dna-ink`) and are validated on read,
  so a stale entry can't poison the scene. `DnaInkScene` gained `applyConfig()`
  — uniform writes only, with a 120 ms debounce on the four settings that
  reallocate buffers — so dragging a slider never remounts the canvas or drops
  the GL context. Panel chrome is tokenised (`--raw-color-white-alpha-*` /
  `--raw-size-panel-*` → `--debug-*`), deliberately un-themed. Docs:
  [[dna-ink-scene]], [[design-system]].
- **DNA Ink scene ported into the project** — the standalone `dna-ink.html`
  sketch is now a first-class part of the app and renders as the full-bleed
  backdrop of the home view (`/`). Engine in `src/lib/scene/dna-ink/`
  (`config.ts` · `shaders.ts` · `scene.ts`, framework-free), React leaf in
  `src/components/scene/dna-ink/` (`LazyDnaInk` → `dynamic({ ssr: false })`).
  Every tunable from the sketch's `CONFIG` survives as a typed field of
  `DnaInkConfig`; the GLSL is verbatim. Three deviations, all deliberate: the
  two **bloom composers were removed** (their render targets fed uniforms the
  final shader never sampled — 3 scene renders/frame for a discarded image;
  output identical, cost cut to a third), **`maxPixelRatio: 2`** was added
  (the sketch rendered at raw DPR — 9× the fragments on a 3× phone), and the
  **`localStorage` slider panel was dropped**. Rendering is driven by the shared
  ticker (ADR-0009), not a second rAF. One upgrade trap caught by comparing
  against the original side-by-side: modern three requires
  `premultipliedAlpha: true` for `MultiplyBlending` and otherwise sets **no**
  blend function, which quietly killed the dye's density accumulation while
  still looking presentable. Docs: [[dna-ink-scene]]. ADR: [[decisions-log]]
  ADR-0018.
- **`three` `^0.185.1` + `@types/three` added** — see [[tech-stack]]. This makes
  the [[optimize-3d-scene]] routing rule permanently live for this project: any
  performance / pre-ship request must go through the skill.
- **Project scaffolded from the starter** — cloned from
  `textura-agency/next16-claude-starter`, detached from its git history, and
  re-initialised as `dantora` with its own repo. `.claude/launch.json` added so
  the dev server can be driven from the editor's preview pane.

## 2026-07-25

- **Released into the public domain (Unlicense)** — the starter now ships a root
  `LICENSE.md` carrying the [Unlicense](https://unlicense.org) and declares
  `"license": "Unlicense"` in `package.json`. Anyone may copy, modify, sell, or
  redistribute it with **no attribution requirement and no copyright retained** —
  the intent being that projects built from this starter can absorb it wholesale
  without carrying a notice. Briefly authored as MIT in the same session and
  changed before any release; the MIT attribution clause was the specific thing
  being dropped, so a recognized no-attribution licence was chosen over an
  edited MIT text. `"private": true` is unchanged, so npm publishing stays
  blocked regardless — the licence governs redistribution of the source, not
  registry availability.

## 2026-07-24

- **`optimize-3d-scene` hardened from its first field run** — the skill was run
  on a real raw-WebGL scene (no three.js, no scroll) and eight gaps came back,
  ranked by the time each cost. Fixed in `SKILL.md` and `references/patterns.md`:
  **§0** now ships a `getContext` hook so a non-three.js scene has counted
  equivalents of `renderer.info` (`draws` / `verts` / `links[]` timestamps /
  captured `attrs`) — previously §0 was unexecutable there — plus the
  *measurement environment* rules that invalidate everything if missed
  (production build only: dev's eager chunks fake a §1 failure and Strict Mode's
  double-mount fakes 2 listeners and a halved fps; kill the stale server;
  `waitUntil: "load"`, since `networkidle0` never fires against `next start`;
  SwiftShader is not a GPU, so only counted quantities transfer). **§3** now
  states that **§1 breaks it** — `dynamic(ssr: false)` pushes compilation past
  hydration, measured at 5.0 s against a loader lifting at 2.36 s — and gains a
  fifth stall cause (CPU decode/parse → **Worker**, 3.9 s measured) and the
  `as="fetch"` preload credentials trap (only `use-credentials` + `include`
  dedupes; the others silently download twice). **§5** admits `1000/30` measures
  ~26 fps given the ticker's `<=` throttle. **§7** requires a decile ordering
  check before truncating a baked point buffer (one was spatially sorted —
  truncating would have deleted half the subject). **§13** splits canvas `lvh`
  from content `dvh`. **§1**'s poster is rejustified — crawler screenshots and
  the no-WebGL fallback, not layout stability — with two crops and the
  `headers()` → static-prerender (`○`→`ƒ`) trade-off named. Unchanged on
  purpose: the cheapest-first order, the canonical-file table, and "port, don't
  invent". ADR: [[decisions-log]] ADR-0017.
- **`optimize-3d-scene` skill registered in the vault** — the new skill at
  `.claude/skills/optimize-3d-scene/` is now a first-class part of the workflow
  set, documented in [[optimize-3d-scene]] and linked from the
  [[README|Map of Content]] and [[ai-agent-guide]].
  **Routing rule (AGENTS.md hard rule #11):**
  a performance / jank / pre-ship request on a project that renders a three.js
  or WebGL scene must invoke the skill and follow its fourteen-step order — no
  improvised fix list. The vault note also maps the skill's canonical patterns
  onto primitives the starter *already* ships, so nothing gets duplicated:
  `subscribeToTicker` (`src/lib/animation/ticker.ts`, ADR-0009) is the one
  app-wide rAF loop the skill's §4/§5 ask for, `isBot()` (`src/utils/is-bot.ts`,
  ADR-0010) is the §1 bot path, the Lenis scroll store is the §9/§10 scroll
  source, `useDynamicInView` is the §4 visibility gate, and `lvh.ts` covers §13
  sizing. Only device tiering (§2) has no local equivalent. The starter itself
  carries **no `three` dependency** ([[tech-stack]] unchanged) — this applies to
  projects built from it. ADR: [[decisions-log]] ADR-0016.
- **Fixed a broken path inside the skill** — its closing "write it down" step
  pointed at `obsidian/Meta/changelog.md` / `decisions-log.md` (capital `M`, and
  an `open-questions.md` that does not exist here), so an agent following it
  would have written to a non-existent folder. Rewritten against this vault's
  actual `obsidian/meta/` layout.
- **`ai-agent-guide` gained a Skills section** — how skills are registered
  (drop in `.claude/skills/<name>/`, add a `workflows/` note, link from the MoC
  and the skills table, log in the changelog), so the next skill follows the
  same path.

## 2026-07-17

- **README — one-prompt quick start** — added a copy-paste **⚡ Start in one
  prompt** block at the top of the README: a single prompt that has Claude Code
  (or Cursor) clone the starter, detach it from this repo's git history, read the
  vault first, and run the default install. The manual [Getting started](../../README.md#getting-started)
  path stays below for anyone who prefers it.
- **Fixed: `cp .env.example .env` broke `/api/contact`** — surfaced by writing
  that step into the quick-start prompt. Copying the example leaves
  `CONTACT_ENDPOINT=` (blank), which reaches zod as `""`, and `""` is not
  `undefined` — so `z.url().optional()` rejected it. The route returned **HTTP
  400 `{"path":"CONTACT_ENDPOINT","message":"Invalid URL"}`**, misreporting a
  *server misconfiguration* as the caller's bad input. `src/env.ts` now routes
  optional URLs through an `optionalUrl()` helper that preprocesses `""` →
  `undefined`. Verified end-to-end: a valid POST now returns 200, and genuinely
  invalid payloads still return 400. Any new **optional** variable must use the
  same helper — see [[environment-variables]].
- **README — corrected clone URL & Node requirement** — step 1 pointed at
  `github.com/textura/next16-claude-starter` (wrong org — the repo is
  `textura-agency/…`), so the documented clone would 404. Also added the Node
  floor (**22.13+**; 20.19+ works, 24 LTS recommended) — below it `yarn install`
  fails outright on `eslint-visitor-keys` — and the missing
  `cp .env.example .env` step.
- **TextEngine alignment & clipping rules documented** — two failure modes that
  bite every TextEngine block, now written into [[text-engine]] (new *Alignment &
  line-height* section), [[text-engine-reference]], and AGENTS.md hard rule #3.
  **(1)** The container renders `display: flex; flex-wrap: wrap`, so words are
  flex items and `text-align` cannot position them — a lone `text-center`
  silently does nothing. Always pair `text-*` with `justify-*` on the tag
  (`justify-between` is a trap: it spreads *words*, not lines). **(2)** `overflow`
  sets `overflow: hidden` on `inline-block` wrap layers whose height comes from
  `line-height`, so tight leading shaves descenders and accented caps — keep
  leading ≥ 1.1 via the new `leading-display` token, never `leading-none` with
  `overflow`, and watch for `text-5xl`+ which ship `line-height: 1`. Both fixes
  are **classes on the `TextEngine` tag** — no wrapper component, no helper to
  import. Verified against the `spring-text-engine@0.1.5` dist source.
- **Strict three-tier token naming convention** — tokens now follow a fixed,
  portable grammar so names are predictable across every project built from this
  starter: `--raw-<category>-<name>` primitives → `--<role>` semantic →
  `--<tw-namespace>-<role>: var(--<role>)` bindings in `@theme inline`. Only
  Tier 1 holds literals; Tier 2 names purpose and is the themeable layer.
  `globals.css` restructured accordingly — **no brand palette invented**, the
  convention is the deliverable. Two deviations from the reference article,
  verified by compiling a probe against `tailwindcss` v4.3.3: primitives are
  `--raw-*` and stay out of `@theme` (a `--color-*` entry would generate
  utilities and let markup skip the semantic tier), and **`--duration-*` is not a
  Tailwind v4 namespace** — `duration-fast` compiles to nothing, so durations
  stay Tier 2 and are used as `duration-[var(--duration-fast)]`. See
  [[decisions-log]] ADR-0015 and [[design-system]].
- **Narrow CSS-transition exception** — hard rule #1 no longer bans CSS
  transitions outright. CSS `transition-*` is allowed for simple discrete state
  changes only (hover/focus colour, opacity, border, small nudges), requiring
  token-backed timing (`duration-[var(--duration-fast)] ease-entrance`),
  `transition-*` only (`@keyframes` still banned), and utilities only. Everything
  scroll-driven, revealing, staggered, or layout-affecting stays spring-based.
  A hover colour fade no longer needs a client component wrapping `<Hover>`. See
  [[decisions-log]] ADR-0014, [[animation-system]], [[design-system]].
- **New tokens** — `--raw-color-white` / `--raw-color-neutral-100/900/950`,
  `--raw-duration-fast/normal`, `--duration-fast/normal`, `--leading-display`
  (1.1 — the TextEngine clip floor), `--ease-entrance`.
- **Build & lint verified clean** — `yarn lint` and `yarn build` both pass with 0
  errors and 0 warnings; no lint fixes were needed. Note: `yarn install` **fails
  on Node 20.17** (`eslint-visitor-keys` requires `^20.19 || ^22.13 || >=24`) —
  use Node ≥ 20.19; this repo was verified on 24.16.

## 2026-06-07

- **Fixed `<Inview>` standalone reveal + spring resize gating** — `<Inview>`
  never animated unless an external `trigger` ref was passed. The JSX `ref`
  callback wrote `inViewRef.current = node`, but that tuple slot is a *callback
  ref* (`setNode`), so the element was never observed and the `node` stayed
  `null`. Now calls `setInViewNode(node)`. This was also a build-breaking type
  error. Additionally, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width` as a
  hook dependency but never passed it to `isMobileDisabled` — fixed by passing the
  tracked `width`, restoring resize re-evaluation and clearing the
  `react-hooks/exhaustive-deps` warnings. `yarn build` and `yarn lint` are now
  clean. See [[decisions-log]] ADR-0013 and [[components/animation-springs]].

## 2026-06-05

- **Home view emptied** — removed the animation showcase (`src/views/home-showcase.tsx`
  deleted) and reduced `HomeView` to an empty `<main>`. The home view is now the
  blank starting point for new work. Documented the convention — *if the project
  is empty and no other instructions are provided, start developing in the home
  view on route `/`* — in [[ai-agent-guide]] and [[new-page]].

## 2026-05-23

- **README — setup + Vercel deploy steps added** — *Getting started* expanded
  into a four-step flow (clone the template → delete bundled `.git` →
  initialise your own GitHub repo → install & run), with a macOS hint for
  revealing the hidden `.git` folder (`⇧ + ⌘ + .`). Added a *🚀 Deploy to
  Vercel* section covering the CLI flow (`vercel` / `vercel --prod`) and the
  dashboard import path, plus an `env pull` pointer to
  [[environment-variables]].
- **README rewritten to lead with the AI workflow** — root `README.md`
  reorganised so the AI usage guide is the first section: how the three
  `.claude/settings.json` hooks (`SessionStart`, `UserPromptSubmit`, `Stop`)
  enforce the vault workflow automatically, how to write a good request
  against this convention layer, and a cost-expectations note recommending
  **Claude Max (5×)** as the minimum plan (the vault-fan-out + hook
  re-injection on every turn is token-intensive by design). Technical
  *Getting started* and the existing AI-agents entry-point pointer stay
  below.

## 2026-05-22

- **Styling-placement convention added** — to stop `globals.css` accumulating
  hundreds of component-specific classes, styling now follows a strict
  placement order: one-offs are Tailwind utilities, repeated patterns become
  **React components** (not `@layer components` classes), and `@layer
  components` is reserved strictly for pseudo-elements and third-party
  overrides. `globals.css` stays bounded — `@import`, tokens, base resets only.
  No CSS Modules. Codified in [[decisions-log]] ADR-0012; [[design-system]]
  (new *Where a style goes* section) and [[component-conventions]] updated.
- **Semantic-HTML / SEO-markup convention added** — new [[html-semantics]]
  rulebook: landmarks, one `<h1>` + heading outline, native elements over
  `div`s, forms/images/ARIA, JSON-LD over microdata, a `data-*` convention, and
  passing a semantic `tag` to animation components. Codified as AGENTS.md hard
  rule #10; cross-linked from [[component-conventions]] and [[new-page]]. Fixed
  the demo (`home-showcase.tsx`) to a single `<h1>` to follow it.
- **API layer added** — a convention for reaching external services.
  `app/api/<resource>/route.ts` Route Handlers own their logic and read secret
  env vars directly (safe — route files never reach the browser). New: `zod`
  dependency; `src/env.ts` (validated env, public/server split); `src/lib/api/`
  (`handle` wrapper + `ApiError` + `{ data }`/`{ error }` envelope);
  `src/lib/api-client.ts` (typed same-origin fetch); example
  `app/api/contact/route.ts`. Codified as AGENTS.md hard rule #9. See
  [[decisions-log]] ADR-0011 and [[api-architecture]].

## 2026-05-21

- **Asset convention added** — site content assets (images, videos) now live
  under `public/assets/<section>/`, one folder per section; meta/PWA/SEO assets
  stay at the `public/` root. Documented in [[folder-structure]],
  [[component-conventions]], and the [[new-page]] playbook; `public/assets/`
  created with a `.gitkeep`.
- **SEO & performance hardening** — a broad pass on the starter. **SEO:** new
  `src/lib/site.ts` config (single source of truth, fed by `NEXT_PUBLIC_SITE_URL`);
  `metadataBase` is now always set (relative OG/canonical URLs resolve);
  `themeColor` moved to a `viewport` export; added `app/robots.ts`,
  `app/sitemap.ts`, and an `Organization`+`WebSite` JSON-LD helper; OG image
  dimensions corrected to match the asset; dead `keywords`/`other` tags dropped.
  **Performance:** populated `next.config.ts` (`removeConsole` in prod,
  AVIF/WebP, `next/image` breakpoints aligned to the grid, `poweredByHeader:
  false`); fixed a `requestAnimationFrame` leak in `ScrollLayout` (Lenis loop
  never cancelled on unmount); `HomeView` is now a Server Component with the
  animation demo split into the `HomeShowcase` client leaf; added
  `<ReducedMotion>` (honours `prefers-reduced-motion` via react-spring's global
  `skipAnimation`); removed a per-frame `console.log` from the demo; added
  `app/loading.tsx` / `error.tsx` / `not-found.tsx`. See [[decisions-log]]
  ADR-0010, [[seo-metadata]], and [[environment-variables]].
- **Animation engine — lint pass** — cleared all 13 pre-existing ESLint problems
  in the engine (2 errors + 11 warnings), an authorized engine edit (ADR-0009).
  `isMobileDisabled` now takes an optional `viewportWidth` argument, so the
  `active` memos in `<Spring>` / `<Hover>` / `<Inview>` / the trigger hooks
  depend on it genuinely. Added missing `disableOnMobile` effect deps; fixed a
  `trigger.current`-in-cleanup hazard in `<Hover>`; ref-stabilised `<Handle>`'s
  transition effects. **API change:** `useProgressTrigger` now returns `progress`
  as a `RefObject<number>` (read `.current`) instead of a render-time ref read —
  no consumer was affected (`<ProgressTrigger>` discards the return).
- **Animation engine — performance refactor** — fixed load issues that scaled
  with the number of animated components. Added `src/lib/animation/ticker.ts`, a
  single reference-counted `requestAnimationFrame` loop; `useLoop` (and all loop
  hooks) now subscribe to it instead of each starting its own rAF. `useWindowWidth`
  / `Height` / `Size` now share one debounced `resize` listener via a
  `useSyncExternalStore` store (the `debounceDelay` param was dropped — unused).
  `useDynamicInView` rewritten without the per-render `Proxy`/observer churn.
  Fixed a stale-closure bug in `useLoop`. `mode="forward"` scroll listeners made
  `passive`. This was an **authorized edit to `#do-not-modify` engine files** —
  hard rule #2 amended. See [[decisions-log]] ADR-0009 and [[animation-system]].
- **`spring-text-engine` updated** — bumped `^0.1.3` → `^0.1.5` (latest). The
  public API, types, and dependencies are unchanged between these versions
  (verified) — an internal-only patch bump, no code changes required.
- **Adaptive scaling grid added** — a root-font-size scaling system landed in
  `src/components/common/grid/` (`<AdaptiveGrid>` + `useAdaptiveGrid` hook +
  `grid.config.ts`), with `vw` media queries in `globals.css` for scale-down.
  It was dropped into `common/` as a `styled-components` system; ported to the
  project stack — config-driven TS + CSS-only Tailwind, no `styled-components`.
  The unused dropped files (`colors.ts`, `fonts.ts`, `utils.ts`, `index.ts`,
  the `styled-components` `grid.tsx`) were removed. Mounted via `<AdaptiveGrid>`
  in the root layout. See [[components/common]] and [[decisions-log]] ADR-0008.
- **Vault created** — `obsidian/` Obsidian vault initialised as the project's
  second brain. Architecture, frontend, and workflow docs populated. See [[decisions-log]] ADR-0001.
- **Root README rewritten** — replaced `create-next-app` boilerplate with a real
  project README that points into this vault.
- **`generic-layout-prompt.md` moved** — relocated from repo root to
  `obsidian/workflows/` as [[generic-layout-prompt]].
- **Navigation convention resolved** — standard `next/link` confirmed; the unbuilt
  `<AnimLink>` / `useAnimRouter()` convention dropped. See [[decisions-log]] ADR-0005.
- **Docs consolidated into the vault** — `project-specs.md` deleted (decomposed into
  vault notes + new [[environment-variables]]); `text-engine-docs.md` moved in as
  [[text-engine-reference]]. `AGENTS.md` rewritten as a thin shim; `.cursorrules`
  repointed to `@AGENTS.md`. The vault is now the single source of truth.
  See [[decisions-log]] ADR-0006.
- **Vault renamed & restructured** — vault folder `getlayers.io/` → `obsidian/`;
  number prefixes dropped from section folders (`00-meta` → `meta`, etc.). Project
  name standardised to **`next16-claude-starter`** across docs and `package.json`.
- **Components linked to docs** — every file in `src/components/` now carries a
  `// 📖 Docs:` pointer comment to its catalog note, so agents can jump from code
  to docs and back.
- **Vault workflow automated** — added `.claude/settings.json` with `SessionStart`,
  `UserPromptSubmit`, and `Stop` hooks that make agents read the vault first,
  follow the relevant guide, and update docs after every change — with no manual
  reminder. See [[decisions-log]] ADR-0007 and [[ai-agent-guide]].
- **Cookie component replaced** — the `react-cookie-consent`-based `cookie.tsx`
  was replaced by an in-house `Cookie/` component (banner + category preferences
  modal + Zustand store). `react-cookie-consent` removed from dependencies. The
  component shipped using `styled-components` + an external design system; it was
  ported to the project stack — Tailwind v4 tokens and `@react-spring/web` motion.
  Mounted via `<LazyCookie>`. See [[components/common]].
- **Fixed TextEngine spring type mismatch** — the `mode="once"` heading in
  `views/home.tsx` mixed `lineIn={{ y: 0 }}` (number) with `lineOut={{ y: "100%" }}`
  (string), throwing *"Cannot animate between _AnimatedString and _AnimatedValue"*.
  Changed to `y: "0%"`. The buggy pattern in [[text-engine]] / [[text-engine-reference]]
  examples was corrected and a type-matching gotcha note added.

## Project baseline (git history)

| Commit | Description |
|--------|-------------|
| `94b0870` | feat: update starter |
| `5280ef2` | fix: linter errors & build |
| `b2b84e6` | initial — `next16-claude-starter` scaffold |

> [!note]
> The starter shipped with: Next.js 16.2, React 19.2, Tailwind v4, `@react-spring/web`,
> `spring-text-engine`, Lenis, and Zustand. See [[tech-stack]] for the current state.

## 2026-08-25 — Umbau zur Karriereseite der Steuerkanzlei Kutscher

**Inhalt.** Alle 13 Blöcke von `da-will-ich-arbeiten.de/kutscher/` in 11
Sektionen; Fließtexte wörtlich. Neu gebaut: Stellen, Aufgaben, Stimmen,
Standort, Ablauf, Footer. Team-Rail → 17 gute Gründe, Kontaktformular →
dreistufige Schnellbewerbung. Sämtliche Copy in `data/mocks/home.ts`.

**Marke.** DNA-Sprossen aus `helixPoint()` entfernt (ADR-0022), DNA-Icon durch
K-Monogramm ersetzt, Palette unverändert (das Kanzlei-Grün war bereits
`--raw-color-brand-500`).

**Recht.** Font selbst gehostet (Figtree Variable via `next/font/local`), kein
Cookie-Banner (ADR-0023), Google Maps hinter Zwei-Klick-Einwilligung, `noindex`
über ein Flag, das `robots.ts` und Metadaten gemeinsam steuert.

**Performance (Produktions-Build, gezählte Größen).**

| | vorher | nachher |
|---|---|---|
| Drawing-Buffer mobil | 0,23 MPx | 0,07 MPx |
| Punkte pro Frame mobil | 200.000 | 68.000 |
| WebGL-Kontexte mobil | 2 | 1 |
| Shader-Programme | 4 | 2 |

Desktop unverändert. Die zweite Szene wurde auf Mobile per `display:none`
versteckt und mountete trotzdem — jetzt rendert sie dort gar nicht (`desktopOnly`).

**Barrierefreiheit.** 43 Kontrastverstöße → 0 (ADR-0026). `user-scalable=no` des
Originals nicht übernommen. Kein horizontaler Überlauf auf 390 px und 1440 px.

**Korrekturen.** CTA-Button lief auf beiden Breakpoints aus seiner Pille (feste
Breiten und `whitespace-nowrap` waren für kurze englische Labels gebaut).
Hydration-Fehler #418 durch einen Tier-Check während des Renderns — jetzt im
Effekt.

**Offen.** Fotos und Testimonial-Wortlaut sind markierte Platzhalter, das
Bewerbungsformular validiert, versendet aber noch nicht, Loader-Prewarm und ein
Test auf echtem Gerät stehen aus.

## 2026-08-26 — Kanzlei-Website gebaut, Karriereseite wird Unterseite

**Struktur.** Aus einer Landingpage wurde eine Website. `/` trägt jetzt die
Kanzlei-Seite, die bisherige Funnel-Landingpage liegt unter `/karriere` und
behält ihr eigenes Chrome und ihr `noindex`. Gemeinsame Kopf- und Fusszeile für
die Website liegen in der Routen-Gruppe `(kanzlei)`.

**Neu:** `/`, `/ueber-uns`, `/fuer-unternehmen`, `/fuer-private`, `/kontakt`
plus `/impressum`, `/datenschutzerklaerung`, `/barrierefreiheitserklaerung`.
Inhalte wörtlich von der Live-Seite, in `src/data/kanzlei/`.

**Der Leistungskatalog** auf `/fuer-unternehmen` (10 Blöcke, 47 Punkte) liegt in
nativen `<details>`/`<summary>` — tastaturbedienbar ohne ein einziges `aria-*`,
und Strg+F findet auch zugeklappten Text.

**Mailversand.** Kontaktformular und Schnellbewerbung laufen über einen
gemeinsamen Weg (`src/lib/mail.ts`, Resend). Nur Textmails, kein HTML — der
Inhalt besteht vollständig aus Fremdeingaben. Keine Nutzdaten in den Logs.

**Weiterleitungen** von den alten URLs liegen in `src/middleware.ts`, nicht in
`redirects()`: Next vergleicht dort case-insensitiv, wodurch `/Impressum` →
`/impressum` auch die Kleinschreibung traf und in eine Endlosschleife lief.

**Typografie-Fehler behoben, der alle Seiten betraf.** TextEngine-Wortboxen
massen 82px bei 44px Zeilenhöhe, umbrochene Überschriften standen dadurch fast
doppelt so weit auseinander wie gesetzt. Ursache waren zwei Flex-Effekte
zugleich: `align-items: stretch` zog jede Wortbox auf Zeilenhöhe,
`align-content` verteilte zusätzlich die Höhe auf die Flex-Zeilen. Behoben mit
zwei Regeln in `@layer components` (ADR-0012 erlaubt dort
Third-Party-DOM-Overrides), weil die ClassName-Props der Engine gegen deren
eigene Inline-Styles verlieren. Zeilenabstand jetzt 45px.

**Barrierefreiheit gemessen** über alle 7 Routen in Mobil und Desktop: genau ein
`h1` und ein `main` je Seite, keine Sprünge in der Überschriftenhierarchie, kein
Bild ohne `alt`, kein horizontaler Überlauf, keine Kontrastverstösse, keine
JS-Fehler. 0 Befunde von 14 Durchläufen.

**Mängel der Live-Seite, die NICHT übernommen wurden:** der unbearbeitete
Baukasten-Platzhalter in der Fusszeile jeder Unterseite, „Powered by Sellwerk",
und die englische Formular-Legende „Contact Us".

## 2026-08-27 — Zusammenlegung zu einer Landingpage

Der Kunde will keine Unterseiten. Aus fünf Seiten wurde eine Seite mit neun
Ankern; nur die drei Rechtstexte bleiben eigene Routen.

**Struktur.** `src/views/kanzlei/sections/` hält jetzt elf Sektionskomponenten,
`startseite.tsx` ist auf 82 Zeilen reine Komposition geschrumpft. Die vier
Seitenköpfe entfielen, ihre `h1` wurden zur `h2` ihres Abschnitts, alles darunter
rutschte eine Ebene tiefer. Von vier Abschlussblöcken blieb einer.

**Bandfolge** streng alternierend über zwölf Bänder, damit nie zwei gleichfarbige
Flächen aneinanderstossen — die alte Abfolge stimmte je Seite, aneinandergereiht
nicht mehr.

**Die vier alten Pfade sind bei Google indexiert** und leiten deshalb mit 308 auf
das jeweilige Ankerfragment, gesetzt über `url.hash`. Die Sitemap führt nur noch
vier Adressen; Anker gehören nicht hinein, weil ein Fragment kein Dokument ist.

**Ankersprünge geprüft**, mobil und Desktop: jede Sektion landet 15px unter der
klebenden Kopfzeile statt darunter zu verschwinden.

**Überschriftenebenen der Rechtstexte normalisiert.** Die Datenschutzerklärung
sprang zweimal von Ebene 2 auf 4 — eine hörbare Lücke in der Gliederung. Das Tag
bekommt jetzt die normalisierte Ebene, die Klasse behält die aus den Daten: die
Gliederung stimmt, die optische Staffelung des Originals bleibt.

Barrierefreiheits-Durchlauf danach: 0 Befunde von 10.

## 2026-08-27 — Akzentfarbe auf #016d32

Vom Kunden vorgegeben. Ein satteres, echtes Grün statt des Teal-Grüns des
Templates — Farbton von 172° auf 147°.

Nachgezogen an allen vier Stellen, an denen die Marke lebt: Tier-1-Token
(`--raw-color-brand-500`), die dunkle Variante für Rand und Hover
(`--raw-color-brand-900`, 62 % Helligkeit davon statt eines eigenen Farbtons),
`siteConfig.themeColor` und `brand.green` für Favicon, Apple-Icon und
OG-Bild — und die WebGL-Szene, deren Strang- und Tintenfarben um dieselben 25°
verschoben wurden, bei **exakt gehaltener Helligkeit**. Der Farbton wandert, die
Dichte der MULTIPLY-Mischung bleibt, wo sie war.

Kontrast verbessert sich dabei überall: Akzenttext auf Weiss 5,94 → 6,49:1, auf
Mint 5,34 → 5,84:1, Limette auf dem Akzent (Logo) 5,64 → 6,17:1. Barrierefreiheit
danach erneut geprüft: 0 Befunde von 10.

## 2026-08-27 — Ladevorhang entfernt, Hero blendet ohne JavaScript ein

Der Preloader ist raus: `src/components/common/preloader/` gelöscht, samt
`PreloadProvider`, `RevealOnReady` und dem WebGL-Tor `gatesPreload`.

**Warum.** Er hielt jeden Besuch mindestens 900 ms auf (`MIN_DURATION_MS`, per
Konstruktion auch bei warmem Cache), wartete zusätzlich auf Schriften und das
erste Frame der WebGL-Szene und sperrte solange das Scrollen. Auf einer Seite,
deren häufigster Zweck „wie erreiche ich die Kanzlei?" ist, steht das zwischen
dem Besucher und der Telefonnummer.

**Was dabei sichtbar wurde.** Ohne Vorhang lag der Hero offen — und war leer.
`spring-text-engine` rendert serverseitig `opacity: 0` und startet erst nach der
Hydration; gemessen auf 390 px war das erste Wort der Überschrift **694 ms** nach
dem ersten Byte sichtbar. Ohne JavaScript blieb es unsichtbar. Der Vorhang hatte
das verdeckt, nicht gelöst.

**Die Folge.** Für die Blöcke über der Falz — und nur für die — läuft die
Einblendung jetzt als CSS-Animation (`.entry-item` in `globals.css`, neue
Komponente `views/kanzlei/sections/eintritt.tsx`). Gleiche Bewegung wie die
Presets (Auflösen aus der Unschärfe, leicht steigend, Wort für Wort versetzt),
aber gestartet vom ersten Paint statt von React. Alles, was erst beim Scrollen
ins Bild kommt, bleibt bei `TextEngine`: dort ist die Verzögerung unsichtbar,
und `mode="always"` heilt eine verhungerte Feder, was CSS nicht kann.

Die 3D-Szene wird in `LazyDnaInk` beim ersten gezeichneten Frame eingeblendet
(`@react-spring/web`), statt hart aufzupoppen. `onReady` in `dna-ink.tsx` bleibt
damit erhalten, hat aber einen neuen Abnehmer.

Messung auf 390 px: erstes Wort **694 → 287 ms**, LCP **432 ms**, kein
gesperrtes Scrollen, keine Konsolenfehler. Barrierefreiheit: 0 Befunde von 10.

## 2026-08-27 — Echtes Logo, erste Fotos auf der Landingpage

**Logo.** `public/assets/marke/logo.png` ersetzt das selbstgezeichnete K in
Kopfzeile, Favicon, Apple-Icon und OG-Bild. Der Schriftzug kommt als Bild; die
**vier Kacheln** links davon stehen zusätzlich als Vektor in
`src/lib/brand-mark.ts` — Geometrie (2 × 2 Kacheln à 9 Einheiten, 1 Einheit
Fuge) und Farben pixelgenau aus der Datei gemessen. Favicon und OG-Bild brauchen
ein quadratisches Zeichen; ein 200 × 36 breites Logo auf 32 × 32 gequetscht ist
unlesbar.

Der Icon-Grund ist jetzt **weiss** statt markengrün: drei der vier Kacheln sind
helle Grüntöne, auf grünem Grund verschwindet die dunkle vierte und das Zeichen
liest sich als L.

⚠️ Die gelieferte Datei ist 200 × 36 px. Bei einfacher Pixeldichte reicht das;
bei zwei- oder dreifacher — rund 90 % der Besuche — ist der Schriftzug sichtbar
weich. Eine Vektorfassung oder eine PNG ab 1000 px Breite steht aus. Ein Versuch,
die Datei zu vektorisieren, wurde verworfen: die Zeile
„Steuerberatungsgesellschaft mbH" ist bei 200 px rund 5 px hoch und kam aus der
Nachzeichnung verstümmelt heraus.

**Zwei Sätze der Vorlage im OG-Bild entfernt** — „Medicine that starts with
understanding you" und „Trusted by 40,000+ patients since 2011". Sichtbar wurden
sie nur beim Teilen eines Links, also genau dort, wo sie am meisten geschadet
hätten.

**Fotos.** Drei Bänder der Landingpage tragen jetzt ein Bild: Willkommen, Über
uns und Für Unternehmen, über die neue Komponente
`views/kanzlei/sections/bild.tsx` (festes Seitenverhältnis gegen Layoutsprünge,
4:3 → 16:9 → 21:9 mit der Breite, eigene `sizes`).

Es sind Platzhalter von Unsplash, die schon seit dem Bau der Karriereseite im
Repo liegen. Neue liessen sich nicht beschaffen: `images.unsplash.com`,
Pexels, Pixabay und Picsum sind sowohl aus diesem Container als auch vom
Entwicklungsrechner aus gesperrt.

Das vierte vorhandene Bild — ein Porträt — bleibt ungenutzt. Ein Stockfoto unter
den Namen einer real benannten Person zu setzen, ist keine
Platzhalterentscheidung mehr. Die Personenkarten in `UeberUns` bleiben
typografisch, bis echte Porträts vorliegen.

Barrierefreiheit danach: 0 Befunde von 10.

## 2026-08-27 — 3D-Szene auf dem Telefon durch ein Standbild ersetzt

Gemessen auf 390 px mit vierfach gedrosselter CPU, Startseite gegen eine Seite
ohne Szene (`/impressum`):

| | mit Szene | ohne |
|---|---|---|
| JavaScript | 344 KB | 194 KB |
| LCP | 1196 ms | 228 ms |
| blockierter Hauptthread | 4412 ms in 52 Tasks | 251 ms in 2 |

Die Szene kostete also 150 KB und rund vier Sekunden Hauptthread — für eine
Dekoration, auf den rund 90 % der Besuche, die vom Telefon kommen.

Unterhalb des Tablet-Tiers steht deshalb jetzt `szene-standbild.webp` (11 KB):
aus der laufenden Szene bei voller Punktdichte aufgenommen, im
Seitenverhältnis des Streifens, den ein Telefon zeigt. Der Bildrand ist
pixelgenau `#eff4f2` — dieselbe Farbe, mit der die Szene ihren Puffer löscht und
mit der das Band hinterlegt ist, damit an den Kanten keine Naht steht. `three`
wird in diesem Fall gar nicht erst geholt.

Auf dem Rechner bleibt die Szene live und liegt jetzt **über** demselben
Standbild, das dort als Posterbild dient — vorher stand da ein leerer Kasten,
bis der Chunk ankam.

Nachher, gleiche Messbedingungen: JavaScript **344 → 210 KB**, LCP
**1196 → 680 ms**, blockierter Hauptthread **4412 → 450 ms** in 3 statt 52
Tasks. Damit lädt die Startseite auf dem Telefon so viel JavaScript wie das
Impressum. Barrierefreiheit: 0 Befunde von 10.

## 2026-08-27 — Echte Fotos der Kanzlei, Unsplash-Platzhalter entfernt

Sieben Aufnahmen aus dem Fotoshooting geliefert (je rund 33 Megapixel, als WebP).
Daraus die Webfassungen gerechnet; die Originale sind **nicht** im Repo geblieben
— eine 7008 × 4672 grosse Datei unter `public/` ist öffentlich herunterladbar und
wandert bei jedem Deploy mit, ohne dass ein Browser sie je anfordert.

| Datei | Grösse | Stelle |
|---|---|---|
| `empfang.webp` | 2200 px, 202 KB | Willkommen |
| `beratung.webp` | 2200 px, 70 KB | Für Private |
| `buero.webp` | 2200 px, 222 KB | Für Unternehmen |
| `team-gruppe.webp` | 1600 px, 122 KB | Über uns |
| `portraet-kutscher.webp` | 640 px, quadratisch | Personenkarte |
| `portraet-koeber.webp` | 640 px, quadratisch | Personenkarte |
| `besprechungsraum.webp` | 2200 px, 179 KB | Karriereseite |

**Die vier Unsplash-Platzhalter sind gelöscht** — auch auf der Karriereseite.
Dort trug `PROCESS_CONTENT.person.image` bis eben ein Stockporträt unter dem
Namen „Frank Kutscher"; das war der letzte Rest der Platzhalterei, der eine
Aussage über einen echten Menschen gemacht hat.

**Über uns steht jetzt zweispaltig.** Das Gruppenbild ist hochformatig — das Team
auf der Treppe vor dem Haus, in die Höhe gestaffelt — und wäre in einem
21:9-Querband ein Streifen mit abgeschnittenen Köpfen geworden. Neben der
Textspalte behält es sein Format; `lg:items-center`, weil der Text dieses
Abschnitts kurz ist und oben ausgerichtet links ein Loch von rund 350 px stünde.

**Die Personenkarten tragen Porträts.** Zuordnung über `member.id`, nicht über
die Position im Array. Eine Person ohne hinterlegtes Porträt bekommt weiter den
Akzentstrich statt eines fremden Gesichts.

**`Bild` hat ein `focus` bekommen.** `object-cover` schneidet mittig zu, und beim
Beratungsbild lag der Kopf der stehenden Kollegin dadurch oberhalb der Kante.
Der Ausschnitt ist damit eine Entscheidung und keine Voreinstellung.

⚠️ **Offen:** die Zuordnung der beiden Porträts (`_DSC6764` → Frank Kutscher,
`_DSC6668` → Manuela Köber) ist vom Kunden zu bestätigen — sie folgt dem
einzigen Anhaltspunkt, den es gab. `DJI_0246` (Gebäude mit Schriftzug) fehlt
noch; es soll in den Anfahrtsbereich.

Messung danach: LCP 364 ms, Bilder zusammen 31 KB auf dem ersten Bildschirm.
Barrierefreiheit 0 Befunde von 10, keine 404, keine kaputten Bilder.

## 2026-08-27 — Rhythmus gebrochen: dunkles Zahlenband, ein randloses Bild

Befund zuerst, weil er die Änderungen erklärt: die Seite hatte acht Abschnitte
mit **identischem Aufbau** — Kapitälchen, dünne Überschrift, Fliesstext — auf
abwechselnd weissem und mintfarbenem Grund. Über 11 200 px Höhe gab es keine
einzige Stelle, an der das Auge hängenbleibt, und keinen einzigen Beweis für
irgendeine der Behauptungen. Das ist der Grund, warum die Seite langweilte —
nicht fehlende Animation.

**Neues Band `#zahlen`** (`views/kanzlei/sections/zahlen.tsx`), dunkelgrün auf
`--raw-color-brand-900`, zwischen Wegweiser und den Leistungsabschnitten. Es
löst beide Probleme mit einer Fläche: es teilt die Seite optisch in ein Davor
und ein Danach, und es belegt zum ersten Mal etwas.

**Jede Zahl darin ist nachgerechnet**, und das ist die Bedingung, unter der das
Band existieren darf: **47** Leistungen und **10** Fachgebiete sind zur Bauzeit
aus `CATALOGUE_CONTENT` gezählt, **12** Mitarbeitende stehen wörtlich im
Fliesstext der Kanzlei. Ein Gründungsjahr fehlt bewusst — es steht nirgends,
und geraten wird auf der Seite einer Steuerkanzlei nichts.

⚠️ Die Karriereseite sagt an derselben Stelle **15+**. Einer der Werte ist
veraltet; bis das geklärt ist, steht auf der Website die Zahl der Website.

Kontrast gemessen: Weiss auf dem Grund **11,52:1**, die Limette der Zahlen
**10,95:1**, die Beschriftung in `white/80` **7,9:1**.

**Ein randloses Bild** — das Büro vor dem Leistungskatalog bricht aus der
Inhaltsspalte aus, in der sonst alles steht. Genau eines, weil ein Bruch nur
wirkt, solange er die Ausnahme bleibt. Umgesetzt mit negativen Aussenmassen und
nicht mit `100vw` plus Verschiebung: dieser Trick rechnet die Scrollleiste nicht
mit und erzeugt auf Windows waagerechtes Scrollen. Geprüft — auf 390 px und
1440 px scrollt nichts quer.

Dabei ein Fehler gefunden und behoben: `w-full` und `w-auto` haben dieselbe
Spezifität, und welche gewinnt, entscheidet die Reihenfolge im erzeugten
Stylesheet statt der im Klassenstring. Das randlose Bild war dadurch nach links
verschoben statt breiter. Jeder Zweig setzt seine Breite jetzt selbst.

`StatCounter` ist von `views/karriere/sections/` nach `components/common/`
gewandert — er wird jetzt von beiden Auftritten benutzt.

Barrierefreiheit danach: 0 Befunde von 10.

## 2026-09-01 — Teamfoto statt 3D-Szene im Hero

Die prozedurale WebGL-Grafik ist aus dem Hero raus. Sie war handwerklich das
Aufwendigste an der Seite und inhaltlich das Leerste: eine abstrakte
Doppelhelix aus dem Medizin-Template, an genau der Stelle, an der jemand
entscheidet, ob das seine Kanzlei ist. Dort steht jetzt das Team vor dem
eigenen Haus (`hero.webp`, 2400 px, 321 KB).

Die Szene lebt nur noch im Kontaktband und dort nur auf dem Rechner
(`desktopOnly`). Auf dem Telefon lädt `three` gar nicht mehr.

**Der Übergang von Weiss zum Bild** besteht aus zwei Dingen in einer Ebene, und
beide sind nötig: `backdrop-blur` weicht das Foto dort auf, wo Text darüber
liegt, und `mask-image` blendet **die Unschärfe selbst** wieder aus. Ohne die
Maske würde ein Farbverlauf nur das Weiss ausblenden — das Foto bliebe auf
ganzer Breite gleich verwaschen. So endet der Weichzeichner dort, wo das Weiss
endet.

Der Text steht auf **deckendem** Weiss, nicht auf einer halbtransparenten
Fläche: sonst hinge sein Kontrast davon ab, was gerade auf dem Foto zu sehen
ist. Nachgemessen — hinter jedem Pixel des Leads steht #ffffff.

**Zwei Layouts, ein `<Image>`.** Ab `lg` liegt das Foto absolut in der rechten
Bandhälfte (ab 26 %), auf dem Telefon als eigener Streifen unter dem Text. Das
ist Rechnerei, keine Bequemlichkeit: als Hintergrund eines 390 × 840 grossen
Bandes wird ein 3:2-Foto seitlich beschnitten und oben/unten gar nicht —
`object-position` kann senkrecht also nichts verschieben, die Köpfe lagen unter
dem Text und übrig blieb ein Streifen Beine. Als eigener Block mit fester Höhe
bekommt das Foto seinen Ausschnitt zurück.

Dieselbe Rechnung war der Grund, den Bildkasten auf dem Rechner bei 26 %
beginnen zu lassen statt bei 0: über die volle Bandbreite sass die Gruppe
unverrückbar in der Bildmitte und damit im Verlauf.

⚠️ Nebenwirkung: Frank Kutscher steht ganz links im Foto und liegt dadurch
hinter dem Weiss. Alternative wäre, Bild und Text zu tauschen — rechts im Motiv
stehen nur Pergola und Hecke, dort ginge niemand verloren.

**Porträt Manuela Köber ersetzt.** Die erste Zuordnung war falsch: geliefert
wurden zwei Bilder ohne Namen, und die Frau auf `_DSC6668` ist eine andere
Kollegin. Genau dafür stand der Vorbehalt in `fotos.ts` — ein Gesicht unter
einem Namen wird nicht geraten.

Die beiden hochgeladenen Dateien lagen mit Leerzeichen und Umlaut im Namen
direkt in `public/`; sie sind zu Webfassungen gerechnet und entfernt.

LCP 684 ms, Barrierefreiheit 0 Befunde von 10.

## 2026-09-01 — Zeichen auf den Kernkompetenz-Karten

Die vier Karten trugen eine Ordnungszahl (`01`–`04`), weil `FeatureCard.icon`
zwar einen Dateinamen führte (`frank-pneck-001` …), die Dateien aber nie
existierten. Jetzt liegen vier Strichzeichnungen im Markengrün vor; sie
**ersetzen** die Ziffer statt sie zu ergänzen — Zeichen und Zähler nebeneinander
wären zwei Anker um dieselbe Aufmerksamkeit.

Zugeordnet wird über `card.id`, nicht über die Position im Array: die
Reihenfolge kann sich ändern, die Kennung nicht, und ein Herz-Symbol über
„Zuverlässig" wäre der Fehler, den bei einer Umsortierung niemand bemerkt. Der
Pfad in `card.icon` bleibt ungelesen — er zeigt auf Dateien, die es nie gab, und
an den Datendateien wird nichts geändert.

**Die Vorlagen sind beschnitten, nicht bloss verkleinert.** Geliefert als
1254 px grosse PNG mit unterschiedlich viel Luft um das Motiv; ungeschnitten
nebeneinander wirken vier gleich grosse Kacheln dadurch verschieden gross — das
Schild füllte seinen Rahmen, die Person schwamm darin. Sie sind deshalb auf
ihren sichtbaren Inhalt beschnitten, wieder quadratisch aufgefüllt und auf
256 px gerechnet: zusammen 108 KB statt 1,1 MB, dargestellt bei 48 bzw. 56 px.

`alt=""` — die Zeichen illustrieren die Überschrift daneben und tragen keine
eigene Information; die Reihenfolge sagt die `<ol>` ohnehin an.

Barrierefreiheit: 0 Befunde von 10, keine 404.

## 2026-09-01 — Fliesstext nutzt die volle Breite, zweispaltig

Die Abschnitte, die einen alten Seitenkopf aufgenommen haben, sind zweigeteilt:
Überschrift links in einer 22rem-Spalte, Fliesstext rechts daneben. Der Text
stand dabei auf 38rem gedeckelt, das Inhaltsmass ist 85rem — rechts blieb
sichtbar ein knappes Drittel der Seite leer.

**Nicht** einspaltig auf die volle Restbreite gezogen: bei rund 59rem Laufweite
stünden etwa 130 Zeichen in einer Zeile. Ab ungefähr 90 Zeichen findet das Auge
den Anfang der nächsten Zeile nicht mehr zuverlässig, und §2c der Hausregeln
nennt 70 als Obergrenze. Statt dessen **zwei Spalten** ab `lg`: die Fläche ist
genutzt, die Zeile bleibt bei rund 55 Zeichen. Gemessen nach dem Umbau: 441 px
Spaltenbreite in den Überblicksabschnitten gegenüber 929 px, die eine einzelne
Spalte belegt hätte.

Zwei Hilfsklassen in `typografie.ts`, weil der Unterschied zählt:
`PROSA_SPALTEN` für mehrere Absätze hält mit `break-inside-avoid` jeden Absatz
zusammen; `PROSA_FLIESSEND` für einen einzelnen langen Absatz lässt ihn
ausdrücklich über den Spaltenumbruch laufen — mit der Regel bliebe er komplett
in der ersten Spalte und die zweite leer.

Der Absatzabstand kommt über `[&>p+p]:mt-5` statt über ein Flex-`gap`: eine
Flex-Spalte und `columns` schliessen einander aus, das Flex-Layout gewinnt und
die Mehrspaltigkeit hätte keine Wirkung gehabt.

Betroffen: Willkommen, Überblick Unternehmen, Überblick Private, Anfahrt.
Unterhalb von `lg` bleibt alles einspaltig — dort ist der Bildschirm für zwei
Spalten zu schmal. Geprüft: `column-count: auto` auf 390 px, kein waagerechtes
Scrollen. Barrierefreiheit 0 Befunde von 10.

## 2026-09-01 — Hero entschärft, Fusszeile umgebaut, Karte ohne Klick

**Der Hero war verwaschen, und zwar aus zwei Gründen zugleich.** Der
Weichzeichner stand auf `backdrop-blur-md` (12 px), und der Verlauf, der ihn
begrenzt, lief viel zu weit: auf dem Telefon über 70 % der Streifenhöhe, auf dem
Rechner über 58 % der Bildbreite. Das Foto sah dadurch nicht an einer Kante
weich aus, sondern durchgehend. Jetzt 5 px Unschärfe, Verlauf bis 24 % (mobil)
beziehungsweise 44 % (ab `lg`). Die Textspalte endet bei 504 px und der
Bildkasten beginnt bei 374 px — die 18 %, bis zu denen reines Weiss deckt,
lassen dahinter Luft.

**Willkommen: Überschrift und Fliesstext stehen auf einer Höhe.** Beide Kästen
begannen schon vorher bei derselben Y-Koordinate; der sichtbare Versatz von
5,5 px kam allein aus dem Durchschuss — 40 px Schrift auf 44 px Zeile sitzt
enger als 18 px auf 21,6 px. `lg:pt-1.5` auf der Textspalte, gemessener Rest
0,5 px.

**Fusszeile.** Die Öffnungszeiten sind raus; sie versprachen an dieser Stelle
mehr, als sie halten — eine Kanzlei arbeitet nach Termin. `OPENING_HOURS` bleibt
in `firma.ts` stehen. An ihrer Stelle steht ein Wegweiser über die fünf Anker
der Seite plus `/karriere`, das sonst nirgends verlinkt ist. Darüber das Logo,
bewusst ohne Link: es steht am Fuss derselben Seite, auf die es zeigen würde.

**Dabei einen Fehler gefunden, der schon länger drin war.** Die Links in der
Fusszeile trugen `inline-flex min-h-11` — die 44px-Zielgrösse (WCAG 2.5.8) war
also gefordert, hat aber nicht gewirkt: ein `inline-flex` wächst über seine
Zeilenbox hinaus, statt das `<li>` mitzunehmen. Gemessen standen die vier
Telefonnummern 15 px auseinander bei je 44 px Höhe — sie überlappten einander um
zwei Drittel, und auf dem Telefon wählt man damit beim Tippen die falsche
Nummer. `flex w-fit` statt `inline-flex`; nachgemessen jetzt 48 px Abstand. In
der Linkliste der Rechtstexte stand derselbe Fehler.

**Karte lädt ohne Klick** (`autoLoad` an [[StandortKarte]], Vorgabe bleibt
`false`). ⚠️ Das ist eine rechtliche Entscheidung: die Seite baut damit beim
Aufruf eine Verbindung zu OpenStreetMap auf und überträgt die IP-Adresse, ohne
Einwilligung. Die Aussage „keine Drittanfragen", auf der das Fehlen eines
Cookie-Banners beruht, stimmt dann nicht mehr vollständig.

⚠️ **Der Pin sitzt weiterhin auf dem Stadtzentrum von Pößneck**, nicht auf der
Naßäckerstraße. Geokodierung ist aus diesem Netz nicht erreichbar (Nominatim und
Photon antworten nicht), und geraten wird eine Adresse nicht. Der Routen-Link
daneben ist davon unberührt — er wird aus der Postanschrift gebaut.

Barrierefreiheit: 0 Befunde von 10.
