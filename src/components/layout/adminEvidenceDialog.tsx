"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { createEvidenceAdmin, updateEvidenceAdmin } from "@/action/action";
import { ActionState } from "@/lib/type";
import ErrorsBox from "./errorsBox";
import { FiPlus, FiEdit2, FiFileText } from "react-icons/fi";
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
import { EvidenceStatus, EvidenceType } from "@/lib/type";

export interface EvidenceData {
  id?: string;
  dossierId: string;
  type: EvidenceType;
  fileUrl: string;
  notes: string;
  notes_en?: string | null;
  status: EvidenceStatus;
}

type EvidenceFormDialogProps =
  | {
      mode: "create";
      defaultDossierCode?: string;
      dossierOptions: { code: string; title: string }[];
    }
  | {
      mode: "edit";
      id: string;
      initialData: EvidenceData;
      dossierOptions: { code: string; title: string }[];
    };

const EMPTY_STATE: ActionState = {
  success: false,
  message: null,
  errors: null,
};

export default function EvidenceFormDialog(props: EvidenceFormDialogProps) {
  const { t } = useLanguage();
  const { mode } = props;
  const isEdit = mode === "edit";
  const initialData = isEdit ? props.initialData : undefined;
  const defaultDossierCode = !isEdit ? props.defaultDossierCode : undefined;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ActionState>(EMPTY_STATE);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    setOpen(newOpen);
    if (!newOpen) setState(EMPTY_STATE);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const action = isEdit ? updateEvidenceAdmin : createEvidenceAdmin;
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
            className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-colors"
            title={t.admin.evidenceDialog.buttonEditTooltip}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>{t.admin.evidenceDialog.buttonNew}</span>
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
              <FiFileText className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100 text-xl font-bold">
              {isEdit
                ? t.admin.evidenceDialog.editTitle
                : t.admin.evidenceDialog.createTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? t.admin.evidenceDialog.editDesc
              : t.admin.evidenceDialog.createDesc}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* In edit inviamo l'ID come campo nascosto */}
          {isEdit && <input type="hidden" name="id" value={props.id} />}

          {/* Riga 1: Codice Dossier e Tipo Prova */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.evidenceDialog.dossierCodeLabel}
              </label>
              <select
              required
                className="w-full px-3 py-2 pr-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm cursor-pointer"
                name="dossierId"
                defaultValue={
                  initialData?.dossierId || defaultDossierCode || ""
                }
              >
                <option value="" className="py-2 px-3 bg-zinc-800" disabled>
                  {t.admin.evidenceDialog.selectDossierPlaceholder}
                </option>
                {props.dossierOptions.map((d) => (
                  <option
                    className="py-2 px-3 bg-zinc-800"
                    key={d.code}
                    value={d.code}
                  >
                    {d.code} — {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.evidenceDialog.typeLabel}
              </label>
              <select
                name="type"
                defaultValue={initialData?.type || "PHOTO"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="PHOTO">
                  {t.admin.evidenceDialog.typePhoto}
                </option>
                <option value="PDF">{t.admin.evidenceDialog.typePdf}</option>
                <option value="DOCUMENT">
                  {t.admin.evidenceDialog.typeDoc}
                </option>
              </select>
            </div>
          </div>

          {/* Riga 2: URL File e Stato Validazione */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.evidenceDialog.fileUrlLabel}
              </label>
              <input
                type="text"
                name="fileUrl"
                defaultValue={initialData?.fileUrl || ""}
                placeholder={t.admin.evidenceDialog.fileUrlPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                {t.admin.evidenceDialog.statusLabel}
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PENDING"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="PENDING">
                  {t.admin.evidenceDialog.statusPending}
                </option>
                <option value="ACCEPTED">
                  {t.admin.evidenceDialog.statusAccepted}
                </option>
                <option value="REJECTED">
                  {t.admin.evidenceDialog.statusRejected}
                </option>
              </select>
            </div>
          </div>

          {/* Note IT */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              {t.admin.evidenceDialog.notesItLabel}
            </label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={initialData?.notes || ""}
              placeholder={t.admin.evidenceDialog.notesItPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          {/* Note EN */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              {t.admin.evidenceDialog.notesEnLabel}
            </label>
            <textarea
              name="notes_en"
              rows={3}
              defaultValue={initialData?.notes_en || ""}
              placeholder={t.admin.evidenceDialog.notesEnPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          <DialogFooter className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-zinc-800">
            {/* Box Errori a sinistra su desktop, in alto su mobile */}
            <div className="w-full sm:w-auto flex-1">
              <ErrorsBox formData={state} isPending={isPending} page="admin.evidenceDialog" />
            </div>

            <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending || state.success}
                className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                {t.admin.evidenceDialog.cancelButton}
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
              >
                {isPending ? (
                  <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
                ) : isEdit ? (
                  t.admin.evidenceDialog.saveChangesButton
                ) : (
                  t.admin.evidenceDialog.createButton
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}