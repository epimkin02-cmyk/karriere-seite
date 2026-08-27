/**
 * The three legal documents of
 * Frank Kutscher Steuerberatungsgesellschaft mbH, verbatim.
 *
 * Sources (all retrieved 2026-08-27):
 *   https://www.kutscher-stb.de/Impressum
 *   https://www.kutscher-stb.de/datenschutzerklaerung
 *   https://www.kutscher-stb.de/barrierefreiheitserklarung
 *
 * These are reproduced 1:1, including every paragraph, every reference to a
 * statute, and every set of contact details. Nothing is shortened, reordered,
 * paraphrased or spell-corrected. Where the original carries an obvious
 * defect it is kept and marked `// sic:`. No heading, paragraph or figure in
 * this file was invented — a legal text must never be authored here.
 *
 * The structure is `LegalDocument → LegalSection[] → LegalBlock[]` so the
 * pages can render semantically (headings as headings, addresses as
 * addresses, the cookie table as a table) instead of as one wall of text.
 *
 * Components take this through props — never by importing this file directly.
 */

import type { LegalDocument } from "./firma";

/* -------------------------------------------------------------------------- */
/* Impressum                                                                   */
/* -------------------------------------------------------------------------- */

export const IMPRESSUM: LegalDocument = {
  slug: "Impressum",
  title: "Impressum",
  intro: [],
  sections: [
    {
      id: "seitenbetreiber",
      heading: "Seitenbetreiber i.S.d. § 5 TMG",
      level: 2,
      blocks: [
        {
          kind: "address",
          lines: [
            "Frank Kutscher Steuerberatungsgesellschaft mbH",
            "Naßäckerstr. 12",
            "07381 Pößneck",
            "Deutschland",
            "E-Mail: frank.kutscher@kutscher-stb.de",
            "Tel.: 0364744558200",
            "Fax: 0364744558257",
          ],
        },
      ],
    },
    {
      id: "handelsregister",
      heading: "Handelsregister",
      level: 3,
      blocks: [
        {
          kind: "address",
          lines: ["Registergericht: Amtsgericht Jena", "Registernummer: HRB 518026"],
        },
      ],
    },
    {
      id: "geschaeftsfuehrer",
      heading: "Geschäftsführer",
      level: 3,
      blocks: [{ kind: "paragraph", text: "Frank Kutscher" }],
    },
    {
      id: "ust-id",
      heading: "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz",
      level: 3,
      blocks: [{ kind: "paragraph", text: "DE 342354149" }],
    },
    {
      id: "taetigkeit-steuerberater",
      heading: "Angaben für die Tätigkeit als Steuerberater/in",
      level: 3,
      blocks: [],
    },
    {
      id: "berufsbezeichnung",
      heading: "Berufsbezeichnung",
      level: 4,
      blocks: [
        { kind: "paragraph", text: "Steuerberater/in (verliehen in Deutschland)" },
      ],
    },
    {
      id: "kammer",
      heading: "Zuständige Kammer und Aufsichtsbehörde für die Tätigkeit als Steuerberater/in",
      level: 4,
      blocks: [
        {
          kind: "address",
          lines: [
            "Steuerberaterkammer Thüringen",
            "Kartäuserstraße 27a",
            "99084 Erfurt",
            "E-Mail: info@stbk-thueringen.de",
            "Tel.: 0361 57692-0",
            "Fax: 0361 57692-19",
            "Website: https://www.stbk-thueringen.de",
          ],
        },
      ],
    },
    {
      id: "berufsrechtliche-regelungen",
      heading: "Berufsrechtliche Regelungen für die Tätigkeit als Steuerberater/in",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Es gelten die nachstehend benannten berufsrechtlichen Regelungen für die Tätigkeit als Steuerberater/in in der Bundesrepublik Deutschland:",
        },
        {
          kind: "linkList",
          items: [
            {
              label: "Steuerberatungsgesetz (StBerG)",
              href: "https://www.gesetze-im-internet.de/stberg/",
            },
            {
              label: "Durchführungsverordnung zum StBerG (DVStb)",
              href: "https://www.gesetze-im-internet.de/stbdv/",
            },
            {
              label: "Berufsordnung der Bundesteuerberaterkammer (BOStB)",
              href: "https://www.bstbk.de/downloads/bstbk/recht-und-berufsrecht/gesetze-und-verordnungen/BStBK_Berufsordnung.pdf",
            },
            {
              label: "Steuerberatervergütungsverordnung (StBVV)",
              href: "https://www.gesetze-im-internet.de/stbgebv/BJNR014420981.html",
            },
            {
              label: "Fachberaterordnung (FBO)",
              href: "https://www.bstbk.de/downloads/bstbk/recht-und-berufsrecht/fachinfos/BStBK_Berufsordnung-inkl-Fachberaterordnung.pdf",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "Die Regelungen können auch bei der Bundesteuerberaterkammer unter https://www.bstbk.de/de/themen/berufsrecht eingesehen werden.",
        },
      ],
    },
    {
      id: "berufshaftpflichtversicherung",
      heading: "Berufshaftpflichtversicherung",
      level: 4,
      blocks: [
        /*
         * sic: die Anschrift der Versicherung steht im Original als
         * unausgefüllter Platzhalter des Baukastens auf der Seite. Sie wird
         * hier unverändert übernommen — sie darf NICHT erfunden oder ergänzt
         * werden. Vor dem Launch beim Mandanten erfragen.
         */
        {
          kind: "address",
          lines: [
            "LVM Versicherung",
            "xxxxxxxxxxxxxxxxxxxxxxxx",
            "12345 xxxxxxxxxxxxxxxxxxxx",
            "Deutschland",
          ],
        },
        { kind: "paragraph", text: "Räumlicher Geltungsbereich: Deutschland" },
      ],
    },
    {
      id: "vsbg",
      heading: "Hinweis gemäß § 36 VSBG",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir werden nicht an alternativen Streitschlichtungsverfahren im Sinne des § 36 VSBG teilnehmen.",
        },
        {
          kind: "paragraph",
          text: "Die Nutzung einer alternativen Schlichtungsstelle stellt keine zwingende Voraussetzung für das Anrufen zuständiger ordentlicher Gerichte dar.",
        },
      ],
    },
    {
      id: "urheberrecht",
      heading: "Urheberrecht und Bildnachweise",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Inhalte von kutscher-stb.de sind – soweit nicht abweichend angegeben – urheberrechtlich geschützt.",
        },
        {
          kind: "paragraph",
          text: "Verwendete Fotografien sind ggf. mit Bildnachweisen gekennzeichnet oder unten aufgeführt, soweit sie nicht selbst angefertigt wurden.",
        },
        {
          kind: "paragraph",
          text: "Die Verwendung von Fotografien auf Drittseiten ist nur im Rahmen der jeweiligen Lizenz der Urheber möglich.",
        },
        { kind: "paragraph", text: "Quellenangaben für die verwendeten Bilder:" },
        {
          kind: "list",
          items: [
            "© Puwasit Inyavileart – stock.adobe.com",
            "© Andrey Popov – stock.adobe.com",
            "© wutzkoh – stock.adobe.com",
            "© bongkarn – stock.adobe.com",
            "© New Africa – stock.adobe.com",
            "© snowing12 – stock.adobe.com",
            "© PIC SNIPE – stock.adobe.com",
            "© Natee Meepian – stock.adobe.com",
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Datenschutzerklärung                                                        */
/* -------------------------------------------------------------------------- */

export const DATENSCHUTZERKLAERUNG: LegalDocument = {
  slug: "datenschutzerklaerung",
  title: "Datenschutzerklärung",
  intro: [],
  sections: [
    {
      id: "verantwortlicher",
      heading: "Verantwortlicher",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO ist derjenige, der allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf unsere Internetseite ist der Verantwortliche:",
        },
        {
          kind: "address",
          lines: [
            "Frank Kutscher Steuerberatungsgesellschaft mbH",
            "Naßäckerstr. 12",
            "07381 Pößneck",
            "Deutschland",
            "E-Mail: frank.kutscher@kutscher-stb.de",
            "Tel.: 0364744558200",
            "Fax: 0364744558257",
          ],
        },
      ],
    },
    {
      id: "datenschutzbeauftragter",
      heading: "Kontaktdaten des Datenschutzbeauftragten",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir haben einen Datenschutzbeauftragten gem. Art. 37 DSGVO bestellt.",
        },
        {
          kind: "paragraph",
          text: "Unseren Datenschutzbeauftragten erreichen Sie unter den nachfolgenden Kontaktdaten:",
        },
        {
          kind: "address",
          lines: [
            "ETL Datenservice GmbH",
            "Widdersdorfer Straße 415",
            "50933 Köln",
            "Deutschland",
            "E-Mail: info@etl-datenservice.de",
            "Tel.: 0221/9544010",
            "Fax: 0221/9544015",
            "Website: https://www.etl-datenservice.de/",
          ],
        },
      ],
    },
    {
      id: "logfiles",
      heading: "Bereitstellung der Website und Erstellung von Logfiles",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen des jeweils abrufenden Gerätes (z.B. Computer, Mobiltelefon, Tablet, etc.).",
        },
      ],
    },
    {
      id: "logfiles-umfang",
      heading:
        "Welche personenbezogenen Daten werden erhoben und in welchem Umfang werden diese verarbeitet?",
      level: 4,
      blocks: [
        {
          kind: "list",
          items: [
            "(1) Informationen über den Browsertyp und die verwendete Version;",
            "(2) Das Betriebssystem des Abrufgerätes;",
            "(3) Hostname des zugreifenden Rechners;",
            "(4) Die IP-Adresse des Abrufgerätes;",
            "(5) Datum und Uhrzeit des Zugriffs;",
            "(6) Websites und Ressourcen (Bilder, Dateien, weitere Seiteninhalte), die auf unserer Internetseite aufgerufen wurden;",
            "(7) Websites, von denen das System des Nutzers auf unsere Internetseite gelangte (Referrer-Tracking);",
            "(8) Meldung, ob der Abruf erfolgreich war;",
            "(9) Übertragene Datenmenge",
          ],
        },
        {
          kind: "paragraph",
          text: "Diese Daten werden in den Logfiles unseres Systems gespeichert.",
        },
        {
          kind: "paragraph",
          text: "Eine Speicherung dieser Daten zusammen mit personenbezogenen Daten eines konkreten Nutzers findet nicht statt, so dass eine Identifizierung einzelner Seitenbesucher nicht erfolgt.",
        },
      ],
    },
    {
      id: "logfiles-rechtsgrundlage",
      heading: "Rechtsgrundlage für die Verarbeitung personenbezogener Daten",
      level: 4,
      blocks: [
        { kind: "paragraph", text: "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)." },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse besteht darin, die Erreichung des nachfolgend geschilderten Zwecks zu gewährleisten.",
        },
      ],
    },
    {
      id: "logfiles-zweck",
      heading: "Zweck der Datenverarbeitung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die vorübergehende (automatisierte) Speicherung der Daten ist für den Ablauf eines Websitebesuchs erforderlich, um eine Auslieferung der Website zu ermöglichen.",
        },
        {
          kind: "paragraph",
          text: "Die Speicherung und Verarbeitung der personenbezogenen Daten erfolgt zudem zur Erhaltung der Kompatibilität unserer Internetseite für möglichst alle Besucher und zur Missbrauchsbekämpfung und Störungsbeseitigung.",
        },
        {
          kind: "paragraph",
          text: "Hierfür ist es notwendig, die technischen Daten des abrufenden Rechners zu loggen, um so frühestmöglich auf Darstellungsfehler, Angriffe auf unsere IT-Systeme und/oder Fehler der Funktionalität unserer Internetseite reagieren zu können.",
        },
        {
          kind: "paragraph",
          text: "Zudem dienen uns die Daten zur Optimierung der Website und zur generellen Sicherstellung der Sicherheit unserer informationstechnischen Systeme.",
        },
      ],
    },
    {
      id: "logfiles-dauer",
      heading: "Dauer der Speicherung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Löschung der vorgenannten technischen Daten erfolgt, sobald sie nicht mehr benötigt werden, um die Kompatibilität der Internetseite für alle Besucher zu gewährleisten, spätestens aber 3 Monate nach Abruf unserer Internetseite.",
        },
      ],
    },
    {
      id: "logfiles-widerspruch",
      heading: "Widerspruchs- und Löschungsmöglichkeit",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie können der Verarbeitung jederzeit gem. Art. 21 DSGVO widersprechen und eine Löschung von Daten gem. Art. 17 DSGVO verlangen.",
        },
        {
          kind: "paragraph",
          text: "Welche Rechte Ihnen zustehen und wie Sie diese geltend machen, finden Sie im unteren Bereich dieser Datenschutzerklärung.",
        },
      ],
    },
    {
      id: "besondere-funktionen",
      heading: "Besondere Funktionen der Internetseite",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Unsere Seite bietet Ihnen verschiedene Funktionen, bei deren Nutzung von uns personenbezogene Daten erhoben, verarbeitet und gespeichert werden.",
        },
        { kind: "paragraph", text: "Nachfolgend erklären wir, was mit diesen Daten geschieht:" },
      ],
    },
    {
      id: "kontaktformular",
      heading: "Kontaktformular(e)",
      level: 3,
      blocks: [],
    },
    {
      id: "kontaktformular-umfang",
      heading:
        "Welche personenbezogenen Daten werden erhoben und in welchem Umfang werden diese verarbeitet?",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die von Ihnen in unsere Kontaktformulare eingegebenen Daten, die Sie in die Eingabemaske des Kontaktformulars eingetragen haben, werden wir zur Erfüllung des unten genannten Zwecks verarbeiten.",
        },
      ],
    },
    {
      id: "kontaktformular-rechtsgrundlage",
      heading: "Rechtsgrundlage für die Verarbeitung personenbezogener Daten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch eindeutige bestätigende Handlung bzw. Verhaltensweise)",
        },
      ],
    },
    {
      id: "kontaktformular-zweck",
      heading: "Zweck der Datenverarbeitung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die über unser Kontaktformular bzw. über unsere Kontaktformulare aufgenommenen Daten werden wir nur für die Bearbeitung der konkreten Kontaktanfrage verwenden, die durch das Kontaktformular eingeht.",
        },
      ],
    },
    {
      id: "kontaktformular-dauer",
      heading: "Dauer der Speicherung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Nach Bearbeitung Ihrer Anfrage werden die erhobenen Daten unverzüglich gelöscht, soweit keine gesetzlichen Aufbewahrungsfristen bestehen.",
        },
      ],
    },
    {
      id: "kontaktformular-widerruf",
      heading: "Widerrufs- und Löschungsmöglichkeit",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Widerrufs- und Löschungsmöglichkeiten richten sich nach den nachfolgend in dieser Datenschutzerklärung geschilderten generellen Regelungen zum datenschutzrechtlichen Widerrufsrecht und Löschungsanspruch.",
        },
      ],
    },
    {
      id: "kontaktformular-erforderlichkeit",
      heading: "Erforderlichkeit der Angabe personenbezogener Daten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Nutzung der Kontaktformulare erfolgt auf freiwilliger Basis und ist weder vertraglich noch gesetzlich vorgeschrieben.",
        },
        {
          kind: "paragraph",
          text: "Sie sind nicht verpflichtet mit uns über das Kontaktformular Kontakt aufzunehmen, sondern können auch die weiteren auf unserer Seite angegebenen Kontaktmöglichkeiten nutzen.",
        },
        {
          kind: "paragraph",
          text: "Sofern Sie unser Kontaktformular nutzen möchten, müssen Sie die als Pflichtangaben gekennzeichneten Felder ausfüllen.",
        },
        {
          kind: "paragraph",
          text: "Sofern Sie die notwendigen Angaben des Kontaktformulars nicht mit Inhalt befüllen, können Sie entweder die Anfrage nicht absenden, oder wir können Ihre Anfrage leider nicht bearbeiten.",
        },
      ],
    },
    {
      id: "webtracker",
      heading: "Statistische Auswertung der Besuche dieser Internetseite - Webtracker",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir erheben, verarbeiten und speichern bei dem Aufruf dieser Internetseite oder einzelner Dateien der Internetseite folgende Daten:",
        },
        {
          kind: "paragraph",
          text: "IP-Adresse, Webseite, von der aus die Datei abgerufen wurde, Name der Datei, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und Meldung über den Erfolg des Abrufs (sog. Web-Log).",
        },
        {
          kind: "paragraph",
          text: "Diese Zugriffsdaten verwenden wir ausschließlich in nicht personalisierter Form für die stetige Verbesserung unseres Internetangebots und zu statistischen Zwecken.",
        },
        {
          kind: "paragraph",
          text: "Wir setzen zur Auswertung der Besuche dieser Internetseite zudem noch folgende Webtracker ein:",
        },
      ],
    },
    {
      id: "google-analytics",
      heading: "Google-Analytics",
      level: 3,
      blocks: [],
    },
    {
      id: "google-analytics-umfang",
      heading: "Umfang der Verarbeitung personenbezogener Daten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Auf unserer Seite verwenden wir den Webtracking-Service des Unternehmens Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend: Google-Analytics).",
        },
        {
          kind: "paragraph",
          text: "Google-Analytics nutzt im Rahmen des Webtrackings Cookies, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung unserer Website und Ihres Surfverhaltens ermöglichen (sogenanntes Tracken).",
        },
        {
          kind: "paragraph",
          text: "Wir führen diese Analyse auf Basis des Tracking-Services von Google-Analytics durch, um unser Internetangebot ständig zu optimieren und besser verfügbar zu machen.",
        },
        {
          kind: "paragraph",
          text: "Im Rahmen der Benutzung unserer Webseite werden dabei Daten, wie insbesondere Ihre IP-Adresse und Ihre Nutzeraktivitäten an Server des Unternehmens Google Ireland Limited übertragen.",
        },
        // sic: der vorstehende Satz wird im Original mit „von Google" wiederholt
        {
          kind: "paragraph",
          text: "Wir führen diese Analyse auf Basis des Tracking-Services von Google durch, um unser Internetangebot ständig zu optimieren und besser verfügbar zu machen.",
        },
        { kind: "paragraph", text: "Ebenso benötigen wir das Webtracking aus Sicherheitsgründen." },
        {
          kind: "paragraph",
          text: "Durch das Webtracking können wir nachverfolgen, ob Dritte unsere Website angreifen.",
        },
        {
          kind: "paragraph",
          text: "Durch die Informationen des Webtrackers können wir wirksame Gegenmaßnahmen ergreifen und die durch uns verarbeiteten personenbezogenen Daten vor diesen Cyberangriffen schützen.",
        },
        {
          kind: "paragraph",
          text: "Durch die Aktivierung der IP-Anonymisierung innerhalb des Google-Analytics Tracking-Codes dieser Internetseite, wird Ihre IP-Adresse von Google-Analytics vor der Übertragung anonymisiert.",
        },
        {
          kind: "paragraph",
          text: "Diese Website nutzt einen Google-Analytics-Tracking-Code, der um den Operator gat._anonymizeIp(); erweitert wurde, um nur eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu ermöglichen.",
        },
      ],
    },
    {
      id: "google-analytics-rechtsgrundlage",
      heading: "Rechtsgrundlage für die Verarbeitung personenbezogener Daten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Datenverarbeitung ist gemäß Art. 6 Abs. 1 lit. a DSGVO Ihre Einwilligung in unserem Hinweisbanner bezüglich der Nutzung von Cookies und Webtracking (Einwilligung durch eindeutige bestätigende Handlung bzw. Verhaltensweise).",
        },
      ],
    },
    {
      id: "google-analytics-zweck",
      heading: "Zweck der Datenverarbeitung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "In unserem Auftrag wird Google diese Informationen nutzen, um Ihren Besuch auf dieser Internetseite auszuwerten, Reports über die Websiteaktivitäten zusammenzustellen und um weitere, mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen, gegenüber uns zu erbringen.",
        },
        { kind: "paragraph", text: "Ebenso benötigen wir das Webtracking aus Sicherheitsgründen." },
        {
          kind: "paragraph",
          text: "Durch das Webtracking können wir nachverfolgen, ob Dritte unsere Website angreifen.",
        },
        {
          kind: "paragraph",
          text: "Durch die Informationen des Webtrackers können wir wirksame Gegenmaßnahmen ergreifen und die durch uns verarbeiteten personenbezogenen Daten vor diesen Cyberangriffen schützen.",
        },
      ],
    },
    {
      id: "google-analytics-dauer",
      heading: "Dauer der Speicherung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Google wird die für die Bereitstellung des Webtracking relevanten Daten solange speichern, wie es notwendig ist, um den gebuchten Webservice zu erfüllen.",
        },
        { kind: "paragraph", text: "Die Datenerhebung und Speicherung erfolgt anonymisiert." },
        {
          kind: "paragraph",
          text: "Soweit doch Personenbezug bestehen sollte, werden die Daten unverzüglich gelöscht, soweit diese keinen gesetzlichen Aufbewahrungspflichten unterfallen.",
        },
        {
          kind: "paragraph",
          text: "In jedem Fall erfolgt die Löschung nach Ablauf der Aufbewahrungspflicht.",
        },
      ],
    },
    {
      id: "google-analytics-widerspruch",
      heading: "Widerspruchs- und Löschungsmöglichkeiten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie können die Erfassung und Weiterleitung der personenbezogenen Daten an Google (insb. Ihrer IP-Adresse) sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie die Ausführung von Script-Code in Ihrem Browser deaktivieren oder die „Do Not Track\" Einstellung Ihres Browsers aktivieren.",
        },
        {
          kind: "paragraph",
          text: "Sie können darüber hinaus die Erfassung der durch den Google-Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link ( http://tools.google.com/dlpage/gaoptout?hl=de) verfügbare Browser-Plug-In herunterladen und installieren.",
        },
        {
          kind: "paragraph",
          text: "Die Sicherheits- und Datenschutzgrundsätze von Google finden Sie unter https://policies.google.com/privacy?hl=de.",
        },
      ],
    },
    {
      id: "externe-webservices",
      heading: "Einbindung externer Webservices und Verarbeitung von Daten außerhalb der EU",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Auf unserer Internetseite verwenden wir aktive Inhalte von externen Anbietern, sog. Webservices. Durch Aufruf unserer Internetseite erhalten diese externen Anbieter ggf. personenbezogene Informationen über Ihren Besuch auf unserer Internetseite. Hierbei ist ggf. eine Verarbeitung von Daten außerhalb der EU möglich. Sie können dies verhindern, indem Sie ein entsprechendes Browser-Plugin installieren oder das Ausführen von Scripten in Ihrem Browser deaktivieren. Hierdurch kann es zu Funktionseinschränkungen auf Internetseiten kommen, die Sie besuchen.",
        },
        { kind: "paragraph", text: "Wir verwenden folgende externe Webservices:" },
      ],
    },
    {
      id: "webservice-jsdelivr",
      heading: "Jsdelivr",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst Jsdelivr des Unternehmens Prospect One Sp., Krolweska 65A, 30-081 Krakow, Polen, E-Mail: hello@prospectone.io, Website: https://prospectone.io/.",
        },
        {
          kind: "paragraph",
          text: "Die Verarbeitung erfolgt auch in einem Drittstaat, für den kein Angemessenheitsbeschluss der Kommission vorliegt.",
        },
        {
          kind: "paragraph",
          text: "Daher kann das für die DSGVO übliche Schutzniveau bei der Übermittlung nicht gewährleistet werden, da nicht auszuschließen ist, dass im Drittland z.B. Behörden Zugriff auf die erhobenen Daten nehmen können.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt gem. Art. 6 Abs. 1 lit. f DSGVO unser berechtigtes Interesse an der Verarbeitung dar.",
        },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse liegt in der Erreichung des nachfolgend geschilderten Zwecks.",
        },
        {
          kind: "paragraph",
          text: "Bei JSDelivr handelt es sich um ein Content Delivery Network, das unsere Inhalte über verschiedene Server spiegelt, um eine optimale Erreichbarkeit weltweit sicherzustellen.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf die Verarbeitung steht Ihnen das in Art. 21 aufgeführte Widerspruchsrecht zu.",
        },
        {
          kind: "paragraph",
          text: "Nähere Informationen finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.jsdelivr.com/privacy-policy-jsdelivr-com.",
        },
      ],
    },
    {
      id: "webservice-mono-maps",
      heading: "Mono Maps",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst Mono Maps des Unternehmens Mono Solutions ApS, Nannasgade 28, 2200 Copenhagen, Dänemark, E-Mail: sales@maptiler.com, Website: https://www.monosolutions.com/privacy-policy.",
        },
        {
          kind: "paragraph",
          text: "Die Übermittlung und Verarbeitung personenbezogener Daten erfolgt ausschließlich auf Servern in der europäischen Union.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt gem. Art. 6 Abs. 1 lit. f DSGVO unser berechtigtes Interesse an der Verarbeitung dar.",
        },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse liegt in der Erreichung des nachfolgend geschilderten Zwecks.",
        },
        {
          kind: "paragraph",
          text: "Über Mono Maps wird auf unserer Internetseite ein Kartendienst eingebunden, der die Navigation und die Anzeige unserer Geschäftsstandorte ermöglicht.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf die Verarbeitung steht Ihnen das in Art. 21 aufgeführte Widerspruchsrecht zu.",
        },
        {
          kind: "paragraph",
          text: "Nähere Informationen finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.monosolutions.com/privacy-policy.",
        },
      ],
    },
    {
      id: "webservice-mono-cdn",
      heading: "Mono Solutions CDN",
      level: 3,
      blocks: [
        // sic: Leerzeichen vor dem Komma nach „ApS" steht so im Original
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst Mono Solutions CDN des Unternehmens Mono Solutions ApS , Hejrevej 28, 1., 2200 København NV, Dänemark, Website: https://www.mono.net/.",
        },
        {
          kind: "paragraph",
          text: "Die Übermittlung und Verarbeitung personenbezogener Daten erfolgt ausschließlich auf Servern in der europäischen Union.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt gem. Art. 6 Abs. 1 lit. f DSGVO unser berechtigtes Interesse an der Verarbeitung dar.",
        },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse liegt in der Erreichung des nachfolgend geschilderten Zwecks.",
        },
        {
          kind: "paragraph",
          text: "Mono Solutions CDN ist ein Content Delivery Network, das unsere Inhalte über verschiedene Server spiegelt, um eine optimale Erreichbarkeit weltweit sicherzustellen.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf die Verarbeitung steht Ihnen das in Art. 21 aufgeführte Widerspruchsrecht zu.",
        },
        {
          kind: "paragraph",
          text: "Nähere Informationen finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.mono.net/privacy-policy.",
        },
      ],
    },
    {
      id: "webservice-schriftarten",
      heading: "Schriftarteinbindung via Mono",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst Schriftarteinbindung via Mono des Unternehmens Mono Solutions ApS, Nannasgade 28, 2200 Copenhagen, Dänemark.",
        },
        {
          kind: "paragraph",
          text: "Die Übermittlung und Verarbeitung personenbezogener Daten erfolgt ausschließlich auf Servern in der europäischen Union.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt gem. Art. 6 Abs. 1 lit. f DSGVO unser berechtigtes Interesse an der Verarbeitung dar.",
        },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse liegt in der Erreichung des nachfolgend geschilderten Zwecks.",
        },
        {
          kind: "paragraph",
          text: "Bei diesem Dienst handelt es sich um ein Content Delivery Network (CDN) vom Anbieter Mono Solutions ApS. Hierbei werden Inhalte über verschiedene Server gespiegelt, um eine optimale Erreichbarkeit weltweit sicherzustellen. Durch diesen Dienst können die Schriftarten von Google Fonts auf unserer Webseite nachgeladen werden. Eine Weitergabe der IP-Adresse des Seitenbesuchers an Google erfolgt nicht.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf die Verarbeitung steht Ihnen das in Art. 21 aufgeführte Widerspruchsrecht zu.",
        },
        {
          kind: "paragraph",
          text: "Nähere Informationen finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.mono.net/privacy-policy.",
        },
      ],
    },
    {
      id: "webservice-website-check",
      heading: "Website-Check Siegel",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst Website-Check Siegel des Unternehmens Website-Check GmbH, Beethovenstraße 24, 66111 Saarbrücken, Deutschland, E-Mail: support@website-check.de, Website: https://www.website-check.de/.",
        },
        {
          kind: "paragraph",
          text: "Die Übermittlung und Verarbeitung personenbezogener Daten erfolgt ausschließlich auf Servern in der europäischen Union.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt gem. Art. 6 Abs. 1 lit. f DSGVO unser berechtigtes Interesse an der Verarbeitung dar.",
        },
        {
          kind: "paragraph",
          text: "Unser berechtigtes Interesse liegt in der Erreichung des nachfolgend geschilderten Zwecks.",
        },
        {
          kind: "paragraph",
          text: "Bei dem Script der Website-Check GmbH handelt es sich um die technische Einbindung des Website-Check Siegels. Mit diesem Siegel möchten wir zeigen, dass wir das Thema Datenschutz sehr ernst nehmen. Die Übermittlung von Daten an die Website-Check GmbH erfolgt zur Auslieferung und Darstellung des Siegels auf unserer Seite.",
        },
        {
          kind: "paragraph",
          text: "Im Hinblick auf die Verarbeitung steht Ihnen das in Art. 21 aufgeführte Widerspruchsrecht zu.",
        },
        {
          kind: "paragraph",
          text: "Nähere Informationen finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.website-check.de/datenschutzerklaerung/.",
        },
      ],
    },
    {
      id: "webservice-cookiebot",
      heading: "cookiebot.com",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst cookiebot.com des Unternehmens Cybot A/S, Havnegade 39, 1058 Kopenhagen, Dänemark.",
        },
        {
          kind: "paragraph",
          text: "Die Übermittlung und Verarbeitung personenbezogener Daten erfolgt ausschließlich auf Servern in der europäischen Union.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung und Verarbeitung stellt Art. 6 Abs. 1 lit. c DSGVO dar.",
        },
        {
          kind: "paragraph",
          text: "Der Einsatz des Dienstes unterstützt uns dabei unseren rechtlichen Verpflichtungen nachzukommen.",
        },
        {
          kind: "paragraph",
          text: "Durch die Einbindung von Cookiebot erfüllen wir unsere rechtliche Verpflichtung im Hinblick auf das für Cookies notwendige Einwilligungsmanagement.",
        },
        {
          kind: "paragraph",
          text: "Welche Rechte Ihnen im Hinblick auf die Verarbeitung zustehen, finden Sie am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.cookiebot.com/de/privacy-policy/.",
        },
      ],
    },
    {
      id: "webservice-hcaptcha",
      heading: "hcaptcha",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir verwenden auf unserer Seite den Dienst hcaptcha des Unternehmens Intuition Machines, Inc., 2211 Selig Drive, 90026 Los Angeles, Vereinigte Staaten, E-Mail: support@imachines.com, Website: https://www.hcaptcha.com/.",
        },
        {
          kind: "paragraph",
          text: "Die Verarbeitung erfolgt auch in einem Drittstaat, für den kein Angemessenheitsbeschluss der Kommission vorliegt.",
        },
        {
          kind: "paragraph",
          text: "Daher kann das für die DSGVO übliche Schutzniveau bei der Übermittlung nicht gewährleistet werden, da nicht auszuschließen ist, dass im Drittland z.B. Behörden Zugriff auf die erhobenen Daten nehmen können.",
        },
        {
          kind: "paragraph",
          text: "Rechtsgrundlage für die Übermittlung der personenbezogenen Daten stellt Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO dar, die Sie auf unserer Internetseite getätigt haben.",
        },
        {
          kind: "paragraph",
          text: "Bei dem Dienst handelt es sich um ein Plugin, das wir benötigen, um Ihnen alle Inhalte unserer Website anzeigen zu können. Das Plugin macht unsere Website für unsere Seitenbesucher attraktiver und besser erlebbar.",
        },
        { kind: "paragraph", text: "Ihre Einwilligung können Sie jederzeit widerrufen." },
        {
          kind: "paragraph",
          text: "Nähere Informationen zum Widerruf Ihrer Einwilligung finden Sie entweder bei der Einwilligung selbst oder am Ende dieser Datenschutzerklärung.",
        },
        {
          kind: "paragraph",
          text: "Weitere Informationen zum Handling der übertragenen Daten finden Sie in der Datenschutzerklärung des Anbieters unter https://www.hcaptcha.com/terms.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "Unterrichtung über die Nutzung von Cookies",
      level: 2,
      blocks: [],
    },
    {
      id: "cookies-umfang",
      heading:
        "Welche personenbezogenen Daten werden erhoben und in welchem Umfang werden diese verarbeitet?",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Auf verschiedenen Seiten integrieren und verwenden wir Cookies, um bestimmte Funktionen unserer Website zu ermöglichen und externe Webservices zu integrieren.",
        },
        {
          kind: "paragraph",
          text: "Bei den sogenannten \"Cookies\" handelt es sich um kleine Textdateien, die Ihr Browser auf Ihrem Zugangsgerät speichern kann.",
        },
        {
          kind: "paragraph",
          text: "Diese Textdateien enthalten eine charakteristische Zeichenkette, die den Browser eindeutig identifiziert, wenn Sie zu unserer Website zurückkehren.",
        },
        {
          kind: "paragraph",
          text: "Der Prozess des Speicherns einer Cookie-Datei wird auch als \"Setzen eines Cookies\" bezeichnet.",
        },
        {
          kind: "paragraph",
          text: "Cookies können hierbei sowohl von der Website selbst als auch von externen Webservices gesetzt werden.",
        },
        {
          kind: "paragraph",
          text: "Die Cookies werden von unserer Website bzw. den externen Webservices gesetzt, um die volle Funktionalität unserer Website zu erhalten, die Benutzerfreundlichkeit zu verbessern oder um den mit Ihrer Einwilligung angegebenen Zweck zu verfolgen.",
        },
        {
          kind: "paragraph",
          text: "Die Cookie-Technologie ermöglicht es uns auch, einzelne Besucher anhand von Pseudonymen, z.B. einer individuellen oder zufälligen IDs, zu erkennen, sodass wir mehr individuelle Dienstleistungen anbieten können.",
        },
        { kind: "paragraph", text: "Details sind in der folgenden Tabelle aufgeführt." },
      ],
    },
    {
      id: "cookies-rechtsgrundlage",
      heading: "Rechtsgrundlage für die Verarbeitung personenbezogener Daten",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Soweit die Cookies auf Basis einer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO verarbeitet werden, gilt diese Einwilligung auch als Einwilligung im Sinne des § 25 Abs. 1 TTDSG für das Setzen des Cookies auf dem Endgerät des Nutzers.",
        },
        {
          kind: "paragraph",
          text: "Soweit eine andere Rechtsgrundlage nach der DSGVO genannt wird (z.B. zur Vertragserfüllung oder zur Erfüllung gesetzlicher Pflichten), erfolgt die Speicherung bzw. das Setzen auf Basis einer Ausnahme gemäß § 25 Abs. 2 TTDSG.",
        },
        {
          kind: "paragraph",
          text: "Diese liegt dann vor, „wenn der alleinige Zweck der Speicherung von Informationen in der Endeinrichtung des Endnutzers oder der alleinige Zweck des Zugriffs auf bereits in der Endeinrichtung des Endnutzers gespeicherte Informationen die Durchführung der Übertragung einer Nachricht über ein öffentliches Telekommunikationsnetz ist\"",
        },
        {
          kind: "paragraph",
          text: "oder „wenn die Speicherung von Informationen in der Endeinrichtung des Endnutzers oder der Zugriff auf bereits in der Endeinrichtung des Endnutzers gespeicherte Informationen unbedingt erforderlich ist, damit der Anbieter eines Telemediendienstes einen vom Nutzer ausdrücklich gewünschten Telemediendienst zur Verfügung stellen kann\".",
        },
        {
          kind: "paragraph",
          text: "Welche Rechtsgrundlage einschlägig ist, ergibt sich aus der später in diesem Punkt aufgeführten Cookie-Tabelle.",
        },
      ],
    },
    {
      id: "cookies-zweck",
      heading: "Zweck der Datenverarbeitung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Cookies werden von unserer Website bzw. den externen Webservices gesetzt, um die volle Funktionalität unserer Website zu erhalten, die Benutzerfreundlichkeit zu verbessern oder um den mit Ihrer Einwilligung angegebenen Zweck zu verfolgen.",
        },
        {
          kind: "paragraph",
          text: "Die Cookie-Technologie ermöglicht es uns auch, einzelne Besucher anhand von Pseudonymen, z.B. einer individuellen oder zufälligen IDs, zu erkennen, so dass wir mehr individuelle Dienstleistungen anbieten können.",
        },
        { kind: "paragraph", text: "Details sind in der folgenden Tabelle aufgeführt." },
      ],
    },
    {
      id: "cookies-dauer",
      heading: "Dauer der Speicherung",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Speicherung unserer Cookies erfolgt bis zur Löschung in Ihrem Browser oder, wenn es sich um einen Session-Cookie handelt, bis die Session abgelaufen ist.",
        },
        { kind: "paragraph", text: "Details sind in der folgenden Tabelle aufgeführt." },
      ],
    },
    {
      id: "cookies-widerspruch",
      heading: "Widerspruchs- und Beseitigungsmöglichkeit",
      level: 4,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie können Ihren Browser nach Ihren Wünschen so einstellen, dass das Setzen von Cookies generell verhindert wird.",
        },
        {
          kind: "paragraph",
          text: "Sie können dann von Fall zu Fall über die Annahme von Cookies entscheiden oder Cookies grundsätzlich akzeptieren.",
        },
        {
          kind: "paragraph",
          text: "Cookies können für verschiedene Zwecke verwendet werden, z.B. um zu erkennen, dass Ihr Zugangsgerät bereits mit unserer Website verbunden ist (permanente Cookies) oder um zuletzt angesehene Angebote zu speichern (Session-Cookies).",
        },
        {
          kind: "paragraph",
          text: "Wenn Sie uns ausdrücklich die Erlaubnis erteilt haben, Ihre personenbezogenen Daten zu verarbeiten können Sie diese Einwilligung jederzeit widerrufen.",
        },
        {
          kind: "paragraph",
          text: "Bitte beachten Sie, dass die Rechtmäßigkeit der auf der Grundlage der Einwilligung bis zum Widerruf vorgenommenen Verarbeitung davon nicht berührt wird.",
        },
        {
          kind: "table",
          columns: [
            "Cookie-Name",
            "Server",
            "Anbieter",
            "Zweck",
            "Rechtsgrundlage",
            "Speicherdauer",
            "Typ",
          ],
          rows: [
            [
              "CookieConsent",
              "www.kutscher-stb.de",
              "Webseitenbetreiber",
              "Cookie, der die Entscheidung des Nutzers über das Cookie-Banner speichert.",
              "Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)",
              "ca. 37 Jahre",
              "Cookie-Banner",
            ],
            [
              "_ga",
              "kutscher-stb.de",
              "Google-Analytics",
              "Dieser Cookie ordnet einem User eine ID zu, damit der Webtracker die Aktionen des Nutzers unter diese ID zusammenfassen kann.",
              "Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO (Einwilligung)",
              "ca. 24 Monate",
              "Analytics",
            ],
            [
              "_gat",
              "kutscher-stb.de",
              "Google-Analytics",
              "Dieser Cookie dient zum Drosseln der Anforderungsrate des Webtrackers.",
              "Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO (Einwilligung)",
              "ca. 90 Sekunden",
              "Analytics",
            ],
            [
              "_gid",
              "kutscher-stb.de",
              "Google-Analytics",
              "Dieser Cookie ordnet einem User eine ID zu, damit der Webtracker die Aktionen des Nutzers unter diese ID zusammenfassen kann.",
              "Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO (Einwilligung)",
              "ca. 24 Stunden",
              "Analytics",
            ],
          ],
        },
        {
          kind: "paragraph",
          text: "Sofern Cookies auf Basis Ihrer Einwilligung gesetzt wurden, können Sie Ihre Einwilligung jederzeit in den Cookie-Einstellungen des Cookie-Banners widerrufen.",
        },
        /*
         * Im Original ist „hier" ein Link, der das Cookie-Banner des
         * Baukastens per JavaScript wieder öffnet. Der Neubau muss diesen
         * Link auf sein eigenes Consent-Tool zeigen lassen; der Platzhalter
         * `#cookie-einstellungen` markiert die Stelle.
         */
        {
          kind: "paragraph",
          text: "Die Cookie-Einstellungen können Sie hier anpassen.",
        },
        { kind: "link", label: "hier", href: "#cookie-einstellungen" },
      ],
    },
    {
      id: "datensicherheit",
      heading: "Datensicherheit und Datenschutz, Kommunikation per E-Mail",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Ihre personenbezogenen Daten werden durch technische und organisatorische Maßnahmen so bei der Erhebung, Speicherung und Verarbeitung geschützt, dass sie für Dritte nicht zugänglich sind.",
        },
        {
          kind: "paragraph",
          text: "Bei einer unverschlüsselten Kommunikation per E-Mail kann die vollständige Datensicherheit auf dem Übertragungsweg zu unseren IT-Systemen von uns nicht gewährleistet werden, sodass wir bei Informationen mit hohem Geheimhaltungsbedürfnis eine verschlüsselte Kommunikation oder den Postweg empfehlen.",
        },
      ],
    },
    {
      id: "betroffenenrechte",
      heading:
        "Auskunftsanspruch und Berichtigungswünsche – Löschung & Einschränkung von Daten - Widerruf von Einwilligungen – Widerspruchsrecht",
      level: 2,
      blocks: [],
    },
    {
      id: "auskunftsanspruch",
      heading: "Auskunftsanspruch",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten von Ihnen verarbeiten.",
        },
        {
          kind: "paragraph",
          text: "Sofern dies der Fall ist, haben Sie ein Recht auf Auskunft über die in Art. 15 Abs. 1 DSGVO benannten Informationen, soweit nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden (vgl. Art. 15 Abs. 4 DSGVO).",
        },
        {
          kind: "paragraph",
          text: "Gerne stellen wir Ihnen auch eine Kopie der Daten zur Verfügung.",
        },
      ],
    },
    {
      id: "berichtigungsanspruch",
      heading: "Berichtigungsanspruch",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie haben gem. Art. 16 DSGVO das Recht, bei uns ggf. falsch hinterlegte personenbezogene Daten (wie z.B. Adresse, Name, etc.) jederzeit korrigieren zu lassen.",
        },
        {
          kind: "paragraph",
          text: "Auch können Sie jederzeit eine Vervollständigung der bei uns gespeicherten Daten verlangen.",
        },
        { kind: "paragraph", text: "Eine entsprechende Anpassung erfolgt unverzüglich." },
      ],
    },
    {
      id: "recht-auf-loeschung",
      heading: "Recht auf Löschung",
      level: 3,
      blocks: [
        // sic: „Art. 17 Abs. Abs. 1 DSGVO" — „Abs." doppelt im Original
        {
          kind: "paragraph",
          text: "Sie haben gem. Art. 17 Abs. Abs. 1 DSGVO das Recht darauf, dass wir die über Sie erhobenen personenbezogenen Daten löschen, wenn",
        },
        {
          kind: "list",
          items: [
            "die Daten entweder nicht mehr benötigt werden;",
            "aufgrund des Widerrufs Ihrer Einwilligung die Rechtsgrundlage der Verarbeitung ersatzlos entfallen ist;",
            "Sie Widerspruch gegen die Verarbeitung eingelegt haben und keine berechtigten Gründe für die Verarbeitung vorliegen;",
            "Ihre Daten unrechtmäßig verarbeitet werden;",
            "eine rechtliche Verpflichtung dies erfordert oder eine Erhebung gem. Art. 8 Abs. 1 DSGVO stattgefunden hat.",
          ],
        },
        {
          kind: "paragraph",
          text: "Das Recht besteht gem. Art. 17 Abs. 3 DSGVO dann nicht, wenn",
        },
        {
          kind: "list",
          items: [
            "die Verarbeitung zur Ausübung des Rechtes auf freie Meinungsäußerung und Information erforderlich ist;",
            "Ihre Daten auf Grundlage einer rechtlichen Verpflichtung erhoben worden sind;",
            "die Verarbeitung aus Gründen des öffentlichen Interesses erforderlich ist;",
            "die Daten zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich sind.",
          ],
        },
      ],
    },
    {
      id: "recht-auf-einschraenkung",
      heading: "Recht auf Einschränkung der Verarbeitung",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Gem. Art. 18 Abs. 1 DSGVO haben Sie in einzelnen Fällen das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
        },
        { kind: "paragraph", text: "Dies ist dann der Fall, wenn" },
        {
          kind: "list",
          items: [
            "die Richtigkeit der personenbezogenen Daten von Ihnen bestritten wird;",
            "die Verarbeitung unrechtmäßig ist und Sie einer Löschung nicht zustimmen;",
            "die Daten nicht länger für den Verarbeitungszweck benötigt werden, aber die erhobenen Daten der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dienen;",
            "ein Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DSGVO eingelegt worden ist und noch unklar ist, welche Interessen überwiegen.",
          ],
        },
      ],
    },
    {
      id: "recht-auf-widerruf",
      heading: "Recht auf Widerruf",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Sofern Sie uns eine ausdrückliche Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten erteilt haben (Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO) können Sie diese jederzeit widerrufen.",
        },
        {
          kind: "paragraph",
          text: "Bitte beachten Sie, dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung hierdurch nicht berührt wird.",
        },
      ],
    },
    {
      id: "recht-auf-widerspruch",
      heading: "Recht auf Widerspruch",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie haben gem. Art. 21 DSGVO das Recht, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. f (im Rahmen eines berechtigten Interesses) erhoben worden sind, Widerspruch einzulegen.",
        },
        {
          kind: "paragraph",
          text: "Das Recht steht Ihnen nur zu, wenn gegen die Speicherung und Verarbeitung besondere Umstände sprechen.",
        },
      ],
    },
    {
      id: "rechte-wahrnehmen",
      heading: "Wie nehmen Sie Ihre Rechte wahr?",
      level: 3,
      blocks: [
        {
          kind: "paragraph",
          text: "Ihre Rechte können Sie jederzeit wahrnehmen, indem Sie sich an die unten stehenden Kontaktdaten wenden:",
        },
        {
          kind: "address",
          lines: [
            "Frank Kutscher Steuerberatungsgesellschaft mbH",
            "Naßäckerstr. 12",
            "07381 Pößneck",
            "Deutschland",
            "E-Mail: frank.kutscher@kutscher-stb.de",
            "Tel.: 0364744558200",
            "Fax: 0364744558257",
          ],
        },
      ],
    },
    {
      id: "datenuebertragbarkeit",
      heading: "Recht auf Datenübertragbarkeit",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Sie haben gem. Art. 20 DSGVO einen Anspruch auf Übermittlung der Sie betreffenden personenbezogenen Daten.",
        },
        {
          kind: "paragraph",
          text: "Die Daten werden von uns in einem strukturierten, gängigen und maschinenlesbaren Format zur Verfügung gestellt.",
        },
        {
          kind: "paragraph",
          text: "Die Daten können hierbei wahlweise an Sie selbst oder an einen von Ihnen benannten Verantwortlichen übersendet werden.",
        },
        {
          kind: "paragraph",
          text: "Wir stellen Ihnen auf Anfrage gem. Art. 20 Abs. 1 DSGVO folgende Daten bereit:",
        },
        {
          kind: "list",
          items: [
            "Daten, die aufgrund einer ausdrücklichen Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art. 9 Abs. 2 lit. a DSGVO erhoben wurden;",
            // sic: „die wir gemäß gem." — doppelte Angabe im Original
            "Daten, die wir gemäß gem. Art. 6 Abs. 1 lit. b DSGVO im Rahmen bestehender Verträge von Ihnen erhalten haben;",
            "Daten, die im Rahmen eines automatisierten Verfahrens verarbeitet worden sind.",
          ],
        },
        {
          kind: "paragraph",
          text: "Die Übertragung der personenbezogenen Daten direkt an einen von Ihnen gewünschten Verantwortlichen werden wir vornehmen, soweit dies technisch machbar ist.",
        },
        {
          kind: "paragraph",
          text: "Bitte beachten Sie, dass wir Daten, die in die Freiheiten und Rechte anderer Personen eingreifen gem. Art. 20 Abs. 4 DSGVO nicht übertragen dürfen.",
        },
      ],
    },
    {
      id: "beschwerderecht",
      heading: "Beschwerderecht bei der Aufsichtsbehörde gem. Art. 77 Abs. 1 DSGVO",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Sofern Sie den Verdacht haben, dass auf unserer Seite Ihre Daten rechtswidrig verarbeitet werden, können Sie selbstverständlich jederzeit eine gerichtliche Klärung der Problematik herbeiführen.",
        },
        { kind: "paragraph", text: "Zudem steht Ihnen jede andere rechtliche Möglichkeit offen." },
        {
          kind: "paragraph",
          text: "Unabhängig davon steht Ihnen gem. Art. 77 Abs. 1 DSGVO die Möglichkeit zur Verfügung, sich an eine Aufsichtsbehörde zu wenden.",
        },
        {
          kind: "paragraph",
          text: "Das Beschwerderecht gem. Art. 77 DSGVO steht Ihnen in dem EU-Mitgliedstaat Ihres Aufenthaltsortes, Ihres Arbeitsplatzes und/oder des Ortes des vermeintlichen Verstoßes zu, d.h. Sie können die Aufsichtsbehörde, an die Sie sich wenden, aus den oben genannten Orten wählen.",
        },
        {
          kind: "paragraph",
          text: "Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet Sie dann über den Stand und die Ergebnisse Ihrer Eingabe, einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs gem. Art. 78 DSGVO.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Barrierefreiheitserklärung                                                  */
/* -------------------------------------------------------------------------- */

export const BARRIEREFREIHEITSERKLAERUNG: LegalDocument = {
  slug: "barrierefreiheitserklarung",
  title: "Barrierefreiheitserklärung",
  intro: [
    {
      kind: "paragraph",
      text: "Wir sind bemüht, unsere Dienstleistungen so anzubieten, dass diese für alle Nutzer zugänglich sind. Dies im Einklang mit dem Barrierefreiheitsstärkungsgesetz (BFSG) sowie der Verordnung über die Barrierefreiheitsanforderungen für Produkte und Dienstleistungen nach dem Barrierefreiheitsstärkungsgesetz (BFSGV).",
    },
    {
      kind: "paragraph",
      text: "Die konkreten technischen Maßnahmen orientieren sich vorliegend an der EN 301 549 V3.2.1 und den Richtlinien der Web Content Accessibility Guidelines (WCAG) der Version 2.2 mit den Konformitätsstufen A und AA.",
    },
  ],
  sections: [
    {
      id: "seitenbetreiber",
      heading: "1. Angaben zum Seitenbetreiber",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Die Angaben zum Seitenbetreiber können Sie in unserem Impressum abrufen.",
        },
      ],
    },
    {
      id: "stand",
      heading: "2. Stand der Barrierefreiheit",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir möchten, dass unsere Website für alle Menschen gut nutzbar ist. Deshalb wird unsere Website regelmäßig automatisch geprüft. Unsere betreuende Agentur passt die Website außerdem immer wieder an, damit sie möglichst barrierefrei bleibt.",
        },
        {
          kind: "paragraph",
          text: "Unsere Website ist durch diese Maßnahmen bereits sehr barrierefrei. Wenn Sie trotzdem Schwierigkeiten haben, bestimmte Angebote zu nutzen, können Sie sich gerne bei uns melden. Unsere Kontaktdaten finden Sie weiter unten auf dieser Seite.",
        },
      ],
    },
    {
      id: "beschreibung",
      heading: "3. Allgemeine Beschreibung der Dienstleistung",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Gegenstand dieser Website ist die digitale Darstellung unseres Unternehmens sowie unserer Dienstleistungen und Produkte.",
        },
        {
          kind: "paragraph",
          text: "Sie stellt umfangreiche Informationen zu unseren Produkten und Dienstleistungen bereit und ermöglicht verschiedene Kontakt- und Interaktionsmöglichkeiten.",
        },
        { kind: "paragraph", text: "So finden Sie auf unserer Seite:" },
        {
          kind: "list",
          items: [
            "Kontaktoptionen per Telefon oder E-Mail",
            "Ein Kontaktformular, über das Sie mit uns in Kontakt treten können",
            "Eine Funktion zur Terminvereinbarung",
            "Die Möglichkeit unmittelbar in unserem Shopsystem einkaufen zu können",
            "Eine Karte, auf der Sie unsere Standorte sehen",
          ],
        },
      ],
    },
    {
      id: "durchfuehrung",
      heading: "4. Erläuterungen zur Durchführung der Dienstleistung",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Zur Nutzung unserer Dienstleistung müssen Sie die auf der Seite angezeigten Schritte befolgen und alle notwendigen Informationen bereitstellen. Wir geben uns Mühe, alle Infos auf unserer Website klar und einfach zu erklären. Auch die Farben und die Schrift sind so gewählt, dass man alles gut lesen kann. Unsere Website passt sich außerdem an jedes Gerät an, egal ob Handy, Tablet oder Computer.",
        },
        {
          kind: "paragraph",
          text: "Auch beim Ausfüllen von Formularen oder beim Auswählen von Dingen achten wir darauf, dass alles leicht geht. Felder, Kästchen und Knöpfe sind deutlich beschriftet und so angeordnet, dass Sie alles auch nur mit der Tastatur bedienen können.",
        },
        /*
         * Die Erklärung ist eine Standardvorlage: Terminbuchungsformular und
         * Online-Shop werden beschrieben, obwohl die Seite beides nicht hat.
         * Der Text wird trotzdem unverändert übernommen; ob er gekürzt wird,
         * entscheidet der Mandant.
         */
        {
          kind: "list",
          items: [
            "Kontaktformular: Sie müssen zur Kontaktaufnahme die vorgesehenen Felder ausfüllen und Ihre Anfrage absenden. Vor dem Absenden müssen Sie noch unseren Spam-Schutz anklicken/auswählen und bestätigen. Das Kontaktformular ist vollständig mit der Tastatur bedienbar und aussagekräftig beschrieben.",
            "Terminbuchungsformular: Im Rahmen unseres Terminbuchungsformulars müssen Sie die notwendigen Pflichtangaben wie z.B. Datum, E-Mail-Adresse angeben und den dahinterliegenden Prozess durchlaufen. Nach Abschluss des Prozesses ist der Termin für Sie im Regelfall reserviert. Bitte beachten Sie, dass Sie eine gesonderte Terminbestätigung von uns erhalten. Alternativ können Sie uns auch anrufen oder per E-Mail kontaktieren.",
            "Online-Shop: Auf unserer Webseite ist ein Online-Shop integriert. Nähere Informationen zur Wahrnehmung des Angebotes und zu den Bedingungen finden Sie in unseren AGB. Die Einlage von Waren und das Durchlaufen des Bestellprozesses werden in diesen erläutert.",
            "Standort-Karte: Die auf der Website eingebundene Karte können Sie im Rahmen der üblichen Interaktionsmöglichkeiten bedienen. Zum Zoomen stehen Ihnen die in die Karte integrierten Bedienelemente zur Verfügung. Zudem kann die Karte mit der Tastatur gesteuert werden (Pfeiltasten zur Navigation, „+\" und „–\" zum Zoomen).",
          ],
        },
      ],
    },
    {
      id: "anforderungen",
      heading: "5. Erfüllung der Anforderungen",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Wir legen großen Wert darauf, unsere Dienstleistung für möglichst viele Nutzer zugänglich zu machen und arbeiten kontinuierlich an der Verbesserung der Barrierefreiheit. Dabei berücksichtigen wir verschiedene Aspekte, die ein inklusives Nutzungserlebnis ermöglichen sollen.",
        },
        {
          kind: "paragraph",
          text: "Visuelle Inhalte wie Bilder und Grafiken sind mit aussagekräftigen Alternativtexten (Alt-Texten) versehen, um Nutzern von Screenreadern relevante Informationen zugänglich zu machen. Wir stellen zudem sicher, dass Informationen nicht ausschließlich über Farben vermittelt werden, um auch Personen mit Farbsehschwächen oder blinden Nutzerinnen und Nutzern alle Inhalte zugänglich zu machen. Die Kontraste sind so gestaltet, dass sie weitestgehend den WCAG 2.2 AA Richtlinien entsprechen, um eine gute Lesbarkeit zu gewährleisten.",
        },
        {
          kind: "paragraph",
          text: "Die Bedienung der Dienstleistung ist über die Tastatur vollständig möglich, sodass keine Maus erforderlich ist. Die Fokus-Reihenfolge ist logisch aufgebaut, was die Navigation für Tastatur-Nutzer erheblich erleichtert. Wir achten darauf, dass Nutzer ausreichend Zeit haben, Inhalte zu lesen und Interaktionen durchzuführen, um unnötigen Zeitdruck zu vermeiden.",
        },
        {
          kind: "paragraph",
          text: "Formulare sind klar strukturiert und benutzerfreundlich gestaltet. Fehlermeldungen sind verständlich formuliert und bieten konkrete Hilfestellungen zur Korrektur von Eingaben. Die Navigation ist konsistent und einfach zu verstehen, was die Orientierung innerhalb der Dienstleistung erleichtert.",
        },
        {
          kind: "paragraph",
          text: "Die Sprache ist klar und prägnant gehalten. Wo Fachbegriffe unumgänglich sind, werden diese erklärt, um die Verständlichkeit für alle Nutzer zu erhöhen. Die Benutzeroberfläche ist vorhersehbar, was bedeutet, dass sich Elemente so verhalten, wie es Nutzer erwarten würden, und somit die Lernkurve reduziert wird. Um die Nutzung zusätzlich zu erleichtern, stehen Eingabehilfen und Anleitungen zur Verfügung.",
        },
        {
          kind: "paragraph",
          text: "Wir arbeiten kontinuierlich daran, die Kompatibilität unserer Dienstleistungen mit einer Vielzahl von Assistenztechnologien sicherzustellen. Dazu gehören gängige Screenreader (z.B. NVDA, JAWS), Sprachsteuerungssoftware und Vergrößerungssoftware. Ziel ist es, ein reibungsloses Zusammenspiel zu ermöglichen, damit Nutzer ihre bevorzugten Hilfsmittel effektiv einsetzen können.",
        },
        {
          kind: "paragraph",
          text: "Wir sind bestrebt, die Zugänglichkeit unserer Dienstleistung auf Basis der obigen und weiteren Kriterien kontinuierlich zu überprüfen und zu verbessern.",
        },
      ],
    },
    {
      id: "erstellung",
      heading: "6. Erstellung und Überprüfung dieser Erklärung, Meldung von Barrieren",
      level: 2,
      blocks: [
        // sic: US-Datumsformat „1/6/2026" auf einer deutschsprachigen Seite
        {
          kind: "paragraph",
          text: "Diese Erklärung wurde zuletzt am 1/6/2026 überarbeitet. Grundlage ist eine Selbstbewertung (interne Tests mit verschiedenen Browsern und Tastaturnavigation) sowie teilweise automatisierte Tests.",
        },
        {
          kind: "paragraph",
          text: "Sollten Ihnen Barrieren auf unserer Webseite auffallen, können Sie uns diese jederzeit per E-Mail an manuela.koeber@kutscher-stb.de oder telefonisch unter +49364744558200 melden.",
        },
      ],
    },
    {
      id: "schlichtungsverfahren",
      heading: "7. Schlichtungsverfahren",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Wenn Sie der Meinung sind, dass diese Website nicht barrierefrei zugänglich ist, können Sie uns gerne kontaktieren.",
        },
        {
          kind: "paragraph",
          text: "Alternativ können Sie sich auch an die Schlichtungsstelle wenden. Diese erreichen Sie unter folgenden Kontaktdaten:",
        },
        {
          kind: "address",
          lines: [
            "Schlichtungsstelle nach dem Behindertengleichstellungsgesetz bei dem Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen",
            "Mauerstraße 53",
            "10117 Berlin",
            // sic: „+ 30 185 272-805" — Ländervorwahl fehlt, Leerzeichen im Original
            "Telefon: + 30 185 272-805",
            "Fax: +49 30 185 272-901",
            "E-Mail: info@schlichtungsstelle-bgg.de",
          ],
        },
      ],
    },
    {
      id: "marktueberwachung",
      heading: "8. Marktüberwachungsbehörde",
      level: 2,
      blocks: [
        {
          kind: "paragraph",
          text: "Derzeit bestehen Bestrebungen der Länder, eine gemeinsame Marktüberwachungsbehörde zu schaffen. Bis zur Schaffung dieser Stelle obliegt die Marktüberwachung den einzelnen Bundesländern.",
        },
        {
          kind: "paragraph",
          text: "Anfragen können daher entweder an die jeweiligen Bundesländer gerichtet werden oder an folgende Adresse:",
        },
        {
          kind: "address",
          lines: [
            "MLBF",
            "c/o Ministerium für Arbeit, Soziales, Gesundheit und Gleichstellung Sachsen-Anhalt",
            "Postfach 39 11 55",
            "39135 Magdeburg",
            "Telefon: +49 391 5676970",
            "E-Mail: MLBF@ms.sachsen-anhalt.de",
          ],
        },
        {
          kind: "paragraph",
          text: "Anfragen an diese Stelle werden nach Schaffung der Stelle an diese weitergeleitet.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Registry                                                                    */
/* -------------------------------------------------------------------------- */

/** All three documents, for a route that renders them by slug. */
export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [
  IMPRESSUM,
  DATENSCHUTZERKLAERUNG,
  BARRIEREFREIHEITSERKLAERUNG,
];
