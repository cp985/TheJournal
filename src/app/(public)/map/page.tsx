

import InvestigationBoard from "@/components/layout/investigationBoard";

import "@xyflow/react/dist/style.css";





export default function MapPage() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <InvestigationBoard />
    </div>
  );
}