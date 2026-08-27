import type { Metadata } from "next";

import { Startseite } from "@/views/kanzlei/startseite";

export const metadata: Metadata = {
  title: "Steuerberater in Pößneck | Frank Kutscher Steuerberatungsgesellschaft",
  description:
    "Die Steuerkanzlei Frank Kutscher in Pößneck betreut Unternehmen und private Mandanten in allen steuerlichen Angelegenheiten — persönlich, individuell, professionell und zuverlässig.",
  alternates: { canonical: "/" },
};

export default function StartseitePage() {
  return <Startseite />;
}
