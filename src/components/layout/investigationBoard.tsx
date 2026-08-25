"use client";

import { useCallback, useState } from "react";


import {
  FolderArchive,
  Search,
  ChevronRight,
  ChevronLeft,
  Pin,
  Image as ImageIcon,


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

// ---  NODI STILE "POST-IT" E "POLAROID" ---

const PostItNode = ({ data }: { data: any }) => (
  <div className="relative w-48 sm:w-56 rotate-[-1deg] rounded-sm bg-amber-100 p-3 sm:p-4 text-zinc-900 shadow-[8px_12px_20px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 hover:z-20">
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-700 drop-shadow-md">
      <Pin className="h-5 w-5 sm:h-6 sm:w-6 fill-red-700" />
    </div>

    <Handle type="target" position={Position.Top} className="!bg-red-800 !w-3 !h-3" />
    
    <div className="pt-2">
      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-800/80 font-bold block border-b border-amber-300 pb-1">
        {data.label}
      </span>
      <h4 className="mt-1 font-serif text-sm sm:text-base font-bold text-zinc-900 leading-tight">
        {data.title}
      </h4>
      {data.description && (
        <p className="mt-1.5 font-mono text-[11px] sm:text-xs text-zinc-700 leading-relaxed">
          {data.description}
        </p>
      )}
    </div>

    <Handle type="source" position={Position.Bottom} className="!bg-red-800 !w-3 !h-3" />
  </div>
);

const PolaroidNode = ({ data }: { data: any }) => (
  <div className="relative w-44 sm:w-52 rotate-[2deg] rounded-sm bg-zinc-100 p-2.5 sm:p-3 pt-3 pb-4 sm:pb-5 shadow-[10px_14px_24px_rgba(0,0,0,0.7)] transition-transform hover:scale-105 hover:z-20">
    <div className="absolute -top-3 left-1/3 h-4 sm:h-5 w-12 sm:w-16 bg-amber-200/40 backdrop-blur-xs border border-amber-300/30 rotate-[-5deg] shadow-sm" />

    <Handle type="target" position={Position.Top} className="!bg-zinc-800" />
    
    <div className="h-28 sm:h-32 w-full bg-zinc-900 rounded-xs overflow-hidden flex items-center justify-center border border-zinc-300">
      <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-600" />
    </div>
    
    <p className="mt-2.5 font-mono text-[11px] sm:text-xs text-zinc-800 font-semibold text-center leading-tight">
      {data.caption}
    </p>

    <Handle type="source" position={Position.Bottom} className="!bg-zinc-800" />
  </div>
);

const nodeTypes = {
  postit: PostItNode,
  polaroid: PolaroidNode,
};


// dymmy data for preview

const CASES_DATA = [
  {
    id: "case-1",
    title: "Caso #402: Operazione Nebbia",
    date: "12/05/2026",
    status: "In Corso",
    nodes: [
      {
        id: "1",
        type: "postit",
        position: { x: 250, y: 50 },
        data: { label: "Fascicolo Principale", title: "Operazione Nebbia", description: "Indagine su frodi e comunicazioni criptate." },
      },
      {
        id: "2",
        type: "postit",
        position: { x: 50, y: 260 },
        data: { label: "Sospetto #1", title: "Marco V.", description: "Avvistato nei pressi del molo 4 alle ore 23:15." },
      },
      {
        id: "3",
        type: "polaroid",
        position: { x: 420, y: 240 },
        data: { caption: "Targa Auto Sospetta (Enhance x4)" },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", style: { stroke: "#b91c1c", strokeWidth: 3 } },
      { id: "e1-3", source: "1", target: "3", style: { stroke: "#b91c1c", strokeWidth: 3 } },
    ],
  },
  {
    id: "case-2",
    title: "Caso #109: Il Silenzio del Molo",
    date: "28/04/2026",
    status: "Archiviato",
    nodes: [
      {
        id: "1",
        type: "postit",
        position: { x: 200, y: 80 },
        data: { label: "Fascicolo #109", title: "Il Silenzio del Molo", description: "Rilievo impronte e tabulati della notte di pioggia." },
      },
    ],
    edges: [],
  },
];

export default function InvestigationBoard() {
  const [selectedCaseId, setSelectedCaseId] = useState("case-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const activeCase = CASES_DATA.find((c) => c.id === selectedCaseId) || CASES_DATA[0];

  const [nodes, setNodes] = useState<Node[]>(activeCase.nodes);
  const [edges, setEdges] = useState<Edge[]>(activeCase.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleSelectCase = (caseItem: typeof CASES_DATA[0]) => {
    setSelectedCaseId(caseItem.id);
    setNodes(caseItem.nodes);
    setEdges(caseItem.edges);
    setIsSidebarOpen(false); 
  };

  return (
    <div className="relative flex h-screen w-full bg-zinc-950  overflow-hidden">
      
      {/* 🟢 OVERLAY PER MOBILE (Sfondo scuro quando la sidebar è aperta) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* 📁 SIDEBAR CASI (Drawer Flessibile) */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-zinc-800/80 bg-zinc-950/98 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "translate-x-0 md:ml-0"
            : "-translate-x-full md:-ml-80"
        }`}
      >
        <div className="flex items-center justify-between mb-6 px-1 pt-12 md:pt-0">
          <div className="flex items-center gap-2">
            <FolderArchive className="h-5 w-5 text-amber-500" />
            <h2 className="font-serif text-base font-bold text-zinc-100 tracking-wider uppercase">
              Archivio Casi
            </h2>
          </div>

          {/* Tasto per richiudere la sidebar */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            title="Chiudi archivio"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Cerca Caso */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Cerca fascicolo..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-900/90 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Lista Casi */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {CASES_DATA.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectCase(c)}
                className={`w-full text-left rounded-lg p-3 transition-all border ${
                  isSelected
                    ? "bg-amber-950/30 border-amber-800/80 text-amber-400 shadow-md"
                    : "bg-zinc-900/40 border-zinc-800/50 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase text-amber-500/70 font-semibold">
                    {c.status}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">{c.date}</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-zinc-100 line-clamp-1">
                  {c.title}
                </h3>
                <div className="mt-2 flex items-center text-xs text-zinc-500 font-mono">
                  <span>Carica sulla board</span>
                  <ChevronRight className="h-3 w-3 ml-auto" />
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 🪵 TABELLONE SCRIVANIA (A TUTTO SCHERMO) */}
      <main className="flex-1 h-full relative bg-[#1c130d] bg-[radial-gradient(#2d1e15_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Pulsante Fluttuante per aprire l'Archivio Casi quando la sidebar è chiusa */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg border border-amber-900/60 bg-zinc-950/90 px-3 py-2 text-xs font-mono font-medium text-amber-400 shadow-xl backdrop-blur-md transition-all hover:bg-zinc-900 hover:border-amber-500"
          >
            <FolderArchive className="h-4 w-4 text-amber-500" />
            <span>Archivio Casi</span>
          </button>
        )}

        {/* Effetto ombra vignettatura */}
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

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
          <Controls 
            className="!bg-zinc-400 !border-zinc-800 !fill-zinc-400 [&>button]:!border-b-zinc-800 [&>button]:!bg-zinc-400 [&>button:hover]:!bg-zinc-500"
          />
        </ReactFlow>
      </main>

    </div>
  );
}