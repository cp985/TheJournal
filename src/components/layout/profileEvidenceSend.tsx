

"use client";

import { useState, useActionState, startTransition, useEffect } from "react";
import { useLanguage } from "@/context/maincontext";
import { Input } from "@/components/ui/input";
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
import {
  FiPlus,
  FiUpload,
  FiLoader,
  FiFileText,
  FiFolder,
  FiClock,
} from "react-icons/fi";
import { DossierStats } from "@/components/layout/profilePageClient";
import { createEvidenceAction } from "@/action/action";
import ErrorsBox from "./errorsBox";
import { formatDate } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  title_en?: string;
  date: string;
}

export interface DossierWithTimeline extends DossierStats {
  timeline?: TimelineItem[];
}

interface AddEvidenceDialogProps {
  dossiers?: DossierWithTimeline[];
  onSuccess?: () => void;
}

export type FormActionState = {
  errors?: Record<string, string[]> | null;
  message?: string;
  data?: {
    dossierId?: string;
    type?: string;
    timelineId?: string;
    notes?: string;
    notes_en?: string;
    fileName?: string;
  };
  success: boolean;
};

const initialEvidenceState: FormActionState = {
  errors: null,
  message: "",
  data: {
    dossierId: "",
    type: "PHOTO",
    timelineId: "",
    notes: "",
    notes_en: "",
    fileName: "",
  },
  success: false,
};

export default function AddEvidenceDialog({
  dossiers = [],
  onSuccess,
}: AddEvidenceDialogProps) {
  const { t: dictionary, lang } = useLanguage();
  const t = dictionary.profile.addEvidenceDialog;

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDossierId, setSelectedDossierId] = useState<string>("");

  // Gestione Action + Reset


  const handleAction = async (
    prevState: FormActionState,
    formData: FormData | "RESET"
  ): Promise<FormActionState> => {
    if (formData === "RESET") {
      return initialEvidenceState;
    }

    const res = await createEvidenceAction(prevState, formData);
    
    if (!res.success) {
      setSelectedFile(null);
    }
    
    return res;
  };
  const [formEvidence, formAction, isPending] = useActionState(
    handleAction,
    initialEvidenceState
  );

  const safeDossiers =
    dossiers.length > 0
      ? dossiers
      : [{ code: "", title: t.labels.noDossiers, timeline: [] }];

  const activeDossierId =
    selectedDossierId ||
    formEvidence.data?.dossierId ||
    safeDossiers[0]?.code ||
    "";

  const currentDossier = safeDossiers.find((d) => d.code === activeDossierId);

  const rawTimelines = currentDossier?.timeline || [];
  const currentTimelines = [...rawTimelines].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    setOpen(newOpen);

    if (!newOpen) {
      startTransition(() => {
        formAction("RESET" as any);
      });
      setSelectedFile(null);
      setSelectedDossierId("");
    }
  };

  useEffect(() => {
    if (formEvidence.success) {
      const timer = setTimeout(() => {
        handleOpenChange(false); 
        if (onSuccess) onSuccess(); 
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEvidence.success]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="px-3.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>{t.triggerButton}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[720px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="space-y-1.5 pb-2 border-b border-zinc-800/80">
          <DialogTitle className="text-zinc-100 flex items-center gap-2.5 text-lg font-bold">
            <FiFileText className="w-5 h-5 text-amber-500" />
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Select Dossier / Caso */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-zinc-200 flex items-center gap-1.5 font-medium">
                <FiFolder className="w-4 h-4 text-amber-500" />
                {t.labels.selectDossier}
              </label>
              <select
                name="dossierId"
                value={activeDossierId}
                onChange={(e) => setSelectedDossierId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/60"
              >
                {safeDossiers.map((dossier) => {
                  const title =
                    lang === "EN" && dossier.title_en
                      ? dossier.title_en
                      : dossier.title;

                  return (
                    <option
                      key={dossier.code}
                      value={dossier.code}
                      disabled={!dossier.code}
                    >
                      {title} {dossier.code ? `(${dossier.code})` : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 2. Select Tipo di File */}
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-mono text-zinc-200 font-medium">
                {t.labels.fileType}
              </label>
              <select
                name="type"
                defaultValue={formEvidence.data?.type || "PHOTO"}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/60"
              >
                <option value="PHOTO">{t.options.photo}</option>
                <option value="DOCUMENT">{t.options.document}</option>
                <option value="PDF">{t.options.pdf}</option>
              </select>
            </div>

            {/* 3. Input Nome File Personalizzato */}
            <div className="space-y-2 flex flex-col md:col-span-2">
              <label className="text-sm font-mono text-zinc-200 font-medium">
                {t.labels.evidenceTitle}
              </label>
              <Input
                required
                defaultValue={formEvidence.data?.fileName}
                type="text"
                name="fileName"
                placeholder={t.placeholders.evidenceTitle}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 h-10 focus:outline-none focus:border-amber-500/60 placeholder:text-zinc-500"
              />
            </div>

            {/* 4. Layout Inferiore: Sinistra (Timeline + File) | Destra (Note IT + EN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4 items-start w-full">
              {/* Colonna Sinistra */}
              <div className="space-y-4 flex flex-col justify-between h-full">
                {/* Select Timeline */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-zinc-200 flex items-center gap-1.5 font-medium">
                    <FiClock className="w-4 h-4 text-amber-500" />
                    {t.labels.timeline || "Timeline / Evento"}
                  </label>
                  <select
                    name="timelineId"
                    disabled={!activeDossierId || currentTimelines.length === 0}
                    defaultValue={formEvidence.data?.timelineId || ""}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!activeDossierId ? (
                      <option value="">
                        {t.placeholders?.selectDossierFirst ||
                          "Seleziona prima un Dossier..."}
                      </option>
                    ) : currentTimelines.length === 0 ? (
                      <option value="">
                        {t.placeholders?.noTimelines ||
                          "Nessuna timeline disponibile"}
                      </option>
                    ) : (
                      <>
                        <option value="">
                          {t.placeholders?.selectTimeline ||
                            "Seleziona una Timeline..."}
                        </option>
                        {currentTimelines.map((tl) => (
                          <option key={tl.id} value={tl.id}>
                            {lang === "EN" && tl.title_en
                              ? tl.title_en
                              : tl.title}{" "}
                            - {formatDate(tl.date)}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                {/* File Dropzone */}
                <div className="space-y-2 flex flex-col flex-1">
                  <label className="text-sm font-mono text-zinc-200 font-medium">
                    {t.labels.attachedFile}
                  </label>
                  <div className="relative border-2 border-dashed border-zinc-800 hover:border-amber-500/40 bg-zinc-900/60 rounded-lg p-4 text-center transition-colors flex-1 flex flex-col items-center justify-center min-h-[140px]">
                    <Input
                      required
                      accept="image/png, image/jpeg, image/webp, application/pdf, text/plain, .txt, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      type="file"
                      name="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <FiUpload className="w-6 h-6 text-amber-500/80" />
                      <span className="text-xs text-zinc-200 font-mono font-medium">
                        {selectedFile
                          ? selectedFile.name
                          : t.placeholders.dropzoneDefault}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {selectedFile
                          ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                          : t.placeholders.dropzoneHint}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonna Destra (Note IT ed EN) */}
              <div className="space-y-4 w-full">
                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-mono text-zinc-200 font-medium">
                    {t.labels.notes}
                  </label>
                  <textarea
                    required
                    name="notes"
                    defaultValue={formEvidence.data?.notes || ""}
                    placeholder={t.placeholders.notes}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/60 resize-none flex-1 min-h-[110px] placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-mono text-zinc-200 font-medium">
                    {t.labels.notes_en}
                  </label>
                  <textarea
                    required
                    name="notes_en"
                    defaultValue={formEvidence.data?.notes_en || ""}
                    placeholder={t.placeholders.notes}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/60 resize-none flex-1 min-h-[110px] placeholder:text-zinc-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Box Errori */}
          <ErrorsBox
            formData={formEvidence}
            isPending={isPending}
            page="profile.addEvidenceDialog"
          />

          <DialogFooter className="gap-3 sm:gap-2 pt-3 border-t border-zinc-800/80">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-sm font-mono px-4 py-2"
            >
              {t.buttons.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isPending || safeDossiers[0].code === ""}
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm font-mono flex items-center gap-2 px-5 py-2 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  {t.buttons.submitting}
                </>
              ) : (
                t.buttons.submit
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}