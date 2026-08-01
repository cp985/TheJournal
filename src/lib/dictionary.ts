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
      canvasPlaceholder:"Ogni indizio è un frammento isolato. Uniamo le nostre informazioni a quelle degli altri detective. Solo ricomponendo il puzzle possiamo portare alla luce la verità sui casi irrisolti.",
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
  about: {
    hero: {
      eyebrow: "Il Progetto",
      titleStart: "Oltre il rumore mediatico,",
      titleHighlight: "solo i dati contano.",
      description: "The Journal nasce dall'esigenza di riportare la cronaca nera e investigativa su un binario di oggettività. Viviamo in un'era in cui i casi giudiziari vengono trasformati in spettacoli televisivi. Noi crediamo in un approccio diverso: analitico, documentato e basato sui dati.",
    },
    mission: {
      eyebrow: "La Nostra Missione",
      title: "Ricostruire la verità attraverso le fonti aperte.",
      p1: "Troppo spesso, i dettagli fondamentali di un'inchiesta si perdono in migliaia di pagine di atti giudiziari inaccessibili al grande pubblico, sostituiti da narrazioni emotive e parziali.",
      p2: "Noi di The Journal applichiamo le metodologie dell'Open Source Intelligence (OSINT) e dello sviluppo software per digitalizzare, indicizzare e collegare i frammenti di informazione sparsi in sentenze, perizie e documenti pubblici.",
      p3: "Creiamo timeline interattive e network graph che permettono a giornalisti, ricercatori e cittadini di esplorare le connessioni spaziali e temporali di un caso, rimuovendo il rumore di fondo e concentrandoci sull'unica cosa che conta: le prove.",
      graphHeader: "OSINT Relational Graph // Case #07",
      graphNodesLabel: "4 Nodi / 3 Evidenze",
      nodeEvidence: "Reperto #A12",
      nodeCentral: "Timeline Evento",
      nodeCentralDate: "13 Aug 2007 - 09:12",
      nodeSignal: "Segnalazione #304",
      nodeAct: "Atto Giudiziario #712",
      statDocuments: "Documenti",
      statConnections: "Connessioni",
      statSources: "Fonti Verificate",
    },
    pillars: {
      eyebrow: "Metodologia",
      title: "I tre pilastri del nostro lavoro",
      items: [
        {
          title: "Data Journalism",
          description: "Raccogliamo, puliamo e incrociamo migliaia di dati pubblici. Dai tabulati alle perizie, trasformiamo fascicoli complessi in database interrogabili e strutturati.",
        },
        {
          title: "Connessioni OSINT",
          description: "Utilizziamo tecniche di Open Source Intelligence per mappare relazioni, movimenti e discrepanze. Ogni nodo del nostro grafo rappresenta un fatto documentato.",
        },
        {
          title: "Oggettività Assoluta",
          description: "Nessun parere personale, nessuna speculazione. Presentiamo i fatti nudi e crudi. Il nostro obiettivo non è emettere sentenze, ma fornire gli strumenti per comprendere.",
        },
      ],
    },
    cta: {
      title: "Esplora i dossier pubblici",
      description: "Accedi all'archivio completo dei casi analizzati. Consulta le timeline, verifica i documenti e traccia le connessioni.",
      archiveButton: "Vai all'Archivio",
      contactButton: "Contatta la Redazione",
      securityNotice: "Tutti i dati provengono da fonti giudiziarie pubbliche.",
    },
  },
  osint: {
    hero: {
      eyebrow: "Metodologia & Protocolli",
      titleStart: "Dalle fonti aperte al",
      titleHighlight: "dato strutturato.",
      description: "Come raccogliamo, verifichiamo e colleghiamo le informazioni. Il nostro processo garantisce la tracciabilità di ogni singolo nodo e la riproducibilità delle analisi.",
    },
    pipeline: {
      eyebrow: "Workflow Analitico",
      title: "La Pipeline di Analisi OSINT",
      step1Title: "1. Acquisizione & Utilizzo dei Dati",
      step1Desc: "Estrazione di dati da atti giudiziari scritti, repository pubblici, tabulati e metadati. Sanitizzazione dei formati e applicazione di OCR avanzato per la digitalizzazione dei documenti cartacei.",
      step2Title: "2. Verificazione & Triangolazione",
      step2Desc: "Ogni fatto o timestamp deve essere confermato da almeno due fonti indipendenti o da un atto ufficiale prima di essere validato nel database.",
      step3Title: "3. Normalizzazione & Grafici",
      step3Desc: "Mappatura di entità (persone, luoghi, reperti, orari) ed estrazione delle relazioni sintattiche e semantiche per la generazione di grafici di rete.",
    },
    standards: {
      eyebrow: "Standard di Trasparenza",
      title: "Principi di Integrità dei Dati",
      items: [
        {
          title: "Catena di Custodia Digitale",
          description: "Ogni documento archiviato presenta un hash crittografico per garantire che l'atto non sia mai stato manipolato dopo l'acquisizione.",
        },
        {
          title: "Integrazione Geospaziale",
          description: "Correlazione delle testimonianze e dei dati cellulari con mappe ad alta risoluzione per verificare la congruenza temporale e spaziale.",
        },
        {
          title: "Accesso Pubblico alle Fonti",
          description: "Nessun dato viene pubblicato senza il riferimento esplicito al fascicolo o alla fonte primaria da cui è stato estratto.",
        },
      ],
    },
    cta: {
      title: "Esplora l'applicazione dei nostri protocolli",
      description: "Consulta i dossier analizzati attraverso la nostra metodologia.",
      button: "Sfoglia i Casi",
    },
  },
  map: {
    sidebar: {
      badge: "Anteprima Mappa OSINT",
      title: "Geolocalizzazione & CELLE",
      subtitle: "Seleziona un dossier per esplorare le coordinate e la sequenza cronologica dei rilievi.",
      publicNotice: "Modalità Pubblica: 12 nodi chiave visualizzati su 142 totali.",
      unlockBtn: "Sblocca Tutti i Nodi",
      caseSelectorLabel: "Dossier Disponibili",
    },
    nodeDetails: {
      title: "Rilievo Selezionato",
      emptyState: "Clicca su un marker sulla mappa o su un evento per analizzare i metadati.",
      typeLabel: "Tipologia",
      timeLabel: "Timestamp",
      coordsLabel: "Coordinate",
      sourceLabel: "Atto di Riferimento",
    },
    mapControls: {
      timeFilterTitle: "Timeline Rilievi",
      lockedFeature: "La triangolazione automatica delle celle è riservata agli utenti registrati.",
    },
  },
  login: {
    usernameLabel: "Username / Alias Operatore",
    usernamePlaceholder: "Es. Agente_07",
    emailLabel: "Email",
    emailPlaceholder: "nome@dominio.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    hidePassword: "Nascondi password",
    showPassword: "Mostra password",
    forgotPassword: "Password dimenticata?",
    confirmPasswordLabel: "Conferma Password",
    termsPrefix: "Registrandoti confermi di accettare i ",
    termsLink: "Termini d'uso",
    termsAnd: " e la ",
    privacyLink: "Privacy Policy",
    loginToggle: "Accedi",
    signUpToggle: "Registrati",
    badgeSignUp: "Registrazione Operatore",
    badgeLogin: "Accesso Riservato",
    titleSignUp: "Richiedi le tue Credenziali",
    titleLogin: "Bentornato, Investigatore.",
    descSignUp: "Registrati per accedere alla Control Room e collaborare ai dossier attivi.",
    descLogin: "Inserisci le tue credenziali per accedere alla piattaforma.",
    btnSignUp: "Richiedi Accesso",
    btnLogin: "Accedi al Sistema",
    trustLine: "Accesso riservato a ricercatori e giornalisti verificati dalla redazione.",
    backToJournal: "Torna a The Journal"
  }
  

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
      canvasPlaceholder:"Every clue is an isolated fragment. We combine our information with that of other detectives. Only by piecing together the puzzle can we uncover the truth about unsolved cases. ",
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
  },
    about: {
    hero: {
      eyebrow: "The Project",
      titleStart: "Beyond media hype,",
      titleHighlight: "only data matters.",
      description: "The Journal was born from the need to bring investigative and crime journalism back to objectivity. We live in an era where judicial cases are turned into TV spectacles. We believe in a different approach: analytical, documented, and data-driven.",
    },
    mission: {
      eyebrow: "Our Mission",
      title: "Reconstructing truth through open sources.",
      p1: "All too often, key investigative details get lost in thousands of pages of court files inaccessible to the general public, replaced by emotional and biased narratives.",
      p2: "At The Journal, we apply Open Source Intelligence (OSINT) methodologies and software engineering to digitize, index, and connect scattered fragments of information across rulings, expert reports, and public records.",
      p3: "We create interactive timelines and network graphs that enable journalists, researchers, and citizens to explore the spatial and temporal connections of a case, filtering out background noise and focusing on what truly matters: evidence.",
      graphHeader: "OSINT Relational Graph // Case #07",
      graphNodesLabel: "4 Nodes / 3 Evidences",
      nodeEvidence: "Exhibits #A12",
      nodeCentral: "Event Timeline",
      nodeCentralDate: "13 Aug 2007 - 09:12",
      nodeSignal: "Tip-off #304",
      nodeAct: "Court Document #712",
      statDocuments: "Documents",
      statConnections: "Connections",
      statSources: "Verified Sources",
    },
    pillars: {
      eyebrow: "Methodology",
      title: "The three pillars of our work",
      items: [
        {
          title: "Data Journalism",
          description: "We collect, clean, and cross-reference thousands of public records. From phone logs to expert analyses, we turn complex files into searchable and structured databases.",
        },
        {
          title: "OSINT Connections",
          description: "We use Open Source Intelligence techniques to map relationships, movements, and discrepancies. Every node in our graph represents a documented fact.",
        },
        {
          title: "Absolute Objectivity",
          description: "No personal opinions, no speculation. We present raw, hard facts. Our goal is not to pass judgment, but to provide the tools to understand.",
        },
      ],
    },
    cta: {
      title: "Explore Public Dossiers",
      description: "Access the full archive of analyzed cases. Inspect timelines, verify documents, and trace connections.",
      archiveButton: "Go to Archive",
      contactButton: "Contact Editorial Team",
      securityNotice: "All data originates from public judicial records.",
    },
  },
  osint: {
    hero: {
      eyebrow: "Methodology & Protocols",
      titleStart: "From open sources to",
      titleHighlight: "structured data.",
      description: "How we collect, verify, and connect information. Our process guarantees the traceability of every single node and the reproducibility of our analyses.",
    },
    pipeline: {
      eyebrow: "Analytical Workflow",
      title: "The OSINT Analysis Pipeline",
      step1Title: "1. Acquisition & Ingestion",
      step1Desc: "Data extraction from court filings, public repositories, phone records, and metadata. Format sanitization and advanced OCR for paper document digitization.",
      step2Title: "2. Verification & Triangulation",
      step2Desc: "Every fact or timestamp must be cross-verified by at least two independent sources or an official document before validation into the database.",
      step3Title: "3. Normalization & Graphing",
      step3Desc: "Entity mapping (people, locations, exhibits, timestamps) and semantic extraction to generate relational network graphs.",
    },
    standards: {
      eyebrow: "Transparency Standards",
      title: "Data Integrity Principles",
      items: [
        {
          title: "Digital Chain of Custody",
          description: "Every archived document features a cryptographic hash ensuring it hasn't been altered post-acquisition.",
        },
        {
          title: "Geospatial Integration",
          description: "Cross-referencing witness accounts and cell tower data with high-res maps to verify spatial-temporal plausibility.",
        },
        {
          title: "Public Source Accessibility",
          description: "No data is published without explicit reference to the court file or primary source from which it was extracted.",
        },
      ],
    },
    cta: {
      title: "Explore our protocols in action",
      description: "Inspect active dossiers analyzed through our methodology.",
      button: "Browse Cases",
    },
  },
  map: {
    sidebar: {
      badge: "OSINT Map Preview",
      title: "Geolocation & Cell Towers",
      subtitle: "Select a dossier to explore coordinates and chronological events.",
      publicNotice: "Public Mode: 12 key nodes displayed out of 142 total.",
      unlockBtn: "Unlock All Nodes",
      caseSelectorLabel: "Available Dossiers",
    },
    nodeDetails: {
      title: "Selected Evidence",
      emptyState: "Click a marker on the map or an event to inspect metadata.",
      typeLabel: "Type",
      timeLabel: "Timestamp",
      coordsLabel: "Coordinates",
      sourceLabel: "Reference File",
    },
    mapControls: {
      timeFilterTitle: "Timeline Events",
      lockedFeature: "Automated cell tower triangulation is restricted to registered users.",
    },
  },
  login: {
    usernameLabel: "Username / Operator Alias",
    usernamePlaceholder: "E.g. Agent_07",
    emailLabel: "Email",
    emailPlaceholder: "name@domain.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    hidePassword: "Hide password",
    showPassword: "Show password",
    forgotPassword: "Forgot password?",
    confirmPasswordLabel: "Confirm Password",
    termsPrefix: "By signing up you agree to our ",
    termsLink: "Terms of Use",
    termsAnd: " and ",
    privacyLink: "Privacy Policy",
    loginToggle: "Log In",
    signUpToggle: "Sign Up",
    badgeSignUp: "Operator Registration",
    badgeLogin: "Restricted Access",
    titleSignUp: "Request your Credentials",
    titleLogin: "Welcome back, Investigator.",
    descSignUp: "Register to access the Control Room and collaborate on active dossiers.",
    descLogin: "Enter your credentials to access the platform.",
    btnSignUp: "Request Access",
    btnLogin: "System Login",
    trustLine: "Access restricted to researchers and journalists verified by the editorial staff.",
    backToJournal: "Back to The Journal"
  }

},

} as const;


export type Language = "IT" | "EN";