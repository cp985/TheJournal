

"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { createDossierAdmin, updateDossierAdmin } from "@/action/action";
import { DossierStatus, ActionState } from "@/lib/type";
import ErrorsBox from "./errorsBox";
import { FiPlus, FiEdit2, FiFolder } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface DossierData {
  id?: string;
  code: string;
  title: string;
  description: string;
  status?: DossierStatus;
  author?: string | null;
  title_en?: string | null;
  description_en?: string | null;
  coverUrl: string;
}

const EMPTY_STATE: ActionState = { success: false, message: null, errors: null };

type DossierFormDialogProps =
  | { mode: "create" }
  | { mode: "edit"; id: string; initialData: DossierData };

export default function DossierFormDialog(props: DossierFormDialogProps) {
  const { t } = useLanguage();
  const { mode } = props;
  const isEdit = mode === "edit";
  const initialData = isEdit ? props.initialData : undefined;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ActionState>(EMPTY_STATE);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    setOpen(newOpen);
    if (!newOpen) {
      setState(EMPTY_STATE);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const action = isEdit ? updateDossierAdmin : createDossierAdmin;
      const res = await action(EMPTY_STATE, formData);
      setState(res);

      if (res.success) {
        router.refresh();
        setTimeout(() => setOpen(false), 1200);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button
            className="p-1.5 rounded bg-amber-600/10 text-amber-500 hover:bg-amber-500/20 cursor-pointer transition-colors"
            title={t.admin.dossierDialog.editTriggerTitle}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>{t.admin.dossierDialog.newButton}</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        key={isEdit ? props.id : "create"}
        className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 text-amber-400 mb-1">
            <div className="p-2 rounded-full bg-rose-500/10">
              <FiFolder className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100 text-xl font-bold">
              {isEdit
                ? t.admin.dossierDialog.titleEdit
                : t.admin.dossierDialog.titleCreate}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? t.admin.dossierDialog.descEdit
              : t.admin.dossierDialog.descCreate}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {isEdit && <input type="hidden" name="id" value={props.id} />}

          {/* Riga 1: Codice Identificativo e Stato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.dossierDialog.codeLabel}
              </label>
              <input
                type="text"
                name="code"
                required
                defaultValue={initialData?.code || ""}
                placeholder={t.admin.dossierDialog.codePlaceholder}
                className="w-full focus:border-zinc-500 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.dossierDialog.statusLabel}
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "Open"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="Open">{t.admin.dossierDialog.statusOpen}</option>
                <option value="Closed">{t.admin.dossierDialog.statusClosed}</option>
                <option value="Archived">{t.admin.dossierDialog.statusArchived}</option>
              </select>
            </div>
          </div>

          {/* Titolo IT & EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.dossierDialog.titleItLabel}
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={initialData?.title || ""}
                placeholder={t.admin.dossierDialog.titleItPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border focus:border-zinc-500 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.dossierDialog.titleEnLabel}
              </label>
              <input
                type="text"
                name="title_en"
                required
                defaultValue={initialData?.title_en || ""}
                placeholder={t.admin.dossierDialog.titleEnPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
              />
            </div>
          </div>

          {/* URL Copertina */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              {t.admin.dossierDialog.coverUrlLabel}
            </label>
            <input
              type="text"
              name="coverUrl"
              required
              defaultValue={initialData?.coverUrl || ""}
              placeholder={t.admin.dossierDialog.coverUrlPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
            />
          </div>

          {/* Descrizione IT */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              {t.admin.dossierDialog.descItLabel}
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={initialData?.description || ""}
              placeholder={t.admin.dossierDialog.descItPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          {/* Descrizione EN */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              {t.admin.dossierDialog.descEnLabel}
            </label>
            <textarea
              name="description_en"
              required
              rows={3}
              defaultValue={initialData?.description_en || ""}
              placeholder={t.admin.dossierDialog.descEnPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          <DialogFooter className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-zinc-800">
            <div className="w-full sm:w-auto flex-1">
              <ErrorsBox formData={state} isPending={isPending} page="admin.dossierDialog" />
            </div>

            <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending || state.success}
                className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                {t.admin.dossierDialog.cancel}
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
              >
                {isPending ? (
                  <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
                ) : isEdit ? (
                  t.admin.dossierDialog.saveChanges
                ) : (
                  t.admin.dossierDialog.createDossier
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}