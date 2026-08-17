export const MOCK_USERS = [
  { id: "1", username: "mario_rossi", email: "mario@example.com", role: "ADMIN", createdAt: "2026-05-10" },
  { id: "2", username: "laura_bianchi", email: "laura@example.com", role: "USER", createdAt: "2026-06-12" },
  { id: "3", username: "giovanni_verdi", email: "giovanni@example.com", role: "USER", createdAt: "2026-07-01" },
  { id: "4", username: "sara_neri", email: "sara@example.com", role: "USER", createdAt: "2026-07-25" },
];

export const MOCK_DOSSIERS = [
  { id: "d1", title: "Il caso Pietracatella", status: "Published", evidencesCount: 14, updatedAt: "2026-08-01" },
  { id: "d2", title: "Segreti della Valle", status: "Draft", evidencesCount: 5, updatedAt: "2026-08-10" },
];

export const MOCK_EVIDENCES = [
  { id: "e1", title: "Rapporto autoptico preliminare", author: "mario_rossi", status: "Pending", date: "2026-08-14" },
  { id: "e2", title: "Fotografia scatto notturno", author: "laura_bianchi", status: "Approved", date: "2026-08-12" },
  { id: "e3", title: "Tabulati telefonici anonimi", author: "giovanni_verdi", status: "Pending", date: "2026-08-15" },
];