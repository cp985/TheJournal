

import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { getEvidences, getDossiers, getUsers, getHealth } from "@/action/action";
import AdminClientPage from "@/components/layout/adminClientPage";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string; status?: string }>;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const { tab = "overview", q = "", status = "" } = await searchParams;

  const evidencesList = (await getEvidences()) || [];
  const dossiersList = (await getDossiers()) || [];
  const usersList = (await getUsers()) || [];
  const pendingEvidencesCount = evidencesList.filter(
    (e) => e.status === "PENDING"
  ).length;

  const health = (await getHealth()) || { online: false };

  return (
    <AdminClientPage
      currentTab={tab}
      q={q}
      status={status} 
      evidencesList={evidencesList}
      dossiersList={dossiersList}
      usersList={usersList}
      health={health}
      pendingEvidencesCount={pendingEvidencesCount}
    />
  );
}