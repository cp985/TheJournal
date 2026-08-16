
"use client";

import { useLanguage } from "@/context/maincontext";
import { DbEvidence } from "@/lib/type";
import UserAvatar from "./userAvatar";
import ProfileEvidenceList from "./profileEvidenceList";
import DeleteAccountButton from "./profileDeleteAccount";
import ExportDataButton from "./profileExportButton";
import AddEvidenceButton from "./profileEvidenceSend";
import { 
  FiShield, 
  FiCalendar, 
  FiFileText,
  FiActivity,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Session } from "next-auth";
import ProfileEditDialog from "./profileEditDialog";

export interface Stats {
  totalSubmitted: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface DossierStats {
  code: string;
  title: string;
}

interface ProfilePageClientProps {
  session: Session;
  stats: Stats;
  userEvidenceList: DbEvidence[];
  dossiers: DossierStats[];
}

export default function ProfilePageClient({ session, stats, userEvidenceList, dossiers }: ProfilePageClientProps) {
  const { t } = useLanguage();

  // Calcolo sicuro per evitare NaN% in caso di 0 elementi
  const total = stats.totalSubmitted || 1;
  const pendingPercent = stats.totalSubmitted > 0 ? (stats.pending / total) * 100 : 0;
  const approvedPercent = stats.totalSubmitted > 0 ? (stats.approved / total) * 100 : 0;
  const rejectedPercent = stats.totalSubmitted > 0 ? (stats.rejected / total) * 100 : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER PROFILO */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-800 border-2 border-amber-500/50 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-amber-500 shadow-inner">
                <UserAvatar avatarValue={session.user.image} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
                    {session.user.name || "Utente"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                    {session.user.role || "USER"}
                  </span>
                </div>

                <p className="text-sm text-zinc-400 font-mono">
                  @{session.user.username || "username"} • {session.user.email}
                </p>

                <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                    <FaGoogle className="w-3 h-3 text-amber-500" /> OAuth
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3.5 h-3.5" /> Account attivo
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <ProfileEditDialog session={session} />
            </div>
          </div>
        </section>

        {/* STATISTICHE COMPATTE */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <FiActivity className="w-4 h-4 text-amber-500" />
              Bilancio Prove & Segnalazioni
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              Totale Inviate: <strong className="text-zinc-100 font-bold">{stats.totalSubmitted}</strong>
            </span>
          </div>

          {/* Barra Visuale di Proporzione */}
          <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-zinc-700/50">
            <div 
              style={{ width: `${pendingPercent}%` }} 
              className="bg-amber-500 h-full rounded-l-sm transition-all duration-500"
              title="In Sospeso"
            />
            <div 
              style={{ width: `${approvedPercent}%` }} 
              className="bg-emerald-500 h-full transition-all duration-500"
              title="Accettate"
            />
            <div 
              style={{ width: `${rejectedPercent}%` }} 
              className="bg-rose-500 h-full rounded-r-sm transition-all duration-500"
              title="Rifiutate"
            />
          </div>

          {/* Griglia Valori Sintetici */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
            <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/60">
              <span className="block text-2xl font-bold text-amber-400">
                {stats.pending}<span className="text-xs font-normal text-zinc-400">/{stats.totalSubmitted}</span>
              </span>
              <span className="text-[10px] font-sans uppercase tracking-wider text-zinc-400 font-semibold">
                Pendenti
              </span>
            </div>

            <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/60">
              <span className="block text-2xl font-bold text-emerald-400">
                {stats.approved}<span className="text-xs font-normal text-zinc-400">/{stats.totalSubmitted}</span>
              </span>
              <span className="text-[10px] font-sans uppercase tracking-wider text-zinc-400 font-semibold">
                Accettate
              </span>
            </div>

            <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/60">
              <span className="block text-2xl font-bold text-rose-400">
                {stats.rejected}<span className="text-xs font-normal text-zinc-400">/{stats.totalSubmitted}</span>
              </span>
              <span className="text-[10px] font-sans uppercase tracking-wider text-zinc-400 font-semibold">
                Rifiutate
              </span>
            </div>
          </div>
        </section>

        {/* LISTA PROVE E SEGNALAZIONI */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-amber-500" />
                Prove e Segnalazioni
              </h2>
              <p className="text-xs text-zinc-400">
                Storico del materiale e delle associazioni inviate a tuo nome
              </p>
            </div>

            <AddEvidenceButton dossiers={dossiers} />
          </div>

          <ProfileEvidenceList
            evidenceList={userEvidenceList}
            limit={5}
          />
        </section>

        {/* IMPOSTAZIONI ACCOUNT & SICUREZZA */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <FiShield className="w-5 h-5 text-amber-500" />
            Gestione Account e Privacy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Esporta i Tuoi Dati
                </p>
                <p className="text-xs text-zinc-500">
                  Scarica il report in formato JSON
                </p>
              </div>
              <ExportDataButton />
            </div>

            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-rose-400">
                  Elimina Account
                </p>
                <p className="text-xs text-zinc-500">
                  Rimuovi profilo e credenziali
                </p>
              </div>
              <DeleteAccountButton />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}