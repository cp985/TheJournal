import { Pin } from "lucide-react";


export const InstructionNode = ({ data }: { data: any }) => (
  <div className="relative w-48 rotate-[-2deg] rounded-xs bg-[#fef08a] p-3 text-zinc-900 shadow-[8px_12px_18px_rgba(0,0,0,0.65)] transition-transform hover:z-30 hover:scale-105">
    <div className="absolute -top-2 left-1/2 h-3.5 w-14 -translate-x-1/2 border border-white/20 bg-white/40 shadow-xs backdrop-blur-[1px]" />
    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-red-700 drop-shadow-md">
      <Pin className="h-5 w-5 fill-red-700" />
    </div>

    <div className="pt-1.5">
      <span className="block border-b border-yellow-300/80 font-mono text-[9px] font-bold uppercase tracking-widest text-yellow-900/80">
        {data.label || "ISTRUZIONI"}
      </span>
      <h4 className="mt-1 font-serif text-sm font-bold leading-tight text-zinc-900">
        {data.title}
      </h4>
      <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-zinc-800">
        {data.description}
      </p>
    </div>
  </div>
);

