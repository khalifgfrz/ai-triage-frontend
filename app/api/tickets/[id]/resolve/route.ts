import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json().catch(() => ({}));
    const aiDraft = body.aiDraft ?? undefined;

    await api.patch(`/tickets/${params.id}/resolve`, { aiDraft });

    return NextResponse.redirect(new URL(`/tickets`, request.url), {
      status: 303,
    });
  } catch (error) {
    console.error("Failed to resolve ticket:", error);
    return NextResponse.json({ error: "Failed to resolve ticket" }, { status: 500 });
  }
}
