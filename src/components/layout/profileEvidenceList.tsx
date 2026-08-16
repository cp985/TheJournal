// "use client";



// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiChevronDown, FiSend } from "react-icons/fi";
// import { DbEvidence } from "@/lib/type";

// interface EvidenceListProps {
//   evidenceList: DbEvidence[];
//   limit?: number;
//   emptyMessage?: string;
//   className?: string;
// }

// function StatusBadge({ status }: { status: DbEvidence["status"] }) {
//   if (status === "ACCEPTED") {
//     return (
//       <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
//         Accettata
//       </span>
//     );
//   }

//   if (status === "REJECTED") {
//     return (
//       <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-rose-500/10 text-rose-400 border-rose-500/20">
//         Rifiutata
//       </span>
//     );
//   }

//   return (
//     <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-amber-500/10 text-amber-400 border-amber-500/20">
//       In Sospeso
//     </span>
//   );
// }

// export default function ProfileEvidenceList({
//   evidenceList,
//   limit = 5,
//   emptyMessage = "Nessuna prova o segnalazione inviata finora.",
//   className = "",
// }: EvidenceListProps) {
//   const [showAll, setShowAll] = useState(false);

//   if (evidenceList.length === 0) {
//     return (
//       <div className={`text-center py-10 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/20 ${className}`}>
//         <FiSend className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
//         <p className="text-xs text-zinc-400">{emptyMessage}</p>
//       </div>
//     );
//   }

//   const hasMore = evidenceList.length > limit;
//   const displayedEvidence = showAll ? evidenceList : evidenceList.slice(0, limit);

//   return (
//     <div className={`space-y-3 ${className}`}>
//       <div className="divide-y divide-zinc-800/60 border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/40">
//         <AnimatePresence initial={false}>
//           {displayedEvidence.map((item, index) => {
//             const isExtra = index >= limit;

//             return (
//               <motion.div
//                 key={item.id}
//                 initial={isExtra ? { opacity: 0, height: 0 } : false}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{
//                   duration: 0.25,
//                   ease: "easeInOut",
//                   delay: isExtra ? (index - limit) * 0.03 : 0,
//                 }}
//                 className="overflow-hidden"
//               >
//                 <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/20 transition-colors">
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700/60">
//                         {item.id}
//                       </span>
//                       <span className="text-xs font-semibold text-zinc-200">{item.notes}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
//                       <span>Tipo: {item.type}</span>
//                       <span>•</span>
//                       <span>Inviato il {item.createdAt}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between sm:justify-end gap-4">
//                     <StatusBadge status={item.status} />
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>

//       {hasMore && (
//         <div className="text-center pt-1">
//           <button
//             type="button"
//             onClick={() => setShowAll((prev) => !prev)}
//             aria-expanded={showAll}
//             className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-amber-400 transition-colors py-2 px-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80"
//           >
//             <span>{showAll ? "Mostra meno" : `Vedi tutte (${evidenceList.length})`}</span>
//             <motion.span
//               animate={{ rotate: showAll ? 180 : 0 }}
//               transition={{ duration: 0.2, ease: "easeInOut" }}
//               className="inline-flex"
//             >
//               <FiChevronDown className="w-4 h-4" />
//             </motion.span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSend } from "react-icons/fi";
import { DbEvidence } from "@/lib/type";
import { useLanguage } from "@/context/maincontext";

interface EvidenceListProps {
  evidenceList: DbEvidence[];
  limit?: number;
  emptyMessage?: string;
  className?: string;
}

function StatusBadge({ status }: { status: DbEvidence["status"] }) {
  const { t: dictionary } = useLanguage();
  const t = dictionary.profile.evidenceList.status;

  if (status === "ACCEPTED") {
    return (
      <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
        {t.accepted}
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-rose-500/10 text-rose-400 border-rose-500/20">
        {t.rejected}
      </span>
    );
  }

  return (
    <span className="px-2.5 py-1 rounded-full border text-xs font-mono bg-amber-500/10 text-amber-400 border-amber-500/20">
      {t.pending}
    </span>
  );
}

export default function ProfileEvidenceList({
  evidenceList,
  limit = 5,
  emptyMessage,
  className = "",
}: EvidenceListProps) {
  const [showAll, setShowAll] = useState(false);
  const { t: dictionary } = useLanguage();
  const t = dictionary.profile.evidenceList;

  const resolvedEmptyMessage = emptyMessage || t.defaultEmptyMessage;

  if (evidenceList.length === 0) {
    return (
      <div className={`text-center py-10 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/20 ${className}`}>
        <FiSend className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
        <p className="text-xs text-zinc-400">{resolvedEmptyMessage}</p>
      </div>
    );
  }

  const hasMore = evidenceList.length > limit;
  const displayedEvidence = showAll ? evidenceList : evidenceList.slice(0, limit);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="divide-y divide-zinc-800/60 border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/40">
        <AnimatePresence initial={false}>
          {displayedEvidence.map((item, index) => {
            const isExtra = index >= limit;

            return (
              <motion.div
                key={item.id}
                initial={isExtra ? { opacity: 0, height: 0 } : false}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  delay: isExtra ? (index - limit) * 0.03 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/20 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700/60">
                        {item.id}
                      </span>
                      <span className="text-xs font-semibold text-zinc-200">{item.notes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                      <span>{t.labels.type}: {item.type}</span>
                      <span>•</span>
                      <span>{t.labels.sentOn} {item.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-amber-400 transition-colors py-2 px-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80"
          >
            <span>
              {showAll ? t.buttons.showLess : `${t.buttons.seeAll} (${evidenceList.length})`}
            </span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex"
            >
              <FiChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </div>
      )}
    </div>
  );
}