import { Suspense } from "react";
import Loader from "@/components/layout/loader";
import { getDossiers } from "@/action/action";
import {auth} from "@/auth/auth"

import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

export default async function CasePage() {
  const session = await auth()
  const isPublic = !session;
  const dossiersList = await getDossiers(isPublic ? 3 : undefined);
  return (
    <Suspense fallback={<Loader />}>
      <CasesPageMainCompo isPublic={isPublic} dossiersList={dossiersList} />
    </Suspense>
  );
}
