

import { MOCK_EVIDENCES } from "@/app/mockAdmin";
import { FiEdit2, FiCheck,  FiTrash2 } from "react-icons/fi";

export default function AdminEvidencesView({q}: {q: string}) {

  const filteredUsers = MOCK_EVIDENCES.filter((evidence) => 
    evidence.title.toLowerCase().includes(q.toLowerCase()) || evidence.author.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">Revisione Prove</h1>
        <span className="text-xs text-zinc-400">{MOCK_EVIDENCES.length} totali</span>
      </div>

      <div className="space-y-3">
        {filteredUsers.map((ev) => (
          <div
            key={ev.id}
            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-zinc-100">{ev.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    ev.status === "Approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {ev.status}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Caricato da: <span className="text-zinc-200">@{ev.author}</span> il {ev.date}
              </p>
            </div>

            {/* Gruppo Azioni Admin */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 cursor-pointer"
                title="Modifica contenuto prova"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modifica</span>
              </button>

              {ev.status === "Pending" && (
                <button
                  className="p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1 border border-emerald-500/30 cursor-pointer"
                  title="Approva prova"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Approva</span>
                </button>
              )}

              <button
                className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1 border border-rose-500/30 cursor-pointer"
                title="Elimina prova"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Elimina</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}