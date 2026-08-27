// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Band `#beratung-anfragen` — der Abschluss der Seite.
 *
 * **Es gibt ihn genau einmal.** Solange die Website fünf Seiten hatte, stand
 * dieses Band am Fuss von vieren davon — auf einer einzigen Seite
 * aneinandergereiht wäre daraus viermal derselbe Satz mit derselben Nummer
 * gewesen, in Abständen von wenigen Bildschirmhöhen. Das liest sich nicht als
 * Nachdruck, sondern als Fehler. Übrig bleibt der eine am Ende; die drei
 * anderen `ClosingContent` der Inhaltsdateien bleiben ungenutzt stehen, weil an
 * den Daten nichts geändert wird (HAUSREGELN-KANZLEI §3).
 *
 * Weiss, obwohl die Fusszeile des Layouts mintfarben ist: so setzt sich der
 * Abschluss gegen sie ab, statt mit ihr zu einer Fläche zu verschmelzen.
 *
 * Das Band ist eine Geste, kein Textblock: ein `<Inview>` für Satz und Nummer
 * zusammen, die Überschrift ohne eigenen Auftritt.
 */

import { Inview } from "@/components/animation/springs/in-view";
import { CLOSING_CONTENT } from "@/data/kanzlei/startseite";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

import { ANCHOR_OFFSET, FOCUS } from "./typografie";

export const Abschluss = () => (
  <section
    id="beratung-anfragen"
    aria-labelledby="beratung-anfragen-heading"
    className={`bg-background px-5 py-16 md:px-10 lg:py-24 ${ANCHOR_OFFSET}`}
  >
    <Inview
      {...ELEMENT_MOTION}
      mode="once"
      tag="div"
      className="mx-auto flex w-full max-w-[85rem] flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
    >
      <h2
        id="beratung-anfragen-heading"
        className="max-w-[38rem] text-[1.5rem] leading-display font-light lg:text-[2rem]"
      >
        {CLOSING_CONTENT.text}
      </h2>
      {/* Echter `tel:`-Link statt Button mit Handler: auf dem Telefon wählt er
          direkt, am Rechner bietet er die Nummer zum Kopieren an. */}
      <a
        href={CLOSING_CONTENT.phoneHref}
        className={`inline-flex min-h-12 shrink-0 items-center rounded-action bg-action-primary px-8 text-[1.125rem] leading-body font-light text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-border ${FOCUS}`}
      >
        {CLOSING_CONTENT.phoneLabel}
      </a>
    </Inview>
  </section>
);
