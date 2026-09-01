

import InvestigationBoard from "@/components/layout/mapInvestigationBoard";
import "@xyflow/react/dist/style.css";
import { getDossiers, getFollowedCases } from "@/action/action"; // Assicurati di importare getFollowedCases
import { auth } from "@/auth/auth";


export default async function MapPage() {
  const dossiersList = await getDossiers();

  const session = await auth();

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