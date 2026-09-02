

import { Handle, Position } from "@xyflow/react";
import { Pin } from "lucide-react";
import { useLanguage } from "@/context/maincontext"; 

export const PostItNode = ({ data }: { data: any }) => {
  const { lang, t } = useLanguage();

  const title = (lang === "EN" && data.title_en) ? data.title_en : data.title;
  const description = (lang === "EN" && data.description_en) ? data.description_en : data.description;

  const formattedLabel = data.rawDate
    ? new Date(data.rawDate).toLocaleDateString(lang === "EN" ? "en-US" : "it-IT")
    : data.label || (lang === "EN" ? `EVENT #${data.index || 1}` : `EVENTO #${data.index || 1}`);

  return (
    <div className="group relative w-48 rotate-[-1.5deg] rounded-xs bg-[#fef08a] p-3 text-zinc-900 shadow-[8px_12px_18px_rgba(0,0,0,0.65)] transition-all hover:z-30 hover:rotate-0 hover:scale-105">
      <div className="absolute -top-2 left-1/2 h-3.5 w-14 -translate-x-1/2 border border-white/20 bg-white/40 shadow-xs backdrop-blur-[1px]" />
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-red-700 drop-shadow-md">
        <Pin className="h-5 w-5 fill-red-700" />
      </div>

      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !bg-red-800" />

      <div className="pt-1.5">
        <span className="block border-b border-yellow-300/80 font-mono text-[9px] font-bold uppercase tracking-widest text-yellow-900/80">
          {formattedLabel}
        </span>
        <h4 className="mt-1 font-serif text-sm font-bold leading-tight text-zinc-900">
          {title || t?.map?.boardComponent.defaultEventLabel}
        </h4>
        {description && (
          <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-zinc-800">
            {description}
          </p>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !bg-red-800" />
      <Handle id="top" type="source" position={Position.Top} className="!h-2.5 !w-2.5 !bg-red-800" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !bg-red-800" />
    </div>
  );
};