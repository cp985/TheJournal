// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useLanguage } from "@/context/maincontext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Lock, MapPin, Radio, FileText, Layers, Crosshair, ArrowRight } from "lucide-react";

// // Dati mock per il caso demo in public
// const DEMO_CASES = [
//   {
//     id: "case-01",
//     code: "DOSSIER-01/VP",
//     title: "Caso Via Poma (Demo)",
//     nodesCount: 12,
//     totalNodes: 142,
//     active: true,
//   },
//   {
//     id: "case-02",
//     code: "DOSSIER-02/OG",
//     title: "Delitto Olgiata (Riservato)",
//     nodesCount: 0,
//     totalNodes: 89,
//     active: false,
//     locked: true,
//   },
// ];

// const DEMO_NODES = [
//   {
//     id: "node-1",
//     title: "Rilevazione Cella Telefonia",
//     type: "Cell Tower",
//     time: "17:30:12",
//     coords: "41.9168° N, 12.4935° E",
//     source: "Tabulato Telecom - Allegato B4",
//     desc: "Aggancio cella di zona da parte dell'utenza target durante l'orario di interesse.",
//   },
//   {
//     id: "node-2",
//     title: "Ritrovamento Reperto A",
//     type: "Evidence",
//     time: "18:15:00",
//     coords: "41.9172° N, 12.4941° E",
//     source: "Verbale DCI - Pagina 14",
//     desc: "Coordinate esatte del luogo del primo sopralluogo e inventario reperti.",
//   },
// ];

//  function PublicMapPage() {
//   const { t } = useLanguage();
//   const { sidebar, nodeDetails, mapControls } = t.map;
//   const [selectedNode, setSelectedNode] = useState<typeof DEMO_NODES[0] | null>(DEMO_NODES[0]);

//   return (
//     <main className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-zinc-950 text-zinc-100">
//       {/* SIDEBAR SINISTRA: MINIATURE CASI E DETTAGLIO NODO */}
//       <aside className="w-80 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-4 flex flex-col justify-between overflow-y-auto">
//         <div className="space-y-6">
//           {/* Header Sidebar */}
//           <div>
//             <div className="inline-flex items-center gap-1.5 rounded border border-amber-900/50 bg-amber-950/20 px-2 py-0.5 font-mono text-[10px] uppercase text-amber-500">
//               <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
//               {sidebar.badge}
//             </div>
//             <h1 className="mt-2 font-serif text-xl font-semibold">{sidebar.title}</h1>
//             <p className="mt-1 text-xs text-zinc-400">{sidebar.subtitle}</p>
//           </div>

//           {/* Selezione Caso (Stile Miniatures / Filmstrip) */}
//           <div className="space-y-2">
//             <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
//               {sidebar.caseSelectorLabel}
//             </span>
//             {DEMO_CASES.map((item) => (
//               <div
//                 key={item.id}
//                 className={`relative rounded-md border p-3 transition-all ${
//                   item.active
//                     ? "border-amber-500/50 bg-amber-950/10"
//                     : "border-zinc-800 bg-zinc-900/20 opacity-60"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="font-mono text-[10px] text-amber-500">{item.code}</span>
//                   {item.locked && <Lock className="h-3 w-3 text-zinc-500" />}
//                 </div>
//                 <h3 className="font-serif text-sm font-medium mt-1 text-zinc-200">{item.title}</h3>
//                 <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
//                   <span>
//                     Nodi: <strong className="text-zinc-200">{item.nodesCount}</strong> / {item.totalNodes}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dettaglio del Nodo Selezionato */}
//           <Card className="border-zinc-800 bg-zinc-950/60">
//             <CardHeader className="p-3 pb-2">
//               <CardTitle className="text-xs font-mono uppercase text-amber-500 flex items-center gap-1.5">
//                 <Crosshair className="h-3.5 w-3.5" />
//                 {nodeDetails.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-3 pt-0 text-xs space-y-2">
//               {selectedNode ? (
//                 <>
//                   <div>
//                     <span className="text-zinc-500">{nodeDetails.typeLabel}: </span>
//                     <Badge variant="outline" className="text-[10px] border-amber-900/40 text-amber-400">
//                       {selectedNode.type}
//                     </Badge>
//                   </div>
//                   <h4 className="font-medium text-zinc-200">{selectedNode.title}</h4>
//                   <div className="text-zinc-400 font-mono text-[11px]">
//                     🕒 {selectedNode.time} | 📍 {selectedNode.coords}
//                   </div>
//                   <p className="text-zinc-400 text-[11px] leading-relaxed mt-1">{selectedNode.desc}</p>
//                   <div className="border-t border-zinc-800 pt-1 text-[10px] text-zinc-500 italic">
//                     {selectedNode.source}
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-zinc-500 italic text-[11px]">{nodeDetails.emptyState}</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Notice Pubblica e CTA Lock */}
//         <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
//           <p className="text-[11px] text-zinc-400 leading-normal">{sidebar.publicNotice}</p>
//           <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs">
//             <Link href="/login">
//               <Lock className="mr-1.5 h-3.5 w-3.5" />
//               {sidebar.unlockBtn}
//             </Link>
//           </Button>
//         </div>
//       </aside>

//       {/* CANVAS MAPPA (DESTRA) */}
//       <section className="relative flex-1 bg-zinc-950 flex items-center justify-center">
//         {/* Griglia di sfondo / Placeholder di mappa vettoriale */}
//         <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

//         {/* Simulazione Punti Interattivi sulla Mappa */}
//         <div className="relative z-10 w-full h-full flex items-center justify-center">
//           {/* Marker 1 */}
//           <button
//             onClick={() => setSelectedNode(DEMO_NODES[0])}
//             className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all ${
//               selectedNode?.id === "node-1"
//                 ? "bg-amber-500/20 border-amber-500 scale-125"
//                 : "bg-zinc-900 border-zinc-700 hover:border-amber-500"
//             }`}
//           >
//             <Radio className="h-5 w-5 text-amber-500 animate-pulse" />
//           </button>

//           {/* Marker 2 */}
//           <button
//             onClick={() => setSelectedNode(DEMO_NODES[1])}
//             className={`absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all ${
//               selectedNode?.id === "node-2"
//                 ? "bg-amber-500/20 border-amber-500 scale-125"
//                 : "bg-zinc-900 border-zinc-700 hover:border-amber-500"
//             }`}
//           >
//             <MapPin className="h-5 w-5 text-amber-500" />
//           </button>

//           {/* Overlay Avviso Feature Bloccate */}
//           <div className="absolute bottom-6 right-6 max-w-sm rounded-md border border-zinc-800 bg-zinc-900/90 p-3 backdrop-blur shadow-xl">
//             <div className="flex items-start gap-2.5">
//               <Layers className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
//               <div className="space-y-1">
//                 <p className="text-xs font-medium text-zinc-200">{mapControls.timeFilterTitle}</p>
//                 <p className="text-[11px] text-zinc-400">{mapControls.lockedFeature}</p>
//                 <Link
//                   href="/login"
//                   className="inline-flex items-center text-[11px] font-medium text-amber-500 hover:underline pt-1"
//                 >
//                   Accedi per la vista a livello di pacchetto <ArrowRight className="ml-1 h-3 w-3" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState, useCallback } from "react";
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
import {
  FolderArchive,
  Image as ImageIcon,
  Search,
  ChevronRight,
  Pin,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

// --- 1. NODI STILE "POST-IT" E "POLAROID" ---

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

// --- 2. DATI MOCK DEI CASI ---
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

// --- 3. COMPONENTE BOARD CON SIDEBAR RESPONSIVE ---
export function InvestigationBoard() {
  const [selectedCaseId, setSelectedCaseId] = useState("case-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default chiusa su mobile per mostrare subito la mappa

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
    setIsSidebarOpen(false); // Chiude la sidebar su mobile quando viene scelto un caso
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

export default function MapPage() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <InvestigationBoard />
    </div>
  );
}