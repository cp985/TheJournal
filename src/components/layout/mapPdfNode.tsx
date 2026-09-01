import { Handle, Position } from "@xyflow/react";
import {  FileCode2,NotebookPen } from "lucide-react";

export const PdfNode = ({ data }: { data: any }) => (
  <div className="group relative w-60 rotate-[1deg] rounded-md border border-zinc-700/80 bg-zinc-900 p-3.5 text-zinc-100 shadow-[10px_14px_24px_rgba(0,0,0,0.8)] transition-all hover:z-30 hover:rotate-0 hover:scale-105 hover:border-red-500/80">
    <Handle type="target" position={Position.Top} className="!bg-red-800" />
    <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-wider text-red-400">
        <FileCode2 className="h-4 w-4" />
        <span>REPERTO PDF</span>
      </div>
      <span className="rounded bg-red-950 px-1.5 py-0.5 font-mono text-[8px] font-bold text-red-400 border border-red-800/40">
        DOCUMENTO
      </span>
    </div>

    <div className="mt-2">
      <h4 className="font-serif text-xs font-bold leading-snug text-zinc-100">
        {data.title}
      </h4>

      {/* Sezione Note per il PDF */}
      {data.notes && (
        <div className="mt-2 flex items-start gap-1.5 rounded border border-zinc-800 bg-zinc-950/60 p-2 font-mono text-[10px] text-zinc-300">
          <NotebookPen className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
          <p className="line-clamp-3 leading-relaxed">{data.notes}</p>
        </div>
      )}
    </div>

    <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2 font-mono text-[9px] text-zinc-500">
      <span>File allegato</span>
      <span className="text-red-400 group-hover:underline">Apri anteprima</span>
    </div>
  </div>
);

