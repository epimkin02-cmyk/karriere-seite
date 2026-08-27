import type { Metadata } from "next";

import { DATENSCHUTZERKLAERUNG } from "@/data/kanzlei/recht";
import { Rechtstext } from "@/views/kanzlei/rechtstext";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutzerklaerung" },
  // Pflichtangaben gehören in den Index, taugen aber als Suchergebnis nichts.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <Rechtstext document={DATENSCHUTZERKLAERUNG} />;
}
