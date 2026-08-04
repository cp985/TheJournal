

"use client";

import { useState } from "react";
import { Folder, FileText, Image as ImageIcon, Download, ArrowLeft, ExternalLink, FileCheck } from "lucide-react";
import type { DbEvidence } from "@/lib/type"; 
import  Image from "next/image";

// 1. Tipo per le cartelle custom
export type FolderItem = {
  id: string;
  itemKind: "folder";
  name: string;
  children: ExplorerItem[];
};

// 2. Union Discriminta: un elemento è o una Cartella o una DbEvidence (File)
export type ExplorerItem = FolderItem | DbEvidence;

interface FileExplorerProps {
  caseId: string;
  files: ExplorerItem[];
  onDownloadCase: () => void;
}

export function CaseFileExplorer({ caseId, files, onDownloadCase }: FileExplorerProps) {
  const [currentFolder, setCurrentFolder] = useState<ExplorerItem[]>(files);
  const [folderHistory, setFolderHistory] = useState<ExplorerItem[][]>([]);
  const [selectedFile, setSelectedFile] = useState<DbEvidence | null>(null);

  // Type Guard per consentire a TypeScript di restringere il tipo in sicurezza
  const isFolder = (item: ExplorerItem): item is FolderItem => {
    return "itemKind" in item && item.itemKind === "folder";
  };

  const handleFolderClick = (folder: FolderItem) => {
    setFolderHistory((prev) => [...prev, currentFolder]);
    setCurrentFolder(folder.children);
    setSelectedFile(null);
  };

  const handleBackClick = () => {
    if (folderHistory.length > 0) {
      const previousFolder = folderHistory[folderHistory.length - 1];
      setFolderHistory((prev) => prev.slice(0, -1));
      setCurrentFolder(previousFolder);
      setSelectedFile(null);
    }
  };

  // Helper per ricavare il nome da visualizzare dal fileUrl o dall'id
  const getFileName = (evidence: DbEvidence) => {
    if (!evidence.fileUrl) return `Reperto #${evidence.id.slice(0, 8)}`;
    const urlParts = evidence.fileUrl.split("/");
    const fullName = urlParts[urlParts.length - 1] || "";
    return decodeURIComponent(fullName.split("?")[0]) || evidence.id;
  };

  // Helper per rilevare se la risorsa è un PDF o un'Immagine
  const isImage = (item: DbEvidence) => {
    const typeStr = String(item.type).toLowerCase();
    const urlStr = (item.fileUrl || "").toLowerCase();
    return typeStr.includes("photo") || typeStr.includes("image") || /\.(jpg|jpeg|png|webp|gif|svg)/.test(urlStr);
  };

  const isPdf = (item: DbEvidence) => {
    const typeStr = String(item.type).toLowerCase();
    const urlStr = (item.fileUrl || "").toLowerCase();
    return typeStr.includes("pdf") || typeStr.includes("document") || urlStr.endsWith(".pdf");
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Errore durante il download del file:", error);
  }
};

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm text-zinc-300 shadow-2xl overflow-hidden">
      {/* Topbar Terminale */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          
          {folderHistory.length > 0 && (
            <button
              onClick={handleBackClick}
              className="ml-2 flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 font-sans"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Indietro
            </button>
          )}

          <span className="ml-2 text-xs text-zinc-400 font-sans font-medium truncate">
            system_root://cases/{caseId}/dossier
          </span>
        </div>
        <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
          CONFIDENTIAL
        </span>
      </div>

      {/* Griglia principale */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
        
        {/* Colonne Sinistra: Lista Reperti/Cartelle */}
        <div className="md:col-span-6 border-r border-zinc-800 p-3 space-y-1 bg-zinc-900/20 max-h-[420px] overflow-y-auto">
          {currentFolder.map((item) => {
            // Render per le Cartelle
            if (isFolder(item)) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleFolderClick(item)}
                  className="flex w-full items-center justify-between p-2 rounded-lg transition-colors text-left hover:bg-zinc-800/50 text-zinc-300"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </button>
              );
            }

            // Render per i File Reali (DbEvidence)
            const evidence = item;
            const fileName = getFileName(evidence);
            const isImg = isImage(evidence);
            const isPdfFile = isPdf(evidence);

            return (
              <button
                key={evidence.id}
                onClick={() => setSelectedFile(evidence)}
                className={`flex w-full items-center justify-between p-2 rounded-lg transition-colors text-left ${
                  selectedFile?.id === evidence.id
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    : "hover:bg-zinc-800/50 text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {isImg && <ImageIcon className="h-4 w-4 shrink-0 text-blue-400" />}
                  {isPdfFile && <FileCheck className="h-4 w-4 shrink-0 text-red-400" />}
                  {!isImg && !isPdfFile && <FileText className="h-4 w-4 shrink-0 text-zinc-400" />}
                  <span className="truncate">{fileName}</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase ml-2 shrink-0">
                  {String(evidence.type)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cella Anteprima a Destra */}
        <div className="md:col-span-6 p-4 bg-zinc-950 flex flex-col justify-between max-h-[420px]">
          {selectedFile ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase text-zinc-500 font-sans tracking-wider">
                  TIPO REPERTO: {String(selectedFile.type)}
                </span>
                {selectedFile.fileUrl && (
                  <a
                    href={selectedFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-sans"
                  >
                    Apri Originale <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div> */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
  <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
    Anteprima File
  </span>
  
  <div className="flex items-center gap-3">
    {/* 1. Apri in una nuova scheda */}
    <a
      href={selectedFile.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors font-medium"
      title="Apri file a schermo intero"
    >
      <ExternalLink className="h-3.5 w-3.5" />
      <span>Apri</span>
    </a>

    {/* 2. Download Diretto */}
 
 <button
  onClick={() => handleDownload(selectedFile.fileUrl, getFileName(selectedFile))}
  className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5"
>
  <Download className="h-3.5 w-3.5" />
  <span>Scarica</span>
</button>
  </div>
</div>
              
              <h4 className="font-semibold text-zinc-100 text-sm mb-3 truncate">
                {getFileName(selectedFile)}
              </h4>
              
              <div className="flex-1 overflow-y-auto pr-1">
                {/* 1. Anteprima Immagine con <img> puro per evitare conflitti con Next Image loader */}
                {isImage(selectedFile) && (
                  <div className="flex flex-col gap-2">
                    {selectedFile.fileUrl ? (
                      <div className="relative aspect-video w-full rounded border border-zinc-800 overflow-hidden bg-black/60 flex items-center justify-center p-1">
                        <Image
                        fill
                        unoptimized
                          src={selectedFile.fileUrl}
                          alt={getFileName(selectedFile)}
                          className="max-h-52 w-auto max-w-full object-contain rounded"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                        Nessun URL fornito
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Anteprima PDF con Google Viewer iframe */}
                {isPdf(selectedFile) && (
                  <div className="flex flex-col gap-2 h-full min-h-[200px]">
                    {selectedFile.fileUrl ? (
                      <div className="w-full h-52 rounded border border-zinc-800 overflow-hidden bg-zinc-900">
                        <iframe
                          src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedFile.fileUrl)}&embedded=true`}
                          title={getFileName(selectedFile)}
                          className="w-full h-full border-0"
                        />
                      </div>
                    ) : (
                      <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
                        URL PDF non disponibile
                      </div>
                    )}
                  </div>
                )}

                {/* Note/Descrizione Reperto */}
                {(selectedFile.notes || selectedFile.notes_en) && (
                  <div className="mt-3 p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 font-sans leading-relaxed">
                    <p className="text-[10px] uppercase text-zinc-500 font-mono mb-1">Note del fascicolo:</p>
                    {selectedFile.notes || selectedFile.notes_en}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-zinc-600 font-sans p-4">
              <Folder className="h-8 w-8 mb-2 opacity-40 text-amber-500" />
              <p className="text-xs">Seleziona un reperto dalla lista per visualizzarne l&apos;anteprima</p>
            </div>
          )}

          {/* Bottone Azione */}
          <div className="mt-4 pt-3 border-t border-zinc-800 shrink-0">
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