"use client";

import { useActionState, useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiFileText, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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

export interface EvidenceData {
  id?: string;
  dossierId: string; // Corrisponde al 'code' del Dossier
  type: "PHOTO" | "PDF" | "DOCUMENT";
  fileUrl: string;
  notes: string;
  notes_en?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

interface EvidenceFormDialogProps {
  mode: "create" | "edit";
  initialData?: EvidenceData;
  // Opzionale: Se il form viene aperto da un contesto dove il codice Dossier è già fisso
  defaultDossierCode?: string;
  action: (prevState: any, formData: FormData) => Promise<any>;
}

export default function EvidenceFormDialog({
  mode,
  initialData,
  defaultDossierCode,
  action,
}: EvidenceFormDialogProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: null,
    errors: null,
  });

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button
            className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-colors"
            title="Modifica Prova"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-3.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>Nuova Prova</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-center gap-3 text-amber-400 mb-1">
            <div className="p-2 rounded-full bg-rose-500/10">
              <FiFileText className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100 text-xl font-bold">
              {isEdit ? "Modifica Prova (Evidence)" : "Aggiungi Nuova Prova"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? "Aggiorna i dettagli relativi a questo elemento di prova."
              : "Associa una nuova prova multimediale o documentale ad un dossier."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 mt-2">
          {/* ID inviato in hidden se siamo in fase di modifica */}
          {isEdit && initialData?.id && (
            <input type="hidden" name="id" value={initialData.id} />
          )}

          {/* Banner Errore */}
          {state?.message && !state?.success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Banner Successo */}
          {state?.success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <FiCheckCircle className="w-4 h-4 shrink-0" />
              <span>{state.message || "Operazione completata con successo!"}</span>
            </div>
          )}

          {/* Riga 1: Codice Dossier e Tipo Prova */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Codice Dossier (dossierId) *
              </label>
              <input
                type="text"
                name="dossierId"
                defaultValue={initialData?.dossierId || defaultDossierCode || ""}
                placeholder="es. DOS-2026-001"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
              />
              {state?.errors?.dossierId && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.dossierId[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Tipo Prova (Type) *
              </label>
              <select
                name="type"
                defaultValue={initialData?.type || "PHOTO"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:-border-zinc-500 text-sm"
              >
                <option value="PHOTO">Foto (PHOTO)</option>
                <option value="VIDEO">Video (VIDEO)</option>
                <option value="AUDIO">Audio (AUDIO)</option>
                <option value="DOCUMENT">Documento (DOCUMENT)</option>
                <option value="OTHER">Altro (OTHER)</option>
              </select>
              {state?.errors?.type && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.type[0]}</p>
              )}
            </div>
          </div>

          {/* Riga 2: URL File e Stato Validazione */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                URL del File (File URL) *
              </label>
              <input
                type="text"
                name="fileUrl"
                defaultValue={initialData?.fileUrl || ""}
                placeholder="https://... o /uploads/evidence.jpg"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
              />
              {state?.errors?.fileUrl && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.fileUrl[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Stato Validazione (Status)
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PENDING"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="PENDING">In Attesa (PENDING)</option>
                <option value="VERIFIED">Verificata (VERIFIED)</option>
                <option value="REJECTED">Rifiutata (REJECTED)</option>
              </select>
            </div>
          </div>

          {/* Note IT */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Note / Dettagli (Italiano) *
            </label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={initialData?.notes || ""}
              placeholder="Descrizione dell'evidenza e rilievi..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
            {state?.errors?.notes && (
              <p className="text-xs text-rose-400 mt-1">{state.errors.notes[0]}</p>
            )}
          </div>

          {/* Note EN */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Note / Dettagli (Inglese)
            </label>
            <textarea
              name="notes_en"
              rows={3}
              defaultValue={initialData?.notes_en || ""}
              placeholder="English notes (optional)..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-6 pt-2 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending || state?.success}
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              Annulla
            </Button>

            <Button
              type="submit"
              disabled={isPending || state?.success}
              className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
            >
              {isPending ? (
                <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
              ) : isEdit ? (
                "Salva Modifiche"
              ) : (
                "Aggiungi Prova"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}