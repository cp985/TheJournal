
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { TransitionStartFunction, useState, useTransition } from "react";
import { FiSearch, FiX, FiFilter, FiLoader } from "react-icons/fi";

export interface StatusOption {
  value: string;
  label: string;
  labelEn?: string;
}

interface AdminSearchProps {
  placeholder?: string;
  statusOptions?: StatusOption[];
  startTransition?: TransitionStartFunction;
}

export default function AdminSearch({
  placeholder,
  statusOptions,
  startTransition: parentStartTransition,
}: AdminSearchProps) {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Transizione locale per mostrare la spunta/spinner nel select
  const [isLocalPending, startLocalTransition] = useTransition();

  const queryParam = searchParams.get("q") || "";
  const statusParam = searchParams.get("status") || "";

  // Sincronizzazione stato da URL senza useEffect
  const [prevQueryParams, setPrevQueryParams] = useState({ queryParam, statusParam });
  const [term, setTerm] = useState(queryParam);
  const [status, setStatus] = useState(statusParam);

  if (
    prevQueryParams.queryParam !== queryParam ||
    prevQueryParams.statusParam !== statusParam
  ) {
    setPrevQueryParams({ queryParam, statusParam });
    setTerm(queryParam);
    setStatus(statusParam);
  }

  const updateURL = (newTerm: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newTerm.trim()) {
      params.set("q", newTerm);
    } else {
      params.delete("q");
    }

    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    const executeNavigation = () => {
      replace(`${pathname}?${params.toString()}`);
    };

    // Esegue sia la transizione locale che quella passata dal genitore (AdminClientPage)
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
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl m-1 mb-5">
      <div className="relative w-full sm:flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={term}
          onChange={(e) => {
            const nextTerm = e.target.value;
            setTerm(nextTerm);
            updateURL(nextTerm, status);
          }}
          placeholder={placeholder || (lang === "EN" ? "Search..." : "Cerca...")}
          className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
        />
        {term && (
          <button
            type="button"
            onClick={() => {
              setTerm("");
              updateURL("", status);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {statusOptions && statusOptions.length > 0 && (
        <div className="relative w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => {
              const nextStatus = e.target.value;
              setStatus(nextStatus);
              updateURL(term, nextStatus);
            }}
            className="w-full sm:w-44 px-3 py-2 pr-8 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none disabled:opacity-50"
          >
            <option value="">
              {lang === "EN" ? "All Statuses" : "Tutti gli stati"}
            </option>
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