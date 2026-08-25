// import { Suspense } from "react";
// import Loader from "@/components/layout/loader";
// import { getDossiers } from "@/action/action";

// import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

// export default async function CasePage() {
//   const dossiersList = await getDossiers();
//   let isPublic= true;
//   if(dossiersList.length > 3) isPublic= false
//   return (
//     <Suspense fallback={<Loader />}>
//       <CasesPageMainCompo  isPublic={isPublic} dossiersList={dossiersList} />
//     </Suspense>
//   );
// }


import { Suspense } from "react";
import { cookies } from "next/headers";
import { Metadata } from "next";
import Loader from "@/components/layout/loader";
import { DbDossier } from "@/lib/type";
import { getDossiers } from "@/action/action";
import CasesPageMainCompo from "@/components/layout/casePageMainCompo";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 1. GENERAZIONE METADATI SEO (SERVER-SIDE)
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const code = typeof params.code === "string" ? params.code : null;

  const cookieStore = await cookies();
  const lang = (cookieStore.get("user-lang")?.value || "IT").toUpperCase();
  const isEn = lang === "EN";

  if (!code) {
    return {
      title: isEn ? "Case Archive" : "Archivio Casi",
      description: isEn 
        ? "Explore archives and dossiers." 
        : "Esplora i dossier e i casi archiviati.",
    };
  }

  const dossiersList : DbDossier[] = await getDossiers();
  const selectedCase = dossiersList.find(
    (c: any) => c.code.toLowerCase() === code.toLowerCase()
  );

  if (!selectedCase) {
    return {
      title: isEn ? "Case not found" : "Caso non trovato",
      description: isEn 
        ? "The requested dossier does not exist." 
        : "Il dossier richiesto non esiste o è stato rimosso.",
    };
  }

  const title = isEn 
    ? (selectedCase.title_en || selectedCase.title) 
    : selectedCase.title;

  const description = isEn 
    ? (selectedCase.description_en || selectedCase.description) 
    : selectedCase.description;

  return {
    title,
    description: description || `Caso ${selectedCase.code}`,
    openGraph: {
      title,
      description,
      images: selectedCase.coverUrl ? [selectedCase.coverUrl] : ["/og-image.png"],
    },
  };
}

// 2. SERVER COMPONENT PRINCIPALE (RENDERIZZA IL CLIENT COMPONENT)
export default async function CasePage() {
  const dossiersList = await getDossiers();

  let isPublic = true;
  if (dossiersList.length > 3) isPublic = false;

  return (
    <Suspense fallback={<Loader />}>
      <CasesPageMainCompo isPublic={isPublic} dossiersList={dossiersList} />
    </Suspense>
  );
}