import { Handle, Position } from "@xyflow/react";
import { FileText, ExternalLink } from "lucide-react";


// export const DocumentNode = ({ data }: { data: any }) => (
//   <div
//     onClick={() => {
//       if (data.fileUrl) window.open(data.fileUrl, "_blank");
//     }}
//     className={`group relative w-60 rotate-[-1deg] rounded-xs border border-amber-900/20 bg-[#faf6ea] p-4 text-zinc-900 shadow-[8px_12px_20px_rgba(0,0,0,0.7)] transition-all hover:z-30 hover:rotate-0 hover:scale-105 hover:shadow-2xl ${
//       data.fileUrl ? "cursor-pointer" : ""
//     }`}
//   >
//     {/* Graffetta Metallica */}
//     <div className="absolute -top-3 left-6 h-7 w-2 rounded-full border-2 border-zinc-400 bg-zinc-300 shadow-sm" />

//     <Handle type="target" position={Position.Top} className="!bg-red-800" />
//     <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

//     <div className="pt-1">
//       <div className="flex items-center justify-between border-b border-zinc-300 pb-1.5">
//         <div className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-900">
//           <FileText className="h-3.5 w-3.5 text-amber-800" />
//           <span>{data.label || "VERBALE CARTACEO"}</span>
//         </div>
//         <span className="font-mono text-[8px] font-bold text-zinc-400">DOC</span>
//       </div>

//       <h4 className="mt-2 font-serif text-sm font-bold leading-snug text-zinc-900">
//         {data.title}
//       </h4>

//       {data.description && (
//         <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-zinc-700 whitespace-pre-line">
//           {data.description}
//         </p>
//       )}

//       <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2">
//         <span className="rotate-[-2deg] rounded border border-red-800/50 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-red-800">
//           ATTO RISERVATO
//         </span>
//         {data.fileUrl && (
//           <span className="flex items-center gap-1 font-mono text-[9px] font-semibold text-amber-900 group-hover:underline">
//             Apri <ExternalLink className="h-2.5 w-2.5" />
//           </span>
//         )}
//       </div>
//     </div>
//   </div>
// );

export const DocumentNode = ({ data }: { data: any }) => (
  <div className="group relative w-60 rotate-[-1deg] rounded-xs border border-amber-900/20 bg-[#faf6ea] p-3.5 text-zinc-900 shadow-[8px_12px_20px_rgba(0,0,0,0.7)] transition-all hover:z-30 hover:rotate-0 hover:scale-105">
    <div className="absolute -top-3 left-6 h-7 w-2 rounded-full border-2 border-zinc-400 bg-zinc-300 shadow-sm" />

    <Handle type="target" position={Position.Top} className="!bg-red-800" />
    <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

    <div className="pt-1">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-1.5">
        <div className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-900">
          <FileText className="h-3.5 w-3.5 text-amber-800" />
          <span>{data.label || "VERBALE CARTACEO"}</span>
        </div>
      </div>

      <h4 className="mt-2 font-serif text-xs font-bold leading-snug text-zinc-900">
        {data.title}
      </h4>

      {/* Note / Contenuto dell'evidenza */}
      {data.notes && (
        <div className="mt-2 border-l-2 border-amber-700/50 pl-2 font-mono text-[10px] leading-relaxed text-zinc-700">
          {data.notes}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2 font-mono text-[9px] text-zinc-500">
        <span className="rotate-[-1deg] rounded border border-red-800/50 px-1 py-0.5 text-[8px] font-bold text-red-800">
          ATTO RISERVATO
        </span>
        <span>Clicca per dettagli</span>
      </div>
    </div>
  </div>
);
