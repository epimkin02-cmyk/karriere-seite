import type { Metadata } from "next";

import { BARRIEREFREIHEITSERKLAERUNG } from "@/data/kanzlei/recht";
import { Rechtstext } from "@/views/kanzlei/rechtstext";

export const metadata: Metadata = {
  title: "Barrierefreiheitserklärung",
  alternates: { canonical: "/barrierefreiheitserklaerung" },
  // Pflichtangaben gehören in den Index, taugen aber als Suchergebnis nichts.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <Rechtstext document={BARRIEREFREIHEITSERKLAERUNG} />;
}
