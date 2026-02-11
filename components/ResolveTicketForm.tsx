"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Swal from "sweetalert2";
import { resolveTicketAction } from "@/app/actions/resolveTicket";

export default function ResolveTicketForm({ id, defaultDraft, status }: { id: string; defaultDraft: string; status: string }) {
  const router = useRouter();
  const [draft, setDraft] = useState(defaultDraft);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Resolve Ticket?",
      text: "This will mark the ticket as resolved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Resolve it!",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Updating Ticket...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const result = await resolveTicketAction(id, draft);
        const titleMessage = result.data;
        const textMessage = result.message;

        await Swal.fire({
          title: titleMessage,
          text: textMessage,
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 3000,
          timerProgressBar: true,
        });

        router.push("/tickets");
        router.refresh();
      } catch (err: any) {
        Swal.fire("Error", "Failed to resolve ticket", "error");
      }
    }
  };

  return (
    <form onSubmit={handleResolve} className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <h2 className="text-sm font-semibold text-foreground">Suggested Reply</h2>
      </div>

      <textarea
        name="aiDraft"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={8}
        className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
      />

      {status !== "RESOLVED" && (
        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground cursor-pointer transition-all duration-200 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Resolve Ticket
        </button>
      )}
    </form>
  );
}
