import { Suspense } from "react";
import Loader from "@/components/layout/loader";
import { getDossiers } from "@/action/action";

import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

export default async function CasePage() {
  const dossiersList = await getDossiers();
  let isPublic= true;
  if(dossiersList.length > 3) isPublic= false
  return (
    <Suspense fallback={<Loader />}>
      <CasesPageMainCompo  isPublic={isPublic} dossiersList={dossiersList} />
    </Suspense>
  );
}
