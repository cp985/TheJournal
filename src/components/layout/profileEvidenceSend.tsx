
// "use client";

// import { useState, useActionState } from "react";
// import {Input} from "@/components/ui/input";
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
// import {
//   FiPlus,
//   FiUpload,
//   FiLoader,
//   FiFileText,
//   FiFolder,
// } from "react-icons/fi";
// import { DossierStats } from "@/app/(auth)/profile/page";
// import { createEvidenceAction } from "@/action/action";
// import ErrorsBox from "./errorsBox";
// interface AddEvidenceDialogProps {
//   dossiers?: DossierStats[];
//   onSuccess?: () => void;
// }

// export type FormActionState = {
//   errors?: Record<string, string[]> | null;
//   message?: string;
//   data?: {
//     dossierId?: string;
//     type?: string;
//     notes?: string;
//     fileName?: string | undefined;
//   };
//   success: boolean;
// };

// const initialEvidenceState: FormActionState = {
//   errors: null,
//   message: "",
//   data: {
//     dossierId: "",
//     type: "PHOTO",
//     notes: "",
//     fileName: "",
//   },
//   success: false,
// };
// export default function AddEvidenceDialog({
//   dossiers = [],
//   onSuccess,
// }: AddEvidenceDialogProps) {
//   const [formEvidence, formAction, isPending] = useActionState(
//     createEvidenceAction,
//     initialEvidenceState,
//   );

//   const [open, setOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // Lista sicura dei dossier
//   const safeDossiers =
//     dossiers.length > 0
//       ? dossiers
//       : [{ code: "", title: "Nessun dossier disponibile" }];
//   const activeDossierId =
//     formEvidence.data?.dossierId || safeDossiers[0]?.code || "";

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(nextOpen) => {
//         setOpen(nextOpen);
//         if (!nextOpen) setSelectedFile(null);
//       }}
//     >
//       <DialogTrigger asChild>
//         <button
//           type="button"
//           className="px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-400 flex items-center gap-1.5 transition-colors"
//         >
//           <FiPlus className="w-4 h-4" />
//           <span>Aggiungi Prova</span>
//         </button>
//       </DialogTrigger>

//       <DialogContent className="bg-zinc-950 border border-zinc-800 text-zinc-100 sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-zinc-100 flex items-center gap-2 text-base font-semibold">
//             <FiFileText className="w-4 h-4 text-amber-500" />
//             Invia Nuova Prova
//           </DialogTitle>
//           <DialogDescription className="text-zinc-400 text-xs">
//             Seleziona il caso/dossier e carica un file da allegare.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Usiamo action con wrapper async per gestire la chiusura pulita */}
//         <form action={formAction} className="space-y-4 py-2">
//           {/* 1. Select Dossier / Caso */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
//               <FiFolder className="w-3.5 h-3.5 text-amber-500" />
//               Seleziona Dossier / Caso
//             </label>
//             <select
//               name="dossierId"
//               defaultValue={activeDossierId}
//               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
//             >
//               {safeDossiers.map((dossier) => (
//                 <option
//                   key={dossier.code}
//                   value={dossier.code}
//                   disabled={!dossier.code}
//                 >
//                   {dossier.title} {dossier.code ? `(${dossier.code})` : ""}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/*  Select nome file */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-mono text-zinc-300">
//               Nome File
//             </label>
//             <Input
//             required
//             defaultValue={formEvidence.data?.fileName}
//               type="text"
//               name="fileName"
//               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
//             />
//           </div>

//           {/* 2. Select Tipo di File */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-mono text-zinc-300">
//               Tipo di File
//             </label>
//             <select
//               name="type"
//               defaultValue={formEvidence.data?.type || "PHOTO"}
//               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
//             >
//               <option value="PHOTO">Foto / Immagine</option>
//               <option value="DOCUMENT">Documento (PDF, DOCX)</option>
//               <option value="VIDEO">Video</option>
//               <option value="AUDIO">Traccia Audio</option>
//               <option value="OTHER">Altro</option>
//             </select>
//           </div>

//           {/* 3. Input File */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-mono text-zinc-300">
//               File Allegato
//             </label>
//             <div className="relative border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 rounded-lg p-4 text-center transition-colors">
//               <Input
//               required
//               accept="image/png, image/jpeg, image/webp, application/pdf, .doc, .docx"
//                 type="file"
//                 name="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <div className="flex flex-col items-center gap-1">
//                 <FiUpload className="w-5 h-5 text-zinc-400" />
//                 <span className="text-xs text-zinc-300 font-mono">
//                   {selectedFile
//                     ? selectedFile.name
//                     : "Clicca o trascina qui un file"}
//                 </span>
//                 <span className="text-[10px] text-zinc-500">
//                   {selectedFile
//                     ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
//                     : "PNG, JPG, PDF fino a 3 MB"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* 4. Note / Descrizione */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-mono text-zinc-300">
//               Note / Descrizione
//             </label>
//             <textarea
//             required
//               name="notes"
//               defaultValue={formEvidence.data?.notes || ""}
//               placeholder="Aggiungi una breve descrizione o dettagli rilevanti..."
//               rows={3}
//               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 resize-none"
//             />
//           </div>

//           {/* Errore */}
//           {!isPending && formEvidence.errors ? (
//             <ErrorsBox formData={formEvidence} isPending={isPending} />
//           ) : null}

//           <DialogFooter className="gap-2 sm:gap-0 pt-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setOpen(false)}
//               disabled={isPending}
//               className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-mono"
//             >
//               Annulla
//             </Button>
//             <Button
//               type="submit"
//               disabled={isPending || safeDossiers[0].code === ""}
//               className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs font-mono flex items-center gap-1.5 disabled:opacity-50"
//             >
//               {isPending ? (
//                 <>
//                   <FiLoader className="w-3.5 h-3.5 animate-spin" />
//                   Invio in corso...
//                 </>
//               ) : (
//                 "Invia Prova"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useActionState, useEffect } from "react";
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
} from "react-icons/fi";
import { DossierStats } from "@/app/(auth)/profile/page";
import { createEvidenceAction } from "@/action/action";
import ErrorsBox from "./errorsBox";

interface AddEvidenceDialogProps {
  dossiers?: DossierStats[];
  onSuccess?: () => void;
}

export type FormActionState = {
  errors?: Record<string, string[]> | null;
  message?: string;
  data?: {
    dossierId?: string;
    type?: string;
    notes?: string;
    fileName?: string | undefined;
  };
  success: boolean;
};

const initialEvidenceState: FormActionState = {
  errors: null,
  message: "",
  data: {
    dossierId: "",
    type: "PHOTO",
    notes: "",
    fileName: "",
  },
  success: false,
};

export default function AddEvidenceDialog({
  dossiers = [],
  onSuccess,
}: AddEvidenceDialogProps) {
  const [formEvidence, formAction, isPending] = useActionState(
    createEvidenceAction,
    initialEvidenceState,
  );

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Lista sicura dei dossier
  const safeDossiers =
    dossiers.length > 0
      ? dossiers
      : [{ code: "", title: "Nessun dossier disponibile" }];
  const activeDossierId =
    formEvidence.data?.dossierId || safeDossiers[0]?.code || "";

if (formEvidence.success) {
      setOpen(false);
      setSelectedFile(null);
      if (onSuccess) onSuccess();
    }

  const isOpen = open && !formEvidence.success;

  return (
    <Dialog
    open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-400 flex items-center gap-1.5 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Aggiungi Prova</span>
        </button>
      </DialogTrigger>

      {/* 🟢 Ampliato il Dialog su Desktop con sm:max-w-[650px] */}
      <DialogContent className="bg-zinc-950 border border-zinc-800 text-zinc-100 sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-zinc-100 flex items-center gap-2 text-base font-semibold">
            <FiFileText className="w-4 h-4 text-amber-500" />
            Invia Nuova Prova
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Seleziona il caso/dossier e carica un file da allegare.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          {/* 🟢 Grid a 2 colonne su Desktop (md:grid-cols-2), 1 colonna su Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Select Dossier / Caso */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                <FiFolder className="w-3.5 h-3.5 text-amber-500" />
                Seleziona Dossier / Caso
              </label>
              <select
                name="dossierId"
                defaultValue={activeDossierId}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              >
                {safeDossiers.map((dossier) => (
                  <option
                    key={dossier.code}
                    value={dossier.code}
                    disabled={!dossier.code}
                  >
                    {dossier.title} {dossier.code ? `(${dossier.code})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Select Tipo di File */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">
                Tipo di File
              </label>
              <select
                name="type"
                defaultValue={formEvidence.data?.type || "PHOTO"}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              >
                <option value="PHOTO">Foto / Immagine</option>
                <option value="DOCUMENT">Documento (PDF, DOCX)</option>
              </select>
            </div>

            {/* 3. Input Nome File Personalizzato */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-zinc-300">
                Nome Prova / Titolo
              </label>
              <Input
                required
                defaultValue={formEvidence.data?.fileName}
                type="text"
                name="fileName"
                placeholder="Inserisci un nome per identificare la prova..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* 4. Input File Dropzone */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-zinc-300">
                File Allegato
              </label>
              <div className="relative border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 rounded-lg p-4 text-center transition-colors">
                <Input
                  required
                  accept="image/png, image/jpeg, image/webp, application/pdf, .doc, .docx"
                  type="file"
                  name="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedFile(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-1">
                  <FiUpload className="w-5 h-5 text-zinc-400" />
                  <span className="text-xs text-zinc-300 font-mono">
                    {selectedFile
                      ? selectedFile.name
                      : "Clicca o trascina qui un file"}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "PNG, JPG, PDF fino a 10 MB"}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Note / Descrizione */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono text-zinc-300">
                Note / Descrizione
              </label>
              <textarea
                required
                name="notes"
                defaultValue={formEvidence.data?.notes || ""}
                placeholder="Aggiungi una breve descrizione o dettagli rilevanti..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>
          </div>

          {/* Messaggi / Box Errori */}
          {!isPending && formEvidence.errors ? (
            <ErrorsBox formData={formEvidence} isPending={isPending} />
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-mono"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={isPending || safeDossiers[0].code === ""}
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs font-mono flex items-center gap-1.5 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                "Invia Prova"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}