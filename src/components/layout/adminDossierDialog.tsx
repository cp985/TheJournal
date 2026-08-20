"use client";

import { useActionState, useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiFolder, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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

// Tipo delle prop per i dati del Dossier (utilizzati per il pre-fill in modalità Edit)
export interface DossierData {
  id?: string;
  code: string;
  title: string;
  description: string;
  status?: string;
  author?: string | null;
  title_en?: string | null;
  description_en?: string | null;
  coverUrl: string;
}

interface DossierFormDialogProps {
  mode: "create" | "edit";
  initialData?: DossierData;
  // La Server Action verrà definita dopo con Zod e useActionState
  action: (prevState: any, formData: FormData) => Promise<any>;
}

export default function DossierFormDialog({
  mode,
  initialData,
  action,
}: DossierFormDialogProps) {
  const [open, setOpen] = useState(false);

  // useActionState gestisce lo stato di invio, errori di validazione e risposta
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: null,
    errors: null,
  });

  // Chiude il dialogo automaticamente dopo l'esito positivo
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
            title="Modifica Dossier"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 cursor-pointer">
            <FiPlus className="w-4 h-4" />
            <span>Nuovo Dossier</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-zinc-900 border-zinc-800 text-zinc-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 text-rose-400 mb-1">
            <div className="p-2 rounded-full bg-rose-500/10">
              <FiFolder className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100 text-xl font-bold">
              {isEdit ? "Modifica Dossier" : "Crea Nuovo Dossier"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? "Aggiorna le informazioni relative a questo dossier."
              : "Inserisci i dati essenziali per archiviare un nuovo dossier d'indagine."}
          </DialogDescription>
        </DialogHeader>

        {/* Form collegato a useActionState */}
        <form action={formAction} className="space-y-4 mt-2">
          {/* Se siamo in Edit, inviamo l'ID come campo nascosto */}
          {isEdit && initialData?.id && (
            <input type="hidden" name="id" value={initialData.id} />
          )}

          {/* Banner di Errore Generale */}
          {state?.message && !state?.success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Banner di Successo */}
          {state?.success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <FiCheckCircle className="w-4 h-4 shrink-0" />
              <span>{state.message || "Operazione completata con successo!"}</span>
            </div>
          )}

          {/* Riga 1: Codice Identificativo e Stato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Codice Univoco (Code) *
              </label>
              <input
                type="text"
                name="code"
                defaultValue={initialData?.code || ""}
                placeholder="es. DOS-2026-001"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm"
              />
              {state?.errors?.code && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.code[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Stato
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "Open"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-rose-500 text-sm"
              >
                <option value="Open">Aperto (Open)</option>
                <option value="In Progress">In Corso (In Progress)</option>
                <option value="Closed">Chiuso (Closed)</option>
                <option value="Archived">Archiviato (Archived)</option>
              </select>
            </div>
          </div>

          {/* Titolo IT & EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Titolo (Italiano) *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={initialData?.title || ""}
                placeholder="Titolo del dossier"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm"
              />
              {state?.errors?.title && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.title[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Titolo (Inglese)
              </label>
              <input
                type="text"
                name="title_en"
                defaultValue={initialData?.title_en || ""}
                placeholder="Title in English (opzionale)"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm"
              />
            </div>
          </div>

          {/* URL Copertina */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              URL Immagine di Copertina (Cover URL) *
            </label>
            <input
              type="text"
              name="coverUrl"
              defaultValue={initialData?.coverUrl || ""}
              placeholder="https://... o /images/cover.jpg"
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm"
            />
            {state?.errors?.coverUrl && (
              <p className="text-xs text-rose-400 mt-1">{state.errors.coverUrl[0]}</p>
            )}
          </div>

          {/* Descrizione IT */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Descrizione (Italiano) *
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialData?.description || ""}
              placeholder="Dettagli e contesto del dossier..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm resize-none"
            />
            {state?.errors?.description && (
              <p className="text-xs text-rose-400 mt-1">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Descrizione EN */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Descrizione (Inglese)
            </label>
            <textarea
              name="description_en"
              rows={3}
              defaultValue={initialData?.description_en || ""}
              placeholder="English description (optional)..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 text-sm resize-none"
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
              className="bg-rose-600 hover:bg-rose-700 text-white min-w-[120px]"
            >
              {isPending ? (
                <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
              ) : isEdit ? (
                "Salva Modifiche"
              ) : (
                "Crea Dossier"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}