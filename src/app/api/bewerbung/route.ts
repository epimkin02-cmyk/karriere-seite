import { z } from "zod";

import { handle } from "@/lib/api";
import { formatFields, sendMail } from "@/lib/mail";

/**
 * `POST /api/bewerbung` — the Schnellbewerbung's submission endpoint.
 *
 * Validiert und stellt zu. Der Versand läuft über denselben Weg wie das
 * Kontaktformular (`src/lib/mail.ts`), damit es nur eine Stelle gibt, an der
 * Absender, Empfänger und Schlüssel konfiguriert werden.
 *
 * Request schema — kept in the route since it isn't shared. Lift it to a shared
 * module only once a second route needs it.
 */
const bewerbungSchema = z.object({
  // Steps 1 and 2 are radio groups: free strings on the wire, but the form only
  // ever sends one of the offered options, and a bounded length keeps a forged
  // request from turning the later mail body into a payload.
  position: z.string().min(1).max(120),
  start: z.string().min(1).max(120),
  qualification: z.string().min(1).max(120),
  worktime: z.string().min(1).max(120),
  // Step 3. Phone and message are optional by design — every extra mandatory
  // field costs applications.
  name: z.string().min(1).max(100),
  email: z.email(),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
});

export const POST = handle(async (req) => {
  const input = bewerbungSchema.parse(await req.json());

  await sendMail({
    subject: `Schnellbewerbung von ${input.name}`,
    body: [
      formatFields([
        ["Stelle", input.position],
        ["Möglicher Start", input.start],
        ["Qualifikation", input.qualification],
        ["Wunsch-Arbeitszeit", input.worktime],
      ]),
      "",
      formatFields([
        ["Name", input.name],
        ["E-Mail", input.email],
        ["Telefon", input.phone],
      ]),
      ...(input.message ? ["", "Nachricht:", input.message] : []),
      "",
      "— Gesendet über die Schnellbewerbung auf kutscher-stb.de/karriere",
    ].join("\n"),
    replyTo: input.email,
  });

  // Kein Logging der Eingaben: das sind Name, Mail, Telefon und die berufliche
  // Situation einer bewerbenden Person. Route-Handler-Ausgaben landen in den
  // Vercel-Logs — ein Ort ohne Löschkonzept und mit weit grösserem
  // Zugriffskreis als das Postfach, für das die Bewerbung gedacht war.
  return { received: true };
});
