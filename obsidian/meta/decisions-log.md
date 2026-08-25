---
tags: [meta, decision]
updated: 2026-08-10
---

# Decisions Log (ADRs)

Architecture Decision Records. Each entry captures a choice, its context, and its
consequences. Use [[templates/adr-note]] for new entries. Newest first.

---

## ADR-0021 — Page readiness is gated by components, not by `window.load`

- **Status:** Accepted
- **Date:** 2026-08-10

**Context.** The preloader originally treated `window.load` +
`document.fonts.ready` as "the page is ready". Both fire early relative to what
the visitor actually sees: `window.load` accounts for the document's own
subresources and nothing else. The hero's centrepiece — [[dna-ink-scene]] — is a
`dynamic({ ssr: false })` import fetched *after* hydration, so it is invisible to
that signal. Measured: the curtain was gone at **982 ms**, before `three` had
been downloaded, let alone before a frame was drawn. Any future heavy leaf (a
video, a large decoded image, a second scene) has exactly the same problem.

**Decision.** Readiness is **contributed**, not inferred. `PreloadProvider`
exposes `registerGate()`; a component that must be on screen before the reveal
claims a gate in an effect and releases it when genuinely ready. `loaded`
requires the document signals *and* an empty gate set *and* a `MIN_DURATION_MS`
floor.

Three rules make it safe, and each exists because the naive version fails:

1. **Claim eagerly, release late.** The gate is claimed in the eagerly mounted
   wrapper (`LazyDnaInk`), not inside the lazy chunk — by the time that chunk
   loads the preloader may already have finished. It is released from the first
   *drawn frame*, not from mount, because a live GL context with nothing on
   screen is the exact state being hidden.
2. **Opt in per instance.** Gating is a prop (`gatesPreload`), not automatic. An
   off-screen instance never renders, so an automatic gate would never resolve —
   the Contact scene would hold the curtain until the timeout.
3. **Always have a ceiling.** `GATE_TIMEOUT_MS` (6 s) lifts the curtain
   regardless. A failed chunk or a refused WebGL context must degrade to a
   slightly late reveal, never to a permanently opaque page.

**Consequences.** Readiness is honest but no longer knowable from one place —
what the curtain waits for is the sum of whoever claimed a gate. The timeout is
the backstop that keeps that from being dangerous. Cleanup must release the gate
(return the releaser as the effect's cleanup), or an unmounted component strands
the curtain. The releaser is idempotent so a double call is harmless.

**Alternatives rejected.** A fixed delay — dishonest in both directions, too
short on a cold connection and pure dead time on a warm one. Gating on the lazy
chunk's `import()` promise — resolves when the module is *parsed*, which is still
several hundred milliseconds before anything is drawn.

---

## ADR-0020 — One layout breakpoint; the adaptive grid is desktop-only

- **Status:** Accepted
- **Date:** 2026-08-10
- **Amends:** ADR-0019

**Context.** ADR-0019 recorded that the page did not reflow and that the
sub-640 breakpoint was inherited guesswork, pending a mobile Figma frame. That
frame still does not exist, but tablet and mobile were requested anyway — so the
small-screen layout is **our design decision**, not a port.

**Decision.**

1. **`lg` (1024px) is the only layout breakpoint.** Above it, the Figma
   composition — absolutely positioned at the artboard's coordinates. Below it,
   an ordinary flow layout. Two layouts, not a spectrum: intermediate
   breakpoints would mean inventing intermediate designs.
2. **Sections are authored in mobile DOM order.** Absolute positioning ignores
   document order, so the desktop composition is reconstructed with `lg:`
   offsets rather than the markup being written desktop-first and reordered
   with `order-*`. The cost is that stacking becomes explicit — the hero copy
   needs `z-10` because the scene's canvas now follows it in the DOM.
3. **The adaptive grid is scoped to 1024–1440 (plus scale-up above).** Its 1024
   and 360 bases were actively harmful: an 820px tablet computed a 12.6px root
   while a 500px phone computed 21.6px — *smaller text on the larger device* —
   with a discontinuity at every edge. Proportional root-font scaling only earns
   its keep where the layout is absolutely positioned; a flow layout reflows on
   its own. Below `lg` the root is a plain 16px.
4. **The scroll choreography is kept at every breakpoint.** It shipped
   desktop-only for one revision on the argument that hijacking scroll is
   hostile on touch; that was reverted by request, and the argument was weaker
   than it looked — nothing in the Services scrub or either overlay calls
   `preventDefault`. Each is a pure function of scroll position, so the page
   scrolls normally and no gesture is taken. Only sizing is responsive. Note
   the Services runway and About's `-mt-[100lvh]` are a matched pair.
5. **Small screens still drop what genuinely costs.** Contact's second WebGL
   scene is not mounted below `lg`, the header nav moves into a burger panel,
   and the header's pill CTA is desktop-only — collapsed to a bare arrow disc it
   read as a broken control.

**Consequences.**

- The small-screen layout is **unreviewed against any design**. When a mobile
  frame arrives, expect the `lg:`-prefixed values to stay and the base classes
  to be replaced wholesale.
- Any new section must be written mobile-first and pinned with `lg:`, or it will
  silently only work on desktop.
- ADR-0019's "no mobile design → nothing reflows" consequence is superseded;
  its 1440-base and light-only-theme decisions still stand.

---

## ADR-0019 — One 1440 design base, scaled fully proportionally; light-only theme

- **Status:** Accepted
- **Date:** 2026-08-10

**Context.** The Dantora UI arrived as a **single** Figma frame — "Concept 4",
1440 × 5005, desktop only. The brief asks for identical proportions to Figma on
every screen. The starter's adaptive grid already scales a rem-based layout by
driving the root font-size, but it shipped configured for a 1920 design base and
damped the scale-up above it (`coef: 0.6666`).

**Decision.**

1. **1440 is the only desktop base.** The `{ maxWidth: 1920, baseWidth: 1920 }`
   breakpoint is gone, and the `html` media query below 1440 is
   `1.111111vw` (`16 × 100 / 1440`). There is no 1920 entry because there is no
   1920 design — inventing one means inventing a layout nobody drew.
2. **`GRID_SCALE_COEF = 1`.** Above 1440 the scale-up is now fully
   proportional rather than damped, because "the same proportions as Figma" is
   the explicit requirement. The starter's damping exists to stop a design
   ballooning on ultra-wide monitors; that trade is off here. Verified: at a
   2560 viewport the root font-size is 28.44 px — exactly `16 × 2560 / 1440`.
3. **Light-only theme.** The `prefers-color-scheme: dark` block is removed
   rather than extended. The page's whole visual identity is a MULTIPLY-blended
   point cloud on a mint surface: the clouds *darken* the backdrop, so on a dark
   `--background` they have nothing to darken and the scene disappears. A dark
   variant is a design problem, not a token override.
4. **Google Sans Flex replaces Onest**, with `GRAD`/`ROND`/`wdth` requested
   explicitly — the mockup pins all three.

**Consequences.**

- ~~**There is no mobile design.** …the sub-640 breakpoint is a guess.~~
  **Superseded by ADR-0020**, which adds a small-screen layout and scopes the
  adaptive grid to the desktop range. There is still no mobile Figma frame; the
  layout below `lg` is our design decision.
- Any future dark mode must start from the scene, not from `globals.css`.

---

## ADR-0018 — Port the DNA Ink sketch as a lib/component split, minus its dead passes

- **Status:** Accepted
- **Date:** 2026-08-10

**Context.** The scene arrived as a single self-contained `dna-ink.html` — an
import-map three.js sketch with a `CONFIG` object, inline GLSL, a `localStorage`
-backed slider panel, and a `render()` driving three `EffectComposer`s. It had to
become part of this Next.js project, with no HTML file left behind.

**Decision.**

1. **Split framework-free engine from React leaf.** `src/lib/scene/dna-ink/`
   holds `config.ts` / `shaders.ts` / `scene.ts` and imports nothing from React;
   `src/components/scene/dna-ink/` mounts it. Two new folders, mirroring the
   `lib/scene/` path [[optimize-3d-scene]] already sanctions. The alternative —
   one big `"use client"` component — would have put ~400 lines of GPU plumbing
   behind a React boundary and made the config unreachable from anywhere else.
2. **`CONFIG` becomes a typed module, not component props.** Hard rule #4 bans
   hardcoded values; a `DnaInkConfig` interface with one field per tunable makes
   the whole look editable from one file and type-checked at the call site.
3. **Delete the two bloom composers.** The sketch built `torusComposer` and
   `bloomComposer`, then assigned their render targets to `finalPass` uniforms
   (`torusTexture`, `bloomTexture`) that the final fragment shader — a one-line
   `tDiffuse` passthrough — never samples. Three full scene renders and two
   `UnrealBloomPass`es per frame, all discarded. Removing them is
   **visually lossless**: the on-screen image was always `finalComposer` alone.
   The passthrough `EffectComposer` is *kept* rather than collapsed to a bare
   `renderer.render()`, so the render-target path (and therefore the exact
   rasterisation, MSAA included) is unchanged and bloom can be reinstated.
4. **Clamp the pixel ratio (`maxPixelRatio: 2`).** The only deliberate visual
   deviation. The sketch used the raw `devicePixelRatio`; at 3× that is 9× the
   fragments for ~47 k overlapping point sprites. It is a config field, not a
   constant, so reproducing the sketch is a one-line change.
5. **Keep the debug panel, but gate it and make its output paste-ready.**
   Initially dropped — a UI that silently overrides the committed config from a
   previous session is a trap — then reinstated on request, with the trap closed
   three ways: it renders only when `controls` is true (default: development
   builds), `readStoredConfig` validates every restored key against the current
   shape, and its snapshot emits real `config.ts` source so a tuning session
   ends by committing the values rather than leaving them in `localStorage`.
   Panel chrome is tokenised under `--debug-*` and deliberately not themed —
   it floats over an arbitrary scene and must stay legible in both schemes.
   The scene gained `applyConfig()` for this: uniform writes only, debounced
   120 ms for the four settings that reallocate buffers, so a slider drag never
   remounts the canvas or drops the GL context.
6. **Modern `three` (`0.185`), not the pinned `0.143`.** `WebGL1Renderer` was
   removed in r163 → `WebGLRenderer`. Colour handling is unaffected: every
   palette colour goes through the sketch's own `hexToVec3`, and the custom
   shader passes carry no `<colorspace_fragment>` include, so nothing is
   re-encoded. Shipping a four-year-old three in a fresh Next 16 project was the
   worse trade.

**The one upgrade trap, and why it is invisible in code review.** r143 supported
`MultiplyBlending` on a non-premultiplied material via
`blendFunc(ZERO, SRC_COLOR)`. Modern `WebGLState` **deleted that branch**: it
logs *"MultiplyBlending requires material.premultipliedAlpha = true"* and then
sets **no blend function at all**, so the clouds inherit whatever state the
previous draw left behind. The port rendered — plausibly, even attractively —
while silently losing the density accumulation that makes overlapping dye go
dark, which is the entire ink-in-water effect. Setting
`premultipliedAlpha: true` restores it exactly: the premultiplied path is
`blendFuncSeparate(DST_COLOR, ONE_MINUS_SRC_ALPHA, ZERO, ONE)`, which reduces to
`dst * src` because every fragment in these shaders writes `alpha = 1.0`.
**Lesson for the next port: a scene that renders is not a scene that is
correct — read the console, and diff against the original side-by-side.**

**Consequences.**

- `three` is now a project dependency ([[tech-stack]]), and the
  [[optimize-3d-scene]] routing rule (hard rule #11) is permanently live — every
  performance request on this project must go through the skill.
- The scene subscribes to the shared ticker (ADR-0009); it does not start a
  second `requestAnimationFrame`.
- Not yet done, and deliberately left for a real optimisation pass: device
  tiering (§2), loader prewarm (§3), in-view gating (§4), the bot poster (§1).
  The port is faithful first; §14 says measure before cutting.

---

## ADR-0017 — A skill states its preconditions and its own internal conflicts

- **Status:** Accepted
- **Date:** 2026-07-24

**Context.** `optimize-3d-scene` (ADR-0016) was run for the first time on a real
scene outside this repo — a raw WebGL project, no three.js, no scroll. The fix
order held up; what cost hours was everything the skill left implicit. Ranked by
time burned:

1. **§0 could not be executed at all.** `renderer.info.render` /
   `.programs.length` exist only on `THREE.WebGLRenderer`, yet the skill's own
   title says "three.js / WebGL". The agent had to invent instrumentation before
   it could take a baseline.
2. **The measurement environment was never stated**, and all three failure modes
   fired: dev-mode numbers are invalid (eager chunk serving faked a §1 failure;
   Strict Mode's double-mount faked 2 listeners and a halved frame rate), a
   stale `next start` on the port served 500s that read as a code bug, and
   `waitUntil: "networkidle0"` never fires against `next start`.
3. **§1 actively breaks §3.** `dynamic(ssr: false)` means the scene cannot
   compile until after hydration; on Regular 3G + 4× CPU programs linked at
   5.0 s against a loader that lifted at 2.36 s. Two correct steps, silently
   contradicting each other.
4. **§3's stall list was GPU-only** — all four causes shader/texture/target —
   but the worst stall measured was a 3.9 s main-thread CPU decode. Workers
   appeared nowhere in the skill.

Plus four smaller ones: the `as="fetch"` preload credentials trap (only
`use-credentials` + `include` dedupes; the other pairings silently
double-download), §5's `1000/30` actually measuring ~26 fps because of how the
ticker throttles, §7's "cut the sparse end" having no lever on a *baked* point
buffer, and §13's `lvh` being read as applying to the layout when it is for the
canvas only.

**Decision.** Fold all of it back into the skill, and adopt two rules for how
this and every future skill is written:

- **A step states its preconditions.** §0 now ships a `getContext` hook that
  gives a raw WebGL scene the counted equivalents of `renderer.info`
  (`draws` / `verts` / `links[]` timestamps / captured `attrs`), and a
  *measurement environment* block: production build, kill the old server first,
  `waitUntil: "load"`, and — because SwiftShader is not a GPU — only counted
  quantities transfer, never absolute fps.
- **A step names where it fights another step.** §3 now carries the §1 conflict
  explicitly, with the measurement that exposes it (link timestamps vs handoff
  time) and the fix (preload the data from the HTML; gate the loader on
  scene-ready, not on a duration).

Also added: §3 gains a fifth stall cause (CPU decode → Worker, with
transfer-in-both-directions) and the preload-credentials warning; §5 states the
~26 fps reality; §7 requires a decile ordering check before truncating a baked
buffer; §13 splits canvas `lvh` from content `dvh`; §1's poster is rejustified
(crawler screenshots and the no-WebGL fallback — *not* layout stability) with
two crops for tighter-axis framing and the `headers()` → `○`→`ƒ` prerender
trade-off named.

**Consequences.** The skill now works on a scene with no three.js in it, and its
first section can be executed instead of merely read. The cost is a longer §0 —
an agent must build instrumentation and a production build before touching
anything — which is the correct tax: every number the skill asks for later is
worthless without it. Deliberately kept unchanged, because the field run
confirmed them: the cheapest-first ordering, the canonical-file table, and
"don't invent new shapes; port these" — the `device.ts` port dropped in clean
and is most of why that run went as fast as it did.

---

## ADR-0016 — Skills are registered in the vault, not just dropped in `.claude/`

- **Status:** Accepted
- **Date:** 2026-07-24

**Context.** The first Claude Code skill for this starter —
`optimize-3d-scene` — arrived as a folder under `.claude/skills/`. A skill there
is discoverable to Claude Code *at runtime*, but it is invisible to the vault:
nothing in `obsidian/` said it existed, when to reach for it, or how it relates
to the hard rules. That contradicts ADR-0006 (the vault is the single source of
truth) and leaves the invocation decision to model judgement — exactly the kind
of thing this project pins down in writing. A performance request on a
scene-carrying project would otherwise get whatever fix order the agent invented
that day, when the skill exists precisely because the order matters (audit →
bot path → tiering → prewarm → visibility gate → budgets → fill).

**Decision.** A skill is only "installed" once it is registered:

1. The skill lives at `.claude/skills/<name>/`.
2. A vault note under `workflows/` documents what it does, its trigger
   conditions, and how it maps onto this project's primitives.
3. It is linked from [[README]]'s Map of Content and from the skills table in
   [[ai-agent-guide]].
4. If invocation should be non-optional, the routing rule goes into AGENTS.md's
   hard rules — the shim every agent reads first.
5. It is logged in [[changelog]].

For `optimize-3d-scene` this became **hard rule #11**: a performance / jank /
pre-ship request **and** a three.js or WebGL scene in the project → invoke the
skill and follow its order. The vault note [[optimize-3d-scene]] additionally
maps the skill's canonical patterns (which reference an external workspace) onto
what the starter already ships — the shared ticker (ADR-0009) for its one-rAF
rule, `isBot()` (ADR-0010) for its bot path, the Lenis store for scroll, the
in-view hooks for its render gate — so following the skill does not produce a
second copy of infrastructure that exists.

**Consequences.** Skill invocation becomes a documented rule rather than a guess,
and the routing survives model, tool and session changes because it lives in
AGENTS.md and the vault, not only in the skill's own `description`. The cost is
one extra note plus two index edits per skill — the same tax every component and
hook already pays. The starter still ships **no `three` dependency**
([[tech-stack]] unchanged); rule #11 is dormant until a project adds one. A
wrong vault path inside the skill (`obsidian/Meta/…`, plus an `open-questions.md`
this vault does not have) was corrected as part of registering it — registration
is also the moment a skill gets checked against reality.

---

## ADR-0015 — Strict three-tier design-token naming convention

- **Status:** Accepted
- **Date:** 2026-07-17

**Context.** ADR-0004 made tokens the styling currency but never said what a token
should be *called*. The starter shipped two tokens (`--background`,
`--foreground`) and no grammar, so every project built from it would invent its
own — defeating the point of a shared starter, since an agent moving between
projects could not predict a token name without reading `globals.css`. Reference
taken from [Mavik Labs — *Design Tokens in Tailwind v4*](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/)
(three tiers: primitive → semantic → component).

**Decision.** Adopt the three-tier model with an explicit grammar, documented in
[[design-system]] and codified as AGENTS.md hard rule #4:

| Tier | Grammar | Lives in |
|------|---------|----------|
| Primitive | `--raw-<category>-<name>[-<shade>]` | `:root` |
| Semantic | `--<role>[-<variant>][-<state>]` | `:root` |
| Component | `--<tw-namespace>-<component>[-<property>]` | `@theme inline` |

- Only Tier 1 holds literals; Tier 2 names purpose, never appearance; Tier 2 is
  the themeable layer (dark mode overrides there). No tier may be skipped.
- Every `@theme inline` entry is exactly `--<namespace>-<role>: var(--<role>)`.
  `inline` is load-bearing — it inlines the `var()` into each utility so Tier 2
  overrides cascade; binding a literal freezes the value and breaks theming.
- Tier 3 stays rare by design (ADR-0012 prefers a React component).

**Two deliberate deviations from the reference article**, both verified against
`tailwindcss` v4.3.3 by compiling a probe stylesheet:
1. The article names primitives `--color-blue-500`. We prefix them `--raw-*` and
   keep them out of `@theme` — under Tailwind v4 a `--color-*` entry *generates
   utilities*, so naming primitives that way would emit a `bg-blue-500` for every
   raw value and let markup bypass the semantic tier.
2. The article lists `--duration-fast` / `--duration-normal` next to `--ease-*`.
   **There is no `--duration-*` namespace in Tailwind v4** — the probe confirmed
   `duration-fast` compiles to nothing and the variable is not even emitted from
   `@theme inline`. Durations therefore stay Tier 2 only, consumed as
   `duration-[var(--duration-fast)]`. (`--ease-*` *is* a real namespace and is used.)

Retrofit is **minimal and unopinionated**: the existing background/foreground
tokens were restructured into the tiers, and the primitives/durations/`--ease-entrance`
/`--leading-display` they imply were added. **No brand palette was invented** —
the convention is the deliverable; projects add `--raw-color-brand-*` themselves.

**Consequences.** Token names are now predictable across every project from this
starter. This **amends ADR-0004**, which said only that new values go in
`globals.css` first — they must now also follow the tier grammar. `globals.css`
grew a documented tier structure but stays bounded (ADR-0012). Existing markup is
unaffected: `bg-background` / `text-foreground` still resolve, since the Tier 2
names and `@theme` bindings kept their public names.

---

## ADR-0014 — Narrow CSS-transition exception for trivial state changes

- **Status:** Accepted
- **Date:** 2026-07-17

**Context.** ADR-0002 banned CSS transitions outright to force every motion
through the spring layer. In practice the ban's cost lands hardest where its
benefit is lowest: a nav link fading its colour on hover had to become a client
component wrapping `<Hover>` with a spring config, to animate one property that
no user will ever interrupt or perceive as physical. The rule pushed teams toward
either boilerplate or quiet rule-breaking.

**Decision.** Keep hard rule #1 for all real motion; carve out one narrow,
condition-bound exception. CSS `transition-*` is allowed **only** for simple,
discrete state changes — `hover:` / `focus-visible:` / `active:` colour, opacity,
border-colour, underline, and small decorative nudges — subject to three
conditions, all required:

1. **Token-backed timing** — `duration-[var(--duration-fast)] ease-entrance`; raw
   ms/cubic-bezier values remain banned by hard rule #4.
2. **`transition-*` only** — `@keyframes` stay banned outright. Anything long
   enough to need keyframes is long enough to deserve a spring.
3. **Utilities only** — the transition lives in `className`, never in a CSS file
   (ADR-0012).

Everything scroll-driven, revealing, layout-affecting, staggered, orchestrated,
or interruptible remains spring-based; text remains [[text-engine]]. Anything
past the allowed list is `<Hover>`.

**Consequences.** A hover colour change no longer needs a client component — the
common case gets cheaper and the spring layer keeps the cases it is actually good
at. This **amends ADR-0002**, whose "CSS transitions are banned" is now "CSS
keyframes are banned; transitions are limited to the list above". The exception is
deliberately narrow and enumerated rather than a judgement call ("simple
animations") so it cannot erode into general CSS animation. `--raw-duration-*` /
`--duration-*` / `--ease-entrance` tokens exist to serve it (ADR-0015).
[[animation-system]], [[design-system]], and [[ai-agent-guide]] updated to match.

---

## ADR-0013 — `<Inview>` self-observe fix; spring components honour resize

- **Status:** Accepted
- **Date:** 2026-06-07

**Context.** `<Inview>` only animated when an external `trigger` ref was passed.
Without one it never revealed. Root cause: `useDynamicInView` returns its target
attachment as a **callback ref** (`setNode`) in the first tuple slot, but
`in-view.tsx` destructured it as `inViewRef` and wrote `inViewRef.current = node`
in the JSX `ref` callback — assigning `.current` to a function instead of calling
it. `setNode` never ran, the observed `node` stayed `null`, and with no `trigger`
the observer had nothing to watch (`trigger?.current ?? node` → `null`). With a
`trigger` it worked only because `trigger.current` bypassed the dead `node` path.
TypeScript flagged this at build time (`Property 'current' does not exist on type
'TargetRefCallback'`), so the build was already failing.

Separately, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width`
(`useWindowWidth()`) as a `useMemo`/`useEffect` dependency to re-evaluate mobile
gating on resize, but never passed it to `isMobileDisabled()` — so the value was
genuinely unused (ESLint `react-hooks/exhaustive-deps` warning) **and** resize
re-evaluation silently did nothing; the check always read `window.innerWidth` at
call time.

**Decision.** This is the second authorized edit to the `#do-not-modify` engine
(after ADR-0009). Two corrections:
1. In `in-view.tsx`, call the callback ref — `setInViewNode(node)` — instead of
   assigning `.current`, so the component observes itself when no `trigger` is
   given.
2. Pass the React-tracked `width` into every `isMobileDisabled(value, width)`
   call across `in-view.tsx`, `spring.tsx`, and `hover.tsx`. This is the
   documented second parameter of `isMobileDisabled` and makes the `width`
   dependency meaningful, fixing resize re-evaluation and clearing the lint
   warnings.

**Consequences.** `<Inview>` now works standalone (the common case). `yarn build`
and `yarn lint` are both clean (0 errors, 0 warnings). The springs folder remains
`#do-not-modify` by default — these were explicitly signed-off bug fixes.

---

## ADR-0012 — Styling lives in utilities and components, not `globals.css`

- **Status:** Accepted
- **Date:** 2026-05-22

**Context.** ADR-0004 made design tokens the styling currency and ruled that
"new values must be added to `globals.css` first." Combined with the
design-system guidance to *"extract repeated multi-class patterns to
`@layer components`"*, the path of least resistance for any repeated visual
pattern became a named class in `globals.css`. On an animation-heavy,
multi-section marketing site that grows the file without bound — a single
global stylesheet accumulating hundreds of component-specific classes that are
never deleted when their component is. The fix is a placement rule, not a
file-splitting trick: splitting `globals.css` into many files only spreads the
same bloat.

**Decision.** Styling follows a strict placement order; `globals.css` stays
bounded by design.

- One-off styling → **Tailwind utilities** in `className`. Nothing enters CSS.
- A repeated pattern with markup/structure/props → a **React component**
  (`components/ui/`), *not* a CSS class. This is the default answer to "this
  looks repeated" — e.g. an eyebrow label with a `::before` dot is an
  `<Eyebrow>` component, not a `.label-eyebrow` class.
- A repeated pure-utility combo with no structure → a Tailwind v4 `@utility`.
- `@layer components` is reserved **strictly** for what utilities and
  components genuinely cannot express: pseudo-elements (`::before`/`::after`),
  third-party DOM overrides (`!important` on library markup), complex
  descendant/state selectors.
- `globals.css` only ever holds: `@import`, tokens (`:root` + `@theme`), base
  element resets (`@layer base`), and the narrow `@layer components`
  exceptions above. If it grows past that, something was misplaced.
- CSS Modules were considered and **rejected** — a second styling mechanism
  for the rare bespoke-CSS case is not worth the extra mental model when
  motion is spring-based (no keyframes — ADR-0002) and utilities + components
  cover everything else.

**Consequences.** `globals.css` stays a few-hundred-line file indefinitely.
"Repeated thing" pressure now pushes toward React components — which the
project wants anyway. This **amends ADR-0004**: design *tokens* still go in
`globals.css` first, but component-specific *classes* no longer do.
[[design-system]] and [[component-conventions]] updated to match.

---

## ADR-0011 — API layer: `app/api` route handlers, secrets server-side

- **Status:** Accepted
- **Date:** 2026-05-22

**Context.** The starter had no API layer. It needs a convention for reaching
external services that keeps secret keys off the client and gives endpoints a
consistent shape.

**Decision.** External calls go through Next.js Route Handlers —
`src/app/api/<resource>/route.ts`:
- **The handler owns the work** — business logic, multiple upstream calls,
  filtering, and reading secret env vars all live in `route.ts`. No mandatory
  passthrough service layer; extract shared code only when genuinely reused.
- Secrets are safe in handlers because `route.ts` is never bundled to the
  browser. Secret env vars are **unprefixed**; `NEXT_PUBLIC_` only for
  browser-safe values.
- Every endpoint: validates input with `zod`, returns the `{ data }` /
  `{ error }` envelope via the shared `handle()` wrapper (`src/lib/api/`), runs
  on the Node runtime (not Edge).
- `src/env.ts` validates env with zod — `publicEnv` vs `getServerEnv()`.
- Client Components fetch via `apiFetch` (`src/lib/api-client.ts`), same-origin
  only. Render-time data is read in Server Components.
- Added `zod`. The example endpoint is `app/api/contact/route.ts`.
- Codified as **AGENTS.md hard rule #9**.

**Consequences.** A clear, secret-safe API convention (full note:
[[api-architecture]]). Server Actions were considered for mutations but
deferred — for now everything goes through `app/api`. The choice can be
revisited if forms need progressive enhancement. First server dependency
(`zod`) and first server-only env var (`CONTACT_ENDPOINT`) now exist.

---

## ADR-0010 — SEO & performance hardening

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** A review found gaps that would hurt a production marketing site:
`metadataBase` defaulted to `null` (relative OG/canonical URLs never resolved to
absolute — broken social previews); `themeColor` sat on the deprecated metadata
field; there was no `robots.txt`, `sitemap.xml`, or structured data; the
`next.config.ts` was empty; `ScrollLayout` leaked a `requestAnimationFrame`
loop; the home view was a top-level `"use client"` (violating hard rule #6);
and the animation-heavy starter ignored `prefers-reduced-motion`.

**Decision.**
- **Site config.** `src/lib/site.ts` (`siteConfig`) is the single source of
  truth for SEO, fed by `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`).
- **Metadata.** `metadataBase` is always set; `themeColor` moved to a
  `generateViewport()` / `viewport` export; dead `keywords` / `other` tags
  dropped; OG dimensions corrected to match the asset.
- **Crawlability.** Added `app/robots.ts`, `app/sitemap.ts`, and a JSON-LD
  `Organization`+`WebSite` helper rendered once in the root layout.
- **App Router files.** Added `loading.tsx` (enables streaming), `error.tsx`,
  `not-found.tsx`.
- **Rendering.** `HomeView` is a Server Component; client-only animation moved
  to the `HomeShowcase` leaf — models hard rule #6 instead of breaking it.
- **Reduced motion.** `<ReducedMotion>` calls react-spring's `useReducedMotion`,
  toggling the global `skipAnimation` — one app-root mount covers every spring
  and `spring-text-engine`. Chosen over per-component handling for its reach.
- **Build config.** `next.config.ts` now sets `removeConsole` (prod),
  AVIF/WebP, `next/image` breakpoints aligned to the adaptive-grid widths, and
  `poweredByHeader: false`. React Compiler is left as a documented opt-in (needs
  `babel-plugin-react-compiler`).
- Fixed the `ScrollLayout` Lenis rAF leak (cancel on unmount).

**Consequences.** Social/SEO metadata is correct in production once
`NEXT_PUBLIC_SITE_URL` is set. The first project env var now exists (see
[[environment-variables]]). `isBot()` stays available but is discouraged — it
opts routes out of static rendering; reduced-motion is the preferred lever (see
[[seo-metadata]]). React Compiler remains opt-in pending a dependency install.

---

## ADR-0009 — Shared animation ticker; authorized engine performance refactor

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** A performance review of the animation engine found load issues that
scale with the number of animated components on a page:
- `useLoop` started a **private `requestAnimationFrame` loop per hook instance** —
  N scroll-driven components meant N rAF loops, none of which ever stopped.
- `useWindowWidth` attached a **separate debounced `resize` listener per call** —
  one per spring component.
- `useDynamicInView` re-created its `IntersectionObserver` **on every render**
  (effect keyed on an unstable `options` object), and a dead `Proxy` branch
  created observers that were never disconnected.
- `useLoop`'s mount-only effect captured a **stale `onRender`**, so prop changes
  after mount were ignored.
All of this lives under `src/hooks/animation/` and `src/components/animation/springs/`
— `#do-not-modify` (ADR-0002).

**Decision.** With explicit user sign-off, apply a one-time performance refactor
to the protected engine, and introduce a shared, unprotected loop primitive:
- New `src/lib/animation/ticker.ts` — a single app-wide, reference-counted rAF
  loop (`subscribeToTicker`). It starts on the first subscriber, stops on the
  last, and throttles each subscriber independently. **Not** `#do-not-modify` —
  it is the supported extension point.
- `useLoop` now subscribes to the ticker and reads `onRender` / `framerate`
  through refs (fixes the stale-closure bug). Public signature unchanged.
- `useDynamicInView` rewritten without the `Proxy`: one observer, re-created only
  when the observed element or options actually change; exposes a callback ref.
- `use-window-size.ts` (not protected) now serves all three hooks from one
  debounced `resize` listener via `useSyncExternalStore`. The unused
  `debounceDelay` parameter was dropped.
- `mode="forward"` `scroll` listeners in `<Spring>` / `<Inview>` made `passive`.
- Hard rule #2 amended: the engine stays protected by default; changes require
  explicit sign-off.

**Consequences.** A page with N animated components now runs **one** rAF loop and
**one** resize listener instead of N of each, with no observer churn. Public
hook/component APIs are unchanged except `useWindowWidth`/`Height`/`Size`, which
no longer take a `debounceDelay` argument (no caller passed one). This **amends
ADR-0002's** do-not-modify scope.

A follow-up pass then cleared all 13 pre-existing ESLint problems in the engine
(also authorized): `isMobileDisabled` gained an optional `viewportWidth`
argument, missing `disableOnMobile` effect deps were added, a
`trigger.current`-in-cleanup hazard in `<Hover>` was fixed, `<Handle>`'s
transition effects were ref-stabilised, and `useProgressTrigger` now returns
`progress` as a `RefObject<number>` (no consumer affected).

---

## ADR-0008 — Adaptive scaling grid via root font-size

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** An adaptive scaling system was dropped into `src/components/common/`
to keep a rem-based design proportional across viewports. It shipped as a
`styled-components` implementation (`createGlobalStyle`, a `css` `media` helper,
`rm`/`em` helpers, plus `colors.ts` / `fonts.ts` / `utils.ts`). `styled-components`
is not a project dependency, and global CSS belongs in `globals.css` per ADR-0004.

**Decision.** Keep only the scaling behaviour; rebuild it to the project stack.
- **Scale down** (viewport ≤ largest breakpoint) — `vw`-based `html { font-size }`
  media queries in `globals.css`, inside `@layer base`.
- **Scale up** (viewport > largest breakpoint) — a `<AdaptiveGrid>` client
  component (`useAdaptiveGrid` hook) sets an inline `html` font-size at runtime,
  reusing the existing `useResizeLoop` render loop.
- Breakpoints live in `grid.config.ts` as typed config; the `globals.css` media
  queries mirror them and must be kept in sync (formula in both files).
- The dropped `styled-components` files were deleted, not committed.

**Consequences.** A rem-based layout now scales as one unit on every viewport.
`styled-components` stays out of the dependency tree. The breakpoint set is
duplicated across `grid.config.ts` and `globals.css` by design — the CSS-only
config rule (ADR-0004) forbids generating the media queries from JS.

---

## ADR-0007 — Automate the vault workflow with Claude Code hooks

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** The "read the vault first, follow the relevant guide, update the docs
after every change" workflow depended on the user reminding the agent each time.
Documentation drifts the moment it relies on memory.

**Decision.** Encode the workflow as Claude Code hooks in `.claude/settings.json`
(committed, team-wide):
- `SessionStart` — injects a pointer to read the vault first.
- `UserPromptSubmit` — on every request, reminds the agent to consult the relevant
  guide and to update docs for any change made.
- `Stop` — at the end of every turn, blocks **once** to confirm the vault was
  updated. A `${TMPDIR}` marker keyed by session id guarantees it blocks at most
  once per turn (no infinite loop).

**Consequences.** The documentation workflow is enforced without user prompting.
`.claude/settings.json` is now a tracked project file. Hooks are reviewable and
disableable via `/hooks`. New hooks take effect on the next session start (or after
opening `/hooks`). See [[ai-agent-guide]].

---

## ADR-0006 — The vault is the single source of truth

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** ADR-0001 left dense spec files (`project-specs.md`, `text-engine-docs.md`)
at the repo root alongside the vault, creating duplication — the same conventions
existed both as terse specs and as expanded vault notes, which would drift.

**Decision.** The vault is the **only** documentation source.
- `project-specs.md` — deleted; its content was already decomposed into the
  `architecture/` and `frontend/` notes (and `environment-variables.md`).
- `text-engine-docs.md` — moved into the vault as [[text-engine-reference]].
- `generic-layout-prompt.md` — moved into the vault (see ADR via [[changelog]]).
- Root keeps only thin shims: `AGENTS.md` carries the breaking-change warning and
  hard rules and points into the vault; `CLAUDE.md` and `.cursorrules` both
  `@`-import `AGENTS.md`.

**Consequences.** No documentation duplication. Agents bootstrap from `AGENTS.md`
and read vault notes on demand. This **amends ADR-0001** — root files no longer
hold canonical spec content.

---

## ADR-0005 — Use standard `next/link` for navigation

- **Status:** Accepted
- **Date:** 2026-05-21

**Context.** Two conflicting conventions existed: `project-specs.md` specified
standard `next/link` / `useRouter`, while `generic-layout-prompt.md` specified
custom `<AnimLink>` / `useAnimRouter()` wrappers. The custom wrappers were never
built.

**Decision.** Use standard Next.js navigation — `<Link>` from `next/link` and
`useRouter` from `next/navigation`. The `AnimLink` / `useAnimRouter` convention is
dropped. See [[routing]].

**Consequences.** `generic-layout-prompt.md` §5 updated to match. No animated-route-
transition layer exists; if one is needed later, revisit with a new ADR.

---

## ADR-0001 — Adopt an Obsidian vault as the project brain

- **Status:** Accepted — amended by ADR-0006
- **Date:** 2026-05-21

**Context.** Project knowledge was scattered across root markdown files
(`project-specs.md`, `text-engine-docs.md`, `AGENTS.md`). New contributors and AI
agents had no structured map of the system.

**Decision.** Introduce `obsidian/` as an Obsidian vault — a linked, navigable
second brain. Root spec files remain as machine-read sources; the vault expands on
them. See [[ai-agent-guide]].

**Consequences.** Docs must now be maintained alongside code. The vault is the
canonical place to *understand* the project; root files stay canonical for *tooling*.

---

## ADR-0002 — All motion is spring-based (`@react-spring/web`)

- **Status:** Accepted (inherited from starter) — amended by ADR-0014
- **Date:** Project baseline

**Context.** Marketing sites need rich, interruptible, physically natural motion.
CSS transitions and keyframes are rigid; competing libraries add weight.

**Decision.** Use `@react-spring/web` for every animation. A custom component layer
(`src/components/animation/springs/`) wraps it. CSS keyframes and `framer-motion`
are **banned**. CSS transitions were banned outright here; **ADR-0014 narrows that
to allow `transition-*` for trivial hover/focus state changes only.**

**Consequences.** All animation goes through the [[animation-system]]. The springs
folder is `#do-not-modify`. Text animation is delegated to [[text-engine]].

---

## ADR-0003 — Routes delegate to Views

- **Status:** Accepted (inherited from starter)
- **Date:** Project baseline

**Context.** Mixing routing concerns with page UI makes `app/` files heavy and hard
to test.

**Decision.** `app/**/page.tsx` files only import and render a component from
`src/views/`. All layout/UI logic lives in the view. See [[routing]].

**Consequences.** Every route is a 3-line file. Views are the real page components.

---

## ADR-0004 — Tailwind v4 with CSS-based config

- **Status:** Accepted (inherited from starter) — amended by ADR-0012 and ADR-0015
- **Date:** Project baseline

**Context.** Tailwind v4 removes `tailwind.config.js` in favour of CSS-native config.

**Decision.** All theme tokens live in `globals.css` under `:root` and `@theme inline`.
No JS config file. Raw values in class names are banned. See [[design-system]].

**Consequences.** Design tokens are the only styling currency. New values must be
added to `globals.css` first — and, per ADR-0015, must follow the three-tier
naming convention.

---

## ADR-0022 — Recruiting-Landingpage der Steuerkanzlei Kutscher statt Klinikseite

- **Status:** Accepted
- **Date:** 2026-08-25

**Kontext.** Das Template wurde für eine Privatklinik entworfen. Die neue Seite
ist eine Recruiting-Landingpage für eine Steuerkanzlei in Pößneck und bildet den
Inhalt von `da-will-ich-arbeiten.de/kutscher/` nach.

**Entscheidung.** Struktur, Motion-System und Szene bleiben; getauscht werden
Inhalt, Marke und alles, was inhaltlich an Medizin gebunden war. Konkret:

- Die Sprossen der Doppelhelix sind aus `helixPoint()` entfernt. Sie waren das
  Einzige, was die Form als DNA lesbar machte; ohne sie bleiben zwei ineinander
  gedrehte Stränge. Der Branch wurde gelöscht statt der Schwellwert auf 1.0
  gesetzt, damit `rnd1` nur noch den Strang wählt und die Verteilung gleichmäßig
  wird — bei gleicher Punktzahl dichtere Stränge.
- Das DNA-Icon ist durch ein K-Monogramm ersetzt. `MARK_PATH` in
  `lib/brand-mark.ts` speist Header, Favicon, Apple-Icon und OG-Bild.
- Die Team-Rail trägt jetzt die 17 Benefit-Karten, das Kontaktformular ist eine
  dreistufige Schnellbewerbung.

**Konsequenzen.** Die Ordnernamen `dna-ink` sind bewusst nicht umbenannt: das
träfe rund sechzehn Dateien für null sichtbaren Gewinn. Der Name beschreibt jetzt
die Technik (Tinte im Wasser), nicht das Motiv.

---

## ADR-0023 — Kein Cookie-Banner, weil es nichts einzuwilligen gibt

- **Status:** Accepted
- **Date:** 2026-08-25

**Kontext.** Das Template mountet `LazyCookie` im Root-Layout. Die Seite richtet
sich an deutsche Besucher, TDDDG §25 verlangt Einwilligung für jede Speicherung,
die nicht unbedingt erforderlich ist.

**Entscheidung.** Kein Banner. Die Seite setzt keine Cookies, lädt kein Tracking,
und der Font wird selbst gehostet statt über `next/font/google` — es gibt keinen
Drittanbieter-Request. Der einzige externe Embed, die Google-Karte, liegt hinter
einem expliziten Klick, der seine eigene Einwilligung trägt.

**Konsequenzen.** Auf einem Telefon verdeckt kein Banner die Call-to-Action.
Kommt Tracking dazu, liegt `components/common/Cookie/` unverändert bereit; der
Mount-Punkt in `app/layout.tsx` ist kommentiert. Der Font-Wechsel auf Figtree
Variable via `next/font/local` war ohnehin nötig, weil `next/font/google` zur
Buildzeit Netzzugang zu Google braucht.

---

## ADR-0024 — Composer entfernt, Ausgabe bleibt uncodiert

- **Status:** Accepted
- **Date:** 2026-08-25

**Kontext.** Der Port hatte die beiden toten Bloom-Composer des Sketches bereits
gelöscht. Übrig blieb eine Kette mit demselben Defekt eine Stufe kleiner: ein
`RenderPass` in ein Full-Screen-Render-Target und ein `ShaderPass`, dessen
gesamter Fragment-Shader `gl_FragColor = vec4(texture2D(tDiffuse, vUv).xyz, 1.)`
lautet. Seine `uFlameA/B/Amt`-Uniforms wurden jedes Frame geschrieben und von
nichts gelesen — der Flammen-Composite war nie portiert.

**Entscheidung.** Kette entfernt, direkt in den Default-Framebuffer rendern.

**Konsequenzen — und die Falle dabei.** Gespart: ein Render-Target in
Drawing-Buffer-Größe, ein Full-Screen-Quad plus Texture-Fetch pro Frame und zwei
Shader-Programme (gemessen 4 → 2). **Aber:** dieser Copy-Pass war ein
Custom-Shader ohne `<colorspace_fragment>` und hat damit versehentlich three's
Output-Encode unterdrückt. Ohne ihn lief das Encode wieder an, und die ganze
Szene wurde aufgehellt — die Mint-Clearfarbe maß (248, 250, 249) gegen die
(239, 244, 242) der Seite, sichtbar als helles Rechteck im Hero. Deshalb steht
jetzt `renderer.outputColorSpace = LinearSRGBColorSpace` explizit im Konstruktor.
Die Pipeline dekodiert nirgends und darf deshalb nirgends kodieren. Wer den Pass
je zurückholt, muss diese Zeile mit zurücknehmen.

---

## ADR-0025 — Device-Tiering für die Szene

- **Status:** Accepted
- **Date:** 2026-08-25

**Kontext.** 90 % der Besucher kommen mobil. Die Szene rendert 200.000 additiv
geblendete Sprites bei bis zu 1,5-facher Pixeldichte, unabhängig vom Gerät.

**Entscheidung.** Neues Modul `lib/scene/device.ts`, einmal bei Konstruktion
gelesen. Mobil: Pixelratio-Deckel 0,85, Punktzahl ×0,34, Frame-Budget 1000/30,
`antialias: false`. Zusätzlich `depth: false` und `stencil: false` (nichts
depth-testet), Render-Gate auf `document.hidden`, und die Atmosphären-Wolke wird
auf `visible = false` gesetzt, solange `atmoSize` 0 ist.

**Konsequenzen (gemessen, Produktions-Build).** Mobil: Drawing-Buffer 0,23 → 0,07
MPx, Punkte pro Frame 200.000 → 68.000, WebGL-Kontexte 2 → 1, Shader-Programme
4 → 2. Desktop unverändert bei 200.000 Punkten und 1,03 MPx.

Die fps-Zahlen aus derselben Messung sind zwischen Vorher und Nachher **nicht**
vergleichbar: der Zähler hing an `gl.clear()`, und ohne Composer ruft three das
anders oft auf. Headless-Chromium rendert ohnehin über SwiftShader, absolute fps
sind dort bedeutungslos. Belastbar sind nur gezählte Größen.

**Nicht umgesetzt:** das Bot-Poster aus §1 des Skills. `isBot()` liest
`headers()` und nimmt damit die ganze Route aus dem statischen Prerendering
(`○` → `ƒ`). Für eine `noindex`-Anzeigen-Landingpage heißt das: jeder echte
Besucher zahlt TTFB, damit Crawler eine Szene nicht laden, die sie ohnehin nicht
indexieren sollen. Der Handel lohnt hier nicht. Ebenfalls offen: Loader-Prewarm
(§3) und ein echter Test auf einem physischen Gerät.

---

## ADR-0026 — Kontrastwerte des Templates angehoben

- **Status:** Accepted
- **Date:** 2026-08-25

**Kontext.** Eine Messung aller 344 gerenderten Textknoten ergab 43 Verstöße
gegen WCAG AA. Ursache war fast durchgehend `--foreground-muted` (Schwarz bei
40 %, 2,79:1 auf Mint) und `--foreground-subtle` (50 %, 3,94:1).

**Entscheidung.** 60 % und 66 %, also 5,6:1 und 6,9:1.

**Konsequenzen.** Die grau zurückgenommenen Nebensätze im Fundament-Absatz sind
weiterhin klar von der Umgebung abgesetzt, aber lesbar. Zusätzlich bekamen die
Foto-Karten einen opaken Grund plus Verlaufs-Scrim: ihre weiße Schrift hatte als
einzigen Grund das Bild, und ein fehlendes Bild hätte Weiß auf Weiß ergeben.
Verstöße danach: 0.
