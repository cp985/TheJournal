
import { Handle, Position } from "@xyflow/react";
import { ImageIcon, FileText } from "lucide-react";


// export const PolaroidNode = ({ data }: { data: any }) => (


//   <div className="relative w-48 rotate-[2deg] rounded-xs bg-zinc-100 p-2.5 pb-4 shadow-[10px_14px_20px_rgba(0,0,0,0.75)] transition-transform hover:z-30 hover:rotate-0 hover:scale-105">
//     <div className="absolute -top-2.5 left-1/3 h-4 w-14 rotate-[-4deg] border border-amber-300/30 bg-amber-100/50 shadow-xs backdrop-blur-xs" />

//     <Handle type="target" position={Position.Top} className="!bg-red-800" />
//     <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

//     <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-xs border border-zinc-300 bg-zinc-950">
//       {data.imageUrl ? (
//         <img src={data.imageUrl} alt={data.caption} className="h-full w-full object-cover" />
//       ) : (
//         <ImageIcon className="h-8 w-8 text-zinc-700" />
//       )}
//     </div>

//     <p className="mt-2 text-center font-serif text-[11px] font-bold leading-tight text-zinc-800">
//       {data.caption}
//     </p>
//   </div>
// );


export const PolaroidNode = ({ data }: { data: any }) => (
  <div className="relative w-52 rotate-[2deg] rounded-xs bg-zinc-100 p-2.5 pb-3 shadow-[10px_14px_20px_rgba(0,0,0,0.75)] transition-transform hover:z-30 hover:rotate-0 hover:scale-105">
    <div className="absolute -top-2.5 left-1/3 h-4 w-14 rotate-[-4deg] border border-amber-300/30 bg-amber-100/50 shadow-xs backdrop-blur-xs" />

    <Handle type="target" position={Position.Top} className="!bg-red-800" />
    <Handle type="target" id="bottom" position={Position.Bottom} className="!bg-red-800" />

    <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-xs border border-zinc-300 bg-zinc-950">
      {data.imageUrl ? (
        <img src={data.imageUrl} alt={data.caption} className="h-full w-full object-cover" />
      ) : (
        <FileText className="h-8 w-8 text-zinc-700" />
      )}
    </div>

    <p className="mt-2 text-center font-serif text-xs font-bold leading-tight text-zinc-800">
      {data.caption}
    </p>

    {/* Note investigative */}
    {data.notes && (
      <div className="mt-2 rounded bg-amber-50/80 p-1.5 border border-amber-200/60 font-mono text-[9px] text-zinc-700 leading-tight">
        <span className="font-bold text-amber-900 block mb-0.5">Note:</span>
        {data.notes}
      </div>
    )}
  </div>
);