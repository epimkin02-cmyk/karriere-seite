// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * Ablauf — die letzte Sektion vor dem Bewerbungsformular.
 *
 * Sie trägt drei Aussagen, die sich nicht gegenseitig überstimmen dürfen: ein
 * Gesicht, eine Abfolge und ein Versprechen. Deshalb sind sie nicht als drei
 * gleichwertige Kästen gesetzt, sondern nach unten hin zunehmend verdichtet —
 * Person offen im Feld, Schritte an einer Linie, Versprechen als einzige
 * gefärbte Fläche.
 *
 * Mintband mit `rounded-section`: der Abschnitt liegt zwischen zwei weißen
 * Bändern, die Alternation ist die Struktur der Seite.
 *
 * > Warum eine Linie statt drei Karten
 * > Die drei Schritte sind eine Reihenfolge, keine Auswahl. Karten würden sie
 * > als gleichzeitige Optionen zeigen. Die Haarlinie läuft mobil vertikal an
 * > allen drei Einträgen entlang und ab `lg` waagerecht über alle drei Spalten,
 * > also jeweils in Leserichtung.
 *
 * > Warum die Schritt-Texte statisch sind
 * > Der Eintrag als Ganzes wird bereits eingeblendet. Drei zusätzlich wortweise
 * > auflösende Absätze neben drei großen Ziffern lesen sich als Lärm — dieselbe
 * > Begründung, aus der Karten-Titel keinen eigenen Reveal bekommen.
 *
 * Das Wechselversprechen bleibt der einzige Lime-Block der Seite: die Farbe
 * wirkt nur, solange sie einmal vorkommt.
 */

import Image from "next/image";

import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import type { ContactPerson, ProcessContent } from "@/data/mocks/karriere";
import {
  BODY_MOTION,
  ELEMENT_MOTION,
  EYEBROW_MOTION,
  HEADING_MOTION,
} from "@/lib/motion/text-presets";

/** Kaskade in ms — Person, dann die Schritte, zuletzt das Versprechen. */
const PERSON_DELAY = 0;
const STEP_DELAY_BASE = 140;
const STEP_DELAY_STEP = 80;
const PROMISE_DELAY = 440;

/** Quelle ist 1200×1600; das Zuschneiden auf ein Quadrat macht `className`. */
const PORTRAIT_WIDTH = 1200;
const PORTRAIT_HEIGHT = 1600;

/** Farbwechsel auf Links — die einzige erlaubte CSS-Transition. */
const LINK_CLASSES =
  "inline-flex min-h-11 items-center text-base leading-body font-light break-words transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent";

export interface AblaufProps {
  content: ProcessContent;
}

/**
 * Der Ansprechpartner. Eigene Komponente nur, um die Sektion lesbar zu halten —
 * sie bleibt Server Component und wird nicht exportiert.
 */
const PersonCard = ({ person }: { person: ContactPerson }) => (
  <Inview
    {...ELEMENT_MOTION}
    delayIn={PERSON_DELAY}
    tag="div"
    className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10"
  >
    {/* `object-top`, weil der Quadratschnitt eines Hochformats sonst am Kinn
        endet. */}
    <Image
      src={person.image}
      alt={`${person.name}, ${person.role}`}
      width={PORTRAIT_WIDTH}
      height={PORTRAIT_HEIGHT}
      className="size-40 shrink-0 rounded-card object-cover object-top lg:size-56"
    />
    <div className="flex flex-col gap-4 lg:max-w-[34rem] lg:gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-[1.5rem] leading-display font-light lg:text-[1.75rem]">
          {person.name}
        </h3>
        <p className="text-sm leading-body font-light text-foreground-muted">
          {person.role}
        </p>
      </div>
      {/* Wörtliche Rede der Person, also `blockquote` — sie steht in einer
          Größe zwischen Fließtext und Heading, damit sie den Satz trägt, ohne
          mit dem Sektions-`h2` zu konkurrieren. */}
      <blockquote
        lang="de"
        className="text-[1.25rem] leading-display font-light hyphens-auto lg:text-[1.5rem]"
      >
        {person.quote}
      </blockquote>
      {/* Echte `tel:`/`mailto:`-Links statt Textzeilen: mobil ist das der
          kürzeste Weg zum Gespräch. `min-h-11` sichert das Touch-Ziel. */}
      <div className="flex flex-col">
        <a href={person.phoneHref} className={LINK_CLASSES}>
          {person.phone}
        </a>
        <a href={`mailto:${person.email}`} className={LINK_CLASSES}>
          {person.email}
        </a>
      </div>
    </div>
  </Inview>
);

export const Ablauf = ({ content }: AblaufProps) => (
  <section
    id="ablauf"
    aria-labelledby="ablauf-heading"
    className="relative rounded-section bg-surface-section px-5 py-20 md:px-10 lg:py-32"
  >
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-12 lg:gap-20">
      {/* `justify-start` neben `text-left`: TextEngine legt jedes Wort als
          Flex-Item aus, Textausrichtung allein bewegt darin nichts. */}
      <div className="flex flex-col gap-4 lg:gap-6">
        <TextEngine
          tag="p"
          className="justify-start text-left text-sm leading-body font-medium text-accent uppercase"
          {...EYEBROW_MOTION}
        >
          {content.eyebrow}
        </TextEngine>
        <TextEngine
          id="ablauf-heading"
          tag="h2"
          className="justify-start text-left text-[2.25rem] leading-display font-light md:text-[3rem] lg:w-[45rem] lg:text-6xl"
          {...HEADING_MOTION}
        >
          {content.title}
        </TextEngine>
      </div>

      <PersonCard person={content.person} />

      {/* `ol`, weil die Reihenfolge die Aussage ist. Kein Gap, dafür Padding:
          die Linie liegt am Element und bliebe sonst zwischen den Schritten
          stehen. */}
      <ol lang="de" className="grid grid-cols-1 hyphens-auto lg:grid-cols-3">
        {content.steps.map((step, index) => (
          <Inview
            key={step.step}
            {...ELEMENT_MOTION}
            delayIn={STEP_DELAY_BASE + index * STEP_DELAY_STEP}
            tag="li"
            className="flex flex-col gap-3 border-l border-border-subtle pb-10 pl-6 last:pb-0 lg:border-t lg:border-l-0 lg:pt-8 lg:pr-10 lg:pb-0 lg:pl-0 lg:last:pr-0"
          >
            <span
              aria-hidden="true"
              className="text-[3rem] leading-display font-light text-accent lg:text-[3.75rem]"
            >
              {step.step}
            </span>
            <h3 className="text-[1.5rem] leading-display font-light lg:text-[1.75rem]">
              {step.title}
            </h3>
            <p className="max-w-[30rem] text-base leading-body font-light text-foreground-muted">
              {step.body}
            </p>
          </Inview>
        ))}
      </ol>

      <Inview
        {...ELEMENT_MOTION}
        delayIn={PROMISE_DELAY}
        tag="div"
        className="flex flex-col gap-3 rounded-card border border-action-secondary-border bg-action-secondary p-8 text-action-secondary-foreground lg:gap-4 lg:p-12"
      >
        <h3 className="text-[1.5rem] leading-display font-light lg:text-[2.25rem]">
          {content.promise.title}
        </h3>
        <p
          lang="de"
          className="max-w-[48rem] text-base leading-body font-light hyphens-auto"
        >
          {content.promise.body}
        </p>
      </Inview>

      {/* Fließtext, also `BODY_MOTION` statt `ELEMENT_MOTION` — die Zeile ist
          der leise Abschluss und übergibt an das Formular darunter. */}
      <TextEngine
        tag="p"
        className="w-full justify-center text-center text-base leading-body font-light text-foreground-muted"
        {...BODY_MOTION}
      >
        {content.closing}
      </TextEngine>
    </div>
  </section>
);
