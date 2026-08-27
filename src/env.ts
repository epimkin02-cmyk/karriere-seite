/**
 * Validated environment variables.
 *
 * `publicEnv` holds `NEXT_PUBLIC_*` values — inlined into the client bundle,
 * safe in the browser. `getServerEnv()` holds server-only values (secrets) —
 * never read it from client code; on the client those values are `undefined`.
 *
 * A missing/invalid variable fails fast with a clear zod error rather than
 * surfacing as a confusing runtime bug later.
 */

import { z } from "zod";

/**
 * Treat an empty env var as unset.
 *
 * `cp .env.example .env` leaves declared-but-blank keys (`CONTACT_ENDPOINT=`),
 * which reach us as `""` — and `""` is not `undefined`, so an `.optional()`
 * schema would reject it as "Invalid URL". Without this, the documented setup
 * flow would break every optional variable the moment someone copied the
 * example file.
 */
const optionalUrl = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.url().optional());

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl(),
});

const serverSchema = z.object({
  /** Optional upstream the contact endpoint forwards leads to (CRM / webhook). */
  CONTACT_ENDPOINT: optionalUrl(),

  /**
   * Resend-API-Key. **Unpräfixt** — ein `NEXT_PUBLIC_`-Name würde den Wert in
   * das Client-Bundle inlinen und damit an jeden Besucher ausliefern.
   *
   * Optional, damit sich das Projekt ohne Mailkonfiguration bauen und lokal
   * starten lässt. Fehlt der Key, antworten die Formular-Endpunkte mit 503
   * „nicht konfiguriert" statt beim Build zu scheitern — das ist die
   * ehrlichere Fehlermeldung als ein grüner Build, der im Betrieb schweigt.
   */
  RESEND_API_KEY: z.string().min(1).optional(),

  /**
   * Absenderadresse. Ihre Domain muss bei Resend verifiziert sein, sonst
   * verweigert der Versand. Kein Postfach dahinter nötig — Antworten laufen
   * über `Reply-To` an die absendende Person.
   */
  MAIL_FROM: z
    .string()
    .min(1)
    .default("Kutscher Website <website@kutscher-stb.de>"),

  /** Postfach der Kanzlei, in dem die Formularmeldungen ankommen. */
  MAIL_TO: z.string().min(1).default("kanzlei@kutscher-stb.de"),
});

/** Public env — safe to read anywhere (server or client). */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

let cachedServerEnv: z.infer<typeof serverSchema> | undefined;

/**
 * Server-only env. Call from route handlers / server code only — parsed
 * lazily so the client bundle never evaluates it.
 */
export function getServerEnv() {
  cachedServerEnv ??= serverSchema.parse({
    CONTACT_ENDPOINT: process.env.CONTACT_ENDPOINT,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_TO: process.env.MAIL_TO,
  });
  return cachedServerEnv;
}
