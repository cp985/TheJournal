"use client";

import { useState, useTransition } from "react";
import { userDelete } from "@/action/action"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FiTrash2, FiLoader } from "react-icons/fi";

export default function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const res = await userDelete();
      if (res && !res.success) {
        setErrorMessage("Impossibile eliminare l'account. Riprova più tardi.");
      }
    });
  };

  return (
    <AlertDialog>
      {/* 1. Il pulsante principale che apre il dialog */}
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 font-mono text-xs"
        >
          <FiTrash2 className="w-4 h-4 mr-2" />
          Elimina Account
        </Button>
      </AlertDialogTrigger>

      {/* 2. Il contenuto del Dialog */}
      <AlertDialogContent className="bg-zinc-950 border border-zinc-800 text-zinc-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-100 font-semibold">
            Sei assolutamente sicuro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-sm">
            Questa azione è irreversibile. Il tuo account e tutti i dati correlati verranno eliminati o anonimizzati in modo permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <p className="text-xs text-rose-400 font-mono bg-rose-500/10 p-2 rounded border border-rose-500/20">
            {errorMessage}
          </p>
        )}

        <AlertDialogFooter className="gap-2 sm:gap-0">
          {/* Pulsante Annulla */}
          <AlertDialogCancel
            disabled={isPending}
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 font-mono text-xs"
          >
            Annulla
          </AlertDialogCancel>

          {/* Pulsante Conferma Eliminazione */}
          <AlertDialogAction
            onClick={(e) => {
              // Impedisce la chiusura immediata del dialog per mostrare lo stato di caricamento
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs flex items-center gap-2"
          >
            {isPending ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Eliminazione in corso...
              </>
            ) : (
              "Sì, elimina il mio account"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}