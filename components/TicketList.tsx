import type { Ticket } from "@/types/ticket";
import TicketItem from "./TicketItem";

type Props = { tickets: Ticket[] };

export default function TicketList({ tickets }: Props) {
  if (tickets.length === 0) return <p>No tickets yet.</p>;

  return (
    <div>
      {tickets.map((t) => (
        <TicketItem key={t.id} ticket={t} />
      ))}
    </div>
  );
}
