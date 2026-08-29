

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FolderArchive,
  Search,
  ChevronRight,
  ChevronLeft,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  ReactFlow,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { getTimelineByDossierId } from "@/action/action";
import { useLanguage } from "@/context/maincontext";
import { FolderNode } from "./mapFolderNode";
import { DocumentNode } from "./mapDocumentNode";
import { PolaroidNode } from "./mapPolaroidNode";
import { PostItNode } from "./mapPostItNode";
import { InstructionNode } from "./mapInstructionNode";
import { PdfNode } from "./mapPdfNode";
import { DbDossier } from "@/lib/type";
const nodeTypes = {
  folder: FolderNode,
  postit: PostItNode,
  polaroid: PolaroidNode,
  document: DocumentNode,
  pdf: PdfNode,
  instruction: InstructionNode,
};

type WelcomeLang = "IT" | "EN";

const WELCOME_COPY: Record<
  WelcomeLang,
  {
    folder: { title: string; code: string; status: string; description: string };
    steps: { label: string; title: string; description: string }[];
    evidence: { label: string; title: string; notes: string };
  }
> = {
  IT: {
    folder: {
      title: "Come Leggere la Board",
      code: "GUIDA",
      status: "Tutorial",
      description: "Ogni caso è un fascicolo con eventi e prove collegate.",
    },
    steps: [
      {
        label: "PASSO 1",
        title: "Ordine Cronologico",
        description: "Gli eventi scorrono da sinistra a destra, in ordine di data.",
      },
      {
        label: "PASSO 2",
        title: "Prove Collegate",
        description: "Ogni prova si dirama dall'evento a cui appartiene.",
      },
      {
        label: "PASSO 3",
        title: "Invia una Prova",
        description: "Registrati per proporre nuove prove sui casi aperti.",
      },
    ],
    evidence: {
      label: "REPERTO",
      title: "Esempio di Prova",
      notes: "Così apparirà una prova reale, ad es. una foto o un documento.",
    },
  },
  EN: {
    folder: {
      title: "How to Read the Board",
      code: "GUIDE",
      status: "Tutorial",
      description: "Each case is a folder with connected events and evidence.",
    },
    steps: [
      {
        label: "STEP 1",
        title: "Chronological Order",
        description: "Events run left to right, in date order.",
      },
      {
        label: "STEP 2",
        title: "Linked Evidence",
        description: "Each piece of evidence branches from its related event.",
      },
      {
        label: "STEP 3",
        title: "Submit Evidence",
        description: "Register to propose new evidence for open cases.",
      },
    ],
    evidence: {
      label: "EXHIBIT",
      title: "Evidence Example",
      notes: "This is how a real piece of evidence will look, e.g. a photo or a document.",
    },
  },
};

function buildWelcomeGraph(lang: WelcomeLang): { nodes: Node[]; edges: Edge[] } {
  const copy = WELCOME_COPY[lang];
  const BASE_Y = 200;
  const STEP_X = 360;

  const folderId = "welcome-folder";
  const nodes: Node[] = [
    {
      id: folderId,
      type: "folder",
      position: { x: 0, y: BASE_Y },
      data: {
        title: copy.folder.title,
        code: copy.folder.code,
        status: copy.folder.status,
        date: "",
        description: copy.folder.description,
      },
    },
  ];

  const edges: Edge[] = [];
  let previousId = folderId;

  copy.steps.forEach((step, index) => {
    const stepId = `welcome-step-${index}`;
    const x = 380 + index * STEP_X;

    nodes.push({
      id: stepId,
      type: "postit",
      position: { x, y: BASE_Y },
      data: { label: step.label, title: step.title, description: step.description },
    });

    edges.push({
      id: `welcome-edge-${previousId}-${stepId}`,
      source: previousId,
      target: stepId,
      style: { stroke: "#b91c1c", strokeWidth: 3 },
    });

    previousId = stepId;

    if (index === 1) {
      const evidenceId = "welcome-evidence-demo";
      nodes.push({
        id: evidenceId,
        type: "polaroid",
        position: { x, y: BASE_Y - 320 },
        data: {
          title: copy.evidence.title,
          label: copy.evidence.label,
          notes: copy.evidence.notes,
          caption: copy.evidence.notes,
        },
      });

      edges.push({
        id: `welcome-edge-${stepId}-${evidenceId}`,
        source: stepId,
        target: evidenceId,
        sourceHandle: "top",
        targetHandle: "bottom",
        style: { stroke: "#b91c1c", strokeWidth: 2, strokeDasharray: "4 4" },
      });
    }
  });

  return { nodes, edges };
}




type InvestigationBoardProps = {
  dossiers: DbDossier[];
};

export default function InvestigationBoard({ dossiers }: InvestigationBoardProps) {
  const { lang } = useLanguage();

  const [selectedDossierId, setSelectedDossierId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeEvidence, setActiveEvidence] = useState<any | null>(null);

  const [nodes, setNodes] = useState<Node[]>(() => buildWelcomeGraph(lang as WelcomeLang).nodes);
  const [edges, setEdges] = useState<Edge[]>(() => buildWelcomeGraph(lang as WelcomeLang).edges);

  useEffect(() => {
    if (selectedDossierId) return;
    const { nodes: welcomeNodes, edges: welcomeEdges } = buildWelcomeGraph(lang as WelcomeLang);
    setNodes(welcomeNodes);
    setEdges(welcomeEdges);
  }, [lang, selectedDossierId]);

  const handleCloseDialog = () => {
    setActiveEvidence(null);
    setZoomLevel(1);
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.type === "postit" || node.type === "folder") return;

    if (
      node.data &&
      (node.data.fileUrl || node.data.imageUrl || node.data.notes || node.data.description)
    ) {
      setActiveEvidence(node.data);
    }
  };

  const handleSelectDossier = async (dossierId: string) => {
    setSelectedDossierId(dossierId);
    setIsSidebarOpen(false);
    setIsLoading(true);

    try {
      const currentDossier = dossiers.find((d) => d.id === dossierId);
      const response = await getTimelineByDossierId(dossierId);

      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];

      const folderNodeId = `folder-${dossierId}`;
      const BASE_Y = 200;

      newNodes.push({
        id: folderNodeId,
        type: "folder",
        position: { x: 0, y: BASE_Y },
        data: {
          title: currentDossier?.title || "Fascicolo d'Indagine",
          code: currentDossier?.id,
          status: currentDossier?.status,
          date: currentDossier?.date,
          coverUrl:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60",
          description: "Documentazione ed evidenze dell'indagine.",
        },
      });

      let previousMainNodeId = folderNodeId;

      response.forEach((item: any, index: number) => {
        const eventNodeId = item.id || `event-${index}`;
        const eventXPos = 380 + index * 360;

        newNodes.push({
          id: eventNodeId,
          type: "postit",
          position: { x: eventXPos, y: BASE_Y },
          data: {
            label: item.date
              ? new Date(item.date).toLocaleDateString("it-IT")
              : `EVENTO #${index + 1}`,
            title: item.title,
            description: item.description,
          },
        });

        newEdges.push({
          id: `edge-main-${previousMainNodeId}-${eventNodeId}`,
          source: previousMainNodeId,
          target: eventNodeId,
          style: { stroke: "#b91c1c", strokeWidth: 3 },
        });

        previousMainNodeId = eventNodeId;

        const evidences = (item.evidences || []).filter(
          (ev: any) => ev.status?.toUpperCase() === "ACCEPTED"
        );

        const STORAGE_BASE_URL =
          process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL ||
          "https://rtzwljhzxmafrnrdvfdc.supabase.co/storage/v1/object/public";

        evidences.forEach((ev: any, evIndex: number) => {
          const evidenceNodeId = `ev-${eventNodeId}-${ev.id || evIndex}`;

          const isAbove = (index + evIndex) % 2 === 0;
          const yOffset = isAbove ? -(220 + evIndex * 180) : 220 + evIndex * 180;
          const xOffset = (evIndex - (evidences.length - 1) / 2) * 30;

          const rawUrl = ev.fileUrl || ev.imageUrl || ev.url || "";
          let finalUrl = "";

          if (rawUrl && (rawUrl.includes("/") || rawUrl.startsWith("http"))) {
            if (rawUrl.startsWith("http")) {
              finalUrl = rawUrl.replace("/public/evidences/", "/public/pending-storage/");
            } else {
              const cleanPath = rawUrl.replace(/^\/+/, "");
              const pathWithoutBucket = cleanPath
                .replace(/^evidences\//, "")
                .replace(/^pending-storage\//, "");
              finalUrl = `${STORAGE_BASE_URL}/pending-storage/${pathWithoutBucket}`;
            }
          }

          const isPdf =
            ev.type === "PDF" ||
            ev.type === "pdf" ||
            ev.mimeType === "application/pdf" ||
            finalUrl.toLowerCase().endsWith(".pdf");

          const isPhoto =
            ev.type === "PHOTO" ||
            ev.type === "polaroid" ||
            (!isPdf && /\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(finalUrl));

          let targetType = "document";
          if (isPdf) {
            targetType = "pdf";
          } else if (isPhoto) {
            targetType = "polaroid";
          }

          const mainNoteText = ev.notes || ev.description || ev.content || ev.title || ev.fileName;

          const evData = {
            title: ev.fileName || ev.title || "Reperto",
            label: ev.type || "REPERTO",
            type: ev.type,
            notes: mainNoteText,
            caption: mainNoteText,
            description: ev.description || ev.content,
            fileUrl: finalUrl,
            imageUrl: isPhoto ? finalUrl : undefined,
          };

          newNodes.push({
            id: evidenceNodeId,
            type: targetType,
            position: { x: eventXPos + xOffset, y: BASE_Y + yOffset },
            data: evData,
          });

          newEdges.push({
            id: `edge-ev-${eventNodeId}-${evidenceNodeId}`,
            source: eventNodeId,
            target: evidenceNodeId,
            sourceHandle: isAbove ? "top" : "bottom",
            targetHandle: isAbove ? "bottom" : undefined,
            style: { stroke: "#b91c1c", strokeWidth: 2, strokeDasharray: "4 4" },
          });
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error("Errore durante il caricamento della timeline:", error);
      setNodes([]);
      setEdges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDossiers = dossiers.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isImageUrl = (url?: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(url);
  };

  const activeMediaUrl = activeEvidence?.imageUrl || activeEvidence?.fileUrl;

  const isPdf =
    activeEvidence?.type === "PDF" ||
    activeEvidence?.type === "pdf" ||
    (activeMediaUrl && /\.pdf($|\?)/i.test(activeMediaUrl));

  const isDoc = activeMediaUrl && /\.(doc|docx)($|\?)/i.test(activeMediaUrl);

  const isPhoto =
    !isPdf &&
    !isDoc &&
    (activeEvidence?.type === "PHOTO" ||
      activeEvidence?.type === "polaroid" ||
      (activeMediaUrl && isImageUrl(activeMediaUrl)) ||
      !!activeEvidence?.imageUrl);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-zinc-950">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="backdrop-blur-xs fixed inset-0 z-30 bg-black/70 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR ARCHIVIO */}
      <aside
        className={`bg-zinc-950/98 fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-zinc-800/80 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out md:relative ${
          isSidebarOpen ? "translate-x-0 md:ml-0" : "-translate-x-full md:-ml-80"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-1 pt-12 md:pt-0">
          <div className="flex items-center gap-2">
            <FolderArchive className="h-5 w-5 text-amber-500" />
            <h2 className="font-serif text-base font-bold uppercase tracking-wider text-zinc-100">
              Archivio Casi
            </h2>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            title="Chiudi archivio"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca fascicolo..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-900/90 py-2 pl-9 pr-3 font-mono text-xs text-zinc-200 placeholder-zinc-500 focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {filteredDossiers.map((c) => {
            const isSelected = c.id === selectedDossierId;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectDossier(c.id)}
                className={`w-full rounded-lg border p-3 text-left transition-all ${
                  isSelected
                    ? "border-amber-800/80 bg-amber-950/30 text-amber-400 shadow-md"
                    : "border-zinc-800/50 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase text-amber-500/70">
                    {c.status}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">{c.date}</span>
                </div>
                <h3 className="line-clamp-1 font-serif text-sm font-bold text-zinc-100">
                  {c.title}
                </h3>
                <div className="mt-2 flex items-center font-mono text-xs text-zinc-500">
                  <span>Carica sulla board</span>
                  <ChevronRight className="ml-auto h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* BOARD DI INVESTIGAZIONE */}
      <main className="relative h-full flex-1 bg-[#1c130d] bg-[radial-gradient(#2d1e15_1px,transparent_1px)] [background-size:16px_16px]">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg border border-amber-900/60 bg-zinc-950/90 px-3 py-2 font-mono text-xs font-medium text-amber-400 shadow-xl backdrop-blur-md transition-all hover:border-amber-500 hover:bg-zinc-900"
          >
            <FolderArchive className="h-4 w-4 text-amber-500" />
            <span>Archivio Casi</span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

        {isLoading ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 font-mono text-amber-500/80">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-xs">Recupero timeline dal fascicolo...</span>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
            className="h-full w-full"
            proOptions={{ hideAttribution: true }}
          >
            <Controls className="!border-zinc-800 !bg-zinc-400 !fill-zinc-400 [&>button:hover]:!bg-zinc-500 [&>button]:!border-b-zinc-800 [&>button]:!bg-zinc-400" />
          </ReactFlow>
        )}
      </main>

      {/* DIALOG SHADCN DI ANTEPRIMA REPERTO */}
      <Dialog open={!!activeEvidence} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="flex h-[92vh] max-w-5xl flex-col gap-2 border-zinc-800 bg-zinc-900 p-3 sm:max-w-5xl  [&>button]:text-zinc-400 [&>button]:hover:text-zinc-100 [&>button]:bg-zinc-100">
          <DialogHeader className="space-y-0 border-b border-zinc-800/80  pr-6 text-left">
            <DialogTitle className="flex items-center gap-2 overflow-hidden text-sm font-bold text-zinc-100">
              <FileText className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
              <span className="flex-shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wide text-amber-500/90">
                {activeEvidence?.label || "REPERTO"}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="truncate font-serif">
                {activeEvidence?.title || activeEvidence?.caption}
              </span>
            </DialogTitle>

            {(activeEvidence?.notes || activeEvidence?.description) && (
              <DialogDescription asChild>
                <p className="mt-1 line-clamp-1 font-mono text-[11px] text-zinc-400">
                  <strong className="text-amber-500/80">Note:</strong>{" "}
                  {activeEvidence.notes || activeEvidence.description}
                </p>
              </DialogDescription>
            )}
          </DialogHeader>

          {/* AREA CONTENUTO CENTRALE */}
          <div className="relative mt-1 flex-1 overflow-hidden rounded border border-zinc-800 bg-zinc-950">
            {isPhoto ? (
              /* 1. IMMAGINI (Con Zoom) */
              <div className="relative flex h-full w-full items-center justify-center overflow-auto bg-black/60 p-2">
                <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/90 p-1 backdrop-blur-md">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                    className="rounded px-2 py-0.5 font-mono text-xs text-zinc-300 hover:bg-zinc-800"
                    title="Riduci Zoom"
                  >
                    -
                  </button>
                  <span className="px-1 font-mono text-[10px] text-amber-500">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                    className="rounded px-2 py-0.5 font-mono text-xs text-zinc-300 hover:bg-zinc-800"
                    title="Aumenta Zoom"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="ml-1 rounded border-l border-zinc-800 pl-1.5 pr-1 font-mono text-[10px] text-zinc-400 hover:text-zinc-100"
                  >
                    Reset
                  </button>
                </div>

                <img
                  src={activeMediaUrl}
                  alt="Anteprima Reperto"
                  style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.15s ease-out" }}
                  className="max-h-full max-w-full origin-center object-contain"
                />
              </div>
            ) : isPdf ? (
              /* 2. PDF (Lettore PDF Nativo nell'iframe) */
              <iframe
                src={activeMediaUrl}
                className="h-full w-full border-0 bg-white"
                title={activeEvidence?.title || "Documento PDF"}
              />
            ) : isDoc ? (
              /* 3. DOC / DOCX (Google Docs Viewer) */
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(activeMediaUrl)}&embedded=true`}
                className="h-full w-full border-0 bg-white"
                title={activeEvidence?.title || "Documento Word"}
              />
            ) : activeMediaUrl ? (
              /* 4. FALLBACK DOCUMENTI GENERICI */
              <iframe
                src={activeMediaUrl}
                className="h-full w-full border-0 bg-white"
                title={activeEvidence?.title || "Anteprima Documento"}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-zinc-500">
                Nessuna anteprima disponibile per questo reperto.
              </div>
            )}
          </div>

          {/* BARRA INFERIORE */}
          <div className="mt-1 flex items-center justify-between pt-1">
            {activeMediaUrl ? (
              <a
                href={activeMediaUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-mono text-[11px] text-amber-500 transition-colors hover:text-amber-400 hover:underline"
              >
                <span>Apri file originale in una nuova scheda</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <div />
            )}

            <button
              onClick={handleCloseDialog}
              className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              Chiudi
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}