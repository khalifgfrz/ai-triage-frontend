"use server";

import { api } from "@/lib/api";

export async function createTicketAction(subject: string, message: string, userEmail: string) {
  if (subject.trim().length < 3) {
    throw new Error("Please lengthen the subject to at least 3 characters");
  }
  if (message.trim().length < 10) {
    throw new Error("Please lengthen the message to at least 10 characters");
  }

  try {
    const res = await api.post("/tickets", { subject, message, userEmail });
    return res.data;
  } catch (err: any) {
    console.error("Ticket creation failed:", err?.response?.data);
    throw new Error(err?.response?.data?.message || "Failed to create ticket");
  }
}
