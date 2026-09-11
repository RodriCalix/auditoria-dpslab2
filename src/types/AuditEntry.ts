export interface AuditEntry {
  id: string;
  productId: string;
  productTitle: string;
  timestamp: string; // ISO String
  actionType: 'AUDIT_CHECK' | 'INCIDENCE' | 'STOCK_RECEIPT';
  observationText?: string;
  audioNoteUrl?: string; // URL local del audio grabado
  location: {
    latitude: number;
    longitude: number;
  };
}