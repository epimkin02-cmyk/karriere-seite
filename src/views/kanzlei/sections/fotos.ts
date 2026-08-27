/**
 * Die Fotos der Landingpage — Pfade und Bildbeschreibungen an einer Stelle.
 *
 * Seit dem 27.08. sind es **echte Aufnahmen der Kanzlei**, nicht mehr die
 * Unsplash-Platzhalter. Geliefert wurden sieben Bilder mit je rund 33
 * Megapixel; was hier steht, sind die daraus gerechneten Webfassungen. Die
 * Originale liegen im Google-Drive des Fotografen und sind bewusst **nicht** im
 * Repo: eine 7008 × 4672 grosse Datei unter `public/` ist öffentlich
 * herunterladbar und wandert bei jedem Deploy mit, ohne dass ein Browser sie je
 * anfordert.
 *
 * ## Warum `alt` hier steht und nicht in der Komponente
 *
 * Ein Alternativtext beschreibt **dieses** Bild, nicht die Stelle, an der es
 * steht. Er gehört deshalb zum Bild und nicht zum Abschnitt — sonst bleibt beim
 * Austausch eines Motivs die Beschreibung des alten stehen, und das ist der
 * Fehler, den niemand bemerkt, weil er nur mit Screenreader sichtbar wird.
 *
 * Drei der Bilder tragen absichtlich `alt: ""`. Das ist keine Nachlässigkeit,
 * sondern die richtige Auszeichnung für ein Bild, das die Stimmung eines
 * Abschnitts trägt und keine Information, die nicht schon im Text daneben
 * steht. Eine Vorlesefunktion überspringt es dann, statt eine Beschreibung
 * vorzulesen, die niemanden weiterbringt. Die Porträts und das Gruppenbild
 * dagegen zeigen benannte Menschen — die werden benannt.
 */

export interface Foto {
  src: string;
  alt: string;
}

export const FOTOS = {
  /** Empfangstresen, Tageslicht. Das erste Bild der Seite. */
  empfang: {
    src: "/assets/kutscher/empfang.webp",
    alt: "",
  },
  /** Zwei Mitarbeitende gemeinsam an einem Bildschirm. */
  beratung: {
    src: "/assets/kutscher/beratung.webp",
    alt: "",
  },
  /** Arbeitsplatz mit zwei Bildschirmen am Fenster. Hochformat. */
  buero: {
    src: "/assets/kutscher/buero.webp",
    alt: "",
  },
  /** Das Team vor dem Kanzleigebäude. Hochformat. */
  team: {
    src: "/assets/kutscher/team-gruppe.webp",
    alt: "Das Team der Steuerkanzlei Kutscher vor dem Kanzleigebäude",
  },
  /**
   * ⚠️ Zuordnung vom Kunden bestätigen lassen.
   *
   * Die beiden Porträts stammen aus derselben Serie und wurden ohne Namen
   * geliefert (`_DSC6764` und `_DSC6668`). Die Zuordnung hier folgt dem
   * einzigen Anhaltspunkt, den es gibt — Frank Kutscher ist der Mann, Manuela
   * Köber die Frau. Solange das nicht bestätigt ist, steht dieser Hinweis hier.
   */
  portraetKutscher: {
    src: "/assets/kutscher/portraet-kutscher.webp",
    alt: "Frank Kutscher, Steuerberater und Geschäftsführer",
  },
  portraetKoeber: {
    src: "/assets/kutscher/portraet-koeber.webp",
    alt: "Manuela Köber",
  },
} as const satisfies Record<string, Foto>;
