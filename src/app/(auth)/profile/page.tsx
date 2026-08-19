

import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { getEvidenceByUserId, getDossiers,getHealth } from "@/action/action";
import ProfilePageClient, { Stats } from "@/components/layout/profilePageClient";

export default async function ProfilePageServer() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userEvidenceList = (await getEvidenceByUserId()) || [];
  const dossiersList = (await getDossiers()) || [];
  const healthList = (await getHealth()) || [];

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
      health={healthList}
    />
  );
}