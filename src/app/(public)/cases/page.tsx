"use client";



import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Film,
  Newspaper,
  FileLock2,
  CalendarDays,
  ArrowRight,

} from "lucide-react";

// ---------------------------------------------------------------------------
// Tipi e dati (in produzione: fetch da API / CMS)
// ---------------------------------------------------------------------------

type CaseStatus = "IN CORSO" | "ARCHIVIATO";

interface EvidenceItem {
  id: string;
  type: "clipping" | "document";
  label: string;
  caption: string;
}

interface CaseFile {
  id: string;
  slug: string;
  frameCode: string; // es. "#001", stampato sul fotogramma
  code: string; // es. "CASE_014", codice dossier
  title: string;
  dateOpened: string;
  status: CaseStatus;
  synopsis: string;
  evidence: [EvidenceItem, EvidenceItem];
}

const CASES: CaseFile[] = [
  {
    id: "garlasco",
    slug: "garlasco",
    frameCode: "#001",
    code: "CASE_014",
    title: "Caso Garlasco",
    dateOpened: "Apertura: 13 Ago 2007",
    status: "ARCHIVIATO",
    synopsis:
      "Ricostruzione cronologica degli atti processuali e delle perizie tecniche depositate nei diversi gradi di giudizio, con un confronto sistematico delle fonti disponibili.",
    evidence: [
      { id: "e1", type: "clipping", label: "Ritaglio stampa", caption: "Prima pagina, edizione locale" },
      { id: "e2", type: "document", label: "Verbale riservato", caption: "Atto secretato — estratto" },
    ],
  },
  {
    id: "pietracatella",
    slug: "pietracatella",
    frameCode: "#002",
    code: "CASE_027",
    title: "Caso Pietracatella",
    dateOpened: "Apertura: 04 Feb 2019",
    status: "IN CORSO",
    synopsis:
      "Dossier aperto su un caso rimasto irrisolto in un piccolo comune del Molise, ricostruito attraverso atti pubblici e testimonianze raccolte sul territorio.",
    evidence: [
      { id: "e1", type: "document", label: "Fascicolo indagini", caption: "Estratto non secretato" },
      { id: "e2", type: "clipping", label: "Rassegna stampa", caption: "Cronaca locale, 2019" },
    ],
  },
  {
    id: "appalto-nord-est",
    slug: "appalto-nord-est",
    frameCode: "#003",
    code: "CASE_031",
    title: "Dossier Appalto Nord-Est",
    dateOpened: "Apertura: 21 Nov 2023",
    status: "IN CORSO",
    synopsis:
      "Analisi incrociata di appalti pubblici e società collegate, per mappare una rete di controllo poco trasparente attorno a un grande cantiere infrastrutturale.",
    evidence: [
      { id: "e1", type: "document", label: "Bando di gara", caption: "Documento amministrativo" },
      { id: "e2", type: "document", label: "Visura societaria", caption: "Rete di collegamenti" },
    ],
  },
  {
    id: "via-dei-mille",
    slug: "via-dei-mille",
    frameCode: "#004",
    code: "CASE_038",
    title: "Caso Via dei Mille",
    dateOpened: "Apertura: 09 Giu 2021",
    status: "IN CORSO",
    synopsis:
      "Un incendio in un edificio residenziale diventa il punto di partenza per ricostruire una serie di irregolarità edilizie mai del tutto chiarite.",
    evidence: [
      { id: "e1", type: "clipping", label: "Cronaca locale", caption: "Edizione del giorno dopo" },
      { id: "e2", type: "document", label: "Perizia tecnica", caption: "Relazione dei vigili del fuoco" },
    ],
  },
  {
    id: "sanita-regionale",
    slug: "sanita-regionale",
    frameCode: "#005",
    code: "CASE_042",
    title: "Dossier Sanità Regionale",
    dateOpened: "Apertura: 17 Mar 2016",
    status: "ARCHIVIATO",
    synopsis:
      "Un'inchiesta chiusa su presunte irregolarità negli appalti sanitari regionali, ricostruita attraverso migliaia di pagine di atti amministrativi.",
    evidence: [
      { id: "e1", type: "document", label: "Delibera regionale", caption: "Atto amministrativo pubblico" },
      { id: "e2", type: "clipping", label: "Editoriale", caption: "Approfondimento redazionale" },
    ],
  },
];

// Sfondi placeholder per i fotogrammi, ciclici e coerenti col tema dark.
const FRAME_GRADIENTS = [
  "bg-gradient-to-br from-zinc-800 to-zinc-950",
  "bg-gradient-to-br from-amber-950/30 to-zinc-950",
  "bg-gradient-to-br from-zinc-900 to-neutral-950",
  "bg-gradient-to-br from-stone-800 to-zinc-950",
  "bg-gradient-to-br from-zinc-800 to-neutral-950",
];

const HAZARD_STRIPES =
  "repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#18181b_10px,#18181b_20px)";

// ---------------------------------------------------------------------------
// Componenti di supporto
// ---------------------------------------------------------------------------

/** Perforazioni della pellicola, sui bordi lunghi dello strip (top/bottom su mobile, left/right su desktop). */
function Sprockets({ edge }: { edge: "start" | "end" }) {
  const holes = Array.from({ length: 22 });
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 flex items-center justify-around gap-1 px-3",
        "inset-x-0 h-3",
        edge === "start" ? "top-0" : "bottom-0",
        "lg:inset-x-auto lg:top-0 lg:h-full lg:w-3 lg:flex-col lg:justify-around lg:py-3 lg:px-0",
        edge === "start" ? "lg:left-0" : "lg:right-0"
      )}
    >
      {holes.map((_, idx) => (
        <span
          key={idx}
          className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-zinc-800 ring-1 ring-inset ring-zinc-700"
        />
      ))}
    </div>
  );
}

/** Singolo fotogramma cliccabile della pellicola 8mm. */
function FilmFrame({
  data,
  index,
  isSelected,
  onSelect,
}: {
  data: CaseFile;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isSelected ? "true" : undefined}
      aria-label={`Apri il caso ${data.title}`}
      className={cn(
        "group relative w-60 shrink-0 rounded-md border-2 border-transparent bg-zinc-900/80 p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 lg:w-full",
        !isSelected && "hover:border-zinc-700"
      )}
    >
      {isSelected && (
        <motion.span
          layoutId="active-frame-glow"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none absolute inset-0 rounded-md border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        />
      )}

      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden rounded-sm",
          FRAME_GRADIENTS[index % FRAME_GRADIENTS.length]
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="h-6 w-6 text-zinc-600" strokeWidth={1.5} />
        </div>
        {isSelected && (
          <span className="absolute right-1.5 top-1.5 rounded-sm bg-amber-500 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-zinc-950">
            {data.code}
          </span>
        )}
      </div>

      <div className="mt-1.5 px-0.5">
        <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          KODAK 8MM · {data.frameCode}
        </span>
        <p className="truncate text-xs text-zinc-300">{data.title}</p>
      </div>
    </button>
  );
}

/** Badge di stato del caso: acceso (IN CORSO) o spento (ARCHIVIATO). */
function StatusPill({ status }: { status: CaseStatus }) {
  const inProgress = status === "IN CORSO";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider",
        inProgress ? "bg-amber-500 text-zinc-950" : "bg-neutral-600 text-neutral-100"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          inProgress ? "bg-zinc-950 motion-safe:animate-pulse" : "bg-neutral-300"
        )}
      />
      {status}
    </span>
  );
}

/** Card prova in stile polaroid (ritaglio) o file riservato (documento). */
function EvidenceCard({ evidence, tilt }: { evidence: EvidenceItem; tilt: string }) {
  const isClipping = evidence.type === "clipping";
  return (
    <div className={cn("group relative transition-transform duration-300 hover:rotate-0", tilt)}>
      <div
        className={cn(
          "rounded-sm p-2 shadow-lg",
          isClipping ? "bg-zinc-100" : "border border-zinc-800 bg-zinc-900"
        )}
      >
        <div
          className={cn(
            "flex aspect-[4/5] items-center justify-center rounded-[2px]",
            isClipping ? "bg-zinc-300" : "bg-zinc-950"
          )}
        >
          {isClipping ? (
            <Newspaper className="h-6 w-6 text-zinc-500" strokeWidth={1.5} />
          ) : (
            <FileLock2 className="h-6 w-6 text-zinc-700" strokeWidth={1.5} />
          )}
        </div>
        <p
          className={cn(
            "mt-2 truncate text-center font-mono text-[10px] uppercase tracking-wider",
            isClipping ? "text-zinc-600" : "text-zinc-500"
          )}
        >
          {evidence.label}
        </p>
      </div>
      <span className="mt-1 block truncate text-center text-[11px] text-zinc-500">
        {evidence.caption}
      </span>
    </div>
  );
}

const previewVariants: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2, ease: "easeIn" } },
};

// ---------------------------------------------------------------------------
// Pagina
// ---------------------------------------------------------------------------

export default function CasiPage() {
  const [selectedId, setSelectedId] = React.useState<string>(CASES[0].id);
  const selectedCase = CASES.find((c) => c.id === selectedId) ?? CASES[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Barra superiore minimale */}


      {/* Layout Master (pellicola) / Detail (preview) */}
      <div className="flex flex-col lg:flex-row">
        {/* --------------------------------------------------------- */}
        {/* PELLICOLA 8MM — selettore casi                             */}
        {/* --------------------------------------------------------- */}
        <aside
          className="relative shrink-0 border-b border-zinc-900 bg-neutral-950 lg:h-[calc(100vh-3.5rem)] lg:w-80 lg:border-b-0 lg:border-r lg:sticky lg:top-14 lg:overflow-y-auto"
          aria-label="Elenco casi"
        >
          <Sprockets edge="start" />
          <Sprockets edge="end" />

          <div className="flex gap-4 overflow-x-auto px-4 py-5 lg:flex-col lg:gap-5 lg:overflow-x-visible lg:px-7 lg:py-8">
            {CASES.map((item, index) => (
              <FilmFrame
                key={item.id}
                data={item}
                index={index}
                isSelected={item.id === selectedId}
                onSelect={() => setSelectedId(item.id)}
              />
            ))}
          </div>
        </aside>

        {/* --------------------------------------------------------- */}
        {/* PREVIEW — dettaglio del caso selezionato                   */}
        {/* --------------------------------------------------------- */}
        <main className="flex-1 px-4 py-10 sm:px-8 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:px-12 lg:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCase.id}
              variants={previewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mx-auto max-w-3xl"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={selectedCase.status} />
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {selectedCase.dateOpened}
                </span>
                <span className="font-mono text-xs text-zinc-600">{selectedCase.code}</span>
              </div>

              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                {selectedCase.title}
              </h2>

              {/* Immagine di copertina */}
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent" />
                <div
                  className="absolute -left-12 top-7 w-48 -rotate-45 py-1 text-center font-mono text-[9px] font-bold tracking-widest text-zinc-950 shadow-lg"
                  style={{ backgroundImage: HAZARD_STRIPES }}
                  aria-hidden="true"
                >
                  SCENA DEL CRIMINE
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Newspaper className="h-10 w-10 text-zinc-700" strokeWidth={1.25} />
                </div>
              </div>

              {/* Sinossi */}
              <p className="mt-8 text-pretty leading-relaxed text-zinc-400">
                {selectedCase.synopsis}
              </p>

              {/* Anteprima prove */}
              <div className="mt-10">
                <div
                  className="mb-4 h-1.5 w-16 rounded-full"
                  style={{ backgroundImage: HAZARD_STRIPES }}
                  aria-hidden="true"
                />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500">
                  Prove raccolte
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-6 sm:max-w-xs sm:gap-8">
                  {selectedCase.evidence.map((ev, i) => (
                    <EvidenceCard
                      key={ev.id}
                      evidence={ev}
                      tilt={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
                    />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 bg-amber-500 text-zinc-950 hover:bg-amber-400 focus-visible:ring-amber-400"
                >
                  <Link href={`/casi/${selectedCase.slug}`}>
                    Esamina Dossier Completo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
