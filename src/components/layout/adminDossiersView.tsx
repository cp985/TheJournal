// import { formatDate } from "@/lib/utils";
// import { getDossiers } from "@/action/action";
// import { DbDossier } from "@/lib/type";
// import DossierFormDialog from "@/components/layout/adminDossierDialog"
// import {deleteDossierAdmin} from "@/action/action"
// import DeleteConfirmDialog from "./adminDeleteDossierAndEvidenceDialog";
// export default async function AdminDossiersView({q}: {q: string}) {
//  const DOSSIERS_LIST : DbDossier[] = await getDossiers();
//   const filteredUsers = DOSSIERS_LIST.filter((dossier) => 
//     dossier.title.toLowerCase().includes(q.toLowerCase()) || dossier.id.toLowerCase().includes(q.toLowerCase())
//   );
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-xl font-bold font-mono text-zinc-100">Gestione Dossier</h1>
// <DossierFormDialog mode="create"  />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {filteredUsers.map((dossier) => (
//           <div key={dossier.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 font-mono">
//             <div className="flex justify-between items-start">
//               <h3 className="font-bold text-sm text-zinc-100">{dossier.title}</h3>
//               <span className={`px-2 py-0.5 rounded text-[10px] ${dossier.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
//                 {dossier.status}
//               </span>
//             </div>
//             <p className="text-xs text-zinc-400">Prove collegate: {dossier.evidences.length}</p>
//             <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs">
//              <div className="space-y-1">
//               <p className="text-[10px] text-zinc-500">Aggiornato: {formatDate(dossier.updatedAt)}</p>
//              <p className="text-[10px] text-zinc-500">Creato: {formatDate(dossier.createdAt)}</p>

//              </div>
       
//               <div className="space-x-0.4 flex items-center justify-center">
//               <DossierFormDialog
//                     mode="edit"
//                     initialData={dossier}
//                     id={dossier.id}
//                   />
//                 <DeleteConfirmDialog itemType="dossier" itemId={dossier.id} itemTitle={dossier.title} onDelete={ deleteDossierAdmin} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useLanguage } from "@/context/maincontext";
import { formatDate } from "@/lib/utils";
import { DbDossier } from "@/lib/type";
import DossierFormDialog from "@/components/layout/adminDossierDialog";
import { deleteDossierAdmin } from "@/action/action";
import DeleteConfirmDialog from "./adminDeleteDossierAndEvidenceDialog";

interface AdminDossiersViewProps {
  q: string;
  dossiersList: DbDossier[];
}

export default function AdminDossiersView({
  q,
  dossiersList,
}: AdminDossiersViewProps) {
  const { t } = useLanguage();
  const safeDossiersList = Array.isArray(dossiersList) ? dossiersList : [];

  const filteredDossiers = safeDossiersList.filter(
    (dossier) =>
      dossier.title.toLowerCase().includes(q.toLowerCase()) ||
      dossier.id.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold font-mono text-zinc-100">
          {t.admin.dossiersView.title}
        </h1>
        <DossierFormDialog mode="create" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDossiers.map((dossier) => (
          <div
            key={dossier.id}
            className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 font-mono"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm text-zinc-100">
                {dossier.title}
              </h3>
              <span
                className={`px-2 py-0.5 rounded text-[10px] ${
                  dossier.status === "Open"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                }`}
              >
                {dossier.status}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              {t.admin.dossiersView.linkedEvidences} {dossier.evidences?.length || 0}
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500">
                  {t.admin.dossiersView.updatedAt} {formatDate(dossier.updatedAt)}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {t.admin.dossiersView.createdAt} {formatDate(dossier.createdAt)}
                </p>
              </div>

              <div className="space-x-0.4 flex items-center justify-center">
                <DossierFormDialog
                  mode="edit"
                  initialData={dossier}
                  id={dossier.id}
                />
                <DeleteConfirmDialog
                  itemType="dossier"
                  itemId={dossier.id}
                  itemTitle={dossier.title}
                  onDelete={deleteDossierAdmin}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}