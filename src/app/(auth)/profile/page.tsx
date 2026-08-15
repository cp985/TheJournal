
// import { auth } from "@/auth/auth";
// import { redirect } from "next/navigation";
// import { getEvidenceByUserId } from "@/action/action";
// import { DbDossier } from "@/lib/type";
// import { getDossiers } from "@/action/action";

// import ProfilePageClient from "@/components/layout/profilePageClient";
//   export interface Stats {
//     totalSubmitted: number;
//     pending: number;
//     approved: number;
//     rejected: number;
//   }

// export interface DossierStats  {
//   code: string;
//   title: string;

// }

// export default async function ProfilePageServer(){
//     // 1. SESSIONE UTENTE
//   // ---------------------------------------------------------------------------
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/login");
//   }

//   // ---------------------------------------------------------------------------
//   // 2. MOCK DATA (Contatori e Prove recuperate dalla tabella evidence)
//   // ---------------------------------------------------------------------------

//   const stats : Stats = {
//     totalSubmitted: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//   };


//   const userEvidenceList = await getEvidenceByUserId();
// const lenght= userEvidenceList.length;
// stats.totalSubmitted=lenght;
//   for (const evidence of userEvidenceList) {
//     if( evidence.status === "ACCEPTED") {  
//       stats.approved++;
//     } 
//     if (evidence.status === "REJECTED") {
//       stats.rejected++;
//     }
//     if (evidence.status === "PENDING") {
//       stats.pending++;
//     }
//   }


// const dossiersList = await getDossiers();






//   return (
//       <ProfilePageClient stats={stats} userEvidenceList={userEvidenceList} session={session} dossiers={dossiersList} />
   
//   );
// }

import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { getEvidenceByUserId, getDossiers } from "@/action/action";
import ProfilePageClient, { Stats } from "@/components/layout/profilePageClient";

export default async function ProfilePageServer() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userEvidenceList = (await getEvidenceByUserId()) || [];
  const dossiersList = (await getDossiers()) || [];

  const stats: Stats = {
    totalSubmitted: userEvidenceList.length,
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  for (const evidence of userEvidenceList) {
    if (evidence.status === "ACCEPTED") stats.approved++;
    if (evidence.status === "REJECTED") stats.rejected++;
    if (evidence.status === "PENDING") stats.pending++;
  }

  return (
    <ProfilePageClient
      stats={stats}
      userEvidenceList={userEvidenceList}
      session={session}
      dossiers={dossiersList}
    />
  );
}