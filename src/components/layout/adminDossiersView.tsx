

"use client";

import { useLanguage } from "@/context/maincontext";
import { formatDate } from "@/lib/utils";
import { DbDossier } from "@/lib/type";
import DossierFormDialog from "@/components/layout/adminDossierDialog";
import { deleteDossierAdmin } from "@/action/action";
import DeleteConfirmDialog from "./adminDeleteDossierAndEvidenceDialog";
import { cn } from "@/lib/utils";

interface AdminDossiersViewProps {
  q: string;
  status?: string;
  dossiersList: DbDossier[];
}

export default function AdminDossiersView({
  q,
  status = "",
  dossiersList,
}: AdminDossiersViewProps) {
  const { t, lang } = useLanguage();
  const safeDossiersList = Array.isArray(dossiersList) ? dossiersList : [];

  const filteredDossiers = safeDossiersList.filter((dossier) => {
    const query = q.toLowerCase().trim();

    const matchesQuery =
      !query ||
      dossier.title.toLowerCase().includes(query) ||
      (dossier.title_en && dossier.title_en.toLowerCase().includes(query)) ||
      dossier.id.toLowerCase().includes(query) ||
      (dossier.code && dossier.code.toLowerCase().includes(query));

    const matchesStatus = status ? dossier.status === status : true;

    return matchesQuery && matchesStatus;
  });

  const sortedFilteredDossiersList = [...filteredDossiers].sort(
    (a, b) =>
      new Date(b.createdAt || (b as any).created_at).getTime() -
      new Date(a.createdAt || (a as any).created_at).getTime()
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
        {sortedFilteredDossiersList.map((dossier) => (
          <div
            key={dossier.id}
            className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 font-mono"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-sm text-zinc-100">
                {lang === "IT"
                  ? dossier.title
                  : dossier.title_en || dossier.title}
              </h3>
              <span
                className={cn("px-2 py-0.5 rounded text-[10px] font-mono shrink-0", {
                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":
                    dossier.status === "Open",
                  "bg-amber-500/10 text-amber-400 border border-amber-500/20":
                    dossier.status === "Archived",
                  "bg-rose-500/10 text-rose-400 border border-rose-500/20":
                    dossier.status === "Closed",
                })}
              >
                {dossier.status}
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              {t.admin.dossiersView.linkedEvidences}{" "}
              {dossier.evidences?.length || 0}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500">
                  {t.admin.dossiersView.updatedAt}{" "}
                  {formatDate(dossier.updatedAt)}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {t.admin.dossiersView.createdAt}{" "}
                  {formatDate(dossier.createdAt)}
                </p>
              </div>

              <div className="space-x-1 flex items-center justify-center">
                <DossierFormDialog
                  mode="edit"
                  initialData={dossier}
                  id={dossier.id}
                />
                <DeleteConfirmDialog
                  itemType="dossier"
                  itemId={dossier.id}
                  itemTitle={
                    lang === "IT"
                      ? dossier.title
                      : dossier.title_en || dossier.title
                  }
                  onDelete={deleteDossierAdmin}
                />
              </div>
            </div>
          </div>
        ))}

        {sortedFilteredDossiersList.length === 0 && (
          <div className="col-span-full p-8 text-center border border-zinc-800/80 rounded-xl bg-zinc-900/20 text-zinc-500 font-mono text-xs">
            No dossiers found - Nessun dossier trovato
          </div>
        )}
      </div>
    </div>
  );
}