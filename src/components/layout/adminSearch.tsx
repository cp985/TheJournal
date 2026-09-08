

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { TransitionStartFunction, useState, useTransition } from "react";
import { FiSearch, FiX, FiFilter, FiLoader, FiFolder } from "react-icons/fi";

export interface StatusOption {
  value: string;
  label: string;
  labelEn?: string;
}

export interface OptionsProps {
  id: string;
  code: string;
  title: string;
  title_en: string;
}

interface AdminSearchProps {
  dossierOptions?: OptionsProps[];
  placeholder?: string;
  statusOptions?: StatusOption[];
  startTransition?: TransitionStartFunction;
}

export default function AdminSearch({
  placeholder,
  statusOptions,
  dossierOptions,
  startTransition: parentStartTransition,
}: AdminSearchProps) {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLocalPending, startLocalTransition] = useTransition();

  const queryParam = searchParams.get("q") || "";
  const statusParam = searchParams.get("status") || "";
  const dossierCodeParam = searchParams.get("dossierCode") || ""; // rinominato

  const [prevQueryParams, setPrevQueryParams] = useState({
    queryParam,
    statusParam,
    dossierCodeParam,
  });
  const [term, setTerm] = useState(queryParam);
  const [status, setStatus] = useState(statusParam);
  const [dossierCode, setDossierCode] = useState(dossierCodeParam); // rinominato

  if (
    prevQueryParams.queryParam !== queryParam ||
    prevQueryParams.statusParam !== statusParam ||
    prevQueryParams.dossierCodeParam !== dossierCodeParam
  ) {
    setPrevQueryParams({ queryParam, statusParam, dossierCodeParam });
    setTerm(queryParam);
    setStatus(statusParam);
    setDossierCode(dossierCodeParam);
  }

  const updateURL = (newTerm: string, newStatus: string, newDossierCode: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newTerm.trim()) params.set("q", newTerm);
    else params.delete("q");

    if (newStatus) params.set("status", newStatus);
    else params.delete("status");

    if (newDossierCode) params.set("dossierCode", newDossierCode); // rinominato
    else params.delete("dossierCode");

    const executeNavigation = () => {
      replace(`${pathname}?${params.toString()}`);
    };

    startLocalTransition(() => {
      if (parentStartTransition) {
        parentStartTransition(executeNavigation);
      } else {
        executeNavigation();
      }
    });
  };

  const getTranslatedLabel = (opt: StatusOption) => {
    if (opt.labelEn && lang === "EN") return opt.labelEn;
    const valUpper = opt.value.toUpperCase();

    if (lang === "EN") {
      if (valUpper === "OPEN") return "Open";
      if (valUpper === "ARCHIVED") return "Archived";
      if (valUpper === "CLOSED") return "Closed";
      if (valUpper === "PENDING") return "Pending";
      if (valUpper === "VERIFIED") return "Verified";
      if (valUpper === "REJECTED") return "Rejected";
    } else {
      if (valUpper === "OPEN") return "Aperto";
      if (valUpper === "ARCHIVED") return "Archiviato";
      if (valUpper === "CLOSED") return "Chiuso";
      if (valUpper === "PENDING") return "In Attesa";
      if (valUpper === "VERIFIED") return "Verificato";
      if (valUpper === "REJECTED") return "Rifiutato";
    }
    return opt.label;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl m-1 mb-5">
      <div className="relative w-full sm:flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={term}
          onChange={(e) => {
            const nextTerm = e.target.value;
            setTerm(nextTerm);
            updateURL(nextTerm, status, dossierCode);
          }}
          placeholder={placeholder || (lang === "EN" ? "Search..." : "Cerca...")}
          className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
        />
        {term && (
          <button
            type="button"
            onClick={() => {
              setTerm("");
              updateURL("", status, dossierCode);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* value ora è opt.code, non opt.id */}
      {dossierOptions && dossierOptions.length > 0 && (
        <div className="relative w-full sm:w-auto">
          <select
            value={dossierCode}
            onChange={(e) => {
              const nextDossierCode = e.target.value;
              setDossierCode(nextDossierCode);
              updateURL(term, status, nextDossierCode);
            }}
            className="w-full sm:w-48 px-3 py-2 pr-8 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none truncate disabled:opacity-50"
          >
            <option value="">{lang === "EN" ? "All Dossiers" : "Tutti i Dossier"}</option>
            {dossierOptions.map((opt) => {
              const displayTitle = lang === "EN" && opt.title_en ? opt.title_en : opt.title;
              return (
                <option key={opt.id} value={opt.code}>
                  {opt.code ? `[${opt.code}] ${displayTitle}` : displayTitle}
                </option>
              );
            })}
          </select>

          {isLocalPending ? (
            <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-500 animate-spin pointer-events-none" />
          ) : (
            <FiFolder className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          )}
        </div>
      )}

      {statusOptions && statusOptions.length > 0 && (
        <div className="relative w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => {
              const nextStatus = e.target.value;
              setStatus(nextStatus);
              updateURL(term, nextStatus, dossierCode);
            }}
            className="w-full sm:w-40 px-3 py-2 pr-8 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none disabled:opacity-50"
          >
            <option value="">{lang === "EN" ? "All Statuses" : "Tutti gli stati"}</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {getTranslatedLabel(opt)}
              </option>
            ))}
          </select>

          {isLocalPending ? (
            <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-500 animate-spin pointer-events-none" />
          ) : (
            <FiFilter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}