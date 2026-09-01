// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Offene Stellen — the "that's me" moment of the page.
 *
 * Two positions only, so they get the weight of two large cards instead of a
 * list under a heading: a visitor who recognises their job title should meet it
 * as the biggest thing on screen, not as a bullet. The whole card is the link,
 * which makes the affordance the card itself rather than a small trailing
 * "Mehr" — on touch that is the difference between one confident tap and
 * hunting for a 44px target.
 *
 * White band on purpose: the cards carry the mint, so the section reads as two
 * panels lifted off the page instead of a mint block on a mint block.
 *
 * The intro stays left-aligned and narrow while the cards span the full
 * measure — the eye lands on the copy, then falls straight into the choice.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { JobsContent } from "@/data/mocks/karriere";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

export interface StellenProps {
  content: JobsContent;
}

/** Cascade for the reveal — cards first, the action block trailing behind. */
const ENTRY_DELAY = { card: 0, cardStep: 140, actions: 300 };

export const Stellen = ({ content }: StellenProps) => (
  <section
    id="stellen"
    aria-labelledby="stellen-heading"
    className="relative bg-background px-5 py-20 md:px-10 lg:py-32"
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      <div className="flex flex-col gap-4 lg:gap-6">
        <TextEngine
          tag="p"
          className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
          {...EYEBROW_MOTION}
        >
          {content.eyebrow}
        </TextEngine>
        <TextEngine
          id="stellen-heading"
          tag="h2"
          className="justify-start text-left text-[2.25rem] leading-display font-light md:text-[3rem] lg:w-[45rem] lg:text-6xl"
          {...HEADING_MOTION}
        >
          {content.title}
        </TextEngine>
        <TextEngine
          tag="p"
          className="justify-start text-left text-base leading-body font-light lg:w-[34rem]"
          {...BODY_MOTION}
        >
          {content.description}
        </TextEngine>
      </div>

      {/* A real list: two sibling choices of equal rank. Grid rather than flex
          so both cards share the taller one's height — a short title next to a
          long one must not produce a short card next to a tall one. */}
      <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {content.jobs.map((job, index) => (
          // `mode` after the spread: ELEMENT_MOTION carries `mode: "always"`,
          // and spreading it last would silently overwrite the "once" asked for
          // here.
          <Inview
            key={job.href + job.title}
            {...ELEMENT_MOTION}
            tag="li"
            // `min-w-0` hebt die Vorgabe `min-width: auto` des Rasterfeldes auf.
            // Ohne sie kann ein Feld nicht schmaler werden als sein Inhalt —
            // und „Steuerfachangestellte/r (m/w/d)" plus Scheibe und Innenrand
            // messen 358 px, wo auf einem 360er-Telefon 305 zur Verfügung
            // stehen. Die Karte trat dann aus ihrer Spalte heraus und schob die
            // ganze Seite um 18 px zur Seite.
            className="min-w-0"
            delayIn={ENTRY_DELAY.card + index * ENTRY_DELAY.cardStep}
          >
            <a
              href={job.href}
              // `group` drives the disc's hover; the card's own colour swap is
              // the one allowed CSS transition (hard rule #2).
              className="group flex h-full min-h-[11rem] items-center justify-between gap-4 rounded-card border border-border-subtle bg-surface-section p-5 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-section-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:min-h-[15rem] lg:gap-8 lg:p-10"
            >
              <div className="flex min-w-0 flex-col gap-2 lg:gap-3">
                {/* Static, no TextEngine: card titles are not section headings
                    (hard rule §2). `hyphens-auto` + `lang` because
                    "Steuerfachangestellte/r" is wider than the mobile column.

                    `break-words` daneben als Rückfall: `hyphens-auto` trennt
                    nur, wo der Browser ein deutsches Trennwörterbuch hat. Fehlt
                    es, bricht der harte Umbruch — unschön, aber immer noch
                    besser als ein Titel, der aus seiner Karte läuft. */}
                <h3
                  lang="de"
                  className="text-[1.5rem] leading-display font-light break-words hyphens-auto lg:text-[1.75rem]"
                >
                  {job.title}
                </h3>
                <p className="text-sm leading-body font-light text-foreground-muted">
                  {job.meta}
                </p>
              </div>
              {/* Same disc as `Button withArrow`, so the gesture is familiar. */}
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-action-secondary text-action-secondary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:bg-action-primary group-hover:text-action-primary-foreground"
              >
                <ArrowUpRightIcon className="size-4" />
              </span>
            </a>
          </Inview>
        ))}
      </ul>

      <Inview
        {...ELEMENT_MOTION}
        tag="div"
        delayIn={ENTRY_DELAY.actions}
        className="flex flex-wrap items-center gap-4"
      >
        {content.actions.map((action, index) => (
          <Button
            key={action.href}
            href={action.href}
            variant={index === 0 ? "primary" : "secondary"}
          >
            {action.label}
          </Button>
        ))}
      </Inview>
    </div>
  </section>
);
