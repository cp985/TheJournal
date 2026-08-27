export type Role = "USER" | "ADMIN";
export type EvidenceType = "PHOTO" | "PDF" | "DOCUMENT";
export type EvidenceStatus = "PENDING" | "REJECTED" | "ACCEPTED";
export type DossierStatus = "Open" | "Archived" | "Closed";
export interface DbUser {
  id: string;
  username: string | null;
  email: string | null;
  role: Role;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  timelineId?: string | null;
}

export interface DbDossier {
  id: string;
  coverUrl: string;
  code: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  status: DossierStatus;
  createdAt: string;
  updatedAt: string;
  user: DbUser;
  evidences: DbEvidence[];
  timeline: DbTimeline[];
}

export interface DbTimeline {
  id: string;
  date: string;
  title: string;
  description: string;
  dossierId: string;
  description_en?: string;
  title_en?: string;
  dossier: DbDossier;
  evidences: DbEvidence[];
}

export type SignUpFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    lang?: string;
  };
};

export type AuthFormData = {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
};

export type AuthUserByEmail = {
  email?: string;
  password?: string;
  username?: string;
  id?: string;
  role?: string;
};

export type LoginFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: AuthFormData;
};

export type SendEmailFormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined> | null;
  message?: string | null;
  data?: {
    username?: string;
    email?: string;
    subject?: string;
    textarea?: string;
    lang?: string;
  };
};

export type FormActionState = {
  errors?: Record<string, string[]> | null;
  message?: string;
  data?: {
    dossierId?: string;
    type?: string;
    notes?: string;
    notes_en?: string;
    fileName?: string | undefined;
    timelineId?: string;
  };
  success: boolean;
};

export type HealthStatus = {
  online: boolean;
  message?: string;
  timestamp?: string;
};

export type ActionState = {
  success: boolean;
  message: string | null;
  errors?: Record<string, string[]> | null;
  fields?: Record<string, any>;
};

export type DeleteActionResult = {
  success: boolean;
  message: string;
  errors?: any;
  idItem?: string;
};

