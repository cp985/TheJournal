export type Role = "USER" | "ADMIN";
export type EvidenceType = "PHOTO" | "PDF" | "AUDIO" | "DOCUMENT";
export type EvidenceStatus = "PENDING" | "REJECTED" | "ACCEPTED";
export type DossierStatus = "Open" | "Archived" | "Closed";
export interface DbUser {
  id: string;
  username: string | null;
  email: string | null;
  role: Role;
}

export interface DbEvidence {
  id: string;
  dossierId: string;
  type: EvidenceType;
  fileUrl: string;
  notes: string;
  notes_en: string;
  status: EvidenceStatus;
  user: DbUser; 
}

export interface DbDossier {
  id: string;
  coverUrl:string;
  code: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  status: DossierStatus; 
  user: DbUser; 
  evidences: DbEvidence[]; 
}