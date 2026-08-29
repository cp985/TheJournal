import InvestigationBoard from "@/components/layout/mapInvestigationBoard";
import "@xyflow/react/dist/style.css";
import { getDossiers } from "@/action/action";
export interface DossierSummary {
  id: string;
  title: string;
  code: string;
  date: string;
  status: "In Corso" | "Archiviato" | "Sospeso";
}



export default async function MapPage() {

  const dossiersList = await getDossiers();

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <InvestigationBoard dossiers={dossiersList} />
    </div>
  );
}