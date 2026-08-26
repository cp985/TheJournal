"use client";

import { useState, useActionState } from "react";
import { createTimelineSkeletonAdmin } from "@/action/action"; 
import { ActionState } from "@/lib/type"; 

import ErrorsBox from "./errorsBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const initialState: ActionState = {
  success: false,
  message: "",
  errors: null,
  fields: {
    timeline : [],
  },
};

export default function ImportTimelineModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const result = await createTimelineSkeletonAdmin(prevState, formData);
      if (result.success) {
        setIsOpen(false);
      }
      return result;
    },
    initialState
  );

  const sampleJson = JSON.stringify(
    [
      {
        dossierId: "dos-001",
        date: "2026-07-30T20:00:00.000Z",
        title: "Ritrovamento dell'auto abbandonata",
        description:
          "L'autovettura è stata ritrovata in un piazzale sterrato con le portiere aperte.",
        title_en: "Abandoned car found",
        description_en: "The vehicle was found in a dirt lot with doors open.",
      },
    ],
    null,
    2
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Importa Scheletro JSON
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl border border-amber-600 bg-zinc-950 font-mono text-zinc-100 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-zinc-100">
            Importa Scheletro Timeline (JSON)
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            Incolla la struttura JSON degli eventi per popolare la spina
            dorsale del dossier.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="mt-2 space-y-4">
          {/* Textarea Input JSON */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-300">
              Payload JSON Array (`timeline`)
            </label>
            <textarea
              name="timeline"
              rows={10}
              required
              placeholder={sampleJson}
              defaultValue={state.fields?.timeline}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>

          {/* Box Gestione Errori */}
          <ErrorsBox formData={state} isPending={isPending} page="admin.map" />

          {/* Actions Footer */}
          <DialogFooter className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800"
              >
                Annulla
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                  Elaborazione...
                </>
              ) : (
                "Conferma & Importa"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}