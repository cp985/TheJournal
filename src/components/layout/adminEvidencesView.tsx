

"use client";

import { useLanguage } from "@/context/maincontext";
import EvidenceFormDialog from "./adminEvidenceDialog";
import { deleteEvidenceAdmin } from "@/action/action";
import DeleteConfirmDialog from "./adminDeleteDossierAndEvidenceDialog";
import { DbDossier, DbEvidence } from "@/lib/type";
import { cn } from "@/lib/utils";
import {formatDate} from '@/lib/utils'

interface AdminEvidencesViewProps {
  q: string;
  evidencesList: DbEvidence[];
  dossiersList: DbDossier[];
}

export default function AdminEvidencesView({
  q,
  evidencesList = [],
  dossiersList = [],
}: AdminEvidencesViewProps) {
  const { t,lang } = useLanguage();

  const filteredUsers = evidencesList.filter((evidence) => {
    const searchTerm = q.toLowerCase();
    const notesMatch =
      evidence.notes?.toLowerCase().includes(searchTerm) ?? false;
    const usernameMatch =
      evidence.user?.username?.toLowerCase().includes(searchTerm) ?? false;

    return notesMatch || usernameMatch;
  });

  const dossiersCode = dossiersList.map((d) => ({
    code: d.code,
    title: lang==="IT" ? d.title : d.title_en,
    timeline: d.timeline,
  }));

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">
          {t.admin.adminEvidences.title}
        </h1>
        <span className="text-xs text-zinc-400">
          {evidencesList.length} {t.admin.adminEvidences.total}
        </span>
        <EvidenceFormDialog mode="create" dossierOptions={dossiersCode} />
      </div>

      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4">
            {t.admin.adminEvidences.noEvidences}
          </p>
        ) : (
          filteredUsers.map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-zinc-100">
                    {lang === "IT" ? ev.notes : ev.notes_en}
                  </span>
                  <span
            
                    className={cn(
    "px-2 py-0.5 rounded text-[10px] font-mono",
    {
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": ev.status === "ACCEPTED",
      "bg-amber-500/10 text-amber-400 border border-amber-500/20": ev.status === "PENDING",
      "bg-rose-500/10 text-rose-400 border border-rose-500/20": ev.status === "REJECTED",
    }
  )}
                  >
                    {ev.status === "ACCEPTED"
                      ? t.admin.adminEvidences.statusAccepted
                      : ev.status}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {t.admin.adminEvidences.uploadedBy}:{" "}
                  <span className="text-zinc-200">@{ev.user.username}</span>{" "}
                  {t.admin.adminEvidences.onDate} {formatDate(ev.createdAt)}
                </p>
              </div>

              {/* Gruppo Azioni Admin */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <EvidenceFormDialog
                  mode="edit"
                  initialData={ev}
                  id={ev.id}
                  dossierOptions={dossiersCode}
                />

                <DeleteConfirmDialog
                  itemType="evidence"
                  itemId={ev.id}
                  itemTitle={lang === "IT" ? ev.notes : ev.notes_en}
                  onDelete={deleteEvidenceAdmin}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}