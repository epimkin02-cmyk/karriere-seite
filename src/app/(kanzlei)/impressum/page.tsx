import type { Metadata } from "next";

import { IMPRESSUM } from "@/data/kanzlei/recht";
import { Rechtstext } from "@/views/kanzlei/rechtstext";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
  // Pflichtangaben gehören in den Index, taugen aber als Suchergebnis nichts.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <Rechtstext document={IMPRESSUM} />;
}
