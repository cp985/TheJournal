"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { useState, useTransition } from "react";

export default function AdminSearch({ placeholder = "Cerca..." }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [term, setTerm] = useState(searchParams.get("q")?.toString() || "");

  const handleSearch = (value: string) => {
    setTerm(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-sm m-1 mb-5">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      <input
        type="text"
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
      />
      {term && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}