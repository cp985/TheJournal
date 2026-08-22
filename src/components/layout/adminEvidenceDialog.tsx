
"use client";



import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
import {EvidenceStatus,EvidenceType} from "@/lib/type"

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
  | { mode: "create"; defaultDossierCode?: string; dossierOptions: { code: string; title: string }[] }
  | { mode: "edit"; id: string; initialData: EvidenceData; dossierOptions: { code: string; title: string }[] };  
  const EMPTY_STATE: ActionState = { success: false, message: null, errors: null };

export default function EvidenceFormDialog(props: EvidenceFormDialogProps) {
  
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
            title="Modifica Prova"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>Nuova Prova</span>
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
              {isEdit ? "Modifica Prova (Evidence)" : "Aggiungi Nuova Prova"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? "Aggiorna i dettagli relativi a questo elemento di prova."
              : "Associa una nuova prova multimediale o documentale ad un dossier."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* In edit inviamo l'ID come campo nascosto */}
          {isEdit && <input type="hidden" name="id" value={props.id} />}

          {/* Riga 1: Codice Dossier e Tipo Prova */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Codice Dossier (dossierId) *
              </label>
              <select     className="w-full px-3 py-2 pr-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm  cursor-pointer" name="dossierId" defaultValue={initialData?.dossierId || defaultDossierCode || ""}>
  <option value="" className="py-2 px-3 bg-zinc-800" disabled>Seleziona un dossier...</option>
  {props.dossierOptions.map(d => (
    <option className="py-2 px-3 bg-zinc-800" key={d.code} value={d.code}>{d.code} — {d.title}</option>
  ))}
</select>
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
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="PHOTO">Foto (PHOTO)</option>
                <option value="PDF">PDF</option>
                <option value="DOCUMENT">Documento (DOCUMENT)</option>
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
                <option value="ACCEPTED">Accettata (ACCEPTED)</option>
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

          <ErrorsBox formData={state} isPending={isPending} />

          <DialogFooter className="gap-2 sm:gap-0 mt-6 pt-2 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending || state.success}
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            >
              Annulla
            </Button>

            <Button
              type="submit"
              disabled={isPending || state.success}
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