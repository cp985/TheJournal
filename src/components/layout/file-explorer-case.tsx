"use client";

import { useState } from "react";
import { Folder, FileText, FileCode, Image as ImageIcon, Download, ArrowLeft } from "lucide-react";

export type FileItem = {
  id: string;
  name: string;
  type: "text" | "pdf" | "folder" | "image";
  size?: string;
  content?: string; // Per i file .txt o note rapide
  url?: string;     // Per immagini o PDF
  children?: FileItem[]; // Se è una sottocartella (folder)
};

interface FileExplorerProps {
  caseId: string;
  files: FileItem[];
  onDownloadCase: () => void;
}

export function CaseFileExplorer({ caseId, files, onDownloadCase }: FileExplorerProps) {
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>(files);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm text-zinc-300 shadow-2xl overflow-hidden">
      {/* Bar superiore della finestra Stile OS/Terminale */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-zinc-400 font-sans font-medium">
            system_root://cases/{caseId}/dossier
          </span>
        </div>
        <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          CONFIDENTIAL
        </span>
      </div>

      {/* Griglia principale: Lista File a Sinistra | Anteprima a Destra */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
        
        {/* Lista File (Colonna 7/12) */}
        <div className="md:col-span-7 border-r border-zinc-800 p-3 space-y-1 bg-zinc-900/20">
          {currentFolder.map((file) => (
            <button
              key={file.id}
              onClick={() => {
                if (file.type === "folder" && file.children) {
                  setCurrentFolder(file.children);
                } else {
                  setSelectedFile(file);
                }
              }}
              className={`flex w-full items-center justify-between p-2 rounded-lg transition-colors text-left ${
                selectedFile?.id === file.id
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : "hover:bg-zinc-800/50 text-zinc-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {file.type === "folder" && <Folder className="h-4 w-4 text-amber-500" />}
                {file.type === "text" && <FileText className="h-4 w-4 text-zinc-400" />}
                {file.type === "image" && <ImageIcon className="h-4 w-4 text-blue-400" />}
                <span className="truncate">{file.name}</span>
              </div>
              {file.size && <span className="text-xs text-zinc-500">{file.size}</span>}
            </button>
          ))}
        </div>

        {/* Cella Anteprima File Cliccato (Colonna 5/12) */}
        <div className="md:col-span-5 p-4 bg-zinc-950 flex flex-col justify-between">
          {selectedFile ? (
            <div>
              <div className="text-xs text-zinc-500 mb-1 font-sans">ANTEPRIMA FILE:</div>
              <h4 className="font-semibold text-zinc-100 mb-3">{selectedFile.name}</h4>
              
              {selectedFile.type === "text" && (
                <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-line max-h-[180px] overflow-y-auto">
                  {selectedFile.content}
                </div>
              )}

              {selectedFile.type === "image" && (
                <div className="aspect-video bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                  [Immagine: {selectedFile.name}]
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-zinc-600 font-sans p-4">
              <FileCode className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-xs">Seleziona un file per visualizzarne il contenuto</p>
            </div>
          )}

          {/* Bottone Finale per 'Inviare' il caso alla Mappa */}
          <div className="mt-4 pt-3 border-t border-zinc-800">
            <button
              onClick={onDownloadCase}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20 py-2.5 text-xs font-semibold transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              CARICA DOSSIER IN MAPPA
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}