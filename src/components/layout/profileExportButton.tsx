

"use client";

import { useState, useTransition } from "react";
import { userExportData } from "@/action/action";
import { FiDownload, FiLoader } from "react-icons/fi";
import { useLanguage } from "@/context/maincontext";

export default function ExportDataButton() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t: dictionary } = useLanguage();
  const t = dictionary.profile.exportData;

  const handleExport = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const res = await userExportData();

      if (!res || !res.success || !res.data) {
        setErrorMessage(t.error);
        return;
      }

      const blob = new Blob([res.data], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = res.fileName || "my-data-export.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleExport}
        disabled={isPending}
        className="px-3 py-1.5 cursor-pointer rounded-lg border border-zinc-700/60 bg-zinc-800/80 hover:bg-zinc-800 text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <FiLoader className="w-3.5 h-3.5 animate-spin text-amber-500" />
            <span>{t.exporting}</span>
          </>
        ) : (
          <>
            <FiDownload className="w-3.5 h-3.5" />
            <span>{t.button}</span>
          </>
        )}
      </button>

      {errorMessage && (
        <span className="text-[10px] text-rose-400 font-mono">
          {errorMessage}
        </span>
      )}
    </div>
  );
}