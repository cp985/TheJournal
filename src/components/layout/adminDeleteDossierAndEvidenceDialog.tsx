"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { DeleteActionResult } from "@/lib/type";
interface DeleteConfirmDialogProps {
  itemType: "dossier" | "evidence";
  itemId: string;
  itemTitle?: string;
onDelete: (id: string) => Promise<DeleteActionResult>;}

export default function DeleteConfirmDialog({
  itemType,
  itemId,
  itemTitle,
  onDelete,
}: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const isDossier = itemType === "dossier";
  const expectedPhrase = isDossier ? "Cancella Dossier" : "Cancella Prova";
  const entityLabel = isDossier ? "Dossier" : "Prova";

const isUnlocked = confirmText.trim().toLowerCase() === expectedPhrase.toLowerCase();
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setConfirmText(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUnlocked || isPending) return;

    setIsPending(true);
    try {
      await onDelete(itemId);
      setOpen(false);
    } catch (error) {
      console.error(`Errore eliminazione ${itemType}:`, error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-rose-500/10 max-w-7 max-h-7 rounded-none text-rose-400 hover:text-rose-400 hover:bg-rose-500/20 cursor-pointer disabled:opacity-50 ml-2 transition-colors"
          title={`Elimina ${entityLabel}`}
        >
          <FiTrash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border-rose-600 border bg-zinc-950 text-zinc-100">
        <DialogHeader className="space-y-1.5 flex items-center">
          <div className="flex items-center gap-2 text-zinc-100 mb-1">
            <FiAlertTriangle className="w-5 h-5" />
            <DialogTitle className="text-lg font-bold">
              Elimina {entityLabel}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400 text-sm flex items-center flex-col">
            Stai per eliminare permanentemente {isDossier ? "il dossier" : "la prova"}{" "}
            {itemTitle && <strong className="text-zinc-200">&quot;{itemTitle}&quot;.</strong>}
            Questa azione è irreversibile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="confirm-input" className="text-s flex flex-col ali text-zinc-300">
              Per confermare, digita: <span className="font-bold text-red-400">&quot;{expectedPhrase}&quot;</span> qui sotto:
            </Label>
            <Input
              id="confirm-input"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={expectedPhrase}
              autoComplete="off"
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 "
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!isUnlocked || isPending}
              className="bg-red-700 hover:bg-red-800 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Eliminazione..." : "Conferma Eliminazione"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}