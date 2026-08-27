import type { Metadata } from "next";

import { FuerUnternehmen } from "@/views/kanzlei/fuer-unternehmen";

export const metadata: Metadata = {
  title: "Steuerberater für Unternehmen in Pößneck | Kutscher",
  description:
    "Finanz- und Lohnbuchführung, Jahresabschlüsse, betriebswirtschaftliche Beratung, Existenzgründung, Generationsnachfolge und Vertretung vor Finanzbehörden — die Steuerkanzlei Kutscher betreut Unternehmen in Pößneck und Umgebung.",
  alternates: { canonical: "/fuer-unternehmen" },
};

export default function FuerUnternehmenPage() {
  return <FuerUnternehmen />;
}
