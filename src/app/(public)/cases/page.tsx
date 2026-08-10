import { Suspense } from "react";
import Loader from "@/components/layout/loader";
import { getDossiers } from "@/action/action";

import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

export default async function CasePage() {
  //!update with session isPublic or not
  const isPublic = false;
  //!-------------------------------------------------
  const dossiersList = await getDossiers(isPublic ? 3 : undefined);
  return (
    <Suspense fallback={<Loader />}>
      <CasesPageMainCompo isPublic={isPublic} dossiersList={dossiersList} />
    </Suspense>
  );
}
