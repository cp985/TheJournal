

"use client";

import { useState, useTransition } from "react";
import { userDelete } from "@/action/action";
import { useLanguage } from "@/context/maincontext";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiTrash2, FiLoader } from "react-icons/fi";

export default function DeleteAccountButton() {
  const { t: dictionary } = useLanguage();
  const t = dictionary.profile.deleteAccount;

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");

  const handleDelete = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const res = await userDelete();
      if (res && res.success) {
        setOpen(false);
      } else {
        setErrorMessage(t.errorMessage);
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setConfirmationInput("");
      setErrorMessage(null);
    }
  };

  const isConfirmDisabled =
    confirmationInput.trim().toLowerCase() !== t.confirmPhrase.toLowerCase() ||
    isPending;

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="px-3.5 py-2 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-sm font-mono text-rose-400 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiTrash2 className="w-4 h-4" />
          {t.triggerButton}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-950 border-2 border-rose-600/40 shadow-xl shadow-rose-600/5 text-zinc-100 sm:max-w-[550px] p-6 focus:outline-none">
        <AlertDialogHeader className="space-y-1.5 pb-2 border-b border-zinc-800/80">
          <AlertDialogTitle className="text-zinc-100 text-center gap-2.5 text-lg font-bold w-full">
            {t.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-sm text-center">
            {t.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <p className="mt-2 text-xs text-rose-400 font-mono bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
            {errorMessage}
          </p>
        )}

        <div className="py-2 space-y-2.5">
          <Label
            htmlFor="confirmDeleteInput"
            className="text-sm font-mono text-zinc-200 font-medium flex flex-col"
          >
            <p>{t.labelPrompt}</p>
            <p className="text-rose-400 font-bold bg-zinc-900 px-1 rounded">
              {t.confirmPhrase}
            </p>
          </Label>
          <Input
            id="confirmDeleteInput"
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            placeholder={t.confirmPhrase}
            disabled={isPending}
            autoComplete="off"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 h-10 placeholder:text-zinc-600 focus:border-rose-500/60"
          />
        </div>

        <AlertDialogFooter className="gap-3 sm:gap-2 pt-3 border-t border-zinc-800/80">
          <AlertDialogCancel
            disabled={isPending}
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 text-sm font-mono px-4 py-2"
          >
            {t.buttons.cancel}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              if (!isConfirmDisabled) {
                handleDelete();
              }
            }}
            disabled={isConfirmDisabled}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm font-mono flex items-center gap-2 px-5 py-2 disabled:opacity-50 transition-opacity"
          >
            {isPending ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                {t.buttons.deleting}
              </>
            ) : (
              t.buttons.confirm
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}