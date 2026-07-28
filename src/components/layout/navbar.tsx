"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Network, ArrowLeft } from "lucide-react";
import {useLanguage} from "@/context/maincontext";



// --- Componente per il Selettore Lingua ---
function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/90 p-0.5 font-mono text-[11px]">
      <button
        type="button"
        onClick={() => setLang("IT")}
        className={cn(
          "rounded px-1.5 py-0.5 font-bold transition-colors",
          lang === "IT"
            ? "bg-amber-500 text-zinc-950"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        IT
      </button>
      <span className="text-zinc-700" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setLang("EN")}
        className={cn(
          "rounded px-1.5 py-0.5 font-bold transition-colors",
          lang === "EN"
            ? "bg-amber-500 text-zinc-950"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        EN
      </button>
    </div>
  );
}

export default function Navbar() {
  const {t} = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Verifica se siamo nella rotta dei casi (es: /cases o /casi)
  const isCasesPage = pathname?.startsWith("/cases") || pathname?.startsWith("/casi");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // VARIATE 1: Header minimal per la pagina /cases
  // ---------------------------------------------------------------------------
  
  const NAV_CASES = { title: t.casesPage.archive  } as const;
  
  
  if (isCasesPage) {
    return (
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-900 bg-zinc-950/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Torna alla home"
            className="rounded-sm text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="h-4 w-px bg-zinc-800" aria-hidden="true" />
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-amber-900/60 bg-amber-950/20">
              <Network className="h-3 w-3 text-amber-500" />
            </span>
            <span className="hidden font-mono text-xs font-semibold tracking-[0.15em] text-zinc-400 sm:inline">
              THE JOURNAL
            </span>
          </Link>
        </div>

        <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          {NAV_CASES.title}
        </h1>

        {/* Pulsante Lingua posizionato sulla destra */}
        <LanguageToggle />
      </header>
    );
  }

  // ---------------------------------------------------------------------------
  // VARIATE 2: Navbar principale per la Landing Page e altre pagine
  // ---------------------------------------------------------------------------
  
  const NAV_LINKS = [
  { label:t.nav.cases , href: "/cases" },
  { label: t.nav.map, href: "/map" },
  { label: t.nav.osint, href: "/osint-method" },
  { label: t.nav.about, href: "/about" },
] as const;

console.log(t.nav.cases)
  
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-amber-900/60 bg-amber-950/20">
            <Network className="h-4 w-4 text-amber-500" strokeWidth={2.25} />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.15em] text-zinc-50">
            THE JOURNAL
            <span className="ml-1.5 text-amber-500">_</span>
          </span>
        </Link>

        {/* Link centrali */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm text-zinc-400 transition-colors hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Azioni destra: Selettore Lingua + Area Riservata */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-200 hover:border-amber-800 hover:bg-amber-950/20 hover:text-amber-400"
          >
            <Link href="/login">{t.nav.login}</Link>
          </Button>
        </div>

        {/* Pulsante Menu Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-zinc-800 text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-sm px-2 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              variant="outline"
              className="mt-2 w-full border-zinc-700 bg-transparent text-zinc-200 hover:border-amber-800 hover:bg-amber-950/20 hover:text-amber-400"
            >
              <Link href="/login">{t.nav.login}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}