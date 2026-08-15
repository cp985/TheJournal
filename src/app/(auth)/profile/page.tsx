
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { getEvidenceByUserId } from "@/action/action";
import ProfilePageClient from "@/components/layout/profilePageClient";
  export interface Stats {
    totalSubmitted: number;
    pending: number;
    approved: number;
    rejected: number;
  }



export default async function ProfilePageServer(){
    // 1. SESSIONE UTENTE
  // ---------------------------------------------------------------------------
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // ---------------------------------------------------------------------------
  // 2. MOCK DATA (Contatori e Prove recuperate dalla tabella evidence)
  // ---------------------------------------------------------------------------

  const stats : Stats = {
    totalSubmitted: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  };


  const userEvidenceList = await getEvidenceByUserId();
const lenght= userEvidenceList.length;
stats.totalSubmitted=lenght;
  for (const evidence of userEvidenceList) {
    if( evidence.status === "ACCEPTED") {  
      stats.approved++;
    } 
    if (evidence.status === "REJECTED") {
      stats.rejected++;
    }
    if (evidence.status === "PENDING") {
      stats.pending++;
    }
  }

  return (
      <ProfilePageClient stats={stats} userEvidenceList={userEvidenceList} session={session} />
   
  );
}