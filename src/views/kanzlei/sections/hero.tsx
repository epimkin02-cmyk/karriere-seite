// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Hero der Landingpage — das Band `#start` mit dem einzigen `<h1>`.
 *
 * ## Die 3D-Szene steht nur hier
 *
 * `LazyDnaInk` ist auf der ganzen Kanzlei-Website genau einmal im DOM, nämlich
 * hier (HAUSREGELN-KANZLEI §1). Sie kommt nach, sobald ihr Chunk geladen ist —
 * seit der Ladevorhang draussen ist, wartet niemand mehr darauf. Der Streifen
 * hat eine feste Höhe, damit beim Eintreffen nichts springt.
 *
 * **Der Textblock trägt `relative z-10`, und das ist tragend.** Das Markup steht
 * in Mobile-Reihenfolge, der Canvas also im DOM *nach* der Copy. Ab `lg` liegt
 * er absolut positioniert in der rechten Hälfte des Bandes; ohne eigene
 * Stapelebene würde er über den Text gemalt. `z-10` allein reicht dafür nicht —
 * z-index greift nur auf positionierten Elementen, und der Textblock ist im
 * Mobile-Layout statisch. Deshalb `relative` dazu.
 *
 * **Auf dem Telefon bekommt die Szene einen begrenzten Streifen**, nicht die
 * halbe Bildschirmhöhe wie im Karriere-Hero. Die Karriereseite verkauft eine
 * Stimmung, diese Seite beantwortet die Frage „ist das mein Steuerberater?" —
 * unter dem ersten Bildschirm sollen Lead und Button stehen, nicht Grafik.
 * Rechnerisch: Kopfzeile 5rem plus Streifen 12rem lassen auf einem 390×844-Gerät
 * den kompletten Textblock samt Button über der Falz.
 *
 * ## Die Copy blendet per CSS ein, nicht per Feder
 *
 * Als einziges Band der Seite. Der Grund steht ausführlich in [[Eintritt]]:
 * Federn starten erst nach der Hydration, und seit der Ladevorhang draussen
 * ist, sähe man bis dahin ein leeres Band — gemessen 694 ms. Alles, was erst
 * beim Scrollen ins Bild kommt, bleibt bei `TextEngine`; dort ist diese
 * Verzögerung unsichtbar. Der Effekt ist derselbe, nur die Uhr ist eine andere.
 */

import { LazyDnaInk } from "@/components/scene/dna-ink";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/data/kanzlei/startseite";

import { Eintritt } from "./eintritt";
import { ANCHOR_OFFSET, BODY, EYEBROW } from "./typografie";

/**
 * Die Inhaltsdatei kennt noch das Ziel `/kontakt` aus der Zeit der fünf Seiten,
 * und an ihr wird nichts geändert (HAUSREGELN-KANZLEI §3). Der Sprung soll aber
 * innerhalb der Seite passieren und nicht über die Weiterleitung der Middleware
 * laufen — ein Seitenwechsel samt neuem Ladevorgang für ein Ziel drei Bänder
 * weiter unten wäre der schlechtere Weg. Deshalb wird die Route hier im Markup
 * auf ihren Anker abgebildet; unbekannte Ziele bleiben unangetastet.
 */
const ANCHOR_BY_ROUTE: Readonly<Record<string, string>> = {
  "/kontakt": "#kontakt",
};

const toAnchor = (href: string) => ANCHOR_BY_ROUTE[href] ?? href;

export const Hero = () => (
  <section
    id="start"
    aria-labelledby="start-heading"
    className={`relative overflow-hidden rounded-b-section bg-surface-section px-5 pt-12 pb-10 md:px-10 lg:min-h-[32rem] lg:py-24 ${ANCHOR_OFFSET}`}
  >
    {/* `relative z-10`: der Canvas steht im DOM weiter unten und liegt ab `lg`
        absolut über dieser Spalte — ohne eigene Stapelebene würde er den Text
        übermalen. */}
    <div className="relative z-10 mx-auto w-full max-w-[85rem]">
      <div className="flex flex-col gap-5 lg:max-w-[29rem] lg:gap-6">
        <Eintritt className={EYEBROW}>{HERO_CONTENT.eyebrow}</Eintritt>
        {/* Der einzige `<h1>` des Dokuments — und seit der Zusammenlegung der
            einzige der ganzen Website ausser den Rechtstexten. `hyphens-auto`
            wegen „Steuerberater": deutsche Komposita brechen sonst aus der
            Spalte. */}
        <Eintritt
          id="start-heading"
          tag="h1"
          variant="heading"
          delay={80}
          className="text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
        >
          {HERO_CONTENT.title}
        </Eintritt>
        <Eintritt
          variant="body"
          delay={260}
          className={`max-w-[38rem] text-left ${BODY}`}
        >
          {HERO_CONTENT.lead}
        </Eintritt>
        {/* Der Button trägt keine eigene Wortstaffelung, deshalb steht die
            Klasse direkt auf dem Wrapper statt über die Komponente zu laufen. */}
        <div
          className="entry-item entry-body mt-3"
          style={{ "--entry-delay": "460ms" } as React.CSSProperties}
        >
          <Button href={toAnchor(HERO_CONTENT.action.href)} variant="primary">
            {HERO_CONTENT.action.label}
          </Button>
        </div>
      </div>
    </div>

    {/* Telefon: ein begrenzter Streifen unter der Copy, der bis an die
        Bandkanten läuft. Ab `lg` die rechte Hälfte des Bandes; das
        `overflow-hidden` der Sektion schneidet ihn an der Rundung ab. */}
    <div className="pointer-events-none -mx-5 mt-8 h-[12rem] md:-mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mx-0 lg:mt-0 lg:h-auto">
      <LazyDnaInk className="block size-full" />
    </div>
  </section>
);
