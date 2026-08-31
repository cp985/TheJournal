


"use client";

import { useState } from "react";
import {  Trash2,Folder, FileText, Image as ImageIcon, Download, ArrowLeft, ExternalLink, FileCheck } from "lucide-react";
import type { DbEvidence } from "@/lib/type"; 
import Image from "next/image";
import { useLanguage } from "@/context/maincontext"; // Modifica il path se diverso

export type FolderItem = {
  id: string;
  itemKind: "folder";
  name: string;
  children: ExplorerItem[];
};

export type ExplorerItem = FolderItem | DbEvidence;

interface FileExplorerProps {
  caseId: string;
  files: ExplorerItem[];
  onDownloadCase: () => void;
  isCaseSaved: boolean;
}

export function CaseFileExplorer({ caseId, files, onDownloadCase, isCaseSaved }: FileExplorerProps) {
  const { t, lang } = useLanguage();

  const [currentFolder, setCurrentFolder] = useState<ExplorerItem[]>(files);
  const [folderHistory, setFolderHistory] = useState<ExplorerItem[][]>([]);
  const [selectedFile, setSelectedFile] = useState<DbEvidence | null>(null);

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

  const getFileName = (evidence: DbEvidence) => {
    if (!evidence.fileUrl) return `${t.casesPage.fileExplorer.evidencePrefix}${evidence.id.slice(0, 8)}`;
    const urlParts = evidence.fileUrl.split("/");
    const fullName = urlParts[urlParts.length - 1] || "";
    return decodeURIComponent(fullName.split("?")[0]) || evidence.id;
  };

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
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Errore durante il download del file:", error);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm text-zinc-300 shadow-2xl">
      {/* Topbar Terminale */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="h-3 w-3 shrink-0 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500/80" />
          
          {folderHistory.length > 0 && (
            <button
              onClick={handleBackClick}
              className="ml-2 flex shrink-0 items-center gap-1 font-sans text-xs text-amber-500 hover:text-amber-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t.casesPage.fileExplorer.back}
            </button>
          )}

          <span className="ml-2 truncate font-sans text-xs font-medium text-zinc-400">
            system_root://cases/{caseId}/dossier
          </span>
        </div>

        {/* Nascosto su schermi piccoli (hidden) e visibile da tablet/desktop in poi (sm:inline-block) */}
        <span className="hidden shrink-0 rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-500 sm:inline-block">
          {t.casesPage.fileExplorer.confidential}
        </span>
      </div>

      {/* Griglia principale */}
      <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-12">
        
        {/* Colonna Sinistra: Lista Reperti/Cartelle */}
        <div className="max-h-[420px] space-y-1 overflow-y-auto border-r border-zinc-800 bg-zinc-900/20 p-3 md:col-span-6">
          {currentFolder.map((item) => {
            if (isFolder(item)) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleFolderClick(item)}
                  className="flex w-full items-center justify-between rounded-lg p-2 text-left text-zinc-300 transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </button>
              );
            }

            const evidence = item;
            const fileName = getFileName(evidence);
            const isImg = isImage(evidence);
            const isPdfFile = isPdf(evidence);

            return (
              <button
                key={evidence.id}
                onClick={() => setSelectedFile(evidence)}
                className={`flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors ${
                  selectedFile?.id === evidence.id
                    ? "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                    : "text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {isImg && <ImageIcon className="h-4 w-4 shrink-0 text-blue-400" />}
                  {isPdfFile && <FileCheck className="h-4 w-4 shrink-0 text-red-400" />}
                  {!isImg && !isPdfFile && <FileText className="h-4 w-4 shrink-0 text-zinc-400" />}
                  <span className="truncate">{fileName}</span>
                </div>
                <span className="ml-2 shrink-0 text-[10px] uppercase text-zinc-500">
                  {String(evidence.type)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cella Anteprima a Destra */}
        <div className="flex max-h-[420px] flex-col justify-between bg-zinc-950 p-4 md:col-span-6">
          {selectedFile ? (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {t.casesPage.fileExplorer.previewTitle}
                </span>
                
                <div className="flex items-center gap-3">
                  <a
                    href={selectedFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-medium text-xs text-amber-500 transition-colors hover:text-amber-400"
                    title={t.casesPage.fileExplorer.open}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{t.casesPage.fileExplorer.open}</span>
                  </a>

                  <button
                    onClick={() => handleDownload(selectedFile.fileUrl, getFileName(selectedFile))}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{t.casesPage.fileExplorer.download}</span>
                  </button>
                </div>
              </div>
              
              <h4 className="mb-3 truncate text-sm font-semibold text-zinc-100">
                {getFileName(selectedFile)}
              </h4>
              
              <div className="flex-1 overflow-y-auto pr-1">
                {/* 1. Anteprima Immagine */}
                {isImage(selectedFile) && (
                  <div className="flex flex-col gap-2">
                    {selectedFile.fileUrl ? (
                      <div className="relative aspect-video flex w-full items-center justify-center overflow-hidden rounded border border-zinc-800 bg-black/60 p-1">
                        <Image
                          fill
                          unoptimized
                          src={selectedFile.fileUrl}
                          alt={getFileName(selectedFile)}
                          className="max-h-52 w-auto max-w-full rounded object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-xs text-zinc-500">
                        {t.casesPage.fileExplorer.noUrl}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Anteprima PDF */}
                {isPdf(selectedFile) && (
                  <div className="flex h-full min-h-[200px] flex-col gap-2">
                    {selectedFile.fileUrl ? (
                      <div className="h-52 w-full overflow-hidden rounded border border-zinc-800 bg-zinc-900">
                        <iframe
                          src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedFile.fileUrl)}&embedded=true`}
                          title={getFileName(selectedFile)}
                          className="h-full w-full border-0"
                        />
                      </div>
                    ) : (
                      <div className="rounded border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-500">
                        {t.casesPage.fileExplorer.pdfNoUrl}
                      </div>
                    )}
                  </div>
                )}

                {/* Note/Descrizione Reperto dinamiche in base alla lingua */}
                {(selectedFile.notes || selectedFile.notes_en) && (
                  <div className="mt-3 rounded border border-zinc-800/80 bg-zinc-900/60 p-2.5 font-sans text-xs leading-relaxed text-zinc-400">
                    <p className="mb-1 font-mono text-[10px] uppercase text-zinc-500">
                      {t.casesPage.fileExplorer.fileNotesHeader}
                    </p>
                    {lang.toLowerCase() === "en" ? (selectedFile.notes_en || selectedFile.notes) : selectedFile.notes}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-4 text-center font-sans text-zinc-600">
              <Folder className="mb-2 h-8 w-8 text-amber-500 opacity-40" />
              <p className="text-xs">{t.casesPage.fileExplorer.emptySelection}</p>
            </div>
          )}

          {/* Bottone Azione */}
          <div className="mt-4 shrink-0 border-t border-zinc-800 pt-3">
            <button
              onClick={onDownloadCase}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 py-2.5 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/20"
            >
              <Download className="h-3.5 w-3.5" />
            {isCaseSaved ? <Trash2 className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
  {isCaseSaved ? t.casesPage.fileExplorer.removeFromMap : t.casesPage.fileExplorer.loadToMap}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}