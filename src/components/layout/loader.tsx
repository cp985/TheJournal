import { Cog, ShieldAlert } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-zinc-950 text-foreground select-none">
      
      <div className="relative flex items-center justify-center h-32 w-32">
        
        <Cog className="absolute h-28 w-28 text-amber-500/30 animate-[spin_8s_linear_infinite]" />

        <Cog className="absolute h-16 w-16 text-amber-500/60 animate-[spin_4s_linear_infinite_reverse]" />

        <ShieldAlert className="absolute h-7 w-7 text-amber-500 animate-pulse" />

        <div className="absolute h-32 w-32 rounded-full border border-amber-500/10 animate-ping" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold tracking-widest text-amber-500/90 uppercase">
          Loading...
        </span>

        <div className="h-1 w-36 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-full origin-left-right bg-amber-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

    </div>
  );
}