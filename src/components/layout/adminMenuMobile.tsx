

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FiMenu,
  FiShield,
  FiUsers,
  FiFolder,
  FiFileText,
  FiMapPin,
  FiPieChart,
} from "react-icons/fi";

interface MenuProps {
  currentTab: string;
}

const NAV_ITEMS = [
  { id: "overview", label: "Panoramica", icon: FiPieChart },
  { id: "users", label: "Utenti", icon: FiUsers },
  { id: "dossiers", label: "Dossier", icon: FiFolder },
  { id: "evidences", label: "Prove", icon: FiFileText },
  { id: "map", label: "Mappa & Punti", icon: FiMapPin },
];

export default function MobileMenu({ currentTab }: MenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // Controlled state per lo Sheet
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (tabId: string) => {
    startTransition(() => {
      router.push(`/admin?tab=${tabId}`);
      setOpen(false); 
    });
  };

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800/80 bg-zinc-950">
      <div className="flex items-center gap-2">
        <FiShield className="w-5 h-5 text-amber-500" />
        <span className="font-bold text-sm font-mono text-zinc-100">ADMIN PANEL</span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:bg-zinc-900"
          >
            <FiMenu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-zinc-950 border-r border-zinc-800 text-zinc-500 p-4 w-72"
        >
          <div className="flex items-center gap-2.5 px-2 py-3 mb-4 border-b border-zinc-800">
            <FiShield className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm text-zinc-100 font-mono">
              ADMIN PANEL
            </span>
          </div>
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  disabled={isPending}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "text-zinc-400 hover:bg-zinc-900"
                  } ${isPending ? "opacity-60 cursor-wait" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}