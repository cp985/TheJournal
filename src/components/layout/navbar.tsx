
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/maincontext";
import { Button } from "@/components/ui/button";
import { Menu, Lock, Network, FolderArchive, Map, ShieldCheck, Info, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { nav } = t;

  const isMapPage = pathname === "/map";

  const navLinks = [
    { href: "/cases", label: nav.cases, icon: FolderArchive },
    { href: "/map", label: nav.map, icon: Map },
    { href: "/osint-method", label: nav.osint, icon: ShieldCheck },
    { href: "/about", label: nav.about, icon: Info },
  ];

  /* -------------------------------------------------------------------------- */
  /* CASO 1: PAGINA MAPPA (/map) -> Menu fluttuante a comparsa                 */
  /* -------------------------------------------------------------------------- */
  if (isMapPage) {
    return (
      <>
        {/* BOTTONE FLUTTUANTE MENU */}
        {!isOpen && (
          <div className="fixed top-4 right-4 z-50">
            <Button
              onClick={() => setIsOpen(true)}
              variant="outline"
              size="icon"
              className="h-10 w-10 border-amber-800 bg-zinc-950/90 text-amber-500 shadow-xl backdrop-blur-md hover:bg-zinc-900 hover:text-amber-400"
              aria-label="Apri Menu Mappa"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* OVERLAY PER CHIUSURA CON BLUR */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all"
            aria-hidden="true"
          />
        )}

        {/* PANNELLO DI NAVIGAZIONE A COMPARSA */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/98 p-4 sm:p-6 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100 shadow-2xl"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-7xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-amber-900/50 bg-amber-950/20 text-amber-500 transition-colors group-hover:border-amber-500">
                  <Network className="h-4 w-4" />
                </div>
                <span className="font-serif text-lg font-bold tracking-wider text-zinc-100">
                  The Journal
                </span>
              </Link>

              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-500"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* NAV LINKS RESPONSIVE */}
            <nav className="flex flex-col sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 pt-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex w-full items-center justify-start sm:justify-start gap-2 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-amber-950/40 border border-amber-900/60 text-amber-400"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CONTROLLI SOTTO SU MOBILE */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-2">
              <div className="flex items-center rounded border border-zinc-800 bg-zinc-900/80 p-1 text-xs font-mono">
                <button
                  onClick={() => setLang("IT")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === "IT"
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLang("EN")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === "EN"
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  EN
                </button>
              </div>

              <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Lock className="mr-1.5 h-3.5 w-3.5" />
                  {nav.login}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* CASO 2: PAGINE STANDARD -> Navbar Fissa con Backdrop Blur & Mobile Overlay */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      {/* OVERLAY SCURO CON BLUR SU MOBILE QUANDO IL MENU È APERTO */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all md:hidden"
          aria-hidden="true"
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-zinc-950 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-amber-900/50 bg-amber-950/20 text-amber-500 transition-colors group-hover:border-amber-500">
              <Network className="h-4 w-4" />
            </div>
            <span className="font-serif text-lg font-bold tracking-wider text-zinc-100">
              The Journal
            </span>
          </Link>

          {/* LINK DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-amber-500 font-bold"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CONTROLLI DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center rounded border border-zinc-800 bg-zinc-900/80 p-1 text-xs font-mono">
              <button
                onClick={() => setLang("IT")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  lang === "IT"
                    ? "bg-amber-500/20 text-amber-400 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                IT
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  lang === "EN"
                    ? "bg-amber-500/20 text-amber-400 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                EN
              </button>
            </div>

            <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
              <Link href="/login">
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                {nav.login}
              </Link>
            </Button>
          </div>

          {/* PULSANTE HAMBURGER MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-md border border-zinc-800 text-amber-500 hover:bg-zinc-900"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* MENU MOBILE DROP-DOWN CON BLUR */}
        {isOpen && (
          <div className="relative z-50 md:hidden border-t border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-xl shadow-2xl">
            <nav className="flex flex-col space-y-3 mb-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-amber-950/40 border border-amber-900/60 text-amber-400 font-bold"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
              <div className="flex items-center rounded border border-zinc-800 bg-zinc-900/80 p-1 text-xs font-mono">
                <button
                  onClick={() => setLang("IT")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === "IT"
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLang("EN")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === "EN"
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  EN
                </button>
              </div>

              <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Lock className="mr-1.5 h-3.5 w-3.5" />
                  {nav.login}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}