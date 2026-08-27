import type { Metadata } from "next";

import { FuerPrivate } from "@/views/kanzlei/fuer-private";

export const metadata: Metadata = {
  title: "Steuerberater für Private in Pößneck | Kutscher",
  description:
    "Einkommensteuererklärung, Feststellungs- und Umsatzsteuererklärungen, Schenkung und Erbschaft sowie steuerliche Beratung zur Existenzgründung — die Steuerkanzlei Kutscher kümmert sich um die Steuererklärung von Privatpersonen in Pößneck und Umgebung.",
  alternates: { canonical: "/fuer-private" },
};

export default function FuerPrivatePage() {
  return <FuerPrivate />;
}
