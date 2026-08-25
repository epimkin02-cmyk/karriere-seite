# Karriereseite — Steuerkanzlei Kutscher

Recruiting-Landingpage der Frank Kutscher Steuerberatungsgesellschaft mbH, Pößneck.
Nachbau von `da-will-ich-arbeiten.de/kutscher/` mit identischem Inhalt und neuem Design.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · react-spring ·
spring-text-engine · Three.js · Zod

## Lokal starten

```bash
npm install     # Node 22.13+
npm run dev     # http://localhost:3000
```

`npm run build && npm start` für einen Produktions-Build. **Performance immer am
Produktions-Build messen** — der Dev-Server lädt Chunks eager und React Strict
Mode verdoppelt Listener, die Zahlen sind dort wertlos.

## Wo was liegt

| Was | Wo |
|---|---|
| **Sämtliche Texte** | `src/data/mocks/home.ts` — kein Komponentenfile enthält Text |
| Firmendaten, SEO, Rechtslinks | `src/lib/site.ts` |
| Design-Tokens (Farben, Radien, Timing) | `src/app/globals.css` |
| Sektionen | `src/views/home/sections/`, zusammengesetzt in `src/views/home/index.tsx` |
| 3D-Szene: Aussehen | `src/lib/scene/dna-ink/config.ts` — durchkommentiert |
| 3D-Szene: Form | `helixPoint()` in `src/lib/scene/dna-ink/shaders.ts` |
| Bilder | `public/assets/kutscher/` |
| Bewerbungsformular (Server) | `src/app/api/bewerbung/route.ts` |

Text ändern heißt: eine Datei anfassen. Farbe ändern heißt: eine Datei anfassen.

## Regeln, die dieses Projekt einhält

Ausführlich im Obsidian-Vault des Ursprungstemplates. Die wichtigsten:

1. **Keine CSS-Keyframes, keine zweite Animationsbibliothek.** Alle Bewegung
   läuft über react-spring bzw. spring-text-engine. `transition-*` ist nur für
   diskrete Hover-/Focus-Zustände erlaubt, und nur mit Token-Timing.
2. `src/components/animation/springs/` und `src/hooks/animation/` sind
   read-only — vendored Engine, nur konsumieren.
3. **Keine hardcodierten Farben.** Drei-Tier-Tokens in `globals.css`:
   `--raw-*` (Literale) → semantische Rolle → `@theme inline`-Bindung.
4. Server Components by default, `"use client"` nur an den Blättern.
5. Mobile-first, `lg` (1024 px) ist der einzige Layout-Breakpoint.

## Bewusste Abweichungen vom Original

- **Kein Cookie-Banner.** Die Seite setzt keine Cookies, lädt kein Tracking und
  hostet ihre Schrift selbst — es gibt keinen Drittanbieter-Request und damit
  nichts einzuwilligen. Kommt später Tracking dazu, liegt die
  Consent-Komponente unter `src/components/common/Cookie/` bereit; der
  Mount-Punkt ist in `src/app/layout.tsx` kommentiert.
- **Google Maps hinter einem Klick.** Das Original bettet die Karte direkt ein
  und überträgt damit die IP jedes Besuchers an Google, bevor irgendwer
  zugestimmt hat.
- **`user-scalable=no` entfernt.** Das Original unterbindet Zoom — ein
  Accessibility-Verstoß.
- **`noindex` bleibt**, gesteuert über das Flag `siteConfig.noindex`. Es treibt
  `robots.ts` und die Metadaten gemeinsam, die beiden können also nicht
  auseinanderlaufen.

## Offene Punkte

- [ ] **Fotos.** `public/assets/kutscher/*.jpg` sind sichtbar markierte
      Platzhalter. Ersetzen unter gleichem Namen, gleiche Seitenverhältnisse.
- [ ] **Testimonial.** Wortlaut von Till Pfaffendorf fehlt; der Platzhalter in
      `TESTIMONIAL_CONTENT` ist bewusst als solcher erkennbar.
- [ ] **Logo.** Das K-Monogramm ist ein Interim. Echtes Logo → `MARK_PATH` in
      `src/lib/brand-mark.ts` austauschen, das versorgt Header, Favicon,
      Apple-Icon und OG-Bild aus einer Quelle.
- [ ] **Formularzustellung.** `src/app/api/bewerbung/route.ts` validiert, sendet
      aber noch nichts. Siehe `TODO(zustellung):` dort.
- [ ] **Mobile-Performance-Pass** für die WebGL-Szene (Device-Tiering,
      DPR-Clamp, In-View-Gating).

## Deployment

Vercel, Framework-Preset Next.js, Root `./`. Kein Build-Command-Override nötig.
