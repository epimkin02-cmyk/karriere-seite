"use client";

// 📖 Docs: obsidian/frontend/components/home-sections.md

/**
 * The three-step Schnellbewerbung — the only stateful leaf on the page.
 *
 * Two ideas drive the markup:
 *
 * 1. **Tapping instead of typing.** Steps 1 and 2 are `choice` fields, rendered
 *    as real radio groups (`fieldset`/`legend`/`input[type=radio]`) whose native
 *    control is `sr-only` and whose pill is drawn on the `<label>` through
 *    `peer-checked:`. Keyboard, screen reader and form semantics stay the
 *    browser's; only the paint is ours. That is the "ohne Unterlagen" promise
 *    made literal — two taps per step, no keyboard on a phone.
 * 2. **Nobody may fall off the form.** A step refuses to advance while a
 *    required answer is missing; the message hangs on the field that caused it
 *    (`aria-describedby` + `aria-invalid`), never in a box at the top, and
 *    focus jumps to that field. On a successful step change focus moves to the
 *    new `<legend>` or first input, and the step counter is a polite live
 *    region — otherwise a keyboard or screen-reader user is left standing in a
 *    form that silently swapped its contents underneath them.
 *
 * `noValidate`: the fields keep their `required`/`type` semantics for assistive
 * tech, but the browser's own bubble would fire *in English on a German form*
 * and compete with the inline message, so validation is ours alone.
 */

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { Button } from "@/components/ui/button";
import type { ContactContent, FormField } from "@/data/mocks/home";
import { apiFetch } from "@/lib/api-client";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

export interface BewerbungFormularProps {
  content: ContactContent;
  privacyHref: string;
}

const LABEL_CLASSES =
  "text-sm leading-body font-medium text-accent uppercase";

const FIELD_CLASSES =
  "min-h-11 w-full rounded-panel border border-border-subtle bg-transparent px-5 py-3 text-base leading-body font-light placeholder:text-foreground-subtle transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-accent focus-visible:outline-none aria-[invalid=true]:border-accent";

/**
 * The pill an option is painted as. `min-h-11` is the 44px touch target; the
 * checked state is the primary action colour, so a filled step reads at a
 * glance from across the panel.
 */
const OPTION_CLASSES =
  "flex min-h-11 cursor-pointer items-center rounded-action border border-border-subtle px-5 py-2 text-base leading-body font-light transition-colors duration-[var(--duration-fast)] ease-entrance peer-hover:border-accent peer-focus-visible:border-accent peer-aria-[invalid=true]:border-accent peer-checked:border-action-primary-border peer-checked:bg-action-primary peer-checked:text-action-primary-foreground";

/** Autofill/keyboard hints per field type — the one `text` field is the name. */
const INPUT_HINTS = {
  text: { autoComplete: "name", inputMode: "text" },
  email: { autoComplete: "email", inputMode: "email" },
  tel: { autoComplete: "tel", inputMode: "tel" },
  textarea: { autoComplete: "off", inputMode: "text" },
} as const;

/**
 * What blocks a step. Every choice has to be answered (it is one tap), and of
 * the contact fields only name and mail — a phone number we can do without,
 * and forcing a message would cost more applications than it gains.
 */
const isRequired = (field: FormField) =>
  field.type === "choice" || field.name === "name" || field.name === "email";

export const BewerbungFormular = ({
  content,
  privacyHref,
}: BewerbungFormularProps) => {
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const stepRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  /** Set only by a deliberate step change, so the first mount steals no focus. */
  const moved = useRef(false);
  /** Set only by a blocked submit, so typing never yanks focus back. */
  const blocked = useRef(false);
  const pending = useRef(false);

  const steps = content.steps;
  const step = steps[index];
  const isLast = index === steps.length - 1;
  const total = String(steps.length).padStart(step.step.length, "0");

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    stepRef.current?.querySelector<HTMLElement>("[data-step-entry]")?.focus();
  }, [index]);

  useEffect(() => {
    if (!blocked.current) return;
    blocked.current = false;
    stepRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [errors]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const write = (name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => (previous[name] ? { ...previous, [name]: "" } : previous));
  };

  const goBack = () => {
    moved.current = true;
    setFailed(false);
    setIndex((previous) => Math.max(previous - 1, 0));
  };

  /** One submit handler for both jobs: "Weiter" advances, the last step sends. */
  const advance = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;

    const missing: Record<string, string> = {};
    for (const field of step.fields) {
      if (isRequired(field) && !(values[field.name] ?? "").trim()) {
        missing[field.name] = content.requiredHint;
      }
    }
    if (Object.keys(missing).length > 0) {
      blocked.current = true;
      setErrors(missing);
      return;
    }

    if (!isLast) {
      moved.current = true;
      setIndex((previous) => previous + 1);
      return;
    }

    pending.current = true;
    setFailed(false);
    try {
      await apiFetch("/api/bewerbung", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      pending.current = false;
    }
  };

  if (sent) {
    return (
      <Spring
        {...ELEMENT_MOTION}
        tag="div"
        className="flex flex-1 flex-col justify-center gap-4"
      >
        {/* `tabIndex={-1}` purely so the confirmation can take focus — the form
            it replaced is gone, and focus must land somewhere that says so. */}
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-[1.5rem] leading-display font-light focus-visible:outline-none lg:text-[1.75rem]"
        >
          {content.successTitle}
        </h3>
        <p className="text-base leading-body font-light text-foreground-muted">
          {content.successBody}
        </p>
      </Spring>
    );
  }

  return (
    <form
      noValidate
      onSubmit={advance}
      className="flex flex-1 flex-col gap-6 lg:min-h-0"
    >
      <div className="flex flex-col gap-2">
        {/* The only new string on the page is a composition of numbers that
            already exist: "01 / 03". Polite, so it is announced after the
            focused legend rather than cutting across it. */}
        <p aria-live="polite" className={LABEL_CLASSES}>
          {step.step} / {total}
        </p>
        <div
          aria-hidden="true"
          className="h-1 w-full overflow-hidden rounded-chip bg-border-subtle"
        >
          {/* `ELEMENT_MOTION` minus its values: the preset's spring keeps the
              bar in the page's one motion vocabulary, while `to` has to carry
              the progress itself. A CSS transition or keyframe here would break
              hard rule #1. */}
          <Spring
            {...ELEMENT_MOTION}
            from={{ transform: "scaleX(0)" }}
            to={{ transform: `scaleX(${(index + 1) / steps.length})` }}
            tag="div"
            className="h-full w-full origin-left rounded-chip bg-accent"
          />
        </div>
      </div>

      {/* Keyed on the step: the remount is what makes the spring replay, so
          each step arrives with the same blur-and-rise as the copy around it. */}
      <Spring
        {...ELEMENT_MOTION}
        key={step.step}
        ref={stepRef}
        tag="div"
        className="flex flex-col gap-6 lg:flex-1 lg:overflow-y-auto"
      >
        {step.fields.map((field, fieldIndex) => {
          const errorId = `${field.name}-fehler`;
          const error = errors[field.name];
          const first = fieldIndex === 0;

          if (field.type === "choice") {
            return (
              <fieldset key={field.name} className="flex flex-col gap-3">
                {/* The legend is the group's name for assistive tech and the
                    landing spot for focus on a step change. */}
                <legend
                  tabIndex={first ? -1 : undefined}
                  data-step-entry={first ? "" : undefined}
                  className={`${LABEL_CLASSES} focus-visible:outline-none`}
                >
                  {field.label}
                </legend>
                {/* `lang`/`hyphens-auto`: "Steuerfachangestellte/r (m/w/d)" is
                    wider than a pill on a 390px screen, and a hyphenated break
                    beats a pill that runs past the panel edge. */}
                {/* The invalid state and the error description belong to the
                    GROUP, not to each radio: `aria-invalid` is not supported on
                    role="radio", and repeating `aria-describedby` on every
                    option would make a screen reader read the same error once
                    per pill. The fieldset already names the group via its
                    legend, so `role="radiogroup"` here just gives that name
                    something to attach the state to. */}
                <div
                  lang="de"
                  role="radiogroup"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  className="flex flex-wrap gap-2 hyphens-auto"
                >
                  {field.options?.map((option, optionIndex) => {
                    // Indexed, not slugged from the label: the options carry
                    // slashes and parentheses ("Steuerfachangestellte/r
                    // (m/w/d)"), which are not legal in an `id`.
                    const optionId = `${field.name}-${optionIndex}`;
                    return (
                      <div key={option} className="flex">
                        <input
                          type="radio"
                          id={optionId}
                          name={field.name}
                          value={option}
                          checked={values[field.name] === option}
                          onChange={() => write(field.name, option)}
                          required
                          className="peer sr-only"
                        />
                        <label htmlFor={optionId} className={OPTION_CLASSES}>
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {error && (
                  <p
                    id={errorId}
                    className="text-sm leading-body font-medium text-accent"
                  >
                    {error}
                  </p>
                )}
              </fieldset>
            );
          }

          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className={LABEL_CLASSES}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={2}
                  value={values[field.name] ?? ""}
                  onChange={(event) => write(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  {...INPUT_HINTS[field.type]}
                  className={`${FIELD_CLASSES} resize-none`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={values[field.name] ?? ""}
                  onChange={(event) => write(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  required={isRequired(field)}
                  data-step-entry={first ? "" : undefined}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  {...INPUT_HINTS[field.type]}
                  className={FIELD_CLASSES}
                />
              )}
              {error && (
                <p
                  id={errorId}
                  className="text-sm leading-body font-medium text-accent"
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </Spring>

      {isLast && (
        <p className="text-sm leading-body font-light text-foreground-subtle">
          {content.consentLead}{" "}
          <Link
            href={privacyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            {content.consentLinkLabel}
          </Link>
          {content.consentTail}
        </p>
      )}

      {failed && (
        <p
          role="alert"
          className="text-sm leading-body font-medium text-accent"
        >
          {content.submitErrorHint}
        </p>
      )}

      {/* `mt-auto` pins the actions to the panel's bottom edge, as in Figma. */}
      <div className="mt-auto flex items-center gap-3">
        {index > 0 && (
          // `Button` exposes no `onClick`, so the handler sits on a wrapper
          // sized exactly to the pill — same trick as `StandortKarte`. The
          // interactive element stays the real `<button>` inside it.
          <span className="inline-flex w-fit" onClick={goBack}>
            <Button variant="secondary">{content.backLabel}</Button>
          </span>
        )}
        <Button
          type="submit"
          variant="primary"
          withArrow
          className="flex-1 justify-between"
        >
          {isLast ? content.submitLabel : content.nextLabel}
        </Button>
      </div>
    </form>
  );
};
