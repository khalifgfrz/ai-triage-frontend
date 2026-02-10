import type { Ticket } from "@/types/ticket";
import TicketItem from "./TicketItem";

type Props = { tickets: Ticket[] };

export default function TicketList({ tickets }: Props) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M16 16h.01" />
            <path d="M8 16h.01" />
            <path d="M12 20h.01" />
            <path d="M20.77 11.5A8.97 8.97 0 0 0 21 10c0-4.97-4.03-9-9-9S3 5.03 3 10a8.97 8.97 0 0 0 .23 1.5" />
            <path d="M12 20a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">No tickets yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Create your first ticket to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tickets.map((t) => (
        <TicketItem key={t.id} ticket={t} />
      ))}
    </div>
  );
}
