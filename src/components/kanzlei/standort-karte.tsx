"use client";

// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Zwei-Klick-Karte — das Datenschutz-Blatt hinter jeder Anfahrt.
 *
 * Liegt unter `components/`, nicht in den Sektionen einer Seite: die
 * Karriereseite („Standort") und die Kontaktseite der Kanzlei („Anfahrt")
 * zeigen dieselbe Karte, und sie nimmt alle Texte als Props — sie weiß von
 * keiner der beiden Seiten etwas.
 *
 * Das Original bettet ein Google-Maps-iframe bedingungslos ein und übergibt
 * damit die IP-Adresse jedes Besuchers an Google, bevor irgendwer zugestimmt
 * hat. Hier wird das iframe **gar nicht gerendert**, bis jemand danach fragt:
 * nicht versteckt, nicht mit leerem `src` geparkt — nicht im DOM, also verlässt
 * auch kein Request den Browser. Das ist der ganze Zweck der Komponente und der
 * Grund, warum dieses eine Blatt überhaupt State hat (harte Regel #7).
 *
 * **Warum OpenStreetMap statt Google.** Googles klassisches `output=embed`
 * hat nie zu einer offiziellen API gehört und wird zunehmend abgewiesen — die
 * Karte blieb schlicht leer. Der offizielle Weg wäre die Maps Embed API mit
 * API-Key, Abrechnungskonto und Kontingent. OpenStreetMap braucht davon nichts,
 * lädt zuverlässig und ist datenschutzrechtlich der deutlich kleinere Eingriff.
 *
 * Wer trotzdem zu Google will, findet ihn daneben: „Route planen" öffnet Google
 * Maps in einem neuen Tab. Das ist eine bewusste Handlung des Besuchers und
 * damit einwilligungsfrei — und der Link wird aus der Postanschrift gebaut,
 * nicht aus Koordinaten, ist also unabhängig davon korrekt, wo der Pin sitzt.
 *
 * ## Die Scrollsperre
 *
 * Eine geladene Karte ist eine Falle im Scrollweg. Das iframe bringt seine
 * eigene Kartenbibliothek mit, und die verschluckt jedes Rad- und Wischereignis,
 * das über ihr ankommt: statt weiterzulesen, zoomt man. Auf der Landingpage ist
 * die Karte 44rem hoch und liegt zwischen Kontaktband und Fusszeile — man kommt
 * an ihr nicht vorbei, sondern bleibt in ihr hängen.
 *
 * Deshalb liegt über dem iframe eine Schaltfläche, solange niemand danach
 * gefragt hat. Sie deckt die Fläche vollständig ab, das iframe bekommt zusätzlich
 * `pointer-events-none` — Rad und Finger treffen damit die Seite und nicht die
 * Karte, und man scrollt an ihr vorbei wie an einem Bild. Ein Klick oder Tipp
 * schaltet sie frei.
 *
 * Und sie schaltet sich von selbst wieder scharf: sobald der Zeiger die Karte
 * verlässt (Rechner) oder die Seite wieder scrollt (Telefon). Das ist der Teil,
 * der auf dem Telefon zählt — dort gibt es kein `mouseleave`, und ohne diesen
 * zweiten Weg wäre die Karte nach dem ersten Tipp für den Rest des Besuchs
 * wieder eine Falle. Wer sie schliesslich wirklich erkunden will, ist mit
 * „Route planen" ohnehin besser bedient.
 */

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export interface StandortKarteProps {
  /** Zugänglicher Name des iframes — abgeleitet vom Sektions-Heading. */
  title: string;
  coords: { lat: number; lon: number };
  /** Vollständige Postanschrift in einer Zeile, für den Routen-Link. */
  address: string;
  consentTitle: string;
  consentBody: string;
  consentAction: string;
  routeLabel: string;
  /**
   * Karte sofort laden, ohne die Einwilligungsschwelle.
   *
   * ⚠️ Das ist eine **rechtliche** Entscheidung, keine gestalterische. Mit
   * `autoLoad` baut die Seite beim Aufruf eine Verbindung zu OpenStreetMap auf
   * und überträgt dabei die IP-Adresse des Besuchers, ohne dass er zugestimmt
   * hat. Damit ist die Aussage „diese Seite macht keine Drittanfragen", auf der
   * das Fehlen eines Cookie-Banners beruht, nicht mehr vollständig richtig —
   * die Datenschutzerklärung muss die Karte dann benennen.
   *
   * Vorgabe ist deshalb `false`. Auf der Kanzlei-Landingpage steht es auf
   * `true`, weil der Kunde die Karte ausdrücklich sichtbar haben wollte;
   * zurückgedreht ist es ein Wort.
   */
  autoLoad?: boolean;
  /**
   * Grosse Darstellung — die Karte trägt den Abschnitt, statt darin zu liegen.
   */
  gross?: boolean;
}

/**
 * Halbe Kantenlänge des Kartenausschnitts in Grad.
 *
 * 0,004° Länge sind auf dieser Breite rund 280 m, 0,002° Breite rund 220 m —
 * nah genug, dass die Straße lesbar ist, weit genug, dass die Umgebung zur
 * Orientierung taugt. Beide Achsen getrennt, weil ein Längengrad in Thüringen
 * nur etwa 63 % eines Breitengrads misst; ein einziger Wert für beide ergäbe
 * einen sichtbar verzerrten Ausschnitt.
 */
const SPAN_LON = 0.004;
const SPAN_LAT = 0.002;

/**
 * Eine feste Höhe für beide Zustände — nicht `min-h`.
 *
 * `min-h` ließe den Einwilligungstext die Box auf einem schmalen Schirm wachsen,
 * und das iframe schnappte beim Klick auf den Boden zurück. Genau diesen Sprung
 * unter dem Auge des Lesers soll die feste Höhe verhindern.
 *
 * Zwei Grössen, weil die Karte an zwei sehr verschiedenen Stellen steht: auf der
 * Karriereseite ist sie eine Randnotiz neben den Standortvorteilen, auf der
 * Kanzlei-Landingpage ist der Abschnitt „Ihr Weg zu unserer Steuerkanzlei" für
 * nichts anderes da. Dort füllt sie ihn deshalb aus, statt als Streifen darin
 * zu liegen — 44rem sind auf einem üblichen Notebook rund drei Viertel der
 * Fensterhöhe.
 */
const FRAME_BASE = "relative w-full overflow-hidden rounded-card";
const FRAME_HOEHE = {
  normal: "h-[22rem] lg:h-[30rem]",
  gross: "h-[26rem] md:h-[34rem] lg:h-[44rem]",
} as const;

export const StandortKarte = ({
  title,
  coords,
  address,
  consentTitle,
  consentBody,
  consentAction,
  routeLabel,
  autoLoad = false,
  gross = false,
}: StandortKarteProps) => {
  const [loaded, setLoaded] = useState(autoLoad);
  const [bedienbar, setBedienbar] = useState(false);
  const frame = `${FRAME_BASE} ${gross ? FRAME_HOEHE.gross : FRAME_HOEHE.normal}`;

  /**
   * Der Rückweg auf dem Telefon.
   *
   * `mouseleave` sperrt die Karte auf dem Rechner wieder; auf einem Touchgerät
   * gibt es das Ereignis nicht. Dort ist das Scrollen der Seite selbst das
   * Signal: es passiert nur, wenn der Finger gerade **nicht** auf der Karte
   * liegt — beim Ziehen in der Karte scrollt die Seite ja nicht. Wer also
   * weiterliest, bekommt die Sperre zurück, ohne etwas dafür zu tun.
   *
   * Die 80 px Schwelle sind der Grund, warum hier eine Startposition gemerkt
   * wird und nicht einfach auf das erste Ereignis reagiert: nach dem Tipp läuft
   * auf einem Telefon oft noch der Nachlauf der vorherigen Wischbewegung, und
   * ein einzelnes Restpixel würde die Karte im selben Moment wieder sperren, in
   * dem sie aufgegangen ist. Erst eine Bewegung, die als Weiterlesen zu erkennen
   * ist, schliesst sie.
   *
   * Der Zuhörer hängt nur an, solange die Karte offen ist, und ist `passive` —
   * ein Scroll-Zuhörer ohne diese Zusage zwingt den Browser, vor jedem
   * Bildaufbau auf JavaScript zu warten.
   */
  useEffect(() => {
    if (!bedienbar) return;

    const start = window.scrollY;
    const sperren = () => {
      if (Math.abs(window.scrollY - start) > 80) setBedienbar(false);
    };

    window.addEventListener("scroll", sperren, { passive: true });
    return () => window.removeEventListener("scroll", sperren);
  }, [bedienbar]);

  const { lat, lon } = coords;
  const bbox = [
    lon - SPAN_LON,
    lat - SPAN_LAT,
    lon + SPAN_LON,
    lat + SPAN_LAT,
  ].join(",");
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
  // Adressbasiert, nicht koordinatenbasiert: die Postanschrift ist die
  // verlässlichere Angabe, und jedes Kartenprogramm löst sie korrekt auf.
  const routeHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="flex flex-col gap-4">
      {loaded ? (
        <div className={frame} onMouseLeave={() => setBedienbar(false)}>
          {/* `title` ist der zugängliche Name des iframes — ohne ihn kündigt ein
              Screenreader einen namenlosen Rahmen an.

              `pointer-events-none` im gesperrten Zustand ist der eigentliche
              Schalter: das iframe ist dann kein Ziel mehr für Rad, Finger und
              Zeiger, und beides — Scrollen und Klicken — landet bei der Seite.
              Die Schaltfläche darüber allein würde zwar auch decken, aber nur
              solange sie wirklich lückenlos deckt; zwei Wege sind hier billiger
              als ein Zweifel. */}
          <iframe
            src={embedSrc}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`h-full w-full border-0 ${bedienbar ? "" : "pointer-events-none"}`}
          />

          {!bedienbar && (
            /* Eine echte Schaltfläche, keine Attrappe: sie ist mit der Tastatur
               erreichbar, trägt einen Namen und sagt damit auch einer
               Vorlesefunktion, dass die Karte hier erst freigeschaltet werden
               muss. Der Hinweis sitzt unten mittig mit `pb-8` — darunter liegt
               die Herkunftszeile von OpenStreetMap, die frei bleiben soll. */
            <button
              type="button"
              onClick={() => setBedienbar(true)}
              className="absolute inset-0 flex cursor-pointer items-end justify-center pb-8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <span className="rounded-chip bg-background/90 px-4 py-2 text-sm leading-body font-medium backdrop-blur-glass">
                Karte aktivieren
              </span>
            </button>
          )}
        </div>
      ) : (
        <div
          className={`${frame} flex flex-col items-center justify-center gap-4 bg-surface-section-deep p-6 text-center`}
        >
          <h3 className="text-[1.5rem] leading-display font-light">
            {consentTitle}
          </h3>
          {/* Zurückgenommen und klein: der Hinweis erklärt den Tausch, er
              konkurriert nicht mit der Adressspalte um Aufmerksamkeit. */}
          <p className="max-w-[26rem] text-sm leading-body font-light text-foreground-muted">
            {consentBody}
          </p>
          <Button variant="primary" onClick={() => setLoaded(true)}>
            {consentAction}
          </Button>
        </div>
      )}

      {/* Immer sichtbar, auch vor der Einwilligung — wer nur die Anfahrt will,
          soll nicht erst eine Karte laden müssen, die er gar nicht braucht.
          `rel="noopener"` gegen den `window.opener`-Zugriff des neuen Tabs. */}
      <a
        href={routeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-fit items-center gap-2 text-base leading-body font-medium text-accent underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
      >
        {routeLabel}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
};
