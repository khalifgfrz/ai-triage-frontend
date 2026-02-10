import TicketList from "@/components/TicketList";
import { api } from "@/lib/api";
import Link from "next/link";

export default async function TicketsPage() {
  const res = await api.get("/tickets");
  const tickets = res.data;

  const totalCount = tickets.length;
  const openCount = tickets.filter(
    (t: any) => t.status === "READY" || t.status === "PROCESSING"
  ).length;
  const resolvedCount = tickets.filter(
    (t: any) => t.status === "RESOLVED"
  ).length;
  const highUrgencyCount = tickets.filter(
    (t: any) => t.urgency === "High"
  ).length;

  return (
    <main className="py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tickets Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and resolve your support tickets.
          </p>
        </div>
        <Link
          href="/create-tickets"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          New Ticket
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Tickets" value={totalCount} />
        <StatCard label="Open" value={openCount} color="text-status-processing" />
        <StatCard label="Resolved" value={resolvedCount} color="text-status-resolved" />
        <StatCard label="High Urgency" value={highUrgencyCount} color="text-urgency-high" />
      </div>

      {/* Ticket List */}
      <div className="mt-8">
        <TicketList tickets={tickets} />
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color ?? "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
