import type { Ticket } from "@/types/ticket";
import Link from "next/link";

type Props = { ticket: Ticket };

function UrgencyBadge({ urgency }: { urgency?: string }) {
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    High: { bg: "bg-urgency-high-bg", text: "text-urgency-high", dot: "bg-urgency-high" },
    Medium: { bg: "bg-urgency-medium-bg", text: "text-urgency-medium", dot: "bg-urgency-medium" },
    Low: { bg: "bg-urgency-low-bg", text: "text-urgency-low", dot: "bg-urgency-low" },
  };

  const style = urgency && config[urgency] ? config[urgency] : null;

  if (!style) {
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">N/A</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} px-2.5 py-1 text-xs font-medium ${style.text}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {urgency}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    PROCESSING: { bg: "bg-status-processing-bg", text: "text-status-processing" },
    READY: { bg: "bg-status-ready-bg", text: "text-status-ready" },
    RESOLVED: { bg: "bg-status-resolved-bg", text: "text-status-resolved" },
    FAILED: { bg: "bg-status-failed-bg", text: "text-status-failed" },
  };

  const style = config[status] ?? { bg: "bg-muted", text: "text-muted-foreground" };

  return <span className={`inline-flex items-center rounded-full ${style.bg} px-2.5 py-1 text-xs font-medium ${style.text}`}>{status}</span>;
}

export default function TicketItem({ ticket }: Props) {
  const timeAgo = getRelativeTime(ticket.createdAt);

  return (
    <Link href={`/tickets/${ticket.id}`} className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/30">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{ticket.subject}</h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>

      <p className="line-clamp-1 text-sm text-muted-foreground">{ticket.message}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <StatusBadge status={ticket.status} />
        <UrgencyBadge urgency={ticket.urgency} />
        {ticket.category && <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{ticket.category}</span>}
        <span className="ml-auto text-xs text-muted-foreground">{timeAgo}</span>
      </div>
    </Link>
  );
}

function getRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  } catch {
    return "";
  }
}
