

"use client";

import { useState } from "react";
import ImportTimelineModal from "./adminMapTimelineAddButton";
import { DbDossier, DbEvidence } from "@/lib/type";
import CreateNodeJsonModal from "./adminMapCreateNode";
import { useLanguage } from "@/context/maincontext"; 

interface AdminMapViewProps {
  dossiers: DbDossier[];
  evidences: DbEvidence[];
}

export default function AdminMapView(props: AdminMapViewProps) {
  const { dossiers, evidences } = props;
  const { t, lang } = useLanguage();
  const tMap = t.admin.mapView;

  const [selectedDossierId, setSelectedDossierId] = useState(dossiers[0]?.id || "");

  const activeDossier = dossiers.find((d) => d.id === selectedDossierId) || dossiers[0];
  const timelineCount = activeDossier?.timeline?.length || 0;
  const evidenceCount = activeDossier?.evidences?.length || 0;

  const evidencesUnassigned = evidences.filter(
    (e) => e.dossierId === activeDossier?.code && e.timelineId === null
  );

  const [selectedEvidenceForNode, setSelectedEvidenceForNode] = useState<DbEvidence | null>(null);

  const sortedTimeline = [...(activeDossier?.timeline || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-6 font-mono text-zinc-100">
      {/* 1. HEADER & SELETTORE DOSSIER */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            {tMap.title}
          </h1>
          <p className="text-xs text-zinc-400">
            {tMap.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5">
            <span className="text-xs text-zinc-400">{tMap.dossierSelectLabel}</span>
            <select
              value={selectedDossierId}
              onChange={(e) => setSelectedDossierId(e.target.value)}
              className="cursor-pointer bg-transparent text-xs font-bold text-zinc-100 focus:outline-none"
            >
              {dossiers.map((d) => (
                <option key={d.id} value={d.id} className="bg-zinc-900 text-zinc-100">
                  [{d.code}] {lang === "EN" ? d.title_en : d.title}
                </option>
              ))}
            </select>
          </div>

          <ImportTimelineModal initialTimeline={activeDossier?.timeline} />
        </div>
      </div>

      {/* 2. LAYOUT PRINCIPALE */}
      <div className="flex flex-col gap-6">
        {/* PROVE NON ASSOCIATE */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="border-b border-zinc-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-200">
                {tMap.unassignedEvidences.title}
              </h3>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {evidencesUnassigned.length}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">
              {tMap.unassignedEvidences.subtitle}
            </p>
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {evidencesUnassigned.length === 0 ? (
              <p className="py-4 text-xs text-zinc-600">
                {tMap.unassignedEvidences.emptyState}
              </p>
            ) : (
              evidencesUnassigned.map((ev) => (
                <div
                  key={ev.id}
                  className="min-w-[220px] max-w-[250px] flex-shrink-0 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs transition hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span className="font-mono text-amber-400/80">{ev.type}</span>
                    <span>
                      {new Date(ev.createdAt).toLocaleDateString(lang, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-1 line-clamp-2 font-bold text-zinc-200">
                    {lang === "EN" ?  ev.notes_en : ev.notes || tMap.unassignedEvidences.noDescription}
                  </div>

                  <div className="mt-0.5 text-[10px] text-zinc-500">
                    Da: {ev.user?.username || tMap.unassignedEvidences.unknownUser}
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEvidenceForNode(ev)}
                      className="w-full rounded border border-amber-500/30 bg-amber-500/10 py-1.5 text-[10px] font-semibold text-amber-300 transition hover:bg-amber-500/20"
                    >
                      {tMap.unassignedEvidences.createJsonNodeBtn}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ANTEPRIMA SPINA DI PESCE DINAMICA */}
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {tMap.canvas.dossierPrefix}{activeDossier?.code}
              </span>
              <h2 className="mt-1 text-base font-bold text-zinc-100">{lang === "EN" ? activeDossier?.title_en : activeDossier?.title}</h2>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <div>
                {tMap.canvas.timelineNodesCount}{" "}
                <span className="font-bold text-amber-400">{timelineCount}</span>
              </div>
              <div>
                {tMap.canvas.totalEvidencesCount}{" "}
                <span className="font-bold text-zinc-100">{evidenceCount}</span>
              </div>
            </div>
          </div>

          {/* CANVAS SPINA DI PESCE */}
          <div className="relative my-4 min-h-[300px] w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            {sortedTimeline.length === 0 ? (
              <div className="relative z-10 flex h-full min-h-[220px] flex-col items-center justify-center text-center">
                <p className="text-sm font-semibold text-zinc-500">
                  {tMap.canvas.emptyTitle}
                </p>
                <p className="text-xs text-zinc-600">
                  {tMap.canvas.emptySubtitle}
                </p>
              </div>
            ) : (
              <div className="relative z-10 flex min-w-max items-center justify-start gap-3 px-6 pt-12 pb-8">
                {/* 1. CARTELLA DOSSIER + TRATTINO INIZIALE */}
                <div className="flex items-center">
                  <div className="relative z-10 flex h-20 w-32 flex-col justify-between rounded-lg border-2 border-amber-500/60 bg-amber-500/10 p-2.5 shadow-lg shadow-amber-500/5">
                    <div className="text-[12px] font-bold text-amber-400">
                      {tMap.canvas.casePrefix}{activeDossier?.code}
                    </div>
                    <div className="line-clamp-2 text-[12px] font-semibold text-zinc-200">
                      {lang === "EN" ? activeDossier?.title_en : activeDossier?.title}
                    </div>
                  </div>
                  <div className="h-0.5 w-6 bg-amber-500/50" />
                </div>

                {/* 2. LISTA NODI TIMELINE */}
                {sortedTimeline.map((node, index) => {
                  const linkedEvidences = activeDossier.evidences?.filter(
                    (ev) => ev.timelineId === node.id
                  ) || [];

                  return (
                    <div key={node.id || index} className="flex items-center gap-3">
                      <div className="relative flex flex-col items-center">
                        {/* BADGE PROVE */}
                        <div className="absolute -top-9 flex flex-col items-center z-20">
                          <div className="flex items-center gap-1.5 rounded border border-blue-500/40 bg-blue-950/90 px-2 py-0.5 text-[14px] font-bold text-blue-300 shadow-md">
                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                            {linkedEvidences.length} {tMap.canvas.evidenceBadge}
                          </div>
                          <div className="h-2 w-0.5 bg-blue-400/60" />
                        </div>

                        {/* CARD NODO TIMELINE */}
                        <div className="relative z-10 w-60 rounded-lg border border-zinc-800 bg-zinc-900 p-3 shadow-xl transition hover:border-amber-500/60">
                          <div className="flex items-center justify-between text-[12px] text-amber-400">
                            <span className="font-bold">
                              {tMap.canvas.nodePrefix}{index + 1}
                            </span>
                            <span>
                              {node.date
                                ? new Date(node.date).toLocaleDateString(lang, {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                : tMap.canvas.noDate}
                            </span>
                          </div>
                          <div className="mt-1 text-sm font-bold text-zinc-100 line-clamp-1">
                            {lang === "EN" ? node.title_en : node.title}
                          </div>
                          <p className="mt-1 line-clamp-2 text-[12px] text-zinc-400">
                            {lang === "EN" ? node.description_en : node.description}
                          </p>
                        </div>
                      </div>

                      {/* SEGMENTO DI CONNESSIONE AL NODO SUCCESSIVO */}
                      <div className="h-0.5 w-6 bg-amber-500/50" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateNodeJsonModal
        isOpen={Boolean(selectedEvidenceForNode)}
        dossierCode={activeDossier?.code}
        evidence={selectedEvidenceForNode}
        onClose={() => setSelectedEvidenceForNode(null)}
      />
    </div>
  );
}