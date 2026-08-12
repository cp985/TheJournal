
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
    totalSubmitted: 10,
    pending: 5,
    approved: 1,
    rejected: 4,
  };


  const userEvidenceList = await getEvidenceByUserId();

  return (
      <ProfilePageClient stats={stats} userEvidenceList={userEvidenceList} session={session} />
   
  );
}