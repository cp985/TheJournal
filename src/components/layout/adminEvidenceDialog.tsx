// "use client";

// import { useState, useTransition, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useLanguage } from "@/context/maincontext";
// import { createEvidenceAdmin, updateEvidenceAdmin } from "@/action/action";
// import { ActionState } from "@/lib/type";
// import ErrorsBox from "./errorsBox";
// import { FiPlus, FiEdit2, FiFileText } from "react-icons/fi";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { EvidenceStatus, EvidenceType } from "@/lib/type";

// export interface EvidenceData {
//   id?: string;
//   dossierId: string;
//   type: EvidenceType;
//   fileUrl: string;
//   notes: string;
//   notes_en?: string | null;
//   status: EvidenceStatus;
// }

// type EvidenceFormDialogProps =
//   | {
//       mode: "create";
//       defaultDossierCode?: string;
//       dossierOptions: { code: string; title: string }[];
//     }
//   | {
//       mode: "edit";
//       id: string;
//       initialData: EvidenceData;
//       dossierOptions: { code: string; title: string }[];
//     };

// const EMPTY_STATE: ActionState = {
//   success: false,
//   message: null,
//   errors: null,
// };

// export default function EvidenceFormDialog(props: EvidenceFormDialogProps) {
//   const { t } = useLanguage();
//   const { mode } = props;
//   const isEdit = mode === "edit";
//   const initialData = isEdit ? props.initialData : undefined;
//   const defaultDossierCode = !isEdit ? props.defaultDossierCode : undefined;

//   const [open, setOpen] = useState(false);
//   const [state, setState] = useState<ActionState>(EMPTY_STATE);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleOpenChange = (newOpen: boolean) => {
//     if (isPending) return;
//     setOpen(newOpen);
//     if (!newOpen) setState(EMPTY_STATE);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     startTransition(async () => {
//       const action = isEdit ? updateEvidenceAdmin : createEvidenceAdmin;
//       const res = await action(EMPTY_STATE, formData);
//       setState(res);

//       if (res.success) {
//         router.refresh();
//         setTimeout(() => setOpen(false), 1200);
//       }
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         {isEdit ? (
//           <button
//             className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-colors"
//             title={t.admin.evidenceDialog.buttonEditTooltip}
//           >
//             <FiEdit2 className="w-3.5 h-3.5" />
//           </button>
//         ) : (
//           <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
//             <FiPlus className="w-4 h-4" />
//             <span>{t.admin.evidenceDialog.buttonNew}</span>
//           </Button>
//         )}
//       </DialogTrigger>

//       <DialogContent
//         key={isEdit ? props.id : "create"}
//         className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6"
//       >
//         <DialogHeader>
//           <div className="flex items-center gap-3 text-amber-400 mb-1">
//             <div className="p-2 rounded-full bg-rose-500/10">
//               <FiFileText className="w-5 h-5" />
//             </div>
//             <DialogTitle className="text-zinc-100 text-xl font-bold">
//               {isEdit
//                 ? t.admin.evidenceDialog.editTitle
//                 : t.admin.evidenceDialog.createTitle}
//             </DialogTitle>
//           </div>
//           <DialogDescription className="text-zinc-400">
//             {isEdit
//               ? t.admin.evidenceDialog.editDesc
//               : t.admin.evidenceDialog.createDesc}
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4 mt-2">
//           {/* In edit inviamo l'ID come campo nascosto */}
//           {isEdit && <input type="hidden" name="id" value={props.id} />}

//           {/* Riga 1: Codice Dossier e Tipo Prova */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-zinc-300 mb-1">
//                 {t.admin.evidenceDialog.dossierCodeLabel}
//               </label>
//               <select
//               required
//                 className="w-full px-3 py-2 pr-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm cursor-pointer"
//                 name="dossierId"
//                 defaultValue={
//                   initialData?.dossierId || defaultDossierCode || ""
//                 }
//               >
//                 <option value="" className="py-2 px-3 bg-zinc-800" disabled>
//                   {t.admin.evidenceDialog.selectDossierPlaceholder}
//                 </option>
//                 {props.dossierOptions.map((d) => (
//                   <option
//                     className="py-2 px-3 bg-zinc-800"
//                     key={d.code}
//                     value={d.code}
//                   >
//                     {d.code} — {d.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-zinc-300 mb-1">
//                 {t.admin.evidenceDialog.typeLabel}
//               </label>
//               <select
//                 name="type"
//                 defaultValue={initialData?.type || "PHOTO"}
//                 className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
//               >
//                 <option value="PHOTO">
//                   {t.admin.evidenceDialog.typePhoto}
//                 </option>
//                 <option value="PDF">{t.admin.evidenceDialog.typePdf}</option>
//                 <option value="DOCUMENT">
//                   {t.admin.evidenceDialog.typeDoc}
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* Riga 2: URL File e Stato Validazione */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-zinc-300 mb-1">
//                 {t.admin.evidenceDialog.fileUrlLabel}
//               </label>
//               <input
//                 type="text"
//                 name="fileUrl"
//                 defaultValue={initialData?.fileUrl || ""}
//                 placeholder={t.admin.evidenceDialog.fileUrlPlaceholder}
//                 className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-zinc-300 mb-1">
//                 {t.admin.evidenceDialog.statusLabel}
//               </label>
//               <select
//                 name="status"
//                 defaultValue={initialData?.status || "PENDING"}
//                 className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
//               >
//                 <option value="PENDING">
//                   {t.admin.evidenceDialog.statusPending}
//                 </option>
//                 <option value="ACCEPTED">
//                   {t.admin.evidenceDialog.statusAccepted}
//                 </option>
//                 <option value="REJECTED">
//                   {t.admin.evidenceDialog.statusRejected}
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* Note IT */}
//           <div>
//             <label className="block text-xs font-medium text-zinc-300 mb-1">
//               {t.admin.evidenceDialog.notesItLabel}
//             </label>
//             <textarea
//               name="notes"
//               rows={3}
//               defaultValue={initialData?.notes || ""}
//               placeholder={t.admin.evidenceDialog.notesItPlaceholder}
//               className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
//             />
//           </div>

//           {/* Note EN */}
//           <div>
//             <label className="block text-xs font-medium text-zinc-300 mb-1">
//               {t.admin.evidenceDialog.notesEnLabel}
//             </label>
//             <textarea
//               name="notes_en"
//               rows={3}
//               defaultValue={initialData?.notes_en || ""}
//               placeholder={t.admin.evidenceDialog.notesEnPlaceholder}
//               className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
//             />
//           </div>

//           <DialogFooter className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-zinc-800">
//             {/* Box Errori a sinistra su desktop, in alto su mobile */}
//             <div className="w-full sm:w-auto flex-1">
//               <ErrorsBox formData={state} isPending={isPending} page="admin.evidenceDialog" />
//             </div>

//             <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => handleOpenChange(false)}
//                 disabled={isPending || state.success}
//                 className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
//               >
//                 {t.admin.evidenceDialog.cancelButton}
//               </Button>

//               <Button
//                 type="submit"
//                 disabled={isPending}
//                 className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
//               >
//                 {isPending ? (
//                   <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
//                 ) : isEdit ? (
//                   t.admin.evidenceDialog.saveChangesButton
//                 ) : (
//                   t.admin.evidenceDialog.createButton
//                 )}
//               </Button>
//             </div>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { createEvidenceAdmin, updateEvidenceAdmin } from "@/action/action";
import { FormActionState, DbEvidence } from "@/lib/type";
import ErrorsBox from "./errorsBox";
import { FiPlus, FiEdit2, FiFileText, FiClock, FiUpload } from "react-icons/fi";
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
import { formatDate } from "@/lib/utils";

export interface TimelineOption {
  id: string;
  title: string;
  title_en?: string;
  date: string;
}

export interface DossierOption {
  code: string;
  title: string;
  timeline?: TimelineOption[];
}



type EvidenceFormDialogProps =
  | {
      mode: "create";
      defaultDossierCode?: string;
      dossierOptions: DossierOption[];
    }
  | {
      mode: "edit";
      id: string;
      initialData: DbEvidence;
      dossierOptions: DossierOption[];
    };

const EMPTY_STATE: FormActionState = {
  success: false,
  message: "", 
  data: {},
  errors: null,
};

export default function EvidenceFormDialog(props: EvidenceFormDialogProps) {
  const { t, lang } = useLanguage();
  const { mode, dossierOptions = [] } = props;
  const isEdit = mode === "edit";
  const initialData = isEdit ? props.initialData : undefined;
  const defaultDossierCode = !isEdit ? props.defaultDossierCode : undefined;

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  // Calcola il dossier di default
  const defaultDossierId =
    initialData?.dossierId || defaultDossierCode || dossierOptions[0]?.code || "";

  // Inizializza lo stato col default corretto
  const [selectedDossierId, setSelectedDossierId] = useState<string>(defaultDossierId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

 const handleAction = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
    const action = isEdit ? updateEvidenceAdmin : createEvidenceAdmin;
    const res = await action(prevState, formData);

    if (res.success) {
      router.refresh();
      setOpen(false);
    }
    return res;
  };

  const [state, formAction, isPending] = useActionState(
    handleAction,
    EMPTY_STATE
  );

  const currentDossier = dossierOptions.find((d) => d.code === selectedDossierId);
  const currentTimelines = [...(currentDossier?.timeline || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleOpenChange = (newOpen: boolean) => {
    if (isPending) return;
    setOpen(newOpen);
    
    if (newOpen) {
      // Quando apriamo, resettiamo i valori corretti
      setOpenCount((prev) => prev + 1);
      setSelectedDossierId(defaultDossierId);
      setSelectedFile(null);
    }
  };

  const dialogKey = `${isEdit ? props.id : "create"}-${openCount}`;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button
            type="button"
            className="p-1.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-colors"
            title={t.admin.evidenceDialog.buttonEditTooltip}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Button className="px-1.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-sm font-mono text-amber-400 flex items-center gap-2 transition-colors">
            <FiPlus className="w-4 h-4" />
            <span>{t.admin.evidenceDialog.buttonNew}</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        key={dialogKey}
        className="bg-zinc-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 text-zinc-100 sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 text-amber-400 mb-1">
            <div className="p-2 rounded-full bg-rose-500/10">
              <FiFileText className="w-5 h-5" />
            </div>
            <DialogTitle className="text-zinc-100 text-xl font-bold">
              {isEdit
                ? t.admin.evidenceDialog.editTitle
                : t.admin.evidenceDialog.createTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">
            {isEdit
              ? t.admin.evidenceDialog.editDesc
              : t.admin.evidenceDialog.createDesc}
          </DialogDescription>
        </DialogHeader>

 <form action={formAction} className="space-y-4 mt-2">
  {isEdit && <input type="hidden" name="id" value={props.id} />}

  {/* Riga 1: Codice Dossier e Tipo Prova */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-xs font-medium text-zinc-300 mb-1">
        {t.admin.evidenceDialog.dossierCodeLabel}
      </label>
      <select
        required
        className="w-full px-3 py-2 pr-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm cursor-pointer"
        name="dossierId"
        value={selectedDossierId}
        onChange={(e) => setSelectedDossierId(e.target.value)}
      >
        <option value="" className="py-2 px-3 bg-zinc-800" disabled>
          {t.admin.evidenceDialog.selectDossierPlaceholder}
        </option>
        {dossierOptions.map((d) => (
          <option
            className="py-2 px-3 bg-zinc-800"
            key={d.code}
            value={d.code}
          >
            {d.code} — {d.title}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-zinc-300 mb-1">
        {t.admin.evidenceDialog.typeLabel}
      </label>
      <select
        name="type"
        defaultValue={state.data?.type || initialData?.type || "PHOTO"}
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm cursor-pointer"
      >
        <option value="PHOTO">{t.admin.evidenceDialog.typePhoto}</option>
        <option value="PDF">{t.admin.evidenceDialog.typePdf}</option>
        <option value="DOCUMENT">{t.admin.evidenceDialog.typeDoc}</option>
      </select>
    </div>
  </div>

  {/* Riga 2: Timeline associata e Stato Validazione */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-xs font-medium text-zinc-300 mb-1 flex items-center gap-1">
        <FiClock className="w-3.5 h-3.5 text-amber-500" />
        {t.profile?.addEvidenceDialog?.labels?.timeline || "Timeline / Evento"}
      </label>
      <select
        name="timelineId"
        disabled={!selectedDossierId || currentTimelines.length === 0}
        defaultValue={state.data?.timelineId || initialData?.timelineId || ""}
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {!selectedDossierId ? (
          <option value="">
            {t.profile?.addEvidenceDialog?.placeholders?.selectDossierFirst ||
              "Seleziona prima un Dossier..."}
          </option>
        ) : currentTimelines.length === 0 ? (
          <option value="">
            {t.profile?.addEvidenceDialog?.placeholders?.noTimelines ||
              "Nessuna timeline disponibile"}
          </option>
        ) : (
          <>
            <option value="">
              {t.profile?.addEvidenceDialog?.placeholders?.selectTimeline ||
                "Seleziona una Timeline..."}
            </option>
            {currentTimelines.map((tl) => (
              <option
                key={tl.id}
                value={tl.id}
                className="py-2 px-3 bg-zinc-800"
              >
                {lang === "EN" && tl.title_en ? tl.title_en : tl.title} -{" "}
                {formatDate(tl.date)}
              </option>
            ))}
          </>
        )}
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-zinc-300 mb-1">
        {t.admin.evidenceDialog.statusLabel}
      </label>
      <select
        name="status"
        defaultValue={state.data?.status || initialData?.status || "PENDING"}
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm cursor-pointer"
      >
        <option value="PENDING">{t.admin.evidenceDialog.statusPending}</option>
        <option value="ACCEPTED">{t.admin.evidenceDialog.statusAccepted}</option>
        <option value="REJECTED">{t.admin.evidenceDialog.statusRejected}</option>
      </select>
    </div>
  </div>

  {/* Riga 3: File Picker (Sinistra) e Note (Destra) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Colonna Sinistra: File Picker / File URL */}
    <div className="flex flex-col h-full">
      {isEdit ? (
        <div className="flex flex-col h-full">
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            {t.admin.evidenceDialog.fileUrlLabel}
          </label>
          <input
            type="text"
            name="fileUrl"
            defaultValue={ initialData?.fileUrl || ""}
            placeholder={t.admin.evidenceDialog.fileUrlPlaceholder}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm"
          />
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <label className="block text-xs font-medium text-zinc-300 mb-1">
            {t.profile?.addEvidenceDialog?.labels?.attachedFile || t.admin.evidenceDialog.fileLabel || "File Allegato"}
          </label>
          <div className="relative border-2 border-dashed border-zinc-800 hover:border-amber-500/40 bg-zinc-900/60 rounded-lg p-4 text-center transition-colors flex-1 flex flex-col items-center justify-center min-h-[150px]">
            <Input
              required
              accept="image/png, image/jpeg, image/webp, application/pdf, text/plain, .txt, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              type="file"
              name="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-1.5">
              <FiUpload className="w-6 h-6 text-amber-500/80" />
              <span className="text-xs text-zinc-200 font-mono font-medium">
                {selectedFile
                  ? selectedFile.name
                  : t.profile?.addEvidenceDialog?.placeholders?.dropzoneDefault || "Trascina o clicca per caricare"}
              </span>
              <span className="text-[11px] text-zinc-400">
                {selectedFile
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : t.profile?.addEvidenceDialog?.placeholders?.dropzoneHint || "PDF, Word o Immagini"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Colonna Destra: Note */}
    <div className="flex flex-col gap-3">
      {/* Note IT */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1">
          {t.admin.evidenceDialog.notesItLabel}
        </label>
        <textarea
          name="notes"
          rows={2}
          defaultValue={state.data?.notes || initialData?.notes || ""}
          placeholder={t.admin.evidenceDialog.notesItPlaceholder}
          className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
        />
      </div>

      {/* Note EN */}
      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1">
          {t.admin.evidenceDialog.notesEnLabel}
        </label>
        <textarea
          name="notes_en"
          rows={2}
          defaultValue={state.data?.notes_en || initialData?.notes_en || ""}
          placeholder={t.admin.evidenceDialog.notesEnPlaceholder}
          className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 text-sm resize-none"
        />
      </div>
    </div>
    
  </div>

  <DialogFooter className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-zinc-800">
    {/* Box Errori */}
    <div className="w-full sm:w-auto flex-1">
      <ErrorsBox
        formData={state}
        isPending={isPending}
        page="admin.evidenceDialog"
      />
    </div>

    <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
      <Button
        type="button"
        variant="outline"
        onClick={() => handleOpenChange(false)}
        disabled={isPending || state.success}
        className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
      >
        {t.admin.evidenceDialog.cancelButton}
      </Button>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px]"
      >
        {isPending ? (
          <div className="w-4 h-4 animate-spin border-2 border-white/30 border-t-white rounded-full" />
        ) : isEdit ? (
          t.admin.evidenceDialog.saveChangesButton
        ) : (
          t.admin.evidenceDialog.createButton
        )}
      </Button>
    </div>
  </DialogFooter>
</form>
      </DialogContent>
    </Dialog>
  );
}