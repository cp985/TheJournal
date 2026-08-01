import Link from "next/link";
import Image from "next/image";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center ">
      <Image
        fill
        src="/assets/bg-login.webp"
        alt="404"
        className="absolute -z-10 blur-[5px] opacity-70"
      />
      {/* Icona in evidenza con bordo zinc e accento ambrato */}

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 text-amber-500">
        <FileQuestion className="h-8 w-8" strokeWidth={1.5} />
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
        Errore 404 | Not Found
      </span>

      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Pagina non trovata | Page not found
      </h2>

      <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-300">
        La pagina che stai cercando non esiste, è stata rimossa oppure
        l&apos;indirizzo digitato non è corretto.
      </p>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-300">
        The page you are looking for does not exist, has been removed or the
        address you entered is incorrect.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 sm:w-auto"
        >
          <Home className="h-4 w-4" />
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
