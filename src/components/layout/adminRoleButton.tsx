
"use client";

import { useState, useTransition } from "react";
import { useLanguage } from "@/context/maincontext";
import { userRoleAdmin } from "@/action/action";
import { FiShield, FiAlertCircle, FiCheckCircle, FiUserCheck } from "react-icons/fi";
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

interface ToggleRoleButtonProps {
  userId: string;
}

export default function ToggleRoleButton({ userId }: ToggleRoleButtonProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;

    setOpen(newOpen);
    if (!newOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  const handleToggleRole = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const res = await userRoleAdmin(userId);

      if (!res.success) {
        setErrorMessage(res.message || t.admin.toggleRole.defaultError);
      } else {
        setSuccessMessage(t.admin.toggleRole.successMessage);
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
          className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer disabled:opacity-50 transition-colors"
          title={t.admin.toggleRole.triggerTitle}
        >
          <FiUserCheck className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-zinc-900 border border-amber-600 text-zinc-100">
        <DialogHeader>
          <div className="flex items-center gap-3 text-amber-400 mb-1">
            <div className="p-2 rounded-full bg-amber-500/10">
              <FiShield className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100">
              {t.admin.toggleRole.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {t.admin.toggleRole.description}
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
            {t.admin.toggleRole.cancel}
          </Button>

          <Button
            type="button"
            onClick={handleToggleRole}
            disabled={isPending || !!successMessage}
            className="bg-amber-600 hover:bg-amber-700 text-white min-w-[100px]"
          >
            {isPending ? (
              <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              t.admin.toggleRole.confirm
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}