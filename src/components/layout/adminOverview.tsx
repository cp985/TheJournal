import { getUsers,getDossiers,getEvidences, getHealth } from "@/action/action";
import { cn } from "@/lib/utils";
export default async function AdminOverview() {
  const dossiersList = await getDossiers();
  const usersList = await getUsers();
  const evidencesList = await getEvidences();
  const health = await getHealth();
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
            {evidencesList.filter(e => e.status === "PENDING").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">Stato Sistema</span>
          <p className={cn("text-xs font-mono font-bold  bg-emerald-500/10 px-2 py-1 rounded w-fit mt-1",{
            "text-emerald-400 border border-emerald-500/30": health.online,
            "text-red-500 border border-amber-500/30": !health.online
          })}>
            {health.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}