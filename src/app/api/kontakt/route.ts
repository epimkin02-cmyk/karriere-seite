import { z } from "zod";

import { handle } from "@/lib/api";
import { formatFields, sendMail } from "@/lib/mail";

/**
 * `POST /api/kontakt` — das Kontaktformular der Kanzlei-Website.
 *
 * Alle fünf Felder sind Pflicht, so wie im Original. Die Längenbegrenzungen
 * sind kein Formatanspruch an die Nutzerin, sondern eine Grenze gegen
 * gefälschte Anfragen: ohne sie kann ein Skript beliebig grosse Nachrichten
 * durch den Mailversand schieben.
 */
const kontaktSchema = z.object({
  vorname: z.string().trim().min(1).max(100),
  nachname: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  telefon: z.string().trim().min(1).max(40),
  nachricht: z.string().trim().min(1).max(5000),
});

export const POST = handle(async (req) => {
  const input = kontaktSchema.parse(await req.json());

  await sendMail({
    // Der Name steht im Betreff, damit die Kanzlei im Postfach sortieren kann,
    // ohne jede Mail zu öffnen.
    subject: `Kontaktanfrage von ${input.vorname} ${input.nachname}`,
    body: [
      formatFields([
        ["Vorname", input.vorname],
        ["Nachname", input.nachname],
        ["E-Mail", input.email],
        ["Telefon", input.telefon],
      ]),
      "",
      "Nachricht:",
      input.nachricht,
      "",
      "— Gesendet über das Kontaktformular auf kutscher-stb.de",
    ].join("\n"),
    // Antworten gehen direkt an die anfragende Person, nicht an den
    // technischen Absender.
    replyTo: input.email,
  });

  // Bewusst ohne jede Ausgabe der Eingaben — siehe `src/lib/mail.ts`.
  return { received: true };
});
