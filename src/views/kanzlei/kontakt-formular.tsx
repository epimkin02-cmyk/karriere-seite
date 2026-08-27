"use client";

// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Das Kontaktformular — das einzige zustandsbehaftete Blatt der Kanzlei-Website.
 *
 * Einstufig, fünf Pflichtfelder. Die Lösungen für Validierung, Fokus und
 * Fehleransage sind die der Schnellbewerbung
 * (`views/karriere/sections/bewerbung-formular.tsx`), nur ohne deren Schrittwerk:
 *
 *  - `noValidate` am Formular. Die Felder behalten `required` und ihren `type`,
 *    damit assistive Technik den Pflichtstatus ansagt — aber die Browserblase
 *    meldet sich je nach Spracheinstellung auf Englisch und konkurriert mit der
 *    Meldung am Feld. Geprüft wird deshalb hier.
 *  - Niemand darf aus dem Formular fallen: die Meldung hängt am verursachenden
 *    Feld (`aria-describedby` + `aria-invalid`), nicht in einem Kasten obendrüber,
 *    und der Fokus springt nach einem blockierten Absenden auf das erste
 *    ungültige Feld.
 *  - Nach dem Absenden ersetzt die Bestätigung das Formular und nimmt den Fokus;
 *    das Formular ist weg, der Fokus muss auf etwas landen, das das sagt.
 *  - Ein Sendevorgang zur Zeit: `pending` ist eine Ref, kein State, damit der
 *    zweite Klick schon vor dem nächsten Render abprallt.
 *
 * **Pflichtfeld-Sternchen.** Das Sternchen steht bewusst NICHT im Labeltext,
 * sondern als eigenes `aria-hidden`-Zeichen daneben, während `required` am Input
 * hängt. Ein Screenreader sagt den Pflichtstatus ohnehin an; stünde der Stern im
 * Label, käme „Stern" als zusätzliches Wort davor. Was er bedeutet, steht einmal
 * über dem Formular statt an jedem Feld.
 *
 * **Die Legende aus den Daten wird nicht angezeigt.** `FORM_CONTENT.legend`
 * lautet „Contact Us" — englischer Baukasten-Default auf einer deutschen Seite,
 * in `kontakt.ts` als `// sic:` belegt. Sichtbar ist stattdessen
 * `FORM_CONTENT.title`, und dasselbe Wort trägt das `<fieldset>` als `sr-only`
 * `<legend>`: die Gruppe braucht einen zugänglichen Namen, aber keinen zweiten
 * sichtbaren Titel neben der Überschrift, die schon darüber steht.
 *
 * Geprüft wird nur auf „ausgefüllt", nicht auf ein E-Mail-Muster: der
 * Route-Handler validiert die Adresse ohnehin serverseitig, und eine zweite
 * Meldungssorte im Formular wäre eine weitere Zeichenkette, die es im Original
 * nicht gibt.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { Button } from "@/components/ui/button";
import type { FormContent, FormField } from "@/data/kanzlei/kontakt";
import { apiFetch } from "@/lib/api-client";
import { ELEMENT_MOTION } from "@/lib/motion/text-presets";

export interface KontaktFormularProps {
  content: FormContent;
}

/**
 * NEU — zwei Zeichenketten, die das Original nicht hat: der Baukasten zeigte
 * keine Fehlermeldung am Feld und erklärte das Sternchen nirgends.
 *
 * Sie stehen hier und nicht in `kontakt.ts`, weil die Inhaltsdateien der
 * Kanzlei-Website gerade nicht angefasst werden (HAUSREGELN-KANZLEI §3). Beim
 * nächsten Aufräumen gehören sie dorthin, zu `successMessage` und
 * `errorMessage`, mit denen sie eine Gruppe bilden.
 */
const REQUIRED_LEGEND = "Mit * markierte Felder sind Pflichtfelder.";
const REQUIRED_HINT = "Bitte füllen Sie dieses Feld aus.";

const LABEL = "text-sm leading-body font-medium text-accent uppercase";
/** §2c der Kanzlei-Regeln: grössere Grundschrift, auch in den Eingabefeldern. */
const FIELD =
  "min-h-11 w-full rounded-panel border border-border-subtle bg-background px-4 py-3 text-[1.0625rem] leading-body font-light transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-accent";
const MESSAGE = "text-sm leading-body font-medium text-accent";

/**
 * Autofill- und Tastaturhinweise je Feld, nicht je Feldtyp: Vor- und Nachname
 * sind beide `type="text"`, brauchen aber getrennte `autoComplete`-Werte, sonst
 * bietet der Browser für beide denselben gespeicherten Wert an.
 */
const HINTS: Record<
  string,
  { autoComplete: string; inputMode: "text" | "email" | "tel" }
> = {
  vorname: { autoComplete: "given-name", inputMode: "text" },
  nachname: { autoComplete: "family-name", inputMode: "text" },
  email: { autoComplete: "email", inputMode: "email" },
  telefon: { autoComplete: "tel", inputMode: "tel" },
  nachricht: { autoComplete: "off", inputMode: "text" },
};

const hintsFor = (field: FormField) =>
  HINTS[field.name] ?? { autoComplete: "off", inputMode: "text" as const };

export const KontaktFormular = ({ content }: KontaktFormularProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  /** Nur ein blockiertes Absenden setzt das — Tippen zieht den Fokus nie zurück. */
  const blocked = useRef(false);
  const pending = useRef(false);

  useEffect(() => {
    if (!blocked.current) return;
    blocked.current = false;
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [errors]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const write = (name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    // Die Meldung verschwindet beim Tippen, nicht erst beim nächsten Absenden:
    // sie hat ihren Zweck erfüllt, sobald das Feld gefüllt wird.
    setErrors((previous) =>
      previous[name] ? { ...previous, [name]: "" } : previous,
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;

    const missing: Record<string, string> = {};
    for (const field of content.fields) {
      if (field.required && !(values[field.name] ?? "").trim()) {
        missing[field.name] = REQUIRED_HINT;
      }
    }
    if (Object.keys(missing).length > 0) {
      blocked.current = true;
      setErrors(missing);
      return;
    }

    pending.current = true;
    setFailed(false);
    try {
      await apiFetch("/api/kontakt", {
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
      <Spring {...ELEMENT_MOTION} tag="div" className="flex flex-col gap-4">
        {/* `tabIndex={-1}` allein dafür, dass die Bestätigung den Fokus nehmen
            kann — das Formular, das hier stand, gibt es nicht mehr. */}
        <p
          ref={successRef}
          tabIndex={-1}
          className="max-w-[38rem] text-[1.25rem] leading-display font-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:text-[1.5rem]"
        >
          {content.successMessage}
        </p>
      </Spring>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      className="flex flex-col gap-6"
    >
      <fieldset className="flex flex-col gap-5">
        {/* Zugänglicher Name der Feldgruppe, unsichtbar: die Überschrift mit
            demselben Wort steht schon darüber. Die Legende der Daten
            („Contact Us") bleibt bewusst ungenutzt. */}
        <legend className="sr-only">{content.title}</legend>

        <p className="text-sm leading-body font-light text-foreground-muted">
          {REQUIRED_LEGEND}
        </p>

        {content.fields.map((field) => {
          const errorId = `${field.name}-fehler`;
          const error = errors[field.name];
          const hints = hintsFor(field);

          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className={LABEL}>
                {field.label}
                {/* Das Sternchen ist Markierung, kein Text: `required` am Input
                    sagt den Pflichtstatus an, der Stern wäre ein zweites Mal
                    dasselbe. */}
                {field.required && <span aria-hidden="true"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => write(field.name, event.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  {...hints}
                  className={`${FIELD} resize-y`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => write(field.name, event.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  {...hints}
                  className={FIELD}
                />
              )}
              {error && (
                <p id={errorId} className={MESSAGE}>
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </fieldset>

      {/* `role="alert"`, weil der Fehlschlag nach dem Absenden auftritt: der
          Fokus steht dann auf der Schaltfläche und wandert nicht von selbst
          hierher. */}
      {failed && (
        <p role="alert" className={MESSAGE}>
          {content.errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full lg:w-fit">
        {content.submitLabel}
      </Button>
    </form>
  );
};
