

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { User, LayoutDashboard, LogOut, ChevronDown, Shield, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/maincontext"; 

export function UserNavDesktop({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { t : dictionary } = useLanguage();
  const t = dictionary.nav.userNav;

  const user = session.user;
  const username = user?.username || user?.email?.split("@")[0] || t.defaultAgent;
  const role = user?.role || "USER";
  const isAdmin = role.toUpperCase() === "ADMIN";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full border border-amber-900/60 bg-zinc-900/90 py-1 pl-1.5 pr-3 text-xs font-medium text-zinc-200 transition-all hover:border-amber-500/80 hover:bg-zinc-800/80 focus:outline-none"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-700/50 bg-amber-950/40 text-amber-400 shadow-inner">
          {isAdmin ? (
            <Shield className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <UserCheck className="h-3.5 w-3.5 text-amber-400" />
          )}
        </div>

        <div className="flex flex-col items-start text-left">
          <span className="font-mono text-xs font-semibold tracking-wide text-zinc-100 max-w-[100px] truncate">
            {username}
          </span>
          <span className="text-[9px] font-mono font-bold tracking-wider text-amber-500/90 uppercase">
            {role}
          </span>
        </div>

        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-zinc-800 bg-zinc-950/98 p-1.5 text-xs shadow-2xl backdrop-blur-xl z-50">
          <div className="border-b border-zinc-800/80 px-3 py-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              {t.activeIdentity}
            </p>
            <p className="truncate font-mono text-xs text-zinc-300 font-medium">
              {user?.email || t.noEmail}
            </p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded px-2.5 py-2 font-medium text-zinc-300 hover:bg-zinc-900 hover:text-amber-400 transition-colors"
            >
              <User className="h-4 w-4 text-zinc-400" />
              {t.profile}
            </Link>

            {isAdmin && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-2.5 rounded px-2.5 py-2 font-medium text-amber-400 hover:bg-amber-950/30 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-500" />
                {t.adminDashboard}
              </Link>
            )}
          </div>

          <div className="border-t border-zinc-800/80 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              className="flex w-full items-center gap-2.5 rounded px-2.5 py-2 font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-4 w-4 text-red-400" />
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface UserNavMobileProps {
  session: Session;
  onCloseMenu?: () => void;
}

export function UserNavMobile({ session, onCloseMenu }: UserNavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { t :dictionary } = useLanguage();
  const t = dictionary.nav.userNav;

  const user = session.user;
  const username = user?.username || user?.email?.split("@")[0] || t.defaultAgent;
  const role = user?.role || "USER";
  const isAdmin = role.toUpperCase() === "ADMIN";

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onCloseMenu) onCloseMenu();
  };

  return (
    <div className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/50 overflow-hidden">
      {/* Banner Identità Utente */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-amber-800/60 bg-amber-950/40 text-amber-400">
            {isAdmin ? (
              <Shield className="h-4 w-4" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-zinc-100">
              {username}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-amber-500 font-semibold uppercase">
              {role} • {user?.email}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
        />
      </button>

      {/* Accordion Sotto-Menu */}
      {isOpen && (
        <div className="border-t border-zinc-800/80 bg-zinc-950/80 p-2 space-y-1">
          <Link
            href="/profile"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 rounded px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-amber-400 transition-colors"
          >
            <User className="h-4 w-4 text-zinc-400" />
            {t.profile}
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 rounded px-3 py-2 text-xs font-medium text-amber-400 hover:bg-amber-950/30 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-amber-500" />
              {t.adminDashboard}
            </Link>
          )}

          <button
            onClick={() => {
              handleLinkClick();
              signOut({ callbackUrl: "/login" });
            }}
            className="flex w-full items-center gap-2.5 rounded px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-4 w-4 text-red-400" />
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}