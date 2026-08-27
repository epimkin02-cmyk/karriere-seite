import type { Metadata } from "next";

import { Kontakt } from "@/views/kanzlei/kontakt";

export const metadata: Metadata = {
  title: "Kontakt zur Steuerkanzlei Kutscher in Pößneck | Kutscher",
  description:
    "Anschrift, Telefonnummer, E-Mail und Öffnungszeiten der Frank Kutscher Steuerberatungsgesellschaft mbH in Pößneck — mit Kontaktformular und Anfahrt.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return <Kontakt />;
}
