


import { Handle, Position } from "@xyflow/react";
import { FileText } from "lucide-react";
import { useLanguage } from "@/context/maincontext"; 

export const DocumentNode = ({ data }: { data: any }) => {
  const { lang } = useLanguage();

  const title = (lang === "EN" && (data.title_en || data.fileName_en))
    ? (data.title_en || data.fileName_en)
    : (data.title || data.fileName);

  const notes = (lang === "EN" && (data.notes_en || data.description_en))
    ? (data.notes_en || data.description_en)
    : (data.notes || data.description);

  const label = (lang === "EN" && data.label_en)
    ? data.label_en
    : (data.label || (lang === "EN" ? "PAPER RECORD" : "VERBALE CARTACEO"));

  return (
    <div className="group relative w-60 rotate-[-1deg] rounded-xs border border-amber-900/20 bg-[#faf6ea] p-3.5 text-zinc-900 shadow-[8px_12px_20px_rgba(0,0,0,0.7)] transition-all hover:z-30 hover:rotate-0 hover:scale-105">
      <div className="absolute -top-3 left-6 h-7 w-2 rounded-full border-2 border-zinc-400 bg-zinc-300 shadow-sm" />

      <Handle type="target" position={Position.Top} className="!bg-red-800" />
      <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

      <div className="pt-1">
        <div className="flex items-center justify-between border-b border-zinc-300 pb-1.5">
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-900">
            <FileText className="h-3.5 w-3.5 text-amber-800" />
            <span>{label}</span>
          </div>
        </div>

        <h4 className="mt-2 font-serif text-xs font-bold leading-snug text-zinc-900">
          {title}
        </h4>

        {/* Note / Contenuto dell'evidenza */}
        {notes && (
          <div className="mt-2 border-l-2 border-amber-700/50 pl-2 font-mono text-[10px] leading-relaxed text-zinc-700">
            {notes}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2 font-mono text-[9px] text-zinc-500">
          <span className="rotate-[-1deg] rounded border border-red-800/50 px-1 py-0.5 text-[8px] font-bold text-red-800">
            {lang === "EN" ? "CLASSIFIED RECORD" : "ATTO RISERVATO"}
          </span>
          <span>{lang === "EN" ? "Click for details" : "Clicca per dettagli"}</span>
        </div>
      </div>
    </div>
  );
};