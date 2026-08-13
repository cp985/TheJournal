"use client";
import Image from "next/image";
import { useLanguage } from "@/context/maincontext";
import  {DbEvidence} from "@/lib/type";
import { Stats } from "@/app/(auth)/profile/page";
import { 
  FiPlusCircle, 
  FiShield, 
  FiEdit2, 
  FiCalendar, 
  FiDownload, 
  FiTrash2, 
  FiFileText,
  FiSend,
  FiActivity
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Session } from "next-auth";
import ProfileEditDialog from "./profileEditDialog";

interface ProfilePageClientProps {
  session: Session;
  stats: Stats;
  userEvidenceList: DbEvidence[];
}


export default function ProfilePageClient({session, stats,userEvidenceList } : ProfilePageClientProps){ 
  // ---------------------------------------------------------------------------
const {t} = useLanguage();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ================================================================= */}
        {/* HEADER PROFILO                                                    */}
        {/* ================================================================= */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              {/* Avatar Utente */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-800 border-2 border-amber-500/50 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-amber-500 shadow-inner">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  session.user.name?.charAt(0).toUpperCase() || "U"
                )}
              </div>

              {/* Informazioni Anagrafiche */}
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

            {/* Azioni Profilo */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <ProfileEditDialog session={session} />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* STATISTICHE COMPATTE & MODERNE (RATIO / METRICHE)                 */}
        {/* ================================================================= */}
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
              style={{ width: `${(stats.pending / stats.totalSubmitted) * 100}%` }} 
              className="bg-amber-500 h-full rounded-l-sm transition-all duration-500"
              title="In Sospeso"
            />
            <div 
              style={{ width: `${(stats.approved / stats.totalSubmitted) * 100}%` }} 
              className="bg-emerald-500 h-full transition-all duration-500"
              title="Accettate"
            />
            <div 
              style={{ width: `${(stats.rejected / stats.totalSubmitted) * 100}%` }} 
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

        {/* ================================================================= */}
        {/* LISTA PROVE E SEGNALAZIONI (Dalla tabella 'evidence')             */}
        {/* ================================================================= */}
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

            {/* Pulsante di Apertura Form Segnalazione / Prova */}
            <button 
              /* onClick={() => setIsModalOpen(true)} */
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-medium text-xs py-2.5 px-4 rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-amber-500/10"
            >
              <FiPlusCircle className="w-4 h-4" /> Invia Prova / Segnalazione
            </button>
          </div>

          {/* LISTA DEGLI INVII */}
          <div className="space-y-3">
            {userEvidenceList.length > 0 ? (
              <div className="divide-y divide-zinc-800/60 border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/40">
                {userEvidenceList.map((item) => {
                  // Mappatura Badge Stato
                  let statusBadge = (
                    <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-amber-500/10 text-amber-400 border-amber-500/20">
                      In Sospeso
                    </span>
                  );
                  if (item.status === "ACCEPTED") {
                    statusBadge = (
                      <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        Accettata
                      </span>
                    );
                  } else if (item.status === "REJECTED") {
                    statusBadge = (
                      <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-rose-500/10 text-rose-400 border-rose-500/20">
                        Rifiutata
                      </span>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/20 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700/60">
                            {item.id}
                          </span>
                          <span className="text-xs font-semibold text-zinc-200">
                            {item.notes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                          <span>Tipo: {item.type}</span>
                          <span>•</span>
                          <span>Inviato il {item.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        {statusBadge}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/20">
                <FiSend className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400">
                  Nessuna prova o segnalazione inviata finora.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* IMPOSTAZIONI ACCOUNT & SICUREZZA                                  */}
        {/* ================================================================= */}
        <section className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <FiShield className="w-5 h-5 text-amber-500" />
            Gestione Account e Privacy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Esportazione Dati */}
            <div className="p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Esporta i Tuoi Dati
                </p>
                <p className="text-xs text-zinc-500">
                  Scarica il report in formato JSON
                </p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors flex-shrink-0">
                <FiDownload className="w-3.5 h-3.5" /> Esporta
              </button>
            </div>

            {/* Eliminazione Account */}
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-rose-400">
                  Elimina Account
                </p>
                <p className="text-xs text-zinc-500">
                  Rimuovi profilo e credenziali
                </p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg transition-colors flex-shrink-0">
                <FiTrash2 className="w-3.5 h-3.5" /> Elimina
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}