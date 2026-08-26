import InvestigationBoard from "@/components/layout/investigationBoard";
import "@xyflow/react/dist/style.css";

// Interfaccia per i dossier che verranno passati al sidebar dell'archivio
export interface DossierSummary {
  id: string;
  title: string;
  code: string;
  date: string;
  status: "In Corso" | "Archiviato" | "Sospeso";
}

export default function MapPage() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <InvestigationBoard />
    </div>
  );
}