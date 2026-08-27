// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Hero der Landingpage — das Band `#start` mit dem einzigen `<h1>`.
 *
 * ## Die 3D-Szene steht nur hier
 *
 * `LazyDnaInk` ist auf der ganzen Kanzlei-Website genau einmal im DOM, nämlich
 * hier (HAUSREGELN-KANZLEI §1). Diese eine Instanz trägt deshalb auch
 * `gatesPreload`: sie hält den Preloader-Vorhang, bis das erste Frame gezeichnet
 * ist. Seit die fünf Seiten eine einzige geworden sind, ist das umso strikter —
 * eine zweite Szene weiter unten rendert ausserhalb des Viewports nie und würde
 * das Tor nie freigeben.
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
 * `RevealOnReady` bleibt diesem Band vorbehalten: es ist das einzige, das beim
 * ersten Frame schon im Viewport steht.
 */

import TextEngine from "spring-text-engine";

import { Spring } from "@/components/animation/springs/spring";
import { RevealOnReady } from "@/components/common/preloader";
import { LazyDnaInk } from "@/components/scene/dna-ink";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/data/kanzlei/startseite";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

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
    <RevealOnReady className="relative z-10 mx-auto w-full max-w-[85rem]">
      <div className="flex flex-col gap-5 lg:max-w-[29rem] lg:gap-6">
        <TextEngine tag="p" className={EYEBROW} {...EYEBROW_MOTION}>
          {HERO_CONTENT.eyebrow}
        </TextEngine>
        {/* Der einzige `<h1>` des Dokuments — und seit der Zusammenlegung der
            einzige der ganzen Website ausser den Rechtstexten. `hyphens-auto`
            wegen „Steuerberater": deutsche Komposita brechen sonst aus der
            Spalte. */}
        <TextEngine
          id="start-heading"
          tag="h1"
          className="justify-start text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
          {...HEADING_MOTION}
        >
          {HERO_CONTENT.title}
        </TextEngine>
        <TextEngine
          tag="p"
          className={`max-w-[38rem] justify-start text-left ${BODY}`}
          {...BODY_MOTION}
        >
          {HERO_CONTENT.lead}
        </TextEngine>
        <Spring {...ELEMENT_MOTION} delayIn={140} tag="div" className="mt-3">
          <Button href={toAnchor(HERO_CONTENT.action.href)} variant="primary">
            {HERO_CONTENT.action.label}
          </Button>
        </Spring>
      </div>
    </RevealOnReady>

    {/* Telefon: ein begrenzter Streifen unter der Copy, der bis an die
        Bandkanten läuft. Ab `lg` die rechte Hälfte des Bandes; das
        `overflow-hidden` der Sektion schneidet ihn an der Rundung ab. */}
    <div className="pointer-events-none -mx-5 mt-8 h-[12rem] md:-mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mx-0 lg:mt-0 lg:h-auto">
      <LazyDnaInk className="block size-full" gatesPreload />
    </div>
  </section>
);
