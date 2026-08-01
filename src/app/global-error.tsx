"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function GlobalError({
   
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


    //  const {t} = useLanguage();
  useEffect(() => {
    console.error("Errore critico globale:", error);
  }, [error]);

  return (
    <html lang="it" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased relative">
              <Image
                fill
                src="/assets/bg-login.webp"
                alt="404"
                className="absolute -z-10 blur-[5px] opacity-70"
              />
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-900/30 bg-red-950/20 text-red-500 mb-8">
            <AlertOctagon className="h-10 w-10" strokeWidth={1.5} />
          </div>
          
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
            Errore Critico | Critical Error
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300">
            L&apos;applicazione ha riscontrato un problema irreversibile a livello strutturale. 
            Per favore ricarica la pagina per tentare un ripristino.
          </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300">
          The application has encountered an irreparable structural problem. 
          Please reload the page to attempt a recovery.
          
          </p>

          <div className="mt-10">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-8 py-3.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              <RefreshCcw className="h-4 w-4" />
              Ricarica l&apos;applicazione
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}