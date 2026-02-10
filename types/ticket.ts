export interface Ticket {
  id: string;
  userEmail: string;
  subject: string;
  message: string;
  category?: string;
  sentimentScore?: number;
  urgency?: "High" | "Medium" | "Low";
  aiDraft?: string;
  status: "PROCESSING" | "READY" | "RESOLVED" | "FAILED";
  createdAt: string;
  updatedAt: string;
}
