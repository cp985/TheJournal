

"use client";

import { useLanguage } from "@/context/maincontext";
import {
  FiUsers,
  FiFolder,
  FiFileText,
  FiMapPin,
  FiPieChart,
  FiShield,
  FiLoader,
} from "react-icons/fi";
import AdminDossiersView from "@/components/layout/adminDossiersView";
import AdminUsersView from "@/components/layout/adminUsersView";
import AdminEvidencesView from "@/components/layout/adminEvidencesView";
import AdminMapView from "@/components/layout/adminMapView";
import AdminOverview from "@/components/layout/adminOverview";
import AdminSearch from "@/components/layout/adminSearch";
import MobileMenu from "@/components/layout/adminMenuMobile";
import { DbEvidence, DbDossier, DbUser } from "@/lib/type";
import { Suspense, useTransition } from "react";
import { DOSSIER_STATUS_OPTIONS, EVIDENCE_STATUS_OPTIONS } from "@/lib/type";
import { useRouter } from "next/navigation";

interface AdminClientPageProps {
  currentTab: string;
  q: string;
  status?: string;
  evidencesList: DbEvidence[];
  dossiersList: DbDossier[];
  usersList: DbUser[];
  pendingEvidencesCount: number;
  health: { online: boolean };
}

function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-4 animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="h-4 bg-zinc-800 rounded w-2/3" />
            <div className="h-4 bg-zinc-800 rounded w-1/4" />
          </div>
          <div className="h-3 bg-zinc-800/60 rounded w-1/3" />
          <div className="pt-3 border-t border-zinc-800/60 flex justify-between items-center">
            <div className="space-y-1.5 w-1/2">
              <div className="h-2.5 bg-zinc-800/50 rounded w-full" />
              <div className="h-2.5 bg-zinc-800/50 rounded w-4/5" />
            </div>
            <div className="h-7 w-16 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminClientPage({
  currentTab,
  q,
  status = "",
  evidencesList,
  dossiersList,
  usersList,
  pendingEvidencesCount,
  health,
}: AdminClientPageProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const NAV_ITEMS = [
    { id: "overview", label: t.admin.sidebar.overview, icon: FiPieChart },
    { id: "users", label: t.admin.sidebar.users, icon: FiUsers },
    { id: "dossiers", label: t.admin.sidebar.dossiers, icon: FiFolder },
    { id: "evidences", label: t.admin.sidebar.evidences, icon: FiFileText },
    { id: "map", label: t.admin.sidebar.map, icon: FiMapPin },
  ];

  const getStatusOptions = () => {
    if (currentTab === "dossiers") return DOSSIER_STATUS_OPTIONS;
    if (currentTab === "evidences") return EVIDENCE_STATUS_OPTIONS;
    return undefined;
  };

  const handleTabChange = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950/50 p-4 shrink-0">
        <div className="flex items-center justify-between px-3 py-3 mb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <FiShield className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm tracking-wide font-mono text-zinc-100">
              {t.admin.sidebar.panelTitle}
            </span>
          </div>
          {isPending && (
            <FiLoader className="w-4 h-4 text-amber-500 animate-spin" />
          )}
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const targetHref = `/admin?tab=${item.id}`;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(targetHref)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
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
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Header Mobile */}
      <MobileMenu currentTab={currentTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl">
        {currentTab !== "overview" && currentTab !== "map" && (
          <Suspense
            fallback={
              <div className="h-10 w-full max-w-xl bg-zinc-900/50 animate-pulse rounded-lg mb-5" />
            }
          >
            <AdminSearch
              statusOptions={getStatusOptions()}
              startTransition={startTransition}
            />
          </Suspense>
        )}

        {/* Mostra lo Skeleton automaticamente finché la transizione non è completata */}
        {isPending ? (
          <ListSkeleton />
        ) : (
          <>
            {currentTab === "overview" && (
              <AdminOverview
                usersCount={usersList.length}
                dossiersCount={dossiersList.length}
                pendingEvidencesCount={pendingEvidencesCount}
                health={health}
              />
            )}

            {currentTab === "users" && (
              <AdminUsersView q={q} usersList={usersList} />
            )}

            {currentTab === "dossiers" && (
              <AdminDossiersView
                q={q}
                status={status}
                dossiersList={dossiersList}
              />
            )}

            {currentTab === "evidences" && (
              <AdminEvidencesView
                q={q}
                status={status}
                evidencesList={evidencesList}
                dossiersList={dossiersList}
              />
            )}

            {currentTab === "map" && <AdminMapView dossiers={dossiersList} evidences={evidencesList} />}
          </>
        )}
      </main>
    </div>
  );
}