// "use client";

// import { useTransition } from "react";
// import { userDeleteAdmin } from "@/action/action";
// import { FiTrash2 } from "react-icons/fi";

// interface DeleteUserButtonProps {
//   userId: string;
// }

// export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
//   const [isPending, startTransition] = useTransition();

//   const handleDelete = () => {
//     if (!confirm("Sei sicuro di voler eliminare questo utente?")) return;

//     startTransition(async () => {
//       const res = await userDeleteAdmin(userId);
//       if (!res.success) {
//         alert("Errore: " + res.message);
//       }
//     });
//   };

//   return (
//     <button
//       disabled={isPending}
//       onClick={handleDelete}
//       className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer disabled:opacity-50"
      
//     >
//  {isPending ? <div className="w-3.5 h-3.5 animate-spin border-2 border-zinc-400 border-t-rose-400 rounded-full" /> : <FiTrash2 className="w-3.5 h-3.5" />}
        
    
//     </button>
//   );
// }
"use client";

import { useState, useTransition } from "react";
import { userDeleteAdmin } from "@/action/action";
import { FiTrash2, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (newOpen: boolean) => {
    // Impedisce la chiusura se c'è un'operazione in corso
    if (isPending) return;
    
    setOpen(newOpen);
    if (!newOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  const handleDelete = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const res = await userDeleteAdmin(userId);

      if (!res.success) {
        setErrorMessage(res.message || "Si è verificato un errore imprevisto.");
      } else {
        setSuccessMessage("Utente eliminato/anonimizzato con successo!");
        setTimeout(() => {
          setOpen(false);
          setSuccessMessage(null);
        }, 1500);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          disabled={isPending}
          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer disabled:opacity-50 transition-colors"
          title="Elimina"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <div className="flex items-center gap-3 text-rose-400 mb-1">
            <div className="p-2 rounded-full bg-rose-500/10">
              <FiTrash2 className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100">Conferma Eliminazione</DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            Sei sicuro di voler eliminare questo utente? L&apos;account verrà anonimizzato nel database per preservare la cronologia delle attività.
          </DialogDescription>
        </DialogHeader>

        {/* Banner Errore */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Banner Successo */}
        {successMessage && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <FiCheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending || !!successMessage}
            className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
          >
            Annulla
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending || !!successMessage}
            className="bg-rose-600 hover:bg-rose-700 text-white min-w-[100px]"
          >
            {isPending ? (
              <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              "Conferma"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}