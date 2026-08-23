"use client";

import Link from "next/link";
import { useLanguage } from "@/context/maincontext";
import {
  FiUsers,
  FiFolder,
  FiFileText,
  FiMapPin,
  FiPieChart,
  FiShield,
} from "react-icons/fi";
import AdminDossiersView from "@/components/layout/adminDossiersView";
import AdminUsersView from "@/components/layout/adminUsersView";
import AdminEvidencesView from "@/components/layout/adminEvidencesView";
import AdminMapView from "@/components/layout/adminMapView";
import AdminOverview from "@/components/layout/adminOverview";
import AdminSearch from "@/components/layout/adminSearch";
import MobileMenu from "@/components/layout/adminMenuMobile";
import { DbEvidence,DbDossier,DbUser } from "@/lib/type";

interface AdminClientPageProps {
  currentTab: string;
  q: string;
  evidencesList: DbEvidence[];
  dossiersList: DbDossier[];
usersList: DbUser[];
 pendingEvidencesCount: number;
 health:{ online: boolean };
}

export default function AdminClientPage({
  currentTab,
  q,
  evidencesList,
  dossiersList,
  usersList,
  pendingEvidencesCount,
  health
  
}: AdminClientPageProps) {
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { id: "overview", label: t.admin.sidebar.overview, icon: FiPieChart },
    { id: "users", label: t.admin.sidebar.users, icon: FiUsers },
    { id: "dossiers", label: t.admin.sidebar.dossiers, icon: FiFolder },
    { id: "evidences", label: t.admin.sidebar.evidences, icon: FiFileText },
    { id: "map", label: t.admin.sidebar.map, icon: FiMapPin },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950/50 p-4 shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-3 mb-6 border-b border-zinc-800/80">
          <FiShield className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-sm tracking-wide font-mono text-zinc-100">
            {t.admin.sidebar.panelTitle}
          </span>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <Link
                key={item.id}
                href={`/admin?tab=${item.id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-amber-400" : "text-zinc-400"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Header Mobile con Drawer (Sheet) */}
      <MobileMenu currentTab={currentTab} />

      {/* Area Contenuto Principale */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl">
        {currentTab !== "overview" && currentTab !== "map" && <AdminSearch />}
        {currentTab === "overview" && <AdminOverview usersCount={usersList.length}
    dossiersCount={dossiersList.length}
    pendingEvidencesCount={pendingEvidencesCount}
    health={health} />}
        {currentTab === "users" && <AdminUsersView q={q} usersList={usersList} />}
        {currentTab === "dossiers" && <AdminDossiersView q={q}  dossiersList={dossiersList}/>}
        {currentTab === "evidences" && (
          <AdminEvidencesView
            q={q}
            evidencesList={evidencesList}
            dossiersList={dossiersList}
          />
        )}
        {currentTab === "map" && <AdminMapView />}
      </main>
    </div>
  );
}