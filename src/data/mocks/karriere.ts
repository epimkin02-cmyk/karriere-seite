/**
 * Copy and content for the careers page of
 * Frank Kutscher Steuerberatungsgesellschaft mbH.
 *
 * Source of every quoted string: https://da-will-ich-arbeiten.de/kutscher/
 * (retrieved 2026-08-25). Body copy is verbatim from that page. Strings that
 * the original did not have — eyebrows, nav labels, card titles, step titles —
 * are marked `// NEU` at their definition.
 *
 * Components take this through props — never by importing this file directly
 * (see obsidian/frontend/component-conventions.md → Data rules). Swap it for a
 * CMS payload later without touching a single component.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroContent extends SectionIntro {
  actions: readonly CtaLink[];
  /** Small proof line under the fold divider. */
  trustLine: string;
  /** Promise chips floating over the scene. */
  serviceChips: readonly string[];
}

export interface WhyContent extends SectionIntro {
  actions: readonly CtaLink[];
  /** Images that stream after the cursor, oldest fading out. */
  trailImages: readonly string[];
}

export interface ServiceCard {
  index: string;
  title: string;
  /** Sub-points listed on the opening card. */
  items?: readonly string[];
  /** Full-bleed photo card. */
  image?: string;
  /** Body copy on a photo or brand card. */
  body?: string;
  /** Tail card carries a "Discover" affordance. */
  cta?: string;
  variant: "lime" | "photo" | "brand";
}

export interface StatItem {
  value: string;
  label: string;
}

/** The About paragraph greys the clauses that aren't the point. */
export interface AboutFragment {
  text: string;
  muted: boolean;
}

export interface AboutContent {
  eyebrow: string;
  bannerImage: string;
  stats: readonly StatItem[];
  paragraph: readonly AboutFragment[];
  actions: readonly CtaLink[];
}

/* --- Sections added for this build ---------------------------------------- */

/** One open position. */
export interface JobItem {
  title: string;
  meta: string;
  href: string;
}

export interface JobsContent extends SectionIntro {
  jobs: readonly JobItem[];
  actions: readonly CtaLink[];
}

/** One of the seventeen reasons, rendered as a card on the rail. */
export interface ReasonItem {
  index: string;
  label: string;
  /** 3D icon under `public/assets/gruende/`, without the extension. */
  icon: string;
}

export interface ReasonsContent {
  eyebrow: string;
  title: string;
  reasons: readonly ReasonItem[];
  /** Closing card on the rail — the "anything missing?" offer. */
  more: { title: string; body: string; cta: string; href: string };
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  /** Null until the client supplies a portrait. */
  image: string | null;
}

export interface TestimonialContent {
  eyebrow: string;
  title: string;
  quotes: readonly TestimonialItem[];
}

export interface LocationContent {
  eyebrow: string;
  title: string;
  address: readonly string[];
  highlights: readonly string[];
  /**
   * Office coordinates, decimal degrees. The map's bounding box and its marker
   * are both derived from this one pair, so the pin and the framing can never
   * disagree.
   *
   * ⚠️ VERIFY BEFORE LAUNCH. These are Pößneck's town centre, not the building:
   * the geocoder was unreachable from the build environment. To correct them,
   * right-click the office in Google Maps and copy the two numbers it shows.
   * The "plan a route" link below does NOT depend on them — it is built from
   * the postal address, so it stays correct either way.
   */
  coords: { lat: number; lon: number };
  mapConsentTitle: string;
  mapConsentBody: string;
  mapConsentAction: string;
  /** Opens the visitor's own map app in a new tab — no embed, no consent. */
  routeLabel: string;
}

export interface RoleBlock {
  title: string;
  body: string;
}

export interface RoleContent {
  eyebrow: string;
  blocks: readonly RoleBlock[];
  actions: readonly CtaLink[];
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  image: string;
  phone: string;
  phoneHref: string;
  email: string;
  quote: string;
}

export interface ProcessContent {
  eyebrow: string;
  title: string;
  person: ContactPerson;
  steps: readonly ProcessStep[];
  promise: { title: string; body: string };
  closing: string;
}

export interface FooterContent {
  disclaimer: string;
  legalLine: string;
  links: readonly NavLink[];
}

/* --- Application form ------------------------------------------------------ */

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email" | "textarea" | "choice";
  /** Present on `choice` fields — rendered as a radio group of pills. */
  options?: readonly string[];
}

export interface FormStep {
  step: string;
  legend: string;
  fields: readonly FormField[];
}

export interface ContactContent extends SectionIntro {
  formTitle: string;
  steps: readonly FormStep[];
  backLabel: string;
  nextLabel: string;
  /** Shown at the field that blocks the step — never in a box above the form. */
  requiredHint: string;
  /** Shown at the submit button when the request itself fails. */
  submitErrorHint: string;
  consentLead: string;
  consentLinkLabel: string;
  consentTail: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const BRAND_NAME = "Kutscher";

/** NEU — the original page has no navigation, only a logo. */
export const SITE_NAV: readonly NavLink[] = [
  { label: "Vorteile", href: "#vorteile" },
  { label: "Stellen", href: "#stellen" },
  { label: "Gründe", href: "#gruende" },
  { label: "Standort", href: "#standort" },
];

/** NEU — short form of the page's one call to action, for the header pill. */
export const HEADER_CTA: CtaLink = {
  label: "Schnellbewerbung",
  href: "#bewerben",
};

/** The page's one call to action, verbatim including its second line. */
const PRIMARY_CTA: CtaLink = {
  label: "Jetzt Schnellbewerbung starten",
  href: "#bewerben",
};

/* -------------------------------------------------------------------------- */
/* 1 — Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO_CONTENT: HeroContent = {
  eyebrow: "Karriere in Pößneck", // NEU
  title: "Nicht irgendein Job, sondern die perfekte Wahl für deine Zukunft?",
  description:
    "Du hast sie gefunden. Starte deine Karriere bei der Steuerkanzlei Kutscher in Pößneck in einem modernen Arbeitsumfeld mit klarer Perspektive, echter Wertschätzung und einer starken Teamkultur.",
  actions: [PRIMARY_CTA],
  trustLine: "Keine Unterlagen notwendig",
  serviceChips: [
    "Überdurchschnittliches Gehalt",
    "Raum für Entfaltung",
    "Klare Einarbeitung mit Geduld",
  ],
};

/* -------------------------------------------------------------------------- */
/* 2 — Vorteile: intro band                                                    */
/* -------------------------------------------------------------------------- */

export const WHY_CONTENT: WhyContent = {
  eyebrow: "Deine Vorteile", // NEU
  title: "Entdecke die Vorteile, die dich bei uns erwarten",
  description:
    "Deine Karriere mit Perspektive — bei einer Kanzlei, die ihre Mitarbeiter als Fundament versteht und nicht als Ressource.",
  actions: [PRIMARY_CTA],
  trailImages: [
    "/assets/kutscher/buero.webp",
    "/assets/kutscher/team-gruppe.webp",
    "/assets/kutscher/portraet-kutscher.webp",
  ],
};

/* -------------------------------------------------------------------------- */
/* 3 — Vorteile: the pinned card runway                                        */
/* -------------------------------------------------------------------------- */

export const SERVICES_INTRO: SectionIntro = {
  eyebrow: "Was dich erwartet", // NEU
  title: "Drei Dinge, die woanders selten sind",
  description:
    "Wir gestalten den Arbeitsplatz gemeinsam mit dir — und meinen das wörtlich.",
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  {
    index: "01",
    title: "Dein Rahmen",
    variant: "lime",
    items: [
      "Überdurchschnittliches Gehalt",
      "Raum für Entfaltung",
      "Klare Einarbeitung mit Geduld",
      "Ein über 15-köpfiges Team",
    ],
  },
  {
    index: "02",
    title: "Homeoffice",
    variant: "photo",
    image: "/assets/kutscher/buero.webp",
    body:
      "Egal ob Gleitzeitmodell oder eins bis drei Tage Homeoffice pro Woche, du entscheidest, wann und wo du arbeitest. Wir haben immer ein offenes Ohr für deine Wünsche und gestalten gemeinsam mit dir den Arbeitsplatz, der zu deinem Leben passt.",
  },
  {
    index: "03",
    title: "Kostenlose Massagen",
    variant: "photo",
    image: "/assets/kutscher/beratung.webp",
    body:
      "Wenn Zahlen und Finanzbehörden mal wieder auf die Nerven gehen, sorgt unser Masseur dafür, dass der Stress wegmassiert wird, alle zwei Wochen für jeden Mitarbeiter kostenlos.",
  },
  {
    index: "04",
    title: "600 € Gesundheitsbudget",
    variant: "photo",
    image: "/assets/kutscher/besprechungsraum.webp",
    body:
      "Du bekommst jedes Jahr ein Gesundheitsbudget in Höhe von 600 €. Dieses kannst du flexibel für Leistungen nutzen, die deine Krankenkasse nicht übernimmt – z. B. für Brillen, Kontaktlinsen oder Zahnbehandlungen.",
  },
  {
    index: "05",
    title: "Dir fehlt etwas?",
    variant: "brand",
    body:
      "Wir können über alles sprechen und sorgen dafür, dass dein neuer Arbeitsplatz all deinen Bedürfnissen gerecht wird.",
    cta: "Sprich uns an", // NEU
  },
];

/* -------------------------------------------------------------------------- */
/* 4 — Fundament                                                               */
/* -------------------------------------------------------------------------- */

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "Unsere Mitarbeiter sind das Fundament", // aus der Original-Headline
  bannerImage: "/assets/kutscher/team-gruppe.webp",
  /**
   * `StatCounter` parses `value` as prefix / digits / suffix — every entry
   * needs digits in it or the number renders static instead of counting.
   */
  stats: [
    { value: "15+", label: "Kolleginnen und Kollegen" },
    { value: "3", label: "Tage Homeoffice pro Woche" },
    { value: "600 €", label: "Gesundheitsbudget im Jahr" },
    { value: "17", label: "Gründe, hier anzufangen" },
  ],
  paragraph: [
    { text: "Wir sind eine Kanzlei,", muted: false },
    { text: "ansässig in Pößneck,", muted: true },
    {
      text:
        "die sich zum Ziel genommen hat, neue regionale Standards als Kanzlei für Arbeitgeber zu setzen.",
      muted: false,
    },
    {
      text:
        "Unser Erfolg basiert auf unserem über 15-köpfigen Team, dem wir einen sicheren und verlässlichen Arbeitsplatz bieten.",
      muted: false,
    },
    {
      text:
        "Gemeinsam stellen wir sicher, dass mittelständische Unternehmen in Pößneck und Umgebung über Generationen hinweg optimal steuerlich betreut werden",
      muted: true,
    },
    { text: "und begleiten sie bei allen wichtigen Entscheidungen.", muted: false },
  ],
  actions: [PRIMARY_CTA],
};

/* -------------------------------------------------------------------------- */
/* 5 — Offene Stellen                                                          */
/* -------------------------------------------------------------------------- */

export const JOBS_CONTENT: JobsContent = {
  eyebrow: "Offene Stellen", // aus der Original-Zeile "Offene Stellen:"
  title: "Zwei Wege zu uns", // NEU
  description:
    "Beide Stellen sind unbefristet und lassen sich in Vollzeit, Teilzeit oder als Vier-Tage-Woche gestalten.", // NEU, aus den 17 Gründen abgeleitet
  jobs: [
    {
      title: "Steuerfachangestellte/r (m/w/d)",
      meta: "Vollzeit · Teilzeit · 4-Tage-Woche möglich", // NEU
      href: "#bewerben",
    },
    {
      title: "Steuerfachwirt/in (m/w/d)",
      meta: "Vollzeit · Teilzeit · 4-Tage-Woche möglich", // NEU
      href: "#bewerben",
    },
  ],
  actions: [PRIMARY_CTA],
};

/* -------------------------------------------------------------------------- */
/* 6 — 17 gute Gründe                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The seventeen reasons, in the original page's order, each paired with a 3D
 * icon from Microsoft's Fluent Emoji set (MIT licence, rendered artwork rather
 * than flat pictograms).
 *
 * The icon is chosen for what the benefit *is*, not for a literal reading of
 * its label — "Vermittlungsboni bei Mitarbeiterrekrutierung" is a handshake,
 * not a money bag, because the referral is the thing being rewarded. Two
 * candidates were rejected outright for carrying a dollar sign, which has no
 * business on a German tax firm's page.
 */
const REASONS = [
  ["Weihnachtsgeld", "01-weihnachtsgeld"],
  ["Urlaubsgeld", "02-urlaubsgeld"],
  ["Kindergartenzuschuss", "03-kindergartenzuschuss"],
  ["600 € Gesundheitsbudget", "04-gesundheitsbudget"],
  ["4-Tage-Woche möglich", "05-viertagewoche"],
  ["Übernahme der Kosten bei Fortbildung", "06-fortbildung"],
  ["Fahrtkostenzuschuss", "07-fahrtkosten"],
  ["Jobrad / E-Mountainbike", "08-jobrad"],
  ["Sonderurlaub bei Berufsfortbildung", "09-sonderurlaub"],
  ["Vermittlungsboni bei Mitarbeiterrekrutierung", "10-vermittlungsboni"],
  ["EdenRed-Karte", "11-edenred"],
  ["Betriebliche Altersvorsorge", "12-altersvorsorge"],
  ["Zentrale Lage", "13-zentrale-lage"],
  ["2 Bildschirme", "14-zwei-bildschirme"],
  ["Kostenlose Parkplätze", "15-parkplaetze"],
  ["Erholungsbeihilfen", "16-erholungsbeihilfe"],
  ["Sehr gute Verkehrsanbindung", "17-verkehrsanbindung"],
] as const;

export const REASONS_CONTENT: ReasonsContent = {
  eyebrow: "Gute Gründe", // NEU
  title: "17 gute Gründe Teil unseres Teams zu werden",
  reasons: REASONS.map(([label, icon], i) => ({
    index: String(i + 1).padStart(2, "0"),
    label,
    icon,
  })),
  more: {
    title: "Dir fehlt etwas?",
    body:
      "Wir können über alles sprechen und sorgen dafür, dass dein neuer Arbeitsplatz all deinen Bedürfnissen gerecht wird.",
    cta: "Jetzt bewerben", // NEU
    href: "#bewerben",
  },
};

/* -------------------------------------------------------------------------- */
/* 7 — Testimonial                                                             */
/* -------------------------------------------------------------------------- */

export const TESTIMONIAL_CONTENT: TestimonialContent = {
  eyebrow: "Stimmen aus dem Team", // NEU
  title: "Das sagen deine zukünftigen Kollegen",
  quotes: [
    {
      // TODO(kunde): Wortlaut nachliefern. Das Original führt das Zitat nur als
      // Medium, nicht als Text. Bis dahin bleibt der Platzhalter sichtbar
      // markiert, damit er nicht versehentlich live geht.
      quote: "[PLATZHALTER — Original-Wortlaut von Till Pfaffendorf ausstehend]",
      name: "Till Pfaffendorf",
      role: "Steuerfachangestellter",
      image: null,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 8 — Standort                                                                */
/* -------------------------------------------------------------------------- */

export const LOCATION_CONTENT: LocationContent = {
  eyebrow: "Anfahrt", // NEU
  title: "Unser Standort in Pößneck",
  address: ["Naßäckerstr. 12", "07381 Pößneck"],
  /** The three location-related entries from the seventeen reasons. */
  highlights: ["Zentrale Lage", "Kostenlose Parkplätze", "Sehr gute Verkehrsanbindung"],
  coords: { lat: 50.6939, lon: 11.5936 },
  mapConsentTitle: "Karte laden", // NEU
  mapConsentBody:
    "Die Karte kommt von OpenStreetMap. Beim Laden wird eine Verbindung dorthin aufgebaut und deine IP-Adresse übertragen.", // NEU
  mapConsentAction: "Karte anzeigen", // NEU
  routeLabel: "Route planen", // NEU
};

/* -------------------------------------------------------------------------- */
/* 9 — Aufgaben & Anforderungen                                                */
/* -------------------------------------------------------------------------- */

export const ROLE_CONTENT: RoleContent = {
  eyebrow: "Die Stelle", // NEU
  blocks: [
    {
      title: "Deine Aufgaben",
      body:
        "Wir legen Wert darauf, die anstehenden Aufgaben entsprechend deiner individuellen Stärken und Vorlieben zu gestalten. Aus diesem Grund setzen wir uns regelmäßig mit dir zusammen, um deine Stärken zu identifizieren und herauszufinden, welche Arbeiten dir gleichzeitig Freude bereiten.",
    },
    {
      title: "Unsere Anforderungen",
      body:
        "Uns ist wichtig, dass du eine abgeschlossene Ausbildung als Steuerfachangestellte/r mitbringst. Wenn du außerdem lernbereit bist, öffnen wir dir alle Türen für deine persönliche und fachliche Weiterentwicklung.",
    },
  ],
  actions: [PRIMARY_CTA],
};

/* -------------------------------------------------------------------------- */
/* 10 — Prozess, Wechselversprechen, Ansprechpartner                           */
/* -------------------------------------------------------------------------- */

export const PROCESS_CONTENT: ProcessContent = {
  eyebrow: "So läuft es ab", // NEU
  title: "Wir freuen uns auf deine Bewerbung",
  person: {
    name: "Frank Kutscher",
    role: "Dein Ansprechpartner", // aus "Deine Ansprechpartner" im Original
    image: "/assets/kutscher/portraet-kutscher.webp",
    phone: "03647 44558200",
    phoneHref: "tel:+4936474455820",
    email: "frank.kutscher@kutscher-stb.de",
    quote: "Von deiner Bewerbung bis zur Einarbeitung bin ich für dich da!",
  },
  steps: [
    {
      step: "01",
      title: "Wir prüfen deine Bewerbung", // NEU
      body:
        "Nachdem du deine Bewerbung eingereicht hast, werden deine Angaben von unserem internen Team sorgfältig geprüft und uns anschließend vorgelegt. Wir nehmen dann persönlich Kontakt mit dir auf, um offene Fragen zu klären.",
    },
    {
      step: "02",
      title: "Du lernst die Kanzlei kennen", // NEU
      body:
        "Wenn alles passt, laden wir dich herzlich zu einem Besuch in unserer Kanzlei ein. Dort hast du die Gelegenheit, bereits einige deiner zukünftigen Kolleginnen und Kollegen kennenzulernen.",
    },
    {
      step: "03",
      title: "Wir besprechen den Vertrag", // NEU
      body:
        "Sollte dir die Stelle zusagen, besprechen wir gemeinsam die Details des Arbeitsvertrags und klären alle Rahmenbedingungen.",
    },
  ],
  promise: {
    title: "Unser Wechselversprechen",
    body:
      "Viele Kanzleien stehen aktuell vor einer Übergabe oder sogar vor der Schließung. Wir bieten dir einen sicheren Platz mit mindestens denselben Bedingungen wie bisher, häufig sogar besseren.",
  },
  closing: "Wir freuen uns darauf, dich bald persönlich begrüßen zu dürfen.",
};

/* -------------------------------------------------------------------------- */
/* 11 — Schnellbewerbung                                                       */
/* -------------------------------------------------------------------------- */

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Schnellbewerbung", // NEU
  title: "Jetzt bewerben",
  description:
    "Keine Unterlagen notwendig. Drei kurze Schritte — danach melden wir uns persönlich bei dir.", // NEU, aus "Keine Unterlagen notwendig"
  formTitle: "Deine Schnellbewerbung", // NEU
  steps: [
    {
      step: "01",
      legend: "Worauf bewirbst du dich?", // NEU
      fields: [
        {
          name: "position",
          label: "Stelle",
          placeholder: "",
          type: "choice",
          options: [
            "Steuerfachangestellte/r (m/w/d)",
            "Steuerfachwirt/in (m/w/d)",
            "Etwas anderes",
          ],
        },
        {
          name: "start",
          label: "Wann könntest du starten?",
          placeholder: "",
          type: "choice",
          options: ["Sofort", "In 1–3 Monaten", "Später als 3 Monate"],
        },
      ],
    },
    {
      step: "02",
      legend: "Was bringst du mit?", // NEU
      fields: [
        {
          name: "qualification",
          label: "Abgeschlossene Ausbildung als Steuerfachangestellte/r?",
          placeholder: "",
          type: "choice",
          options: ["Ja", "Verwandte Qualifikation", "Noch nicht"],
        },
        {
          name: "worktime",
          label: "Wunsch-Arbeitszeit",
          placeholder: "",
          type: "choice",
          options: ["Vollzeit", "Teilzeit", "4-Tage-Woche"],
        },
      ],
    },
    {
      step: "03",
      legend: "Wie erreichen wir dich?", // NEU
      fields: [
        { name: "name", label: "Name", placeholder: "Vor- und Nachname", type: "text" },
        { name: "email", label: "E-Mail", placeholder: "name@beispiel.de", type: "email" },
        { name: "phone", label: "Telefon", placeholder: "Für den Rückruf", type: "tel" },
        {
          name: "message",
          label: "Möchtest du uns noch etwas mitgeben?",
          placeholder: "Optional",
          type: "textarea",
        },
      ],
    },
  ],
  backLabel: "Zurück",
  nextLabel: "Weiter",
  requiredHint: "Bitte ergänze diese Angabe.", // NEU
  submitErrorHint:
    "Das hat gerade nicht geklappt. Bitte versuch es noch einmal.", // NEU
  consentLead:
    "Mit dem Absenden stimmst du zu, dass wir deine Angaben zur Bearbeitung deiner Bewerbung verarbeiten. Mehr dazu in der",
  consentLinkLabel: "Datenschutzerklärung",
  consentTail: ".",
  submitLabel: "Bewerbung absenden",
  successTitle: "Danke — deine Bewerbung ist bei uns.", // NEU
  successBody:
    "Wir prüfen deine Angaben und melden uns persönlich bei dir. In der Regel innerhalb von zwei Werktagen.", // NEU
};

/* -------------------------------------------------------------------------- */
/* 12 — Footer                                                                 */
/* -------------------------------------------------------------------------- */

export const FOOTER_CONTENT: FooterContent = {
  disclaimer:
    "Diese Seite ist kein Teil der Facebook Website oder Facebook Inc. Außerdem ist diese Seite nicht im Auftrag der Facebook Inc. entstanden.",
  legalLine:
    "Frank Kutscher Steuerberatungsgesellschaft mbH | Naßäckerstr. 12 | 07381 Pößneck",
  links: [
    { label: "Impressum", href: "https://www.kutscher-stb.de/Impressum" },
    { label: "Datenschutz", href: "https://www.kutscher-stb.de/datenschutzerklaerung" },
  ],
};
