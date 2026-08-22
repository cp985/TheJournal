
"use client";



import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createDossierAdmin, updateDossierAdmin } from "@/action/action";
import { DossierStatus,ActionState } from "@/lib/type";
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

// Props discriminate: "create" prende solo mode, "edit" richiede anche id + initialData.
type DossierFormDialogProps =
  | { mode: "create" }
  | { mode: "edit"; id: string; initialData: DossierData };

export default function DossierFormDialog(props: DossierFormDialogProps) {
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
            title="Modifica Dossier"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>Nuovo Dossier</span>
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
              {isEdit ? "Modifica Dossier" : "Crea Nuovo Dossier"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? "Aggiorna le informazioni relative a questo dossier."
              : "Inserisci i dati essenziali per archiviare un nuovo dossier d'indagine."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* In edit inviamo l'ID come campo nascosto, preso da props.id (non da initialData) */}
          {isEdit && <input type="hidden" name="id" value={props.id} />}

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
                className="w-full focus:border-zinc-500 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
              />
              {state?.errors?.code && (
                <p className="text-xs text-rose-400 mt-1">{state.errors.code[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Stato</label>
              <select
                name="status"
                defaultValue={initialData?.status || "Open"}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="Open">Aperto (Open)</option>
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
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border focus:border-zinc-500 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
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
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
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
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
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
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
            {state?.errors?.description && (
              <p className="text-xs text-rose-400 mt-1">{state.errors.description[0]}</p>
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
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
            />
          </div>

          <ErrorsBox formData={state} isPending={isPending} />

          <DialogFooter className="w-full flex mt-6 pt-2 border-t border-zinc-800">
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
              disabled={isPending}
              className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
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