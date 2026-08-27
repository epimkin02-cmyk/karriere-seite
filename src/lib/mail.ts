import "server-only";

import { Resend } from "resend";

import { getServerEnv } from "@/env";
import { ApiError } from "@/lib/api";

/**
 * Mailversand über Resend — der gemeinsame Zustellweg für beide Formulare.
 *
 * `import "server-only"` steht bewusst in der ersten Zeile: es lässt den Build
 * fehlschlagen, sobald diese Datei versehentlich aus einer Client-Komponente
 * importiert wird. Ohne diese Zeile wäre der API-Key genau einen falschen
 * Import davon entfernt, im Browser-Bundle zu landen — und das würde niemandem
 * auffallen, weil die Seite trotzdem funktioniert.
 *
 * **Kein Logging der Nutzdaten.** Weder hier noch in den Route-Handlern. Die
 * Formulare tragen Namen, Adressen, Telefonnummern und im Fall der Bewerbung
 * die berufliche Situation einer Person. Route-Handler-Ausgaben landen in den
 * Vercel-Logs: ein Ort ohne Löschkonzept, ohne Aufbewahrungsfrist und mit
 * deutlich grösserem Zugriffskreis als das Postfach, für das die Nachricht
 * gedacht war. Geloggt wird deshalb nur, DASS ein Versand fehlschlug, nie WAS
 * versendet werden sollte.
 */

/** Lazy, damit der Client-Bundle-Build nie einen Key anfassen muss. */
let client: Resend | undefined;

const getClient = (): Resend => {
  const { RESEND_API_KEY } = getServerEnv();
  if (!RESEND_API_KEY) {
    // 503, nicht 500: der Dienst ist nicht kaputt, er ist nicht konfiguriert.
    // Die Unterscheidung ist beim Deployment die halbe Fehlersuche.
    throw new ApiError(
      503,
      "mail_not_configured",
      "Mail delivery is not configured.",
    );
  }
  client ??= new Resend(RESEND_API_KEY);
  return client;
};

export interface MailInput {
  subject: string;
  /** Reiner Text. Kein HTML — siehe `sendMail`. */
  body: string;
  /**
   * Adresse der absendenden Person. Landet als `Reply-To`, damit eine Antwort
   * aus dem Postfach heraus direkt bei ihr ankommt, statt an den technischen
   * Absender zu gehen.
   */
  replyTo?: string;
}

/**
 * Verschickt eine Formularmeldung an die Kanzlei.
 *
 * **Nur Text, kein HTML.** Der Inhalt besteht vollständig aus Eingaben einer
 * fremden Person. Als HTML-Mail müsste jedes Feld escaped werden, und ein
 * vergessenes Feld wäre eine Injection-Lücke im Postfach der Kanzlei. Eine
 * Textmail hat dieses Problem gar nicht erst — und ein Kontaktformular gewinnt
 * durch Formatierung ohnehin nichts.
 */
export const sendMail = async ({
  subject,
  body,
  replyTo,
}: MailInput): Promise<void> => {
  const { MAIL_FROM, MAIL_TO } = getServerEnv();

  const { error } = await getClient().emails.send({
    // Muss eine bei Resend verifizierte Domain sein, sonst lehnt der Versand ab.
    from: MAIL_FROM,
    to: MAIL_TO,
    subject,
    text: body,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    // Nur der Fehler des Anbieters, nie der Mailinhalt.
    console.error("[mail] Versand fehlgeschlagen:", error.name, error.message);
    throw new ApiError(502, "mail_failed", "Mail delivery failed.");
  }
};

/**
 * Formatiert Feld-Wert-Paare als Textblock.
 *
 * Leere Werte fallen raus, damit im Postfach keine Zeilen wie „Telefon: —"
 * stehen, die niemand braucht.
 */
export const formatFields = (
  fields: readonly (readonly [string, string | undefined])[],
): string =>
  fields
    .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
