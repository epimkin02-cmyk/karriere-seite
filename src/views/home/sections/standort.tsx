// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Standort — address, three location reasons, and the map.
 *
 * White band: the map is the loudest thing on screen once it loads, and a mint
 * field behind it would fight the map's own colours.
 *
 * Two columns from `lg`, stacked on mobile with the address **first**. On a
 * phone the answer to "where is this?" is the street and the postcode — the map
 * is the follow-up, and putting it on top would push the address below the fold
 * on the one device where 90% of visitors read this.
 *
 * The map itself lives in a `"use client"` leaf because it holds consent state;
 * the section stays a Server Component (hard rule #7). The leaf takes the map
 * fields as five plain props rather than the whole `content` object, so it knows
 * nothing about the section it happens to sit in.
 */

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { LocationContent } from "@/data/mocks/home";
import {
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

import { StandortKarte } from "./standort-karte";

export interface StandortProps {
  content: LocationContent;
}

/** Cascade in ms — address, then its reasons, then the map. */
const ENTRY_DELAY = { address: 0, highlights: 140, map: 220 };

export const Standort = ({ content }: StandortProps) => (
  <section
    id="standort"
    aria-labelledby="standort-heading"
    className="relative bg-background px-5 py-20 md:px-10 lg:py-32"
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-16">
      <div className="flex flex-col gap-4 lg:gap-6">
        {/* `justify-start` next to `text-left`: TextEngine's container is a flex
            row, so text-align on its own aligns nothing. */}
        <TextEngine
          tag="p"
          className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
          {...EYEBROW_MOTION}
        >
          {content.eyebrow}
        </TextEngine>
        <TextEngine
          id="standort-heading"
          tag="h2"
          className="justify-start text-left text-[2.25rem] leading-display font-light md:text-[3rem] lg:w-[45rem] lg:text-6xl"
          {...HEADING_MOTION}
        >
          {content.title}
        </TextEngine>
      </div>

      {/* `items-start` so the short address column keeps its own height instead
          of stretching to the map's. */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* No `mode` override: ELEMENT_MOTION ships `mode: "always"`, and that
              is a correctness call — a reveal that starts at `opacity: 0` and
              gets starved on a busy frame would stay invisible forever under
              `once`. */}
          <Inview
            {...ELEMENT_MOTION}
            delayIn={ENTRY_DELAY.address}
            tag="address"
            className="flex flex-col gap-1 text-base leading-body font-light not-italic"
          >
            {content.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Inview>

          {/* A real `<ul>` with the marker drawn as an SVG rather than
              `list-disc`: the bullet is part of the design (accent tick, aligned
              to the first line), and a list marker cannot be coloured or sized
              independently of its text. */}
          <Inview
            {...ELEMENT_MOTION}
            delayIn={ENTRY_DELAY.highlights}
            tag="ul"
            className="flex flex-col gap-3 lg:gap-4"
          >
            {content.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 size-4 shrink-0 text-accent"
                >
                  <path d="m3 8.5 3.25 3.25L13 4.75" />
                </svg>
                <span className="text-base leading-body font-light">
                  {highlight}
                </span>
              </li>
            ))}
          </Inview>
        </div>

        <Inview {...ELEMENT_MOTION} delayIn={ENTRY_DELAY.map} tag="div">
          <StandortKarte
            title={content.title}
            embedSrc={content.mapEmbedSrc}
            consentTitle={content.mapConsentTitle}
            consentBody={content.mapConsentBody}
            consentAction={content.mapConsentAction}
          />
        </Inview>
      </div>
    </div>
  </section>
);
