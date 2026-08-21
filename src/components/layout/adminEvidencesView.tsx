

import { getEvidences } from "@/action/action";
import {  FiCheck,  FiTrash2 } from "react-icons/fi";
import EvidenceFormDialog from "./adminEvidenceDialog";
import {createEvidenceAdmin, deleteEvidenceAdmin, updateEvidenceAdmin} from "@/action/action"
import DeleteConfirmDialog from "./adminDeleteDossierAndEvidenceDialog";

export default async function AdminEvidencesView({q}: {q: string}) {
const evidencesList = await getEvidences();
const filteredUsers = evidencesList.filter((evidence) => {
  const searchTerm = q.toLowerCase();

  const notesMatch = evidence.notes?.toLowerCase().includes(searchTerm) ?? false;

  const usernameMatch = evidence.user?.username?.toLowerCase().includes(searchTerm) ?? false;

  return notesMatch || usernameMatch;
})

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">Revisione Prove</h1>
        <span className="text-xs text-zinc-400">{evidencesList.length} totali</span>
     <EvidenceFormDialog mode="create" action={createEvidenceAdmin} />
      </div>

      <div className="space-y-3">
        {filteredUsers.map((ev) => (
          <div
            key={ev.id}
            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-zinc-100">{ev.notes}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    ev.status === "ACCEPTED"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {ev.status}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Caricato da: <span className="text-zinc-200">@{ev.user.username}</span> il {ev.createdAt}
              </p>
            </div>

            {/* Gruppo Azioni Admin */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
         <EvidenceFormDialog mode="edit" initialData={ev} action={updateEvidenceAdmin} />

              {ev.status === "PENDING" && (
                <button
                  className="p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1 border border-emerald-500/30 cursor-pointer"
                  title="Approva prova"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Approva</span>
                </button>
              )}

                <DeleteConfirmDialog itemType="evidence" itemId={ev.id} itemTitle={ev.notes} onDelete={deleteEvidenceAdmin} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}