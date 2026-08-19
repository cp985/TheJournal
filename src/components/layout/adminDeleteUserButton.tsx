"use client";

import { useTransition } from "react";
import { userDeleteAdmin } from "@/action/action";
import { FiTrash2 } from "react-icons/fi";

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Sei sicuro di voler eliminare questo utente?")) return;

    startTransition(async () => {
      const res = await userDeleteAdmin(userId);
      if (!res.success) {
        alert("Errore: " + res.message);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer disabled:opacity-50"
      
    >
 {isPending ? <div className="w-3.5 h-3.5 animate-spin border-2 border-zinc-400 border-t-rose-400 rounded-full" /> : <FiTrash2 className="w-3.5 h-3.5" />}
        
    
    </button>
  );
}