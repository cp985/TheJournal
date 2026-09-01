import { Handle, Position } from "@xyflow/react";
import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/maincontext"; // Modifica con il percorso reale del tuo hook
import {formatDate} from "@/lib/utils"
export const FolderNode = ({ data }: { data: any }) => {
  const { lang, t } = useLanguage();

  const title = (lang === "EN" && data.title_en) ? data.title_en : data.title;
  const description = (lang === "EN" && data.description_en) ? data.description_en : data.description;

  return (
    <div className="relative w-72 rounded-r-md border-l-4 border-amber-800 bg-[#3a2618] p-4 text-amber-100 shadow-[14px_18px_30px_rgba(0,0,0,0.85)] transition-transform hover:z-30 hover:scale-105">
      {/* Etichetta fissa in alto */}
      <div className="absolute -top-4 left-0 flex h-5 items-center rounded-t-md border-t border-r border-amber-700 bg-amber-900 px-3 font-mono text-[9px] font-bold uppercase tracking-widest text-amber-200">
        {t?.map?.boardComponent.folderNode.officialFile || (lang === "EN" ? "OFFICIAL FILE" : "FASCICOLO UFFICIALE")}
      </div>

      <div className="pt-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400/90">
            {data.code || "DOSSIER #000"}
          </span>
          <ShieldAlert className="h-4 w-4 text-red-500" />
        </div>

        {/* Titolo reattivo */}
        <h3 className="mt-1 font-serif text-md font-extrabold leading-snug text-amber-50">
          {title || t?.map?.boardComponent.folderNode.defaultTitle}
        </h3>

        {data.coverUrl && (
          <div className="mt-3 h-36 w-full overflow-hidden rounded border border-amber-900/60 bg-black">
            <img
              src={data.coverUrl}
              alt={title}
              className="h-full w-full object-cover opacity-85 contrast-125 grayscale transition-all hover:grayscale-0"
            />
          </div>
        )}

        {/* Descrizione reattiva */}
        {description && (
          <p className="mt-2.5 font-mono text-xs leading-relaxed text-amber-200/80 line-clamp-3">
            {description}
          </p>
        )}

        {/* Footer con Stato e Data */}
        <div className="mt-3 flex items-center justify-between border-t border-amber-800/60 pt-2 font-mono text-[10px] text-amber-400/70">
          <span>
            {t?.map?.boardComponent.folderNode.statusLabel || (lang === "EN" ? "STATUS:" : "STATO:")} {data.status || (lang === "EN" ? "IN PROGRESS" : "IN CORSO")}
          </span>
          <span>{formatDate(data.date)}</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!h-3.5 !w-3.5 !border-2 !border-red-950 !bg-red-700"
      />
    </div>
  );
};