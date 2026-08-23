// import { getUsers,getDossiers,getEvidences, getHealth } from "@/action/action";
// import { cn } from "@/lib/utils";
// export default async function AdminOverview() {
//   const dossiersList = await getDossiers();
//   const usersList = await getUsers();
//   const evidencesList = await getEvidences();
//   const health = await getHealth();
//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl font-bold font-mono text-zinc-100">Panoramica Generale</h1>
      
//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
//           <span className="text-xs font-mono text-zinc-400">Utenti Totali</span>
//           <p className="text-2xl font-bold font-mono text-zinc-100">{usersList.length}</p>
//         </div>
//         <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
//           <span className="text-xs font-mono text-zinc-400">Dossier Attivi</span>
//           <p className="text-2xl font-bold font-mono text-zinc-100">{dossiersList.length}</p>
//         </div>
//         <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
//           <span className="text-xs font-mono text-zinc-400">Prove in Sospeso</span>
//           <p className="text-2xl font-bold font-mono text-amber-400">
//             {evidencesList.filter(e => e.status === "PENDING").length}
//           </p>
//         </div>
//         <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
//           <span className="text-xs font-mono text-zinc-400">Stato Sistema</span>
//           <p className={cn("text-xs font-mono font-bold  bg-emerald-500/10 px-2 py-1 rounded w-fit mt-1",{
//             "text-emerald-400 border border-emerald-500/30": health.online,
//             "text-red-500 border border-amber-500/30": !health.online
//           })}>
//             {health.online ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useLanguage } from "@/context/maincontext";
import { cn } from "@/lib/utils";

interface AdminOverviewProps {
  usersCount: number;
  dossiersCount: number;
  pendingEvidencesCount: number;
  health: { online: boolean };
}

export default function AdminOverview({
  usersCount,
  dossiersCount,
  pendingEvidencesCount,
  health,
}: AdminOverviewProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-zinc-100">
        {t.admin.overview.title}
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">
            {t.admin.overview.totalUsers}
          </span>
          <p className="text-2xl font-bold font-mono text-zinc-100">
            {usersCount}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">
            {t.admin.overview.activeDossiers}
          </span>
          <p className="text-2xl font-bold font-mono text-zinc-100">
            {dossiersCount}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">
            {t.admin.overview.pendingEvidences}
          </span>
          <p className="text-2xl font-bold font-mono text-amber-400">
            {pendingEvidencesCount}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-1">
          <span className="text-xs font-mono text-zinc-400">
            {t.admin.overview.systemStatus}
          </span>
          <p
            className={cn(
              "text-xs font-mono font-bold px-2 py-1 rounded w-fit mt-1",
              {
                "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30":
                  health?.online,
                "bg-red-500/10 text-red-500 border border-red-500/30":
                  !health?.online,
              }
            )}
          >
            {health?.online
              ? t.admin.overview.online
              : t.admin.overview.offline}
          </p>
        </div>
      </div>
    </div>
  );
}