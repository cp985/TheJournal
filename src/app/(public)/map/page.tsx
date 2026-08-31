// import InvestigationBoard from "@/components/layout/mapInvestigationBoard";
// import "@xyflow/react/dist/style.css";
// import { getDossiers } from "@/action/action";
// export interface DossierSummary {
//   id: string;
//   title: string;
//   code: string;
//   date: string;
//   status: "In Corso" | "Archiviato" | "Sospeso";
// }



// export default async function MapPage() {

//   const dossiersList = await getDossiers();

//   return (
//     <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
//       <InvestigationBoard dossiers={dossiersList} />
//     </div>
//   );
// }

import InvestigationBoard from "@/components/layout/mapInvestigationBoard";
import "@xyflow/react/dist/style.css";
import { getDossiers, getFollowedCases } from "@/action/action"; // Assicurati di importare getFollowedCases
import { auth } from "@/auth/auth";
import {DbDossier} from '@/lib/type'


export default async function MapPage() {
  // 1. Recupera la lista di tutti i casi disponibili
  const dossiersList = await getDossiers();

  // 2. Recupera la sessione Auth.js lato server
  const session = await auth();

  // 3. Se l'utente è autenticato, recupera gli ID dal DB
  let initialDbFollowedIds: string[] | null = null;

  if (session?.user?.id) {
    const res = await getFollowedCases(); 
    if (res.success && res.followedIds) {
      initialDbFollowedIds = res.followedIds;
    }
  }

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <InvestigationBoard 
        dossiers={dossiersList} 
        initialDbFollowedIds={initialDbFollowedIds}
        isAuthenticated={!!session?.user}
      />
    </div>
  );
}