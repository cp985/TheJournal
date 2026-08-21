"use client";

import { cn } from "@/lib/utils";
import { Film, FolderSearch } from "lucide-react";
import { type DbDossier } from "@/lib/type";
import { useLanguage } from "@/context/maincontext";
import { useRouter, useSearchParams } from "next/navigation";
import {motion,AnimatePresence} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { CaseFileExplorer } from "@/components/layout/file-explorer-case";






function Sprockets({ edge }: { edge: "start" | "end" }) {
  const holes = Array.from({ length: 22 });
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 flex items-center justify-around gap-1 px-3",
        "inset-x-0 h-3",
        edge === "start" ? "top-0" : "bottom-0",
        "lg:inset-x-auto lg:top-0 lg:h-full lg:w-3 lg:flex-col lg:justify-around lg:py-3 lg:px-0",
        edge === "start" ? "lg:left-0" : "lg:right-0",
      )}
    >
      {holes.map((_, idx) => (
        <span
          key={idx}
          className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-zinc-800 ring-1 ring-inset ring-zinc-700"
        />
      ))}
    </div>
  );
}
const AMBER_GRADIENT_BLUR =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2Y1OWUwYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=";

function FilmFrame({
  data,
  index,
  isSelected,
  onSelect,
  language,
  t,
}: {
  data: DbDossier;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  language: string;
  t: any;
}) {
  

const [imgError, setImgError] = useState(false);

  const computedFrameCode = `#${String(index + 1).padStart(3, "0")}`;
  const frameTitle = language === "en" ? data.title_en || data.title : data.title;

  const rawUrl = data.coverUrl?.trim();
  const validCoverUrl = rawUrl 
    ? (rawUrl.startsWith("http") || rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`)
    : null;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isSelected ? "true" : undefined}
      aria-label={`${t.casesPage.openCaseAlt} ${frameTitle}`}
      className={cn(
        "group relative w-60 shrink-0 rounded-md border-2 border-transparent bg-zinc-900/80 p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 lg:w-full",
        !isSelected && "hover:border-zinc-700",
      )}
    >
      {isSelected && (
        <motion.span
          layoutId="active-frame-glow"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none absolute inset-0 rounded-md border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        />
      )}

<div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-zinc-950">
<div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-zinc-900 to-amber-950" />

  <div className="absolute -inset-[100%] z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/35 via-amber-900/10 to-transparent animate-spin [animation-duration:8s]" />

  <div className="absolute inset-2 z-0 rounded-full bg-amber-500/30 blur-lg animate-ping opacity-90 [animation-duration:1.8s]" />  


        {validCoverUrl && !imgError ? (
  <Image
    sizes="(max-width: 768px) 100vw, 40vw"
    fill
    placeholder="blur"
    blurDataURL={AMBER_GRADIENT_BLUR}
    src={validCoverUrl}
    alt={frameTitle}
    onError={() => setImgError(true)} 
    className="h-full w-full object-cover transition-opacity duration-500 grayscale group-hover:grayscale-0"
  />
) : (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 text-zinc-600">
    <Film className="h-6 w-6" strokeWidth={1.5} />
  </div>
)}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {isSelected && (
          <span className="absolute right-1.5 top-1.5 rounded-sm bg-amber-500 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-zinc-950">
            {data.code}
          </span>
        )}
      </div>

      <div className="mt-1.5 px-0.5">
        <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {t.casesPage.kodakPrefix} {computedFrameCode}
        </span>
        <p className="truncate text-xs text-zinc-300">{frameTitle}</p>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Pagina Principale
// ---------------------------------------------------------------------------

interface CasePageProps {
  dossiersList: DbDossier[];
  isPublic: boolean;
}

export default function CasesPageMainCompo({ dossiersList, isPublic }: CasePageProps) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get("code");

  const selectedCase = codeFromUrl
    ? dossiersList.find((c) => c.code.toLowerCase() === codeFromUrl.toLowerCase()) || null
    : null;

  const [savedCases, setSavedCases] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("active_cases");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Errore nel parsing dei casi salvati:", e);
      return [];
    }
  });

  const handleSelectCase = (item: DbDossier) => {
    router.push(`/cases?code=${encodeURIComponent(item.code)}`, {
      scroll: false,
    });
  };

  if (dossiersList.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <p className="font-mono text-sm uppercase tracking-widest">
          {t.casesPage.empty}
        </p>
      </main>
    );
  }

  const handleDownloadCase = () => {
    if (!selectedCase) return;
    let newSavedCases = [...savedCases];

    if (newSavedCases.includes(selectedCase.id)) {
      newSavedCases = newSavedCases.filter((id) => id !== selectedCase.id);
    } else {
      newSavedCases.push(selectedCase.id);
    }

    setSavedCases(newSavedCases);
    localStorage.setItem("active_cases", JSON.stringify(newSavedCases));
  };

  const activeTitle = selectedCase
    ? lang.toLowerCase() === "en"
      ? selectedCase.title_en || selectedCase.title
      : selectedCase.title
    : "";

  const activeDescription = selectedCase
    ? lang.toLowerCase() === "en"
      ? selectedCase.description_en || selectedCase.description
      : selectedCase.description
    : "";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex flex-col lg:flex-row">
        {/* PELLICOLA 8MM — selettore casi */}
        <aside
          className="relative shrink-0 border-b border-zinc-900 bg-neutral-950 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-80 lg:overflow-y-auto lg:border-b-0 lg:border-r"
          aria-label="Elenco casi"
        >
          <Sprockets edge="start" />
          <Sprockets edge="end" />

          <div className="flex gap-4 overflow-x-auto px-4 py-5 lg:flex-col lg:gap-5 lg:overflow-x-visible lg:px-7 lg:py-8">
            {dossiersList.map((item, index) => (
              <FilmFrame
                key={item.id}
                data={item}
                index={index}
                isSelected={selectedCase ? item.id === selectedCase.id : false}
                onSelect={() => handleSelectCase(item)}
                language={lang.toLowerCase()}
                t={t}
              />
            ))}
            {isPublic && (
              <div className="p-4 bg-amber-500/10 border-t border-amber-500/20 text-center">
                <p className="text-xs font-mono text-amber-400">
                  {t.casesPage.ctaLogin.description1}{" "}
                  <a href="/login" className="underline font-bold">
                    {t.casesPage.ctaLogin.button}
                  </a>{" "}
                  {t.casesPage.ctaLogin.description2}
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* PREVIEW */}
        <div className="flex-1 px-4 py-10 sm:px-8 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:px-12 lg:py-14">
          <AnimatePresence mode="wait">
            {selectedCase ? (
              <motion.div
                key={selectedCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider",
                      selectedCase.status === "Open"
                        ? "bg-amber-500 text-zinc-950"
                        : "bg-neutral-600 text-neutral-100"
                    )}
                  >
                    {selectedCase.status === "Open"
                      ? t.casesPage.openStatus
                      : t.casesPage.archivedStatus}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {t.casesPage.authorLabel}{" "}
                    {selectedCase.user?.username || t.casesPage.unknownAuthor}
                  </span>
                </div>

                <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  {activeTitle}
                </h2>

                <p className="mt-8 text-pretty leading-relaxed text-zinc-400">
                  {activeDescription}
                </p>

                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500">
                      {t.casesPage.archiveAccessTitle}
                    </h3>
                  </div>

                  <CaseFileExplorer
                    caseId={selectedCase.code}
                    files={selectedCase.evidences || []}
                    onDownloadCase={handleDownloadCase}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto flex h-full min-h-[450px] max-w-3xl flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center"
              >
                <div className="mb-4 rounded-full border border-amber-500/20 bg-amber-500/10 p-4">
                  <FolderSearch className="h-8 w-8 text-amber-500" />
                </div>

                <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
                  {t.casesPage.pageDefault.title}
                </h2>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                  {t.casesPage.pageDefault.description}
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-mono text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>
                    {dossiersList.length} {t.casesPage.pageDefault.numbeerOfDossiers}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}