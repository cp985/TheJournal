
"use client";

import { useState } from "react";
import { DbEvidence } from "@/lib/type";
import { useLanguage } from "@/context/maincontext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface CreateNodeJsonModalProps {
  evidence: DbEvidence | null;
  dossierCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNodeJsonModal({
  evidence,
  dossierCode,
  isOpen,
  onClose,
}: CreateNodeJsonModalProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const tModal = t.admin.mapView.createNodeButton;

  if (!evidence) return null;

  const generatedNode = {
    dossierId: dossierCode,
    title: evidence.notes || "Nuovo Evento",
    description: evidence.notes || "Nessuna Descrizione",
    title_en: evidence.notes_en || "New Event",
    description_en: evidence.notes_en || "No Description",
    date: evidence.createdAt || new Date().toISOString(),
  };

  const jsonString = JSON.stringify(generatedNode, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Errore durante la copia:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl border border-zinc-800 bg-zinc-950 font-mono text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-zinc-100">
            {tModal.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            {tModal.description}
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-2">
          <textarea
            readOnly
            rows={10}
            value={jsonString}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 text-xs text-amber-300 focus:outline-none"
          />
        </div>

        <DialogFooter className="flex items-center justify-between border-t border-zinc-800 pt-4">
          <span className="text-[11px] text-zinc-500">
            {copied ? tModal.copyStatusCopied : tModal.copyStatusIdle}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
            >
              {copied ? tModal.copyBtnCopied : tModal.copyBtnIdle}
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                {tModal.closeBtn}
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}