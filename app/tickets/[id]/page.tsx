import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function TicketDetail({ params }: Props) {
  const res = await api.get(`/tickets`);
  const ticket = res.data.find((t: any) => t.id === params.id);

  if (!ticket) return notFound();

  async function resolveTicket(formData: FormData) {
    "use server";
    const aiDraft = String(formData.get("aiDraft") ?? "");
    await api.patch(`/tickets/${params.id}/resolve`, { aiDraft });
    revalidatePath(`/tickets`);
    redirect(`/tickets`);
  }

  const urgencyConfig: Record<string, { bg: string; text: string; dot: string }> = {
    High: { bg: "bg-urgency-high-bg", text: "text-urgency-high", dot: "bg-urgency-high" },
    Medium: { bg: "bg-urgency-medium-bg", text: "text-urgency-medium", dot: "bg-urgency-medium" },
    Low: { bg: "bg-urgency-low-bg", text: "text-urgency-low", dot: "bg-urgency-low" },
  };

  const statusConfig: Record<string, { bg: string; text: string }> = {
    PROCESSING: { bg: "bg-status-processing-bg", text: "text-status-processing" },
    READY: { bg: "bg-status-ready-bg", text: "text-status-ready" },
    RESOLVED: { bg: "bg-status-resolved-bg", text: "text-status-resolved" },
    FAILED: { bg: "bg-status-failed-bg", text: "text-status-failed" },
  };

  const urgStyle = ticket.urgency && urgencyConfig[ticket.urgency]
    ? urgencyConfig[ticket.urgency]
    : null;
  const stStyle = statusConfig[ticket.status] ?? { bg: "bg-muted", text: "text-muted-foreground" };

  return (
    <main className="py-10">
      {/* Back link */}
      <Link
        href="/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to tickets
      </Link>

      {/* Header */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {ticket.subject}
          </h1>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center rounded-full ${stStyle.bg} px-2.5 py-1 text-xs font-medium ${stStyle.text}`}>
              {ticket.status}
            </span>
            {urgStyle ? (
              <span className={`inline-flex items-center gap-1.5 rounded-full ${urgStyle.bg} px-2.5 py-1 text-xs font-medium ${urgStyle.text}`}>
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${urgStyle.dot}`} />
                {ticket.urgency}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                No urgency
              </span>
            )}
            {ticket.category && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {ticket.category}
              </span>
            )}
          </div>
        </div>

{/* Resolve button moved into AI Draft card below */}
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Message Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h2 className="text-sm font-semibold text-foreground">Customer Message</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {ticket.message}
          </p>
          {ticket.userEmail && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                From: <span className="text-foreground">{ticket.userEmail}</span>
              </p>
            </div>
          )}
          {ticket.sentimentScore !== undefined && (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                Sentiment Score: <span className="font-mono text-foreground">{ticket.sentimentScore}</span>
              </p>
            </div>
          )}
        </div>

        {/* AI Draft Reply Card */}
        <form action={resolveTicket} className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h2 className="text-sm font-semibold text-foreground">AI Draft Reply</h2>
          </div>
          <textarea
            name="aiDraft"
            defaultValue={ticket.aiDraft ?? "No AI draft available yet."}
            rows={8}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
          {ticket.status !== "RESOLVED" && (
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
      </div>
    </main>
  );
}
