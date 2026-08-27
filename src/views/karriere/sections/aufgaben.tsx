// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Aufgaben & Anforderungen — the mint band between two white ones.
 *
 * The two blocks are a matched pair, not a ranked list: one describes what the
 * job gives, the other what it asks. Two card boxes would have made them look
 * like separate offers, so they share one field and are parted only by a
 * hairline — horizontal on mobile, vertical from `lg`. The rule lives on the
 * grid as `divide-*` rather than as a border per child, which is what keeps a
 * stray line off the outer edge.
 *
 * There is deliberately **no section `h2` of its own**: the two block titles are
 * the headings, so an extra one above them would either outrank the pair or
 * repeat it. The accessible name therefore comes from `aria-label` instead of
 * `aria-labelledby`, and it reuses the eyebrow so the label still ships with the
 * content (hard rule #12) instead of being hardcoded here.
 *
 * The titles sit a step below the page's other section headings
 * (`1.75rem`/`2.25rem` against `2.25rem`/`3.75rem`): two equal titles side by
 * side carry the weight together, and at the full display size they would read
 * as two competing sections.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { Button } from "@/components/ui/button";
import type { RoleContent } from "@/data/mocks/karriere";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

/** Cascade in ms — the blocks come in left to right, the action last. */
const BLOCK_DELAY_STEP = 140;
const ACTIONS_DELAY = 300;

export interface AufgabenProps {
  content: RoleContent;
}

export const Aufgaben = ({ content }: AufgabenProps) => (
  <section
    id="aufgaben"
    aria-label={content.eyebrow}
    className="relative rounded-section bg-surface-section px-5 py-20 md:px-10 lg:py-32"
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      {/* `justify-start` next to `text-left`: TextEngine's container is a flex
          row, so text-align on its own aligns nothing. */}
      <TextEngine
        tag="p"
        className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
        {...EYEBROW_MOTION}
      >
        {content.eyebrow}
      </TextEngine>

      {/* `lang`/`hyphens-auto` so German compounds like
          „Steuerfachangestellte/r" break instead of pushing the column wide at
          390px. */}
      <div
        lang="de"
        className="grid grid-cols-1 divide-y divide-border-subtle hyphens-auto lg:grid-cols-2 lg:divide-x lg:divide-y-0"
      >
        {content.blocks.map((block, index) => (
          // Padding rather than `gap`: with `divide-*` the rule sits on the
          // child's own edge, and a gap would leave it floating in the middle
          // of the space instead of centred between the two blocks.
          <Inview
            key={block.title}
            {...ELEMENT_MOTION}
            delayIn={index * BLOCK_DELAY_STEP}
            tag="article"
            className="flex flex-col gap-5 py-10 first:pt-0 last:pb-0 lg:gap-6 lg:px-12 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <TextEngine
              tag="h2"
              className="justify-start text-left text-[1.75rem] leading-display font-light lg:text-[2.25rem]"
              {...HEADING_MOTION}
            >
              {block.title}
            </TextEngine>
            {/* Capped at 34rem: the column is ~40rem wide on a 1440 screen,
                which runs the long paragraphs past a comfortable measure. */}
            <TextEngine
              tag="p"
              className="max-w-[34rem] justify-start text-left text-base leading-body font-light"
              {...BODY_MOTION}
            >
              {block.body}
            </TextEngine>
          </Inview>
        ))}
      </div>

      {/* Centred under both blocks — it answers the pair, not either half. */}
      <Inview
        {...ELEMENT_MOTION}
        delayIn={ACTIONS_DELAY}
        tag="div"
        className="flex flex-wrap items-center justify-center gap-4"
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
