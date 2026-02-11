"use server";

import { api } from "@/lib/api";

export async function resolveTicketAction(id: string, aiDraft: string) {
  if (aiDraft.trim().length < 10) {
    throw new Error("Please lengthen the Reply to at least 10 characters");
  }

  try {
    const res = await api.patch(`/tickets/${id}/resolve`, { aiDraft });
    return res.data;
  } catch (err: any) {
    console.error("Ticket resolution failed:", err?.response?.data);
    throw new Error(err?.response?.data?.message || "Failed to resolve ticket");
  }
}
