import { Suspense } from "react";
import Loading from "@/components/layout/loading";
import { getDossiers } from "@/../api/api";

import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

export default async function CasePage() {
  //!update with session isPublic or not
  const isPublic = false;
  //!-------------------------------------------------
  const dossiersList = await getDossiers(isPublic ? 3 : undefined);
  console.log('from case main',dossiersList);
  return (
    <Suspense fallback={<Loading />}>
      <CasesPageMainCompo isPublic={isPublic} dossiersList={dossiersList} />
    </Suspense>
  );
}
