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
  /**
   * Das Team vor dem Haus — Hintergrund des Heros.
   *
   * `alt` ist hier NICHT leer, obwohl es ein Hintergrundbild ist: es zeigt
   * benannte Menschen an der prominentesten Stelle der Seite, und wer die Seite
   * vorgelesen bekommt, soll wissen, dass da nicht Dekoration steht, sondern
   * die Kanzlei selbst.
   */
  hero: {
    src: "/assets/kutscher/hero.webp",
    alt: "Das Team der Steuerkanzlei Kutscher vor dem Kanzleigebäude",
  },
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
   * Beide Porträts sind bestätigt.
   *
   * Bei Manuela Köber war die erste Zuordnung falsch: geliefert wurden zwei
   * Bilder ohne Namen, und die Frau auf `_DSC6668` ist eine andere Kollegin.
   * Der Kunde hat das Bild nachgereicht, das hier steht. Genau dafür stand der
   * Vorbehalt an dieser Stelle — ein Gesicht unter einem Namen wird nicht
   * geraten.
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

// Das Foto der Fusszeile (`team-duo.webp`) steht bewusst NICHT hier, sondern in
// [[site-footer]]: diese Liste sind die Bilder der Landingpage, die Fusszeile
// dagegen ist Seitengerüst und steht auch unter den Rechtstexten. Ein
// `components/`-Modul, das aus `views/` importiert, wäre ausserdem die falsche
// Richtung.
