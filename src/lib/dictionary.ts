export const dictionary = {
  IT: {
    nav: {
      cases: "Casi",
      map: "Mappa",
      osint: "Metodologia OSINT",
      about: "About",
      login: "Area Riservata",
      casesArchive: "Archivio Casi",
    },
    casesPage: {
        archive: "Archivio Casi",
      selectCase: "Seleziona un caso dalla pellicola",
      evidenceTitle: "Prove Raccolte",
      readDossier: "Esamina Dossier Completo",
      statusInProgress: "IN CORSO",
      statusArchived: "ARCHIVIATO",
    },
    landing: {
    hero: {
      eyebrow: "Dati verificati · Fonti pubbliche",
      titleStart: "Il Data Journalism incontra la",
      titleHighlight: "cronaca nera.",
      description:
        "Analisi di dati, atti pubblici e connessioni temporali per ricostruire i fatti in modo oggettivo e verificato.",
      searchPlaceholder: "Cerca un caso, una prova o un nome...",
      searchButton: "Indaga",
      canvasPlaceholder:
        "[ 🕸️ SPAZIO RISERVATO ALL'ANIMAZIONE GRAFICA INTERATTIVA (Canvas/Network Graph) ]",
      scrollMore: "Scopri di più",
      quickSearches: ["Casi aperti", "Atti pubblici", "Mappa dei luoghi"],
    },
    features: {
      eyebrow: "Strumenti della redazione",
      title: "Un metodo, non solo una notizia.",
      description:
        "Ogni dossier nasce da fonti tracciabili e viene ricostruito con strumenti pensati per la verifica, non per il sensazionalismo.",
      items: [
        {
          title: "Timeline Cronologica",
          description:
            "Riscopri i fatti in ordine sequenziale, con filtri avanzati sulle fonti e sui gradi di attendibilità.",
        },
        {
          title: "Piattaforma OSINT",
          description:
            "Crowdsourcing di documenti pubblici, validati dalla redazione prima di entrare nel dossier.",
        },
        {
          title: "La Lavagna dell'Investigatore",
          description:
            "Collega indizi, luoghi e soggetti coinvolti nel tuo spazio di lavoro riservato, come su una vera board investigativa.",
        },
      ],
    },
    cases: {
      eyebrow: "Dossier aperti",
      title: "Casi in evidenza",
      description:
        "Una selezione dei fascicoli attualmente più consultati sulla piattaforma.",
      statusAnalysis: "In Analisi",
      statusArchived: "Archiviato",
      documentsLabel: "atti",
      connectionsLabel: "connessioni",
      openButton: "Apri",
      viewAllButton: "Visualizza tutti i casi",
      items: [
        {
          code: "CASE_014",
          title: "Caso Garlasco",
          status: "Archiviato",
          description:
            "Ricostruzione cronologica degli atti processuali e delle perizie tecniche depositate nei vari gradi di giudizio.",
          atti: 342,
          connessioni: 58,
          href: "/cases/garlasco",
        },
        {
          code: "CASE_027",
          title: "Caso Pietracatella",
          status: "In Analisi",
          description:
            "Dossier aperto su un caso irrisolto in un piccolo comune del Molise, ricostruito attraverso atti e testimonianze pubbliche.",
          atti: 128,
          connessioni: 24,
          href: "/cases/pietracatella",
        },
        {
          code: "CASE_031",
          title: "Dossier Appalto Nord-Est",
          status: "In Analisi",
          description:
            "Analisi incrociata di appalti pubblici e società collegate, per mappare una rete di controllo poco trasparente.",
          atti: 96,
          connessioni: 31,
          href: "/cases/appalto-nord-est",
        },
      ],
    },
    cta: {
      eyebrow: "Accesso ricercatori",
      title: "Entra nella Control Room",
      description:
        "Registrati per salvare le tue analisi, seguire i dossier attivi e collaborare con la redazione nel tuo spazio di lavoro personale.",
      registerButton: "Richiedi Accesso",
      loginButton: "Ho già un account",
      securityNotice:
        "Ogni richiesta di accesso è verificata manualmente dalla redazione.",
    },
    footer: {
      privacy: "Privacy",
      terms: "Termini",
      contacts: "Contatti",
      disclaimer:
        "I contenuti pubblicati si basano su fonti pubbliche, atti giudiziari e documenti verificabili. The Journal non si sostituisce all'autorità giudiziaria e presume l'innocenza di ogni soggetto coinvolto fino a condanna definitiva.",
      rights: "Tutti i diritti riservati.",
    },
  },
  },
  EN: {
    nav: {
      cases: "Cases",
      map: "Map",
      osint: "OSINT Methodology",
      about: "About",
      login: "Restricted Area",
      casesArchive: "Case Archive",
    },
    casesPage: {
        archive: "Case Archive",
      selectCase: "Select a case from the filmstrip",
      evidenceTitle: "Collected Evidence",
      readDossier: "Examine Full Dossier",
      statusInProgress: "IN PROGRESS",
      statusArchived: "ARCHIVED",
    },
    landing: {
    hero: {
      eyebrow: "Verified Data · Public Sources",
      titleStart: "Data Journalism meets",
      titleHighlight: "true crime.",
      description:
        "Data analysis, public court documents, and chronological timelines to reconstruct facts objectively and accurately.",
      searchPlaceholder: "Search for a case, evidence, or name...",
      searchButton: "Investigate",
      canvasPlaceholder:
        "[ 🕸️ RESERVED SPACE FOR INTERACTIVE GRAPHIC ANIMATION (Canvas/Network Graph) ]",
      scrollMore: "Learn more",
      quickSearches: ["Open cases", "Public records", "Locations map"],
    },
    features: {
      eyebrow: "Editorial Tools",
      title: "A methodology, not just news.",
      description:
        "Every dossier originates from traceable sources and is reconstructed using tools designed for verification, not sensationalism.",
      items: [
        {
          title: "Chronological Timeline",
          description:
            "Rediscover facts in sequential order, with advanced filtering on sources and reliability ratings.",
        },
        {
          title: "OSINT Platform",
          description:
            "Crowdsourced public documents, validated by our editorial team before entering the dossier.",
        },
        {
          title: "Investigator's Whiteboard",
          description:
            "Connect clues, locations, and involved entities in your private workspace, just like a real investigation board.",
        },
      ],
    },
    cases: {
      eyebrow: "Open Dossiers",
      title: "Featured Cases",
      description:
        "A selection of the most frequently consulted case files on the platform.",
      statusAnalysis: "Under Review",
      statusArchived: "Archived",
      documentsLabel: "records",
      connectionsLabel: "links",
      openButton: "Open",
      viewAllButton: "View all cases",
      items: [
        {
          code: "CASE_014",
          title: "Garlasco Case",
          status: "Archived",
          description:
            "Chronological reconstruction of court documents and technical expert opinions filed across various judicial levels.",
          atti: 342,
          connessioni: 58,
          href: "/cases/garlasco",
        },
        {
          code: "CASE_027",
          title: "Pietracatella Case",
          status: "Under Review",
          description:
            "Open dossier on an unsolved case in a small Italian village, reconstructed through public records and testimonies.",
          atti: 128,
          connessioni: 24,
          href: "/cases/pietracatella",
        },
        {
          code: "CASE_031",
          title: "North-East Contract Dossier",
          status: "Under Review",
          description:
            "Cross-analysis of public procurement contracts and linked corporations to map an opaque control network.",
          atti: 96,
          connessioni: 31,
          href: "/cases/appalto-nord-est",
        },
      ],
    },
    cta: {
      eyebrow: "Researchers Access",
      title: "Enter the Control Room",
      description:
        "Sign up to save your analyses, follow active dossiers, and collaborate with the editorial board in your workspace.",
      registerButton: "Request Access",
      loginButton: "I already have an account",
      securityNotice:
        "Each access request is manually reviewed and verified by our editorial team.",
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contacts: "Contact Us",
      disclaimer:
        "Published content is based on public sources, judicial documents, and verifiable records. The Journal does not replace judicial authorities and presumes the innocence of any individual until proven guilty.",
      rights: "All rights reserved.",
    },
  }
  },
} as const;

export type Language = "IT" | "EN";