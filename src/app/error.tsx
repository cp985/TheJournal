"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"; 

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error("Errore catturato da error.tsx:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <Image
              fill
              src="/assets/bg-login.webp"
              alt="404"
              className="absolute -z-10 blur-[5px] opacity-70"
            />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 text-amber-500 mb-6">
        <AlertTriangle className="h-8 w-8" strokeWidth={1.5} />
      </div>
      
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Qualcosa è andato storto | Error occurred
      </h2>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-300">
        Si è verificato un errore imprevisto durante il caricamento di questa sezione. 
        Abbiamo registrato il problema e ci stiamo lavorando.
      </p>
         <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-300">
     An error occurred while loading this section. We have logged the problem and are working on it.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 sm:w-auto"
        >
          <RefreshCcw className="h-4 w-4" />
          Riprova
        </button>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-amber-900/50 hover:bg-zinc-900/70 hover:text-amber-500 sm:w-auto"
        >
          <Home className="h-4 w-4" />
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}