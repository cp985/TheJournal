import { no } from "zod/v4/locales";

export const dictionary = {
  IT: {
    nav: {
      cases: "Casi",
      map: "Mappa",
      osint: "Metodo-OSINT",
      about: "About",
      login: "Area Riservata",
      casesArchive: "Archivio Casi",
      userNav: {
        defaultAgent: "Agente",
        activeIdentity: "Identità Attiva",
        noEmail: "Nessuna email",
        profile: "Profilo",
        adminDashboard: "Dashboard Admin",
        logout: "Disconnetti",
      },
    },
    casesPage: {
      loading: "Caricamento dossier in corso",
      empty: "Nessun dossier trovato.",
      kodakPrefix: "KODAK 8MM ·",
      openStatus: "IN CORSO",
      archivedStatus: "ARCHIVIATO",
      authorLabel: "AUTORE:",
      unknownAuthor: "Sconosciuto",
      archiveAccessTitle: "Accesso Archivio Digitale",
      removeFromMap: "Rimuovi da Mappa",
      loadToMap: "Carica in Mappa",
      openCaseAlt: "Apri il caso",
      fileExplorer: {
        back: "Indietro",
        confidential: "RISERVATO",
        evidencePrefix: "Reperto #",
        previewTitle: "Anteprima File",
        open: "Apri",
        download: "Scarica",
        noUrl: "Nessun URL fornito",
        pdfNoUrl: "URL PDF non disponibile",
        fileNotesHeader: "Note del fascicolo:",
        emptySelection:
          "Seleziona un reperto dalla lista per visualizzarne l'anteprima",
        loadToMap: "CARICA DOSSIER IN MAPPA",
      },
      pageDefault: {
        title: "Archivio Generale Casi",
        description:
          "Seleziona un dossier dalla pellicola per consultare i dettagli della scheda, i reperti archiviati e la documentazione.",
        numbeerOfDossiers: "Dossier archiviati nel sistema ",
      },
      ctaLogin: {
        title: "Area riservata",
        description1: "Stai consultando la versione dimostrativa (3 Dossier).",
        description2: "per sbloccare l'archivio completo.",
        button: "Accedi",
      },
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
          "Ogni indizio è un frammento isolato. Uniamo le nostre informazioni a quelle degli altri detective. Solo ricomponendo il puzzle possiamo portare alla luce la verità sui casi irrisolti.",
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
            code: "n-001",
            title: "L'omicidio di Elisa Claps",
            status: "Archiviato",
            description:
              "Ricostruzione cronologica degli atti processuali e delle perizie tecniche depositate nei vari gradi di giudizio.",
            atti: 4,
            connessioni: 7,
            href: "/cases?code=n-001",
          },
          {
            code: "n-002",
            title: "Il Giallo Di Avetrana",
            status: "Archiviato",
            description: "I fatti che hanno scioccato un paese intero.",
            atti: 8,
            connessioni: 9,
            href: "/cases?code=n-002",
          },
          {
            code: "n-003",
            title: "Il Mistero di Pietracatella",
            status: "In Analisi",
            description:
              "Il mistero di Pietracatella che non ha nessun colpevole.",
            atti: 4,
            connessioni: 8,
            href: "/cases/?code=n-003",
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
        titleDisclaimer:
          "Archivio digitale e ricostruzioni d'epoca di fatti di cronaca e giudiziari.",
        disclaimer:
          "I verbali, gli atti peritali e le trascrizioni riportati in questa scheda sono ricostruzioni ed elaborazioni a scopo documentale/editoriale basate sugli atti processuali e sulle sentenze passate in giudicato. Le illustrazioni, i ritratti e le rappresentazioni dei reperti sono generati o rielaborati tramite Intelligenza Artificiale ed elementi grafici d'epoca a scopo puramente evocativo e non fotorealistico.",
        rights: "Tutti i diritti riservati.",
      },
    },
    about: {
      hero: {
        eyebrow: "Il Progetto",
        titleStart: "Oltre il rumore mediatico,",
        titleHighlight: "solo i dati contano.",
        description:
          "The Journal nasce dall'esigenza di riportare la cronaca nera e investigativa su un binario di oggettività. Viviamo in un'era in cui i casi giudiziari vengono trasformati in spettacoli televisivi. Noi crediamo in un approccio diverso: analitico, documentato e basato sui dati.",
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
            description:
              "Raccogliamo, puliamo e incrociamo migliaia di dati pubblici. Dai tabulati alle perizie, trasformiamo fascicoli complessi in database interrogabili e strutturati.",
          },
          {
            title: "Connessioni OSINT",
            description:
              "Utilizziamo tecniche di Open Source Intelligence per mappare relazioni, movimenti e discrepanze. Ogni nodo del nostro grafo rappresenta un fatto documentato.",
          },
          {
            title: "Oggettività Assoluta",
            description:
              "Nessun parere personale, nessuna speculazione. Presentiamo i fatti nudi e crudi. Il nostro obiettivo non è emettere sentenze, ma fornire gli strumenti per comprendere.",
          },
        ],
      },
      cta: {
        title: "Esplora i dossier pubblici",
        description:
          "Accedi all'archivio completo dei casi analizzati. Consulta le timeline, verifica i documenti e traccia le connessioni.",
        archiveButton: "Vai all'Archivio",
        contactButton: "Contatta la Redazione",
        securityNotice:
          "Tutti i dati provengono da fonti giudiziarie pubbliche.",
      },
    },
    osint: {
      hero: {
        eyebrow: "Metodologia & Protocolli",
        titleStart: "Dalle fonti aperte al",
        titleHighlight: "dato strutturato.",
        description:
          "Come raccogliamo, verifichiamo e colleghiamo le informazioni. Il nostro processo garantisce la tracciabilità di ogni singolo nodo e la riproducibilità delle analisi.",
      },
      pipeline: {
        eyebrow: "Workflow Analitico",
        title: "La Pipeline di Analisi OSINT",
        step1Title: "1. Acquisizione & Utilizzo dei Dati",
        step1Desc:
          "Estrazione di dati da atti giudiziari scritti, repository pubblici, tabulati e metadati. Sanitizzazione dei formati e applicazione di OCR avanzato per la digitalizzazione dei documenti cartacei.",
        step2Title: "2. Verificazione & Triangolazione",
        step2Desc:
          "Ogni fatto o timestamp deve essere confermato da almeno due fonti indipendenti o da un atto ufficiale prima di essere validato nel database.",
        step3Title: "3. Normalizzazione & Grafici",
        step3Desc:
          "Mappatura di entità (persone, luoghi, reperti, orari) ed estrazione delle relazioni sintattiche e semantiche per la generazione di grafici di rete.",
      },
      standards: {
        eyebrow: "Standard di Trasparenza",
        title: "Principi di Integrità dei Dati",
        items: [
          {
            title: "Catena di Custodia Digitale",
            description:
              "Ogni documento archiviato presenta un hash crittografico per garantire che l'atto non sia mai stato manipolato dopo l'acquisizione.",
          },
          {
            title: "Integrazione Geospaziale",
            description:
              "Correlazione delle testimonianze e dei dati cellulari con mappe ad alta risoluzione per verificare la congruenza temporale e spaziale.",
          },
          {
            title: "Accesso Pubblico alle Fonti",
            description:
              "Nessun dato viene pubblicato senza il riferimento esplicito al fascicolo o alla fonte primaria da cui è stato estratto.",
          },
        ],
      },
      cta: {
        title: "Esplora l'applicazione dei nostri protocolli",
        description:
          "Consulta i dossier analizzati attraverso la nostra metodologia.",
        button: "Sfoglia i Casi",
      },
    },
    map: {
      sidebar: {
        badge: "Anteprima Mappa OSINT",
        title: "Geolocalizzazione & CELLE",
        subtitle:
          "Seleziona un dossier per esplorare le coordinate e la sequenza cronologica dei rilievi.",
        publicNotice:
          "Modalità Pubblica: 12 nodi chiave visualizzati su 142 totali.",
        unlockBtn: "Sblocca Tutti i Nodi",
        caseSelectorLabel: "Dossier Disponibili",
      },
      nodeDetails: {
        title: "Rilievo Selezionato",
        emptyState:
          "Clicca su un marker sulla mappa o su un evento per analizzare i metadati.",
        typeLabel: "Tipologia",
        timeLabel: "Timestamp",
        coordsLabel: "Coordinate",
        sourceLabel: "Atto di Riferimento",
      },
      mapControls: {
        timeFilterTitle: "Timeline Rilievi",
        lockedFeature:
          "La triangolazione automatica delle celle è riservata agli utenti registrati.",
      },
    },
    login: {
      or: "Oppure accedi con...",
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
      descSignUp:
        "Registrati per accedere alla Control Room e collaborare ai dossier attivi.",
      descLogin: "Inserisci le tue credenziali per accedere alla piattaforma.",
      btnSignUp: "Richiedi Accesso",
      btnLogin: "Accedi al Sistema",
      trustLine:
        "Accesso riservato a ricercatori e giornalisti verificati dalla redazione.",
      backToJournal: "Torna a The Journal",
      errors: {
        ["username-too-long"]:
          "Lo username deve avere al massimo 20 caratteri.",
        ["username-too-short"]: "Lo username deve avere almeno 4 caratteri.",
        ["invalid-email"]: "Formato email non valido.",
        ["password-too-weak-8-Aa-@$!%*?&"]:
          "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale @$!%*?&.",
        ["passwords-do-not-match"]: "Le password non coincidono.",
        ["server-error"]: "Errore durante la registrazione. Riprova.",
        ["connection-error"]: "Impossibile connettersi al server.",
        ["no-user-found"]: "Nessun utente trovato.",
        ["wrong-email"]: "Email non valida.",
        ["wrong-password"]: "Password non valida.",
        ["username-already-exist"]: "Username già esistente.",
        ["email-already-exist"]: "Email già esistente.",
        ["auth-error"]: "Autenticazione fallita. Verifica le credenziali.",
      },
      success: {
        ["user-signed-up"]: "Registrazione completata con successo!",
        ["user-logged-in"]: "Login completato con successo!",
      },
    },
    terms: {
      backToLogin: "← Torna al login",
      title: "Termini e Condizioni di Servizio",
      lastUpdated: "Ultimo aggiornamento",
      lastUpdatedDate: "9 Agosto 2026",
      sections: {
        acceptanceTitle: "1. Accettazione dei Termini",
        acceptanceBody:
          "Accedendo o utilizzando il nostro servizio, l'utente accetta di essere vincolato dai presenti Termini e Condizioni. Se non si accettano tutti i termini, non è consentito accedere o utilizzare la piattaforma.",
        accountTitle: "2. Creazione dell'Account e Sicurezza",
        accountBody:
          "Per accedere a determinate funzionalità è necessario registrare un account. L'utente si impegna a:",
        accountPoints: [
          "Fornire informazioni accurate, aggiornate e complete.",
          "Mantenere la riservatezza delle credenziali di accesso.",
          "Notificare tempestivamente qualsiasi utilizzo non autorizzato del proprio profilo.",
        ],
        usageTitle: "3. Uso Consentito e Restrizioni",
        usageBody:
          "È severamente vietato utilizzare il servizio per scopi illeciti o non autorizzati. È proibito:",
        usagePoints: [
          "Tentare di bypassare le misure di sicurezza o accedere ad account altrui.",
          "Interferire con il corretto funzionamento dei server e delle API.",
          "Estrarre dati mediante strumenti automatizzati (scraping) senza autorizzazione.",
        ],
        intellectualTitle: "4. Proprietà Intellettuale",
        intellectualBody:
          "Tutti i diritti sul codice sorgente, il design, il marchio, il logo e i contenuti presenti sulla piattaforma appartengono esclusivamente ai rispettivi proprietari. È vietata la riproduzione non autorizzata.",
        limitationTitle: "5. Limitazione di Responsabilità",
        limitationBody:
          'Il servizio è fornito "così com\'è" ("as is") e "secondo disponibilità". Non garantiamo l\'assenza di interruzioni temporanee o errori nel sistema e non saremo responsabili per eventuali perdite dirette o indirette di dati.',
        suspensionTitle: "6. Sospensione dell'Account",
        suspensionBody:
          "Ci riserviamo il diritto di sospendere o cancellare definitivamente un account in qualsiasi momento e senza preavviso in caso di violazione dei presenti Termini.",
        contactTitle: "7. Contatti e Chiarimenti",
        contactBody:
          "Per qualsiasi domanda o dubbio relativo ai presenti Termini di Servizio, puoi contattarci all'indirizzo email dedicato al supporto.",
      },
      rightsReserved: "Tutti i diritti riservati.",
      privacyPolicy: "Privacy Policy",
    },
    privacy: {
      backToLogin: "← Torna al login",
      title: "Informativa sulla Privacy",
      lastUpdated: "Ultimo aggiornamento",
      lastUpdatedDate: "9 Agosto 2026",
      sections: {
        introTitle: "1. Introduzione",
        introBody:
          "La tua privacy è fondamentale per noi. Questa Informativa descrive come raccogliamo, utilizziamo, conserviamo e proteggiamo i tuoi dati personali quando utilizzi i nostri servizi.",
        collectedTitle: "2. Dati che Raccogliamo",
        collectedBody:
          "Raccogliamo solo i dati strettamente necessari per fornire e migliorare il servizio:",
        collectedPoints: [
          "Dati di registrazione: indirizzo email, username e password crittografata.",
          "Dati di utilizzo: indirizzi IP, tipo di browser e log di sistema per motivi di sicurezza.",
          "Preferenze di sessione e lingua memorizzate localmente.",
        ],
        purposeTitle: "3. Finalità del Trattamento",
        purposeBody:
          "I tuoi dati vengono elaborati esclusivamente per le seguenti finalità:",
        purposePoints: [
          "Consentire l'autenticazione e la gestione del tuo account.",
          "Garantire la sicurezza e prevenire attività fraudolente o accessi non autorizzati.",
          "Rispondere alle tue richieste di supporto tecnico.",
        ],
        sharingTitle: "4. Condivisione dei Dati e Terze Parti",
        sharingBody:
          "Non vendiamo né cediamo i tuoi dati personali a terzi per scopi commerciali. I dati possono essere trattati solo da fornitori di servizi infrastrutturali (hosting e database) vincolati alla riservatezza.",
        securityTitle: "5. Sicurezza dei Dati",
        securityBody:
          "Adottiamo misure di sicurezza avanzate, tra cui la crittografia delle password tramite algoritmo bcrypt e connessioni protette via HTTPS, per impedire l'accesso non autorizzato o la perdita dei dati.",
        rightsTitle: "6. I Tuoi Diritti (GDPR)",
        rightsBody:
          "In conformità con la normativa vigente, hai il diritto di accedere, rettificare o richiedere la cancellazione permanente del tuo account e di tutti i dati ad esso associati in qualsiasi momento.",
        contactTitle: "7. Contatti per la Privacy",
        contactBody:
          "Per esercitare i tuoi diritti o per qualsiasi richiesta relativa al trattamento dei dati, puoi contattare il nostro responsabile della protezione dati via email.",
      },
      rightsReserved: "Tutti i diritti riservati.",
      termsOfService: "Termini e Condizioni",
    },
    contact: {
      backToLogin: "← Torna al login",
      title: "Canale di Contatto",
      subtitle:
        "Invia una trasmissione diretta al team di supporto o agli amministratori di sistema.",
      form: {
        nameLabel: "IDENTIFICATIVO / NOME",
        namePlaceholder: "es. Agent Smith",
        emailLabel: "INDIRIZZO EMAIL",
        emailPlaceholder: "agent@agency.org",
        subjectLabel: "OGGETTO TRANSMISSIONE",
        subjectPlaceholder: "Seleziona una categoria",
        subjects: {
          general: "Info Generali / Supporto",
          bug: "Segnalazione Bug / Anomalia",
          security: "Vulnerabilità di Sicurezza",
          account: "Problema di Accesso Account",
        },
        messageLabel: "MESSAGGIO CIFRATO",
        messagePlaceholder: "Scrivi qui i dettagli della tua segnalazione...",
        submitButton: "INVIA TRASMISSIONE",
        submitting: "CIFRATURA IN CORSO...",
        successMessage:
          "Trasmissione inviata con successo. ID Ticket: #TRX-985",
        errorMessage: "Errore di trasmissione. Riprova più tardi.",
      },
      infoBox: {
        title: "PROTOCOLLO DI RISPOSTA",
        responseTime: "Tempo stimato di risposta: < 24 ore.",
        encryptionNote:
          "Tutti i messaggi sono protetti da cifratura end-to-end sulla nostra rete.",
        directEmail: "EMAIL DIRETTA",
        pgpKey: "CHIAVE PGP IMPRONTA",
      },
      rightsReserved: "Tutti i diritti riservati.",
      errors: {
        ["email-not-found"]:
          "L'indirizzo email inserito non è associato ad alcun account registrato.",
        ["no-text-found"]:
          "Dati mancanti o form non valido. Compila tutti i campi richiesti.",
        ["server-error"]:
          "Si è verificato un errore durante l'invio della segnalazione. Riprova più tardi.",
        ["connection-error"]:
          "Impossibile connettersi al server. Verifica la tua connessione internet.",
        ["username-too-long"]:
          "L'username deve essere al massimo 20 caratteri.",
        ["username-too-short"]: "L'username deve essere almeno 4 caratteri.",
        ["invalid-email"]: "Indirizzo email non valido.",
        ["subject-too-short"]: "Oggetto della segnalazione non  valido.",
        ["message-too-short"]:
          "Il messaggio della segnalazione deve essere almeno 10 caratteri.",
        ["subject-too-long"]: "Oggetto della segnalazione non  valido.",
        ["message-too-long"]:
          "Il messaggio della segnalazione deve essere al massimo 1000 caratteri.",
      },
      success: {
        ["email-sent"]:
          "Segnalazione inviata con successo. Un'email di conferma viene inviata.",
      },
    },
    profile: {
      defaultUser: "Utente",
      activeAccount: "Account attivo",
      stats: {
        title: "Bilancio Prove & Segnalazioni",
        totalSubmitted: "Totale Inviate",
        pending: "Pendenti",
        approved: "Accettate",
        rejected: "Rifiutate",
        tooltipPending: "In Sospeso",
        tooltipApproved: "Accettate",
        tooltipRejected: "Rifiutate",
      },
      evidence: {
        title: "Prove e Segnalazioni",
        subtitle:
          "Storico del materiale e delle associazioni inviate a tuo nome",
      },
      settings: {
        title: "Gestione Account e Privacy",
        exportDataTitle: "Esporta i Tuoi Dati",
        exportDataDesc: "Scarica il report in formato JSON",
        deleteAccountTitle: "Elimina Account",
        deleteAccountDesc: "Rimuovi profilo e credenziali",
      },
      addEvidenceDialog: {
        triggerButton: "Aggiungi Prova",
        title: "Invia Nuova Prova",
        description: "Seleziona il caso/dossier e carica un file da allegare.",
        labels: {
          timeline: "Lista Timeline",
          selectDossier: "Seleziona Dossier / Caso",
          noDossiers: "Nessun dossier disponibile",
          fileType: "Tipo di File",
          evidenceTitle: "Nome Prova / Titolo",
          attachedFile: "File Allegato",
          notes: "Note / Descrizione",
          notes_en: "English Notes",
        },
        placeholders: {
          noTimelines: "Nessuna Timeline disponibile",
          selectTimeline: "Seleziona una Timeline dalla lista",
          selectDossierFirst: "Seleziona prima un Caso dalla lista",
          evidenceTitle: "Inserisci un nome per identificare la prova...",
          dropzoneDefault: "Clicca o trascina qui un file",
          dropzoneHint: "PNG, JPG, PDF fino a 3 MB",
          notes: "Aggiungi una breve descrizione o dettagli rilevanti...",
        },
        options: {
          photo: "Foto / Immagine",
          document: "Documento (TXT, DOCX)",
          pdf: "PDF",
        },
        buttons: {
          cancel: "Annulla",
          submit: "Invia Prova",
          submitting: "Invio in corso...",
        },
        errors:{
          ["evidence-title-too-long"]:
            "Il titolo della prova deve essere al massimo 50 caratteri.",
          ["evidence-title-too-short"]:
            "Il titolo della prova deve essere almeno 10 caratteri.",
          ["evidence-file-too-large"]:
            "Il file allegato deve essere inferiore a 3 MB.",
          ["evidence-file-type-not-allowed"]:
            "Il file allegato deve essere di tipo PNG, JPG o PDF.",
          ["evidence-file-missing"]:
            "Seleziona un file da allegare.",
            ["dossierId-not-selected"]:
            "Seleziona un dossier per la prova.",
         ["notes-too-short" ]:
            "Le note devono essere almeno 15 caratteri.",
            ["notes-too-long" ]:
            "Le note devono essere al massimo 60 caratteri.",
            ["file-name-too-long" ]:
            "Il nome del file deve essere al massimo 40 caratteri.",
["file-name-too-short" ]:
            "Il nome del file deve essere almeno 10 caratteri.",
            ["file-missing" ]:
            "Seleziona un file da allegare.",
["file-too-large" ]:
            "Il file deve essere inferiore a 3 MB.",
            ["invalid-file-format" ]:
            "Il file allegato deve essere di tipo PNG, JPG o PDF.",
["user-not-authenticated" ]:
            "Utente non autenticato.",
            ["error-creating-evidence" ]:
            "Si è verificato un errore durante la creazione della prova.",
          ["file-upload-failed" ]:
            "Si è verificato un errore durante il caricamento del file.",
          
          
          }
      },

      edit: {
        triggerButton: "Modifica Profilo",
        title: "Gestione Profilo",
        description:
          "Gestisci i tuoi dati personali, l'avatar e le credenziali del tuo account.",
        chooseAvatar: "Scegli il tuo avatar",
        restorePhoto: "Ripristina foto originaria",
        labels: {
          username: "Username",
          email: "Indirizzo Email",
          oldPassword: "Password Attuale",
          newPassword: "Nuova Password",
        },
        oauthVerified: "Account verificato tramite",
        securityTitle: "Sicurezza Account (Opzionale)",
        placeholders: {
          password: "••••••••",
        },
        buttons: {
          cancel: "Annulla",
          saving: "Salvataggio...",
          save: "Salva Modifiche Profilo",
        },
        errors: {
          ["username-too-long"]:
            "L'username deve essere al massimo 20 caratteri.",
          ["username-too-short"]: "L'username deve essere almeno 4 caratteri.",
          ["username-no-symbols"]:
            "L'username non può contenere caratteri speciali.",
          ["invalid-email"]: "Email non valida.",
          ["invalid-password"]: "Password non valida.",
          ["password-too-weak-8-Aa-@$!%*?&"]:
            "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale @$!%*?&.",
          ["old-password-required"]: "Password attuale richiesta.",
          ["user-not-authenticated"]: "Utente non autenticato.",
          ["fatal-error"]: "Errore critico, contattare l'assistenza.",
          ["invalid-old-password"]: "Password attuale non valida.",
          ["invalid-credentials"]: "Password corrente non valida.",
          ["invalid-new-password"]: "Password nuova non valida.",
          ["new-password-required"]: "Nuova password richiesta.",
        },
      },
      evidenceList: {
        defaultEmptyMessage: "Nessuna prova o segnalazione inviata finora.",
        status: {
          accepted: "Accettata",
          rejected: "Rifiutata",
          pending: "In Sospeso",
        },
        labels: {
          type: "Tipo",
          sentOn: "Inviato il",
        },
        buttons: {
          showLess: "Mostra meno",
          seeAll: "Vedi tutte",
        },
      },
      exportData: {
        button: "Esporta",
        exporting: "Esportazione...",
        error: "Errore durante l'esportazione dei dati.",
      },
      deleteAccount: {
        triggerButton: "Elimina Account",
        title: "Sei assolutamente sicuro?",
        description:
          "Questa azione è **irreversibile**. Il tuo account, tutti i dati personali e le prove inviate verranno eliminati o anonimizzati in modo permanente.",
        confirmPhrase: "Cancella il mio account",
        labelPrompt: "Per confermare, digita :",
        errorMessage: "Impossibile eliminare l'account. Riprova più tardi.",
        buttons: {
          cancel: "Annulla",
          deleting: "Eliminazione...",
          confirm: "Sì, elimina il mio account",
        },
      },
    },
    admin:{
      adminEvidences: {
  title: "Revisione Prove",
  total: "totali",
  newEvidence: "Nuova Prova",
  editEvidence: "Modifica Prova",
  uploadedBy: "Caricato da",
  onDate: "il",
  noEvidences: "Nessuna prova trovata.",
  statusAccepted: "Accettato",
  statusPending: "In attesa",
},evidenceDialog: {
  fileLabel: "File",
    editTitle: "Modifica Prova",
    createTitle: "Aggiungi Nuova Prova",
    editDesc: "Aggiorna i dettagli relativi a questo elemento di prova.",
    createDesc: "Associa una nuova prova multimediale o documentale ad un dossier.",
    buttonNew: "Nuova Prova",
    buttonEditTooltip: "Modifica Prova",
    dossierCodeLabel: "Codice Dossier (dossierId) *",
    selectDossierPlaceholder: "Seleziona un dossier...",
    typeLabel: "Tipo Prova (Type) *",
    typePhoto: "Foto (PHOTO)",
    typePdf: "PDF",
    typeDoc: "Documento (DOCUMENT)",
    fileUrlLabel: "URL del File (File URL) *",
    fileUrlPlaceholder: "https://... o /uploads/evidence.jpg",
    statusLabel: "Stato Validazione (Status)",
    statusPending: "In Attesa (PENDING)",
    statusAccepted: "Accettata (ACCEPTED)",
    statusRejected: "Rifiutata (REJECTED)",
    notesItLabel: "Note / Dettagli (Italiano) *",
    notesItPlaceholder: "Descrizione dell'evidenza e rilievi...",
    notesEnLabel: "Note / Dettagli (Inglese)",
    notesEnPlaceholder: "English notes (optional)...",
    cancelButton: "Annulla",
    saveChangesButton: "Salva Modifiche",
    createButton: "Crea Prova",
    errors: {
      ["dossierId-not-valid"]:
        "Il codice del dossier non rispetta il formato corretto lettera minuscola, trattino, tre cifre (es. dos-001).",
      ["dossierId-too-short"]:
        "Il codice del dossier deve contenere almeno 3 caratteri.",
      ["dossierId-too-long"]:
        "Il codice del dossier deve contenere al massimo 6 caratteri.",
      ["fileUrl-too-short"]:
        "L'URL del file non rispetta il formato corretto.",
    ["type-not-valid"]:
        "Il tipo di prova non rispetta il formato corretto.",
    ["notes-too-short"]:
        "Le note devono contenere almeno 10 caratteri.",
    ["notes-too-long"]:
        "Le note devono contenere al massimo 60 caratteri.",
     ["validation-error"]:
        "Errore durante la validazione dei dati.",
        ["user-not-authenticated"]:
            "Amministratore non autenticato.", 
      ["server-error"]:
        "Errore interno del server.",
        ["evidence-created"]:
        "Prova creata con successo.",
      ["errors-creating-evidence-catch"]:
        "Si è verificato un errore durante la creazione della prova.",
     ["errors-updating-evidence-catch"]:
        "Si è verificato un errore durante la modifica della prova.",
     ["forbidden-admin-only"]:
        "Operazione non autorizzata.",
        ["no-evidence-data-provided"]:
        "Nessun dato di prova fornito.",
     ["evidence-created-successfully"]:
        "Prova creata con successo.",
        ["evidence-id-required"]:
        "ID Prova richiesto.",
        ["evidence-not-found"]:
        "Prova non trovata.",
        ["evidence-updated-successfully"]:
        "Prova aggiornata con successo.",

      }
  },deleteDialog: {
    deleteDossierTitle: "Elimina Dossier",
    deleteEvidenceTitle: "Elimina Prova",
    dossierLabel: "Dossier",
    evidenceLabel: "Prova",
    dossierPhrase: "Cancella Dossier",
    evidencePhrase: "Cancella Prova",
    confirmDescDossier: "Stai per eliminare permanentemente il dossier",
    confirmDescEvidence: "Stai per eliminare permanentemente la prova",
    actionIrreversible: "Questa azione è irreversibile.",
    typeInstruction: "Per confermare, digita:",
    hereBelow: "qui sotto:",
    genericError: "Errore durante l'eliminazione.",
    connectionError: "Errore di connessione.",
    cancelButton: "Annulla",
    deleteButton: "Conferma Eliminazione",
    deletingState: "Eliminazione...",
  errors:{
    ["evidence-id-not-found"]:
        "Prova non trovata.",
       ["user-not-authenticated"]:
            "Amministratore non autenticato.",
        ["server-error"]:
        "Errore interno del server.",
        ["errors-deleting-evidence-catch"]:
        "Si è verificato un errore durante la cancellazione della prova.",
                ["dossier-id-not-found"]:
        "Dossier non trovato.",
["dossier-deleted"]:
        "Dossier eliminato con successo.",
        ["errors-deleting-dossier-catch"]:
        "Si è verificato un errore durante la cancellazione del dossier.",
["forbidden-admin-only"]:
        "Operazione non autorizzata.",
  ["evidence-id-required"]:
        "ID Prova richiesto.",
                ["dossier-deleted-successfully" ]:
        "Dossier eliminato con successo.",
        ["dossier-id-required"]:
        "ID Dossier richiesto.",
  
      }
  
  },mobileMenu: {
    panelTitle: "PANNELLO ADMIN",
    overview: "Panoramica",
    users: "Utenti",
    dossiers: "Dossier",
    evidences: "Prove",
    map: "Mappa & Punti"
  },
  search: {
    placeholder: "Cerca..."
  },sidebar: {
    panelTitle: "PANNELLO ADMIN",
    overview: "Panoramica",
    users: "Utenti",
    dossiers: "Dossier",
    evidences: "Prove",
    map: "Mappa & Punti"
  },
  usersView: {
    title: "Gestione Utenti",
    registeredCount: "registrati",
    tableUsername: "Username",
    tableEmail: "Email",
    tableRole: "Ruolo",
    tableCreatedAt: "Data Iscrizione",
    tableActions: "Azioni",
    createdOn: "Creato il:"
  },dossiersView: {
    title: "Gestione Dossier",
    linkedEvidences: "Prove collegate:",
    updatedAt: "Aggiornato:",
    createdAt: "Creato:"
  },overview: {
    title: "Panoramica Generale",
    totalUsers: "Utenti Totali",
    activeDossiers: "Dossier Attivi",
    pendingEvidences: "Prove in Sospeso",
    systemStatus: "Stato Sistema",
    online: "Online",
    offline: "Offline"
  },toggleRole: {
    triggerTitle: "Cambia Ruolo",
    title: "Modifica Ruolo Utente",
    description: "Sei sicuro di voler invertire il ruolo di questo utente? Se è un Utente normale diventerà Admin, e viceversa.",
    defaultError: "Si è verificato un errore imprevisto.",
    successMessage: "Ruolo utente aggiornato con successo!",
    cancel: "Annulla",
    confirm: "Conferma"
  },deleteUser: {
    triggerTitle: "Elimina",
    title: "Conferma Eliminazione",
    description: "Sei sicuro di voler eliminare questo utente? L'account verrà anonimizzato nel database per preservare la cronologia delle attività.",
    defaultError: "Si è verificato un errore imprevisto.",
    successMessage: "Utente eliminato/anonimizzato con successo!",
    cancel: "Annulla",
    confirm: "Conferma"
  },
  dossierDialog: {
    editTriggerTitle: "Modifica Dossier",
    newButton: "Nuovo Dossier",
    titleEdit: "Modifica Dossier",
    titleCreate: "Crea Nuovo Dossier",
    descEdit: "Aggiorna le informazioni relative a questo dossier.",
    descCreate: "Inserisci i dati essenziali per archiviare un nuovo dossier d'indagine.",
    codeLabel: "Codice Univoco (Code) *",
    codePlaceholder: "es. d-001",
    statusLabel: "Stato",
    statusOpen: "Aperto (Open)",
    statusClosed: "Chiuso (Closed)",
    statusArchived: "Archiviato (Archived)",
    titleItLabel: "Titolo (Italiano) *",
    titleItPlaceholder: "Titolo del dossier",
    titleEnLabel: "Titolo (Inglese)",
    titleEnPlaceholder: "Title in English (opzionale)",
    coverUrlLabel: "URL Immagine di Copertina (Cover URL) *",
    coverUrlPlaceholder: "https://... o /images/cover.jpg",
    descItLabel: "Descrizione (Italiano) *",
    descItPlaceholder: "Dettagli e contesto del dossier...",
    descEnLabel: "Descrizione (Inglese)",
    descEnPlaceholder: "English description (optional)...",
    cancel: "Annulla",
    saveChanges: "Salva Modifiche",
    createDossier: "Crea Dossier",
    errors: {
      ["title-too-short"]: "Il titolo deve contenere almeno 10 caratteri.",
      ["title-too-long"]: "Il titolo deve contenere al massimo 60 caratteri.",
      ["description-too-short"]: "La descrizione deve contenere almeno 10 caratteri.",
      ["description-too-long"]: "La descrizione deve contenere al massimo 600 caratteri.",
    ["coverUrl-not-valid"]: "L'URL inserito non rispetta il formato corretto.",
    ["validation-error"]: "Si sono verificati degli errori. Controlla i campi e riprova.",
    ["admin-not-authenticated"]: "Amministratore non autenticato.",
    ["server-error"]: "Si sono verificati degli errori imprevisti.",
    ["dossier-created"]: "Dossier creato con successo.",
    ["errors-creating-dossier-catch"]: "Si sono verificati degli errori durante la creazione del dossier.",
    ["dossier-updated"]: "Dossier aggiornato con successo.",
    ["errors-updating-dossier-catch"]: "Si sono verificati degli errori durante la modifica del dossier.",
  ["forbidden-admin-only"]: "Operazione non autorizzata.",
  ["no-dossier-data-provided"]: "Nessun dato di dossier fornito.",
  ["dossier-created-successfully"]: "Dossier creato con successo.",
["dossier-id-required"]: "ID Dossier richiesto.",
["dossier-not-found"]: "Dossier non trovato.",
["dossier-updated-successfully"]: "Dossier aggiornato con successo.",
["dossierId-not-valid"]: "Il codice del dossier non rispetta il formato corretto lettera minuscola, trattino, tre cifre (es. d-001).",
}
  }
    }
  },
  EN: {
    nav: {
      cases: "Cases",
      map: "Map",
      osint: "OSINT-Method",
      about: "About",
      login: "Restricted Area",
      casesArchive: "Case Archive",
      userNav: {
        defaultAgent: "Agent",
        activeIdentity: "Active Identity",
        noEmail: "No email provided",
        profile: "Profile",
        adminDashboard: "Admin Dashboard",
        logout: "Sign Out",
      },
    },
    casesPage: {
      loading: "Loading dossiers",
      empty: "No dossiers found.",
      kodakPrefix: "KODAK 8MM ·",
      openStatus: "IN PROGRESS",
      archivedStatus: "ARCHIVED",
      authorLabel: "AUTHOR:",
      unknownAuthor: "Unknown",
      archiveAccessTitle: "Digital Archive Access",
      removeFromMap: "Remove from Map",
      loadToMap: "Load to Map",
      openCaseAlt: "Open case",
      fileExplorer: {
        back: "Back",
        confidential: "CONFIDENTIAL",
        evidencePrefix: "Evidence #",
        previewTitle: "File Preview",
        open: "Open",
        download: "Download",
        noUrl: "No URL provided",
        pdfNoUrl: "PDF URL not available",
        fileNotesHeader: "File notes:",
        emptySelection: "Select an evidence item from the list to preview it",
        loadToMap: "LOAD DOSSIER TO MAP",
      },
      pageDefault: {
        title: "General Cases Archive",
        description: "Select a dossier to explore details and documents.",
        numbeerOfDossiers: "Dossiers archived ",
      },
      ctaLogin: {
        title: "Restricted Area",
        description1:
          "Now you can only explore the public archive (3 dossiers). ",
        description2: "to access the full archive.",
        button: "Login",
      },
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
          "Every clue is an isolated fragment. We combine our information with that of other detectives. Only by piecing together the puzzle can we uncover the truth about unsolved cases. ",
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
            code: "n-001",
            title: "The Elisa Claps Case",
            status: "Archived",
            description:
              "Chronological reconstruction of court documents and technical expert opinions filed across various judicial levels.",
            atti: 8,
            connessioni: 8,
            href: "/cases?code=n-001",
          },
          {
            code: "n-002",
            title: "The Avetrana Killing",
            status: "Archived",
            description: "The fatcs that terrified a whole country.",
            atti: 8,
            connessioni: 7,
            href: "/cases?code=n-002",
          },
          {
            code: "n-003",
            title: "The Pietracatella Mystery",
            status: "Under Review",
            description:
              "The mystery of the Pietracatella case that not have a single clue.",
            atti: 4,
            connessioni: 7,
            href: "/cases?code=n-003",
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
        titleDisclaimer:
          "Digital archive and historical reconstructions of crime and judicial cases.",
        disclaimer:
          "The official reports, forensic expert evaluations, and transcripts presented on this page are reconstructed and processed for documentary and editorial purposes based on judicial records and final binding court rulings. Illustrative materials, portraits, and physical evidence depictions are generated or enhanced using Artificial Intelligence and period-accurate graphical assets for purely evocative, non-photorealistic purposes.",
        rights: "All rights reserved.",
      },
    },
    about: {
      hero: {
        eyebrow: "The Project",
        titleStart: "Beyond media hype,",
        titleHighlight: "only data matters.",
        description:
          "The Journal was born from the need to bring investigative and crime journalism back to objectivity. We live in an era where judicial cases are turned into TV spectacles. We believe in a different approach: analytical, documented, and data-driven.",
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
            description:
              "We collect, clean, and cross-reference thousands of public records. From phone logs to expert analyses, we turn complex files into searchable and structured databases.",
          },
          {
            title: "OSINT Connections",
            description:
              "We use Open Source Intelligence techniques to map relationships, movements, and discrepancies. Every node in our graph represents a documented fact.",
          },
          {
            title: "Absolute Objectivity",
            description:
              "No personal opinions, no speculation. We present raw, hard facts. Our goal is not to pass judgment, but to provide the tools to understand.",
          },
        ],
      },
      cta: {
        title: "Explore Public Dossiers",
        description:
          "Access the full archive of analyzed cases. Inspect timelines, verify documents, and trace connections.",
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
        description:
          "How we collect, verify, and connect information. Our process guarantees the traceability of every single node and the reproducibility of our analyses.",
      },
      pipeline: {
        eyebrow: "Analytical Workflow",
        title: "The OSINT Analysis Pipeline",
        step1Title: "1. Acquisition & Ingestion",
        step1Desc:
          "Data extraction from court filings, public repositories, phone records, and metadata. Format sanitization and advanced OCR for paper document digitization.",
        step2Title: "2. Verification & Triangulation",
        step2Desc:
          "Every fact or timestamp must be cross-verified by at least two independent sources or an official document before validation into the database.",
        step3Title: "3. Normalization & Graphing",
        step3Desc:
          "Entity mapping (people, locations, exhibits, timestamps) and semantic extraction to generate relational network graphs.",
      },
      standards: {
        eyebrow: "Transparency Standards",
        title: "Data Integrity Principles",
        items: [
          {
            title: "Digital Chain of Custody",
            description:
              "Every archived document features a cryptographic hash ensuring it hasn't been altered post-acquisition.",
          },
          {
            title: "Geospatial Integration",
            description:
              "Cross-referencing witness accounts and cell tower data with high-res maps to verify spatial-temporal plausibility.",
          },
          {
            title: "Public Source Accessibility",
            description:
              "No data is published without explicit reference to the court file or primary source from which it was extracted.",
          },
        ],
      },
      cta: {
        title: "Explore our protocols in action",
        description:
          "Inspect active dossiers analyzed through our methodology.",
        button: "Browse Cases",
      },
    },
    map: {
      sidebar: {
        badge: "OSINT Map Preview",
        title: "Geolocation & Cell Towers",
        subtitle:
          "Select a dossier to explore coordinates and chronological events.",
        publicNotice: "Public Mode: 12 key nodes displayed out of 142 total.",
        unlockBtn: "Unlock All Nodes",
        caseSelectorLabel: "Available Dossiers",
      },
      nodeDetails: {
        title: "Selected Evidence",
        emptyState:
          "Click a marker on the map or an event to inspect metadata.",
        typeLabel: "Type",
        timeLabel: "Timestamp",
        coordsLabel: "Coordinates",
        sourceLabel: "Reference File",
      },
      mapControls: {
        timeFilterTitle: "Timeline Events",
        lockedFeature:
          "Automated cell tower triangulation is restricted to registered users.",
      },
    },
    login: {
      or: "Or access with...",
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
      descSignUp:
        "Register to access the Control Room and collaborate on active dossiers.",
      descLogin: "Enter your credentials to access the platform.",
      btnSignUp: "Request Access",
      btnLogin: "System Login",
      trustLine:
        "Access restricted to researchers and journalists verified by the editorial staff.",
      backToJournal: "Back to The Journal",
      errors: {
        ["username-too-long"]: "Username must be at most 20 characters long.",
        ["username-too-short"]: "Username must be at least 4 characters long.",
        ["invalid-email"]: "Please enter a valid email address.",
        ["password-too-weak-8-Aa-@$!%*?&"]:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character @$!%*?&.",
        ["passwords-do-not-match"]: "Passwords do not match.",
        ["server-error"]: "An error occurred during sign up. Please try again.",
        ["connection-error"]:
          "Unable to connect to the server. Please check your connection.",
        ["no-user-found"]: "No user found.",
        ["wrong-email"]: "Wrong email.",
        ["wrong-password"]: "Wrong password.",
        ["username-already-exist"]: "Username already exists.",
        ["email-already-exist"]: "Email already exists.",
        ["auth-error"]: "Authentication failed. Please check your credentials.",
      },
      success: {
        ["user-signed-up"]: "Sign up completed successfully!",
        ["user-logged-in"]: "Log in completed successfully!",
      },
    },
    terms: {
      backToLogin: "← Back to login",
      title: "Terms and Conditions of Service",
      lastUpdated: "Last updated",
      lastUpdatedDate: "August 9, 2026",
      sections: {
        acceptanceTitle: "1. Acceptance of Terms",
        acceptanceBody:
          "By accessing or using our service, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you are not permitted to access or use the platform.",
        accountTitle: "2. Account Creation and Security",
        accountBody:
          "To access certain features, you must register an account. You agree to:",
        accountPoints: [
          "Provide accurate, current, and complete information.",
          "Maintain the confidentiality of your login credentials.",
          "Promptly notify us of any unauthorized use of your account.",
        ],
        usageTitle: "3. Permitted Use and Restrictions",
        usageBody:
          "Using the service for illegal or unauthorized purposes is strictly prohibited. You are prohibited from:",
        usagePoints: [
          "Attempting to bypass security measures or access other users' accounts.",
          "Interfering with the proper operation of servers and APIs.",
          "Extracting data using automated tools (scraping) without permission.",
        ],
        intellectualTitle: "4. Intellectual Property",
        intellectualBody:
          "All rights to the source code, design, branding, logo, and content on the platform belong exclusively to their respective owners. Unauthorized reproduction is prohibited.",
        limitationTitle: "5. Limitation of Liability",
        limitationBody:
          'The service is provided "as is" and "as available". We do not guarantee uninterrupted or error-free system performance and will not be liable for any direct or indirect loss of data.',
        suspensionTitle: "6. Account Suspension",
        suspensionBody:
          "We reserve the right to suspend or permanently terminate an account at any time without prior notice in the event of a violation of these Terms.",
        contactTitle: "7. Contact and Inquiries",
        contactBody:
          "For any questions or concerns regarding these Terms of Service, you can reach us via our dedicated support email.",
      },
      rightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
    privacy: {
      backToLogin: "← Back to login",
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      lastUpdatedDate: "August 9, 2026",
      sections: {
        introTitle: "1. Introduction",
        introBody:
          "Your privacy is fundamental to us. This Policy outlines how we collect, use, store, and protect your personal data when you use our services.",
        collectedTitle: "2. Data We Collect",
        collectedBody:
          "We only collect data strictly necessary to provide and improve our service:",
        collectedPoints: [
          "Registration data: email address, username, and encrypted password.",
          "Usage data: IP addresses, browser type, and system logs for security purposes.",
          "Session and language preferences stored locally.",
        ],
        purposeTitle: "3. Purpose of Processing",
        purposeBody:
          "Your data is processed exclusively for the following purposes:",
        purposePoints: [
          "To enable authentication and manage your account.",
          "To ensure security and prevent fraudulent activity or unauthorized access.",
          "To respond to your technical support requests.",
        ],
        sharingTitle: "4. Data Sharing and Third Parties",
        sharingBody:
          "We do not sell or trade your personal data to third parties for commercial purposes. Data is processed only by infrastructure providers (hosting and database) bound by strict confidentiality.",
        securityTitle: "5. Data Security",
        securityBody:
          "We implement advanced security measures, including password encryption using the bcrypt algorithm and HTTPS connections, to prevent unauthorized access or data loss.",
        rightsTitle: "6. Your Rights (GDPR)",
        rightsBody:
          "Under applicable regulations, you have the right to access, rectify, or request the permanent deletion of your account and associated data at any time.",
        contactTitle: "7. Privacy Contacts",
        contactBody:
          "To exercise your rights or for any inquiries regarding data processing, you can contact our privacy lead via email.",
      },
      rightsReserved: "All rights reserved.",
      termsOfService: "Terms and Conditions",
    },
    contact: {
      backToLogin: "← Back to login",
      title: "Contact Channel",
      subtitle:
        "Send a direct transmission to the support team or system administrators.",
      form: {
        nameLabel: "IDENTIFIER / NAME",
        namePlaceholder: "e.g. Agent Smith",
        emailLabel: "EMAIL ADDRESS",
        emailPlaceholder: "agent@agency.org",
        subjectLabel: "TRANSMISSION SUBJECT",
        subjectPlaceholder: "Select a category",
        subjects: {
          general: "General Info / Support",
          bug: "Bug / Anomaly Report",
          security: "Security Vulnerability",
          account: "Account Access Issue",
        },
        messageLabel: "ENCRYPTED MESSAGE",
        messagePlaceholder: "Write the details of your report here...",
        submitButton: "SEND TRANSMISSION",
        submitting: "ENCRYPTING...",
        successMessage: "Transmission sent successfully. Ticket ID: #TRX-985",
        errorMessage: "Transmission error. Please try again later.",
      },
      infoBox: {
        title: "RESPONSE PROTOCOL",
        responseTime: "Estimated response time: < 24 hours.",
        encryptionNote:
          "All messages are secured with end-to-end encryption on our network.",
        directEmail: "DIRECT EMAIL",
        pgpKey: "PGP FINGERPRINT",
      },
      rightsReserved: "All rights reserved.",
      errors: {
        ["email-not-found"]:
          "The email address provided is not associated with any registered account.",
        ["no-text-found"]:
          "Missing data or invalid form. Please fill in all required fields.",
        ["server-error"]:
          "An error occurred while sending your report. Please try again later.",
        ["connection-error"]:
          "Unable to connect to the server. Please check your internet connection.",
        ["username-too-long"]:
          "L'username deve essere al massimo 20 caratteri.",
        ["username-too-short"]: "Username must be at least 4 characters long.",
        ["invalid-email"]: "Email not valid.",
        ["subject-too-short"]: "Subject not valid.",
        ["message-too-short"]:
          "the message must be at least 10 characters long.",
        ["subject-too-long"]: "Subject not valid.",
        ["message-too-long"]:
          "The message must be at most 1000 characters long.",
      },
      success: {
        ["email-sent"]:
          "Report submitted successfully. A confirmation email has been sent.",
      },
    },
    profile: {
      defaultUser: "User",
      activeAccount: "Active Account",
      stats: {
        title: "Evidence & Reports Overview",
        totalSubmitted: "Total Submitted",
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        tooltipPending: "Pending",
        tooltipApproved: "Approved",
        tooltipRejected: "Rejected",
      },
      evidence: {
        title: "Evidence & Reports",
        subtitle: "History of material and associations submitted in your name",
      },
      settings: {
        title: "Account Management & Privacy",
        exportDataTitle: "Export Your Data",
        exportDataDesc: "Download report in JSON format",
        deleteAccountTitle: "Delete Account",
        deleteAccountDesc: "Remove profile and credentials",
      },
      addEvidenceDialog: {
        triggerButton: "Add Evidence",
        title: "Submit New Evidence",
        description: "Select the case/dossier and upload a file to attach.",
        labels: {
          timeline: "Timeline List",
          selectDossier: "Select Dossier / Case",
          noDossiers: "No dossier available",
          fileType: "File Type",
          evidenceTitle: "Evidence Name / Title",
          attachedFile: "Attached File",
          notes: "Italian Notes",
        notes_en: "English Notes",
        },
        placeholders: {
          selectTimeline: "Select a Timeline from the list",
          noTimelines: "No timelines available",
          selectDossierFirst: "Select a Dossier from the list first",
          evidenceTitle: "Enter a name to identify the evidence...",
          dropzoneDefault: "Click or drag a file here",
          dropzoneHint: "PNG, JPG, PDF up to 3 MB",
          notes: "Add a brief description or relevant details...",
        },
        options: {
          photo: "Photo / Image",
          document: "Document (TXT, DOCX)",
          pdf: "PDF",
        },
        buttons: {
          cancel: "Cancel",
          submit: "Submit Evidence",
          submitting: "Submitting...",
        },
           errors:{
          ["evidence-title-too-long"]:
            "The title of the evidence must be at most 50 characters.",
          ["evidence-title-too-short"]:
            "The title of the evidence must be at least 10 characters.",
          ["evidence-file-too-large"]:
            "File must be less than 3 MB.",
          ["evidence-file-type-not-allowed"]:
            "File must be of type PNG, JPG or PDF.",
          ["evidence-file-missing"]:
            "Select a file to attach.",
            ["dossierId-not-selected"]:
            "Select a dossier to attach the evidence to.",
         ["notes-too-short" ]:
            "Notes must be at least 15 characters.",
            ["notes-too-long" ]:
            "Notes must be at most 60 characters.",
            ["file-name-too-long" ]:
            "Name file must be at most 40 characters.",
["file-name-too-short" ]:
            "File name must be at least 10 characters.",
            ["file-missing" ]:
            "Select a file to attach.",
["file-too-large" ]:
            "File must be less than 3 MB.",
            ["invalid-file-format" ]:
            "File must be of type PNG, JPG or PDF.",
["user-not-authenticated" ]:
            "User not authenticated.",
            ["error-creating-evidence" ]:
            "An error occurred while creating the evidence.",
          ["file-upload-failed" ]:
            "An error occurred while uploading the file.",
          
          
          }
      },

      edit: {
        triggerButton: "Edit Profile",
        title: "Profile Management",
        description:
          "Manage your personal details, avatar, and account credentials.",
        chooseAvatar: "Choose your avatar",
        restorePhoto: "Restore original photo",
        labels: {
          username: "Username",
          email: "Email Address",
          oldPassword: "Current Password",
          newPassword: "New Password",
        },
        oauthVerified: "Account verified via",
        securityTitle: "Account Security (Optional)",
        placeholders: {
          password: "••••••••",
        },
        buttons: {
          cancel: "Cancel",
          saving: "Saving...",
          save: "Save Profile Changes",
        },
        errors: {
          ["username-too-long"]:
            "The username must be at most 20 characters long.",
          ["username-too-short"]:
            "Username must be at least 4 characters long.",
          ["username-no-symbols"]:
            "Username must not contain special characters.",
          ["invalid-email"]: "Email not valid.",
          ["invalid-password"]: "Password not valid.",
          ["password-too-weak-8-Aa-@$!%*?&"]:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character @$!%*?&.",
          ["old-password-required"]: "Current password is required.",
          ["user-not-authenticated"]: "User not authenticated.",
          ["fatal-error"]: "Fatal error occurred. Please try again later.",
          ["invalid-old-password"]: "Invalid current password.",
          ["invalid-credentials"]: "Invalid current password.",
          ["invalid-new-password"]: "Invalid new password.",
          ["new-password-required"]: "New password is required.",
        },
      },

      evidenceList: {
        defaultEmptyMessage: "No evidence or reports submitted yet.",
        status: {
          accepted: "Accepted",
          rejected: "Rejected",
          pending: "Pending",
        },
        labels: {
          type: "Type",
          sentOn: "Sent on",
        },
        buttons: {
          showLess: "Show less",
          seeAll: "See all",
        },
      },
      exportData: {
        button: "Export",
        exporting: "Exporting...",
        error: "An error occurred while exporting data.",
      },

      deleteAccount: {
        triggerButton: "Delete Account",
        title: "Are you absolutely sure?",
        description:
          "This action is **irreversible**. Your account, all personal data, and submitted evidence will be permanently deleted or anonymized.",
        confirmPhrase: "Delete my account",
        labelPrompt: "To confirm, type:",
        errorMessage: "Unable to delete account. Please try again later.",
        buttons: {
          cancel: "Cancel",
          deleting: "Deleting...",
          confirm: "Yes, delete my account",
        },
      },
    },
    admin:{
      adminEvidences: {
  title: "Evidence Review",
  total: "total",
  newEvidence: "New Evidence",
  editEvidence: "Edit Evidence",
  uploadedBy: "Uploaded by",
  onDate: "on",
  noEvidences: "No evidence found.",
  statusAccepted: "Accepted",
  statusPending: "Pending",
},evidenceDialog: {
  fileLabel: "File",
    editTitle: "Edit Evidence",
    createTitle: "Add New Evidence",
    editDesc: "Update details related to this evidence item.",
    createDesc: "Associate a new media or document evidence with a dossier.",
    buttonNew: "New Evidence",
    buttonEditTooltip: "Edit Evidence",
    dossierCodeLabel: "Dossier Code (dossierId) *",
    selectDossierPlaceholder: "Select a dossier...",
    typeLabel: "Evidence Type *",
    typePhoto: "Photo (PHOTO)",
    typePdf: "PDF",
    typeDoc: "Document (DOCUMENT)",
    fileUrlLabel: "File URL *",
    fileUrlPlaceholder: "https://... or /uploads/evidence.jpg",
    statusLabel: "Validation Status",
    statusPending: "Pending (PENDING)",
    statusAccepted: "Accepted (ACCEPTED)",
    statusRejected: "Rejected (REJECTED)",
    notesItLabel: "Notes / Details (Italian) *",
    notesItPlaceholder: "Description of the evidence and notes...",
    notesEnLabel: "Notes / Details (English)",
    notesEnPlaceholder: "English notes (optional)...",
    cancelButton: "Cancel",
    saveChangesButton: "Save Changes",
    createButton: "Create Evidence",
       errors: {
      ["dossierId-not-valid"]:
        "The dossierId must be in the format: lower-case letter, score, three numbers (es. dos-001).",
      ["dossierId-too-short"]:
        "The dossierId must be at least 3 characters long.",
      ["dossierId-too-long"]:
        "The dossierId must be at most 6 characters long.",
      ["fileUrl-too-short"]:
        "The fileUrl not valid.",
    ["type-not-valid"]:
        "The type not valid.",
    ["notes-too-short"]:
        "Notes must be at least 10 characters long.",
    ["notes-too-long"]:
        "Notes must be at most 60 characters long.",
     ["validation-error"]:
        "Error during validation.",
        ["user-not-authenticated"]:
            "Administrator not authenticated.", 
      ["server-error"]:
        "Internal server error.",
        ["evidence-created"]:
        "Evidence created successfully.",
      ["errors-creating-evidence-catch"]:
        "Error during evidence creation.",
     ["errors-updating-evidence-catch"]:
        "Error during evidence update.",
          ["forbidden-admin-only"]:
        "Operation not authorized.",
        ["no-evidence-data-provided"]:
        "No evidence data provided.",
     ["evidence-created-successfully"]:
        "Evidence created successfully.",
        ["evidence-id-required"]:
        "ID Evidence required.",
        ["evidence-not-found"]:
        "Evidence not found.",
        ["evidence-updated-successfully"]:
        "Evidence updated successfully.",

     
     
      }
  },deleteDialog: {
    deleteDossierTitle: "Delete Dossier",
    deleteEvidenceTitle: "Delete Evidence",
    dossierLabel: "Dossier",
    evidenceLabel: "Evidence",
    dossierPhrase: "Delete Dossier",
    evidencePhrase: "Delete Evidence",
    confirmDescDossier: "You are about to permanently delete the dossier",
    confirmDescEvidence: "You are about to permanently delete the evidence",
    actionIrreversible: "This action cannot be undone.",
    typeInstruction: "To confirm, type:",
    hereBelow: "below:",
    genericError: "Error during deletion.",
    connectionError: "Connection error.",
    cancelButton: "Cancel",
    deleteButton: "Confirm Deletion",
    deletingState: "Deleting...",
      errors:{
    ["evidence-id-not-found"]:
        "The evidence id not found.",
       ["user-not-authenticated"]:
            "Administrator not authenticated.",
        ["server-error"]:
        "Internal server error.",
        ["errors-deleting-evidence-catch"]:
        "Error during evidence deletion.",
        ["dossier-id-not-found"]:
        "The dossier id not found.",
["dossier-deleted"]:
        "Dossier deleted successfully.",
        ["errors-deleting-dossier-catch"]:
        "Error during dossier deletion.",
 ["forbidden-admin-only"]:
        "Operazione non autorizzata.",
  ["evidence-id-required"]:
        "ID Prova richiesto.",
        ["dossier-deleted-successfully" ]:
        "Dossier deleted successfully.",
        ["dossier-id-required"]:
        "ID Dossier required.",
      }
  },mobileMenu: {
    panelTitle: "ADMIN PANEL",
    overview: "Overview",
    users: "Users",
    dossiers: "Dossiers",
    evidences: "Evidences",
    map: "Map & Points"
  },
  search: {
    placeholder: "Search..."
  },sidebar: {
    panelTitle: "ADMIN PANEL",
    overview: "Overview",
    users: "Users",
    dossiers: "Dossiers",
    evidences: "Evidences",
    map: "Map & Points"
  },usersView: {
    title: "Users Management",
    registeredCount: "registered",
    tableUsername: "Username",
    tableEmail: "Email",
    tableRole: "Role",
    tableCreatedAt: "Registration Date",
    tableActions: "Actions",
    createdOn: "Created on:"
  },dossiersView: {
    title: "Dossier Management",
    linkedEvidences: "Linked evidences:",
    updatedAt: "Updated:",
    createdAt: "Created:"
  },
     overview: {
    title: "General Overview",
    totalUsers: "Total Users",
    activeDossiers: "Active Dossiers",
    pendingEvidences: "Pending Evidences",
    systemStatus: "System Status",
    online: "Online",
    offline: "Offline"
  },
  toggleRole: {
    triggerTitle: "Change Role",
    title: "Modify User Role",
    description: "Are you sure you want to toggle this user's role? A regular user will become an Admin, and vice versa.",
    defaultError: "An unexpected error occurred.",
    successMessage: "User role updated successfully!",
    cancel: "Cancel",
    confirm: "Confirm"
  } ,deleteUser: {
    triggerTitle: "Delete",
    title: "Confirm Deletion",
    description: "Are you sure you want to delete this user? The account will be anonymized in the database to preserve activity history.",
    defaultError: "An unexpected error occurred.",
    successMessage: "User successfully deleted/anonymized!",
    cancel: "Cancel",
    confirm: "Confirm"
  },
    dossierDialog: {
    editTriggerTitle: "Edit Dossier",
    newButton: "New Dossier",
    titleEdit: "Edit Dossier",
    titleCreate: "Create New Dossier",
    descEdit: "Update information for this dossier.",
    descCreate: "Enter essential data to archive a new investigation dossier.",
    codeLabel: "Unique Code *",
    codePlaceholder: "e.g. d-001",
    statusLabel: "Status",
    statusOpen: "Open",
    statusClosed: "Closed",
    statusArchived: "Archived",
    titleItLabel: "Title (Italian) *",
    titleItPlaceholder: "Dossier title",
    titleEnLabel: "Title (English)",
    titleEnPlaceholder: "Title in English (optional)",
    coverUrlLabel: "Cover Image URL *",
    coverUrlPlaceholder: "https://... or /images/cover.jpg",
    descItLabel: "Description (Italian) *",
    descItPlaceholder: "Details and context of the dossier...",
    descEnLabel: "Description (English)",
    descEnPlaceholder: "English description (optional)...",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    createDossier: "Create Dossier",
        errors: {
      ["title-too-short"]: "Title must contain at least 10 characters.",
      ["title-too-long"]: "Title must contain at most 60 characters.",
      ["description-too-short"]: "Description must contain at least 10 characters.",
      ["description-too-long"]: "Description must contain at most 600 characters.",
    ["coverUrl-not-valid"]: "The URL you entered does not respect the correct format.",
    ["validation-error"]: "Validation error.",
    ["admin-not-authenticated"]: "Administrator not authenticated.",
    ["server-error"]: "Internal server error.",
    ["dossier-created"]: "Dossier created successfully.",
    ["errors-creating-dossier-catch"]: "An error occurred while creating the dossier.",
    ["dossier-updated"]: "Dossier updated successfully.",
    ["errors-updating-dossier-catch"]: "An error occurred while updating the dossier.",
    ["forbidden-admin-only"]: "Operation not authorized.",
  ["no-dossier-data-provided"]: "No dossier data provided.",
  ["dossier-created-successfully"]: "Dossier created successfully.",
["dossier-id-required"]: "ID Dossier required.",
["dossier-not-found"]: "Dossier not found.",
["dossier-updated-successfully"]: "Dossier updated successfully.",
["dossierId-not-valid"]: "The dossierId must be in the format: lower-case letter, score, three numbers (es. d-001).",
  }
  }                       
    }
  },
} as const;

//commit env
export type Language = "IT" | "EN";
