"use client";

import { useCallback, useState } from "react";
import {
  FolderArchive,
  Search,
  ChevronRight,
  ChevronLeft,
  Pin,
  Image as ImageIcon,
  Loader2,
  FolderOpen,
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
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getTimelineByDossierId } from "@/action/action";

// --- NODI PERSONALIZZATI ---

const InstructionNode = ({ data }: { data: any }) => (
  <div className="relative w-64 rotate-[-2deg] rounded-sm bg-amber-200 p-4 text-zinc-900 shadow-[10px_14px_24px_rgba(0,0,0,0.7)] transition-transform hover:z-20 hover:scale-105">
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-700 drop-shadow-md">
      <Pin className="h-6 w-6 fill-red-700" />
    </div>
    <div className="pt-2">
      <span className="block border-b border-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-900">
        {data.label || "ISTRUZIONI BOARD"}
      </span>
      <h4 className="mt-1.5 font-serif text-base font-bold leading-tight text-zinc-900">
        {data.title}
      </h4>
      <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-800">
        {data.description}
      </p>
      {data.actionText && (
        <button
          onClick={data.onAction}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-amber-900 py-1.5 font-mono text-xs font-semibold text-amber-100 shadow-md transition-colors hover:bg-amber-800"
        >
          <FolderOpen className="h-3.5 w-3.5" />
          <span>{data.actionText}</span>
        </button>
      )}
    </div>
  </div>
);

const PostItNode = ({ data }: { data: any }) => (
  <div className="relative w-48 rotate-[-1deg] rounded-sm bg-amber-100 p-3 text-zinc-900 shadow-[8px_12px_20px_rgba(0,0,0,0.6)] transition-transform hover:z-20 hover:scale-105 sm:w-56 sm:p-4">
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-700 drop-shadow-md">
      <Pin className="h-5 w-5 fill-red-700 sm:h-6 sm:w-6" />
    </div>

    <Handle type="target" position={Position.Top} className="!h-3 !w-3 !bg-red-800" />

    <div className="pt-2">
      <span className="block border-b border-amber-300 font-mono text-[9px] font-bold uppercase tracking-widest text-amber-800/80 sm:text-[10px]">
        {data.label}
      </span>
      <h4 className="mt-1 font-serif text-sm font-bold leading-tight text-zinc-900 sm:text-base">
        {data.title}
      </h4>
      {data.description && (
        <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-zinc-700 sm:text-xs">
          {data.description}
        </p>
      )}
    </div>

    <Handle type="source" position={Position.Bottom} className="!h-3 !w-3 !bg-red-800" />
  </div>
);

const PolaroidNode = ({ data }: { data: any }) => (
  <div className="relative w-44 rotate-[2deg] rounded-sm bg-zinc-100 p-2.5 pb-4 pt-3 shadow-[10px_14px_24px_rgba(0,0,0,0.7)] transition-transform hover:z-20 hover:scale-105 sm:w-52 sm:p-3 sm:pb-5">
    <div className="backdrop-blur-xs absolute -top-3 left-1/3 h-4 w-12 rotate-[-5deg] border border-amber-300/30 bg-amber-200/40 shadow-sm sm:h-5 sm:w-16" />

    <Handle type="target" position={Position.Top} className="!bg-zinc-800" />

    <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-xs border border-zinc-300 bg-zinc-900 sm:h-32">
      {data.imageUrl ? (
        <img src={data.imageUrl} alt={data.caption} className="h-full w-full object-cover" />
      ) : (
        <ImageIcon className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
      )}
    </div>

    <p className="mt-2.5 text-center font-mono text-[11px] font-semibold leading-tight text-zinc-800 sm:text-xs">
      {data.caption}
    </p>

    <Handle type="source" position={Position.Bottom} className="!bg-zinc-800" />
  </div>
);

const nodeTypes = {
  instruction: InstructionNode,
  postit: PostItNode,
  polaroid: PolaroidNode,
};

// Post-it di default visibili all'avvio
const INITIAL_INSTRUCTION_NODES: Node[] = [
  {
    id: "welcome-1",
    type: "instruction",
    position: { x: 150, y: 150 },
    data: {
      label: "NOTA DI BENVENUTO",
      title: "Seleziona un Caso",
      description:
        "Benvenuto nel sistema di investigazione. Apri il pannello laterale a sinistra per esplorare i dossier pubblicamente accessibili.",
    },
  },

];

const INITIAL_DOSSIERS = [
  {
    id: "dos-001",
    title: "Caso #402: Operazione Nebbia",
    date: "12/05/2026",
    status: "In Corso",
  },
  {
    id: "dos-002",
    title: "Caso #109: Il Silenzio del Molo",
    date: "28/04/2026",
    status: "Archiviato",
  },
  {
    id: "dos-003",
    title: "Caso #205: Ombre sul Lago",
    date: "15/03/2026",
    status: "In Corso",
  },
];

export default function InvestigationBoard() {
  const [selectedDossierId, setSelectedDossierId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Inizializzazione diretta nello stato (NESSUN useEffect)
  const [nodes, setNodes] = useState<Node[]>(INITIAL_INSTRUCTION_NODES);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleSelectDossier = async (dossierId: string) => {
    setSelectedDossierId(dossierId);
    setIsSidebarOpen(false);
    setIsLoading(true);

    try {
      const response = await getTimelineByDossierId(dossierId);

      if (response && response.length > 0) {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        response.forEach((item: any, index: number) => {
          const nodeId = item.id || `node-${index}`;

          newNodes.push({
            id: nodeId,
            type: "postit",
            position: { x: index * 300 + 100, y: index % 2 === 0 ? 120 : 280 },
            data: {
              label: new Date(item.date).toLocaleDateString("it-IT"),
              title: item.title,
              description: item.description,
            },
          });

          if (index > 0) {
            const prevNodeId = response[index - 1].id || `node-${index - 1}`;
            newEdges.push({
              id: `edge-${prevNodeId}-${nodeId}`,
              source: prevNodeId,
              target: nodeId,
              style: { stroke: "#b91c1c", strokeWidth: 3 },
            });
          }
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } else {
        setNodes([]);
        setEdges([]);
      }
    } catch (error) {
      console.error("Errore durante il caricamento della timeline:", error);
      setNodes([]);
      setEdges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDossiers = INITIAL_DOSSIERS.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-zinc-950">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="backdrop-blur-xs fixed inset-0 z-30 bg-black/70 md:hidden"
          aria-hidden="true"
        />
      )}

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
            fitView
            className="h-full w-full"
            proOptions={{ hideAttribution: true }}
          >
            <Controls className="!border-zinc-800 !bg-zinc-400 !fill-zinc-400 [&>button:hover]:!bg-zinc-500 [&>button]:!border-b-zinc-800 [&>button]:!bg-zinc-400" />
          </ReactFlow>
        )}
      </main>
    </div>
  );
}