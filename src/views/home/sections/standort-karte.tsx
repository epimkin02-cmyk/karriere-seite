"use client";

// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Zwei-Klick-Karte — the privacy leaf of the Standort section.
 *
 * The original site embeds the Google Maps iframe unconditionally, which hands
 * every visitor's IP address to Google before anyone has agreed to anything.
 * Here the iframe is **not rendered at all** until the visitor asks for it: not
 * hidden, not parked on an empty `src` — absent from the DOM, so no request of
 * any kind leaves the browser. That is the whole point of the component, and the
 * reason this one leaf carries state at all (hard rule #7).
 *
 * Both states share `FRAME` — one fixed height for the placeholder and for the
 * iframe. A placeholder that merely *looked* right would still resize the moment
 * the map appeared, and the address column beside it would jump under the
 * reader's eye at the exact moment they are looking at the map.
 */

import { useState } from "react";

import { Button } from "@/components/ui/button";

export interface StandortKarteProps {
  /** Accessible name for the iframe — derived from the section heading. */
  title: string;
  embedSrc: string;
  consentTitle: string;
  consentBody: string;
  consentAction: string;
}

/**
 * The one box both states live in. A fixed height rather than `min-h`: `min-h`
 * lets the consent copy grow the box on a narrow screen, and the iframe would
 * then snap back to the floor on click — the very jump this guards against.
 */
const FRAME =
  "relative w-full overflow-hidden rounded-card h-[22rem] lg:h-[30rem]";

export const StandortKarte = ({
  title,
  embedSrc,
  consentTitle,
  consentBody,
  consentAction,
}: StandortKarteProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  if (loaded) {
    return (
      <div className={FRAME}>
        {/* `title` is the iframe's accessible name — without it a screen reader
            announces a nameless frame. `no-referrer-when-downgrade` keeps the
            referrer off any plain-HTTP hop. */}
        <iframe
          src={embedSrc}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`${FRAME} flex flex-col items-center justify-center gap-4 bg-surface-section-deep p-6 text-center`}
    >
      <h3 className="text-[1.5rem] leading-display font-light">
        {consentTitle}
      </h3>
      {/* Muted and small: the consent notice explains the trade, it does not
          compete with the address column for attention. */}
      <p className="max-w-[26rem] text-sm leading-body font-light text-foreground-muted">
        {consentBody}
      </p>
      {/* `Button` exposes no `onClick`, so the handler sits on a wrapper sized
          exactly to the pill (`w-fit`, no padding of its own). The interactive
          element stays the real `<button>` inside it, and keyboard activation
          bubbles its click up to here just like a pointer press. */}
      <span className="inline-flex w-fit" onClick={() => setLoaded(true)}>
        <Button variant="primary">{consentAction}</Button>
      </span>
    </div>
  );
};
