import { z } from "zod";

import { handle } from "@/lib/api";

/**
 * `POST /api/bewerbung` — the Schnellbewerbung's submission endpoint.
 *
 * Right now it only validates and acknowledges: the client decided to wire the
 * actual delivery later, so the contract (the `{ data }` / `{ error }` envelope
 * and this schema) is fixed first and the transport is dropped in below without
 * touching the form.
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

  // TODO(zustellung): send `input` as an application mail to
  // `siteConfig.legal.email` (`src/lib/site.ts`) — subject and body in German,
  // reply-to set to the applicant's address so a reply reaches them directly.
  // The provider (Resend / Postmark / SMTP relay) is called inline here, the
  // way the starter's contact route called its upstream: a route handler is
  // never bundled to the browser, so the secret is safe in this file.
  //
  // The provider's API key is an **unprefixed** server variable
  // (e.g. `MAIL_API_KEY`), declared in `serverSchema` in `src/env.ts` and read
  // through `getServerEnv()`. Never `NEXT_PUBLIC_*` — that prefix inlines the
  // value into the client bundle and publishes the key to every visitor.
  //
  // Until then the handler acknowledges without persisting anything, and that
  // is deliberate: `input` is an applicant's name, mail, phone and job
  // situation. Do **not** `console.log` it — route-handler output lands in the
  // Vercel logs, which is personal data in a place that has no retention rule,
  // no deletion path and a far wider audience than the mailbox it was meant
  // for. Whatever gets wired in here must send it and keep nothing.
  //
  // `input` therefore sits unused on purpose — it is the payload the delivery
  // step takes, not a leftover.

  return { received: true };
});
