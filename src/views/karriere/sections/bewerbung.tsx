// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Schnellbewerbung — the page's single conversion point.
 *
 * The shell is inherited from the old Contact block on purpose: it carries the
 * page background plus a higher stacking order, which is what lifts it over the
 * sticky Team rail as you scroll, and the live DNA scene stands in for the
 * mockup's `image 660`.
 *
 * What changed is the panel's payload. A one-shot contact form became a
 * three-step application, and that needs state — so the form is split off as a
 * `"use client"` leaf and this section stays a Server Component (hard rule #7).
 * The panel's own title stays here, static: it belongs to the frame, not to the
 * step that happens to be visible.
 */

import TextEngine from "spring-text-engine";

import { LazyDnaInk } from "@/components/scene/dna-ink";
import { KutscherMark } from "@/components/ui/icons";
import type { ContactContent } from "@/data/mocks/karriere";
import {
  BODY_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { BewerbungFormular } from "./bewerbung-formular";

export interface BewerbungProps {
  content: ContactContent;
  privacyHref: string;
}

export const Bewerbung = ({ content, privacyHref }: BewerbungProps) => (
  <section
    id="bewerben"
    aria-labelledby="bewerbung-heading"
    // `justify-start` + `pt-28`, not `justify-center`: the stacked content is
    // taller than the viewport on a phone, so centring pushed the heading up
    // under the fixed header instead of balancing anything.
    className="relative z-20 flex min-h-lvh flex-col gap-10 overflow-hidden rounded-t-section bg-surface-section px-5 pt-28 pb-20 md:px-10 lg:block lg:h-lvh lg:min-h-0 lg:p-0"
  >
    {/* Hidden below `lg` — a second WebGL context on a phone is a real cost,
        and on that screen the form is the only thing that matters. */}
    <div className="pointer-events-none hidden lg:absolute lg:inset-y-0 lg:left-[7.0625rem] lg:block lg:w-[71.125rem]">
      <LazyDnaInk className="block size-full" controls={false} desktopOnly />
    </div>

    <div className="flex flex-col gap-6 lg:absolute lg:top-[35.25%] lg:left-[2.5625rem] lg:w-[42.75rem] lg:gap-12">
      <div className="flex flex-col gap-4 lg:gap-8">
        <TextEngine
          tag="p"
          className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
          {...EYEBROW_MOTION}
        >
          {content.eyebrow}
        </TextEngine>
        <TextEngine
          id="bewerbung-heading"
          tag="h2"
          className="justify-start text-left text-[2.25rem] leading-display font-light md:text-[3rem] lg:text-6xl"
          {...HEADING_MOTION}
        >
          {content.title}
        </TextEngine>
      </div>
      {/* Wider than the old contact copy: the German promise line ("Keine
          Unterlagen notwendig…") needs the extra column or it breaks into five
          ragged lines on desktop. */}
      <TextEngine
        tag="p"
        className="justify-start text-left text-base leading-body font-light lg:w-[31rem]"
        {...BODY_MOTION}
      >
        {content.description}
      </TextEngine>
    </div>

    {/* The header CTA steps aside on this screen (see `HeaderCta`), so the
        panel reaches up to the header's own top edge and keeps the 40px gutter
        below. `lg:bottom-10` fixes its height; the form scrolls inside it on a
        short laptop screen rather than pushing out of the viewport. */}
    <div className="flex flex-col gap-6 rounded-card bg-surface-glass-strong p-6 backdrop-blur-glass md:p-8 lg:absolute lg:top-4 lg:right-10 lg:bottom-10 lg:w-[35.0625rem] lg:gap-8">
      <div className="flex flex-col gap-4">
        <span className="grid size-[2.625rem] place-items-center rounded-mark bg-accent text-action-secondary">
          <KutscherMark className="size-6" />
        </span>
        {/* Static: a form panel's own title animating alongside the section
            heading beside it reads as two competing reveals on one screen. */}
        <h3 className="text-[1.75rem] leading-display font-light lg:text-[2.25rem]">
          {content.formTitle}
        </h3>
      </div>

      <BewerbungFormular content={content} privacyHref={privacyHref} />
    </div>
  </section>
);
