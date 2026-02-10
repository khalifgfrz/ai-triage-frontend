import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await api.patch(`/tickets/${params.id}/resolve`);

    return NextResponse.redirect(new URL(`/tickets/${params.id}`, request.url), {
      status: 303,
    });
  } catch (error) {
    console.error("Failed to resolve ticket:", error);
    return NextResponse.json({ error: "Failed to resolve ticket" }, { status: 500 });
  }
}
