import { useState } from "react";
import ImportTimelineModal from "./adminMapTimelineAddButton";
import { DbDossier, DbEvidence } from "@/lib/type";

interface AdminMapViewProps {
  dossiers: DbDossier[],
  evidences: DbEvidence[]
}
export default function AdminMapView(props: AdminMapViewProps) {


  const evidences = props.evidences;
const dossiers = props.dossiers;
  const [selectedDossierId, setSelectedDossierId] = useState(dossiers[0].id);
  const activeDossier = dossiers.find((d) => d.id === selectedDossierId) || dossiers[0];
const timelinneCount= activeDossier.timeline.length;
const evidenceCount= activeDossier.evidences.length;
const evidecesUnassigned = evidences.filter(
  (e) => e.dossierId === activeDossier.code && e.timelineId === null
);
console.log(evidecesUnassigned);
  return (
    <div className="space-y-6 font-mono text-zinc-100">
      {/* 1. HEADER & SELETTORE DOSSIER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            Mappa & Bacheca Investigativa
          </h1>
          <p className="text-xs text-zinc-400">
            Seleziona un dossier per gestirne la spina di pesce e assegnare le prove orfane.
          </p>
        </div>

        {/* Action Bar: Selettore Dossier Singolo + Importa Scheletro */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5">
            <span className="text-xs text-zinc-400">Dossier:</span>
            <select
              value={selectedDossierId}
              onChange={(e) => setSelectedDossierId(e.target.value)}
              className="bg-transparent text-xs font-bold text-zinc-100 focus:outline-none cursor-pointer"
            >
              {dossiers.map((d) => (
                <option key={d.id} value={d.id} className="bg-zinc-900 text-zinc-100">
                  [{d.code}] {d.title}
                </option>
              ))}
            </select>
          </div>

          <ImportTimelineModal initialTimeline={activeDossier.timeline} />
        </div>
      </div>

      {/* 2. LAYOUT PRINCIPALE DEL DOSSIER SELEZIONATO */}
      <div className="flex flex-col gap-6">
        
 

        {/*PROVE NON ASSOCIATE ALLA TIMELINE */}
        <div className="flex flex-col  rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-200">Prove Slegate</h3>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {evidecesUnassigned.length}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">
              Prove approvate ma senza un nodo timeline associato (`timelineId = null`).
            </p>
          </div>

          {/* LISTA PROVE SLEGATE */}
          <div className="flex mt-3 flex-1 space-y-3 overflow-y-auto">
            {evidecesUnassigned.length === 0 ? (
              <p className="py-8 text-center text-xs text-zinc-600">Tutte le prove sono collegate a un fatto.</p>
            ) : (
              evidecesUnassigned.map((ev) => (
                <div key={ev.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs transition hover:border-zinc-700 min-w-1/3">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span className="font-mono text-amber-400/80">{ev.type}</span>
                    <span>{ev.createdAt}</span>
                  </div>
                  <div className="mt-1 font-bold text-zinc-200">{ev.notes}</div>
                  <div className="mt-0.5 text-[10px] text-zinc-500">Da: {ev.user.username}</div>

                  <div className="mt-3 flex gap-2">
                    <button className="w-full rounded border border-zinc-700 bg-zinc-800 py-1 text-[10px] font-semibold text-zinc-300 hover:bg-zinc-700">
                      + Associa
                    </button>
                    <button className="w-full rounded border border-amber-500/30 bg-amber-500/10 py-1 text-[10px] font-semibold text-amber-300 hover:bg-amber-500/20">
                      Crea Nodo
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
       {/* CENTRALE (3/4): GRANDE ANTEPRIMA MAPPA */}
        <div className="lg:col-span-3 flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                {activeDossier.code}
              </span>
              <h2 className="mt-1 text-lg font-bold text-zinc-100">{activeDossier.title}</h2>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <div>
                Nodi Timeline: <span className="font-bold text-zinc-100">{timelinneCount}</span>
              </div>
              <div>
                Prove Totali: <span className="font-bold text-zinc-100">{evidenceCount}</span>
              </div>
              <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-700 transition">
                Apri Mappa Fullscreen
              </button>
            </div>
          </div>

          {/* AREA CANVAS GRANDE (h-[480px]) */}
          <div className="relative my-4 flex h-[480px] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/90">
            {/* Pattern Griglia Scrivania */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

            {/* Mock Spina di Pesce Espansa */}
            <div className="relative z-10 flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-amber-500/40 bg-zinc-900 p-3 text-xs text-amber-300 shadow-md">
                  <span className="font-bold">A-1</span> Ritrovamento Auto
                </div>
              </div>
              <div className="h-0.5 w-12 bg-zinc-700"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-amber-500/40 bg-zinc-900 p-3 text-xs text-amber-300 shadow-md">
                  <span className="font-bold">B-1</span> Chiamata 112
                </div>
              </div>
              <div className="h-0.5 w-12 border-t border-dashed border-zinc-600"></div>
              <span className="text-xs text-zinc-500">[ Visualizzazione React Flow Integrata ]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}