import type { Metadata } from "next";

import { UeberUns } from "@/views/kanzlei/ueber-uns";

export const metadata: Metadata = {
  title: "Über uns — erfahrener Steuerberater in Pößneck | Kutscher",
  description:
    "Zwölf Mitarbeiter, ein Steuerberater und seine Assistenz der Geschäftsführung: Die Steuerkanzlei Kutscher in Pößneck stellt sich vor und betreut Unternehmen, Privatpersonen und Vereine.",
  alternates: { canonical: "/ueber-uns" },
};

export default function UeberUnsPage() {
  return <UeberUns />;
}
