// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Hero der Landingpage — das Band `#start` mit dem einzigen `<h1>`.
 *
 * ## Statt der 3D-Szene steht hier das Team
 *
 * Bis zum 01.09. lag in der rechten Hälfte eine prozedurale WebGL-Grafik. Sie
 * war handwerklich das Aufwendigste an der Seite und inhaltlich das Leerste:
 * eine abstrakte Doppelhelix aus dem Medizin-Template, an der Stelle, an der
 * jemand entscheidet, ob das seine Kanzlei ist. Jetzt steht dort das Foto des
 * Teams vor dem eigenen Haus.
 *
 * Die Szene ist damit nur noch im Kontaktband, und zwar dort nur auf dem
 * Rechner (`desktopOnly`). Auf dem Telefon lädt `three` gar nicht mehr.
 *
 * ## Der Übergang von Weiss zum Bild
 *
 * Drei Ebenen: das Foto ganz unten, darüber eine Ebene, die Weiss und
 * Weichzeichner zugleich ausblendet, darüber der Text. Warum die Maske dabei
 * das Entscheidende ist, steht am Element selbst — kurz: ohne sie wäre das
 * ganze Foto verwaschen statt nur der Teil unter dem Text.
 *
 * Der Text ist unverändert; er steht auf deckendem Weiss und nicht auf einer
 * halbtransparenten Fläche, damit sein Kontrast nicht davon abhängt, was
 * gerade auf dem Foto zu sehen ist.
 *
 * ## Die Copy blendet per CSS ein, nicht per Feder
 *
 * Als einziges Band der Seite. Der Grund steht ausführlich in [[Eintritt]]:
 * Federn starten erst nach der Hydration, und seit der Ladevorhang draussen
 * ist, sähe man bis dahin ein leeres Band — gemessen 694 ms. Alles, was erst
 * beim Scrollen ins Bild kommt, bleibt bei `TextEngine`; dort ist diese
 * Verzögerung unsichtbar. Der Effekt ist derselbe, nur die Uhr ist eine andere.
 */

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/data/kanzlei/startseite";

import { Eintritt } from "./eintritt";
import { FOTOS } from "./fotos";
import { ANCHOR_OFFSET, BODY, EYEBROW } from "./typografie";

/**
 * Die Inhaltsdatei kennt noch das Ziel `/kontakt` aus der Zeit der fünf Seiten,
 * und an ihr wird nichts geändert (HAUSREGELN-KANZLEI §3). Der Sprung soll aber
 * innerhalb der Seite passieren und nicht über die Weiterleitung der Middleware
 * laufen — ein Seitenwechsel samt neuem Ladevorgang für ein Ziel drei Bänder
 * weiter unten wäre der schlechtere Weg. Deshalb wird die Route hier im Markup
 * auf ihren Anker abgebildet; unbekannte Ziele bleiben unangetastet.
 */
const ANCHOR_BY_ROUTE: Readonly<Record<string, string>> = {
  "/kontakt": "#kontakt",
};

const toAnchor = (href: string) => ANCHOR_BY_ROUTE[href] ?? href;

export const Hero = () => (
  <section
    id="start"
    aria-labelledby="start-heading"
    className={`relative isolate overflow-hidden rounded-b-section bg-background px-5 pt-12 pb-10 md:px-10 lg:min-h-[36rem] lg:py-28 ${ANCHOR_OFFSET}`}
  >
    <div className="relative mx-auto w-full max-w-[85rem]">
      <div className="flex flex-col gap-5 lg:max-w-[29rem] lg:gap-6">
        <Eintritt className={EYEBROW}>{HERO_CONTENT.eyebrow}</Eintritt>
        {/* Der einzige `<h1>` des Dokuments — und seit der Zusammenlegung der
            einzige der ganzen Website ausser den Rechtstexten. `hyphens-auto`
            wegen „Steuerberater": deutsche Komposita brechen sonst aus der
            Spalte. */}
        <Eintritt
          id="start-heading"
          tag="h1"
          variant="heading"
          delay={80}
          className="text-left text-[2.25rem] leading-display font-light hyphens-auto lg:text-[3.25rem]"
        >
          {HERO_CONTENT.title}
        </Eintritt>
        <Eintritt
          variant="body"
          delay={260}
          className={`max-w-[38rem] text-left ${BODY}`}
        >
          {HERO_CONTENT.lead}
        </Eintritt>
        {/* Der Button trägt keine eigene Wortstaffelung, deshalb steht die
            Klasse direkt auf dem Wrapper statt über die Komponente zu laufen. */}
        <div
          className="entry-item entry-body mt-3"
          style={{ "--entry-delay": "460ms" } as React.CSSProperties}
        >
          <Button href={toAnchor(HERO_CONTENT.action.href)} variant="primary">
            {HERO_CONTENT.action.label}
          </Button>
        </div>
      </div>
    </div>

    {/* Ein Bild, zwei Rollen — und das ist der Kern dieses Bandes.
     *
     * **Ab `lg`** liegt es absolut in der rechten Bandhälfte, ab 26 % Breite,
     * und läuft an seiner linken Kante ins Weiss aus, auf dem der Text steht.
     *
     * Warum bei 26 % und nicht `inset-0`: `object-position` kann nur
     * verschieben, wo das Bild überhaupt übersteht. Über die volle Bandbreite
     * ist ein 3:2-Foto in einem 2,4:1-Kasten oben und unten beschnitten und
     * seitlich gar nicht — die Gruppe sass damit unverrückbar in der Bildmitte,
     * also genau im Verlauf, und die Kolleginnen links waren verwaschene
     * Silhouetten. Der schmalere Kasten rückt sie aus dem Verlauf heraus.
     *
     * **Auf dem Telefon** liegt es als eigener Streifen unter dem Text, und das
     * ist keine Bequemlichkeit, sondern Rechnerei. Das Band ist dort rund
     * 840 px hoch und 390 px breit; ein 3:2-Foto, das diese Fläche deckend
     * füllt, wird an den Seiten beschnitten und **oben und unten gar nicht** —
     * `object-position` kann senkrecht also nichts verschieben. Der Text steht
     * oben, die Köpfe der Gruppe liegen genau darunter, und übrig blieb ein
     * Streifen Beine. Als eigener Block mit fester Höhe bekommt das Foto seinen
     * eigenen Ausschnitt zurück: `object-top` zeigt die Gesichter.
     *
     * Ein einziges `<Image>` für beide Fälle, kein zweites für Mobil — sonst
     * lädt der Browser das Foto zweimal.
     */}
    <div className="relative -mx-5 mt-10 h-[15rem] overflow-hidden md:-mx-10 md:h-[18rem] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[26%] lg:-z-10 lg:mx-0 lg:mt-0 lg:h-auto">
      <Image
        src={FOTOS.hero.src}
        alt={FOTOS.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_22%] lg:object-center"
      />

      {/* Der Übergang von Weiss zum Foto.
       *
       * Zwei Dinge in einer Ebene, und beide sind nötig:
       *
       * `backdrop-blur` weicht das Foto dort auf, wo Text darüber liegt. Ohne
       * die Unschärfe konkurrieren Gesichter und Fensterrahmen mit der Schrift.
       *
       * `mask-image` blendet **die Unschärfe selbst** aus. Das ist der Kniff:
       * ein blosser Farbverlauf würde nur das Weiss ausblenden, das Foto bliebe
       * überall gleich verwaschen. Mit der Maske endet der Weichzeichner dort,
       * wo das Weiss endet — das Foto ist zur Bildmitte hin gestochen scharf
       * und wird nur zum Text hin weich.
       *
       * Die Richtung folgt dem Layout: auf dem Telefon fällt der Verlauf von
       * oben nach unten in den Streifen hinein, ab `lg` von links nach rechts.
       *
       * Der Wert 22 % ist nicht gegriffen, sondern ausgemessen: die Textspalte
       * endet bei 504 px, der Bildkasten beginnt bei 374 px, macht 130 px oder
       * eben rund 22 % seiner Breite. Bis dorthin deckt reines Weiss — und zwar
       * deckend und nicht halbtransparent, damit der Kontrast des Textes nicht
       * davon abhängt, was gerade auf dem Foto zu sehen ist. Nachgemessen steht
       * hinter jedem Textpixel #ffffff. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-70% backdrop-blur-md [mask-image:linear-gradient(to_bottom,#000_0%,transparent_70%)] lg:bg-gradient-to-r lg:from-white lg:from-22% lg:to-58% lg:[mask-image:linear-gradient(to_right,#000_22%,transparent_58%)]"
      />
    </div>
  </section>
);
