"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, MapPin, Radio, FileText, Layers, Crosshair, ArrowRight } from "lucide-react";

// Dati mock per il caso demo in public
const DEMO_CASES = [
  {
    id: "case-01",
    code: "DOSSIER-01/VP",
    title: "Caso Via Poma (Demo)",
    nodesCount: 12,
    totalNodes: 142,
    active: true,
  },
  {
    id: "case-02",
    code: "DOSSIER-02/OG",
    title: "Delitto Olgiata (Riservato)",
    nodesCount: 0,
    totalNodes: 89,
    active: false,
    locked: true,
  },
];

const DEMO_NODES = [
  {
    id: "node-1",
    title: "Rilevazione Cella Telefonia",
    type: "Cell Tower",
    time: "17:30:12",
    coords: "41.9168° N, 12.4935° E",
    source: "Tabulato Telecom - Allegato B4",
    desc: "Aggancio cella di zona da parte dell'utenza target durante l'orario di interesse.",
  },
  {
    id: "node-2",
    title: "Ritrovamento Reperto A",
    type: "Evidence",
    time: "18:15:00",
    coords: "41.9172° N, 12.4941° E",
    source: "Verbale DCI - Pagina 14",
    desc: "Coordinate esatte del luogo del primo sopralluogo e inventario reperti.",
  },
];

 function PublicMapPage() {
  const { t } = useLanguage();
  const { sidebar, nodeDetails, mapControls } = t.map;
  const [selectedNode, setSelectedNode] = useState<typeof DEMO_NODES[0] | null>(DEMO_NODES[0]);

  return (
    <main className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-zinc-950 text-zinc-100">
      {/* SIDEBAR SINISTRA: MINIATURE CASI E DETTAGLIO NODO */}
      <aside className="w-80 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Header Sidebar */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded border border-amber-900/50 bg-amber-950/20 px-2 py-0.5 font-mono text-[10px] uppercase text-amber-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              {sidebar.badge}
            </div>
            <h1 className="mt-2 font-serif text-xl font-semibold">{sidebar.title}</h1>
            <p className="mt-1 text-xs text-zinc-400">{sidebar.subtitle}</p>
          </div>

          {/* Selezione Caso (Stile Miniatures / Filmstrip) */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {sidebar.caseSelectorLabel}
            </span>
            {DEMO_CASES.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-md border p-3 transition-all ${
                  item.active
                    ? "border-amber-500/50 bg-amber-950/10"
                    : "border-zinc-800 bg-zinc-900/20 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-500">{item.code}</span>
                  {item.locked && <Lock className="h-3 w-3 text-zinc-500" />}
                </div>
                <h3 className="font-serif text-sm font-medium mt-1 text-zinc-200">{item.title}</h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>
                    Nodi: <strong className="text-zinc-200">{item.nodesCount}</strong> / {item.totalNodes}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dettaglio del Nodo Selezionato */}
          <Card className="border-zinc-800 bg-zinc-950/60">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs font-mono uppercase text-amber-500 flex items-center gap-1.5">
                <Crosshair className="h-3.5 w-3.5" />
                {nodeDetails.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-xs space-y-2">
              {selectedNode ? (
                <>
                  <div>
                    <span className="text-zinc-500">{nodeDetails.typeLabel}: </span>
                    <Badge variant="outline" className="text-[10px] border-amber-900/40 text-amber-400">
                      {selectedNode.type}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-zinc-200">{selectedNode.title}</h4>
                  <div className="text-zinc-400 font-mono text-[11px]">
                    🕒 {selectedNode.time} | 📍 {selectedNode.coords}
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed mt-1">{selectedNode.desc}</p>
                  <div className="border-t border-zinc-800 pt-1 text-[10px] text-zinc-500 italic">
                    {selectedNode.source}
                  </div>
                </>
              ) : (
                <p className="text-zinc-500 italic text-[11px]">{nodeDetails.emptyState}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notice Pubblica e CTA Lock */}
        <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
          <p className="text-[11px] text-zinc-400 leading-normal">{sidebar.publicNotice}</p>
          <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs">
            <Link href="/login">
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              {sidebar.unlockBtn}
            </Link>
          </Button>
        </div>
      </aside>

      {/* CANVAS MAPPA (DESTRA) */}
      <section className="relative flex-1 bg-zinc-950 flex items-center justify-center">
        {/* Griglia di sfondo / Placeholder di mappa vettoriale */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Simulazione Punti Interattivi sulla Mappa */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Marker 1 */}
          <button
            onClick={() => setSelectedNode(DEMO_NODES[0])}
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all ${
              selectedNode?.id === "node-1"
                ? "bg-amber-500/20 border-amber-500 scale-125"
                : "bg-zinc-900 border-zinc-700 hover:border-amber-500"
            }`}
          >
            <Radio className="h-5 w-5 text-amber-500 animate-pulse" />
          </button>

          {/* Marker 2 */}
          <button
            onClick={() => setSelectedNode(DEMO_NODES[1])}
            className={`absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all ${
              selectedNode?.id === "node-2"
                ? "bg-amber-500/20 border-amber-500 scale-125"
                : "bg-zinc-900 border-zinc-700 hover:border-amber-500"
            }`}
          >
            <MapPin className="h-5 w-5 text-amber-500" />
          </button>

          {/* Overlay Avviso Feature Bloccate */}
          <div className="absolute bottom-6 right-6 max-w-sm rounded-md border border-zinc-800 bg-zinc-900/90 p-3 backdrop-blur shadow-xl">
            <div className="flex items-start gap-2.5">
              <Layers className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-zinc-200">{mapControls.timeFilterTitle}</p>
                <p className="text-[11px] text-zinc-400">{mapControls.lockedFeature}</p>
                <Link
                  href="/login"
                  className="inline-flex items-center text-[11px] font-medium text-amber-500 hover:underline pt-1"
                >
                  Accedi per la vista a livello di pacchetto <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function MapPage() {
  return (
    // Con h-screen, w-screen e inset-0 occupa tutto lo schermo sovrapponendosi 
    // all'eventuale padding del layout, senza bisogno di "use client" nel layout.
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      {/* Componente della mappa */}
      <PublicMapPage />
    </div>
  );
}