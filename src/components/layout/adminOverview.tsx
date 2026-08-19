import {  MOCK_EVIDENCES } from "@/app/mockAdmin";
import { getUsers,getDossiers } from "@/action/action";
export default async function AdminOverview() {
  const dossiersList = await getDossiers();
  const usersList = await getUsers();
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-zinc-100">Panoramica Generale</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">Utenti Totali</span>
          <p className="text-2xl font-bold font-mono text-zinc-100">{usersList.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">Dossier Attivi</span>
          <p className="text-2xl font-bold font-mono text-zinc-100">{dossiersList.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">Prove in Sospeso</span>
          <p className="text-2xl font-bold font-mono text-amber-400">
            {MOCK_EVIDENCES.filter(e => e.status === "Pending").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">Stato Sistema</span>
          <p className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-fit mt-1">
            ONLINE
          </p>
        </div>
      </div>
    </div>
  );
}