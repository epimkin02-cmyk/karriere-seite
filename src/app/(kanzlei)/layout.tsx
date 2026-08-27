import { KanzleiFooter } from "@/components/kanzlei/site-footer";
import { KanzleiHeader } from "@/components/kanzlei/site-header";

/**
 * Seitengerüst der Kanzlei-Website.
 *
 * Die Klammern machen `(kanzlei)` zu einer Routen-Gruppe: sie taucht in keiner
 * URL auf, hält aber Kopf- und Fusszeile für alle Seiten der Website zusammen.
 * `/karriere` liegt bewusst ausserhalb — die Funnel-Landingpage bringt ihr
 * eigenes Chrome mit und soll nicht wie die Website aussehen.
 *
 * `<main id="inhalt">` ist das Ziel des Sprunglinks in der Kopfzeile. Es steht
 * hier und nicht in den einzelnen Seiten, damit es genau ein `<main>` je
 * Dokument gibt — mehrere wären ein Fehler, keins bricht den Sprunglink.
 */
export default function KanzleiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <KanzleiHeader />
      <main id="inhalt">{children}</main>
      <KanzleiFooter />
    </>
  );
}
